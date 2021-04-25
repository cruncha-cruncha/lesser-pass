import firebase from "firebase/app";

import { connect } from './connect';

export const updateUserAcc = async ({ uid, accId, data }) => {
  if (!uid || !accId || !data) {
    return;
  }
  
  await connect();
  const db = firebase.firestore();
  await db.collection('data').doc(uid).collection('accounts').doc(accId).set(data);
}