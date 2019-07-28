import {
    FETCH_ALL_SCORING_WEIGHTAGES_SUCCESS,
    FETCH_SCORING_WEIGHTAGES_WITH_PAGINATION_SUCCESS,
    SEARCH_SCORING_WEIGHTAGES_SUCCESS,
    FETCH_INDIVIDUAL_SCORING_WEIGHTAGE_SUCCESS,
    SHOW_SCORING_WEIGHTAGE_MESSAGE,
    SHOW_SCORING_WEIGHTAGES_PARENT_PAGE_MESSAGE,
    HIDE_SCORING_WEIGHTAGE_MESSAGE,
    HIDE_SCORING_WEIGHTAGE_MAIN_PAGE_MESSAGE,
    ON_SHOW_SCORING_WEIGHTAGE_LOADER,
    ON_SHOW_SCORING_WEIGHTAGE_MAIN_PAGE_LOADER,
    ADD_SCORING_WEIGHTAGE_SUCCESS,
    DELETE_SCORING_WEIGHTAGE_SUCCESS,
    ON_SHOW_SCORING_WEIGHTAGE_DELETE_LOADER,
    SHOW_DELETE_SCORING_WEIGHTAGE_MESSAGE,
    HIDE_SCORING_WEIGHTAGE_DELETE_MESSAGE,
    EDIT_SCORING_WEIGHTAGE_SUCCESS,
    REMOVE_INDIVIDUAL_SCORING_WEIGHTAGE_DATA
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    mainLoader: false,
    ScoringWeightagesList: "",
    allScoringWeightages: null,
    addScoringWeightage: null,
    editScoringWeightage: null,
    individualScoringWeightageData: null,
    alertMessage: "",
    showMessage: false,
    showMainPageMessage: false,
    alertMainPageMessage: "",
    ScoringWeightageListSuccess: false,
    deleteScoringWeightageSuccess: false,
    editScoringWeightageError: false,
    ScoringWeightageDetailSuccess: false,
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_SCORING_WEIGHTAGES_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          deleteScoringWeightageLoader: false,
          ScoringWeightageListSuccess: true,
          allScoringWeightages: action.payload,
          rowsDelete: [],
          isSort: false,
          individualScoringWeightageData: null,
          addScoringWeightage: null,
          showMessage: false,
          alertMessage: "",
          showMainPageMessage: false,
          alertMainPageMessage: "",
          editScoringWeightage: null,
          deleteScoringWeightageSuccess: false
        };
      }
      case FETCH_SCORING_WEIGHTAGES_WITH_PAGINATION_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          ScoringWeightageListSuccess: true,
          addScoringWeightage: null,
          ScoringWeightagesList: action.payload,
          allScoringWeightages: null,
          rowsDelete: [],
          isSort: false,
          deleteScoringWeightage: false,
          individualScoringWeightageData: null,
          editScoringWeightage: null,
          deleteScoringWeightageSuccess: false
        };
      }
  
      case SHOW_SCORING_WEIGHTAGES_PARENT_PAGE_MESSAGE: {
        return {
          ...state,
          mainLoader: false,
          alertMainPageMessage: action.payload,
          showMainPageMessage: true,
          alertMessage: "",
          showMessage: false,
          deleteScoringWeightageSuccess: false
        }
      }
      case SEARCH_SCORING_WEIGHTAGES_SUCCESS: {
        return {
          ...state,
          loader: false,
          ScoringWeightageListSuccess: true,
          ScoringWeightagesList: action.payload,
          rowsDelete: [],
          isSort: false,
          deleteScoringWeightageLoader: false,
          deleteScoringWeightageSuccess: false,
          individualScoringWeightageData: null,
        };
      }
      case FETCH_INDIVIDUAL_SCORING_WEIGHTAGE_SUCCESS: {
        return {
          ...state,
          individualScoringWeightageData: action.payload,
          deleteScoringWeightageSuccess: false,
          ScoringWeightageDetailSuccess: true,
          loader: false
        };
      }
      case ADD_SCORING_WEIGHTAGE_SUCCESS: {
        return {
          ...state,
          individualScoringWeightageData: null,
          loader: false,
          addScoringWeightage: action.payload,
          alertMessage: '',
          showMessage: false,
          deleteScoringWeightageSuccess: false
        };
      }
      case SHOW_SCORING_WEIGHTAGE_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false,
          deleteScoringWeightageSuccess: false
        };
      }
      case HIDE_SCORING_WEIGHTAGE_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteScoringWeightageSuccess: false
        }
      }
      case HIDE_SCORING_WEIGHTAGE_MAIN_PAGE_MESSAGE: {
        return {
          ...state,
          alertMainPageMessage: "",
          showMainPageMessage: false,
          mainLoader: false,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteScoringWeightageSuccess: false
        }
      }
      case ON_SHOW_SCORING_WEIGHTAGE_LOADER: {
        return {
          ...state,
          loader: true,
          deleteScoringWeightageSuccess: false
        }
      }
      case ON_SHOW_SCORING_WEIGHTAGE_MAIN_PAGE_LOADER: {
        return {
          ...state,
          mainLoader: true,
          deleteScoringWeightageSuccess: false
        }
      }
  
      case DELETE_SCORING_WEIGHTAGE_SUCCESS: {
        return {
          ...state,
          deleteScoringWeightageSuccess: true,
          deleteScoringWeightageLoader: false,
        };
      }
      case ON_SHOW_SCORING_WEIGHTAGE_DELETE_LOADER: {
        return {
          ...state,
          deleteScoringWeightageSuccess: false,
          deleteScoringWeightageLoader: true,
          loader: false,
          mainLoader: false
        }
      }
      case SHOW_DELETE_SCORING_WEIGHTAGE_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          deleteScoringWeightageLoader: false,
          loader: false,
          mainLoader: false,
          deleteScoringWeightageSuccess: false
        };
      }
      case HIDE_SCORING_WEIGHTAGE_DELETE_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          deleteScoringWeightageLoader: false,
          loader: false,
          mainLoader: false,
          deleteScoringWeightageSuccess: false
        }
      }
      case EDIT_SCORING_WEIGHTAGE_SUCCESS: {
        return {
          ...state,
          deleteScoringWeightageLoader: false,
          deleteScoringWeightageSuccess: false,
          editScoringWeightage: action.payload,
          loader: false
        };
      }
  
      case REMOVE_INDIVIDUAL_SCORING_WEIGHTAGE_DATA: {
        return {
          ...state,
          individualScoringWeightageData: null
        }
      }
      default:
        return state;
    }
  };
  