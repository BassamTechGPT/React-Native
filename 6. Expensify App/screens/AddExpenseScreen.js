import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from "../theme";
import BackButton from "../components/backButton";
import { useNavigation } from '@react-navigation/native';
import { categories } from '../constants';
import { Snackbar } from 'react-native-paper';
import Loading from '../components/loading';
import { addDoc } from 'firebase/firestore';
import { expensesRef } from '../config/firebase';

export default function AddExpenseScreen(props) {
  let { id } = props.route.params;
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const [portalSnackbarVisible, setPortalSnackbarVisible] = useState(false)

  const handleAddExpense = async () => {
    if (title && amount && category) {
      // navigation.goBack();
      setLoading(true);
      let doc = await addDoc(expensesRef, {
        title,
        amount,
        category,
        tripId: id
      })
      setLoading(false);
      if (doc && doc.id) navigation.goBack();

    } else {
      //error message
      setPortalSnackbarVisible(true)
    }
  }
  return (
    <View className="mt-5">
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-5">
            {/* Header */}
            <View className="absolute">
              <BackButton />
            </View>
            <Text className={`${colors.heading} mx-10 text-xl font-bold text-center`}>Add Expense</Text>
          </View>

          {/* Image */}
          <View className="flex-row justify-center">
            <Image className="h-52 w-52" source={require('../assets/images/expenseBanner.png')} />
          </View>

          {/* Add Trip Content */}
          <View className="space-y-1 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>For what?</Text>
            <TextInput value={title} onChangeText={(value) => setTitle(value)} className="p-3 bg-white rounded-full mb-3" />
            <Text className={`${colors.heading} text-lg font-bold`}>How much?</Text>
            <TextInput value={amount} onChangeText={(value) => setAmount(value)} className="p-3 bg-white rounded-full mb-3" />
          </View>
          <View className="mx-2 space-x-2">
            <Text className="text-lg font-bold">Category</Text>
            <View className="flex-row flex-wrap items-center">
              {
                categories.map(cat => {
                  let bgColor = 'bg-white';
                  if (cat.value == category) bgColor = 'bg-green-200'
                  return (
                    <TouchableOpacity onPress={() => setCategory(cat.value)} key={cat.value} className={`${bgColor} rounded-full px-4 p-3 mb-2 mr-2`}>
                      <Text>{cat.title}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        </View>

        {/* Add Expense Button */}
        <View className="space-y-0">
          <View>
            <Snackbar
              visible={portalSnackbarVisible}
              onDismiss={() => setPortalSnackbarVisible(false)}
              action={{
                label: 'close'
              }}
            >
              Please fill all the fields!
            </Snackbar>

          </View>
          {
            loading ? (
              <Loading />
            ) : (
              <TouchableOpacity onPress={handleAddExpense} style={{ backgroundColor: colors.button }} className="my-6 rounded-full p-3 shadow-sm mx-2">
                <Text className="text-center text-white text-lg font-bold">Add Expense</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    </View>
  )
}
