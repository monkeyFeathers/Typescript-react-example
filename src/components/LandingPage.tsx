import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { QualificationForm, SubmitHandler } from './QualificationForm'; 

export const LandingPage: React.FC = () => {
    const submitHandler: SubmitHandler = (data) => console.log('submitHandler called', data);
    const marketingMessage = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`
    return (
        <>
            <Row>
                <Col>
                    <QualificationForm  submitHandler={submitHandler} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="mt-3">
                        {marketingMessage}
                    </p>
                </Col>
            </Row>
        </>
    );
}
