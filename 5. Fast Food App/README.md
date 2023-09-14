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

React Native Hero Icons:
1. npm i react-native-heroicons react-native-svg
https://www.npmjs.com/package/react-native-heroicons
https://heroicons.com/

React Navigation:
1. npm install @react-navigation/native
2. npm install @react-navigation/native-stack
3. npm install @react-navigation/bottom-tabs
4. npx expo install react-native-screens react-native-safe-area-context
https://reactnavigation.org/docs/getting-started

Expo Linear Gradient:
1. npm i expo-linear-gradient
https://www.npmjs.com/package/expo-linear-gradient

All the Dependencies:
npm i react-native-animatable react-native-feather react-native-ratings react-native-safe-area-context react-native-screens react-native-star-rating

npm i -D babel-plugin-module-resolver deprecated-react-native-prop-types

!IMP!
If dependencies are out of date run in terminal:
npx expo-doctor
npx expo install --fix
npx expo install --check
