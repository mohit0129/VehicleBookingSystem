// // import { View, Text, StatusBar } from 'react-native'
// import { View, Text, Platform } from 'react-native'
// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import { homeStyles } from '@/styles/homeStyles'
// import { StatusBar } from 'expo-status-bar'
// import LocationBar from '@/components/customer/LocationBar'
// import { screenHeight } from '@/utils/Constants'
// import DraggableMap from '@/components/customer/DraggableMap';
// import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
// import SheetContent from '@/components/customer/SheetContent'
// import { getMyRides } from '@/service/rideService'

// //bottomsheet
// const androidHeights = [screenHeight * 0.12, screenHeight * 0.42,]
// const iosHeights = [screenHeight * 0.2, screenHeight * 0.5,]

// const Home = () => {

//   const bottomsheetRef = useRef(null)
//   const snapPoints = useMemo(() => Platform.OS === 'ios' ? iosHeights : androidHeights, [])

//   const [mapHeight, setMapHeight] = useState(snapPoints[0])

//   const handleSheetChanges = useCallback((index: number) => {
//     let height = screenHeight * 0.8
//     if (index == 1) {
//       height = screenHeight * 0.5
//     }
//     setMapHeight(height)
//   }, [])

//   useEffect(() => {
//     getMyRides()
//   }, [])

//   console.log("Customer home");

//   return (
//     <View style={homeStyles.container}>
//       <StatusBar
//         style='dark'
//         backgroundColor='white'
//         translucent={false}
//       />
//       <LocationBar />

//       <DraggableMap height={mapHeight} />
//       <BottomSheet
//         ref={bottomsheetRef}
//         index={1}
//         handleIndicatorStyle={{
//           backgroundColor: "#ccc"
//         }}
//         enableOverDrag={false}
//         enableDynamicSizing
//         style={{ zIndex: 4 }}
//         snapPoints={snapPoints}
//         onChange={handleSheetChanges}
//       >
//         <BottomSheetScrollView contentContainerStyle={homeStyles.scrollContainer}>
//           <SheetContent />

//         </BottomSheetScrollView>
//       </BottomSheet>
//     </View>
//   )
// }

// export default Home

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Platform, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { homeStyles } from '@/styles/homeStyles';
import { StatusBar } from 'expo-status-bar';
import { screenHeight } from '@/utils/Constants';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const Home = () => {
  const bottomsheetRef = useRef(null);
  const snapPoints = useMemo(() => 
    Platform.OS === 'ios' ? [screenHeight * 0.2, screenHeight * 0.5] : [screenHeight * 0.12, screenHeight * 0.42], 
  []);

  const [mapHeight, setMapHeight] = useState(snapPoints[0]);

  const handleSheetChanges = useCallback((index) => {
    let height = screenHeight * 0.8;
    if (index == 1) {
      height = screenHeight * 0.5;
    }
    setMapHeight(height);
  }, []);

  // Services data
  const services = [
    { id: 1, name: 'Bike Ride', icon: require('@/assets/icons/bike.png') },
    { id: 2, name: 'Taxi Ride', icon: require('@/assets/icons/cab.png') },
    { id: 3, name: 'Intercity', icon: require('@/assets/icons/cab_premium.png') },
    { id: 4, name: 'Taxi Bidding', icon: require('@/assets/icons/marker.png') },
    { id: 5, name: 'Taxi Pool', icon: require('@/assets/icons/coupon.png') },
    { id: 6, name: 'Car Rental', icon: require('@/assets/icons/bike_marker.png') },
  ];

  return (
    <View style={homeStyles.container}>
      <StatusBar style='dark' backgroundColor='white' translucent={false} />
      
      {/* Welcome header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.userName}>Mohit</Text>
      </View>
      
      {/* Location search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.locationPin}>
          <Image 
            source={require('@/assets/icons/map_pin.png')}
            style={styles.pinIcon}
          />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Where to?"
          placeholderTextColor="#333"
        />
      </View>
      
      {/* Services section */}
      <View style={styles.servicesContainer}>
        <Text style={styles.servicesTitle}>Select the service you want</Text>
        
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <TouchableOpacity key={service.id} style={styles.serviceItem}>
              <View style={styles.serviceIconContainer}>
                <Image source={service.icon} style={styles.serviceIcon} />
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Promo banner */}
      <TouchableOpacity style={styles.promoBanner}>
        <View style={styles.promoTextContainer}>
          <Text style={styles.promoTitle}>FLAT 10%OFF ON CARPOOL</Text>
          <Text style={styles.promoSubtitle}>*offer valid for 1 week only</Text>
          <Text style={styles.bookNowButton}>BOOK NOW</Text>
        </View>
        <Image 
          source={require('@/assets/icons/parcel.png')} 
          style={styles.promoImage} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  locationPin: {
    marginRight: 10,
  },
  pinIcon: {
    width: 24,
    height: 24,
    tintColor: '#4CAF50',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  servicesContainer: {
    padding: 20,
  },
  servicesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceIconContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  serviceIcon: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  serviceName: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  promoBanner: {
    flexDirection: 'row',
    backgroundColor: '#008B8B', // Teal color from the image
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  promoTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  promoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  promoSubtitle: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 10,
  },
  bookNowButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textDecorationLine: 'underline',
  },
  promoImage: {
    width: 140,
    height: 140,
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
  whatsappButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whatsappIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
};

export default Home;