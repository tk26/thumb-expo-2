import { getApiUrl } from '../helper';

export default class StaticDataService {
  static async getSupportedUniversities(){
    const response = await fetch(getApiUrl() + '/universities', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    });
    if(response.status === 200){
      const result = await response.json();
      return result.universities;
    } else {
      throw Error('Unable to retrieve list of universities.');
    }
  }
}
