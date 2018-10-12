import { getApiUrl } from '../helper';
import AuthService from './AuthService';

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
  static createUser({firstName, lastName, email, university, password, username, birthday}){
    return fetch(getApiUrl() + '/user/create', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "firstName": firstName,
          "lastName": lastName,
          "email": email,
          "school": university,
          "password": password,
          "username": username,
          "birthday": birthday
      })
    });
  }

  static updateUserProfile({profilePicture, bio}){
    return fetch(getApiUrl() + '/user/edit/', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + ' ' + AuthService.getAuthToken()
      },
      body: JSON.stringify({
          "profilePicture" : profilePicture,
          "bio": bio
      })
    });
  }
}
