import {
    FETCH_ALL_DISCREPANCY_SUCCESS,
    FETCH_DISCREPANCY_WITH_PAGINATION_SUCCESS,
    SEARCH_DISCREPANCIES_SUCCESS,
    FETCH_INDIVIDUAL_DISCREPANCY_SUCCESS,
    SHOW_DISCREPANCY_MESSAGE,
    SHOW_DISCREPANCIES_PARENT_PAGE_MESSAGE,
    HIDE_DISCREPANCY_MESSAGE,
    HIDE_DISCREPANCY_MAIN_PAGE_MESSAGE,
    ON_SHOW_DISCREPANCY_LOADER,
    ON_SHOW_DISCREPANCY_MAIN_PAGE_LOADER,
    ADD_DISCREPANCY_SUCCESS,
    DELETE_DISCREPANCY_SUCCESS,
    ON_SHOW_DISCREPANCY_DELETE_LOADER,
    SHOW_DELETE_DISCREPANCY_MESSAGE,
    HIDE_DISCREPANCY_DELETE_MESSAGE,
    EDIT_DISCREPANCY_SUCCESS,
    EDIT_DRAFT_DISCREPANCY,
    EDIT_DRAFT_DISCREPANCY_SUCCESS,
    EDIT_DRAFT_DISCREPANCY_PENDING,
    EDIT_DRAFT_DISCREPANCY_ERROR,
    REMOVE_INDIVIDUAL_DISCREPANCY_DATA
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    mainLoader: false,
    discrepanciesList: "",
    allDiscrepancies: null,
    addDiscrepancy: null,
    editDiscrepancy: null,
    individualDiscrepancyData: null,
    alertMessage: "",
    showMessage: false,
    showMainPageMessage: false,
    alertMainPageMessage: "",
    discrepancyListSuccess: false,
    addDiscrepancySuccess: false,
    deleteDiscrepancySuccess: false,
    editDiscrepancySuccess: false,
    editDiscrepancyError: false,
    discrepancyDetailSuccess: false,
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_DISCREPANCY_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          deleteDiscrepancyLoader: false,
          discrepancyListSuccess: true,
          allDiscrepancies: action.payload,
          rowsDelete: [],
          isSort: false,
          individualDiscrepancyData: null,
          addDiscrepancy: null,
          showMessage: false,
          alertMessage: "",
          showMainPageMessage: false,
          alertMainPageMessage: "",
          editDiscrepancy: null,
          deleteDiscrepancySuccess: false
        };
      }
      case FETCH_DISCREPANCY_WITH_PAGINATION_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          discrepancyListSuccess: true,
          addDiscrepancy: null,
          discrepanciesList: action.payload,
          allDiscrepancies: null,
          rowsDelete: [],
          isSort: false,
          deleteDiscrepancy: false,
          individualDiscrepancyData: null,
          editDiscrepancy: null,
          deleteDiscrepancySuccess: false
        };
      }
      case SHOW_DISCREPANCIES_PARENT_PAGE_MESSAGE: {
        return {
          ...state,
          mainLoader: false,
          alertMainPageMessage: action.payload,
          showMainPageMessage: true,
          alertMessage: "",
          showMessage: false,
          deleteDiscrepancySuccess: false
        }
      }
      case SEARCH_DISCREPANCIES_SUCCESS: {
        return {
          ...state,
          loader: false,
          discrepancyListSuccess: true,
          discrepanciesList: action.payload,
          rowsDelete: [],
          isSort: false,
          deleteDiscrepancyLoader: false,
          deleteDiscrepancySuccess: false,
          individualDiscrepancyData: null,
        };
      }
      case FETCH_INDIVIDUAL_DISCREPANCY_SUCCESS: {
        return {
          ...state,
          individualDiscrepancyData: action.payload,
          deleteDiscrepancySuccess: false,
          discrepancyDetailSuccess: true,
          loader: false
        };
      }
      case ADD_DISCREPANCY_SUCCESS: {
        return {
          ...state,
          individualDiscrepancyData: null,
          loader: false,
          addDiscrepancy: action.payload,
          alertMessage: '',
          showMessage: true,
          addDiscrepancySuccess: true,
          deleteDiscrepancySuccess: false,
          editDiscrepancySuccess: false,
        };
      }
      case SHOW_DISCREPANCY_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false,
          deleteDiscrepancySuccess: false
        };
      }
      case HIDE_DISCREPANCY_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          loader: false,
          addDiscrepancySuccess: false,
          deleteDiscrepancySuccess: false,
          editDiscrepancySuccess: false,
        }
      }
      case HIDE_DISCREPANCY_MAIN_PAGE_MESSAGE: {
        return {
          ...state,
          alertMainPageMessage: "",
          showMainPageMessage: false,
          mainLoader: false,
          alertMessage: "",
          showMessage: false,
          loader: false,
          addDiscrepancySuccess: false,
          deleteDiscrepancySuccess: false,
          editDiscrepancySuccess: false,
        }
      }
      case ON_SHOW_DISCREPANCY_LOADER: {
        return {
          ...state,
          loader: true,
          deleteDiscrepancySuccess: false
        }
      }
      case ON_SHOW_DISCREPANCY_MAIN_PAGE_LOADER: {
        return {
          ...state,
          mainLoader: true,
          deleteDiscrepancySuccess: false
        }
      }
      case DELETE_DISCREPANCY_SUCCESS: {
        return {
          ...state,
          deleteDiscrepancySuccess: true,
          deleteDiscrepancyLoader: false,
          addDiscrepancySuccess: false,
          deleteDiscrepancySuccess: false,
          editDiscrepancySuccess: false,
        };
      }
      case ON_SHOW_DISCREPANCY_DELETE_LOADER: {
        return {
          ...state,
          deleteDiscrepancySuccess: false,
          deleteDiscrepancyLoader: true,
          loader: true,
          mainLoader: false
        }
      }
      case SHOW_DELETE_DISCREPANCY_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          deleteDiscrepancyLoader: false,
          loader: false,
          mainLoader: false,
          deleteDiscrepancySuccess: false
        };
      }
      case HIDE_DISCREPANCY_DELETE_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          deleteDiscrepancyLoader: false,
          loader: false,
          mainLoader: false,
          deleteDiscrepancySuccess: false
        }
      }
      case EDIT_DISCREPANCY_SUCCESS: {
        return {
          ...state,
          deleteDiscrepancyLoader: false,
          addDiscrepancySuccess: false,
          deleteDiscrepancySuccess: false,
          editDiscrepancySuccess: true,
          showMessage: true,
          editDiscrepancy: action.payload,
          loader: false
        };
      }
      case EDIT_DRAFT_DISCREPANCY_SUCCESS: {
        return {
          ...state,
          deleteDiscrepancyLoader: false,
          addDiscrepancySuccess: false,
          deleteDiscrepancySuccess: false,
          editDiscrepancy: true,
          showMessage: true,
          editDiscrepancy: action.payload,
          loader: false
        };
      }
      case REMOVE_INDIVIDUAL_DISCREPANCY_DATA: {
        return {
          ...state,
          individualDiscrepancyData: null
        }
      }
      default:
        return state;
    }
  };
  