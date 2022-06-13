import { Button, Row, Col } from 'react-bootstrap';
import { Main } from '../../layouts/Main';
import { useLogin } from './useLogin';

export const Login = () => {
  const { isOut, login } = useLogin()
  
  return (
    <Main>
      <Row>
        <Col className="d-flex justify-content-center justify-content-md-end">
            <Button
              onClick={login}
              disabled={!isOut}
            >
              Login
            </Button>
        </Col>
      </Row>
    </Main>
  )
}