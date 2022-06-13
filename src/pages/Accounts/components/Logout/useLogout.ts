import { useRecoilValue } from "recoil"
import { loginIsInState, loginIsBadInState } from "../../../../state"
import { useLogout as useAuthLogout } from "../../../../auth";

export const useLogout = () => {
    const isIn = useRecoilValue(loginIsInState);
    const isBadIn = useRecoilValue(loginIsBadInState);

    const { logout } = useAuthLogout();

    return {
        canLogout: isIn || isBadIn,
        logout
    }
}