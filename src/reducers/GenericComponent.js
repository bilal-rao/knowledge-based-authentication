import {
    NonAssyncLocation,
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    reload: false
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case NonAssyncLocation: {
        return {
          ...state,
          reload: true
        };
      }
      default:
        return state;
    }
  };
  