import { useRecoilValue } from "recoil"
import { calcPassword } from "../../../../crypto/encrypt";
import { masterPasswordState } from "../../../../state"
import { Account } from "../../../../types"
import { isMobile } from "../../../isMobile";

export const useList = () => {
    const masterPassword = useRecoilValue(masterPasswordState);

    const generatePassword = async (acc: Account) => {
        if (isMobile.iOS()) {
            navigator.clipboard.write([ new ClipboardItem({
                'text/plain': calcPassword({
                    profile: acc,
                    masterPassword
                })
            })])
        } else {
            const password = await calcPassword({ profile: acc, masterPassword });
            navigator.clipboard.writeText(password);
        }
    }

    return {
        generatePassword
    }
}