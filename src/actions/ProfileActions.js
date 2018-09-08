import { PROFILE_LOGOUT } from './types';

export function clearProfile(){
    return { type: PROFILE_LOGOUT };
}
