import { AuthService } from '../services' ;
import { EMAIL_CHANGED, 
        PASSWORD_CHANGED, 
        LOGIN_USER,
        LOGIN_USER_FAILED,
        LOGOUT_USER} from './types';


// Imp: actions must have a type
export function emailChanged(email) {
    return { type: EMAIL_CHANGED, email };
}
  
export function passwordChanged(password) {
    return { type: PASSWORD_CHANGED, password };
}

export function loginUser({ email, password }){
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        const error = AuthService.validateEmailAndPassword(email, password);
        if (error !== ''){
            loginUserFailWithError(dispatch, error);
            return;
        }
        return AuthService.login(dispatch, email, password);
    };
}

export function logoutUser(){
    AuthService.logout();
    return { type: LOGOUT_USER };
}

const loginUserFailWithError = (dispatch, error) => {
    dispatch({ type: LOGIN_USER_FAILED, error: error });
};
