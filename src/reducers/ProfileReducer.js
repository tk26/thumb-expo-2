import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import {
  PROFILE_RESET,
  PROFILE_LOGOUT,
  PROFILE_UPDATE,
  PROFILE_UPDATE_SUBMIT,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_PICTURE_UPDATE_SUCCESS,
  PROFILE_UPDATE_ERROR
} from '../actions/types';

const persistConfig = {
  key: 'profile',
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  school: '',
  username: '',
  profilePicture: '',
  birthday: '',
  bio: '',
  loading: false,
  error: '',
  editProfile: {
    profilePicture: '',
    bio: '',
    loading: false,
    error: ''
  }
};

const ProfileReducer = (state = INITIAL_STATE, action) => {
  let editProfile;
  switch (action.type){
      case PROFILE_RESET:
          return {...INITIAL_STATE,
              firstName: action.profile.firstName,
              lastName: action.profile.lastName,
              school: action.profile.school,
              username: action.profile.username,
              profilePicture: action.profile.profilePicture,
              birthday: action.profile.birthday,
              bio: action.profile.bio,
              editProfile: {
                profilePicture: action.profile.profilePicture,
                bio: action.profile.bio,
                loading: false,
                error: ''
              }
          }
      case PROFILE_LOGOUT:
        return INITIAL_STATE;
      case PROFILE_UPDATE:
        editProfile = {...state.editProfile, error: '', loading: false};
        editProfile[action.payload.prop] = action.payload.value;
        return {...state, editProfile}
      case PROFILE_UPDATE_SUBMIT:
        editProfile = {...state.editProfile, loading: true, error: ''};
        return {...state, editProfile};
      case PROFILE_UPDATE_SUCCESS:
        editProfile = {...state.editProfile, loading: false, error: '', bio: action.payload.bio};
        return {...state,
          bio: editProfile.bio,
          editProfile: editProfile
        };
      case PROFILE_PICTURE_UPDATE_SUCCESS:
        editProfile = {...state.editProfile, loading: false, error: '', profilePicture: action.payload.profilePicture};
        return {...state,
          profilePicture: editProfile.profilePicture,
          editProfile: editProfile
        };
      case PROFILE_UPDATE_ERROR:
        editProfile = {...state.editProfile, loading: false, error: action.error};
        return {...state, editProfile};
      default:
        return state;
  }
}
export default persistReducer(persistConfig, ProfileReducer);
