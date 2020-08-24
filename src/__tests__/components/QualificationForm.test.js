import React from 'react';
import { mount } from 'enzyme';
import { QualificationForm } from '../../components/QualificationForm';

describe('QualificationForm', () => {
  let component;
  let submitHandler = jest.fn(x => x);

  beforeEach(() => {
    component = mount(<QualificationForm submitHandler={submitHandler} />);
  });

  it('should render without errors', () => {
    const wrapper = component.find("#qualificationForm").at(0);
    expect(wrapper.length).toBe(1);
  });

  it('should disable \'submit\' button when form empty or invalid', () => {
    const submitButton = component.find("#submit_qualifications").at(0);
    expect(submitButton.prop("disabled")).toBe(true)
  });

  it('should enable \'submit\' button when form complete and valid', () => {
    [
      [ "auto_purchase_price_(usd)", "10000"],
      [ "auto_make", "toyota" ],
      [ "auto_model", "camry" ],
      [ "estimated_yearly_income", "60000" ]
    ].forEach(([id, value]) => { 
      component
        .find(`#${id}`)
        .simulate('change', { target: { value } });
    });

    const submitButton = component.find("#submit_qualifications").at(0);
    expect(submitButton.prop("disabled")).toBe(false);
  });

  it('should call \'submitHandler\' when user clicks \'submit\'', () => {
    [
      [ "auto_purchase_price_(usd)", "10000"],
      [ "auto_make", "toyota" ],
      [ "auto_model", "camry" ],
      [ "estimated_yearly_income", "60000" ]
    ].forEach(([id, value]) => { 
      component
        .find(`#${id}`)
        .simulate('change', { target: { value } });
    });

    component.simulate('submit');
    expect(submitHandler.mock.calls.length).toBe(1);
    expect(submitHandler.mock.results[0].value).toStrictEqual({
      purchasePrice: 10000,
      autoMake: "toyota",
      autoModel: "camry",
      yearlyIncome: 60000,
      creditScore: 750
    });
  });
});
