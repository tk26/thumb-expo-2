import React from 'react';
import Travel from '../../../src/components/travel/Travel';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Travel />).toJSON();
  expect(tree).toMatchSnapshot();
});
