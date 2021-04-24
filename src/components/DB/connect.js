// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSR0d-BPHVVGdlCJcjaDNZhFSt9CH_7vU",
  authDomain: "lesser-pass.firebaseapp.com",
  projectId: "lesser-pass",
  storageBucket: "lesser-pass.appspot.com",
  messagingSenderId: "386351610572",
  appId: "1:386351610572:web:0a5032f9797b7f4f452069",
  measurementId: "G-C7WK4HJ5EJ"
};

export const connect = async () => {
  if (!firebase.apps.length) {
    await firebase.initializeApp(firebaseConfig);
  }
}