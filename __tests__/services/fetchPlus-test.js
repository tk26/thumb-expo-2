import { fetchWithTokenHandler } from '../../src/services/fetchPlus';
import  AuthService  from '../../src/services/AuthService';

jest.mock('../../src/services/AuthService');

describe('fetchPlus', () => {
  describe('fetchWithTokenHandler', () => {
    test('Refreshes token when API returns 401', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 401 });
      AuthService.refreshToken.mockResolvedValue({
        status: 200,
        json: function() {return {token: 'asdfsad', refreshToken: 'asdfasdf'}}
      });
      await fetchWithTokenHandler('testurl', {});
      expect(AuthService.setTokens.mock.calls).toEqual([['asdfsad', 'asdfasdf']]);
    });
    test('Throws invalid token exception when refresh token returns 401', async() => {
      fetch.mockResponse(JSON.stringify({}),{ status: 401 });
      AuthService.refreshToken.mockResolvedValue({
        status: 401,
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
  });
});
