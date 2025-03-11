// import React from 'react'
// import { Stack } from 'expo-router'
// import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
// import { WSProvider } from '@/service/WSProvider'

// const Layout = () => {
//   return (
//     <WSProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name='index' />
//         <Stack.Screen name='role' />
//         <Stack.Screen name='customer/auth' />
//         <Stack.Screen name='rider/auth' />
//         <Stack.Screen name='customer/home' />
//         <Stack.Screen name='rider/home' />
//         <Stack.Screen name='rider/liveride' />
//         <Stack.Screen name='customer/selectlocations' />
//         <Stack.Screen name='customer/ridebooking' />
//         <Stack.Screen name='customer/liveride' />
//       </Stack>
//     </WSProvider>
//   )
// }

// export default gestureHandlerRootHOC(Layout)

import React from 'react';
import { View } from 'react-native';
import { Stack, useSegments } from 'expo-router';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { WSProvider } from '@/service/WSProvider';
import BottomNavBar from './customer/BottomNavBar';
import BottomNavBar2 from './rider/BottomNavBar2';

const Layout = () => {
  const segments = useSegments();

  // Check if the current route should show the BottomNavBar
  const showBottomNavBar = [
    'customer/home',
    'customer/services',
    'customer/activity',
    'customer/account',
  ].some(route => segments.join('/') === route);

  const showBottomNavBar2 = [
    'rider/home',
    'rider/activity',
    'rider/account',
  ].some(route => segments.join('/') === route);

  return (
    <WSProvider>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='index' />
          <Stack.Screen name='role' />
          <Stack.Screen name='customer/auth' />
          <Stack.Screen name='rider/auth' />
          <Stack.Screen name='customer/home' />
          <Stack.Screen name='customer/services' />
          <Stack.Screen name='customer/activity' />
          <Stack.Screen name='customer/account' />
          <Stack.Screen name='rider/home' />
          <Stack.Screen name='rider/liveride' />
          <Stack.Screen name='customer/selectlocations' />
          <Stack.Screen name='customer/ridebooking' />
          <Stack.Screen name='customer/liveride' />
        </Stack>

        {/* Conditionally render the BottomNavBar */}
        {showBottomNavBar && <BottomNavBar />}
        {showBottomNavBar2 && <BottomNavBar2 />}
      </View>
    </WSProvider>
  );
};

export default gestureHandlerRootHOC(Layout);
