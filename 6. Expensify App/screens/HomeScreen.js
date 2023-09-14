import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { colors } from "../theme";
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { auth, tripsRef } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { getDocs, query, where } from 'firebase/firestore';

const items = [
  {
    id: 1,
    place: 'New York',
    country: 'USA'
  },
  {
    id: 2,
    place: 'Trafalgar Square',
    country: 'UK'
  },
  {
    id: 3,
    place: 'Sydney',
    country: 'Australia'
  },
  {
    id: 4,
    place: 'Burj Khalifa',
    country: 'UAE'
  },
  {
    id: 5,
    place: 'Cancun',
    country: 'Mexico'
  },
  {
    id: 6,
    place: 'Petronas Tower',
    country: 'Malaysia'
  },
]

export default function HomeScreen() {
  const navigation = useNavigation();

  const { user } = useSelector(state => state.user);
  const [trips, setTrips] = useState([])

  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const q = query(tripsRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    let data = [];

    querySnapshot.forEach(doc => {
      // console.log('document: ', doc.data());
      data.push({ ...doc.data(), id: doc.id })
    })
    setTrips(data);
  }

  useEffect(() => {
    if (isFocused)
      fetchTrips();
  }, [isFocused])

  const handleLogout = async () => {
    await signOut(auth);
  }

  return (
    // Header
    <View className="mt-5 flex-1">
      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>Expensify</Text>
        <TouchableOpacity onPress={handleLogout} className="p-2 px-3 bg-white border-gray-200 rounded-full">
          <Text className={colors.heading}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View className="flex-row justify-center bg-blue-200 rounded-xl mx-4 mb-4">
        <Image source={require('../assets/images/banner.png')} className="w-40 h-40" />
      </View>

      {/* Recent Trips */}
      <View className="px-4 space-y-1">
        <View className="flex-row justify-between">
          <Text className={`${colors.heading} font-bold text-xl`}>Recent Trips</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddTrip')} className="p-2 px-3 bg-white border-gray-200 rounded-full">
            <Text className={colors.heading}>Add Trip</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 400 }}>
          {/* Trip Expense Card */}
          <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={<EmptyList message={"You haven't recorded any trips yet"} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between'
            }}
            className="m-1"
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('TripExpenses', { ...item })} className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
                  <View>
                    <Image source={randomImage()} className="w-36 h-36 mb-2" />
                    <Text className={`${colors.heading} font-bold`}>{item.place}</Text>
                    <Text className={`${colors.heading} text-xs`}>{item.country}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  )
}