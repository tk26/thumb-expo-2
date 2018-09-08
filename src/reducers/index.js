import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import SocialReducer from './SocialReducer';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import SignupReducer from './SignupReducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth', 'profile'],
    stateReconciler: autoMergeLevel2 // merge only persisted properties instead of root level
   };

// aggregate the reducers using combineReducers method of redux
const rootReducers = combineReducers({
    social: SocialReducer,
    auth: AuthReducer,
    profile: ProfileReducer,
    signUp: SignupReducer
});

export default persistReducer(persistConfig, rootReducers);