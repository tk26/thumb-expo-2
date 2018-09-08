import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

// Actions to be tested
import * as signupActions from '../../src/actions/SignupActions';
import * as types from '../../src/actions/types';
import * as constants from '../../src/constants';

describe('SignupActions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });
  afterEach(() => {
      fetch.resetMocks();
  });
  describe('signup update', () => {
    test('Dispatches the correct action and payload', () => {
      const email = 'testemail@testing.edu';
      const expectedActions = [
        {
          type: types.SIGNUP_UPDATE,
          payload: {prop: 'email', value: email}
        }
      ];
      store.dispatch(signupActions.signupUpdate({ prop: 'email', value: email}));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  describe('signup submit step 1', () => {
    test('Dispatches the correct actions when first name is empty', async() => {
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP1_ERROR,
          error: constants.MISSING_FIRSTNAME
        }
      ];
      await store.dispatch(signupActions.submitStep1({ firstName: '', lastName: 'test', username: 'test'}));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when last name is empty', async() => {
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP1_ERROR,
          error: constants.MISSING_LASTNAME
        }
      ];
      await store.dispatch(signupActions.submitStep1({ firstName: 'test', lastName: '', username: 'test'}));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when username is empty', async() => {
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP1_ERROR,
          error: constants.INVALID_USERNAME_FORMAT
        }
      ];
      await store.dispatch(signupActions.submitStep1({ firstName: 'test', lastName: 'test', username: ''}));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when username includes invalid characters', async() => {
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP1_ERROR,
          error: constants.INVALID_USERNAME_FORMAT
        }
      ];
      await store.dispatch(signupActions.submitStep1({ firstName: 'test', lastName: 'test', username: '!@#$'}));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when username is not valid', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 422 });
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP1_ERROR,
          error: constants.INVALID_USERNAME_GENERIC
        }
      ];
      await store.dispatch(signupActions.submitStep1({ firstName: 'test', lastName: 'test', username: 'invalid_username'}));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when username already exists', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 409 });
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP1_ERROR,
          error: constants.DUPLICATE_USERNAME
        }
      ];
      await store.dispatch(signupActions.submitStep1({ firstName: 'test', lastName: 'test', username: 'invalid_username'}));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when API returns internal 500 error', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 500 });
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP1_ERROR,
          error: constants.INTERNAL_EXCEPTION
        }
      ];
      await store.dispatch(signupActions.submitStep1({ firstName: 'test', lastName: 'test', username: 'valid_username'}));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when step 1 is valid', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 200 });
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP1_SUCCESS
        }
      ];
      await store.dispatch(signupActions.submitStep1({ firstName: 'test', lastName: 'test', username: 'valid_username'}));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches correct actions when submit step 1 throws exception', async()=>{
      fetch.mockReject(new Error('fake error message'));
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP1_ERROR,
          error: constants.INTERNAL_EXCEPTION
        }
      ];
      await store.dispatch(signupActions.submitStep1({ firstName: 'test', lastName: 'test', username: 'valid_username' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  describe('signup submit step 2', () => {
    test('Dispatches the correct actions when password length < 8', () => {
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP2_ERROR,
          error: constants.INVALID_PASSWORD_LENGTH
        }
      ];
      store.dispatch(signupActions.submitStep2({ password: 'test', confirmPassword: 'test' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when password length > 30', () => {
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP2_ERROR,
          error: constants.INVALID_PASSWORD_LENGTH
        }
      ];
      store.dispatch(signupActions.submitStep2({ password: 'Test123456789012345678901234567890', confirmPassword: 'Test123456789012345678901234567890' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when password is all lowercase letter', () => {
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP2_ERROR,
          error: constants.INVALID_PASSWORD_FORMAT
        }
      ];
      store.dispatch(signupActions.submitStep2({ password: 'testingisfun', confirmPassword: 'testingisfun' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when password <> confirm password', () => {
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP2_ERROR,
          error: constants.PASSWORD_MISMATCH
        }
      ];
      store.dispatch(signupActions.submitStep2({ password: 'Test123!', confirmPassword: 'Test1234!' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when step 2 is valid', () => {
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP2_SUCCESS
        }
      ];
      store.dispatch(signupActions.submitStep2({ password: 'Test123!', confirmPassword: 'Test123!' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  describe('signup submit step 3', () => {
    test('Dispatches the correct actions when birthday is not provided', async() => {
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP3_ERROR,
          error: constants.MISSING_BIRTHDAY
        }
      ];
      await store.dispatch(signupActions.submitStep3({ email: 'test@testing.edu', birthday: '', university: 'Indiana' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when university is not selected', async() => {
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP3_ERROR,
          error: constants.MISSING_UNIVERSITY
        }
      ];
      await store.dispatch(signupActions.submitStep3({ email: 'test@testing.edu', birthday: '2002-09-03', university: 'none' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when email is not provided', async() => {
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP3_ERROR,
          error: constants.INVALID_EMAIL_ADDRESS
        }
      ];
      await store.dispatch(signupActions.submitStep3({ email: '', birthday: '2002-09-03', university: 'Indiana' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when provided email without .edu', async() => {
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP3_ERROR,
          error: constants.EMAIL_MISSING_EDU
        }
      ];
      await store.dispatch(signupActions.submitStep3({ email: 'test@gmail.com', birthday: '2002-09-03', university: 'Indiana' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when API returns invalid email exception', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 422 });
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP3_ERROR,
          error: constants.INVALID_EMAIL_ADDRESS
        }
      ];
      await store.dispatch(signupActions.submitStep3({ email: 'test@testing.edu', birthday: '2002-09-03', university: 'Indiana' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when API returns duplicate email exception', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 409 });
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP3_ERROR,
          error: constants.DUPLICATE_EMAIL
        }
      ];
      await store.dispatch(signupActions.submitStep3({ email: 'test@testing.edu', birthday: '2002-09-03', university: 'Indiana' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when API returns internal server error', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 500 });
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP3_ERROR,
          error: constants.INTERNAL_EXCEPTION
        }
      ];
      await store.dispatch(signupActions.submitStep3({ email: 'test@testing.edu', birthday: '2002-09-03', university: 'Indiana' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when step 3 is valid', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 200 });
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP3_SUCCESS
        }
      ];
      await store.dispatch(signupActions.submitStep3({ email: 'test@testing.edu', birthday: '2002-09-03', university: 'Indiana' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches correct actions when submit step 3 throws exception', async()=>{
      fetch.mockReject(new Error('fake error message'));
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP3_ERROR,
          error: constants.INTERNAL_EXCEPTION
        }
      ];
      await store.dispatch(signupActions.submitStep3({ email: 'test@testing.edu', birthday: '2002-09-03', university: 'Indiana' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  describe('create user (step 4)', () => {
    test('Dispatches correct actions when API returns 400 exception', async()=>{
      fetch.mockResponse(JSON.stringify({}),{ status: 400 });
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP4_ERROR,
          error: constants.MISSING_USER_DATA
        }
      ];
      await store.dispatch(signupActions.createUser({ firstName: 'test', lastName: 'test', username: 'test123', password: 'Test123!', email: 'test@testing.edu', birthday: '2002-09-03', university: 'Indiana' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches correct actions when API returns internal server error', async()=>{
      fetch.mockResponse(JSON.stringify({}),{ status: 500 });
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP4_ERROR,
          error: constants.INTERNAL_EXCEPTION
        }
      ];
      await store.dispatch(signupActions.createUser({ firstName: 'test', lastName: 'test', username: 'test123', password: 'Test123!', email: 'test@testing.edu', birthday: '2002-09-03', university: 'Indiana' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches correct actions when user is created successfully', async()=>{
      fetch.mockResponse(JSON.stringify({}),{ status: 200 });
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP4_SUCCESS
        }
      ];
      await store.dispatch(signupActions.createUser({ firstName: 'test', lastName: 'test', username: 'test123', password: 'Test123!', email: 'test@testing.edu', birthday: '2002-09-03', university: 'Indiana' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches correct actions when create user throws exception', async()=>{
      fetch.mockReject(new Error('fake error message'));
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP4_ERROR,
          error: constants.INTERNAL_EXCEPTION
        }
      ];
      await store.dispatch(signupActions.createUser({ firstName: 'test', lastName: 'test', username: 'test123', password: 'Test123!', email: 'test@testing.edu', birthday: '2002-09-03', university: 'Indiana' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
