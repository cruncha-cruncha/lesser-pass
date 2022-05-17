import { setDoc } from "firebase/firestore";
import { getAccountRef } from "./getAccountRef";
import { UID, Account } from '../types';
import { sanitizeAccount } from "./sanitizeAccount";


export const updateAccount = async ({ uid, data }: {uid:UID, data:Account}): Promise<boolean> => {
    const goodAccount = sanitizeAccount(data);

    const aid = goodAccount.id;

    const docRef = await getAccountRef({ uid, aid });
    return setDoc(docRef, goodAccount).then(() => {
        return true;
    }).catch((e) => {
        console.error(e);
        return false;
    }); 
}