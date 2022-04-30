import { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import { validateField } from './validateField';

const DEFAULT_PASSWORD_LENGTH = 24;
const DEFAULT_INDEX = 1;

export const AddModal = ({ isOpen, save, cancel }) => {
  const [account, setAccount] = useState('');
  const [username, setUsername] = useState('');
  const [length, setLength] = useState(DEFAULT_PASSWORD_LENGTH);
  const [index, setIndex] = useState(DEFAULT_INDEX);
  const [notes, setNotes] = useState('');
  const [invalid, setInvalid] = useState([]);

  useEffect(() => {
    const toCheck = [
      { field: "account", value: account },
      { field: "username", value: username },
      { field: "length", value: length },
      { field: "index", value: index },
      { field: "notes", value: notes }
    ];

    const newInvalid = toCheck.reduce((output, val) => {
      const { valid } = validateField(val);
      if (!valid) {
        return [ ...output, val.field ];
      } else {
        return [ ...output ];
      }
    }, []);

    setInvalid(newInvalid);
  }, [account, username, length, index, notes]);

  useEffect(() => {
    setAccount('');
    setUsername('');
    setLength(DEFAULT_PASSWORD_LENGTH);
    setIndex(DEFAULT_INDEX);
    setNotes('');
  }, [isOpen]);

  const handleSave = () => {
    save({ account, username, length, index, notes });
  }

  return (
    <Modal show={isOpen} animation={false} onHide={cancel}>
      <Modal.Header closeButton>
        <Modal.Title>New Password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Account</Form.Label>
            <Form.Control type="text" isInvalid={invalid.includes('account')} value={account} onChange={e => setAccount(e.target.value)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" isInvalid={invalid.includes('username')} value={username} onChange={e => setUsername(e.target.value)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Length</Form.Label>
            <Form.Control type="number" isInvalid={invalid.includes('length')} value={length} onChange={e => setLength(e.target.value)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Index</Form.Label>
            <Form.Control type="number" isInvalid={invalid.includes('index')} value={index} onChange={e => setIndex(e.target.value)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control type="text" isInvalid={invalid.includes('notes')} value={notes} onChange={e => setNotes(e.target.value)}/>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={cancel}>Cancel</Button>
        <Button variant="primary" disabled={invalid.length !== 0} onClick={handleSave}>Add</Button>
      </Modal.Footer>
    </Modal>
  )
}