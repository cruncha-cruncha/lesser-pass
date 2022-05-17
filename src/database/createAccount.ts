import { setDoc } from "firebase/firestore";
import { getAccountRef } from "./getAccountRef";
import { UID, Account } from '../types';
import { formatNewAccount } from "./formatNewAccount";

export const createAccount = async ({ uid, data }: {uid:UID, data:Omit<Account,'id'>}): Promise<boolean> => {
    const newAccount = formatNewAccount(data);
    if (newAccount === null) {
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