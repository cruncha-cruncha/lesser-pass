import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getApp } from '../firebase/getApp';
import { uidState, loginStateState, loginIsInState, loginIsOutState } from '../state';
import { Login as LoginEnum } from '../state/Login.enum';
import { useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { connect, createProfile, disconnect } from '../database';

export const useInit = () => {
    getApp();
    const uid = useRecoilValue(uidState);
    const isIn = useRecoilValue(loginIsInState);
    const isOut = useRecoilValue(loginIsOutState);
    const setUid = useSetRecoilState(uidState);
    const setLoginState = useSetRecoilState(loginStateState);

    useEffect(() => {
        if (isIn) {
            connect();
            createProfile({uid});
        }
    }, [isIn, uid])

    useEffect(() => {
        if (isOut) {
            disconnect();
        }
    }, [isOut])

    useEffect(() => {
        const appInst = getApp();
        const authInst = getAuth(appInst);
        return onAuthStateChanged(authInst, (user) => {
            if (user) {
                setUid(user.uid);
                setLoginState(LoginEnum.In);
            } else {
                setLoginState(LoginEnum.Out);
            }
        });
    }, [setUid, setLoginState]);
}