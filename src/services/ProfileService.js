import { getApiUrl } from '../helper';

export default class ProfileService {
  static updateUser({profilePicture, bio}){
    return fetch(getApiUrl() + '/user/edit', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + ' ' + global.auth_token
      },
      body: JSON.stringify({
          "profilePicture": profilePicture,
          "bio": bio
      })
    });
  }
}
