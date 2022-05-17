import { useRecoilValue } from "recoil"
import { loginIsInState } from "../../../../state"
import { useLogout as useAuthLogout } from "../../../../auth";

export const useLogout = () => {
    const isIn = useRecoilValue(loginIsInState);
    const { logout } = useAuthLogout();

    return {
        isIn,
        logout
    }
}