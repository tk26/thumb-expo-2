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

  static updateProfilePicture(profilePicture){
    let formData = new FormData();
    formData.append('profilePicture', {
        uri: profilePicture,
        name: 'profilePicture.jpg',
        type: 'multipart/form-data'
      });
    return fetchWithTokenHandler(getApiUrl() + '/user/profilepicture/', {
      method: 'PUT',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  static updateUserProfile(bio){
    console.log(bio);
    return fetchWithTokenHandler(getApiUrl() + '/user/edit/', {
      method: 'PUT',
      body: JSON.stringify({
        "bio": bio
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
