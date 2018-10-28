import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_UNVERIFIED_USER_FAILED,
    LOGIN_USER_AUTH_FAILED,
    LOGIN_USER_FAILED,
    LOGOUT_USER
  } from '../actions/types';
import * as constants from '../constants';

const INITIAL_STATE = {
  email: '',
  password: '',
  token: '',
  isLoggedIn: false,
  error: '',
  loading: false
};

const persistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['email', 'token', 'isLoggedIn']
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
        case EMAIL_CHANGED:
            return {...state, email: action.email};
        case PASSWORD_CHANGED:
            return {...state, password: action.password};
        case LOGIN_USER:
            return {...state, error: '', loading: true};
        case LOGIN_USER_SUCCESS:
            return {...state, error: '', loading: false, token: action.token, isLoggedIn: true, password: ''};
        case LOGIN_UNVERIFIED_USER_FAILED:
            return {...state,
                error: constants.UNVERIFIED_USER_LOGIN,
                loading: false,
                isLoggedIn: false,
                password: '',
                token: ''
            };
        case LOGIN_USER_AUTH_FAILED:
            return {...state, error: constants.INVALID_LOGIN, loading: false, isLoggedIn: false, password: ''};
        case LOGIN_USER_FAILED:
            const errorMessage = action.error || constants.INTERNAL_EXCEPTION;
            return {...state, error: errorMessage, loading: false, isLoggedIn: false, password: ''};
        case LOGOUT_USER:
            return {...state, error: '', loading: false, isLoggedIn: false, email: '', password: '', token: ''};
        default:
            return state;
  }
}

export default persistReducer(persistConfig, AuthReducer);
