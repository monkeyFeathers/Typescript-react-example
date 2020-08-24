import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';

type InputValue = string;

export interface InputState {
    label: string;
    value: InputValue;
    touched: boolean;
    validators: Validator[]; 
    errors: string[];
}

export const toInputState = (label: string, validators: Validator[] ): InputState => ({ label, value: '', touched: false, validators, errors: [] });

type Validator = (label: string, value: InputValue) => string;
const required: Validator = (label, value) => {
    const message = `${label} is required`;
    return value.length ? '' : message;
}
const isFloat: Validator = (label, value) => {
    const message = `${label} value must be a number`;
    return isNaN(parseFloat(value)) || !value.match(/^[0-9,.]+$/) ? message : '';
};
export const validators = { required, isFloat };

type InputStatePredicate = (state: InputState) => boolean
export const isInvalid: InputStatePredicate = (inputState) => inputState.touched && inputState.errors.length !== 0;
export const isEmpty: InputStatePredicate = (inputState) => inputState.value.length === 0;

export interface FieldProps {
    inputState: InputState;
    updateFn: React.Dispatch<React.SetStateAction<InputState>>;
}

export const ValidatedFormField: React.FC<FieldProps> = ({inputState, updateFn}) => {
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
        <Form.Group controlId={label.toLowerCase().split(" ").join("_")}>
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
            <Form.Text className="error-messages text-danger">{errors.join("; ")}</Form.Text> 
        </Form.Group>
    );
}
