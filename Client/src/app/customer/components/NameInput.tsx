import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const NameInput = ({ firstName, setFirstName, lastName, setLastName, onBack, onNext }) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>What's your name?</Text>
                <Text style={styles.subtitle}>Let us know how to properly address you</Text>

                <Text style={styles.inputLabel}>First name</Text>
                <TextInput
                    style={styles.nameInput}
                    placeholder="Enter first name"
                    value={firstName}
                    onChangeText={setFirstName}
                />

                <Text style={styles.inputLabel}>Last name</Text>
                <TextInput
                    style={styles.nameInput}
                    placeholder="Enter last name"
                    value={lastName}
                    onChangeText={setLastName}
                />
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#666',
        marginBottom: 24,
    },
    nameInput: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
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

export default NameInput;