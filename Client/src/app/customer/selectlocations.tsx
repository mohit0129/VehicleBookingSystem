import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { homeStyles } from '@/styles/homeStyles'
import { StatusBar } from 'expo-status-bar'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '@/utils/Constants'
import { commonStyles } from '@/styles/commonStyles'
import { router } from 'expo-router'
import CustomText from '@/components/shared/CustomText'
import { uiStyles } from '@/styles/uiStyles'
import LocationInput from '../../components/customer/LocationInput'
import { calculateDistance, getLatLong, getPlacesSuggestions } from '@/utils/mapUtils'
import { locationStyles } from '@/styles/locationStyles'
import { useUserStore } from '@/store/userStore'
import LocationItem from '../../components/customer/LocationItem'
import MapPickerModal from '../../components/customer/MapPickerModal'

const selectlocations = () => {

  const { location, setLocation } = useUserStore()

  const [pickup, setPickup] = useState("")
  const [pickupCoords, setPickupCoords] = useState<any>(null)
  const [dropCoords, setDropCoords] = useState<any>(null)
  const [drop, setDrop] = useState("")
  const [locations, setLocations] = useState([])
  const [focusedInput, setFocusedInput] = useState('drop')
  const [modalTitle, setModalTitle] = useState('drop')
  const [isMapModalVisible, setMapModalVisible] = useState(false)

  const fetchLocation = async (query: string) => {
    if (query?.length > 4) {                                                      //minimum 4 charactors should be entered to get suggetions
      const data = await getPlacesSuggestions(query)
      setLocations(data)
    }
  }

  useEffect(() => {
    if (location) {
      setPickupCoords(location)
      setPickup(location?.address)
    }
  }, [location])

  const swapLocations = () => {
    // Swapping pickup and drop locations
    setPickup(drop)
    setPickupCoords(dropCoords)
    setDrop(pickup)
    setDropCoords(pickupCoords)
  }

  const checkDistance = async () => {
    if (!pickupCoords || !dropCoords) return

    const { latitude: lat1, longitude: lon1 } = pickupCoords
    const { latitude: lat2, longitude: lon2 } = dropCoords

    if (lat1 === lat2 && lon1 === lon2) {
      alert("Pickup and drop locations cannot be same. Please select different locations.")
      return
    }

    const distance = calculateDistance(lat1, lon1, lat2, lon2)

    const minDistance = 0.5 //minimum distance in km (e.g. 500 meters)
    const maxDistance = 50 //maximum distance in km (e.g. 50 km)

    if (distance < minDistance) {
      alert("The selected locations are too close. Please choose locations that are further apart.");
    }
    else if (distance > maxDistance) {
      alert("The selected locations are too far apart. Please select a closer drop location.");
    }
    else {
      setLocations([])
      // router.navigate({
      //   pathname: '/customer/ridebooking',
      //   params: {
      //     distanceInKm: distance.toFixed(2),
      //     drop_latitude: dropCoords.latitude,
      //     drop_longitude: dropCoords.longitude,
      //     drop_address: drop,
      //   }
      // })
      // setDrop('')
      // setPickup('')
      // setDropCoords(null)
      // setPickupCoords(null)

      // setMapModalVisible(false)
      console.log(`Distance is valid : ${distance.toFixed(2)} km`)
    }
  }

  useEffect(() => {
    if (dropCoords && pickupCoords) {
      checkDistance()
    }
    else {
      setLocations([])
      setMapModalVisible(false)
    }
  }, [dropCoords, pickupCoords])

  const addLocation = async (place_id: string) => {
    const data = await getLatLong(place_id)
    if (data) {
      if (focusedInput === 'drop') {
        setDrop(data?.address)
        setDropCoords(data)
      }
      else {
        setLocation(data)
        setPickupCoords(data)
        setPickup(data?.address)
      }
    }
  }

  const renderLocations = ({ item }: any) => {
    return (
      <LocationItem item={item} onPress={() => addLocation(item?.place_id)} />
    )
  }

  console.log("Customer Select Location");

  return (
    <View style={homeStyles.container}>
      <StatusBar
        style='dark'
        backgroundColor='white'
        translucent={false}
      />
      <SafeAreaView />
      <TouchableOpacity style={commonStyles.flexRow} onPress={() => router.back()}>
        <Ionicons name='chevron-back' size={24} color={Colors.iosColor} />
        <CustomText fontFamily='Regular' style={Colors.iosColor}>Back</CustomText>
      </TouchableOpacity>

      <View style={uiStyles.locationInputs}>
        <LocationInput
          placeholder='Search Pickup Location'
          type='pickup'
          value={pickup}
          onChangeText={(text) => {
            setPickup(text)
            fetchLocation(text)
          }}
          onFocus={() => setFocusedInput('pickup')}

        />
                {/* Swap Button */}
                <TouchableOpacity 
          style={{ alignSelf: 'center', marginVertical: 5 }}
          onPress={swapLocations}
        >
          <MaterialCommunityIcons name="swap-vertical" size={24} color={Colors.iosColor} />
        </TouchableOpacity>
        <LocationInput
          placeholder='Search Drop Location'
          type='drop'
          value={drop}
          onChangeText={(text) => {
            setDrop(text)
            fetchLocation(text)
          }}
          onFocus={() => setFocusedInput('drop')}

        />
        <CustomText fontFamily='Medium' fontSize={10} style={uiStyles.suggestionText}>
          {focusedInput} suggestions
        </CustomText>
      </View>
      <FlatList
        data={locations}
        renderItem={renderLocations}
        keyExtractor={(item: any) => item?.place_id}
        initialNumToRender={5}
        windowSize={5}
        ListFooterComponent={
          <TouchableOpacity style={[commonStyles.flexRow, locationStyles.container]}
            onPress={() => {
              setModalTitle(focusedInput)
              setMapModalVisible(true)
            }}
          >
            <Image source={require('@/assets/icons/map_pin.png')} style={uiStyles.mapPinIcon} />
            <CustomText fontFamily='Medium' fontSize={12}>
              Select from Map
            </CustomText>
          </TouchableOpacity>
        }
      />

<TouchableOpacity
  style={{
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  }}
  onPress={() => {
    if (pickupCoords && dropCoords) {
      const distance = calculateDistance(
        pickupCoords.latitude,
        pickupCoords.longitude,
        dropCoords.latitude,
        dropCoords.longitude
      )
      router.navigate({
        pathname: '/customer/ridebooking',
        params: {
          distanceInKm: distance.toFixed(2),
          drop_latitude: dropCoords.latitude,
          drop_longitude: dropCoords.longitude,
          drop_address: drop,
        }
      })
    } else {
      alert("Please select both pickup and drop locations.")
    }
  }}
>
  <CustomText fontFamily='Medium' style={{ color: 'black' }}>Confirm</CustomText>
</TouchableOpacity>


      {
        isMapModalVisible &&

        <MapPickerModal
          selectedLocation={{
            latitude: focusedInput === 'drop' ? dropCoords?.latitude : pickupCoords?.latitude,
            longitude: focusedInput === 'drop' ? dropCoords?.longitude : pickupCoords?.longitude,
            address: focusedInput === 'drop' ? drop : pickup
          }}
          title={modalTitle}
          visible={isMapModalVisible}
          onClose={() => setMapModalVisible(false)}
          onSelectLocation={(data) => {
            if (data) {
              if (modalTitle === 'drop') {
                setDropCoords(data)
                setDrop(data?.address)
              }
              else {
                setLocation(data)
                setPickupCoords(data)
                setPickup(data?.address)
              }
            }
          }}
        />
      }

    </View>
  )
  
}


