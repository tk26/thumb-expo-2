// Reducer to be tested
import reducer from '../../src/reducers/AuthReducer';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED
} from '../../src/actions/types';

describe('AuthReducer', () => {
  const initialState = {
    email: '',
    password: '',
    token: '',
    isLoggedIn: false,
    error: '',
    loading: false
  };
  describe('INITIAL_STATE', () => {
    test('is correct', () => {
      const action = { type: 'FAKE_ACTION' };
      expect(reducer(undefined, action)).toEqual(initialState);
    });
  });
  describe(EMAIL_CHANGED, () => {
    test('is correct', () => {
      const email = 'test@email.com';
      const action = { type: EMAIL_CHANGED,  email};
      const expectedState = {...initialState, email};
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
  describe(PASSWORD_CHANGED, () => {
    test('is correct', () => {
      const password = 'Password123!';
      const action = { type: PASSWORD_CHANGED,  password};
      const expectedState = {...initialState, password};
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
