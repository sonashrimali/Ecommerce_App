// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AlzaSyA4CMb-W2gKtamUFzSZtXrAaw53sl8rklD",
  authDomain: "e-commerce-32-e7c47.firebaseapp.com",
  projectId: "e-commerce-32-e7c47",
  storageBucket: "e-commerce-32-e7c47.appspot.com",
  messagingSenderId: "659672458201",
  appId: "1:659672458201:android:92e2d94d0c903c5e67efc8"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { auth, app, db };
