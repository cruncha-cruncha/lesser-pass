import { Button, Modal } from 'react-bootstrap';
import { useDeleteModal, Props as useProps } from './useDeleteModal';

type Props = useProps & {
  isHidden: boolean;
}

export const DeleteModal = ({ isHidden, close, aidList }: Props) => {
  const { selectedCount, cancel, confirm } = useDeleteModal({ close, aidList });

  return (
    <Modal show={!isHidden} animation={false} onHide={cancel}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <span>Delete {selectedCount} account{selectedCount === 1 ? '' : 's'}? This action cannot be reversed.</span>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={cancel}>Cancel</Button>
        <Button variant="danger" onClick={() => confirm()}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}