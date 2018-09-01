import configureStore from 'redux-mock-store';

// Actions to be tested
import * as authActions from '../../src/actions/AuthActions';
import * as types from '../../src/actions/types';

const mockStore = configureStore();
const store = mockStore();

describe('Auth_Actions', () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });
    describe('email change', () => {
        test('Dispatches the correct action and payload', () => {
            const email = 'testemail@testing.edu';    
            store.dispatch(authActions.emailChanged(email));
            expect(store.getActions()).toMatchSnapshot();
        });
    });
    describe('password change', () => {
        test('Dispatches the correct action and payload', () => {
            const password = 'Password123!';  
            store.dispatch(authActions.passwordChanged(password));
            expect(store.getActions()).toMatchSnapshot();
        });
    });
});