import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

type InputValue = string;

type Validator = (label: string, value: InputValue) => string;
type InputStatePredicate = (state: InputState) => boolean

interface InputState {
    label: string;
    value: InputValue;
    touched: boolean;
    validators: Validator[]; 
    errors: string[];
}

interface FieldProps {
    inputState: InputState;
    updateFn: React.Dispatch<React.SetStateAction<InputState>>;
}

const required = (label: string, value: InputValue): string => {
    const message = `${label} is required`;
    return value.length ? '' : message;
}

const isFloat = (label: string, value: InputValue): string => {
    const message = `${label} value must be a number`;
    return isNaN(parseFloat(value)) || !value.match(/^[0-9,.]+$/) ? message : '';
};

const isInvalid: InputStatePredicate = (inputState) => inputState.touched && inputState.errors.length !== 0;
const isEmpty: InputStatePredicate = (inputState) => inputState.value.length === 0;

const toInputState = (label: string, validators: Validator[] ): InputState => ({ label, value: '', touched: false, validators, errors: [] });

const FormGroup: React.FC<FieldProps> = ({inputState, updateFn}) => {
    const [field, updateField] = useState<InputState>(inputState);
    const { errors, touched, value, label } = field;
    const changeHandler = (prevState: InputState, value: InputValue): void => {
        const updatedState = validate({ ...prevState, value });
        updateField(updatedState);
        updateFn(updatedState);
    };
    const validate = (prevState: InputState): InputState => {
        const { label, validators, value } = prevState;
        const errors = validators.map(validator => validator(label, value)).filter(e => e.length);
        return { ...prevState, errors };
    }
    const touch = (prevState: InputState): void => {
        const updatedState = validate({...prevState, touched: true});
        updateField(updatedState);
    }

    return (
        <Form.Group controlId="autoPurchasePrice">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="string"
                value={value}
                isInvalid={touched && !!errors.length}
                onChange={({target: {value}}) => changeHandler(field, value)}
                onFocus={() => touch(field)}
                onBlur={() => touch(field)}
                placeholder={`Enter ${label}`}
            />
            <Form.Text className="text-danger">{errors.join("; ")}</Form.Text> 
        </Form.Group>
    );
}

export const QualificationForm: React.FC = () => {
    const [purchasePrice, updatePurchasePrice] = useState<InputState>(toInputState('Auto purchase price (USD)', [ required, isFloat ])); 
    const [autoMake, updateAutoMake] = useState<InputState>(toInputState('Auto Make',[ required ]));
    const [autoModel, updateAutoModel] = useState<InputState>(toInputState('Auto Model', [required]));
    const [yearlyIncome, updateYearlyIncome] = useState<InputState>(toInputState('Estimated Yearly Income', [ required, isFloat ]));
    const [creditScore, updateCreditScore] = useState<number>(750);

    const log = (t: string, x: any): any => { console.log(t, x); return x; }
    
    const fields = [
        { inputState: purchasePrice, updateFn: updatePurchasePrice },
        { inputState: autoMake, updateFn: updateAutoMake },
        { inputState: autoModel, updateFn: updateAutoModel },
        { inputState: yearlyIncome, updateFn: updateYearlyIncome }
    ];

    const onSubmitHandler = (event: any): void => event.preventDefault();

    return (
        <Form onSubmit={onSubmitHandler}>
            { fields.map(field => <FormGroup {...{...field, key: field.inputState.label}} />)} 
            <Form.Group controlId="userEstimatedCreditScore">
                <Form.Label className="w-100"><span>Credit Score</span><span className="float-right">{creditScore}</span></Form.Label>
                <Form.Control type="range" value={creditScore} min="300" max="850" onChange={(event) => updateCreditScore(parseInt(event.target.value, 10))} />
            </Form.Group>
        
            <Button variant="primary" disabled={ fields.some(({inputState}) => isInvalid(inputState)) || fields.some(({inputState}) => isEmpty(inputState)) } type="submit">
                Submit
            </Button>
        </Form>
    );
}
