import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { LandingPage } from './components/LandingPage';

function App() {
    return (
        <Container>
            <Navbar bg="light">
                <Navbar.Brand href="#home">Auto Loan Pre Qualify</Navbar.Brand>
            </Navbar>
            <Container>
                <LandingPage />
            </Container>
        </Container>
    );
}

export default App;
