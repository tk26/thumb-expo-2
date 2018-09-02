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
          isLoggedIn: false,
          error: 'some error',
          loading: false
      };
      const expectedState = {
        email: 'test@test.edu',
        password: 'ValidPassword123',
        token: '',
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
          isLoggedIn: false,
          error: '',
          loading: true
      };
      const token = 'asdfasd';
      const expectedState = {
        email: 'test@test.edu',
        password: '',
        token: token,
        isLoggedIn: true,
        error: '',
        loading: false
      };
      const action = { type: LOGIN_USER_SUCCESS, token};
      expect(reducer(loginState, action)).toEqual(expectedState);
    });
  });
  describe(LOGIN_USER_AUTH_FAILED, () => {
    test('should return correct state', () => {
      const loginState = {
          email: 'test@test.edu',
          password: 'InvalidPassword',
          token: '',
          isLoggedIn: false,
          error: '',
          loading: true
      };
      const expectedState = {
        email: 'test@test.edu',
        password: '',
        token: '',
        isLoggedIn: false,
        error: 'Invalid email or password',
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
          isLoggedIn: false,
          error: '',
          loading: true
      };
      const expectedError = 'Some error occured. Please try again. If problem persists, '
            + 'please let us know at support@thumbtravel.com';
      const expectedState = {
        email: 'test@test.edu',
        password: '',
        token: '',
        isLoggedIn: false,
        error: expectedError,
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
          isLoggedIn: false,
          error: '',
          loading: true
      };
      const expectedError = 'Some error occured!';
      const expectedState = {
        email: 'test@test.edu',
        password: '',
        token: '',
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
          isLoggedIn: false,
          error: '',
          loading: true
      };
      const expectedError = "It seems that you haven't confirmed your email just yet. " +
        "We have resent the email verification link to you. " +
        "Please confirm your email by clicking on it. " +
        "Feel free to email us at support@thumbtravel.com if you face any issues.";
      const expectedState = {
        email: 'test@test.edu',
        password: '',
        token: '',
        isLoggedIn: false,
        error: expectedError,
        loading: false
      };
      const action = { type: LOGIN_UNVERIFIED_USER_FAILED};
      expect(reducer(loginState, action)).toEqual(expectedState);
    });
  });
});
