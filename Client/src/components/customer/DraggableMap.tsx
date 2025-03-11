import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC, memo, useEffect, useRef, useState } from 'react'
import MapView, { Marker, Region } from 'react-native-maps';
import { customMapStyle, indiaIntialRegion } from '@/utils/CustomMap';
import { mapStyles } from '@/styles/mapStyles';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome6 } from '@expo/vector-icons'
import { useUserStore } from '@/store/userStore';
import { useIsFocused } from '@react-navigation/native';
import * as Location from "expo-location";
import { reverseGeocode } from '@/utils/mapUtils';
import haversine from "haversine-distance";
import { useWS } from '@/service/WSProvider';

const DraggableMap: FC<{ height: number }> = ({ height }) => {
    const mapRef = useRef<MapView>(null);
    const isFocused = useIsFocused()
    const [markers, setMarkers] = useState<any>([])
    const { emit, on, off } = useWS();
    const MAX_DISTANCE_THRESHOLD = 10000;
    const { setLocation, location, outOfRange, setOutOfRange } = useUserStore();

    useEffect(() => {
        (async () => {
            if (isFocused) {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status === 'granted') {
                    try {
                        const location = await Location.getCurrentPositionAsync({})
                        const { latitude, longitude } = location.coords
                        mapRef?.current?.fitToCoordinates([{ latitude, longitude }], {
                            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                            animated: true
                        });
                        const newRegion = {
                            latitude,
                            longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }
                        handleRegionChangeComplete(newRegion)
                    }
                    catch (error) {
                        console.log("Error getting current location", error);
                    }
                }
                else {
                    console.log("Permission to access location was denied");
                }
            }
        })();

    }, [mapRef, isFocused]);

    //Real Rider Markers
    useEffect(()=>{
        if(location?.latitude&&location?.longitude&&isFocused){
            emit('subscribeToZone',{latitude:location.latitude,longitude:location.longitude})
            on('nearbyRiders',(riders:any[])=>{
                const updatedMarkers = riders?.map((rider)=>({
                    id:rider?.id,
                    latitude:rider?.coords?.latitude,
                    longitude:rider?.coords?.longitude,
                    type:'rider',
                    rotation:rider.coords.heading,
                    visible:true
                }));
                setMarkers(updatedMarkers)
            });
    }

            return()=>{
                off("nearbyRiders")
        }
    },[location,emit,on,off,isFocused])


    //Simulation of Caption Markers

    // useEffect(() => {
    //     generateRandomMarkers();
    //     const intervalId = setInterval(() => {
    //     }, 5000);
    //     return () => clearInterval(intervalId);
    // }, [location]);

    // const generateRandomMarkers = () => {
    //     if (!location?.latitude || !location?.longitude || outOfRange) return;

    //     const types = ['bike', 'auto', 'cab']
    //     const newMarkers = Array.from({ length: 20 }, (_, index) => {
    //         const randomType = types[Math.floor(Math.random() * types.length)]
    //         const randomRotation = Math.floor(Math.random() * 360)

    //         return {
    //             id: index,
    //             latitude: location?.latitude + (Math.random() - 0.5) * 0.01,
    //             longitude: location?.longitude + (Math.random() - 0.5) * 0.01,
    //             type: randomType,
    //             rotation: randomRotation,
    //             visible: true,
    //         }
    //     });
    //     setMarkers(newMarkers);
    // }


    // const askLocationAccess = async () => {


    // }

    // useEffect(() => {
    //     if (isFocused) {
    //         askLocationAccess()
    //     }
    // }, [mapRef, isFocused])



    const handleRegionChangeComplete = async (newRegion: Region) => {
        const address = await reverseGeocode(newRegion.latitude, newRegion.longitude)
        setLocation({
            longitude: newRegion.longitude,
            latitude: newRegion.latitude,
            address: address,
        })
        const userLocation = { latitude: location?.latitude, longitude: location?.longitude } as any;

        if (userLocation) {
            const newLocation = { latitude: newRegion?.latitude, longitude: newRegion?.longitude }
            const distance = haversine(userLocation, newLocation)
            setOutOfRange(distance > MAX_DISTANCE_THRESHOLD)
        }
    };

    const handleGpsButtonPress = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync()
            const location = await Location.getCurrentPositionAsync({})
            const { latitude, longitude } = location.coords;
            mapRef.current?.fitToCoordinates([{ latitude, longitude }], {
                edgePadding: { top: 70, right: 70, bottom: 70, left: 70 },
                animated: true,
            });
            const address = await reverseGeocode(latitude, longitude);
            setLocation({ longitude, latitude, address });
        } catch (error) {
            console.log('Error getting location', error)
        }
    }


    return (
        <View style={{ height: height, width: "100%" }}>
            <MapView
                ref={mapRef}
                maxZoomLevel={16}
                minZoomLevel={12}
                pitchEnabled={false}
                style={{ flex: 1 }}
                onRegionChangeComplete={handleRegionChangeComplete}
                initialRegion={indiaIntialRegion}
                provider='google'
                customMapStyle={customMapStyle}
                showsMyLocationButton={false}
                showsCompass={false}
                showsIndoors={false}
                showsIndoorLevelPicker={false}
                showsTraffic={false}
                showsScale={false}
                showsBuildings={false}
                showsPointsOfInterest={false}
                showsUserLocation={true}
            >

                {markers
                    .filter((marker: any) => marker.latitude && marker.longitude && marker.visible)
                    .map((marker: any, index: number) => (
                        <Marker
                            zIndex={index + 1}
                            key={index}
                            flat
                            anchor={{ x: 0.5, y: 0.5 }}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        >
                            <View style={{ transform: [{ rotate: `${marker?.rotation}deg` }] }}>
                                <Image
                                    source={
                                        marker.type === 'bike'
                                            ? require('@/assets/icons/bike_marker.png')
                                            : marker?.type === 'auto'
                                                ? require('@/assets/icons/auto_marker.png')
                                                : require('@/assets/icons/cab_marker.png')
                                    }
                                    style={{ height: 40, width: 40, resizeMode: "contain" }}
                                />
                            </View>
                        </Marker>
                    ))}

            </MapView>
            <View style={mapStyles.centerMarkerContainer}>
                <Image source={require('@/assets/icons/marker.png')} style={mapStyles.marker} />

            </View>

            <TouchableOpacity style={mapStyles.gpsButton} onPress={handleGpsButtonPress}>
                <MaterialCommunityIcons name="crosshairs-gps" size={RFValue(16)} color="#3C75BE" />
            </TouchableOpacity>

            {
                outOfRange && (
                    <View style={mapStyles.outOfRange}>
                        <FontAwesome6 name="road-circle-exclamation" size={24} color="red" />
                    </View>
                )
            }

        </View>
    );
};

export default memo(DraggableMap);