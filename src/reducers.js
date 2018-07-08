import { combineReducers } from 'redux';
import { FOLLOW_USER, UNFOLLOW_USER } from './actions';

const initialState = {
    follows: [],
}

// social reducer
function social(state = initialState, action) {
    // performs a specifc manipulation for a particular type of action
    // manipulations should be pure functions
    switch (action.type) {
        case FOLLOW_USER:
            // inserts a new username in follows array
            // TODO check if already exists before adding
            return Object.assign({}, state, {
                follows: [ ...state.follows, action.username ]
            });
        case UNFOLLOW_USER:
            // removes a username from follows array
            return Object.assign({}, state, {
                follows: state.follows.filter(username => username !== action.username)
            });
        default:
          return state;
      }
}

// aggregate the reducers using combineReducers method of redux
const reducers = combineReducers({
    social
});

export default reducers;