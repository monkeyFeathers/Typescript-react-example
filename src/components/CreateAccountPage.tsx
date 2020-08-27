import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Field from './ValidatedFormField/Field';
import { InputState, toInputState, isInvalid, isEmpty  } from './ValidatedFormField/types';
import { required, minLength, includesChars, isEmail } from './ValidatedFormField/validators';

type CreateAccountHandler = (data: any) => void;

type CreateAccountProps  = {
    createAccountHandler: CreateAccountHandler
}

const CreateAccountPage: React.FC<CreateAccountProps> = ({createAccountHandler}) => {
    const [userName, updateUserName] = useState<InputState>(toInputState('Email address', [required, isEmail]));
    const [password, updatePassword] = useState<InputState>(toInputState('Password', [required, minLength(8), includesChars('[0-9!@#$%&*]', 'must include number or !@#$%&*')]));
    const [verifyPassword, updateVerifyPassword] = useState<{value: string, touched: boolean}>({value: '', touched: false});

    const onSubmitHandler = (event: React.FormEvent): void => {
        event.preventDefault();
        createAccountHandler({ email: userName.value, password: password.value });
    }

    return (
        <>
            <h1 className="h3">Congratulations!</h1>
            <h2 className="h4">You have been pre-qualified. Create an account to continue</h2>
            <Form onSubmit={ onSubmitHandler } id="create_account_form">
                <Field inputState={userName} updateFn={updateUserName} type="email" />
                <Field inputState={password} updateFn={updatePassword} type="password" />
                <Form.Group controlId="verify_password">
                    <Form.Label>Verify Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={verifyPassword.value}
                        aria-describedby="verfiy_password-feedback"
                        isInvalid={verifyPassword.touched && verifyPassword.value !== password.value}
                        onChange={({target: {value}}) => updateVerifyPassword({...verifyPassword, value})}
                        onBlur={() => updateVerifyPassword({...verifyPassword, touched: true})}
                    />
                    {
                        verifyPassword.touched && verifyPassword.value !== password.value 
                        ? <Form.Text className="text-danger" role="alert" id="verify_password-feedback">Does not match password</Form.Text> 
                        : ""
                    }
                </Form.Group>
                <Button
                    id="create_account"
                    variant="primary"
                    disabled={ [userName, password].some((inputState) => isInvalid(inputState)) 
                    || [userName, password].some((inputState) => isEmpty(inputState)) 
                    || password.value !== verifyPassword.value
                    }
                    type="submit"
                >
                    Create Account
                </Button>
            </Form>
        </>
    );
};

export default CreateAccountPage;
