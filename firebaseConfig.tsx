
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAd6avwOuBDp4E4Ede6Wdcy32gCPEONtjY",
  authDomain: "barkevents-68d83.firebaseapp.com",
  projectId: "barkevents-68d83",
  storageBucket: "barkevents-68d83.appspot.com",
  messagingSenderId: "241458437744",
  appId: "1:241458437744:web:bdc2eeae238df6f4b15eb5",
  measurementId: "G-Q9RW5VLKSM",
};


const app = initializeApp(FIREBASE_CONFIG);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };
