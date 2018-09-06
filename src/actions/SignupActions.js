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
import * as constants from '../constants';

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
      return stepFailed(dispatch, step, constants.MISSING_FIRSTNAME);
    }

    if (lastName.length < 1) {
      return stepFailed(dispatch, step, constants.MISSING_LASTNAME);
    }

    if(!usernameRegex.test(username)){
      return stepFailed(dispatch, step, constants.INVALID_USERNAME_FORMAT);
    }
    try {
      let response = await SignupService.validateUsername(username);
      switch (response.status){
        case 422:
            return stepFailed(dispatch, step, constants.INVALID_USERNAME_GENERIC);
        case 409:
            return stepFailed(dispatch, step, constants.DUPLICATE_USERNAME);
        case 200:
            return stepSucceeded(dispatch, step, response);
        default:
            return stepFailed(dispatch, step, constants.INTERNAL_EXCEPTION);
      }
    }
    catch(error) {
      stepFailed(dispatch, step, constants.INTERNAL_EXCEPTION);
    }
  }
}

export const submitStep2 = ({password, confirmPassword}) => {
  const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  const step = 2;
  return (dispatch) => {
    dispatch({ type: SIGNUP_SUBMIT_STEP });
    if (password.length < 8 || password.length > 30) {
      return stepFailed(dispatch, step, constants.INVALID_PASSWORD_LENGTH );
    }
    if (!passwordRegex.test(password)) {
      return stepFailed(dispatch, step, constants.INVALID_PASSWORD_FORMAT);
    }
    if (password !== confirmPassword) {
      return stepFailed(dispatch, step, constants.PASSWORD_MISMATCH);
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
      return stepFailed(dispatch, step, constants.MISSING_BIRTHDAY);
    }
    if (university === 'none') {
      return stepFailed(dispatch, step, constants.MISSING_UNIVERSITY);
    }
    if (!emailRegex.test(email)) {
      return stepFailed(dispatch, step, constants.INVALID_EMAIL_ADDRESS);
    }
    if (email.substr(email.length - 4) !== '.edu') {
      return stepFailed(dispatch, step, constants.EMAIL_MISSING_EDU);
    }
    try {
      let response = await SignupService.validateEmail(email);
      switch (response.status){
        case 422:
          return stepFailed(dispatch, step, constants.INVALID_EMAIL_ADDRESS);
        case 409:
          return stepFailed(dispatch, step, constants.DUPLICATE_EMAIL);
        case 200:
          return stepSucceeded(dispatch, step, response);
        default:
          return stepFailed(dispatch, step, constants.INTERNAL_EXCEPTION);
      }
    } catch(error){
      return stepFailed(dispatch, step, constants.INTERNAL_EXCEPTION);
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
          return stepFailed(dispatch, step, constants.MISSING_USER_DATA);
        default:
          return stepFailed(dispatch, step, constants.INTERNAL_EXCEPTION);
      }
    } catch(error){
      return stepFailed(dispatch, step, constants.INTERNAL_EXCEPTION);
    }
  }
}

export const dispatchUncaughtError = (step) => {
  let type = getErrorType(step);
  return {
    type: type,
    error: constants.INTERNAL_EXCEPTION
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
  let type = getErrorType(step);
  dispatch ({
    type: type,
    error
  });
}

const getErrorType = (step) => {
  switch (step){
    case 1:
      return SIGNUP_STEP1_ERROR;
    case 2:
      return SIGNUP_STEP2_ERROR;
    case 3:
      return SIGNUP_STEP3_ERROR;
    case 4:
      return SIGNUP_STEP4_ERROR;
    default:
      return '';
  }
}
