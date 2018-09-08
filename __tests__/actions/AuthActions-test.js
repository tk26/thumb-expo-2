import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AuthService from '../../src/services/AuthService';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

// Actions to be tested
import * as authActions from '../../src/actions/AuthActions';
import * as types from '../../src/actions/types';

describe('Auth_Actions', () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });
    afterEach(() => {
        fetch.resetMocks();
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
    describe('login', () => {
        test('Dispatches login and auth failed actions when provided invalid username / password', async() => {
            fetch.mockResponse(JSON.stringify({}),{ status: 400 });
            const expectedActions = [
                { type: types.LOGIN_USER },
                { type: types.LOGIN_USER_AUTH_FAILED }
            ]; 
            await store.dispatch(authActions.loginUser({email: 'jsmith@testing.edu', password: 'InvalidPassword123!'}));
            expect(store.getActions()).toEqual(expectedActions);                
        });
        test('Dispatches login and unverified actions when provided unverified user', async() => {
            fetch.mockResponse(JSON.stringify({}),{ status: 403 });
            const expectedActions = [
                { type: types.LOGIN_USER },
                { type: types.LOGIN_UNVERIFIED_USER_FAILED }
            ]; 
            await store.dispatch(authActions.loginUser({email: 'unverified@testing.edu', password: 'Password123!'}));
            expect(store.getActions()).toEqual(expectedActions);              
        });
        test('Dispatches login and unverified actions when provided unverified user', async() => {
            fetch.mockResponse(JSON.stringify({}),{ status: 500 });
            const expectedActions = [
                { type: types.LOGIN_USER },
                { type: types.LOGIN_USER_FAILED }
            ]; 
            await store.dispatch(authActions.loginUser({email: 'failinguser@testing.edu', password: 'Password123!'}));
            expect(store.getActions()).toEqual(expectedActions);               
        });
        test('Dispatches login success actions when login completes successfully', async() => {
            const token = 'asdfasdf';
            const profile = {
                firstName: 'First Name',
                lastName: 'Last Name',
                school: 'School',
                username: 'username',
                profilePicture: 'profile picture',
                birthday: 'birthday',
                bio: 'bio'
            };
            fetch.mockResponse(JSON.stringify({
                token: token,
                firstName: 'First Name',
                lastName: 'Last Name',
                school: 'School',
                username: 'username',
                profilePicture: 'profile picture',
                birthday: 'birthday',
                bio: 'bio'
            }),{ status: 200 });
            const expectedActions = [
                { type: types.LOGIN_USER },
                { type: types.LOGIN_USER_SUCCESS, token },
                { type: types.PROFILE_UPDATED, profile }
            ]; 
            await store.dispatch(authActions.loginUser({email: 'test@testing.edu', password: 'Password123!'}));
            expect(store.getActions()).toEqual(expectedActions);
            expect(AuthService.getAuthToken()).toEqual(token);             
        });
        test('Dispatches auth failed action when API request throws exception', async() => {
            fetch.mockReject(new Error('fake error message'));
            const expectedActions = [
                { type: types.LOGIN_USER },
                { type: types.LOGIN_USER_FAILED }
            ]; 
            await store.dispatch(authActions.loginUser({email: 'jsmith@testing.edu', password: 'InvalidPassword123!'}));
            expect(store.getActions()).toEqual(expectedActions);             
        });
    })
});