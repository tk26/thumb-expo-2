import reducer from '../../src/reducers/FeedbackReducer';
import {
    FEEDBACK_UPDATE,
    FEEDBACK_SUBMIT_INIT,
    FEEDBACK_SUBMIT_SUCCESS,
    FEEDBACK_SUBMIT_ERROR
} from '../../src/actions/types';

describe('FeedbackReducer', () => {
    const initialState = {
        feedbackType: '',
        feedbackDescription: '',
        isValid: false,
        error: ''
    };

    describe('INITIAL_STATE', () => {
        test('should return correct state', () => {
            const action = { type: 'FAKE_ACTION' };
            expect(reducer(undefined, action)).toEqual(initialState);
        });
    });

    describe(FEEDBACK_UPDATE, () => {
        test('should return correct state', () => {
            const action = { type: FEEDBACK_UPDATE, payload: { prop: 'feedbackDescription', value: 'test'}};
            const expectedState = {...initialState, feedbackDescription: 'test'};
            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });

    describe(FEEDBACK_SUBMIT_INIT, () => {
        test('should return correct state', () => {
            const action = { type: FEEDBACK_SUBMIT_INIT };
            const expectedState = {...initialState, error: ''};
            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });

    describe(FEEDBACK_SUBMIT_SUCCESS, () => {
        test('should return correct state', () => {
            const action = { type: FEEDBACK_SUBMIT_SUCCESS };
            const expectedState = {...initialState, error: '', isValid: true};
            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });

    describe(FEEDBACK_SUBMIT_ERROR, () => {
        test('should return correct state', () => {
            const action = { type: FEEDBACK_SUBMIT_ERROR, error: 'test' };
            const expectedState = {...initialState, error: 'test', isValid: false};
            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });
})
