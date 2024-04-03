
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCsHX7zisuFJSRWpL7jwsoIG13lkMw1zq8",
  authDomain: "microresults-f36e6.firebaseapp.com",
  projectId: "microresults-f36e6",
  storageBucket: "microresults-f36e6.appspot.com",
  messagingSenderId: "422603519996",
  appId: "1:422603519996:web:fd5be7da7ecd94148de479"
};


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };