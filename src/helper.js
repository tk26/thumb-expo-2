import { Constants } from 'expo';
import * as data from '../localConfig.json';

export const getApiUrl = () => {
    const releaseChannel = Constants.manifest.releaseChannel;
    if (releaseChannel === undefined) return data.releaseChannel==='' ? 'http://192.168.0.5:2611' : data.releaseChannel;
    if (releaseChannel === 'staging') return 'https://vast-everglades-88283.herokuapp.com';
}