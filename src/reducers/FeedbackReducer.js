import {
    FEEDBACK_UPDATE,
    FEEDBACK_SUBMIT_INIT,
    FEEDBACK_SUBMIT_SUCCESS,
    FEEDBACK_SUBMIT_ERROR
} from '../actions/types';
  
const INITIAL_STATE = {
    feedbackType: '',
    feedbackDescription: '',
    isValid: false,
    error: ''
};
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case FEEDBACK_UPDATE:
            return {...state, error: '', [action.payload.prop]: action.payload.value}
        case FEEDBACK_SUBMIT_INIT:
            return {...state, error: ''}
        case FEEDBACK_SUBMIT_SUCCESS:
            return {...state, error: '', isValid: true}
        case FEEDBACK_SUBMIT_ERROR:
            return {...state, error: action.error, isValid: false}
        default:
            return state;
    }
  }
  