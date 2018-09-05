import { SignupService } from '../services';
import { SIGNUP_UPDATE,
  SIGNUP_SUBMIT_STEP,
  SIGNUP_STEP1_SUCCESS,
  SIGNUP_STEP1_ERROR,
  SIGNUP_STEP2_SUCCESS,
  SIGNUP_STEP2_ERROR,
  SIGNUP_STEP3_SUCCESS,
  SIGNUP_STEP3_ERROR,
  SIGNUP_STEP4_SUCCESS,
  SIGNUP_STEP4_ERROR
} from './types';

const unexpectedException = "Some error occured. Please try again. If problem persists, " +
  "please let us know at support@thumbtravel.com";

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
    try {
      let response = await SignupService.validateUsername(username);
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
    dispatch({ type: SIGNUP_SUBMIT_STEP });
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

export const submitStep3 = ({email, birthday, university}) => {
  const step = 3;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return async(dispatch) => {
    dispatch({ type: SIGNUP_SUBMIT_STEP });
    if (birthday === '') {
      return stepFailed(dispatch, "Please select your birthday");
    }
    if (university === 'none') {
      return stepFailed(dispatch, "Please select your school");
    }
    if (!emailRegex.test(email)) {
      return stepFailed(dispatch, "Incorrect email address");
    }
    if (email.substr(email.length - 4) !== '.edu') {
      return stepFailed(dispatch, "Email address must end in .edu");
    }
    try {
      let response = await SignupService.validateEmail(email);
      switch (response.status){
        case 422:
          return stepFailed(dispatch, step, 'Invalid email');
        case 409:
          return stepFailed(dispatch, step, 'Duplicate email');
        case 200:
          return stepSucceeded(dispatch, step, response);
        default:
          return stepFailed(dispatch, step, unexpectedException);
      }
    } catch(error){
      return stepFailed(dispatch, step, unexpectedException);
    }
  }
}

export const createUser = ({firstName, lastName, username, password, email, birthday, university}) => {
  const step = 4;
  return async(dispatch) => {
    dispatch({ type: SIGNUP_SUBMIT_STEP });
    try {
      let response = await SignupService.createUser({firstName, lastName, username, password, email, birthday, university});
      switch(response.status){
        case 200:
          return stepSucceeded(dispatch, step);
        case 400:
          return stepFailed(dispatch, step, "Missing one or more user details");
        default:
          return stepFailed(dispatch, step, unexpectedException);
      }
    } catch(error){
      return stepFailed(dispatch, step, unexpectedException);
    }
  }
}

const stepSucceeded = (dispatch, step) => {
  let type;
  switch (step){
    case 1:
      type = SIGNUP_STEP1_SUCCESS;
      break;
    case 2:
      type = SIGNUP_STEP2_SUCCESS;
      break;
    case 3:
      type = SIGNUP_STEP3_SUCCESS;
      break;
    case 4:
      type = SIGNUP_STEP4_SUCCESS;
      break;
    default:
      return;
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
      break;
    case 2:
      type = SIGNUP_STEP2_ERROR;
      break;
    case 3:
      type = SIGNUP_STEP3_ERROR;
      break;
    case 4:
      type = SIGNUP_STEP4_ERROR;
      break;
    default:
      return;
  }
  dispatch ({
    type: type,
    error
  });
}
