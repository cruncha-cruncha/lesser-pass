import { useRecoilValue } from "recoil"
import { calcPassword } from "../../../../crypto/encrypt";
import { masterPasswordState } from "../../../../state"
import { Account } from "../../../../types"



export const useList = () => {
    const masterPassword = useRecoilValue(masterPasswordState);
    const generatePassword = async (acc: Account) => {
        navigator.clipboard.writeText(await calcPassword({
            profile: acc,
            masterPassword
        }))
    }

    return {
        generatePassword
    }
}