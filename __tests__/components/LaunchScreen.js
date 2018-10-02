import React from 'react';
import { shallow } from 'enzyme';
import LaunchScreen from '../../src/components/LaunchScreen';

describe('Testing Login Form', () => {
  it('renders successfully', () => {
    const wrapper = shallow(
      <LaunchScreen />
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
