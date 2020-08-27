import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import { InputState, InputValue } from './types';

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
