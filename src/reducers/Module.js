import {
  FETCH_MODULE_SUCCESS,
  SHOW_MODULE_MESSAGE,
  HIDE_MODULE_MESSAGE,
  ON_SHOW_MODULE_LOADER
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  moduleData: "",
  alertMessage: "",
  showMessage: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_MODULE_SUCCESS: {
      return {
        ...state,
        loader: false,
        alertMessage: "",
        showMessage: false,
        moduleData: action.payload
      };
    }
    case SHOW_MODULE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }
    case HIDE_MODULE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: "",
        showMessage: false
      };
    }
    case ON_SHOW_MODULE_LOADER: {
      return {
        ...state,
        loader: true
      };
    }

    default:
      return state;
  }
};
