import { useRecoilValue } from 'recoil';
import { deleteAccount } from "../../../../database";
import { AID } from "../../../../types";
import { uidState } from "../../../../state";

export type Props = {
    close: () => void;
    aidList: AID[],
}

export const useDeleteModal = ({ close, aidList }: Props) => {
    const uid = useRecoilValue(uidState);

    const cancel = () => {
        close();
    }

    const confirm = () => {
        close();

        Promise.all(aidList.map(aid => {
            return deleteAccount({ uid, aid })
        }));
    }

    return {
        cancel,
        confirm,
        selectedCount: aidList.length
    }
}