import { setDoc } from "firebase/firestore";
import { getAccountRef } from "./getAccountRef";
import { UID, Account } from '../types';
import { sanitizeAccount } from "./sanitizeAccount";

export const createAccount = async ({ uid, data }: {uid:UID, data:Account}): Promise<boolean> => {
    const newAccount = sanitizeAccount(data);
    if (!newAccount) {
        return false;
    }
    
    const aid = newAccount.id;

    const docRef = await getAccountRef({ uid, aid });
    return setDoc(docRef, data).then(() => {
        return true;
    }).catch((e) => {
        console.error(e);
        return false;
    });
}