import { Constants } from 'expo';

export const getApiUrl = () => {
    const releaseChannel = Constants.manifest.releaseChannel;
    if (releaseChannel === undefined) return 'http://10.0.3.2:2611';
    if (releaseChannel === 'staging') return 'https://vast-everglades-88283.herokuapp.com';
}