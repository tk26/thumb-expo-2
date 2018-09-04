import { AuthService } from '../services';
import { SIGNUP_UPDATE,
  SIGNUP_SUBMIT_STEP,
  SIGNUP_STEP1_SUCCESS,
  SIGNUP_STEP1_ERROR,
  SIGNUP_STEP2_SUCCESS,
  SIGNUP_STEP2_ERROR,
  SIGNUP_STEP3_SUCCESS,
  SIGNUP_STEP3_ERROR
} from './types';


export const signupUpdate = ({prop, value}) => {
  return {
    type: SIGNUP_UPDATE,
    payload: {prop, value}
  }
}

export const submitStep1 = ({firstName, lastName, username}) => {
  return async(dispatch) => {
    dispatch({ type: SIGNUP_SUBMIT_STEP });
    const usernameRegex = /^[a-z0-9._]{3,30}$/;
    const step = 1;

    if (firstName.length < 1) {
      return stepFailed(dispatch, step, "First Name cannot be empty");
    }

    if (lastName.length < 1) {
      return stepFailed(dispatch, step, "Last Name cannot be empty");
    }

    if(!usernameRegex.test(username)){
      return stepFailed(dispatch, step, "Username should be between 3 to 30 characters " +
                      "and can only contain numbers, letters, periods and underscores");
    }

    const unexpectedException = "Some error occured. Please try again. If problem persists, " +
      "please let us know at support@thumbtravel.com";

    try {
      let response = await AuthService.validateUsername(username);
      switch (response.status){
        case 422:
            return stepFailed(dispatch, step, 'Invalid username');
        case 409:
            return stepFailed(dispatch, step, 'Duplicate username');
        case 200:
            return stepSucceeded(dispatch, step, response);
        default:
            return stepFailed(dispatch, step, unexpectedException);
      }
    }
    catch(error) {
      stepFailed(dispatch, step, unexpectedException);
    }
  }
}

export const submitStep2 = ({password, confirmPassword}) => {
  const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  const step = 2;
  return (dispatch) => {
    if (password.length < 8 || password.length > 30) {
      return stepFailed(dispatch, step, "Password should be between 8 to 30 characters" );
    }
    if (!passwordRegex.test(password)) {
      const error = "Password should be a combinaton of upper and lowercase letters, " +
          "a number and a special character";
      return stepFailed(dispatch, step, error);
    }
    if (password !== confirmPassword) {
      return stepFailed(dispatch, step, "Password and Confirm Password do not match");
    }
    return stepSucceeded(dispatch, step);
  }
}

const stepSucceeded = (dispatch, step) => {
  let type;
  console.log(step);
  switch (step){
    case 1:
      type = SIGNUP_STEP1_SUCCESS;
      break;
    case 2:
      type = SIGNUP_STEP2_SUCCESS;
      break;
    default:
      type = SIGNUP_STEP3_SUCCESS;
      break;
  }

  dispatch ({
    type: type
  });
}

const stepFailed = (dispatch, step, error) => {
  let type;
  switch (step){
    case 1:
      type = SIGNUP_STEP1_ERROR;
    case 2:
      type = SIGNUP_STEP2_ERROR;
    default:
      type = SIGNUP_STEP3_ERROR;
  }
  dispatch ({
    type: type,
    error
  });
}
