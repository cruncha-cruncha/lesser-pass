import { Button, Row, Col } from 'react-bootstrap';
import { useLogout } from './useLogout';

export const Logout = () => {
  const { isIn, logout } = useLogout()

  return (
    <Row>
      <Col className="d-flex justify-content-center justify-content-md-end">
        <Button
          variant='secondary'
          onClick={logout}
          disabled={!isIn}
        >
          Logout
        </Button>
      </Col>
    </Row>
  )
}