import firebase from "firebase/app";

import { connect } from './connect';

export const createUserProfile = async ({ uid }) => {
  if (!uid) {
    return;
  }
  
  await connect();
  const db = firebase.firestore();
  await db.collection('data').doc(uid).get().then(async (snapshot) => {
    if (!snapshot.exists) {
      await db.collection('data').doc(uid).set({});
    }
  });
}