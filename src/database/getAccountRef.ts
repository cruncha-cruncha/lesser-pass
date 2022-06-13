import { doc, getFirestore } from 'firebase/firestore';
import { AID, UID } from "../types";

export const getAccountRef = ({ uid, aid }: {uid:UID, aid:AID}) => {
    const db = getFirestore();
    return doc(db, "data", uid, "accounts", aid);
}