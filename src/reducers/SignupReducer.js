import {
  SIGNUP_UPDATE,
  SIGNUP_SUBMIT_STEP1,
  SIGNUP_STEP1_ERROR,
  SIGNUP_STEP1_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  username: '',
  loading: false,
  step1IsValid: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case SIGNUP_UPDATE:
      console.log(action);
      return {...state, error: '', [action.payload.prop]: action.payload.value}
    case SIGNUP_SUBMIT_STEP1:
      return {...state, error: '', step1IsValid: false, loading: true}
    case SIGNUP_STEP1_SUCCESS:
      return {...state, error: '', step1IsValid: true, loading: false}
    case SIGNUP_STEP1_ERROR:
      return {...state, error: action.error, step1IsValid: false, loading: false}
    default:
      return state;
  }
}
