import AuthService from './AuthService';
import NavigationService from './NavigationService';
import { EXPIRED_SESSION } from '../actions/types';

export const fetchWithTokenHandler = async(url, options, dispatch) => {
  options = options || {};
  if(options.headers){
    options.headers.Authorization = 'Bearer' + ' ' + AuthService.getAuthToken();
  } else {
    options.headers = {
      Authorization: 'Bearer' + ' ' + AuthService.getAuthToken()
    };
  }

  let requestResponse = await fetch(url, options);

  //If token has expired
  if(requestResponse.status === 401){
    //try to refresh token
    let authResponse = await AuthService.refreshToken();

    //end the session if 401 was returned refreshing the token
    if(authResponse.status === 401){
      dispatch({type: EXPIRED_SESSION});
      NavigationService.navigate('LoginScreen');
      return;
    }

    //Thrown an exception if a non 200 was returned
    if(authResponse.status !== 200){
      throw 'Unable to refresh token';
    }

    const jsonResponse = await authResponse.json();
    const { token, refreshToken } = jsonResponse;
    await AuthService.setTokens(token, refreshToken);

    //Set the new token
    options.headers.Authorization = 'Bearer' + ' ' + AuthService.getAuthToken();
    return await fetch(url, options);
  }
  return requestResponse;
}
