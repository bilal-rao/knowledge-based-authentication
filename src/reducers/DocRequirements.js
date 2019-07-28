import {
    FETCH_ALL_DOCUMENTREQUIREMENTS_SUCCESS,
    FETCH_DOCUMENTREQUIREMENTS_WITH_PAGINATION_SUCCESS,
    SEARCH_DOCUMENTREQUIREMENTS_SUCCESS,
    FETCH_INDIVIDUAL_DOCUMENTREQUIREMENT_SUCCESS,
    SHOW_DOCUMENTREQUIREMENT_MESSAGE,
    SHOW_DOCUMENTREQUIREMENTS_PARENT_PAGE_MESSAGE,
    HIDE_DOCUMENTREQUIREMENT_MESSAGE,
    HIDE_DOCUMENTREQUIREMENT_MAIN_PAGE_MESSAGE,
    ON_SHOW_DOCUMENTREQUIREMENT_LOADER,
    ON_SHOW_DOCUMENTREQUIREMENT_MAIN_PAGE_LOADER,
    ADD_DOCUMENTREQUIREMENT_SUCCESS,
    DELETE_DOCUMENTREQUIREMENT_SUCCESS,
    ON_SHOW_DOCUMENTREQUIREMENT_DELETE_LOADER,
    SHOW_DELETE_DOCUMENTREQUIREMENT_MESSAGE,
    HIDE_DOCUMENTREQUIREMENT_DELETE_MESSAGE,
    EDIT_DOCUMENTREQUIREMENT_SUCCESS,
    REMOVE_INDIVIDUAL_DOCUMENTREQUIREMENT_DATA
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    mainLoader: false,
    DocumentRequirementsList: "",
    allDocumentRequirements: null,
    addDocumentRequirement: null,
    editDocumentRequirement: null,
    individualDocumentRequirementData: null,
    alertMessage: "",
    showMessage: false,
    showMainPageMessage: false,
    alertMainPageMessage: "",
    DocumentRequirementListSuccess: false,
    deleteDocumentRequirementSuccess: false,
    editDocumentRequirementError: false,
    DocumentRequirementDetailSuccess: false,
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_DOCUMENTREQUIREMENTS_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          deleteDocumentRequirementLoader: false,
          DocumentRequirementListSuccess: true,
          allDocumentRequirements: action.payload,
          rowsDelete: [],
          isSort: false,
          individualDocumentRequirementData: null,
          addDocumentRequirement: null,
          showMessage: false,
          alertMessage: "",
          showMainPageMessage: false,
          alertMainPageMessage: "",
          editDocumentRequirement: null,
          deleteDocumentRequirementSuccess: false
        };
      }
      case FETCH_DOCUMENTREQUIREMENTS_WITH_PAGINATION_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          DocumentRequirementListSuccess: true,
          addDocumentRequirement: null,
          DocumentRequirementsList: action.payload,
          allDocumentRequirements: null,
          rowsDelete: [],
          isSort: false,
          deleteDocumentRequirement: false,
          individualDocumentRequirementData: null,
          editDocumentRequirement: null,
          deleteDocumentRequirementSuccess: false
        };
      }
  
      case SHOW_DOCUMENTREQUIREMENTS_PARENT_PAGE_MESSAGE: {
        return {
          ...state,
          mainLoader: false,
          alertMainPageMessage: action.payload,
          showMainPageMessage: true,
          alertMessage: "",
          showMessage: false,
          deleteDocumentRequirementSuccess: false
        }
      }
      case SEARCH_DOCUMENTREQUIREMENTS_SUCCESS: {
        return {
          ...state,
          loader: false,
          DocumentRequirementListSuccess: true,
          DocumentRequirementsList: action.payload,
          rowsDelete: [],
          isSort: false,
          deleteDocumentRequirementLoader: false,
          deleteDocumentRequirementSuccess: false,
          individualDocumentRequirementData: null,
        };
      }
      case FETCH_INDIVIDUAL_DOCUMENTREQUIREMENT_SUCCESS: {
        return {
          ...state,
          individualDocumentRequirementData: action.payload,
          deleteDocumentRequirementSuccess: false,
          DocumentRequirementDetailSuccess: true,
          loader: false
        };
      }
      case ADD_DOCUMENTREQUIREMENT_SUCCESS: {
        return {
          ...state,
          individualDocumentRequirementData: null,
          loader: false,
          addDocumentRequirement: action.payload,
          alertMessage: '',
          showMessage: false,
          deleteDocumentRequirementSuccess: false
        };
      }
      case SHOW_DOCUMENTREQUIREMENT_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false,
          deleteDocumentRequirementSuccess: false
        };
      }
      case HIDE_DOCUMENTREQUIREMENT_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteDocumentRequirementSuccess: false
        }
      }
      case HIDE_DOCUMENTREQUIREMENT_MAIN_PAGE_MESSAGE: {
        return {
          ...state,
          alertMainPageMessage: "",
          showMainPageMessage: false,
          mainLoader: false,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteDocumentRequirementSuccess: false
        }
      }
      case ON_SHOW_DOCUMENTREQUIREMENT_LOADER: {
        return {
          ...state,
          loader: true,
          deleteDocumentRequirementSuccess: false
        }
      }
      case ON_SHOW_DOCUMENTREQUIREMENT_MAIN_PAGE_LOADER: {
        return {
          ...state,
          mainLoader: true,
          deleteDocumentRequirementSuccess: false
        }
      }
  
      case DELETE_DOCUMENTREQUIREMENT_SUCCESS: {
        return {
          ...state,
          deleteDocumentRequirementSuccess: true,
          deleteDocumentRequirementLoader: false,
        };
      }
      case ON_SHOW_DOCUMENTREQUIREMENT_DELETE_LOADER: {
        return {
          ...state,
          deleteDocumentRequirementSuccess: false,
          deleteDocumentRequirementLoader: true,
          loader: false,
          mainLoader: false
        }
      }
      case SHOW_DELETE_DOCUMENTREQUIREMENT_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          deleteDocumentRequirementLoader: false,
          loader: false,
          mainLoader: false,
          deleteDocumentRequirementSuccess: false
        };
      }
      case HIDE_DOCUMENTREQUIREMENT_DELETE_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          deleteDocumentRequirementLoader: false,
          loader: false,
          mainLoader: false,
          deleteDocumentRequirementSuccess: false
        }
      }
      case EDIT_DOCUMENTREQUIREMENT_SUCCESS: {
        return {
          ...state,
          deleteDocumentRequirementLoader: false,
          deleteDocumentRequirementSuccess: false,
          editDocumentRequirement: action.payload,
          loader: false
        };
      }
  
      case REMOVE_INDIVIDUAL_DOCUMENTREQUIREMENT_DATA: {
        return {
          ...state,
          individualDocumentRequirementData: null
        }
      }
      default:
        return state;
    }
  };
  