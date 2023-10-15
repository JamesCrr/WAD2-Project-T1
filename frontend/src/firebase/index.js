import { initializeApp } from "firebase/app"
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore"
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

// const citiesRef = collection(firebase_firestore, "cities")
// await setDoc(doc(citiesRef, "SF"), {
//   name: "San Francisco",
//   state: "CA",
//   country: "USA",
//   capital: false,
//   population: 860000,
//   regions: ["west_coast", "norcal"],
// })
// await setDoc(doc(citiesRef, "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA",
//   capital: false,
//   population: 3900000,
//   regions: ["west_coast", "socal"],
// })
// await setDoc(doc(citiesRef, "DC"), {
//   name: "Washington, D.C.",
//   state: null,
//   country: "USA",
//   capital: true,
//   population: 680000,
//   regions: ["east_coast"],
// })
// await setDoc(doc(citiesRef, "TOK"), {
//   name: "Tokyo",
//   state: null,
//   country: "Japan",
//   capital: true,
//   population: 9000000,
//   regions: ["kanto", "honshu"],
// })
// await setDoc(doc(citiesRef, "BJ"), {
//   name: "Beijing",
//   state: null,
//   country: "China",
//   capital: true,
//   population: 21500000,
//   regions: ["jingjinji", "hebei"],
// })
