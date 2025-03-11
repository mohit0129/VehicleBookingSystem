// import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, useColorScheme, Switch } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { Ionicons } from '@expo/vector-icons'
// import { RFValue } from 'react-native-responsive-fontsize'
// import { Colors } from '@/utils/Constants'
// import { logout } from '@/service/authService'
// import { useWS } from '@/service/WSProvider'
// import { Star } from 'lucide-react-native'
// import appJson from '../../../app.json'

// const Account = () => {
//     const { disconnect } = useWS()
//     const systemColorScheme = useColorScheme()
//     const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark')
//     const [user, setUser] = useState({
//         name: 'Mohit Limbachiya',
//         profilePhoto: null,
//         mobileNumber: 9484452440,
//         email: 'mohit10209@gmail.com',
//     })

//     // Set up theme colors based on dark/light mode - more subtle palette
//     const themeColors = {
//         background: isDarkMode ? '#121212' : '#F5F7FA',
//         card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
//         primary: isDarkMode ? '#3E4A59' : '#475569', // More neutral primary color
//         accent: isDarkMode ? '#64748B' : '#64748B', // Subtle accent color
//         text: isDarkMode ? '#F1F5F9' : '#1E293B',
//         textLight: isDarkMode ? '#94A3B8' : '#64748B',
//         border: isDarkMode ? '#2C3440' : '#E2E8F0',
//         actionButton: isDarkMode ? '#2D2D2D' : '#FFFFFF',
//         danger: '#EF4444',
//     }

//     // Toggle dark mode function
//     const toggleDarkMode = () => {
//         setIsDarkMode(previous => !previous)
//     }

//     // List of menu items with improved organization and grouping
//     const menuSections = [
//         {
//             title: 'Account Settings',
//             items: [
//                 {
//                     title: 'Dark Mode',
//                     icon: isDarkMode ? 'moon' : 'sunny-outline',
//                     isToggle: true,
//                     value: isDarkMode,
//                     onToggle: toggleDarkMode
//                 },
//                 {
//                     title: 'Languages',
//                     icon: 'language-outline',
//                     onPress: () => Alert.alert("Language Settings", "This feature will be available soon.")
//                 },
//                 {
//                     title: 'Notifications',
//                     icon: 'notifications-outline',
//                     onPress: () => Alert.alert("Notifications", "There are no new messages.")
//                 },
//             ]
//         },
//         {
//             title: 'Personal Information',
//             items: [
//                 {
//                     title: 'Saved Addresses',
//                     icon: 'location-outline',
//                     onPress: () => console.log('Addresses pressed')
//                 },
//                 {
//                     title: 'Emergency Contacts',
//                     icon: 'call-outline',
//                     onPress: () => console.log('Emergency contacts pressed')
//                 },
//             ]
//         },
//         {
//             title: 'Payments & Promotions',
//             items: [
//                 {
//                     title: 'Payment Methods',
//                     icon: 'card-outline',
//                     onPress: () => console.log('Payment methods pressed')
//                 },
//                 {
//                     title: 'Promo Codes',
//                     icon: 'pricetag-outline',
//                     onPress: () => console.log('Promo codes pressed')
//                 },
//             ]
//         },
//         {
//             title: 'Account Management',
//             items: [
//                 {
//                     title: 'Delete Account',
//                     icon: 'trash-outline',
//                     color: themeColors.danger,
//                     onPress: () => Alert.alert(
//                         "Delete Account",
//                         "Are you sure you want to delete your account? This action cannot be undone.",
//                         [
//                             { text: "Cancel", style: "cancel" },
//                             { text: "Delete", style: "destructive" }
//                         ]
//                     )
//                 }
//             ]
//         }
//     ]

//     // Function to handle logout
//     const handleLogout = () => {
//         Alert.alert(
//             "Log Out",
//             "Are you sure you want to log out?",
//             [
//                 { text: "Cancel", style: "cancel" },
//                 {
//                     text: "Log Out", onPress: () => {
//                         logout(disconnect)
//                         console.log('Logged out')
//                     }
//                 }
//             ]
//         )
//     }

//     return (
//         <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
//             {/* User Profile Section */}
//             <View style={[styles.profileSection, { backgroundColor: themeColors.card }]}>
//                 <View style={styles.profileHeader}>
//                     {/* User Profile Picture */}
//                     {/* {user.profilePhoto ? (
//                         <Image source={{ uri: user.profilePhoto }} style={styles.profilePhoto} />
//                     ) : (
//                         <View style={[styles.defaultPhoto, { backgroundColor: `${themeColors.accent}20` }]}>
//                             <Text style={[styles.profileInitials, { color: themeColors.accent }]}>
//                                 {user.name.split(' ').map(n => n[0]).join('')}
//                             </Text>
//                         </View>
//                     )} */}

//                     {user.profilePhoto ? (
//                         <Image source={{ uri: user.profilePhoto }} style={styles.profilePhoto} />
//                     ) : (
//                         <View style={styles.defaultPhoto}>
//                             <Ionicons name="person" size={RFValue(30)} color={'#ccc'} />
//                         </View>
//                     )}

//                     <View style={styles.profileInfo}>
//                         <Text style={[styles.profileName, { color: themeColors.text }]}>
//                             {user.name}
//                         </Text>
//                         <Text style={[styles.profileDetailText, { color: themeColors.textLight }]}>
//                             +{user.mobileNumber}
//                         </Text>
//                         <Text style={[styles.profileDetailText, { color: themeColors.textLight }]}>
//                             {user.email}
//                         </Text>
//                     </View>

//                     <TouchableOpacity style={styles.profileArrow}>
//                         <Ionicons name="chevron-forward" size={RFValue(20)} color={themeColors.textLight} />
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             {/* Quick Action Buttons */}
//             <View style={styles.quickActions}>
//                 <TouchableOpacity
//                     style={[styles.actionButton, { backgroundColor: themeColors.card }]}
//                     onPress={() => console.log('Help pressed')}
//                 >
//                     <Ionicons name="help-circle-outline" size={RFValue(20)} color={themeColors.accent} />
//                     <Text style={[styles.actionText, { color: themeColors.text }]}>Help</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={[styles.actionButton, { backgroundColor: themeColors.card }]}
//                     onPress={() => Alert.alert("Wallet", "The feature is not available for now, stay tuned!")}
//                 >
//                     <Ionicons name="wallet-outline" size={RFValue(20)} color={themeColors.accent} />
//                     <Text style={[styles.actionText, { color: themeColors.text }]}>Wallet</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={[styles.actionButton, { backgroundColor: themeColors.card }]}
//                     onPress={() => console.log('Activity pressed')}
//                 >
//                     <Ionicons name="time-outline" size={RFValue(20)} color={themeColors.accent} />
//                     <Text style={[styles.actionText, { color: themeColors.text }]}>Activity</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Menu Items Grouped in Sections */}
//             {menuSections.map((section, sectionIndex) => (
//                 <View key={sectionIndex} style={[styles.sectionContainer, { backgroundColor: themeColors.card }]}>
//                     <Text style={[styles.sectionTitle, { color: themeColors.textLight }]}>
//                         {section.title.toUpperCase()}
//                     </Text>

//                     {section.items.map((item, index) => (
//                         item.isToggle ? (
//                             <View
//                                 key={index}
//                                 style={[
//                                     styles.menuItem,
//                                     index < section.items.length - 1 && { borderBottomWidth: 0.5, borderBottomColor: themeColors.border }
//                                 ]}
//                             >
//                                 <View style={styles.menuLeft}>
//                                     <Ionicons
//                                         name={item.icon}
//                                         size={RFValue(20)}
//                                         color={themeColors.accent}
//                                     />
//                                     <Text style={[styles.menuTitle, { color: themeColors.text }]}>
//                                         {item.title}
//                                     </Text>
//                                 </View>
//                                 <Switch
//                                     value={item.value}
//                                     onValueChange={item.onToggle}
//                                     trackColor={{ false: '#CBD5E1', true: themeColors.accent }}
//                                     thumbColor={'#FFFFFF'}
//                                     ios_backgroundColor="#CBD5E1"
//                                 />
//                             </View>
//                         ) : (
//                             <TouchableOpacity
//                                 key={index}
//                                 style={[
//                                     styles.menuItem,
//                                     index < section.items.length - 1 && { borderBottomWidth: 0.5, borderBottomColor: themeColors.border }
//                                 ]}
//                                 onPress={item.onPress}
//                             >
//                                 <View style={styles.menuLeft}>
//                                     <Ionicons
//                                         name={item.icon}
//                                         size={RFValue(20)}
//                                         color={item.color || themeColors.accent}
//                                     />
//                                     <View style={styles.menuTextContainer}>
//                                         <Text style={[
//                                             styles.menuTitle,
//                                             item.color && { color: item.color },
//                                             !item.color && { color: themeColors.text }
//                                         ]}>
//                                             {item.title}
//                                         </Text>
//                                     </View>
//                                 </View>
//                                 <Ionicons
//                                     name="chevron-forward"
//                                     size={RFValue(16)}
//                                     color={themeColors.textLight}
//                                 />
//                             </TouchableOpacity>
//                         )
//                     ))}
//                 </View>
//             ))}

