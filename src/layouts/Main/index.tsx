import { ReactNode } from "react"
import { Container } from 'react-bootstrap';

export const Main = ({ children }: { children: ReactNode }) => {
    return (
        <Container className="my-5">
            {children}
        </Container>
    )
}