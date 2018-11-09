import profileReducer from '../../src/reducers';
import {
  PROFILE_RESET,
  PROFILE_LOGOUT,
  PROFILE_UPDATE,
  PROFILE_UPDATE_SUBMIT,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_PICTURE_UPDATE_SUCCESS,
  PROFILE_UPDATE_ERROR
} from '../../src/actions/types';

describe('ProfileReducer', () => {
  const initialState = {
    firstName: '',
    lastName: '',
    school: '',
    username: '',
    profilePicture: '',
    birthday: '',
    bio: '',
    loading: false,
    error: '',
    editProfile: {
      profilePicture: '',
      bio: '',
      loading: false,
      error: ''
    }
  };
  describe('DEFAULT_STATE', () => {
    test('should return initial state when provided unhandled action and no state', () => {
      const action = { type: 'FAKE_ACTION' };
      expect(profileReducer(undefined, action).profile).toEqual(initialState);
    });
    test('should return correct state when provided unhandled action and valid state', () => {
      const action = { type: 'FAKE_ACTION' };
      const validState = {
        profile : {...initialState, firstName: 'test', lastName: 'test2'}
      };
      expect(profileReducer(validState, action).profile).toEqual(validState.profile);
    });
  });
  describe(PROFILE_LOGOUT, () => {
    test('should clear profile details and return initial state', () => {
      const beforeState = {
        profile : {
          firstName: 'First',
          lastName: 'Last',
          school: 'good school',
          username: 'testuser',
          profilePicture: 'dafasdf',
          birthday: '1/1/2000',
          bio: 'This is my bio!',
          loading: false,
          error: '',
          editProfile: {
            profilePicture: 'dafasdf',
            bio: 'This is my new bio!!',
            loading: false,
            error: ''
          }
        }
      };
      const action = { type: PROFILE_LOGOUT };
      expect(profileReducer(beforeState, action).profile).toEqual(initialState);
    });
  });
  describe(PROFILE_RESET, () => {
    test('should set profile when provided valid profile', () => {
      const profile = {
          firstName: 'First',
          lastName: 'Last',
          school: 'good school',
          username: 'testuser',
          profilePicture: 'dafasdf',
          birthday: '1/1/2000',
          bio: 'This is my bio!'
      };

      const expectedState = {...initialState,
        firstName: profile.firstName,
        lastName: profile.lastName,
        school: profile.school,
        username: profile.username,
        profilePicture: profile.profilePicture,
        birthday: profile.birthday,
        bio: profile.bio,
        editProfile: {
          profilePicture: profile.profilePicture,
          bio: profile.bio,
          error: '',
          loading: false
        }
      }
      const action = { type: PROFILE_RESET, profile };
      expect(profileReducer({profile: initialState}, action).profile).toEqual(expectedState);
    });
  });
  describe(PROFILE_UPDATE, () => {
    test('should update edit profile property when provided update', () => {
      const editProfile = {...initialState.editProfile, bio: 'This is my new bio!'};
      const expectedState = {...initialState, editProfile};
      const action = {type: PROFILE_UPDATE, payload: {prop: 'bio', value: editProfile.bio} };
      expect(profileReducer({profile: initialState}, action).profile).toEqual(expectedState);
    });
  });
  describe(PROFILE_UPDATE_SUBMIT, () => {
    test('should return correct loading state', () => {
      const editProfile = {...initialState.editProfile, loading: true, error: ''};
      const expectedState = {...initialState, editProfile};
      const action = {type: PROFILE_UPDATE_SUBMIT };
      expect(profileReducer({profile: initialState}, action).profile).toEqual(expectedState);
    });
  });
  describe(PROFILE_UPDATE_SUCCESS, () => {
    test('should return correct state with error message', () => {
      const beforeState = {...initialState, editProfile: {
        ...initialState.editProfile, loading: true, bio: 'This is my new bio!!!'
      }};
      const editProfile = {...beforeState.editProfile, loading: false};
      const expectedState = {...initialState, bio: editProfile.bio, editProfile};
      const action = {type: PROFILE_UPDATE_SUCCESS, payload: { bio: beforeState.editProfile.bio}};
      expect(profileReducer({profile: beforeState}, action).profile).toEqual(expectedState);
    });
  });
  describe(PROFILE_PICTURE_UPDATE_SUCCESS, () => {
    test('should return correct state with error message', () => {
      const beforeState = {...initialState, editProfile: {
        ...initialState.editProfile, loading: true, profilePicture: 'asdfasdf'
      }};
      const editProfile = {...beforeState.editProfile, loading: false};
      const expectedState = {...initialState, profilePicture: editProfile.profilePicture, editProfile};
      const action = {type: PROFILE_PICTURE_UPDATE_SUCCESS, payload: { profilePicture: beforeState.editProfile.profilePicture}};
      expect(profileReducer({profile: beforeState}, action).profile).toEqual(expectedState);
    });
  });
  describe(PROFILE_UPDATE_ERROR, () => {
    test('should return correct state with error message', () => {
      const beforeState = {...initialState, editProfile: {
        ...initialState.editProfile, loading: true
      }};
      const editProfile = {...initialState.editProfile, loading: false, error: 'this is a test error'};
      const expectedState = {...initialState, editProfile};
      const action = {type: PROFILE_UPDATE_ERROR, error: editProfile.error };
      expect(profileReducer({profile: beforeState}, action).profile).toEqual(expectedState);
    });
  });
});
