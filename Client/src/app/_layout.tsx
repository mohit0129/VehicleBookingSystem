import React from 'react'
import { Stack } from 'expo-router'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { WSProvider } from '@/service/WSProvider'

const Layout = () => {
  return (
    <WSProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='role' />
        <Stack.Screen name='customer/auth' />
        <Stack.Screen name='rider/auth' />
        <Stack.Screen name='customer/home' />
        <Stack.Screen name='rider/home' />
        <Stack.Screen name='rider/liveride' />
        <Stack.Screen name='customer/selectlocations' />
        <Stack.Screen name='customer/ridebooking' />
        <Stack.Screen name='customer/liveride' />
      </Stack>
    </WSProvider>
  )
}

export default gestureHandlerRootHOC(Layout)