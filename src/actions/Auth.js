import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_GITHUB_USER,
  SIGNIN_GITHUB_USER_SUCCESS,
  SIGNIN_GOOGLE_USER,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_TWITTER_USER,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  ACTIVATE_INFO,
  ACTIVATE_INFO_SUCCESS,
  CHANGE_PASSWORD_WL,
  CHANGE_PASSWORD_WL_SUCCESS,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  RESET_AUTH_SUCCESS_INDICATORS
} from "constants/ActionTypes";

export const userSignUp = user => {
  return {
    type: SIGNUP_USER,
    payload: user
  };
};

export const userSignIn = user => {
  return {
    type: SIGNIN_USER,
    payload: user
  };
};

export const userSignOut = () => {
  return {
    type: SIGNOUT_USER
  };
};

export const userSignUpSuccess = authUser => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: authUser
  };
};

export const userSignInSuccess = authUser => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: authUser
  };
};

export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS
  };
};

export const showAuthMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};

export const userGoogleSignIn = () => {
  return {
    type: SIGNIN_GOOGLE_USER
  };
};

export const userGoogleSignInSuccess = authUser => {
  return {
    type: SIGNIN_GOOGLE_USER_SUCCESS,
    payload: authUser
  };
};

export const userFacebookSignIn = () => {
  return {
    type: SIGNIN_FACEBOOK_USER
  };
};

export const userFacebookSignInSuccess = authUser => {
  return {
    type: SIGNIN_FACEBOOK_USER_SUCCESS,
    payload: authUser
  };
};

export const setInitUrl = url => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const userTwitterSignIn = () => {
  return {
    type: SIGNIN_TWITTER_USER
  };
};

export const userTwitterSignInSuccess = authUser => {
  return {
    type: SIGNIN_TWITTER_USER_SUCCESS,
    payload: authUser
  };
};

export const userGithubSignIn = () => {
  return {
    type: SIGNIN_GITHUB_USER
  };
};

export const userGithubSignInSuccess = authUser => {
  return {
    type: SIGNIN_GITHUB_USER_SUCCESS,
    payload: authUser
  };
};

export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE
  };
};

export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER
  };
};

export const fetchActivationInfo = obj => {
  return {
    type: ACTIVATE_INFO,
    payload: obj
  };
};

export const fetchActivationInfoSuccess = obj => {
  return {
    type: ACTIVATE_INFO_SUCCESS,
    payload: obj
  };
};

export const changePasswordWL = obj => {
  return {
    type: CHANGE_PASSWORD_WL,
    payload: obj
  };
};

export const changePasswordWLSuccess = obj => {
  return {
    type: CHANGE_PASSWORD_WL_SUCCESS,
    payload: obj
  };
};

export const forgotPassword = obj => {
  return {
    type: FORGOT_PASSWORD,
    payload: obj
  };
};

export const forgotPasswordSuccess = obj => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: obj
  };
};

export const resetAuthSuccessIndicators = () => {
  return {
    type: RESET_AUTH_SUCCESS_INDICATORS
  };
};