export default selectlocations

// import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { homeStyles } from '@/styles/homeStyles'
// import { StatusBar } from 'expo-status-bar'
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'  // Import swap icon
// import { Colors } from '@/utils/Constants'
// import { commonStyles } from '@/styles/commonStyles'
// import { router } from 'expo-router'
// import CustomText from '@/components/shared/CustomText'
// import { uiStyles } from '@/styles/uiStyles'
// import LocationInput from '../../components/customer/LocationInput'
// import { calculateDistance, getLatLong, getPlacesSuggestions } from '@/utils/mapUtils'
// import { locationStyles } from '@/styles/locationStyles'
// import { useUserStore } from '@/store/userStore'
// import LocationItem from '../../components/customer/LocationItem'
// import MapPickerModal from '../../components/customer/MapPickerModal'

// const selectlocations = () => {

//   const { location, setLocation } = useUserStore()

//   const [pickup, setPickup] = useState("")
//   const [pickupCoords, setPickupCoords] = useState<any>(null)
//   const [dropCoords, setDropCoords] = useState<any>(null)
//   const [drop, setDrop] = useState("")
//   const [locations, setLocations] = useState([])
//   const [focusedInput, setFocusedInput] = useState('drop')
//   const [modalTitle, setModalTitle] = useState('drop')
//   const [isMapModalVisible, setMapModalVisible] = useState(false)

//   const fetchLocation = async (query: string) => {
//     if (query?.length > 4) {  // minimum 4 characters should be entered to get suggestions
//       const data = await getPlacesSuggestions(query)
//       setLocations(data)
//     }
//   }

//   useEffect(() => {
//     if (location) {
//       setPickupCoords(location)
//       setPickup(location?.address)
//     }
//   }, [location])

//   const swapLocations = () => {
//     // Swapping pickup and drop locations
//     setPickup(drop)
//     setPickupCoords(dropCoords)
//     setDrop(pickup)
//     setDropCoords(pickupCoords)
//   }

