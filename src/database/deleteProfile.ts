import { deleteDoc } from "firebase/firestore";
import { getProfileRef } from "./getProfileRef";
import { UID } from '../types';

export const deleteProfile = async ({ uid }: {uid:UID}): Promise<boolean> => {
    const docRef = await getProfileRef({ uid });
    return deleteDoc(docRef).then(() => {
        return true;
    }).catch((e) => {
        console.error(e);
        return false;
    });
}