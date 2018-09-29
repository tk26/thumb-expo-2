import { getApiUrl } from '../helper';
import { LOGIN_USER_SUCCESS,
    LOGIN_USER_AUTH_FAILED,
    LOGIN_USER_FAILED,
    LOGIN_UNVERIFIED_USER_FAILED,
    PROFILE_UPDATED } from '../actions/types';

export default class AuthService {
    static validateEmailAndPassword(email, password){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Incorrect email address";
        }
        if (email.substr(email.length - 4) !== '.edu') {
            return "Email address must end in .edu";
        }
        if (password.length < 8) {
            return "Invalid password.";
        }
        return '';
    }
    static login(dispatch, email, password){
        let responseStatus;

        fetch(getApiUrl() + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then(response => {
            responseStatus = response.status;
            return response.json();
        }).then(response => {
            switch (responseStatus){
                case 403:
                    return loginUnverifiedUserFail(dispatch);
                case 400:
                    return loginUserAuthFail(dispatch);
                case 200:
                    return loginSuccess(dispatch, response);
                default:
                    return loginUserFail(dispatch);
            }
        });
    }

    static logout(){
        AuthService.setAuthToken('');
        global.firstName = '';
        global.profilePicture = '';
    }

    static setAuthToken(token){
        global.auth_token = token;
    }

    static getAuthToken(){
        return global.auth_token;
    }
}

const loginUserAuthFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_AUTH_FAILED });
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAILED });
};

const loginUnverifiedUserFail = (dispatch) => {
    dispatch({ type: LOGIN_UNVERIFIED_USER_FAILED });
};

const loginSuccess = (dispatch, response) => {
    //debugger;
    const auth_token = response.token;
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
    dispatch({type: LOGIN_USER_SUCCESS, token: auth_token});
    dispatch({type: PROFILE_UPDATED, profile: profile});
}
