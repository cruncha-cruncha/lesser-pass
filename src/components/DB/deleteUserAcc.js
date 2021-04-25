import firebase from "firebase/app";

import { connect } from './connect';

export const deleteUserAcc = async ({ uid, accId }) => {
  if (!uid || !accId) {
    return;
  }
  
  await connect();
  const db = firebase.firestore();
  await db.collection('data').doc(uid).collection('accounts').doc(accId).delete();
}