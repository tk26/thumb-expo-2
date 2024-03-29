import { AuthService } from '../services' ;
import { getApiUrl } from '../helper';
import { EMAIL_CHANGED,
        PASSWORD_CHANGED,
        LOGIN_USER,
        LOGIN_USER_SUCCESS,
        LOGIN_USER_FAILED,
        LOGIN_USER_AUTH_FAILED,
        LOGIN_UNVERIFIED_USER_FAILED,
        LOGOUT_USER,
        PROFILE_RESET
    } from './types';


// Imp: actions must have a type
export function emailChanged(email) {
    return { type: EMAIL_CHANGED, email };
}

export function passwordChanged(password) {
    return { type: PASSWORD_CHANGED, password };
}

export function loginUser({ email, password }){
    return async(dispatch) => {
        dispatch({ type: LOGIN_USER });
        const error = AuthService.validateEmailAndPassword(email, password);
        if (error !== ''){
            loginUserFailWithError(dispatch, error);
            return;
        }
        try {
          let response = await fetch(getApiUrl() + '/user/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  "email": email,
                  "password": password
              })
          });

          switch (response.status){
              case 403:
                  return loginUnverifiedUserFail(dispatch);
              case 400:
                  return loginUserAuthFail(dispatch);
              case 200:
                  return loginSuccess(dispatch, response);
              default:
                  return loginUserFail(dispatch);
          }
        }
        catch(error){
            loginUserFail(dispatch);
        }
    };
}

export function logoutUser(){
  AuthService.logout();
  return { type: LOGOUT_USER };
}

export function loginFailed(){
  return { type: LOGIN_USER_FAILED };
}

const loginUserFailWithError = (dispatch, error) => {
  return dispatch({ type: LOGIN_USER_FAILED, error: error });
};

const loginUserAuthFail = (dispatch) => {
  return dispatch({ type: LOGIN_USER_AUTH_FAILED });
};

const loginUserFail = (dispatch) => {
  return dispatch({ type: LOGIN_USER_FAILED });
};

const loginUnverifiedUserFail = (dispatch) => {
  return dispatch({ type: LOGIN_UNVERIFIED_USER_FAILED });
};

const loginSuccess = (dispatch, rawResponse) => {
  rawResponse.json()
      .then((response) => {
          const { token, refreshToken } = response;
          AuthService.setTokens(token, refreshToken);
          // Save user details
          let profile = {
              firstName: response.firstName,
              lastName: response.lastName,
              school: response.school,
              username: response.username,
              profilePicture: response.profilePicture,
              birthday: response.birthday,
              bio: response.bio
          };
          dispatch({type: LOGIN_USER_SUCCESS});
          return dispatch({type: PROFILE_RESET, profile: profile});
      })
      .catch((dispatch) => loginUserFail(dispatch));
}
