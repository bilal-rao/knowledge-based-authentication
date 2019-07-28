import {
    FETCH_ALL_PROCESSING_FEES_SUCCESS,
    FETCH_PROCESSING_FEES_WITH_PAGINATION_SUCCESS,
    SEARCH_PROCESSING_FEES_SUCCESS,
    FETCH_INDIVIDUAL_PROCESSING_FEE_SUCCESS,
    SHOW_PROCESSING_FEE_MESSAGE,
    SHOW_PROCESSING_FEES_PARENT_PAGE_MESSAGE,
    HIDE_PROCESSING_FEE_MESSAGE,
    HIDE_PROCESSING_FEE_MAIN_PAGE_MESSAGE,
    ON_SHOW_PROCESSING_FEE_LOADER,
    ON_SHOW_PROCESSING_FEE_MAIN_PAGE_LOADER,
    ADD_PROCESSING_FEE_SUCCESS,
    DELETE_PROCESSING_FEE_SUCCESS,
    ON_SHOW_PROCESSING_FEE_DELETE_LOADER,
    SHOW_DELETE_PROCESSING_FEE_MESSAGE,
    HIDE_PROCESSING_FEE_DELETE_MESSAGE,
    EDIT_PROCESSING_FEE_SUCCESS,
    REMOVE_INDIVIDUAL_PROCESSING_FEE_DATA
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    mainLoader: false,
    processingFeesList: "",
    allProcessingFees: null,
    addProcessingFee: null,
    editProcessingFee: null,
    individualProcessingFeeData: null,
    alertMessage: "",
    showMessage: false,
    showMainPageMessage: false,
    alertMainPageMessage: "",
    ProcessingFeeListSuccess: false,
    deleteProcessingFeeSuccess: false,
    editProcessingFeeError: false,
    ProcessingFeeDetailSuccess: false,
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_PROCESSING_FEES_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          deleteProcessingFeeLoader: false,
          ProcessingFeeListSuccess: true,
          allProcessingFees: action.payload,
          rowsDelete: [],
          isSort: false,
          individualProcessingFeeData: null,
          addProcessingFee: null,
          showMessage: false,
          alertMessage: "",
          showMainPageMessage: false,
          alertMainPageMessage: "",
          editProcessingFee: null,
          deleteProcessingFeeSuccess: false
        };
      }
      case FETCH_PROCESSING_FEES_WITH_PAGINATION_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          ProcessingFeeListSuccess: true,
          addProcessingFee: null,
          processingFeesList: action.payload,
          allProcessingFees: null,
          rowsDelete: [],
          isSort: false,
          deleteProcessingFee: false,
          individualProcessingFeeData: null,
          editProcessingFee: null,
          deleteProcessingFeeSuccess: false
        };
      }
  
      case SHOW_PROCESSING_FEES_PARENT_PAGE_MESSAGE: {
        return {
          ...state,
          mainLoader: false,
          alertMainPageMessage: action.payload,
          showMainPageMessage: true,
          alertMessage: "",
          showMessage: false,
          deleteProcessingFeeSuccess: false
        }
      }
      case SEARCH_PROCESSING_FEES_SUCCESS: {
        return {
          ...state,
          loader: false,
          ProcessingFeeListSuccess: true,
          processingFeesList: action.payload,
          rowsDelete: [],
          isSort: false,
          deleteProcessingFeeLoader: false,
          deleteProcessingFeeSuccess: false,
          individualProcessingFeeData: null,
        };
      }
      case FETCH_INDIVIDUAL_PROCESSING_FEE_SUCCESS: {
        return {
          ...state,
          individualProcessingFeeData: action.payload,
          deleteProcessingFeeSuccess: false,
          ProcessingFeeDetailSuccess: true,
          loader: false
        };
      }
      case ADD_PROCESSING_FEE_SUCCESS: {
        return {
          ...state,
          individualProcessingFeeData: null,
          loader: false,
          addProcessingFee: action.payload,
          alertMessage: '',
          showMessage: false,
          deleteProcessingFeeSuccess: false
        };
      }
      case SHOW_PROCESSING_FEE_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false,
          deleteProcessingFeeSuccess: false
        };
      }
      case HIDE_PROCESSING_FEE_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteProcessingFeeSuccess: false
        }
      }
      case HIDE_PROCESSING_FEE_MAIN_PAGE_MESSAGE: {
        return {
          ...state,
          alertMainPageMessage: "",
          showMainPageMessage: false,
          mainLoader: false,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteProcessingFeeSuccess: false
        }
      }
      case ON_SHOW_PROCESSING_FEE_LOADER: {
        return {
          ...state,
          loader: true,
          deleteProcessingFeeSuccess: false
        }
      }
      case ON_SHOW_PROCESSING_FEE_MAIN_PAGE_LOADER: {
        return {
          ...state,
          mainLoader: true,
          deleteProcessingFeeSuccess: false
        }
      }
  
      case DELETE_PROCESSING_FEE_SUCCESS: {
        return {
          ...state,
          deleteProcessingFeeSuccess: true,
          deleteProcessingFeeLoader: false,
        };
      }
      case ON_SHOW_PROCESSING_FEE_DELETE_LOADER: {
        return {
          ...state,
          deleteProcessingFeeSuccess: false,
          deleteProcessingFeeLoader: true,
          loader: false,
          mainLoader: false
        }
      }
      case SHOW_DELETE_PROCESSING_FEE_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          deleteProcessingFeeLoader: false,
          loader: false,
          mainLoader: false,
          deleteProcessingFeeSuccess: false
        };
      }
      case HIDE_PROCESSING_FEE_DELETE_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          deleteProcessingFeeLoader: false,
          loader: false,
          mainLoader: false,
          deleteProcessingFeeSuccess: false
        }
      }
      case EDIT_PROCESSING_FEE_SUCCESS: {
        return {
          ...state,
          deleteProcessingFeeLoader: false,
          deleteProcessingFeeSuccess: false,
          editProcessingFee: action.payload,
          loader: false
        };
      }
  
      case REMOVE_INDIVIDUAL_PROCESSING_FEE_DATA: {
        return {
          ...state,
          individualProcessingFeeData: null
        }
      }
      default:
        return state;
    }
  };
  