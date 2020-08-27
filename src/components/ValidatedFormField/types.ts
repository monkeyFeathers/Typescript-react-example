export type Validator = (label: string, value: InputValue) => string;

export type InputValue = string;

export type InputState = {
  label: string;
  value: InputValue;
  touched: boolean;
  validators: Validator[];
  errors: string[];
};

export type InputStatePredicate = (state: InputState) => boolean;

export const toInputState = (
  label: string,
  validators: Validator[]
): InputState => ({ label, value: '', touched: false, validators, errors: [] });

export const isInvalid: InputStatePredicate = (inputState) =>
  inputState.touched && inputState.errors.length !== 0;

export const isEmpty: InputStatePredicate = (inputState) =>
  inputState.value.length === 0;
