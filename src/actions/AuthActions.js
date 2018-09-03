import { AuthService } from '../services' ;
import { EMAIL_CHANGED, 
        PASSWORD_CHANGED, 
        LOGIN_USER,
        LOGIN_USER_SUCCESS,
        LOGIN_USER_FAILED,
        LOGIN_USER_AUTH_FAILED,
        LOGIN_UNVERIFIED_USER_FAILED,
        LOGOUT_USER} from './types';


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
            let response = await AuthService.login(email, password);
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
    dispatch({ type: LOGIN_USER_FAILED, error: error });
};

const loginUserAuthFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_AUTH_FAILED });
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAILED });
};

const loginUnverifiedUserFail = (dispatch) => {
    dispatch({ type: LOGIN_UNVERIFIED_USER_FAILED });
};

const loginSuccess = (dispatch, rawResponse) => {
    rawResponse.json()
        .then((response) => {
            const auth_token = response.token;
            AuthService.setAuthToken(auth_token);
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
            global.firstName = profile.firstName;
            global.profilePicture = profile.profilePicture;
            dispatch({type: LOGIN_USER_SUCCESS, token: auth_token});
            dispatch({type: PROFILE_UPDATED, profile: profile});
        })
        .catch((dispatch) => loginUserFail(dispatch));
}