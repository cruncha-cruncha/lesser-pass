import { Button } from 'react-bootstrap';
import { Props as useProps } from './useListButtons';
import { useListButtons } from './useListButtons';

export type Props = useProps & {
    openAddModal: () => void;
    openDeleteModal: () => void;
    startEditing: () => void;
    saveEditing: () => void;
    cancelEditing: () => void;
    exportList: () => void;
    unselectAll: () => void;
}

export const ListButtons = ({ 
    selectedCount,
    amEditing,
    openAddModal,
    openDeleteModal,
    startEditing,
    saveEditing,
    cancelEditing,
    exportList,
    unselectAll
 }: Props) => {
    const { show } = useListButtons({
        selectedCount,
        amEditing
    })

    return (
        <>
            {show.add && <Button className="mr-2" onClick={openAddModal}>Add New</Button>}
            {show.clearSelected && <Button className="mr-2" onClick={unselectAll}>Cancel</Button>}
            {show.edit && <Button className="mr-2" onClick={startEditing}>Edit</Button>}
            {show.save && <Button className="mr-2" onClick={saveEditing}>Save</Button>}
            {show.cancelEdit && <Button className="mr-2" onClick={cancelEditing}>Cancel</Button>}
            {show.delete && <Button className="mr-2" onClick={openDeleteModal}>Delete</Button>}
            {show.export && <Button className="mr-2" onClick={exportList}>Export</Button>}
        </>
    )
}