import { doc, getFirestore } from 'firebase/firestore';
import { UID } from "../types";

export const getProfileRef = ({ uid }: {uid:UID}) => {
    const db = getFirestore();
    return doc(db, "data", uid);
}