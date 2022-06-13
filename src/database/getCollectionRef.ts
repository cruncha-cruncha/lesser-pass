import { collection, getFirestore } from 'firebase/firestore';
import { UID } from "../types";

export const getCollectionRef = ({ uid }: {uid:UID}) => {
    const db = getFirestore();
    return collection(db, "data", uid, "accounts");
}