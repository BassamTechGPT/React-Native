import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from "../theme";
import BackButton from "../components/backButton";
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/loading';
import { setUserLoading } from '../redux/slices/user';

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLoading } = useSelector(state => state.user);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [portalSnackbarVisible, setPortalSnackbarVisible] = useState(false)

  const handleSubmit = async () => {
    if (email && password) {
      // navigation.goBack()
      // navigation.navigate('Home')
      try {
        dispatch(setUserLoading(true))
        await signInWithEmailAndPassword(auth, email, password)
        dispatch(setUserLoading(false))
      } catch (e) {
        dispatch(setUserLoading(false))
        e.setPortalSnackbarVisible(true)
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
          <Text className={`${colors.heading} mx-10 text-xl font-bold text-center`}>Sign In</Text>

        </View>

        {/* Image */}
        <View className="flex-row justify-center">
          <Image className="h-60 w-60" source={require('../assets/images/login.png')} />
        </View>

        {/* Sign In Content */}
        <View className="space-y-2 mx-2">
          <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
          <TextInput value={email} onChangeText={(value) => setEmail(value)} className="p-4 bg-white rounded-full mb-3" />
          <Text className={`${colors.heading} text-lg font-bold`}>Password</Text>
          <TextInput value={password} secureTextEntry onChangeText={(value) => setPassword(value)} className="p-4 bg-white rounded-full mb-3" />
          <TouchableOpacity className="flex-row justify-end">
            <Text>Forget Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <View className="space-y-0">
          <View>
            <Snackbar
              visible={portalSnackbarVisible}
              onDismiss={() => setPortalSnackbarVisible(false)}
              action={{
                label: 'close'
              }}
            >
              Email and Password is required!
            </Snackbar>
          </View>

          {
            userLoading ? (<Loading />) : (
              <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: colors.button }} className="my-8 rounded-full p-3 shadow-sm mx-2">
                <Text className="text-center text-white text-lg font-bold">Sign In</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>

    </View>
  )
}
