import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_GITHUB_USER_SUCCESS,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNUP_USER_SUCCESS,
  ACTIVATE_INFO_SUCCESS,
  CHANGE_PASSWORD_WL_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  RESET_AUTH_SUCCESS_INDICATORS
} from "constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: "",
  showMessage: false,
  initURL: "",
  activationInfo: "",
  activationInfoSuccess: false,
  changePasswordWL: "",
  changePasswordWLSuccess: false,
  forgotPassword: "",
  forgotPasswordSuccess: false,
  authUser: localStorage.getItem("user_id")
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      };
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      };
    }
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload
      };
    }
    case ACTIVATE_INFO_SUCCESS: {
      return {
        ...state,
        activationInfoSuccess: true,
        loader: false,
        activationInfo: action.payload
      };
    }
    case CHANGE_PASSWORD_WL_SUCCESS: {
      return {
        ...state,
        changePasswordWLSuccess: true,
        loader: false,
        changePasswordWL: action.payload
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordSuccess: true,
        loader: false,
        forgotPassword: action.payload
      };
    }
    case SIGNOUT_USER: {
      localStorage.clear();
      return {
        ...state,
        authUser: null,
        initURL: "/app/dashboard/crypto",
        loader: false
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        loader: false
      };
    }
    case SIGNIN_GOOGLE_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      };
    }
    case SIGNIN_FACEBOOK_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      };
    }
    case SIGNIN_TWITTER_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      };
    }
    case SIGNIN_GITHUB_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      };
    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true
      };
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false
      };
    }
    case RESET_AUTH_SUCCESS_INDICATORS: {
      return {
        ...state,
        loader: false,
        authUser: null,
        forgotPasswordSuccess: false,
        changePasswordWLSuccess: false,
        activationInfoSuccess: false
      };
    }
    default:
      return state;
  }
};
