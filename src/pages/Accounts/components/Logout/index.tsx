import { Button, Row, Col } from 'react-bootstrap';
import { useLogout } from './useLogout';

type Props = {
  variant?: string;
}

export const Logout = ({ variant="secondary" }:Props = {}) => {
  const { canLogout, logout } = useLogout()

  return (
    <Row>
      <Col className="d-flex justify-content-center justify-content-md-end">
        <Button
          variant={variant}
          onClick={logout}
          disabled={!canLogout}
        >
          Logout
        </Button>
      </Col>
    </Row>
  )
}