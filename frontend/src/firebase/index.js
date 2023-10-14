import { initializeApp } from "firebase/app"
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"

const apiKey = import.meta.env.VITE_FIREBASE_apiKey
const authDomain = import.meta.env.VITE_FIREBASE_authDomain
const projectId = import.meta.env.VITE_FIREBASE_projectId
const storageBucket = import.meta.env.VITE_FIREBASE_storageBucket
const messagingSenderId = import.meta.env.VITE_FIREBASE_messagingSenderId
const appId = import.meta.env.VITE_FIREBASE_appId
const measurementId = import.meta.env.VITE_FIREBASE_measurementId

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
}
const app = initializeApp(firebaseConfig)
export const firebase_firestore = getFirestore(app)
export const firebase_analytics = getAnalytics(app)
export const firebase_auth = getAuth(app)

// // Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }
