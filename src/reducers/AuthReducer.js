import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_UNVERIFIED_USER_FAILED,
    LOGIN_USER_AUTH_FAILED,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    EXPIRED_SESSION
  } from '../actions/types';
import * as constants from '../constants';

const INITIAL_STATE = {
  email: '',
  password: '',
  isLoggedIn: false,
  error: '',
  loading: false
};

const persistConfig = {
  key: 'auth',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['email', 'isLoggedIn']
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
            return {...state,
              error: '',
              loading: false,
              isLoggedIn: true,
              password: ''
            };
        case LOGIN_UNVERIFIED_USER_FAILED:
            return {...state,
                error: constants.UNVERIFIED_USER_LOGIN,
                loading: false,
                isLoggedIn: false,
                password: ''
            };
        case LOGIN_USER_AUTH_FAILED:
            return {...state, error: constants.INVALID_LOGIN, loading: false, isLoggedIn: false, password: ''};
        case LOGIN_USER_FAILED:
            const errorMessage = action.error || constants.INTERNAL_EXCEPTION;
            return {...state, error: errorMessage, loading: false, isLoggedIn: false, password: ''};
        case LOGOUT_USER:
            return {...state,
              error: '',
              loading: false,
              isLoggedIn: false,
              email: '',
              password: ''
            };
        case EXPIRED_SESSION:
            return {...state,
              error: 'Session expired.  Please log in.',
              loading: false,
              isLoggedIn: false,
              email: '',
              password: ''
            }
        default:
            return state;
  }
}

export default persistReducer(persistConfig, AuthReducer);
