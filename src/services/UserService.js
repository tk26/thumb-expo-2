import { getApiUrl } from '../helper';
import { fetchWithTokenHandler } from '../services/fetchPlus';

export default class UserService {
  static validateUsername(username){
    return fetch(getApiUrl() + '/user/validate/username/' + username, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
  }
  static validateEmail(email){
    return fetch(getApiUrl() + '/user/validate/email/' + email, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    });
  }
}
