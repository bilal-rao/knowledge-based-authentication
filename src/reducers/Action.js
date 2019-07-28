import {
    FETCH_ACTION,
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    actionsData: "",
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ACTION: {
        return {
          ...state,
          actionsData: action.payload
        };
      }
      default:
        return state;
    }
  };
  