import {
    UsersProfileSection,
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    profilePage: "myProfile",
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case UsersProfileSection: {
        return {
          ...state,
          profilePage: action.payload
        };
      }
      default:
        return state;
    }
  };
  