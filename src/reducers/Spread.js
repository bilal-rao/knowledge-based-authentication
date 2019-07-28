import {
    FETCH_ALL_SPREADS_SUCCESS,
    FETCH_SPREADS_WITH_PAGINATION_SUCCESS,
    SEARCH_SPREADS_SUCCESS,
    FETCH_INDIVIDUAL_SPREAD_SUCCESS,
    SHOW_SPREAD_MESSAGE,
    SHOW_SPREADS_PARENT_PAGE_MESSAGE,
    HIDE_SPREAD_MESSAGE,
    HIDE_SPREAD_MAIN_PAGE_MESSAGE,
    ON_SHOW_SPREAD_LOADER,
    ON_SHOW_SPREAD_MAIN_PAGE_LOADER,
    ADD_SPREAD_SUCCESS,
    DELETE_SPREAD_SUCCESS,
    ON_SHOW_SPREAD_DELETE_LOADER,
    SHOW_DELETE_SPREAD_MESSAGE,
    HIDE_SPREAD_DELETE_MESSAGE,
    EDIT_SPREAD_SUCCESS,
    REMOVE_INDIVIDUAL_SPREAD_DATA
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    mainLoader: false,
    SpreadsList: "",
    allSpreads: null,
    addSpread: null,
    editSpread: null,
    individualSpreadData: null,
    alertMessage: "",
    showMessage: false,
    showMainPageMessage: false,
    alertMainPageMessage: "",
    SpreadListSuccess: false,
    deleteSpreadSuccess: false,
    editSpreadError: false,
    SpreadDetailSuccess: false,
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_SPREADS_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          deleteSpreadLoader: false,
          SpreadListSuccess: true,
          allSpreads: action.payload,
          rowsDelete: [],
          isSort: false,
          individualSpreadData: null,
          addSpread: null,
          showMessage: false,
          alertMessage: "",
          showMainPageMessage: false,
          alertMainPageMessage: "",
          editSpread: null,
          deleteSpreadSuccess: false
        };
      }
      case FETCH_SPREADS_WITH_PAGINATION_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          SpreadListSuccess: true,
          addSpread: null,
          SpreadsList: action.payload,
          allSpreads: null,
          rowsDelete: [],
          isSort: false,
          deleteSpread: false,
          individualSpreadData: null,
          editSpread: null,
          deleteSpreadSuccess: false
        };
      }
  
      case SHOW_SPREADS_PARENT_PAGE_MESSAGE: {
        return {
          ...state,
          mainLoader: false,
          alertMainPageMessage: action.payload,
          showMainPageMessage: true,
          alertMessage: "",
          showMessage: false,
          deleteSpreadSuccess: false
        }
      }
      case SEARCH_SPREADS_SUCCESS: {
        return {
          ...state,
          loader: false,
          SpreadListSuccess: true,
          SpreadsList: action.payload,
          rowsDelete: [],
          isSort: false,
          deleteSpreadLoader: false,
          deleteSpreadSuccess: false,
          individualSpreadData: null,
        };
      }
      case FETCH_INDIVIDUAL_SPREAD_SUCCESS: {
        return {
          ...state,
          individualSpreadData: action.payload,
          deleteSpreadSuccess: false,
          SpreadDetailSuccess: true,
          loader: false
        };
      }
      case ADD_SPREAD_SUCCESS: {
        return {
          ...state,
          individualSpreadData: null,
          loader: false,
          addSpread: action.payload,
          alertMessage: '',
          showMessage: false,
          deleteSpreadSuccess: false
        };
      }
      case SHOW_SPREAD_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false,
          deleteSpreadSuccess: false
        };
      }
      case HIDE_SPREAD_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteSpreadSuccess: false
        }
      }
      case HIDE_SPREAD_MAIN_PAGE_MESSAGE: {
        return {
          ...state,
          alertMainPageMessage: "",
          showMainPageMessage: false,
          mainLoader: false,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteSpreadSuccess: false
        }
      }
      case ON_SHOW_SPREAD_LOADER: {
        return {
          ...state,
          loader: true,
          deleteSpreadSuccess: false
        }
      }
      case ON_SHOW_SPREAD_MAIN_PAGE_LOADER: {
        return {
          ...state,
          mainLoader: true,
          deleteSpreadSuccess: false
        }
      }
  
      case DELETE_SPREAD_SUCCESS: {
        return {
          ...state,
          deleteSpreadSuccess: true,
          deleteSpreadLoader: false,
        };
      }
      case ON_SHOW_SPREAD_DELETE_LOADER: {
        return {
          ...state,
          deleteSpreadSuccess: false,
          deleteSpreadLoader: true,
          loader: false,
          mainLoader: false
        }
      }
      case SHOW_DELETE_SPREAD_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          deleteSpreadLoader: false,
          loader: false,
          mainLoader: false,
          deleteSpreadSuccess: false
        };
      }
      case HIDE_SPREAD_DELETE_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          deleteSpreadLoader: false,
          loader: false,
          mainLoader: false,
          deleteSpreadSuccess: false
        }
      }
      case EDIT_SPREAD_SUCCESS: {
        return {
          ...state,
          deleteSpreadLoader: false,
          deleteSpreadSuccess: false,
          editSpread: action.payload,
          loader: false
        };
      }
  
      case REMOVE_INDIVIDUAL_SPREAD_DATA: {
        return {
          ...state,
          individualSpreadData: null
        }
      }
      default:
        return state;
    }
  };
  