import { Constants } from 'expo';

export const getApiUrl = () => {
    const releaseChannel = Constants.manifest.releaseChannel;
    if (releaseChannel === undefined) return 'http://192.168.0.68:2611';
    if (releaseChannel === 'staging') return 'https://vast-everglades-88283.herokuapp.com';
}