import { AID } from "../../../../types";

export type Props = {
    selectedAidList: AID[];
    amEditing: boolean;
}

export const useListButtons = ({ selectedAidList, amEditing }: Props) => {
    const selectedCount = selectedAidList.length;

    return {
        selectedCount,
        show: {
            add: selectedCount === 0 && !amEditing,
            clearSelected: selectedCount > 0 && !amEditing,
            edit: selectedCount > 0 && !amEditing,
            save: amEditing,
            cancelEdit: amEditing,
            delete: selectedCount > 0 && !amEditing,
            export: !amEditing
        }
    }
}