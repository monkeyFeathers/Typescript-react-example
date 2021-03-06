import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { QualificationData } from '../api';
import Field from './ValidatedFormField/Field';
import {
  InputState,
  toInputState,
  isInvalid,
  isEmpty,
} from './ValidatedFormField/types';
import { required, isFloat } from './ValidatedFormField/validators';

export type SubmitHandler = (data: QualificationData) => void;

export interface QualificationFormProps {
  submitHandler: SubmitHandler;
}

/**
 * when I started working on this I made the choice of just validating the fields myself
 * and it turned out to be a larger undertaking that I was looking to get myself into.
 * I ended up with `ValidatedFormField`. I think next time I would
 * use a form library from npm.
 */
const QualificationForm: React.FC<QualificationFormProps> = ({
  submitHandler,
}) => {
  const [purchasePrice, updatePurchasePrice] = useState<InputState>(
    toInputState('Auto purchase price (USD)', [required, isFloat])
  );
  const [autoMake, updateAutoMake] = useState<InputState>(
    toInputState('Auto Make', [required])
  );
  const [autoModel, updateAutoModel] = useState<InputState>(
    toInputState('Auto Model', [required])
  );
  const [yearlyIncome, updateYearlyIncome] = useState<InputState>(
    toInputState('Estimated Yearly Income', [required, isFloat])
  );
  const [creditScore, updateCreditScore] = useState<number>(750);

  const fields = [
    { inputState: purchasePrice, updateFn: updatePurchasePrice },
    { inputState: autoMake, updateFn: updateAutoMake },
    { inputState: autoModel, updateFn: updateAutoModel },
    { inputState: yearlyIncome, updateFn: updateYearlyIncome },
  ];

  const onSubmitHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    submitHandler({
      purchasePrice: parseFloat(purchasePrice.value),
      autoMake: autoMake.value,
      autoModel: autoModel.value,
      yearlyIncome: parseFloat(yearlyIncome.value),
      creditScore,
    });
  };

  return (
    <Form onSubmit={onSubmitHandler} id="qualification_form">
      {fields.map((field) => (
        <Field {...{ ...field, key: field.inputState.label }} />
      ))}
      <Form.Group controlId="userEstimatedCreditScore">
        <Form.Label className="w-100">
          <span>Credit Score</span>
          <span className="float-right">{creditScore}</span>
        </Form.Label>
        <Form.Control
          type="range"
          value={creditScore}
          min="300"
          max="850"
          onChange={(event) =>
            updateCreditScore(parseInt(event.target.value, 10))
          }
        />
      </Form.Group>

      <Button
        id="submit_qualifications"
        variant="primary"
        disabled={
          fields.some(({ inputState }) => isInvalid(inputState)) ||
          fields.some(({ inputState }) => isEmpty(inputState))
        }
        type="submit"
      >
        Get Qualified
      </Button>
    </Form>
  );
};

export default QualificationForm;
