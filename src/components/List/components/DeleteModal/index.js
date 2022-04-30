

import { Button, Modal } from 'react-bootstrap';

export const DeleteModal = ({ isOpen, num, goDelete, cancel }) => {
  return (
    <Modal show={isOpen} animation={false} onHide={cancel}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <span>Delete {num} account{num === 1 ? '' : 's'}? This action cannot be reversed.</span>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={cancel}>Cancel</Button>
        <Button variant="danger" onClick={goDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}