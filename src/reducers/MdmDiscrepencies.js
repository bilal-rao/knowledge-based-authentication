import {
    FETCH_ALL_MDM_DISCREPENCIES_SUCCESS,
    SHOW_MDM_DISCREPENCY_MESSAGE,
    HIDE_MDM_DISCREPENCY_MESSAGE,
    ON_SHOW_MDM_DISCREPENCY_LOADER,
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    allMdmDiscrepencies: null,
    alertMessage: "",
    showMessage: false,
    mdmDiscrepencyListSuccess: false
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_MDM_DISCREPENCIES_SUCCESS: {
        return {
          ...state,
          loader: false,
          mdmDiscrepencyListSuccess: true,
          allMdmDiscrepencies: action.payload,
          showMessage: false,
          alertMessage: "",
        };
      }
     
      case SHOW_MDM_DISCREPENCY_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false,
        };
      }
      case HIDE_MDM_DISCREPENCY_MESSAGE: {
        return {
            ...state,
            alertMessage: "",
            showMessage: false,
            loader: false,
        }
    }
     
      case ON_SHOW_MDM_DISCREPENCY_LOADER: {
        return {
            ...state,
            loader: true,
        }
    }
      default:
        return state;
    }
  };
  