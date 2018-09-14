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

    afterEach(() => {
        fetch.resetMocks();
    });
    
    describe('feedbackUpdate - description change', () => {
        test('Dispatches the correct action and payload', () => {
            store.dispatch(feedbackActions.feedbackUpdate({ prop: 'feedbackDescription', value: 'test feedback description' }));
            expect(store.getActions()).toMatchSnapshot();
        });
    });

    describe('submitFeedback', () => {
        test('Dispatches the correct action when feedbackDescription is empty', async () => {
            const expectedActions = [
                {
                  type: types.FEEDBACK_SUBMIT_INIT
                },
                {
                  type: types.FEEDBACK_SUBMIT_ERROR,
                  error: 'Invalid feedback details'
                }
            ];
            await store.dispatch(feedbackActions.submitFeedback({ feedbackType: 'test', feedbackDescription: '' }));
            expect(store.getActions()).toEqual(expectedActions);
        });

        test('Dispatches the correct actions when API returns internal 500 error', async() => {
            fetch.mockResponse(JSON.stringify({}),{ status: 500 });
            const expectedActions = [
                {
                    type: types.FEEDBACK_SUBMIT_INIT
                },
                {
                    type: types.FEEDBACK_SUBMIT_ERROR,
                    error: feedbackActions.unexpectedException
                }
            ];
            await store.dispatch(feedbackActions.submitFeedback({ feedbackType: 'test', feedbackDescription: 'test' }));
            expect(store.getActions()).toEqual(expectedActions);
          });

        test('Dispatches the correct actions when step 1 is valid', async() => {
            fetch.mockResponse(JSON.stringify({}),{ status: 200 });
            const expectedActions = [
                {
                    type: types.FEEDBACK_SUBMIT_INIT
                },
                {
                    type: types.FEEDBACK_SUBMIT_SUCCESS
                }
            ];
            await store.dispatch(feedbackActions.submitFeedback({ feedbackType: 'test', feedbackDescription: 'test' }));
            expect(store.getActions()).toEqual(expectedActions);
        });
        
        test('Dispatches correct actions when throws exception', async()=>{
            fetch.mockReject(new Error('fake error message'));
            const expectedActions = [
                {
                    type: types.FEEDBACK_SUBMIT_INIT
                },
                {
                    type: types.FEEDBACK_SUBMIT_ERROR,
                    error: feedbackActions.unexpectedException
                }
            ];
            await store.dispatch(feedbackActions.submitFeedback({ feedbackType: 'test', feedbackDescription: 'test' }));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});