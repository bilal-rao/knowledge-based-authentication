import {
    NonAssyncLocation
  } from "../constants/ActionTypes";
  
  
  
  export const nonAssyncForReloadLocationApi = obj => {   
    return {
      type: NonAssyncLocation,
      payload: obj
    };
  };
  