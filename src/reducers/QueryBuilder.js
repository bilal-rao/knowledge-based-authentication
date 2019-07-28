import {
    FETCH_ALL_FIELDS_SUCCESS,
    SHOW_BUILDER_MESSAGE,
    HIDE_BUILDER_MESSAGE,
    ON_SHOW_BUILDER_LOADER,
    FETCH_ALL_FIELD_SET_SUCCESS,
    FETCH_INDIVIDUAL_FIELD_SET_SUCCESS,
    SCORE_CARD_FIELD
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    alertMessage: false,
    showMessage: false,
    fieldList: '',
    fieldSetList: '',
    fieldSetDetailSuccess: false,
    individualFieldSetData: "",
    scoreFields: []
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_FIELDS_SUCCESS: {
        return {
          ...state,
          loader: false,
          fieldList: action.payload
        };
      }

      case FETCH_ALL_FIELD_SET_SUCCESS: {
        return {
          ...state,
          loader: false,
          fieldSetList: action.payload
        };
      }

      case FETCH_INDIVIDUAL_FIELD_SET_SUCCESS: {
        return {
          ...state,
          individualFieldSetData: action.payload,
          fieldSetDetailSuccess: true,
          loader: false
        };
      }

      case SHOW_BUILDER_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false,
        };
      }
      case HIDE_BUILDER_MESSAGE: {
        return {
            ...state,
            alertMessage: "",
            showMessage: false,
            loader: false,
        }
    }
      case ON_SHOW_BUILDER_LOADER: {
        return {
            ...state,
            loader: true,
        }
    }

    case SCORE_CARD_FIELD: {
      return {
        ...state,
        scoreFields: action.payload
      }
    }
      default:
        return state;
    }
  };
  