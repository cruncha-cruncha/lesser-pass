import { Button, Row, Col } from 'react-bootstrap';
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
    selectedAidList,
    amEditing,
    openAddModal,
    openDeleteModal,
    startEditing,
    saveEditing,
    cancelEditing,
    exportList,
    unselectAll
}: Props) => {
    const { show, selectedCount } = useListButtons({
        selectedAidList,
        amEditing
    })

    return (
        <Row>
            <Col md className="d-flex flex-row justify-content-center justify-content-md-start mb-3">
                {show.add && <Button className="me-md-2" onClick={openAddModal}>Add New</Button>}
                {show.clearSelected && <Button className="me-2" variant="secondary" onClick={unselectAll}>Cancel</Button>}
                {show.cancelEdit && <Button className="me-2" variant="secondary" onClick={cancelEditing}>Cancel</Button>}
                {show.edit && <Button className="me-2" onClick={startEditing}>Edit</Button>}
                {show.save && <Button className="me-md-2" onClick={saveEditing}>Save</Button>}
                {show.delete && <Button className="me-md-2" variant="danger" onClick={openDeleteModal}>Delete</Button>}
            </Col>
            <Col md className="d-flex flex-row justify-content-center justify-content-md-end mb-3">
                {show.export && <Button className="ms-md-2" variant="secondary" onClick={exportList}>Export</Button>}
            </Col>
        </Row>
    )
}