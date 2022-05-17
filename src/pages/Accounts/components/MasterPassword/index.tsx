import { Row, Col, Button, Form } from 'react-bootstrap';
import { useMasterPassword } from './useMasterPassword';

export type Props = {
  password: string;
  setPassword: (s:string) => void;
}

export const MasterPassword = ({ password, setPassword }: Props) => {
  const { hidden, toggleHide } = useMasterPassword();

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
            <Form.Control type={hidden ? 'password' : 'text'} placeholder="" value={password} onChange={e => setPassword(e.target.value)} />
            <Button onClick={toggleHide} className={`ml-2${hidden ? '' : ' px-3'}`}>
              {hidden ? 'Show' : 'Hide'}
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  )
}