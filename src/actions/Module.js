import {
    FETCH_MODULE,
    ON_SHOW_MODULE_LOADER,
    FETCH_MODULE_SUCCESS,
    SHOW_MODULE_MESSAGE,
    HIDE_MODULE_MESSAGE,
  } from "../constants/ActionTypes";
  
  export const fetchModule = obj => {
    return {
      type: FETCH_MODULE,
      payload: obj
    };
  };
  
  export const showModuleLoader = () => {
    return {
        type: ON_SHOW_MODULE_LOADER,
    };
  };

  export const fetchModuleSuccess = menuItem => {
    return {
      type: FETCH_MODULE_SUCCESS,
      payload: menuItem
    };
  };
  
  export const showModuleMessage = message => {
    return {
      type: SHOW_MODULE_MESSAGE,
      payload: message
    };
  };

   export const hideModuleMessage = () => {
      return {
          type: HIDE_MODULE_MESSAGE,
      };
    };
  
  
 