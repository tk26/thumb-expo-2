import { fetchWithTokenHandler } from '../../src/services/fetchPlus';
import  AuthService  from '../../src/services/AuthService';
import NavigationService from '../../src/services/NavigationService';

jest.mock('../../src/services/AuthService');
jest.mock('../../src/services/NavigationService');

describe('fetchPlus', () => {
  describe('fetchWithTokenHandler', () => {
    test('Refreshes token when API returns 401', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 401 });
      AuthService.refreshToken.mockResolvedValue({
        status: 200,
        json: function() {return {token: 'asdfsad', refreshToken: 'asdfasdf'}}
      });
      await fetchWithTokenHandler('testurl', {}, function(){});
      expect(AuthService.setTokens.mock.calls).toEqual([['asdfsad', 'asdfasdf']]);
    });
    test('Throws invalid token exception when refresh token returns 500', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 401 });
      AuthService.refreshToken.mockResolvedValue({
        status: 500,
        json: function() {}
      });
      try {
        await fetchWithTokenHandler('testurl', {});
      } catch(error){
        expect(error).toEqual('Unable to refresh token');
      }
    });
    test('Does not return 401 when token has not expired', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 200 });
      let response = await fetchWithTokenHandler('testurl', {});
      expect(response.status).toEqual(200);
    });
    test('Dispatches EXPIRED_SESSION action when refresh token returns 401', async() => {
      let dispatchedActions = [];
      const dispatch = (action) => {
        dispatchedActions.push(action);
      };
      fetch.mockResponse(JSON.stringify({}),{ status: 401 });
      AuthService.refreshToken.mockResolvedValue({
        status: 401,
        json: function() {}
      });
      await fetchWithTokenHandler('testurl', {}, dispatch);
      expect(dispatchedActions[0]).toEqual({type: 'EXPIRED_SESSION'});
    });
  });
});
