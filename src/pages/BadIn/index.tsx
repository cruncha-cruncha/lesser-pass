import { Row, Col } from 'react-bootstrap';
import { Main } from '../../layouts/Main';
import { Logout } from '../Accounts/components/Logout';

export const BadIn = () => {
    return (
        <Main>
            <Row>
                <Col className="d-flex justify-content-center justify-content-md-end align-items-center">
                    <div className="me-3">
                        <p className="mb-0">Nah</p>
                    </div>
                    <Logout variant="primary" />
                </Col>
            </Row>
        </Main>
    )
}