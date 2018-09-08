import { getApiUrl } from '../helper';

export default class AuthService {
    static validateUsername(username){
        return fetch(getApiUrl() + '/user/validate/username/' + username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
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

    static login(email, password) {
        return  fetch(getApiUrl() + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
    }

    static logout (){
        this.setAuthToken('');
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