import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SignupService } from '../../src/services';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

// Actions to be tested
import * as signupActions from '../../src/actions/SignupActions';
import * as types from '../../src/actions/types';

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
          error: 'First Name cannot be empty'
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
          error: 'Last Name cannot be empty'
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
          error: 'Username should be between 3 to 30 characters and can only contain numbers, letters, periods and underscores'
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
          error: 'Username should be between 3 to 30 characters and can only contain numbers, letters, periods and underscores'
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
          error: 'Invalid username'
        }
      ];
      await store.dispatch(signupActions.submitStep1({ firstName: 'test', lastName: 'test', username: 'invalid_username'}));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct actions when username is not valid', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 409 });
      const expectedActions = [
        {
          type: types.SIGNUP_SUBMIT_STEP
        },
        {
          type: types.SIGNUP_STEP1_ERROR,
          error: 'Duplicate username'
        }
      ];
      await store.dispatch(signupActions.submitStep1({ firstName: 'test', lastName: 'test', username: 'invalid_username'}));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