//             {/* Logout Button */}
//             <TouchableOpacity
//                 style={[styles.logoutButton, { borderColor: themeColors.border }]}
//                 onPress={handleLogout}
//             >
//                 <Ionicons name="exit-outline" size={RFValue(18)} color={themeColors.text} />
//                 <Text style={[styles.logoutText, { color: themeColors.text }]}>Log Out</Text>
//             </TouchableOpacity>

//             {/* App Version */}
//             <Text style={[styles.versionText, { color: themeColors.textLight }]}>
//                 VERSION: {appJson.expo.version}
//             </Text>
//         </ScrollView>
//     )
// }

// const styles = StyleSheet.create({

//     // Updated styles for the new profile section design
//     profileSection: {
//         padding: 16,
//         marginHorizontal: 16,
//         marginTop: 16,
//         borderRadius: 12,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.05,
//         shadowRadius: 2,
//         elevation: 2,
//     },
//     profileHeader: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     profileInfo: {
//         flex: 1,
//         marginLeft: 16,
//     },
//     profileName: {
//         fontSize: RFValue(18),
//         fontWeight: '600',
//         marginBottom: 4,
//     },
//     profileDetailText: {
//         fontSize: RFValue(14),
//         marginTop: 2,
//     },
//     profilePhoto: {
//         width: RFValue(50),
//         height: RFValue(50),
//         borderRadius: RFValue(25),
//     },
//     defaultPhoto: {
//         width: RFValue(50),
//         height: RFValue(50),
//         borderRadius: RFValue(25),
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     profileArrow: {
//         padding: 4,
//     },


//     defaultPhoto: {
//         width: RFValue(50),
//         height: RFValue(50),
//         borderRadius: RFValue(25),
//         backgroundColor: '#f2f2f2',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     container: {
//         flex: 1,
//         backgroundColor: '#f8f8f8',
//     },
//     profileInitials: {
//         fontSize: RFValue(18),
//         fontWeight: 'bold',
//     },
//     profileDetailsCard: {
//         marginTop: 16,
//         borderRadius: 8,
//         padding: 14,
//     },
//     profileDetail: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 4,
//     },
//     divider: {
//         height: 1,
//         backgroundColor: '#E2E8F0',
//         marginVertical: 8,
//     },
//     ratings: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 2,
//     },
//     ratingText: {
//         marginLeft: 4,
//         fontSize: RFValue(12),
//     },
//     editButton: {
//         width: RFValue(34),
//         height: RFValue(34),
//         borderRadius: RFValue(17),
//         borderWidth: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     quickActions: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginHorizontal: 16,
//         marginTop: 16,
//     },
//     actionButton: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '31%',
//         borderRadius: 12,
//         paddingVertical: 16,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.05,
//         shadowRadius: 2,
//         elevation: 1,
//     },
//     actionText: {
//         marginTop: 8,
//         fontSize: RFValue(12),
//         fontWeight: '500',
//     },
//     sectionContainer: {
//         marginTop: 16,
//         marginHorizontal: 16,
//         borderRadius: 12,
//         overflow: 'hidden',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.05,
//         shadowRadius: 2,
//         elevation: 1,
//     },
//     sectionTitle: {
//         fontSize: RFValue(11),
//         fontWeight: '600',
//         letterSpacing: 0.5,
//         paddingHorizontal: 16,
//         paddingTop: 14,
//         paddingBottom: 6,
//     },
//     menuItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingVertical: 14,
//         paddingHorizontal: 16,
//     },
//     menuLeft: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         flex: 1,
//     },
//     menuTextContainer: {
//         marginLeft: 14,
//     },
//     menuTitle: {
//         fontSize: RFValue(14),
//         fontWeight: '500',
//         marginLeft: 14,
//     },
//     logoutButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginHorizontal: 16,
//         marginTop: 20,
//         paddingVertical: 14,
//         borderRadius: 12,
//         borderWidth: 1,
//     },
//     logoutText: {
//         fontSize: RFValue(14),
//         marginLeft: 8,
//         fontWeight: '500',
//     },
//     versionText: {
//         fontSize: RFValue(12),
//         textAlign: 'center',
//         marginVertical: 20,
//     },
// });

// export default Account;
// // import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native'
// // import React, { useState } from 'react'
// // import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
// // import { RFValue } from 'react-native-responsive-fontsize'
// // import { Colors } from '@/utils/Constants'
// // import { logout } from '@/service/authService'
// // import { useWS } from '@/service/WSProvider'
// // import { Star } from 'lucide-react-native';
// // import appJson from '../../../app.json';

// // const Account = () => {
// //     const { disconnect } = useWS()
// //     const [user, setUser] = useState({
// //         name: 'MOHIT LIMBACHIYA',
// //         profilePhoto: null, // Set to null to show default user icon
// //         // You would fetch this from your user state or context
// //     })


// //     // List of menu items
// //     const menuItems = [
// //         { title: 'Settings', icon: 'settings', onPress: () => console.log('Settings pressed') },
// //         { title: 'Messages', icon: 'chatbubble-outline', onPress: () => Alert.alert("There are no new messages.") },
// //         { title: 'Saved Addresses', icon: 'location-outline', onPress: () => console.log('Addresses pressed') },
// //         { title: 'Delete Account', icon: 'trash-outline', color: '#ff3b30', onPress: () => Alert.alert("Are you sure you want to delete your account?") }
// //     ]

// //     // Function to handle logout
// //     const handleLogout = () => {
// //         logout(disconnect)
// //         console.log('Logged out')
// //     }

// //     return (
// //         <ScrollView style={styles.container}>
// //             {/* User Profile Section */}
// //             <View>
// //             {user.profilePhoto ? (
// //                         <Image source={{ uri: user.profilePhoto }} style={styles.profilePhoto} />
// //                     ) : (
// //                         <View style={styles.defaultPhoto}>
// //                             <Ionicons name="person" size={RFValue(30)} color={ '#ccc'} />
// //                         </View>
// //                     )}
// //             </View>
// //         </ScrollView>
// //     )
// // }

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: '#f8f8f8',
// //     },
// //     // profileSection: {
// //     //     backgroundColor: '#fff',
// //     //     padding: 20,
// //     //     borderBottomWidth: 1,
// //     //     borderBottomColor: '#eee',
// //     // },
// //     // userInfo: {
// //     //     flexDirection: 'row',
// //     //     justifyContent: 'space-between',
// //     //     alignItems: 'center',
// //     //     marginBottom: 20,
// //     // },
// //     // userName: {
// //     //     fontSize: RFValue(31),
// //     //     fontWeight: 'bold',
// //     //     color: Colors.text || '#000',
// //     //     marginTop: 10,
// //     // },
// //     // ratings: {
// //     //     flexDirection: 'row',
// //     //     alignItems: 'center',
// //     //     paddingVertical: 3,
// //     //     paddingHorizontal: 8,
// //     //     borderRadius: 12,
// //     //     marginTop: 10,
// //     // },
// //     // ratingText: {
// //     //     color: 'black',
// //     //     marginLeft: 5,
// //     //     fontSize: RFValue(12),
// //     //     fontWeight: 'bold',
// //     // },

// //     // profilePhoto: {
// //     //     width: RFValue(50),
// //     //     height: RFValue(50),
// //     //     borderRadius: RFValue(25),

// //     // },
// //     defaultPhoto: {
// //         width: RFValue(50),
// //         height: RFValue(50),
// //         borderRadius: RFValue(25),
// //         backgroundColor: '#f2f2f2',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// //     // quickActions: {
// //     //     flexDirection: 'row',
// //     //     justifyContent: 'space-around',
// //     //     marginTop: 30,
// //     //     marginBottom: 10,
// //     // },
// //     // actionButton: {
// //     //     alignItems: 'center',
// //     //     backgroundColor: 'lightgray',
// //     //     padding: 30,
// //     //     borderRadius: 15
// //     // },
// //     // actionText: {
// //     //     marginTop: 5,
// //     //     fontSize: RFValue(12),
// //     //     color: '#000',
// //     //     fontWeight: 500
// //     // },
// //     // sectionContainer: {
// //     //     backgroundColor: '#fff',
// //     //     marginTop: 15,
// //     //     padding: 27,
// //     //     borderRadius: 10,
// //     //     marginHorizontal: 10,
// //     // },
// //     // sectionTitle: {
// //     //     fontSize: RFValue(16),
// //     //     fontWeight: 'bold',
// //     //     marginBottom: 15,
// //     //     color: Colors.text || '#000',
// //     // },
// //     // promoItem: {
// //     //     flexDirection: 'row',
// //     //     justifyContent: 'space-between',
// //     //     alignItems: 'center',
// //     //     paddingVertical: 12,
// //     //     borderBottomWidth: 1,
// //     //     borderBottomColor: '#eee',
// //     // },
// //     // promoLeft: {
// //     //     flex: 1,
// //     // },
// //     // promoCode: {
// //     //     fontSize: RFValue(14),
// //     //     fontWeight: 'bold',
// //     //     color: Colors.primary || '#000',
// //     // },
// //     // promoDescription: {
// //     //     fontSize: RFValue(12),
// //     //     color: Colors.textLight || '#555',
// //     //     marginTop: 2,
// //     // },
// //     // promoExpiry: {
// //     //     fontSize: RFValue(10),
// //     //     color: Colors.textLight || '#555',
// //     //     marginTop: 2,
// //     // },
// //     // applyPromo: {
// //     //     fontSize: RFValue(14),
// //     //     color: Colors.primary || '#000',
// //     //     fontWeight: 'bold',
// //     // },
// //     // noPromoText: {
// //     //     fontSize: RFValue(14),
// //     //     color: Colors.textLight || '#555',
// //     //     fontStyle: 'italic',
// //     //     textAlign: 'center',
// //     //     padding: 10,
// //     // },
// //     // menuItem: {
// //     //     flexDirection: 'row',
// //     //     alignItems: 'center',
// //     //     justifyContent: 'space-between',
// //     //     paddingVertical: 15,
// //     //     borderBottomWidth: 1,
// //     //     borderBottomColor: '#eee',
// //     // },
// //     // menuLeft: {
// //     //     flexDirection: 'row',
// //     //     alignItems: 'center',
// //     //     flex: 1,
// //     // },
// //     // menuTitle: {
// //     //     fontSize: RFValue(15),
// //     //     marginLeft: 15,
// //     //     color: Colors.text || '#000',
// //     // },
// //     // badge: {
// //     //     backgroundColor: Colors.primary || '#000',
// //     //     borderRadius: 10,
// //     //     minWidth: 20,
// //     //     height: 20,
// //     //     justifyContent: 'center',
// //     //     alignItems: 'center',
// //     //     marginRight: 10,
// //     // },
// //     // badgeText: {
// //     //     color: '#fff',
// //     //     fontSize: RFValue(10),
// //     //     fontWeight: 'bold',
// //     // },
// //     // logoutButton: {
// //     //     flexDirection: 'row',
// //     //     alignItems: 'center',
// //     //     paddingVertical: 15,
// //     //     marginTop: 5,
// //     // },
// //     // logoutText: {
// //     //     fontSize: RFValue(15),
// //     //     marginLeft: 15,
// //     //     color: Colors.text || '#000',
// //     // },
// //     // versionText: {
// //     //     fontSize: RFValue(12),
// //     //     color: Colors.textLight || '#888',
// //     //     textAlign: 'center',
// //     //     marginVertical: 20,
// //     // },
// // });

// // export default Account;

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
                },
                {
                    title: 'Emergency Contacts',
                    icon: 'call-outline',
                },
            ]
        },
        {
            title: 'Payments & Promotions',
            items: [
                {
                    title: 'Payment Methods',
                    icon: 'card-outline',
                },
                {
                    title: 'Available Promo Codes',
                    icon: 'pricetag-outline',
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
                        <Text size={RFValue(20)} ><Star style={{color:'black'}} size={20} />5.0</Text>
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