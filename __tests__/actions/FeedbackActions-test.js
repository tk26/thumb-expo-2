import configureStore from 'redux-mock-store';

// Actions to be tested
import * as feedbackActions from '../../src/actions/FeedbackActions';
import * as types from '../../src/actions/types';

const mockStore = configureStore();
const store = mockStore();

describe('FeedbackActions', () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });
    
    describe('feedbackUpdate - description change', () => {
        test('Dispatches the correct action and payload', () => {
            store.dispatch(feedbackActions.feedbackUpdate({ prop: 'feedbackDescription', value: 'test feedback description' }));
            expect(store.getActions()).toMatchSnapshot();
        });
    });
});