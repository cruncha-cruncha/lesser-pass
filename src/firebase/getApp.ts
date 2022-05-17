import { initializeApp, getApps, FirebaseOptions, getApp as originalGetApp } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBSR0d-BPHVVGdlCJcjaDNZhFSt9CH_7vU",
  authDomain: "lesser-pass.firebaseapp.com",
  projectId: "lesser-pass",
  storageBucket: "lesser-pass.appspot.com",
  messagingSenderId: "386351610572",
  appId: "1:386351610572:web:0a5032f9797b7f4f452069",
  measurementId: "G-C7WK4HJ5EJ"
};

export const getApp = () => {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);  
  } else {
    return originalGetApp();
  }
}