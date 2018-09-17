import reducer from '../../src/reducers/SignupReducer';
import {
  SIGNUP_UPDATE,
  SIGNUP_SUBMIT_STEP,
  SIGNUP_STEP1_SUCCESS,
  SIGNUP_STEP1_ERROR,
  SIGNUP_STEP2_SUCCESS,
  SIGNUP_STEP2_ERROR,
  SIGNUP_STEP3_SUCCESS,
  SIGNUP_STEP3_ERROR,
  SIGNUP_STEP4_SUCCESS,
  SIGNUP_STEP4_ERROR
} from '../../src/actions/types';

describe('SignupReducer', () => {
  const initialState = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    birthday: '',
    university: 'none',
    loading: false,
    step1IsValid: false,
    step2IsValid: false,
    step3IsValid: false,
    step4IsValid: false,
    error: ''
  };
  describe('INITIAL_STATE', () => {
    test('should return correct state', () => {
      const action = { type: 'FAKE_ACTION' };
      expect(reducer(undefined, action)).toEqual(initialState);
    });
  });
  describe(SIGNUP_UPDATE, () => {
    test('should return correct state', () => {
      const action = { type: SIGNUP_UPDATE, payload: { prop: 'firstName', value: 'test'}};
      const expectedState = {...initialState, firstName: 'test'};
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
  describe(SIGNUP_SUBMIT_STEP, () => {
    test('should return correct state', () => {
      const action = { type: SIGNUP_SUBMIT_STEP };
      const expectedState = {...initialState, loading: true, error: ''};
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
  describe('SIGNUP_STEP_1', () => {
    const submittedState = {...initialState,
      firstName: 'test', lastName: 'last', username: 'test_user', loading: true};
    test('error action should return correct state', () => {
      const action = { type: SIGNUP_STEP1_ERROR, error: 'test' };
      const expectedState = {...submittedState, loading: false, error: 'test'};
      expect(reducer(submittedState, action)).toEqual(expectedState);
    });
    test('success action should return correct state', () => {
      const action = { type: SIGNUP_STEP1_SUCCESS };
      const expectedState = {...submittedState, loading: false, step1IsValid: true};
      expect(reducer(submittedState, action)).toEqual(expectedState);
    });
  });
  describe('SIGNUP_STEP_2', () => {
    const submittedState = {...initialState,
      firstName: 'test', lastName: 'last', username: 'test_user',
      password: 'Test123!', confirmPassword: 'Test123!',
      step1IsValid: true, loading: true};

      test('error action should return correct state', () => {
      const action = { type: SIGNUP_STEP2_ERROR, error: 'test' };
      const expectedState = {...submittedState, loading: false, error: 'test'};
      expect(reducer(submittedState, action)).toEqual(expectedState);
    });
    test('success action should return correct state', () => {
      const action = { type: SIGNUP_STEP2_SUCCESS };
      const expectedState = {...submittedState, loading: false, step2IsValid: true};
      expect(reducer(submittedState, action)).toEqual(expectedState);
    });
  });
  describe('SIGNUP_STEP_3', () => {
    const submittedState = {...initialState,
      firstName: 'test', lastName: 'last', username: 'test_user',
      password: 'Test123!', confirmPassword: 'Test123!',
      email: 'test@testing.edu', birthday: '2002-09-03', university: 'Indiana',
      step1IsValid: true, step2IsValid: true, loading: true};

      test('error action should return correct state', () => {
      const action = { type: SIGNUP_STEP3_ERROR, error: 'test' };
      const expectedState = {...submittedState, loading: false, error: 'test'};
      expect(reducer(submittedState, action)).toEqual(expectedState);
    });
    test('success action should return correct state', () => {
      const action = { type: SIGNUP_STEP3_SUCCESS };
      const expectedState = {...submittedState, loading: false, step3IsValid: true};
      expect(reducer(submittedState, action)).toEqual(expectedState);
    });
  });
  describe('SIGNUP_STEP_4', () => {
    const submittedState = {...initialState,
      firstName: 'test', lastName: 'last', username: 'test_user',
      password: 'Test123!', confirmPassword: 'Test123!',
      email: 'test@testing.edu', birthday: '2002-09-03', university: 'Indiana',
      step1IsValid: true, step2IsValid: true, step3IsValid: true, loading: true};

      test('error action should return correct state', () => {
      const action = { type: SIGNUP_STEP4_ERROR, error: 'test' };
      const expectedState = {...submittedState, loading: false, error: 'test'};
      expect(reducer(submittedState, action)).toEqual(expectedState);
    });
    test('success action should return correct state', () => {
      const action = { type: SIGNUP_STEP4_SUCCESS };
      const expectedState = {...submittedState, loading: false, step4IsValid: true};
      expect(reducer(submittedState, action)).toEqual(expectedState);
    });
  });
})
