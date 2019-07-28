import {
    FETCH_ALL_SOURCES,
    FETCH_ALL_SOURCES_SUCCESS,
    ON_SHOW_SOURCE_LOADER,
    SHOW_SOURCE_MESSAGE,
    HIDE_SOURCE_MESSAGE,

  } from "../constants/ActionTypes";
  

  export const fetchAllSources = () => {
    return {
      type: FETCH_ALL_SOURCES,
    };
  };
  
  export const fetchAllSourcesSuccess = sources => {
    return {
      type: FETCH_ALL_SOURCES_SUCCESS,
      payload: sources
    };
  };
  export const showSourceLoader = () => {
    return {
      type: ON_SHOW_SOURCE_LOADER,
    };
  };

  export const showSourceMessage = message => {
    return {
      type: SHOW_SOURCE_MESSAGE,
      payload: message
    };
  };

  export const hideSourceMessage = () => {
    return {
      type: HIDE_SOURCE_MESSAGE,
    };
  };
  
 