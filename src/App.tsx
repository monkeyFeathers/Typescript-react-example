import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { LandingPage } from './components/LandingPage';
import { DisqaulifiedPage } from './components/DisqualifiedPage';
import { CreateAccountPage } from './components/CreateAccountPage';

function App() {
    const disqualificationMessage = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`
    const createAccountHandler = (value: any) => console.log(value); 
    const getComponent = (page: string) => {
        switch(page) {
            case 'dp':
                return <DisqaulifiedPage message={disqualificationMessage} />;
            case 'ca':
                return <CreateAccountPage createAccountHandler={createAccountHandler} />;
            case 'lp':
            default:
                return <LandingPage />;
            }
    };

    return (
        <Container fluid>
            <Navbar bg="light">
                <Navbar.Brand href="#home">Auto Loan Pre Qualify</Navbar.Brand>
            </Navbar>
            <Container className="mt-3">
                { getComponent('ca') }
            </Container>
        </Container>
    );
}

export default App;
