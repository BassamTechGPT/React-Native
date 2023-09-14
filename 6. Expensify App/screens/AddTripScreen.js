import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from "../theme";
import BackButton from "../components/backButton";
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { Snackbar } from 'react-native-paper';
import { addDoc } from 'firebase/firestore';
import { tripsRef } from '../config/firebase';
import { useSelector } from 'react-redux';

export default function AddTripScreen() {
    const [place, setPlace] = useState("");
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(state=> state.user);

    const navigation = useNavigation();

    const [portalSnackbarVisible, setPortalSnackbarVisible] = useState(false)

    const handleAddTrip = async () => {
        if (place && country) {
            // navigation.navigate('Home')
            setLoading(true);
            let doc = await addDoc(tripsRef, {
                place,
                country,
                userId: user.uid
            });
            setLoading(false);
            if(doc && doc.id){
                navigation.goBack();
            }
        } else {
            //error message
            setPortalSnackbarVisible(true)
        }
    }
    return (
        <View className="mt-5">
            <View className="flex justify-between h-full mx-4">
                <View className="relative mt-5">
                    {/* Header */}
                    <View className="absolute">
                        <BackButton />
                    </View>
                    <Text className={`${colors.heading} mx-10 text-xl font-bold text-center`}>Add Trip</Text>

                </View>

                {/* Image */}
                <View className="flex-row justify-center my-3 mt-5">
                    <Image className="h-72 w-72" source={require('../assets/images/4.png')} />
                </View>

                {/* Add Trip Content */}
                <View className="space-y-2 mx-2">
                    <Text className={`${colors.heading} text-lg font-bold`}>Where on Earth?</Text>
                    <TextInput value={place} onChangeText={(value) => setPlace(value)} className="p-4 bg-white rounded-full mb-3" />
                    <Text className={`${colors.heading} text-lg font-bold`}>Which Country?</Text>
                    <TextInput value={country} onChangeText={(value) => setCountry(value)} className="p-4 bg-white rounded-full mb-3" />
                </View>

                {/* Add Trip Button */}
                <View>
                    <View>
                        <Snackbar
                            visible={portalSnackbarVisible}
                            onDismiss={() => setPortalSnackbarVisible(false)}
                            action={{
                                label: 'close'
                            }}
                        >
                            Place and Country are required!
                        </Snackbar>
                    </View>
                    {
                        loading ? (<Loading />) : (
                            <TouchableOpacity onPress={handleAddTrip} style={{ backgroundColor: colors.button }} className="my-6 rounded-full p-3 shadow-sm mx-2">
                                <Text className="text-center text-white text-lg font-bold">Add Trip</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>

        </View>
    )
}
