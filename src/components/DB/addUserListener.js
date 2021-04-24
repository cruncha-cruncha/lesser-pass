import firebase from "firebase/app";

import { connect } from './connect';

export const addUserListener = async ({ uid, cb }) => {
  await connect();
  const db = firebase.firestore();
  return db.collection('data').doc(uid).collection('accounts').onSnapshot(s => cb(s), e => {});
}