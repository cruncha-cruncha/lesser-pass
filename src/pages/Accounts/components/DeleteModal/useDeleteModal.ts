import { useRecoilValue } from 'recoil';
import { deleteAccount } from "../../../../database";
import { AID } from "../../../../types";
import { uidState } from "../../../../state";

export type Props = {
    close: () => void;
    aidList: AID[],
    deleteLocalAccounts: (aidList:AID[]) => void
}

export const useDeleteModal = ({ close, aidList, deleteLocalAccounts }: Props) => {
    const uid = useRecoilValue(uidState);

    const cancel = () => {
        close();
    }

    const confirm = () => {
        close();

        Promise.all(aidList.map(aid => {
            return deleteAccount({ uid, aid })
        }));

        deleteLocalAccounts(aidList)
    }

    return {
        cancel,
        confirm
    }
}