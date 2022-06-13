import { Row, Col } from 'react-bootstrap';
import { Main } from '../../layouts/Main';

export const Loading = () => {
    return (
        <Main>
            <Row>
                <Col className="d-flex justify-content-center justify-content-md-end">
                    <span>...loading</span>
                </Col>
            </Row>
        </Main>
    )
}