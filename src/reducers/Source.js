import {
    FETCH_ALL_SOURCES_SUCCESS,
    SHOW_SOURCE_MESSAGE,
    HIDE_SOURCE_MESSAGE,
    ON_SHOW_SOURCE_LOADER,
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    allSources: null,
    alertMessage: "",
    showMessage: false,
    sourceListSuccess: false
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_SOURCES_SUCCESS: {
        return {
          ...state,
          loader: false,
          sourceListSuccess: true,
          allSources: action.payload,
          showMessage: false,
          alertMessage: "",
        };
      }
     
      case SHOW_SOURCE_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false,
        };
      }
      case HIDE_SOURCE_MESSAGE: {
        return {
            ...state,
            alertMessage: "",
            showMessage: false,
            loader: false,
        }
    }
     
      case ON_SHOW_SOURCE_LOADER: {
        return {
            ...state,
            loader: true,
        }
    }
      default:
        return state;
    }
  };
  