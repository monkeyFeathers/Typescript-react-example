import React from 'react';
import { mount } from 'enzyme';
import { ValidatedFormField, validators, toInputState } from '../../components/ValidatedFormField';
const { required, isFloat } = validators;

describe('ValidatedFormField', () => {
  let component;
  const inputState = toInputState('test field', [ required, isFloat ]);
  const updateFn = jest.fn(x => x);

  beforeEach(() => {
    component = mount(<ValidatedFormField inputState={inputState} updateFn={updateFn}/>);
  });

  it('should render without errors', () => {
    const wrapper = component.find({ controlId: 'test_field' });
    expect(wrapper.length).toBe(1);
  });

  it('should invoke \'updateFn\' on \'change\' event', () => {
    const input = component.find('input');
    input.simulate('change', { target: { value: '100' } })
    expect(updateFn.mock.calls.length).toBe(1);
    // expect(updateFn.mock.results[0].value).toBe('100');
  });

  describe('validators', () => {
    it('should show error message when validating \'isFloat\'', () => {
      const input = component.find('input');
      const errorMessages = component.find('#test_field-feedback').at(0);
      expect(errorMessages.text()).toBe('');
      input.simulate('change', { target: { value: 'test' } });
      expect(errorMessages.text()).toBe('test field value must be a number');
    });

    it('should show error message when validating \'required\'', () => {
      inputState.validators = [ required ];
      component = mount(<ValidatedFormField inputState={inputState} updateFn={updateFn} />);
      const input = component.find('input');
      const errorMessages = component.find('#test_field-feedback').at(0);
      expect(errorMessages.text()).toBe('');
      input.simulate('change', { target: { value: '' } });
      expect(errorMessages.text()).toBe('test field is required');
    });
  });

});
