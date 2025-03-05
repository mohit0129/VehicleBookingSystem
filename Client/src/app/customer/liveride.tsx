import { View, Text, Alert, ActivityIndicator } from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { screenHeight } from '@/utils/Constants'
import { useWS } from '@/service/WSProvider'
import { Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { rideStyles } from '@/styles/rideStyles'
import { resetAndNavigate } from '@/utils/Helpers'
import LiveTrackingMap from '@/components/customer/LiveTrackingMap'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import SearchingRideSheet from '@/components/customer/SearchingRideSheet'
import LiveTrackingSheet from '@/components/customer/LiveTrackingSheet'

const androidHeights = [screenHeight * 0.12, screenHeight * 0.42,]
const iosHeights = [screenHeight * 0.2, screenHeight * 0.5,]

const LiveRide = () => {
    const { emit, on, off } = useWS()
    const [rideData, setRideData] = useState<any>(null)
    const [riderCoords, setRiderCoords] = useState<any>(null);

    const route = useRoute() as any;
    const params = route?.params || {};
    const id = params.id;

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => Platform.OS === 'ios' ? iosHeights : androidHeights, []);
    const [mapHeight, setMapHeight] = useState(snapPoints[0])
    const handleSheetChanges = useCallback((index: number) => {
        let height = screenHeight * 0.8
        if (index == 1) {
            height = screenHeight * 0.5
        }
        setMapHeight(height)
    }, []);

    useEffect(() => {
        if (id) {
            emit('subscribeRide', id)
            on('rideData', (data) => {
                setRideData(data)
                if (data?.status === "SEARCHING_FOR_CAPTAIN") {
                    emit('searchRider', id)
                }
            })

            on('rideUpdate', (data) => {
                setRideData(data)
            })

            on('rideCancelled', (error) => {
                resetAndNavigate('/customer/home')
                Alert.alert("Ride Cancelled")
            })

            on('error', (error) => {
                resetAndNavigate('/customer/home')
                Alert.alert("Oh Dang! No Riders Found")
            })
        }

        return () => {
            off('rideData');
            off('rideUpdate');
            off('rideCancelled');
            off('error');
        };

    }, [id, emit, on, off])


    useEffect(() => {
        if (rideData?.rider?._id) {
            emit('subscribeToRiderLocation', rideData?.rider?._id),
                on('riderLocationUpdate', (data) => {
                    setRiderCoords(data?.coords);
                })
        }
        return () => {
            off('riderLocationUpdate')
        }
    }, [rideData]);

    console.log("Customer live ride");

    return (
        <View style={rideStyles.container}>
            <StatusBar
                style='light'
                backgroundColor='orange'
                translucent={false}
            />
            {rideData &&
                <LiveTrackingMap
                    height={mapHeight}
                    status={rideData?.status}
                    drop={{ latitude: parseFloat(rideData?.drop?.latitude), longitude: parseFloat(rideData?.drop?.longitude) }}
                    pickup={{ latitude: parseFloat(rideData?.pickup?.latitude), longitude: parseFloat(rideData?.pickup?.longitude) }}
                    rider={
                        riderCoords
                            ? {
                                latitude: riderCoords.latitude,
                                longitude: riderCoords.longitude,
                                heading: riderCoords.heading
                            }
                            : {}
                    }
                />
            }

            {rideData ?
                <BottomSheet
                    ref={bottomSheetRef}
                    index={1}
                    handleIndicatorStyle={{
                        backgroundColor: "#ccc"
                    }}
                    enableOverDrag={false}
                    enableDynamicSizing={false}
                    style={{ zIndex: 4 }}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetScrollView contentContainerStyle={rideStyles?.container}>
                        {
                            rideData?.status === 'SEARCHING_FOR_CAPTAIN' ?
                                <SearchingRideSheet item={rideData} />
                                :
                                <LiveTrackingSheet item={rideData} />
                        }
                    </BottomSheetScrollView>
                </BottomSheet>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color='black' size='small' />
                </View>
            }


        </View>
    )
}

export default memo(LiveRide)