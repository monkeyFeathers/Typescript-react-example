import { Validator } from './types';
export const required: Validator = (label, value) => {
  const message = `${label} is required`;
  return value.length ? '' : message;
};
export const isFloat: Validator = (label, value) => {
  const message = `${label} value must be a number`;
  return isNaN(parseFloat(value)) || !value.match(/^[0-9,.]+$/) ? message : '';
};

export const isEmail: Validator = (label, value) => {
  const message = `${label} must be a valid email address`;
  return RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(value)
    ? ''
    : message;
};

export const minLength: (v: number) => Validator = (length) => (
  label,
  value
) => {
  const message = `${label} must be at least ${length} characters in length`;
  return value.length === length ? '' : message;
};

export const includesChars: (v: string, m?: string) => Validator = (
  character,
  msg
) => (label, value) => {
  const message = msg ? msg : `${label} must inlcude ${character}`;
  return RegExp(character).test(value) ? '' : message;
};
