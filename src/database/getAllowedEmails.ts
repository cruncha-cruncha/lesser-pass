import { getDoc } from "firebase/firestore";
import { getAllowedEmailsRef } from "./getAllowedEmailsRef";

export const getAllowedEmails = async (): Promise<string[]> => {

    const docRef = getAllowedEmailsRef();
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().emails;
    }
    
    return [];
}