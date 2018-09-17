import {
    PROFILE_UPDATED,
    PROFILE_LOGOUT
  } from '../actions/types';

  const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    school: '',
    username: '',
    profilePicture: '',
    birthday: '',
    bio: ''
  };  

  export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case PROFILE_UPDATED:
            return {...state, 
                firstName: action.profile.firstName,
                lastName: action.profile.lastName,
                school: action.profile.school,
                username: action.profile.username,
                profilePicture: action.profile.profilePicture,
                birthday: action.profile.birthday,
                bio: action.profile.bio
            }
        case PROFILE_LOGOUT:
            return {...state, INITIAL_STATE}
        default: 
            return state;
    }
  }