import firebase from "firebase/app";
import "firebase/auth";
export const auth = firebase.initializeApp({
  apiKey: "AIzaSyDpMH92Ji63NLWYWVVIbLPFcyQO0fDneaA",
  authDomain: "unichat-3f7a4.firebaseapp.com",
  projectId: "unichat-3f7a4",
  storageBucket: "unichat-3f7a4.appspot.com",
  messagingSenderId: "464929062908",
  appId: "1:464929062908:web:ec81d7289a29ff62583c79"
}).auth();