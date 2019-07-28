import {
    FETCH_ALL_DOCUMENT_OVERRIDES_SUCCESS,
    FETCH_DOCUMENT_OVERRIDES_WITH_PAGINATION_SUCCESS,
    SEARCH_DOCUMENT_OVERRIDES_SUCCESS,
    FETCH_INDIVIDUAL_DOCUMENT_OVERRIDE_SUCCESS,
    SHOW_DOCUMENT_OVERRIDE_MESSAGE,
    SHOW_DOCUMENT_OVERRIDES_PARENT_PAGE_MESSAGE,
    HIDE_DOCUMENT_OVERRIDE_MESSAGE,
    HIDE_DOCUMENT_OVERRIDE_MAIN_PAGE_MESSAGE,
    ON_SHOW_DOCUMENT_OVERRIDE_LOADER,
    ON_SHOW_DOCUMENT_OVERRIDE_MAIN_PAGE_LOADER,
    ADD_DOCUMENT_OVERRIDE_SUCCESS,
    DELETE_DOCUMENT_OVERRIDE_SUCCESS,
    ON_SHOW_DOCUMENT_OVERRIDE_DELETE_LOADER,
    SHOW_DELETE_DOCUMENT_OVERRIDE_MESSAGE,
    HIDE_DOCUMENT_OVERRIDE_DELETE_MESSAGE,
    EDIT_DOCUMENT_OVERRIDE_SUCCESS,
    REMOVE_INDIVIDUAL_DOCUMENT_OVERRIDE_DATA
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    mainLoader: false,
    DocumentOverridesList: "",
    allDocumentOverrides: null,
    addDocumentOverride: null,
    editDocumentOverride: null,
    individualDocumentOverrideData: null,
    alertMessage: "",
    showMessage: false,
    showMainPageMessage: false,
    alertMainPageMessage: "",
    DocumentOverrideListSuccess: false,
    deleteDocumentOverrideSuccess: false,
    editDocumentOverrideError: false,
    DocumentOverrideDetailSuccess: false,
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_DOCUMENT_OVERRIDES_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          deleteDocumentOverrideLoader: false,
          DocumentOverrideListSuccess: true,
          allDocumentOverrides: action.payload,
          rowsDelete: [],
          isSort: false,
          individualDocumentOverrideData: null,
          addDocumentOverride: null,
          showMessage: false,
          alertMessage: "",
          showMainPageMessage: false,
          alertMainPageMessage: "",
          editDocumentOverride: null,
          deleteDocumentOverrideSuccess: false
        };
      }
      case FETCH_DOCUMENT_OVERRIDES_WITH_PAGINATION_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          DocumentOverrideListSuccess: true,
          addDocumentOverride: null,
          DocumentOverridesList: action.payload,
          allDocumentOverrides: null,
          rowsDelete: [],
          isSort: false,
          deleteDocumentOverride: false,
          individualDocumentOverrideData: null,
          editDocumentOverride: null,
          deleteDocumentOverrideSuccess: false
        };
      }
  
      case SHOW_DOCUMENT_OVERRIDES_PARENT_PAGE_MESSAGE: {
        return {
          ...state,
          mainLoader: false,
          alertMainPageMessage: action.payload,
          showMainPageMessage: true,
          alertMessage: "",
          showMessage: false,
          deleteDocumentOverrideSuccess: false
        }
      }
      case SEARCH_DOCUMENT_OVERRIDES_SUCCESS: {
        return {
          ...state,
          loader: false,
          DocumentOverrideListSuccess: true,
          DocumentOverridesList: action.payload,
          rowsDelete: [],
          isSort: false,
          deleteDocumentOverrideLoader: false,
          deleteDocumentOverrideSuccess: false,
          individualDocumentOverrideData: null,
        };
      }
      case FETCH_INDIVIDUAL_DOCUMENT_OVERRIDE_SUCCESS: {
        return {
          ...state,
          individualDocumentOverrideData: action.payload,
          deleteDocumentOverrideSuccess: false,
          DocumentOverrideDetailSuccess: true,
          loader: false
        };
      }
      case ADD_DOCUMENT_OVERRIDE_SUCCESS: {
        return {
          ...state,
          individualDocumentOverrideData: null,
          loader: false,
          addDocumentOverride: action.payload,
          alertMessage: '',
          showMessage: false,
          deleteDocumentOverrideSuccess: false
        };
      }
      case SHOW_DOCUMENT_OVERRIDE_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false,
          deleteDocumentOverrideSuccess: false
        };
      }
      case HIDE_DOCUMENT_OVERRIDE_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteDocumentOverrideSuccess: false
        }
      }
      case HIDE_DOCUMENT_OVERRIDE_MAIN_PAGE_MESSAGE: {
        return {
          ...state,
          alertMainPageMessage: "",
          showMainPageMessage: false,
          mainLoader: false,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteDocumentOverrideSuccess: false
        }
      }
      case ON_SHOW_DOCUMENT_OVERRIDE_LOADER: {
        return {
          ...state,
          loader: true,
          deleteDocumentOverrideSuccess: false
        }
      }
      case ON_SHOW_DOCUMENT_OVERRIDE_MAIN_PAGE_LOADER: {
        return {
          ...state,
          mainLoader: true,
          deleteDocumentOverrideSuccess: false
        }
      }
  
      case DELETE_DOCUMENT_OVERRIDE_SUCCESS: {
        return {
          ...state,
          deleteDocumentOverrideSuccess: true,
          deleteDocumentOverrideLoader: false,
        };
      }
      case ON_SHOW_DOCUMENT_OVERRIDE_DELETE_LOADER: {
        return {
          ...state,
          deleteDocumentOverrideSuccess: false,
          deleteDocumentOverrideLoader: true,
          loader: false,
          mainLoader: false
        }
      }
      case SHOW_DELETE_DOCUMENT_OVERRIDE_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          deleteDocumentOverrideLoader: false,
          loader: false,
          mainLoader: false,
          deleteDocumentOverrideSuccess: false
        };
      }
      case HIDE_DOCUMENT_OVERRIDE_DELETE_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          deleteDocumentOverrideLoader: false,
          loader: false,
          mainLoader: false,
          deleteDocumentOverrideSuccess: false
        }
      }
      case EDIT_DOCUMENT_OVERRIDE_SUCCESS: {
        return {
          ...state,
          deleteDocumentOverrideLoader: false,
          deleteDocumentOverrideSuccess: false,
          editDocumentOverride: action.payload,
          loader: false
        };
      }
  
      case REMOVE_INDIVIDUAL_DOCUMENT_OVERRIDE_DATA: {
        return {
          ...state,
          individualDocumentOverrideData: null
        }
      }
      default:
        return state;
    }
  };
  