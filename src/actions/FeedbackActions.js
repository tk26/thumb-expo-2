import { FeedbackService } from '../services';
import { FEEDBACK_UPDATE,
    FEEDBACK_SUBMIT_INIT,
    FEEDBACK_SUBMIT_SUCCESS,
    FEEDBACK_SUBMIT_ERROR
} from './types';
import { getApiUrl } from '../helper';
import { fetchWithTokenHandler } from '../services/fetchPlus';

export const unexpectedException = "Some error occured. Please try again. If problem persists, " +
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
          let response = await fetchWithTokenHandler(getApiUrl() + '/feedback/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "feedbackType": feedbackType,
              "feedbackDescription": feedbackDescription
            })
          }, dispatch);

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
