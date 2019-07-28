import {
    UsersProfileSection,
  } from "../constants/ActionTypes";
  
  
  
  export const userProfile = obj => {
    return {
      type: UsersProfileSection,
      payload: obj
    };
  };
  
  