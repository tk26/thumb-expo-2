import { combineReducers } from 'redux';

import SocialReducer from './SocialReducer';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import SignupReducer from './SignupReducer';
import FeedbackReducer from './FeedbackReducer';


// aggregate the reducers using combineReducers method of redux
const rootReducers = combineReducers({
    social: SocialReducer,
    auth: AuthReducer,
    profile: ProfileReducer,
    signUp: SignupReducer,
    feedback: FeedbackReducer
});

export default rootReducers;
