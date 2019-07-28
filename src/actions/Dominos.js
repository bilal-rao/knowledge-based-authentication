import {
    FETCH_ALL_DOMINOS,
    FETCH_ALL_DOMINOS_SUCCESS,
    SHOW_DOMINOS_MESSAGE,
    ADD_DOMINOS_SIGNUP,
    ADD_DOMINOS_SIGNUP_SUCCESS,
    ADD_DOMINOS_LOGIN,
    ADD_DOMINOS_LOGIN_SUCCESS,
    HIDE_DOMINOS_MESSAGE,
    ADD_DOMINOS,
    ADD_DOMINOS_SUCCESS,
    ON_SHOW_DOMINOS_LOADER,
  } from "../constants/ActionTypes";
  
  export const fetchAllDominos = () => {
    return {
      type: FETCH_ALL_DOMINOS,
    };
  };
  
  export const fetchAllDominosSuccess = domino => {
    return {
      type: FETCH_ALL_DOMINOS_SUCCESS,
      payload: domino
    };
  };
  
 
  export const addDominos = obj => {
    return {
      type: ADD_DOMINOS,
      payload: obj
    };
  };
  export const addDominosSuccess = obj => {
    return {
      type: ADD_DOMINOS_SUCCESS,
      payload: obj
    };
  };
  
  
  
  export const showDominosLoader = () => {
    return {
      type: ON_SHOW_DOMINOS_LOADER,
    };
  };
  
  
  
  export const hideDominosMessage = () => {
    return {
      type: HIDE_DOMINOS_MESSAGE,
    };
  };
  

  export const showDominosMessage = message => {
    return {
      type: SHOW_DOMINOS_MESSAGE,
      payload: message
    };
  };
  


  export const addDominosSignUp = obj => {
    return {
      type: ADD_DOMINOS_SIGNUP,
      payload: obj
    };
  };
  export const addDominosSignUpSuccess = obj => {
    return {
      type: ADD_DOMINOS_SIGNUP_SUCCESS,
      payload: obj
    };
  };

  export const addDominosLogIn = obj => {
    return {
      type: ADD_DOMINOS_LOGIN,
      payload: obj
    };
  };
  export const addDominosLogInSuccess = obj => {
    return {
      type: ADD_DOMINOS_LOGIN_SUCCESS,
      payload: obj
    };
  };