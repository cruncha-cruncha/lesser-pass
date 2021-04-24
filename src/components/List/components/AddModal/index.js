

import { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export const AddModal = ({ isOpen, save, cancel }) => {
  const [account, setAccount] = useState('');
  const [username, setUsername] = useState('');
  const [length, setLength] = useState(16);
  const [index, setIndex] = useState(1);
  const [notes, setNotes] = useState('');
  const [invalid, setInvalid] = useState([]);

  useEffect(() => {
    const newInvalid = [];
    if (account === '') {
      newInvalid.push('account');
    }
    if (username === '') {
      newInvalid.push('username');
    }
    if (length < 16 || length > 40) { // this upper limit depends on the algo
      newInvalid.push('length');
    }
    if (index < 1) {
      newInvalid.push('index');
    }
    setInvalid(newInvalid);
  }, [account, username, length, index]);

  useEffect(() => {
    setAccount('');
    setUsername('');
    setLength(16);
    setIndex(1);
    setNotes('');
  }, [isOpen]);

  const handleSave = () => {
    save({ account, username, length, index, notes });
  }

  return (
    <Modal show={isOpen} animation={false} onHide={cancel}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
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