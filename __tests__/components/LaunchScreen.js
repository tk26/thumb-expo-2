import React from 'react';
import renderer from 'react-test-renderer';
import LaunchScreen from '../../src/components/LaunchScreen';

test('renders correctly', () => {
  const tree = renderer.create(<LaunchScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
