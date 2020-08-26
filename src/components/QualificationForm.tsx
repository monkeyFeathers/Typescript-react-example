import React, { useState, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { QualificationData } from '../api';
import { ValidatedFormField, InputState, validators, toInputState, isInvalid, isEmpty  } from './ValidatedFormField';

export type SubmitHandler = (data: QualificationData) => void

export interface QualificationFormProps {
    submitHandler: SubmitHandler;
}

const { required, isFloat } = validators

export const QualificationForm: React.FC<QualificationFormProps> = ({submitHandler}) => {
    const [purchasePrice, updatePurchasePrice] = useState<InputState>(toInputState('Auto purchase price (USD)', [ required, isFloat ])); 
    const [autoMake, updateAutoMake] = useState<InputState>(toInputState('Auto Make',[ required ]));
    const [autoModel, updateAutoModel] = useState<InputState>(toInputState('Auto Model', [required]));
    const [yearlyIncome, updateYearlyIncome] = useState<InputState>(toInputState('Estimated Yearly Income', [ required, isFloat ]));
    const [creditScore, updateCreditScore] = useState<number>(750);

    const fields = [
        { inputState: purchasePrice, updateFn: updatePurchasePrice },
        { inputState: autoMake, updateFn: updateAutoMake },
        { inputState: autoModel, updateFn: updateAutoModel },
        { inputState: yearlyIncome, updateFn: updateYearlyIncome }
    ];

    const onSubmitHandler = (event: React.FormEvent): void => { 
        event.preventDefault()
        submitHandler({
            purchasePrice: parseFloat(purchasePrice.value),
            autoMake: autoMake.value,
            autoModel: autoModel.value,
            yearlyIncome: parseFloat(yearlyIncome.value),
            creditScore
        });
    };

    return (
        <Form onSubmit={ onSubmitHandler } id="qualificationForm">
            { fields.map( field => <ValidatedFormField {...{...field, key: field.inputState.label}} />)} 
            <Form.Group controlId="userEstimatedCreditScore">
                <Form.Label className="w-100"><span>Credit Score</span><span className="float-right">{creditScore}</span></Form.Label>
                <Form.Control type="range" value={creditScore} min="300" max="850" onChange={(event) => updateCreditScore(parseInt(event.target.value, 10))} />
            </Form.Group>
        
            <Button
                id="submit_qualifications"
                variant="primary"
                disabled={ fields.some(({inputState}) => isInvalid(inputState)) || fields.some(({inputState}) => isEmpty(inputState)) }
                type="submit"
            >
                Get Qualified
            </Button>
        </Form>
    );
}
