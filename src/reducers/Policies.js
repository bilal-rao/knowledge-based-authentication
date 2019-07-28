import {
    FETCH_ALL_POLICIES_SUCCESS,
    FETCH_POLICIES_WITH_PAGINATION_SUCCESS,
    SEARCH_POLICIES_SUCCESS,
    FETCH_INDIVIDUAL_POLICY_SUCCESS,
    SHOW_POLICY_MESSAGE,
    SHOW_POLICIES_PARENT_PAGE_MESSAGE,
    HIDE_POLICY_MESSAGE,
    HIDE_POLICY_MAIN_PAGE_MESSAGE,
    ON_SHOW_POLICY_LOADER,
    ON_SHOW_POLICY_MAIN_PAGE_LOADER,
    ADD_POLICY_SUCCESS,
    DELETE_POLICY_SUCCESS,
    ON_SHOW_POLICY_DELETE_LOADER,
    SHOW_DELETE_POLICY_MESSAGE,
    HIDE_POLICY_DELETE_MESSAGE,
    EDIT_POLICY_SUCCESS,
    REMOVE_INDIVIDUAL_POLICY_DATA
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    mainLoader: false,
    policiesList: "",
    allPolicies: null,
    addPolicy: null,
    editPolicy: null,
    individualPolicyData: null,
    alertMessage: "",
    showMessage: false,
    showMainPageMessage: false,
    alertMainPageMessage: "",
    PolicyListSuccess: false,
    deletePolicySuccess: false,
    editPolicyError: false,
    PolicyDetailSuccess: false,
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_POLICIES_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          deletePolicyLoader: false,
          PolicyListSuccess: true,
          allPolicies: action.payload,
          rowsDelete: [],
          isSort: false,
          individualPolicyData: null,
          addPolicy: null,
          showMessage: false,
          alertMessage: "",
          showMainPageMessage: false,
          alertMainPageMessage: "",
          editPolicy: null,
          deletePolicySuccess: false
        };
      }
      case FETCH_POLICIES_WITH_PAGINATION_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          PolicyListSuccess: true,
          addPolicy: null,
          policiesList: action.payload,
          allPolicies: null,
          rowsDelete: [],
          isSort: false,
          deletePolicy: false,
          individualPolicyData: null,
          editPolicy: null,
          deletePolicySuccess: false
        };
      }
  
      case SHOW_POLICIES_PARENT_PAGE_MESSAGE: {
        return {
          ...state,
          mainLoader: false,
          alertMainPageMessage: action.payload,
          showMainPageMessage: true,
          alertMessage: "",
          showMessage: false,
          deletePolicySuccess: false
        }
      }
      case SEARCH_POLICIES_SUCCESS: {
        return {
          ...state,
          loader: false,
          PolicyListSuccess: true,
          policiesList: action.payload,
          rowsDelete: [],
          isSort: false,
          deletePolicyLoader: false,
          deletePolicySuccess: false,
          individualPolicyData: null,
        };
      }
      case FETCH_INDIVIDUAL_POLICY_SUCCESS: {
        return {
          ...state,
          individualPolicyData: action.payload,
          deletePolicySuccess: false,
          PolicyDetailSuccess: true,
          loader: false
        };
      }
      case ADD_POLICY_SUCCESS: {
        return {
          ...state,
          individualPolicyData: null,
          loader: false,
          addPolicy: action.payload,
          alertMessage: '',
          showMessage: false,
          deletePolicySuccess: false
        };
      }
      case SHOW_POLICY_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false,
          deletePolicySuccess: false
        };
      }
      case HIDE_POLICY_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deletePolicySuccess: false
        }
      }
      case HIDE_POLICY_MAIN_PAGE_MESSAGE: {
        return {
          ...state,
          alertMainPageMessage: "",
          showMainPageMessage: false,
          mainLoader: false,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deletePolicySuccess: false
        }
      }
      case ON_SHOW_POLICY_LOADER: {
        return {
          ...state,
          loader: true,
          deletePolicySuccess: false
        }
      }
      case ON_SHOW_POLICY_MAIN_PAGE_LOADER: {
        return {
          ...state,
          mainLoader: true,
          deletePolicySuccess: false
        }
      }
  
      case DELETE_POLICY_SUCCESS: {
        return {
          ...state,
          deletePolicySuccess: true,
          deletePolicyLoader: false,
        };
      }
      case ON_SHOW_POLICY_DELETE_LOADER: {
        return {
          ...state,
          deletePolicySuccess: false,
          deletePolicyLoader: true,
          loader: false,
          mainLoader: false
        }
      }
      case SHOW_DELETE_POLICY_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          deletePolicyLoader: false,
          loader: false,
          mainLoader: false,
          deletePolicySuccess: false
        };
      }
      case HIDE_POLICY_DELETE_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          deletePolicyLoader: false,
          loader: false,
          mainLoader: false,
          deletePolicySuccess: false
        }
      }
      case EDIT_POLICY_SUCCESS: {
        return {
          ...state,
          deletePolicyLoader: false,
          deletePolicySuccess: false,
          editPolicy: action.payload,
          loader: false
        };
      }
  
      case REMOVE_INDIVIDUAL_POLICY_DATA: {
        return {
          ...state,
          individualPolicyData: null
        }
      }
      default:
        return state;
    }
  };
  