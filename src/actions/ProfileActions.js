import {
  PROFILE_LOGOUT,
  PROFILE_UPDATE,
  PROFILE_UPDATE_SUBMIT,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_ERROR
 } from './types';
import { INTERNAL_EXCEPTION} from '../constants';
import { ImagePicker } from 'expo';
import { PermissionService, UserService } from '../services';

export function clearProfile(){
    return { type: PROFILE_LOGOUT };
}

export function profileUpdate({prop, value}){
  return {
      type: PROFILE_UPDATE,
      payload: {prop, value}
  }
}

export function dispatchProfileError(error){
  return {
    type: PROFILE_UPDATE_ERROR,
    error: error
  };
}

export function submitPofileUpdate(profilePicture, bio){
  return async(dispatch) => {
    dispatch({ type: PROFILE_UPDATE_SUBMIT });
    try {
      let response = await UserService.updateUserProfile({profilePicture, bio});
      switch(response.status){
        case 200:
          return dispatch({type: PROFILE_UPDATE_SUCCESS});
        case 400:
          return dispatch({
            type: PROFILE_UPDATE_ERROR,
            error: "Invalid user details"
          });
        default:
          return dispatch({
            type: PROFILE_UPDATE_ERROR,
            error: INTERNAL_EXCEPTION
          });
      }
    } catch(error){
      return dispatch({
        type: PROFILE_UPDATE_ERROR,
        error: INTERNAL_EXCEPTION
      });
    }
  }
}

export function updateProfilePicture(){
  return async(dispatch) => {
    try {
      let hasPermissions = await PermissionService.hasCameraPermissions();
      if(!hasPermissions){
        hasPermissions = await PermissionService.requestCameraPermissions();
      }

      if (hasPermissions)
      {
        let result = await ImagePicker.launchImageLibraryAsync({
            aspect: [4, 3],
            base64: true,
            quality: 0
        });
        console.log(result);
        if (!result.cancelled) {
          dispatch({
            type: PROFILE_UPDATE,
            payload: {prop: 'profilePicture', value: result.base64}
          });
        }
      }
    } catch(error){
      console.log(error);
      dispatch({
        type: PROFILE_UPDATE_ERROR,
        error: INTERNAL_EXCEPTION
      });
    }
  }
}
