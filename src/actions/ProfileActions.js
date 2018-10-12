import {
  PROFILE_LOGOUT,
  PROFILE_UPDATE,
  PROFILE_UPDATE_SUBMIT,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_ERROR
 } from './types';
import { INTERNAL_EXCEPTION} from '../constants';
import { UserService } from '../services';

export function clearProfile(){
    return { type: PROFILE_LOGOUT };
}

export function profileUpdate({prop, value}){
  return {
      type: PROFILE_UPDATE,
      payload: {prop, value}
  }
}

export function submitPofileUpdate(profilePicture, bio){
  return async(dispatch) => {
    dispatch({ type: PROFILE_UPDATE_SUBMIT });
    try {
      let response = await UserService.updateUserProfile({profilePicture, bio});
      switch(response.status){
        case 200:
          return dispatchEvent({type: PROFILE_UPDATE_SUCCESS});
        case 400:
          return dispatchEvent({
            type: PROFILE_UPDATE_ERROR,
            error: "Invalid user details"
          });
        default:
          return dispatchEvent({
            type: PROFILE_UPDATE_ERROR,
            error: INTERNAL_EXCEPTION
          });
      }
    } catch(error){
      return dispatchEvent({
        type: PROFILE_UPDATE_ERROR,
        error: INTERNAL_EXCEPTION
      });
    }
  }
}
