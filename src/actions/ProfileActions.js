import { PROFILE_LOGOUT, PROFILE_PICTURE_UPDATE, PROFILE_BIO_UPDATE } from './types';

export function clearProfile(){
    return { type: PROFILE_LOGOUT };
}

export function updateProfilePicture(profilePicture){
  return {
    type: PROFILE_PICTURE_UPDATE,
    profilePicture
  };
}

export function updateBio(bio){
  return {
    type: PROFILE_BIO_UPDATE,
    bio
  };
}
