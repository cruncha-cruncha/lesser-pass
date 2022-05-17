import { useRecoilValue } from "recoil"
import { loginIsOutState } from "../../state"
import { useLogin as useAuthLogin } from '../../auth';

export const useLogin = () => {
    const isOut = useRecoilValue(loginIsOutState);
    const { login } = useAuthLogin();

    return {
        isOut,
        login
    }
}