import {
  PROFILE_LOGOUT,
  PROFILE_UPDATE,
  PROFILE_UPDATE_SUBMIT,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_PICTURE_UPDATE_SUCCESS,
  PROFILE_UPDATE_ERROR
 } from './types';
import { INTERNAL_EXCEPTION, MISSING_PROFILE_PICTURE } from '../constants';
import { ImagePicker } from 'expo';
import { PermissionService } from '../services';
import { fetchWithTokenHandler } from '../services/fetchPlus';
import { getApiUrl } from '../helper';

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

export function submitPofileUpdate(bio){
  return async(dispatch) => {
    dispatch({ type: PROFILE_UPDATE_SUBMIT });
    try {
      let response = await fetchWithTokenHandler(getApiUrl() + '/user/edit/', {
        method: 'PUT',
        body: JSON.stringify({
          "bio": bio
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }, dispatch);
      switch(response.status){
        case 200:
          return dispatch({
            type: PROFILE_UPDATE_SUCCESS,
            payload: {
              bio
            }
          });
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

export function submitPofilePictureUpdate(profilePicture){
  return async(dispatch) => {
    dispatch({ type: PROFILE_UPDATE_SUBMIT });
    try {
      let formData = new FormData();
      formData.append('profilePicture', {
          uri: profilePicture,
          name: 'profilePicture.jpg',
          type: 'multipart/form-data'
        });

      let response = await fetchWithTokenHandler(getApiUrl() + '/user/profilepicture/', {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }, dispatch);

      switch(response.status){
        case 200:
          return response.json()
            .then((result) => {
              dispatch({
                type: PROFILE_PICTURE_UPDATE_SUCCESS,
                payload: {
                  profilePicture: result.location
                }
              });
            });
        case 400:
          return dispatch({
            type: PROFILE_UPDATE_ERROR,
            error: MISSING_PROFILE_PICTURE
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
            quality: 1
        });
        if (!result.cancelled) {
          dispatch({
            type: PROFILE_UPDATE,
            payload: {prop: 'profilePicture', value: result.uri}
          });
        }
      }
    } catch(error){
      dispatch({
        type: PROFILE_UPDATE_ERROR,
        error: INTERNAL_EXCEPTION
      });
    }
  }
}
