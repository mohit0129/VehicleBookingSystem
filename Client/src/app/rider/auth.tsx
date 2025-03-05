import { View, Text, Image, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { authStyles } from '@/styles/authStyles'
import { ScrollView } from 'react-native-gesture-handler'
import { commonStyles } from '@/styles/commonStyles'
import CustomText from '@/components/shared/CustomText'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import PhoneInput from '@/components/shared/PhoneInput'
import CustomButton from '@/components/shared/CustomButton'
import { resetAndNavigate } from '@/utils/Helpers'
import { signin } from '@/service/authService'
import { useWS } from '@/service/WSProvider'

const Auth = () => {

    const { updateAccessToken } = useWS()
    const [phone, setPhone] = useState('')

    const handleNext = async () => {
        if (!phone && phone.length !== 10) {
            Alert.alert("Bro enter your phone number")
            return
        }
        // resetAndNavigate('/rider/home')
        signin({ role: 'rider', phone }, updateAccessToken)
    }

    console.log("Rider auth");


    return (
        <SafeAreaView style={authStyles.container}>
            <ScrollView contentContainerStyle={authStyles.container}>

                <View style={commonStyles.flexRowBetween}>
                    <Image source={require('@/assets/images/rider_logo.png')} style={authStyles.logo} />
                    <TouchableOpacity style={authStyles.flexRowGap}>
                        <MaterialIcons name="help" size={18} color='gray' />
                        <CustomText fontFamily='Medium' variant='h7'>Help</CustomText>
                    </TouchableOpacity>
                </View>

                <CustomText fontFamily='Medium' variant='h6'>
                    Good to see you Rider!
                </CustomText>
                <CustomText fontFamily='Regular' variant='h7' style={commonStyles.lightText}>
                    Enter your phone number to proceed
                </CustomText>

                <PhoneInput
                    onChangeText={setPhone}
                    value={phone}
                />

            </ScrollView>
            <View style={authStyles.footerContainer}>
                <CustomText variant='h8' fontFamily='Regular' style={[commonStyles.lightText, { textAlign: 'center', marginHorizontal: 20 }]
                }>
                    By continuing, you agree to the terms and privacy policy.
                </CustomText>
                <CustomButton
                    title="Next"
                    onPress={handleNext}
                    loading={false}
                    disabled={false}
                />
            </View>
        </SafeAreaView>
    )
}

export default Auth;