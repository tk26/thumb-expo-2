import { FOLLOW_USER, UNFOLLOW_USER } from './types';

// Imp: actions must have a type
export function followUser(username) {
    return { type: FOLLOW_USER, username };
  }
  
  export function unfollowUser(username) {
    return { type: UNFOLLOW_USER, username };
  }