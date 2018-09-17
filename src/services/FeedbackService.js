import { getApiUrl } from '../helper';

export default class FeedbackService {
  static submitFeedback({feedbackType, feedbackDescription}){
    return fetch(getApiUrl() + '/feedback/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + ' ' + global.auth_token
      },
      body: JSON.stringify({
        "feedbackType": feedbackType,
        "feedbackDescription": feedbackDescription
      })
    });
  }
}
