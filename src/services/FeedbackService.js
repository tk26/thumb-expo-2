import { getApiUrl } from '../helper';
import { fetchWithTokenHandler } from '../services/fetchPlus';

export default class FeedbackService {
  static submitFeedback({feedbackType, feedbackDescription}){
    return fetchWithTokenHandler(getApiUrl() + '/feedback/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "feedbackType": feedbackType,
        "feedbackDescription": feedbackDescription
      })
    });
  }
}
