import { useRecoilValue } from "recoil"
import { calcPassword } from "../../../../crypto/encrypt";
import { masterPasswordState } from "../../../../state"
import { Account } from "../../../../types"



export const useList = () => {
    const masterPassword = useRecoilValue(masterPasswordState);
    const generatePassword = async (acc: Account) => {
        navigator.clipboard.write([ new ClipboardItem({
            'text/plain': calcPassword({
                profile: acc,
                masterPassword
            })
        })])
    }

    return {
        generatePassword
    }
}