import { AsyncStorage } from 'react-native';
import { getApiUrl } from '../helper';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

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
  static refreshToken(){
    return  fetch(getApiUrl() + '/auth/token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "refreshToken": this.getRefreshToken()
      })
    });
  }
  static logout (){
    this.setAuthToken('');
    this.setRefreshToken('');
  }

  static setAuthToken(token){
    global.auth_token = token;
  }
  static setRefreshToken(token){
    global.refresh_token = token;
  }

  static getAuthToken(){
    return global.auth_token;
  }
  static getRefreshToken(){
    return global.refresh_token;
  }

  static async getPersistedAuthToken(){
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  }
  static async getPersistedRefreshToken(){
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  }

  static async setPersistedAuthToken(token){
    return await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  }
  static async setPersistedRefreshToken(token){
    return await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  static async setTokens(token, refreshToken){
    this.setAuthToken(token);
    this.setRefreshToken(refreshToken);
    await this.setPersistedAuthToken(token);
    await this.setPersistedRefreshToken(refreshToken);
  }
}
