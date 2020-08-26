import React from 'react';
import { mount } from 'enzyme';
import { CreateAccountPage } from '../../components/CreateAccountPage';

describe('CreateAccountPage', () => {
  let component;
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = mount(<CreateAccountPage createAccountHandler={mockHandler} />)
  });

  it('should render with no errors', () => {
    expect(component.find('form').length).toBe(1);
  });

  it('should disable \'submit\' button when form empty or invalid', () => {
    const submitButton = component.find('#create_account').at(0);
    expect(submitButton.prop('disabled')).toBe(true)
  });
  it('should enable \'submit\' button when form complete and valid', () => {
    [
      [ 'email_address', 'test@example.com'],
      [ 'password', 'test1234' ],
      [ 'verify_password', 'test1234' ],
    ].forEach(([id, value]) => { 
      component
        .find(`#${id}`).at(0)
        .simulate('change', { target: { value } });
    });

    const submitButton = component.find('#create_account').at(0);
    expect(submitButton.prop('disabled')).toBe(false);
  });

  it('should call \'submitHandler\' when user clicks \'submit\'', () => {
    [
      [ 'email_address', 'test@example.com'],
      [ 'password', 'test1234' ],
      [ 'verify_password', 'test1234' ],
    ].forEach(([id, value]) => { 
      component
        .find(`#${id}`).at(0)
        .simulate('change', { target: { value } });
    });

    component.simulate('submit');
    expect(mockHandler).toBeCalled();
    expect(mockHandler).toBeCalledWith({
      email: 'test@example.com', password: 'test1234'
    });
  });
});
