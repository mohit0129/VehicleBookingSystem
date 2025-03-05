import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

const PhoneInputComponent = ({ phoneNumber, setPhoneNumber, phoneInputRef, onNext }) => {

    const handleContinue = () => {
        if (!phoneNumber || phoneNumber.length !== 10) {
            Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
            return;
        }
        onNext();  // Move to the next step if validation passes
    };

    return (
        <View style={styles.contentContainer}>
            <Text style={styles.title}>Enter your mobile number</Text>
            <View style={styles.phoneInputContainer}>
                <View style={styles.countryCode}>
                    <Image
                        source={{ uri: 'https://flagcdn.com/w20/in.png' }}
                        style={styles.flag}
                    />
                    <Text style={styles.countryCodeText}>+91</Text>
                </View>
                <TextInput
                    ref={phoneInputRef}
                    style={styles.phoneInput}
                    placeholder="Enter mobile number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    maxLength={10}
                />
            </View>
            {/* Continue Button with Validation */}
            <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
            >
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.orText}>or</Text>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={{ uri: 'https://www.google.com/favicon.ico' }} style={styles.socialIcon} />
                    <Text>  Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Icon name="apple" size={22} color="black" />
                    <Text>  Continue with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Icon name="envelope" size={22} color="black" />
                    <Text>  Continue with Email</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        marginBottom: -5,
    },
    countryCode: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRightWidth: 1,
        borderRightColor: '#DDD',
    },
    flag: {
        width: 20,
        height: 15,
        marginRight: 8,
    },
    countryCodeText: {
        fontSize: 16,
    },
    phoneInput: {
        flex: 1,
        padding: 12,
        fontSize: 16,
    },
    orText: {
        textAlign: 'center',
        color: '#666',
        marginVertical: 16,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        marginBottom: 12,
    },
    socialIcon: {
        width: 22,
        height: 22,
    },
    // Styles for the Continue Button
    continueButton: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    continueButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PhoneInputComponent;
