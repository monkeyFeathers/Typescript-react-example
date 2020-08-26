import React from 'react';
import { useSelector, useDispatch }  from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import LandingPage from './components/LandingPage';
import DisqualifiedPage from './components/DisqualifiedPage';
import CreateAccountPage from './components/CreateAccountPage';
import QualificationForm from './components/QualificationForm';
import { RootState, Content, requestQualify } from './store/AppState';

const marketingMessage = (
    <div>
        <h4>You may be thinking to yourself "I don't really need a new car," but with our new streamlined application process financing has never been easier! </h4>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </div>
);

function App() {
    const page = useSelector((state: RootState) => state.loan.page);
    const userMessage = useSelector((state: RootState) => state.loan.message);
    const dispatch = useDispatch();

    const createAccountHandler = (value: any) => console.log(value); 

    const getComponent = (content: Content) => {
        switch(content) {
            case Content.DisqualifiedPage:
                return <DisqualifiedPage message={userMessage} />
            case Content.CreateAccountPage:
            return <CreateAccountPage createAccountHandler={createAccountHandler} />
            case Content.LoadingPage:
                return <Spinner animation="border" className="d-flex" style={{width: '15rem', height: '15rem', margin: '15% auto'}}/>
            default:
            return (
                <LandingPage marketingMessage={marketingMessage}>
                    <QualificationForm  submitHandler={(data) => dispatch(requestQualify(data))} />
                </LandingPage>
            );
        }
    };

    return (
        <Container fluid>
            <Navbar bg="light">
                <Navbar.Brand href="#home">Auto Loan Pre Qualify</Navbar.Brand>
            </Navbar>
            <Container className="mt-3">
                { getComponent(page) }
            </Container>
        </Container>
    );
}

export default App;
