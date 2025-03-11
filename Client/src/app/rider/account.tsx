

import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, useColorScheme, Switch } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors } from '@/utils/Constants'
import { logout } from '@/service/authService'
import { useWS } from '@/service/WSProvider'
import { Star } from 'lucide-react-native'
import appJson from '../../../app.json'

const Account = () => {
    const { disconnect } = useWS()
    const systemColorScheme = useColorScheme()
    
    // Theme options: 'dark', 'light', or 'system'
    const [themePreference, setThemePreference] = useState('system')
    
    // Calculate actual dark mode based on preference
    const isDarkMode = themePreference === 'system' 
        ? systemColorScheme === 'dark'
        : themePreference === 'dark'
    
    const [user, setUser] = useState({
        name: 'Mohit Limbachiya',
        profilePhoto: null,
        mobileNumber: 9484452440,
        email: 'mohit10209@gmail.com',
    })

    // Set up theme colors based on dark/light mode - more subtle palette
    const themeColors = {
        background: isDarkMode ? '#121212' : '#F5F7FA',
        card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
        primary: isDarkMode ? '#3E4A59' : '#475569', // More neutral primary color
        accent: isDarkMode ? '#64748B' : '#64748B', // Subtle accent color
        text: isDarkMode ? '#F1F5F9' : '#1E293B',
        textLight: isDarkMode ? '#94A3B8' : '#64748B',
        border: isDarkMode ? '#2C3440' : '#E2E8F0',
        actionButton: isDarkMode ? '#2D2D2D' : '#FFFFFF',
        danger: '#EF4444',
    }

    // List of menu items with improved organization and grouping
    const menuSections = [
        {
            title: 'Account Settings',
            items: [
                {
                    title: 'Appearance',
                    icon: 'color-palette-outline',
                    onPress: () => Alert.alert(
                        "Theme Settings",
                        "Choose your preferred theme",
                        [
                            { 
                                text: "Light", 
                                onPress: () => setThemePreference('light') 
                            },
                            { 
                                text: "Dark", 
                                onPress: () => setThemePreference('dark')
                            },
                            { 
                                text: "Device Settings", 
                                onPress: () => setThemePreference('system')
                            },
                            { 
                                text: "Cancel",
                                style: "cancel"
                            }
                        ]
                    )
                },
                {
                    title: 'Languages',
                    icon: 'language-outline',
                    onPress: () => Alert.alert("Language Settings", "This feature will be available soon.")
                },
                {
                    title: 'Notifications',
                    icon: 'notifications-outline',
                    onPress: () => Alert.alert("Notifications", "There are no new messages.")
                },
            ]
        },
        {
            title: 'Personal Information',
            items: [
                {
                    title: 'Saved Addresses',
                    icon: 'location-outline',
                    onPress: () => console.log('Addresses pressed')
                },
                {
                    title: 'Emergency Contacts',
                    icon: 'call-outline',
                    onPress: () => console.log('Emergency contacts pressed')
                },
            ]
        },
        {
            title: 'Payments & Promotions',
            items: [
                {
                    title: 'Payment Methods',
                    icon: 'card-outline',
                    onPress: () => console.log('Payment methods pressed')
                },
                {
                    title: 'Promo Codes',
                    icon: 'pricetag-outline',
                    onPress: () => console.log('Promo codes pressed')
                },
            ]
        },
        {
            title: 'Account Management',
            items: [
                {
                    title: 'Delete Account',
                    icon: 'trash-outline',
                    color: themeColors.danger,
                    onPress: () => Alert.alert(
                        "Delete Account",
                        "Are you sure you want to delete your account? This action cannot be undone.",
                        [
                            { text: "Cancel", style: "cancel" },
                            { text: "Delete", style: "destructive" }
                        ]
                    )
                }
            ]
        }
    ]

    // Function to handle logout
    const handleLogout = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Log Out", onPress: () => {
                        logout(disconnect)
                        console.log('Logged out')
                    }
                }
            ]
        )
    }

    // Helper function to get theme status text
    const getThemeStatusText = () => {
        switch(themePreference) {
            case 'light': return 'Light';
            case 'dark': return 'Dark';
            case 'system': return systemColorScheme === 'dark' ? 'System (Dark)' : 'System (Light)';
            default: return 'System';
        }
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
            {/* User Profile Section */}
            <View style={[styles.profileSection, { backgroundColor: themeColors.card }]}>
                <View style={styles.profileHeader}>
                    {user.profilePhoto ? (
                        <Image source={{ uri: user.profilePhoto }} style={styles.profilePhoto} />
                    ) : (
                        <View style={styles.defaultPhoto}>
                            <Ionicons name="person" size={RFValue(30)} color={'#ccc'} />
                        </View>
                    )}

                    <View style={styles.profileInfo}>
                        <Text style={[styles.profileName, { color: themeColors.text }]}>
                            {user.name}
                        </Text>
                        <Text style={[styles.profileDetailText, { color: themeColors.textLight }]}>
                            +{user.mobileNumber}
                        </Text>
                        <Text style={[styles.profileDetailText, { color: themeColors.textLight }]}>
                            {user.email}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.profileArrow}>
                        <Ionicons name="chevron-forward" size={RFValue(20)} color={themeColors.textLight} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Quick Action Buttons */}
            <View style={styles.quickActions}>
                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: themeColors.card }]}
                    onPress={() => console.log('Help pressed')}
                >
                    <Ionicons name="help-circle-outline" size={RFValue(20)} color={themeColors.accent} />
                    <Text style={[styles.actionText, { color: themeColors.text }]}>Help</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: themeColors.card }]}
                    onPress={() => Alert.alert("Wallet", "The feature is not available for now, stay tuned!")}
                >
                    <Ionicons name="wallet-outline" size={RFValue(20)} color={themeColors.accent} />
                    <Text style={[styles.actionText, { color: themeColors.text }]}>Wallet</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: themeColors.card }]}
                    onPress={() => console.log('Activity pressed')}
                >
                    <Ionicons name="time-outline" size={RFValue(20)} color={themeColors.accent} />
                    <Text style={[styles.actionText, { color: themeColors.text }]}>Activity</Text>
                </TouchableOpacity>
            </View>

            {/* Menu Items Grouped in Sections */}
            {menuSections.map((section, sectionIndex) => (
                <View key={sectionIndex} style={[styles.sectionContainer, { backgroundColor: themeColors.card }]}>
                    <Text style={[styles.sectionTitle, { color: themeColors.textLight }]}>
                        {section.title.toUpperCase()}
                    </Text>

                    {section.items.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.menuItem,
                                index < section.items.length - 1 && { borderBottomWidth: 0.5, borderBottomColor: themeColors.border }
                            ]}
                            onPress={item.onPress}
                        >
                            <View style={styles.menuLeft}>
                                <Ionicons
                                    name={item.icon}
                                    size={RFValue(20)}
                                    color={item.color || themeColors.accent}
                                />
                                <View style={styles.menuTextContainer}>
                                    <Text style={[
                                        styles.menuTitle,
                                        item.color && { color: item.color },
                                        !item.color && { color: themeColors.text }
                                    ]}>
                                        {item.title}
                                    </Text>
                                    
                                    {/* Only add the theme status for the Appearance menu item */}
                                    {item.title === 'Appearance' && (
                                        <Text style={[styles.themeStatus, { color: themeColors.textLight }]}>
                                            {getThemeStatusText()}
                                        </Text>
                                    )}
                                </View>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={RFValue(16)}
                                color={themeColors.textLight}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            ))}

            {/* Logout Button */}
            <TouchableOpacity
                style={[styles.logoutButton, { borderColor: themeColors.border }]}
                onPress={handleLogout}
            >
                <Ionicons name="exit-outline" size={RFValue(18)} color={themeColors.text} />
                <Text style={[styles.logoutText, { color: themeColors.text }]}>Log Out</Text>
            </TouchableOpacity>

            {/* App Version */}
            <Text style={[styles.versionText, { color: themeColors.textLight }]}>
                VERSION: {appJson.expo.version}
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    // Updated styles for the new profile section design
    profileSection: {
        padding: 16,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileInfo: {
        flex: 1,
        marginLeft: 16,
    },
    profileName: {
        fontSize: RFValue(18),
        fontWeight: '600',
        marginBottom: 4,
    },
    profileDetailText: {
        fontSize: RFValue(14),
        marginTop: 2,
    },
    profilePhoto: {
        width: RFValue(50),
        height: RFValue(50),
        borderRadius: RFValue(25),
    },
    profileArrow: {
        padding: 4,
    },
    defaultPhoto: {
        width: RFValue(50),
        height: RFValue(50),
        borderRadius: RFValue(25),
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 16,
    },
    actionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '31%',
        borderRadius: 12,
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    actionText: {
        marginTop: 8,
        fontSize: RFValue(12),
        fontWeight: '500',
    },
    sectionContainer: {
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: RFValue(11),
        fontWeight: '600',
        letterSpacing: 0.5,
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 6,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuTextContainer: {
        marginLeft: 14,
        flex: 1,
    },
    menuTitle: {
        fontSize: RFValue(14),
        fontWeight: '500',
    },
    themeStatus: {
        fontSize: RFValue(12),
        marginTop: 2,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginTop: 20,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
    },
    logoutText: {
        fontSize: RFValue(14),
        marginLeft: 8,
        fontWeight: '500',
    },
    versionText: {
        fontSize: RFValue(12),
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default Account;