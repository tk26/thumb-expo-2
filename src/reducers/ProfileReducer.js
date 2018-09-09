import {
    PROFILE_LOGOUT, 
    PROFILE_SAVE_INIT, 
    PROFILE_SAVE_SUCCESS, 
    PROFILE_SAVE_ERROR, 
    PROFILE_UPDATED
} from '../actions/types';

  const INITIAL_STATE = {
    firstName: '',
    school: '',
    username: '',
    profilePicture: '',
    bio: '',
    error: '',
    status: '',
    cameraRollPermission: '',
    profileIsSaved: false
  };

  export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case PROFILE_UPDATED:
            return {...state, error: '', [action.payload.prop]: action.payload.value}
        case PROFILE_SAVE_INIT:
            return {...state, error: ''}
        case PROFILE_SAVE_SUCCESS:
            return {...state, error: '', profileIsSaved: true}
        case PROFILE_SAVE_ERROR:
            return {...state, error: action.error, profileIsSaved: false}
        case PROFILE_LOGOUT:
            return {...state, INITIAL_STATE}
        default: 
            return state;
    }
  }