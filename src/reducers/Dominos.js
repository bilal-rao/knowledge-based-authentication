import {
    FETCH_ALL_DOMINOS_SUCCESS,
    SHOW_DOMINOS_MESSAGE,
    HIDE_DOMINOS_MESSAGE,
    ON_SHOW_DOMINOS_LOADER,
    ADD_DOMINOS_SIGNUP_SUCCESS,
    ADD_DOMINOS_LOGIN_SUCCESS,
    ADD_DOMINOS_SUCCESS,
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    dominosList: "",
    addDominos: null,
    editDominos: null,
    individualDominosData: null,
    loginDomino: null,
    addDominosLogInSuccess: false,
    alertMessage: "",
    showMessage: false,
    showMainPageMessage: false,
    alertMainPageMessage: "",
    dominosListSuccess: false,
    deleteDominosSuccess: false,
    editDominosSuccess: false,
    editDominosError: false,
    dominosDetailSuccess: false,
    addDominosSuccess: false,
    changePasswordSuccess: false,
    changePassword: ""
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_DOMINOS_SUCCESS: {
        return {
          ...state,
          loader: false,
          dominosListSuccess: true,
          dominosList: action.payload,
          rowsDelete: [],
          isSort: false,
          individualDominosData: null,
          addDominos: null,
          showMessage: false,
          alertMessage: "",
          showMainPageMessage: false,
          alertMainPageMessage: "",
          editDominos: null,
          deleteDominosSuccess: false,
          editDominosSuccess: false,
          addDominosSuccess: false,
          addDominosSignUpSuccess: false,
          addDimonosSignUp: null
        };
      }
    
      case ADD_DOMINOS_SUCCESS: {
        return {
          ...state,
          loader: false,
          addDominosSuccess: true,
          individualDominosData: null,
          addDominos: action.payload,
          alertMessage: "",
          showMessage: false,
          editDominosSuccess: false,
          deleteDominosSuccess: false
        };
      }
      case SHOW_DOMINOS_MESSAGE: {
        return {
          ...state,
          loader: false,
          alertMessage: action.payload,
          showMessage: true,
          deleteDominosSuccess: false
        };
      }
      case HIDE_DOMINOS_MESSAGE: {
        return {
          ...state,
          loader: false,
          alertMessage: "",
          showMessage: false,
          deleteDominosSuccess: false
        };
      }
     
      case ON_SHOW_DOMINOS_LOADER: {
        return {
          ...state,
          loader: true,
          deleteDominosSuccess: false
        };
      }
     

      case ADD_DOMINOS_SIGNUP_SUCCESS: {
        return {
          ...state,
          loader: false,
          addDominosSignUpSuccess: true,
          individualDominosData: null,
          addDimonosSignUp: action.payload,
          alertMessage: "",
          showMessage: false,
          editDominosSuccess: false,
          deleteDominosSuccess: false
        };
      }

      case ADD_DOMINOS_LOGIN_SUCCESS: {
        return {
          ...state,
          loader: false,
          addDominosLogInSuccess: true,
          individualDominosData: null,
          loginDomino: action.payload,
          alertMessage: "",
          showMessage: false,
          editDominosSuccess: false,
          deleteDominosSuccess: false
        };
      }
      default:
        return state;
    }
  };
  