//   const checkDistance = async () => {
//     if (!pickupCoords || !dropCoords) return

//     const { latitude: lat1, longitude: lon1 } = pickupCoords
//     const { latitude: lat2, longitude: lon2 } = dropCoords

//     if (lat1 === lat2 && lon1 === lon2) {
//       alert("Pickup and drop locations cannot be the same. Please select different locations.")
//       return
//     }

//     const distance = calculateDistance(lat1, lon1, lat2, lon2)

//     const minDistance = 0.5  // minimum distance in km
//     const maxDistance = 50   // maximum distance in km

//     if (distance < minDistance) {
//       alert("The selected locations are too close. Please choose locations that are further apart.");
//     } else if (distance > maxDistance) {
//       alert("The selected locations are too far apart. Please select a closer drop location.");
//     } else {
//       setLocations([])
//       router.navigate({
//         pathname: '/customer/ridebooking',
//         params: {
//           distanceInKm: distance.toFixed(2),
//           drop_latitude: dropCoords.latitude,
//           drop_longitude: dropCoords.longitude,
//           drop_address: drop,
//         }
//       })
//       setDrop('')
//       setPickup('')
//       setDropCoords(null)
//       setPickupCoords(null)
//       setMapModalVisible(false)
//     }
//   }

//   useEffect(() => {
//     if (dropCoords && pickupCoords) {
//       checkDistance()
//     } else {
//       setLocations([])
//       setMapModalVisible(false)
//     }
//   }, [dropCoords, pickupCoords])

//   const addLocation = async (place_id: string) => {
//     const data = await getLatLong(place_id)
//     if (data) {
//       if (focusedInput === 'drop') {
//         setDrop(data?.address)
//         setDropCoords(data)
//       } else {
//         setLocation(data)
//         setPickupCoords(data)
//         setPickup(data?.address)
//       }
//     }
//   }

//   const renderLocations = ({ item }: any) => {
//     return (
//       <LocationItem item={item} onPress={() => addLocation(item?.place_id)} />
//     )
//   }

//   return (
//     <View style={homeStyles.container}>
//       <StatusBar
//         style='dark'
//         backgroundColor='white'
//         translucent={false}
//       />
//       <SafeAreaView />
//       <TouchableOpacity style={commonStyles.flexRow} onPress={() => router.back()}>
//         <Ionicons name='chevron-back' size={24} color={Colors.iosColor} />
//         <CustomText fontFamily='Regular' style={Colors.iosColor}>Back</CustomText>
//       </TouchableOpacity>

//       <View style={uiStyles.locationInputs}>
//         <LocationInput
//           placeholder='Search Pickup Location'
//           type='pickup'
//           value={pickup}
//           onChangeText={(text) => {
//             setPickup(text)
//             fetchLocation(text)
//           }}
//           onFocus={() => setFocusedInput('pickup')}
//         />

//         {/* Swap Button */}
//         <TouchableOpacity 
//           style={{ alignSelf: 'center', marginVertical: 5 }}
//           onPress={swapLocations}
//         >
//           <MaterialCommunityIcons name="swap-vertical" size={24} color={Colors.iosColor} />
//         </TouchableOpacity>

//         <LocationInput
//           placeholder='Search Drop Location'
//           type='drop'
//           value={drop}
//           onChangeText={(text) => {
//             setDrop(text)
//             fetchLocation(text)
//           }}
//           onFocus={() => setFocusedInput('drop')}
//         />
        
//         <CustomText fontFamily='Medium' fontSize={10} style={uiStyles.suggestionText}>
//           {focusedInput} suggestions
//         </CustomText>
//       </View>

//       <FlatList
//         data={locations}
//         renderItem={renderLocations}
//         keyExtractor={(item: any) => item?.place_id}
//         initialNumToRender={5}
//         windowSize={5}
//       />

//       {isMapModalVisible && (
//         <MapPickerModal
//           selectedLocation={{
//             latitude: focusedInput === 'drop' ? dropCoords?.latitude : pickupCoords?.latitude,
//             longitude: focusedInput === 'drop' ? dropCoords?.longitude : pickupCoords?.longitude,
//             address: focusedInput === 'drop' ? drop : pickup
//           }}
//           title={modalTitle}
//           visible={isMapModalVisible}
//           onClose={() => setMapModalVisible(false)}
//           onSelectLocation={(data) => {
//             if (data) {
//               if (modalTitle === 'drop') {
//                 setDropCoords(data)
//                 setDrop(data?.address)
//               } else {
//                 setLocation(data)
//                 setPickupCoords(data)
//                 setPickup(data?.address)
//               }
//             }
//           }}
//         />
//       )}
//     </View>
//   )
// }

// export default selectlocations