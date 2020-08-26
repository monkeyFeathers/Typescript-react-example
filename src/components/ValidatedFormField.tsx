import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';

type InputValue = string;

export type InputState = {
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

const isEmail: Validator = (label, value) => {
    const message = `${label} must be a valid email address`;
    return RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(value) ? '' : message; 
}

const minLength: (v: number) => Validator = (length) => (label, value) => {
    const message = `${label} must be at least ${length} characters in length`;
    return value.length === length ? '' : message;
}

const includesChars: (v: string, m?: string) => Validator = (character, msg) => (label, value) => {
    const message = msg ? msg : `${label} must inlcude ${character}`;
    return RegExp(character).test(value) ? '' : message;
}

export const validators = { required, isFloat, isEmail, minLength, includesChars };

type InputStatePredicate = (state: InputState) => boolean
export const isInvalid: InputStatePredicate = (inputState) => inputState.touched && inputState.errors.length !== 0;
export const isEmpty: InputStatePredicate = (inputState) => inputState.value.length === 0;

export type FieldProps = {
    inputState: InputState;
    updateFn: React.Dispatch<React.SetStateAction<InputState>>;
    type?: string;
}

const ValidatedFormField: React.FC<FieldProps> = ({inputState, updateFn, type='text'}) => {
    const [field, updateField] = useState<InputState>(inputState);
    const { errors, touched, value, label } = field;
    const id = label.toLowerCase().split(" ").join("_");
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
        <Form.Group controlId={id}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                value={value}
                aria-describedby={`${id}-feedback`}
                isInvalid={touched && !!errors.length}
                onChange={({target: {value}}) => changeHandler(field, value)}
                onFocus={() => touch(field)}
                onBlur={() => touch(field)}
                placeholder={`Enter ${label}`}
            />
            <Form.Text className="text-danger" role="alert" id={`${id}-feedback`}>{errors.join("; ")}</Form.Text> 
        </Form.Group>
    );
};

export default ValidatedFormField;
