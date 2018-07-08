export const FOLLOW_USER = 'FOLLOW_USER';

export const UNFOLLOW_USER = 'UNFOLLOW_USER';

// Imp: actions must have a type

export function followUser(username) {
  return { type: FOLLOW_USER, username };
}

export function unfollowUser(username) {
  return { type: UNFOLLOW_USER, username };
}