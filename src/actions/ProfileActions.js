import { ProfileService } from '../services';
import { 
    PROFILE_LOGOUT, 
    PROFILE_SAVE_INIT, 
    PROFILE_SAVE_SUCCESS, 
    PROFILE_SAVE_ERROR, 
    PROFILE_UPDATED
} from './types';

const unexpectedException = "Some error occured. Please try again. If problem persists, " +
    "please let us know at support@thumbtravel.com";

export function clearProfile(){
    return { type: PROFILE_LOGOUT };
}

export function updateProfile({prop, value}) {
    return {
        type: PROFILE_UPDATED,
        payload: {prop, value}
    }
}

export function saveProfile({ profilePicture, bio }) {
    return async(dispatch) => {
        dispatch({ type: PROFILE_SAVE_INIT });
        try {
            let response = await ProfileService.updateUser({profilePicture, bio});
            switch(response.status) {
                case 200:
                    return dispatch({ type: PROFILE_SAVE_SUCCESS });
                case 400:
                    return dispatch({ type: PROFILE_SAVE_ERROR, error: "Invalid user details" });
                default:
                    return dispatch({ type: PROFILE_SAVE_ERROR, error: unexpectedException });
            }
        } catch(error){
            return dispatch({ type: PROFILE_SAVE_ERROR, error: unexpectedException });
        }
      }
}