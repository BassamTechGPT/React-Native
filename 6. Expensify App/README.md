# STEPS FOR INSTALLATION

React Native Expo Application:
1. npx create-expo-app --template
2. npm install
3. npx expo start
https://docs.expo.dev/get-started/create-a-project/

Tailwind CSS:
1. npm i nativewind
2. npm i -D tailwindcss@3.3.2
3. npx tailwindcss init
https://www.nativewind.dev/quick-starts/expo

4. add the TailwindCSS by modifying “tailwind.config.js”
// tailwind.config.js

module.exports = {
- content: [],
+ content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
https://www.nativewind.dev/quick-starts/create-react-native-app

5. add the Babel plugin by modifying “babel.config.js”
// babel.config.js

module.exports = {
- plugins: [],
+ plugins: ["nativewind/babel"],
};
https://www.nativewind.dev/quick-starts/create-react-native-app

React Navigation:
1. npm install @react-navigation/native
2. npx expo install react-native-screens react-native-safe-area-context
https://reactnavigation.org/docs/getting-started

3. create folder navigation=>appNavigation.js 
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function AppNavigation() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}

4. npm install @react-navigation/native-stack
https://reactnavigation.org/docs/hello-react-navigation

paste in appNavigation.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

5. create folder screens=>HomeScreen.js
use shortcut rnf for creating a react native functional component boilerplate

React Native Hero Icons:
1. npm i react-native-heroicons react-native-svg
https://www.npmjs.com/package/react-native-heroicons
https://heroicons.com/

Redux Toolkit
1. npm install @reduxjs/toolkit
2. npm install react-redux
https://redux-toolkit.js.org/introduction/getting-started

Firebase
1. npm install firebase
https://firebase.google.com/

React Native Paper
1. npm i react-native-paper
2. npm install react-native-vector-icons
https://callstack.github.io/react-native-paper/docs/guides/getting-started/

3. add the Babel plugin by modifying “babel.config.js”
// babel.config.js

module.exports = {
+ plugins: ["react-native-paper/babel"],


!IMP!
If dependencies are out of date run in terminal:
npx expo-doctor
npx expo install --fix
npx expo install --check

