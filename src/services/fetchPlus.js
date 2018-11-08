import AuthService from './AuthService';

export const fetchWithTokenHandler = async(url, options) => {
  options = options || {};
  if(options.headers){
    options.headers.Authorization = 'Bearer' + ' ' + AuthService.getAuthToken();
  } else {
    options.headers = {
      Authorization: 'Bearer' + ' ' + AuthService.getAuthToken()
    };
  }

  let response = await fetch(url, options);
  if(response.status === 401){
    let authResponse = await AuthService.refreshToken();
    if(authResponse.status !== 200){
      throw 'Unable to refresh token';
    }
    const jsonResponse = await authResponse.json();
    await AuthService.setTokens(jsonResponse.token, jsonResponse.refreshToken);

    options.headers.Authorization = 'Bearer' + ' ' + AuthService.getAuthToken();
    return await fetch(url, options);
  }
  return response;
}
