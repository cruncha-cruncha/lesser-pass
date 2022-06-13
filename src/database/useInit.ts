import { onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { getApp } from '../firebase/getApp';
import { accountsState, uidState, loginIsInState } from '../state';
import { Account } from '../types';
import { enforceAccountTyping } from './enforceAccountTyping';
import { getCollectionRef } from './getCollectionRef';

export const useInit = async (): Promise<void> => {
    getApp();
    const uid = useRecoilValue(uidState);
    const isIn = useRecoilValue(loginIsInState);
    const setAccounts = useSetRecoilState(accountsState);

    useEffect(() => {
        if (isIn && uid) {
            const collectionRef = getCollectionRef({ uid });
            return onSnapshot(collectionRef, snapshot => {
                const docs = snapshot.docs;
                const accounts = docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    
                    return {
                        ...enforceAccountTyping(data),
                        id: id,
                        // TODO
                        title: ('account' in data) ? data.account : data.title,
                    } as Account;
                });
                
                setAccounts(accounts);
            });
        }
    }, [uid, isIn, setAccounts])

}