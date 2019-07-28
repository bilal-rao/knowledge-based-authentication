import {
    FETCH_ACTION,
  } from "../constants/ActionTypes";
  
  export const fetchAction = obj => {
    return {
      type: FETCH_ACTION,
      payload: obj
    };
  };
 