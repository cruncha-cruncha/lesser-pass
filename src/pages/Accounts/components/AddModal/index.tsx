import { Button, Modal, Form } from 'react-bootstrap';
import { useAddModal, Props as useProps } from './useAddModal';

type Props = useProps & {
  isHidden: boolean;
}

export const AddModal = ({ isHidden, close }: Props) => {
  const {
    field,
    setField,
    valid,
    cancel,
    confirm,
    canAdd
  } = useAddModal({ close });

  return (
    <Modal show={!isHidden} animation={false} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>New Password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Account</Form.Label>
            <Form.Control type="text" isInvalid={!valid.title} value={field.title} onChange={e => setField.title(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" isInvalid={!valid.username} value={field.username} onChange={e => setField.username(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Length</Form.Label>
            <Form.Control type="number" isInvalid={!valid.length} value={field.length} onChange={e => setField.length(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Index</Form.Label>
            <Form.Control type="number" isInvalid={!valid.index} value={field.index} onChange={e => setField.index(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Alphabet</Form.Label>
            <Form.Control type="text" isInvalid={!valid.alphabet} value={field.alphabet} onChange={e => setField.alphabet(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control type="text" isInvalid={!valid.notes} value={field.notes} onChange={e => setField.notes(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={cancel}>Cancel</Button>
        <Button variant="primary" disabled={!canAdd} onClick={confirm}>Add</Button>
      </Modal.Footer>
    </Modal>
  )
}