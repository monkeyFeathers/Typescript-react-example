import React from 'react';
import { shallow } from 'enzyme';
import DisqaulifiedPage from '../../components/DisqualifiedPage';

describe('DisqualifiedPage', () => {
    it('should render without errors', () => {
      const component = shallow(<DisqaulifiedPage message={'test message'}/>);
      const wrapper = component.find('div');
      expect(wrapper.length).toBe(1);
    });
  it('should display disqalify message', () => {
      const component = shallow(<DisqaulifiedPage message={'test message'}/>);
      const wrapper = component.find('.disqualify-message');
      expect(wrapper.text()).toBe('test message');
  });
});
