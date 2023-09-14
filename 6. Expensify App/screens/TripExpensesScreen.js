import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { colors } from "../theme";
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BackButton from "../components/backButton";
import ExpenseCard from '../components/expenseCard';
import { getDocs, query, where } from 'firebase/firestore';
import { expensesRef } from '../config/firebase';

const items = [
    {
        id: 1,
        title: 'ate sandwitch',
        amount: 4,
        category: 'food'
    },
    {
        id: 2,
        title: 'bought a jacket',
        amount: 50,
        category: 'shopping'
    },
    {
        id: 3,
        title: 'watched a movie',
        amount: 100,
        category: 'entertainment'
    }
]

export default function TripExpensesScreen(props) {

    const { id, place, country } = props.route.params;
    const navigation = useNavigation();

    const [expenses, setExpenses] = useState([])

    const isFocused = useIsFocused();

    const fetchExpenses = async () => {
        const q = query(expensesRef, where("tripId", "==", id));
        const querySnapshot = await getDocs(q);
        let data = [];

        querySnapshot.forEach(doc => {
            // console.log('document: ', doc.data());
            data.push({ ...doc.data(), id: doc.id })
        })
        setExpenses(data);
    }

    useEffect(() => {
        if (isFocused)
            fetchExpenses();
    }, [isFocused])

    return (
        <View className="mt-5 flex-1">
            <View className="px-4">
                {/* Header */}
                <View className="relative mt-5">
                    <View className="absolute top-2">
                        <BackButton />
                    </View>
                    <View>
                        <Text className={`${colors.heading} mx-10 text-xl font-bold text-center`}>{place}</Text>
                        <Text className={`${colors.heading} mx-10 text-xs text-center`}>{country}</Text>
                    </View>

                </View>

                {/* Banner */}
                <View className="flex-row justify-center rounded-xl mb-4">
                    <Image source={require('../assets/images/7.png')} className="w-60 h-60" />
                </View>

                {/* Recent Trips */}
                <View className="space-y-1">
                    <View className="flex-row justify-between">
                        <Text className={`${colors.heading} font-bold text-xl`}>Expenses</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AddExpense', { id, place, country })} className="p-2 px-3 bg-white border-gray-200 rounded-full">
                            <Text className={colors.heading}>Add Expense</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 400 }}>
                        {/* Trip Expense Card */}
                        <FlatList
                            data={expenses}
                            ListEmptyComponent={<EmptyList message={"You haven't recorded any expenses yet"} />}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            className="m-1"
                            renderItem={({ item }) => {
                                return (
                                    <ExpenseCard item={item} />
                                )
                            }}
                        />
                    </View>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}