// // firebaseConfig.ts
// import { initializeApp, getApps, getApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyAd6avwOuBDp4E4Ede6Wdcy32gCPEONtjY',
//   authDomain: 'barkevents-68d83.firebaseapp.com',
//   projectId: 'barkevents-68d83',
//   storageBucket: 'barkevents-68d83.appspot.com',
//   messagingSenderId: '241458437744',
//   appId: '1:241458437744:web:bdc2eeae238df6f4b15eb5',
//   measurementId: 'G-Q9RW5VLKSM',
// };

// // Prevent re-initialization in Expo web/refresh environments
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase config
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAd6avwOuBDp4E4Ede6Wdcy32gCPEONtjY",
  authDomain: "barkevents-68d83.firebaseapp.com",
  projectId: "barkevents-68d83",
  storageBucket: "barkevents-68d83.appspot.com",
  messagingSenderId: "241458437744",
  appId: "1:241458437744:web:bdc2eeae238df6f4b15eb5",
  measurementId: "G-Q9RW5VLKSM",
};

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);

// ✅ Persist auth using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };
