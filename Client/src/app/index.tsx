import { View, Text, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyles } from '@/styles/commonStyles'
import { splashStyles } from '@/styles/splashStyles'
import CustomText from '@/components/shared/CustomText'
import { useFonts } from 'expo-font'
import { resetAndNavigate } from '@/utils/Helpers'
import { jwtDecode } from 'jwt-decode';
import { tokenStorage } from '@/store/storage'
import { refresh_tokens } from '@/service/apiInterceptors'
import { useUserStore } from '@/store/userStore'
import { logout } from '@/service/authService'

interface DecodedToken {
    exp: number;
}

const Main = () => {
    const [loaded] = useFonts({
        Bold: require('../assets/fonts/NotoSans-Bold.ttf'),
        Regular: require('../assets/fonts/NotoSans-Regular.ttf'),
        Medium: require('../assets/fonts/NotoSans-Medium.ttf'),
        Light: require('../assets/fonts/NotoSans-Light.ttf'),
        SemiBold: require('../assets/fonts/NotoSans-SemiBold.ttf')
    })

    const { user } = useUserStore()

    const [hasNavigated, setHasNavigated] = useState(false)

    // //mmkv storage
    const tokenCheck = async () => {

        const access_token = tokenStorage.getString('access_token') as string;
        const refresh_token = tokenStorage.getString('refresh_token') as string;

        if (access_token) {
            const decodeAccessToken = jwtDecode<DecodedToken>(access_token);
            const decodeRefreshToken = jwtDecode<DecodedToken>(refresh_token);

            const currentTime = Date.now() / 1000;

            if (decodeRefreshToken?.exp < currentTime) {
                // resetAndNavigate('/role');
                logout();
                Alert.alert('Session Expired, Please Login again');
            }

            if (decodeAccessToken?.exp < currentTime) {
                try {
                    refresh_tokens()
                } catch (err) {
                    console.log(err);
                    Alert.alert("Refresh Token Error")
                }
            }

            if (user) {
                resetAndNavigate('/customer/home')
            }
            else {
                resetAndNavigate('/rider/home')
            }

            return
        }

        resetAndNavigate('/role');
    }

    useEffect(() => {
        if (loaded && !hasNavigated) {
            const timeoutId = setTimeout(() => {
                tokenCheck()
                setHasNavigated(true)
            }, 1000);
            return () => clearTimeout(timeoutId)
        }
    }, [loaded, hasNavigated])

    return (
        <View style={commonStyles.container}>
            <Image
                source={require('@/assets/images/logo_t.png')}
                style={splashStyles.img}
            />
            <CustomText variant='h5' fontFamily="Medium" style={splashStyles.text}>
                Made by Mohit
            </CustomText>
        </View>
    )
}

export default Main

// import React from "react";
// import { View, StyleSheet } from "react-native";
// import MapView, { Marker } from "react-native-maps";

// const Main = () => {
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 37.7749,
//           longitude: -122.4194,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         {/* Add a test marker */}
//         <Marker
//           coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
//           title="San Francisco"
//           description="This is a marker in SF!"
//         />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
// });

// export default Main;