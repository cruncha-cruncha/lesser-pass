import { Row, Col, Button, Form } from 'react-bootstrap';
import { useMasterPassword } from './useMasterPassword';

export const MasterPassword = () => {
  const { hidden, toggleHide, masterPassword, setMasterPassword } = useMasterPassword();

  return (
    <Form>
      <Form.Group controlId="formBasicEmail" className="mb-4">
        <Row>
          <Col>
            <Form.Label>Master Password</Form.Label>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex">
            <Form.Control type={hidden ? 'password' : 'text'} placeholder="" value={masterPassword} onChange={e => setMasterPassword(e.target.value)} />
            <Button onClick={toggleHide} className={`ms-2${hidden ? '' : ' px-3'}`}>
              {hidden ? 'Show' : 'Hide'}
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  )
}