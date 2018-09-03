import { AuthService } from '../services';
import { SIGNUP_UPDATE,
  SIGNUP_SUBMIT_STEP1,
  SIGNUP_STEP1_SUCCESS,
  SIGNUP_STEP1_ERROR
} from './types';


export const signupUpdate = ({prop, value}) => {
  return {
    type: SIGNUP_UPDATE,
    payload: {prop, value}
  }
}

export const submitStep1 = ({firstName, lastName, username}) => {
  return async(dispatch) => {
    dispatch({ type: SIGNUP_SUBMIT_STEP1 });
    const usernameRegex = /^[a-z0-9._]{3,30}$/;

    if (firstName.length < 1) {
      return step1Failed(dispatch, "First Name cannot be empty");
    }

    if (lastName.length < 1) {
      return step1Failed(dispatch, "Last Name cannot be empty");
    }

    if(!usernameRegex.test(username)){
      return step1Failed(dispatch, "Username should be between 3 to 30 characters " +
                      "and can only contain numbers, letters, periods and underscores");
    }

    const unexpectedException = "Some error occured. Please try again. If problem persists, " +
      "please let us know at support@thumbtravel.com";

    await AuthService.validateUsername(username)
      .then((response) => {
        switch (response.status){
            case 422:
                return step1Failed(dispatch, 'Invalid username');
            case 409:
                return step1Failed(dispatch, 'Duplicate username');
            case 200:
                return step1Succeeded(dispatch, response);
            default:
                return step1Failed(dispatch, unexpectedException);
        }
      })
      .catch(() => step1Failed(dispatch, unexpectedException));
  }
}

const step1Succeeded = (dispatch) => {
  dispatch ({
    type: SIGNUP_STEP1_SUCCESS
  });
}

const step1Failed = (dispatch, error) => {
  dispatch ({
    type: SIGNUP_STEP1_ERROR,
    error
  });
}
