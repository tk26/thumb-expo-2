import {
  SIGNUP_UPDATE,
  SIGNUP_SUBMIT_STEP,
  SIGNUP_STEP1_ERROR,
  SIGNUP_STEP1_SUCCESS,
  SIGNUP_STEP2_ERROR,
  SIGNUP_STEP2_SUCCESS,
  SIGNUP_STEP3_ERROR,
  SIGNUP_STEP3_SUCCESS,
  SIGNUP_STEP4_ERROR,
  SIGNUP_STEP4_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  birthday: '',
  university: 'none',
  loading: false,
  step1IsValid: false,
  step2IsValid: false,
  step3IsValid: false,
  step4IsValid: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case SIGNUP_UPDATE:
      return {...state, error: '', [action.payload.prop]: action.payload.value}
    case SIGNUP_SUBMIT_STEP:
      return {...state, error: '', loading: true}
    case SIGNUP_STEP1_SUCCESS:
      return {...state, error: '', step1IsValid: true, loading: false}
    case SIGNUP_STEP1_ERROR:
      return {...state, error: action.error, step1IsValid: false, loading: false}
    case SIGNUP_STEP2_SUCCESS:
      return {...state, error: '', step2IsValid: true, loading: false}
    case SIGNUP_STEP2_ERROR:
      return {...state, error: action.error, step2IsValid: false, loading: false}
    case SIGNUP_STEP3_SUCCESS:
      return {...state, error: '', step3IsValid: true, loading: false}
    case SIGNUP_STEP3_ERROR:
      return {...state, error: action.error, step3IsValid: false, loading: false}
    case SIGNUP_STEP4_SUCCESS:
      return {...state, error: '', step4IsValid: true, loading: false}
    case SIGNUP_STEP4_ERROR:
      return {...state, error: action.error, step4IsValid: false, loading: false}
    default:
      return state;
  }
}
