import { deleteDoc } from "firebase/firestore";
import { getAccountRef } from "./getAccountRef";
import { UID, AID } from '../types';

export const deleteAccount = async ({ uid, aid }: {uid:UID, aid:AID}): Promise<boolean> => {
    const docRef = await getAccountRef({ uid, aid });
    return deleteDoc(docRef).then(() => {
        return true;
    }).catch((e) => {
        console.error(e);
        return false;
    });
}