import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import LoginForm from '../../../src/components/auth/LoginForm';

const middlewares = [];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    email: '',
    password: '',
    token: '',
    isLoggedIn: false,
    error: '',
    loading: false
  },
  profile: {

  }
};

describe('Testing Login Form', () => {
  it('renders successfully with initial state', () => {
    const wrapper = shallow(
      <LoginForm />,
      { context: { store: mockStore(initialState) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('renders successfully with error', () => {
    const auth = {...initialState.auth, error: 'test error message'};
    const state = {...initialState, auth};
    const wrapper = shallow(
      <LoginForm />,
      { context: { store: mockStore(state) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('renders successfully when loading', () => {
    const auth = {...initialState.auth, loading: true};
    const state = {...initialState, auth};
    const wrapper = shallow(
      <LoginForm />,
      { context: { store: mockStore(state) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
