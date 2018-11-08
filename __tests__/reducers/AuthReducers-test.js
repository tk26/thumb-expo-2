// Reducer to be tested
import reducer from '../../src/reducers/AuthReducer';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_AUTH_FAILED,
  LOGIN_USER_FAILED,
  LOGIN_UNVERIFIED_USER_FAILED,
  LOGOUT_USER
} from '../../src/actions/types';
import * as constants from '../../src/constants';

describe('AuthReducer', () => {
  const initialState = {
    email: '',
    password: '',
    token: '',
    refreshToken: '',
    isLoggedIn: false,
    error: '',
    loading: false
  };
  describe('INITIAL_STATE', () => {
    test('should return correct state', () => {
      const action = { type: 'FAKE_ACTION' };
      expect(reducer(undefined, action)).toEqual(initialState);
    });
  });
  describe(EMAIL_CHANGED, () => {
    test('should return correct state', () => {
      const email = 'test@email.com';
      const action = { type: EMAIL_CHANGED,  email};
      const expectedState = {...initialState, email};
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
  describe(PASSWORD_CHANGED, () => {
    test('should return correct state', () => {
      const password = 'Password123!';
      const action = { type: PASSWORD_CHANGED,  password};
      const expectedState = {...initialState, password};
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
  describe(LOGIN_USER, () => {
    test('should return correct state', () => {
      const loginState = {
          email: 'test@test.edu',
          password: 'ValidPassword123',
          token: '',
          refreshToken: '',
          isLoggedIn: false,
          error: 'some error',
          loading: false
      };
      const expectedState = {
        email: 'test@test.edu',
        password: 'ValidPassword123',
        token: '',
        refreshToken: '',
        isLoggedIn: false,
        error: '',
        loading: true
      };
      const action = { type: LOGIN_USER};
      expect(reducer(loginState, action)).toEqual(expectedState);
    });
  });
  describe(LOGOUT_USER, () => {
    test('should return correct state', () => {
      const action = { type: LOGOUT_USER};
      const loggedInState = {
          email: 'test@test.edu',
          password: '',
          token: 'asdfasdfafd',
          refreshToken: 'asdfasdf',
          isLoggedIn: true,
          error: '',
          loading: false
      }
      expect(reducer(loggedInState, action)).toEqual(initialState);
    });
  });
  describe(LOGIN_USER_SUCCESS, () => {
    test('should return correct state', () => {
      const loginState = {
          email: 'test@test.edu',
          password: 'ValidPassword123',
          token: '',
          refreshToken: '',
          isLoggedIn: false,
          error: '',
          loading: true
      };
      const token = 'asdfasd';
      const refreshToken = 'asdfasdf';
      const expectedState = {
        email: 'test@test.edu',
        password: '',
        token: token,
        refreshToken: refreshToken,
        isLoggedIn: true,
        error: '',
        loading: false
      };
      const action = { type: LOGIN_USER_SUCCESS, token, refreshToken};
      expect(reducer(loginState, action)).toEqual(expectedState);
    });
  });
  describe(LOGIN_USER_AUTH_FAILED, () => {
    test('should return correct state', () => {
      const loginState = {
          email: 'test@test.edu',
          password: 'InvalidPassword',
          token: '',
          refreshToken: '',
          isLoggedIn: false,
          error: '',
          loading: true
      };
      const expectedState = {
        email: 'test@test.edu',
        password: '',
        token: '',
        refreshToken: '',
        isLoggedIn: false,
        error: constants.INVALID_LOGIN,
        loading: false
      };
      const action = { type: LOGIN_USER_AUTH_FAILED, loginState};
      expect(reducer(loginState, action)).toEqual(expectedState);
    });
  });
  describe(LOGIN_USER_FAILED, () => {
    test('should return correct state when no error is provided', () => {
      const loginState = {
          email: 'test@test.edu',
          password: 'InvalidPassword',
          token: '',
          refreshToken: '',
          isLoggedIn: false,
          error: '',
          loading: true
      };
      const expectedState = {
        email: 'test@test.edu',
        password: '',
        token: '',
        refreshToken: '',
        isLoggedIn: false,
        error: constants.INTERNAL_EXCEPTION,
        loading: false
      };
      const action = { type: LOGIN_USER_FAILED};
      expect(reducer(loginState, action)).toEqual(expectedState);
    });
    test('should return correct state when error is provided', () => {
      const loginState = {
          email: 'test@test.edu',
          password: 'InvalidPassword',
          token: '',
          refreshToken: '',
          isLoggedIn: false,
          error: '',
          loading: true
      };
      const expectedError = 'Some error occured!';
      const expectedState = {
        email: 'test@test.edu',
        password: '',
        token: '',
        refreshToken: '',
        isLoggedIn: false,
        error: expectedError,
        loading: false
      };
      const action = { type: LOGIN_USER_FAILED, error: expectedError};
      expect(reducer(loginState, action)).toEqual(expectedState);
    });
  });
  describe(LOGIN_UNVERIFIED_USER_FAILED, () => {
    test('should return correct state', () => {
      const loginState = {
          email: 'test@test.edu',
          password: 'ValidPassword123!',
          token: '',
          refreshToken: '',
          isLoggedIn: false,
          error: '',
          loading: true
      };
      const expectedState = {
        email: 'test@test.edu',
        password: '',
        token: '',
        refreshToken: '',
        isLoggedIn: false,
        error: constants.UNVERIFIED_USER_LOGIN,
        loading: false
      };
      const action = { type: LOGIN_UNVERIFIED_USER_FAILED};
      expect(reducer(loginState, action)).toEqual(expectedState);
    });
  });
});
