import { getAuth, signOut } from 'firebase/auth';
import { loginStateState, uidState } from '../state';
import { Login as LoginEnum } from '../state/Login.enum';
import { getApp } from '../firebase/getApp';
import { useSetRecoilState } from 'recoil';
import React from 'react';

export const useLogout = () => {
    const setLoginState = useSetRecoilState(loginStateState);
    const setUid = useSetRecoilState(uidState);

    const logout = () => {
        setLoginState(LoginEnum.TemptOut);

        const appInst = getApp();
        const authInst = getAuth(appInst);

        signOut(authInst).then(() => {
            setLoginState(LoginEnum.Out);
            setUid('');
        }).catch((e) => {
            console.error(e);
        });
    }
    

    return {
        logout
    };
}