import {initializeApp} from 'firebase/app'
import { getFirestore } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

import 'firebase/auth'

const app = initializeApp({
    apiKey: process.env.REACT_APP_apiKey ,
    authDomain:process.env.REACT_APP_authDomain ,
    projectId:process.env.REACT_APP_projectId ,
    storageBucket:process.env.REACT_APP_storageBucket ,
    messagingSenderId:process.env.REACT_APP_messagingSenderId ,
    appId:process.env.REACT_APP_appId
})

const firestore = getFirestore(app)
const auth  = getAuth(app)



export {firestore,auth, createUserWithEmailAndPassword, signInWithEmailAndPassword}