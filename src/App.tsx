import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import { LandingPage } from './components/LandingPage';
import { DisqualifiedPage } from './components/DisqualifiedPage';
import { CreateAccountPage } from './components/CreateAccountPage';
import { QualificationForm } from './components/QualificationForm';
import { qualificationRequest, QualificationData } from './api';

enum Content {
    LandingPage,
    DisqualifiedPage,
    CreateAccountPage,
    Loading
}

function App() {
    const [content, updateContent] = useState<Content>(Content.LandingPage);
    const [userMessage, updateMessage] = useState<string>('');
    const createAccountHandler = (value: any) => console.log(value); 

    const sendQualificationRequest = async (qualificationData: QualificationData): Promise<void> => {
        updateContent(Content.Loading);
        try {
            const { qualified, message } = await qualificationRequest(qualificationData);
            updateContent(
                qualified 
                ? Content.CreateAccountPage
                : Content.DisqualifiedPage
            )
            updateMessage(message || '');
        } catch(error) {
            // I'm just logging the error to the console here, but we would want to have some way to indicate to the user 
            // that something went wrong and they should try again, or (as in this case) one of their form values is bad 
            // The best place to do that would be to capture that as part of the form validation prior to the request.
            // That could probably be down by passing policy from the backend as part of the initial load, but since I didn't want to
            // build out any additional infrastructure I just left it at a console log.
            console.log(error);
        }
    };

    const getComponent = (content: Content) => {
        switch(content) {
            case Content.DisqualifiedPage:
                return <DisqualifiedPage message={userMessage} />
            case Content.CreateAccountPage:
            return <CreateAccountPage createAccountHandler={createAccountHandler} />
            case Content.Loading:
                return <Spinner animation="border" className="d-flex" style={{width: '15rem', height: '15rem', margin: '15% auto'}}/>
            default:
            return (
                <LandingPage>
                    <QualificationForm  submitHandler={sendQualificationRequest} />
                </LandingPage>
            );

        }
    }

    return (
        <Container fluid>
            <Navbar bg="light">
                <Navbar.Brand href="#home">Auto Loan Pre Qualify</Navbar.Brand>
            </Navbar>
            <Container className="mt-3">
                { getComponent(content) }
            </Container>
        </Container>
    );
}

export default App;
