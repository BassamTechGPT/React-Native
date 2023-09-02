# STEPS FOR INSTALLATION

React Native Expo Application:
1. npx create-expo-app --template
2. npx expo start
https://docs.expo.dev/get-started/create-a-project/

React Navigation:
1. npm install @react-navigation/native
2. npm install @react-navigation/native-stack
3. npx expo install react-native-screens react-native-safe-area-context
https://reactnavigation.org/docs/getting-started

Tailwind CSS:
1. npm i nativewind
2. npm install -D tailwindcss
3. npm i tailwindcss@3.3.2
https://www.nativewind.dev/quick-starts/expo

4. npx tailwindcss init
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
1. npm i react-native-heroicons
https://www.npmjs.com/package/react-native-heroicons
https://heroicons.com/

React Native Responsive Screen:
1. npm i react-native-responsive-screen
https://www.npmjs.com/package/react-native-responsive-screen

Expo Linear Gradient:
1. npm i expo-linear-gradient
https://www.npmjs.com/package/expo-linear-gradient

!IMP!
If dependencies are out of date run in terminal:
npx expo-doctor
npx expo install --fix
npx expo install --check
