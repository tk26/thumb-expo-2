import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { PermissionService } from '../../src/services';
import { ImagePicker } from 'expo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

// Actions to be tested
import * as profileActions from '../../src/actions/ProfileActions';
import * as types from '../../src/actions/types';
import * as constants from '../../src/constants';

describe('ProfileActions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });
  afterEach(() => {
    fetch.resetMocks();
  });
  describe('profile update', () => {
    test('Dispatches the correct action and payload', () => {
      const bio = 'test bio';
      const expectedActions = [
        {
          type: types.PROFILE_UPDATE,
          payload: {prop: 'bio', value: bio}
        }
      ];
      store.dispatch(profileActions.profileUpdate({ prop: 'bio', value: bio}));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  describe('clear profile', () => {
    test('Dispatches the correct action and payload', () => {
      const bio = 'test bio';
      const expectedActions = [
        {
          type: types.PROFILE_LOGOUT
        }
      ];
      store.dispatch(profileActions.clearProfile());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  describe('submit profile update', () => {
    test('Dispatches the correct action and payload when API returns 400', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 400 });
      const bio = 'test bio';
      const expectedActions = [
        {
          type: types.PROFILE_UPDATE_SUBMIT
        },
        {
          type: types.PROFILE_UPDATE_ERROR,
          error: "Invalid user details"
        }
      ];
      await store.dispatch(profileActions.submitPofileUpdate(bio));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct action and payload when API returns 200', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 200 });
      const bio = 'test bio';
      const expectedActions = [
        {
          type: types.PROFILE_UPDATE_SUBMIT
        },
        {
          type: types.PROFILE_UPDATE_SUCCESS,
          payload: {bio}
        }
      ];
      await store.dispatch(profileActions.submitPofileUpdate(bio));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct action and payload when API returns 500', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 500 });
      const bio = 'test bio';
      const profilePicture = 'asdfasdf';
      const expectedActions = [
        {
          type: types.PROFILE_UPDATE_SUBMIT
        },
        {
          type: types.PROFILE_UPDATE_ERROR,
          error: constants.INTERNAL_EXCEPTION
        }
      ];
      await store.dispatch(profileActions.submitPofileUpdate(bio));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct action and payload when API request fails', async() => {
      fetch.mockReject(new Error('fake error message'));
      const bio = 'test bio';
      const profilePicture = 'asdfasdf';
      const expectedActions = [
        {
          type: types.PROFILE_UPDATE_SUBMIT
        },
        {
          type: types.PROFILE_UPDATE_ERROR,
          error: constants.INTERNAL_EXCEPTION
        }
      ];
      await store.dispatch(profileActions.submitPofileUpdate(bio));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('submit profile picture update', () => {
    test('Dispatches the correct action and payload when API returns 400', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 400 });
      const profilePicture = 'asdfasdf';
      const expectedActions = [
        {
          type: types.PROFILE_UPDATE_SUBMIT
        },
        {
          type: types.PROFILE_UPDATE_ERROR,
          error: constants.MISSING_PROFILE_PICTURE
        }
      ];
      await store.dispatch(profileActions.submitPofilePictureUpdate(profilePicture));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct action and payload when API returns 200', async() => {
      const profilePicture = 'asdfasdf';
      fetch.mockResponse(JSON.stringify({ location: profilePicture }),{ status: 200 });
      const expectedActions = [
        {
          type: types.PROFILE_UPDATE_SUBMIT
        },
        {
          type: types.PROFILE_PICTURE_UPDATE_SUCCESS,
          payload: {
            profilePicture
          }
        }
      ];
      await store.dispatch(profileActions.submitPofilePictureUpdate(profilePicture));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct action and payload when API returns 500', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 500 });
      const profilePicture = 'asdfasdf';
      const expectedActions = [
        {
          type: types.PROFILE_UPDATE_SUBMIT
        },
        {
          type: types.PROFILE_UPDATE_ERROR,
          error: constants.INTERNAL_EXCEPTION
        }
      ];
      await store.dispatch(profileActions.submitPofilePictureUpdate(profilePicture));
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches the correct action and payload when API request fails', async() => {
      fetch.mockReject(new Error('fake error message'));
      const profilePicture = 'asdfasdf';
      const expectedActions = [
        {
          type: types.PROFILE_UPDATE_SUBMIT
        },
        {
          type: types.PROFILE_UPDATE_ERROR,
          error: constants.INTERNAL_EXCEPTION
        }
      ];
      await store.dispatch(profileActions.submitPofilePictureUpdate(profilePicture));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('update profile picture', () => {
    test('Submits no actions when permissions are not granted', async() => {
      jest.spyOn(PermissionService, "hasCameraPermissions")
        .mockImplementation(() => {return false;});
      jest.spyOn(PermissionService, "requestCameraPermissions")
        .mockImplementation(() => {return false;});

      const expectedActions = [];
      await store.dispatch(profileActions.updateProfilePicture());
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Allows image to be selected when requested permissions are granted', async() => {
      jest.spyOn(PermissionService, "hasCameraPermissions")
        .mockImplementation(() => {return false;});
      jest.spyOn(PermissionService, "requestCameraPermissions")
        .mockImplementation(() => {return true;});
      jest.spyOn(ImagePicker, "launchImageLibraryAsync")
        .mockImplementation(() => {return {cancelled: false, uri: 'test'};});

      const expectedActions = [
        {
          type: types.PROFILE_UPDATE,
          payload: {prop: 'profilePicture', value: "test"}
        }
      ];
      await store.dispatch(profileActions.updateProfilePicture());
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Submits no actions when result is cancelled', async() => {
      jest.spyOn(PermissionService, "hasCameraPermissions")
        .mockImplementation(() => {return true;});
      jest.spyOn(ImagePicker, "launchImageLibraryAsync")
        .mockImplementation(() => {return {cancelled: true};});

      const expectedActions = [];
      await store.dispatch(profileActions.updateProfilePicture());
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Submits update profile action when image is selected', async() => {
      jest.spyOn(PermissionService, "hasCameraPermissions")
        .mockImplementation(() => {return true;});
      jest.spyOn(ImagePicker, "launchImageLibraryAsync")
        .mockImplementation(() => {return {cancelled: false, uri: "test"};});

      const expectedActions = [
        {
          type: types.PROFILE_UPDATE,
          payload: {prop: 'profilePicture', value: "test"}
        }
      ];
      await store.dispatch(profileActions.updateProfilePicture());
      expect(store.getActions()).toEqual(expectedActions);
    });
    test('Dispatches error when exception is thrown selecting image', async() => {
      jest.spyOn(PermissionService, "hasCameraPermissions")
        .mockImplementation(() => {return true;});
      jest.spyOn(ImagePicker, "launchImageLibraryAsync")
        .mockImplementation(() => {throw new Error('Test Exception!');});

      const expectedActions = [
        {
          type: types.PROFILE_UPDATE_ERROR,
          error: constants.INTERNAL_EXCEPTION
        }
      ];
      await store.dispatch(profileActions.updateProfilePicture());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
