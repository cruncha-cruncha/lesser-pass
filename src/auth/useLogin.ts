import { getAuth, useDeviceLanguage, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { loginStateState } from '../state';
import { Login as LoginEnum } from '../state/Login.enum';
import { getApp } from '../firebase/getApp';
import { useSetRecoilState } from 'recoil';

export const useLogin = () => {
    const setLoginState = useSetRecoilState(loginStateState);

    const appInst = getApp();
    const authInst = getAuth(appInst);
    useDeviceLanguage(authInst);

    const login = () => {
        setLoginState(LoginEnum.TemptIn);

        const appInst = getApp();
        const authInst = getAuth(appInst);
    
        const provider = new GoogleAuthProvider();
        signInWithRedirect(authInst, provider);
    }

    return {
        login
    }
}