import { useCallback, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getApp } from '../firebase/getApp';
import { uidState, loginStateState, loginIsInState, loginIsOutState } from '../state';
import { Login as LoginEnum } from '../state/Login.enum';
import { useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { connect, createProfile, disconnect } from '../database';
import { getAllowedEmails } from '../database/getAllowedEmails';

export const useInit = () => {
    getApp();
    const uid = useRecoilValue(uidState);
    const isIn = useRecoilValue(loginIsInState);
    const isOut = useRecoilValue(loginIsOutState);
    const setUid = useSetRecoilState(uidState);
    const setLoginState = useSetRecoilState(loginStateState);

    const memoEmails = useCallback<() => Promise<string[]>>(getAllowedEmails, []);

    useEffect(() => {
        memoEmails();
    }, []);

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
        let mounted = true;

        const appInst = getApp();
        const authInst = getAuth(appInst);
        const cancelAuthListener = onAuthStateChanged(authInst, async (user) => {
            if (user) {
                const authenticated = await authenticateEmail(user.email || "");
                if (mounted) {
                    setUid(user.uid);
                    if (authenticated) {
                        setLoginState(LoginEnum.In);
                    } else {
                        setLoginState(LoginEnum.BadIn);
                    }
                }
            } else {
                if (mounted) {
                    setUid("");
                    setLoginState(LoginEnum.Out);
                }
            }
        });

        return () => {
            mounted = false;
            cancelAuthListener();
        }
    }, [setUid, setLoginState]);

    const authenticateEmail = async (email: string) => {
        return memoEmails().then(emails => {
            if (emails.includes(email)) {
                return true;
            } else {
                return false;
            }
        });
    }
}



