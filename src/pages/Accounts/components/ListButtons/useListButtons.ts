
export type Props = {
    selectedCount: number;
    amEditing: boolean;
}

export const useListButtons = ({ selectedCount, amEditing }: Props) => {
    return {
        show: {
            add: selectedCount === 0 && !amEditing,
            clearSelected: selectedCount > 0 && !amEditing,
            edit: selectedCount > 0 && !amEditing,
            save: amEditing,
            cancelEdit: amEditing,
            delete: selectedCount > 0 && !amEditing,
            export: true
        }
    }
}