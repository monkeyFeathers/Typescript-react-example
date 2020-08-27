import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from '../App';
import { loanSlice, LoanStatus, setLoanStatus } from '../store/loan';

describe('App', () => {
  const createMockStore = () =>
    configureStore({ reducer: { loan: loanSlice.reducer } });
  const createComponent = (mockStore) =>
    mount(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

  it('should display the correct initial page', () => {
    const mockStore = createMockStore();
    const component = createComponent(mockStore);
    expect(component.find('#qualification_form').at(0).length).toBe(1);
  });

  it("should display the 'CreateAccountPage' when 'LoanStatus.Qualified'", () => {
    const mockStore = createMockStore();
    mockStore.dispatch(setLoanStatus(LoanStatus.Qualified));
    const component = createComponent(mockStore);
    expect(component.find('#create_account_form').at(0).length).toBe(1);
  });

  it("should display the 'DisqualifiedPage' when 'LoanStatus.Disqualified'", () => {
    const mockStore = createMockStore();
    mockStore.dispatch(setLoanStatus(LoanStatus.Disqualified));
    const component = createComponent(mockStore);
    expect(component.find('#disqualified').at(0).length).toBe(1);
  });
});
