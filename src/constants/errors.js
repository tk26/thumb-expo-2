//General Exceptions
export const INTERNAL_EXCEPTION = 'Some error occured. Please try again. If problem persists, ' +
  'please let us know at support@thumbtravel.com';

//Auth Exceptions
export const INVALID_LOGIN = 'The username and password you entered did not match our records. ' +
  'Please double-check and try again.';
export const UNVERIFIED_USER_LOGIN = "It seems that you haven't confirmed your email just yet. " +
"We have resent the email verification link to you. " +
"Please confirm your email by clicking on it. " +
"Feel free to email us at support@thumbtravel.com if you face any issues.";

// Signup Exceptions
export const MISSING_FIRSTNAME = 'First Name cannot be empty';
export const MISSING_LASTNAME = 'Last Name cannot be empty';
export const INVALID_USERNAME_FORMAT = 'Username should be between 3 to 30 characters and can only contain numbers, letters, periods and underscores';
export const INVALID_USERNAME_GENERIC = 'Invalid username';
export const DUPLICATE_USERNAME = 'Duplicate username';
export const INVALID_PASSWORD_LENGTH = 'Password should be between 8 to 30 characters';
export const INVALID_PASSWORD_FORMAT = 'Password should be a combinaton of upper and lowercase letters, ' +
  'a number and a special character';
export const PASSWORD_MISMATCH = 'Password and Confirm Password do not match';
export const MISSING_BIRTHDAY = 'Please select your birthday';
export const MISSING_UNIVERSITY = 'Please select your school';
export const INVALID_EMAIL_ADDRESS = 'Invalid email';
export const EMAIL_MISSING_EDU = 'Email address must end in .edu';
export const DUPLICATE_EMAIL = 'Duplicate email';
export const MISSING_USER_DATA = 'Missing one or more user details';

// Profile Exceptions
export const MISSING_PROFILE_PICTURE = 'No profile picture was provided.';
