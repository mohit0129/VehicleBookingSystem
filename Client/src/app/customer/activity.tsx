import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RIDE_DATA = [
  {
    id: '1',
    pickup: 'Maruti Nandan Appartment',
    dropoff: 'Shilaj Circle',
    date: '9 Feb',
    time: '14:57',
    price: '₹0.00',
    status: 'Cancelled',
    vehicleType: 'auto',
  },
  {
    id: '2',
    pickup: 'Shilaj Circle',
    dropoff: 'City Center Mall',
    date: '9 Feb',
    time: '14:56',
    price: '₹0.00',
    status: 'Cancelled',
    vehicleType: 'car',
  },
  {
    id: '3',
    pickup: 'Maruti Nandan Appartment',
    dropoff: 'Railway Station',
    date: '9 Feb',
    time: '14:50',
    price: '₹0.00',
    status: 'Cancelled',
    vehicleType: 'car',
  },
  {
    id: '4',
    pickup: 'Maruti Nandan Appartment',
    dropoff: 'Airport',
    date: '9 Feb',
    time: '14:48',
    price: '₹0.00',
    status: 'Cancelled',
    vehicleType: 'car',
  },
  {
    id: '5',
    pickup: 'Setudham Society',
    dropoff: 'Central Market',
    date: '2 Feb',
    time: '17:24',
    price: '₹288.00',
    status: 'Completed',
    vehicleType: 'auto',
  },
  {
    id: '6',
    pickup: 'Setudham Society',
    dropoff: 'Tech Park',
    date: '18 Jan',
    time: '16:46',
    price: '₹257.00',
    status: 'Completed',
    vehicleType: 'auto',
  },
];

const VehicleIcon = ({ type }) => {
  if (type === 'auto') {
    return (
      <View style={[styles.vehicleIconContainer, { backgroundColor: '#333' }]}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/509/509999.png' }}
          style={styles.autoIcon}
        />
      </View>
    );
  } else {
    return (
      <View style={[styles.vehicleIconContainer, { backgroundColor: '#333' }]}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/744/744465.png' }}
          style={styles.carIcon}
        />
      </View>
    );
  }
};

const RideItem = ({ item }) => {
  return (
    <View style={styles.rideItem}>
      <VehicleIcon type={item.vehicleType} />
      
      <View style={styles.rideDetails}>
        <View style={styles.locationContainer}>
          <View style={styles.routeInfo}>
            <View style={styles.dotLineContainer}>
              <View style={styles.dot} />
              <View style={styles.verticalLine} />
              <View style={[styles.dot, styles.destinationDot]} />
            </View>
            
            <View style={styles.addressContainer}>
              <Text style={styles.pickup}>{item.pickup}</Text>
              <Text style={styles.dropoff}>{item.dropoff}</Text>
            </View>
          </View>
          
          <Text style={styles.dateTime}>{item.date} • {item.time}</Text>
          <Text style={[
            styles.price, 
            item.status === 'Cancelled' ? styles.cancelledPrice : styles.completedPrice
          ]}>
            {item.price} • {item.status}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.rebookButton}>
          <Ionicons name="refresh-outline" size={18} color="#fff" />
          <Text style={styles.rebookText}>Rebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Divider = () => <View style={styles.divider} />;

const Activity = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
      </View>
      
      <FlatList
        data={RIDE_DATA}
        renderItem={({ item }) => <RideItem item={item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Divider}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
  },
  rideItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  vehicleIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  autoIcon: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
  carIcon: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
  rideDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flex: 1,
  },
  routeInfo: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  dotLineContainer: {
    width: 14,
    alignItems: 'center',
    marginRight: 8,
    marginTop: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'black',
  },
  destinationDot: {
    borderRadius: 0,
    backgroundColor: 'black',
  },
  verticalLine: {
    width: 1,
    height: 16,
    backgroundColor: '#555',
    marginVertical: 2,
  },
  addressContainer: {
    flex: 1,
  },
  pickup: {
    fontSize: 15,
    // fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },
  dropoff: {
    fontSize: 15,
    color: 'black',
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
  },
  rebookButton: {
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    alignSelf: 'flex-start',
  },
  rebookText: {
    color: '#fff',
    marginLeft: 4,
    fontWeight: '500',
  },
  divider: {
    height: 0.,
    backgroundColor: '#333',
    marginHorizontal: 16,
  },
});

export default Activity;