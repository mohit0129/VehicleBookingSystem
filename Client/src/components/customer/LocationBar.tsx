import { View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useUserStore } from '@/store/userStore'
// import { uiStyles } from '@/styles/uiStyles'
import { router } from 'expo-router'
import CustomText from '../shared/CustomText'

const LocationBar = () => {

    const { location } = useUserStore()
    return (
        <View style={uiStyles.absoluteTop}>
            <SafeAreaView />
            <View style={[uiStyles.container, { width: '100%', justifyContent: 'center', alignItems: 'center' }]}>
                {/* Adjust location bar style to make it wider and centered */}
                <TouchableOpacity 
                    style={[uiStyles.locationBar, { width: '90%' }]}  // This makes it 90% of screen width
                    onPress={() => router.navigate('/customer/selectlocations')}
                >
                    <View style={uiStyles.dot} />
                    <CustomText numberOfLines={1} style={uiStyles.locationText}>
                        {location?.address || "Getting address..."}
                    </CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const uiStyles = StyleSheet.create({
    absoluteTop: {
      position: 'absolute',
      top: 18,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 7,  // Add some padding for better spacing
      width: '100%',  // Ensure full width of the screen
    },
    locationBar: {
      backgroundColor: '#f5f5f5',
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start', // Align the text to the left
      width: '90%',  // Ensure it is 90% of the width of the screen
      marginBottom: 15,
    },
    locationText: {
      fontSize: 14,
      fontFamily: 'Medium',  // Example font style
      flex: 1,  // Allow text to take full width
      paddingLeft: 10,
    },
    dot: {
      backgroundColor: 'green',
      height: 10,
      width: 10,
      borderRadius: 5,
    }
  });

  
export default LocationBar
