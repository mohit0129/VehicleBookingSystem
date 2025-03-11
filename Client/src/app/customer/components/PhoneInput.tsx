import React, { useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const OTPInput = ({ firstName, phoneNumber, otp, setOtp, onBack, onNext }) => {
    const otpInputRefs = useRef([]);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Welcome back, {firstName}.</Text>
                <Text style={styles.subtitle}>
                    Enter the 4-digit code sent via SMS at {phoneNumber}.
                </Text>
                <TouchableOpacity>
                    <Text style={styles.linkText}>Changed your mobile number?</Text>
                </TouchableOpacity>
                
                <View style={styles.otpContainer}>
                    {[...Array(4)].map((_, index) => (
                        <TextInput
                            key={index}
                            ref={(el) => (otpInputRefs.current[index] = el)}
                            style={[
                                styles.otpInput,
                                index === 0 && otp[0] ? styles.otpInputFilled : null
                            ]}
                            maxLength={1}
                            keyboardType="number-pad"
                            value={otp[index] || ''}
                            onChangeText={(value) => {
                                const newOtp = otp.split('');
                                newOtp[index] = value;
                                setOtp(newOtp.join(''));

                                // Move to the next field if value is entered
                                if (value && index < 3) {
                                    otpInputRefs.current[index + 1]?.focus();
                                }

                                // Move to the previous field if value is deleted
                                if (!value && index > 0) {
                                    otpInputRefs.current[index - 1]?.focus();
                                }
                            }}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Backspace' && otp[index] === '') {
                                    // Move to the previous field if backspace is pressed and current OTP is empty
                                    otpInputRefs.current[index - 1]?.focus();
                                }
                            }}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={onBack}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.nextButton} 
                    onPress={onNext}
                >
                    <Text style={styles.nextButtonText}>Next →</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#000',
        marginBottom: 12,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 24,
        gap: 10,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 24,
        backgroundColor: '#F5F5F5',
    },
    otpInputFilled: {
        borderWidth: 2,
        borderColor: '#000',
    },
    linkText: {
        color: '#000',
        textDecorationLine: 'underline',
        fontSize: 15,
    },
    alternativeLoginButton: {
        backgroundColor: '#F5F5F5',
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    alternativeLoginText: {
        fontSize: 16,
    },
    moreOptionsButton: {
        backgroundColor: '#F5F5F5',
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 12,
        width: "50%",
    },
    moreOptionsText: {
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        marginBottom: 20,
    },
    backButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 24,
        color: '#000',
    },
    nextButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    nextButtonText: {
        fontSize: 16,
        color: '#000',
    },
});

export default OTPInput;