// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8F70lT1YHUIxr3DhkbQdd1Os2h3kI5_Q",
    authDomain: "expensify-62f06.firebaseapp.com",
    projectId: "expensify-62f06",
    storageBucket: "expensify-62f06.appspot.com",
    messagingSenderId: "653348857416",
    appId: "1:653348857416:web:99d5e14e0a01e2baa71a7d",
    measurementId: "G-26JCR8ZTEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const tripsRef = collection(db, 'trips')
export const expensesRef = collection(db, 'expenses')

export default app;