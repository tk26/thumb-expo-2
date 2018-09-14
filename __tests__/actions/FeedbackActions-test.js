import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

// Actions to be tested
import * as feedbackActions from '../../src/actions/FeedbackActions';
import * as types from '../../src/actions/types';

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

    // describe('submitFeedback', () => {
    //     test('Dispatches the correct action when feedbackDescription is empty', () => {
    //         const expectedActions = [
    //             {
    //               type: types.FEEDBACK_SUBMIT_INIT
    //             },
    //             {
    //               type: types.FEEDBACK_SUBMIT_ERROR,
    //               error: 'Invalid feedback details'
    //             }
    //         ];
    //         await store.dispatch(feedbackActions.submitFeedback({ feedbackType: 'test', feedbackDescription: '' }));
    //         expect(store.getActions()).toEqual(expectedActions);
    //     });
    // });
});