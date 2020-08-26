import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type LangingPageProps = {
    children?: React.ReactNode;
    marketingMessage: React.ReactNode;
}

const LandingPage: React.FC<LangingPageProps> = ({children, marketingMessage}) => {
    return (
        <>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
            <Row>
                <Col className="mt-4">
                    {marketingMessage}
                </Col>
            </Row>
        </>
    );
};

export default LandingPage;
