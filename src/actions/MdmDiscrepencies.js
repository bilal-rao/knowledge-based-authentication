import {
    FETCH_ALL_MDM_DISCREPENCIES,
    FETCH_ALL_MDM_DISCREPENCIES_SUCCESS,
    ON_SHOW_MDM_DISCREPENCY_LOADER,
    SHOW_MDM_DISCREPENCY_MESSAGE,
    HIDE_MDM_DISCREPENCY_MESSAGE,

  } from "../constants/ActionTypes";
  

  export const fetchAllMdmDiscrepencies = () => {
    return {
      type: FETCH_ALL_MDM_DISCREPENCIES,
    };
  };
  
  export const fetchAllMdmDiscrepenciesSuccess = discrepencies => {
    return {
      type: FETCH_ALL_MDM_DISCREPENCIES_SUCCESS,
      payload: discrepencies
    };
  };
  export const showMdmDiscrepencyLoader = () => {
    return {
      type: ON_SHOW_MDM_DISCREPENCY_LOADER,
    };
  };

  export const showMdmDiscrepencyMessage = message => {
    return {
      type: SHOW_MDM_DISCREPENCY_MESSAGE,
      payload: message
    };
  };

  export const hideMdmDiscrepencyMessage = () => {
    return {
      type: HIDE_MDM_DISCREPENCY_MESSAGE,
    };
  };
  
 