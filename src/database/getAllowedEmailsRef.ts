
import { doc, getFirestore } from 'firebase/firestore';

export const getAllowedEmailsRef = () => {
    const db = getFirestore();
    return doc(db, "public", "allowedLogins");
}