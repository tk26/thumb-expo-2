import { FeedbackService } from '../services';
import { FEEDBACK_UPDATE,
    FEEDBACK_SUBMIT_INIT,
    FEEDBACK_SUBMIT_SUCCESS,
    FEEDBACK_SUBMIT_ERROR
} from './types';

const unexpectedException = "Some error occured. Please try again. If problem persists, " +
    "please let us know at support@thumbtravel.com";

export const feedbackUpdate = ({prop, value}) => {
    return {
        type: FEEDBACK_UPDATE,
        payload: {prop, value}
    }
}

export const submitFeedback = ({feedbackType, feedbackDescription}) => {
    return async(dispatch) => {
        dispatch({ type: FEEDBACK_SUBMIT_INIT });
        if (feedbackDescription.length < 1) {
            return dispatch ({ type: FEEDBACK_SUBMIT_ERROR, error: 'Invalid feedback details' });   
        }
        try {
            let response = await FeedbackService.submitFeedback({feedbackType, feedbackDescription});
            switch(response.status){
                case 200:
                    return dispatch ({ type: FEEDBACK_SUBMIT_SUCCESS });
                case 400:
                    return dispatch ({ type: FEEDBACK_SUBMIT_ERROR, error: 'Invalid user details' });
                default:
                    return dispatch ({ type: FEEDBACK_SUBMIT_ERROR, error: unexpectedException });
                }
        } catch(error){
            return dispatch ({ type: FEEDBACK_SUBMIT_ERROR, error: unexpectedException });
        }
    }
}