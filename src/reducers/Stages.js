import {
    FETCH_ALL_STAGES_SUCCESS,
    FETCH_STAGES_WITH_PAGINATION_SUCCESS,
    SEARCH_STAGES_SUCCESS,
    FETCH_INDIVIDUAL_STAGE_SUCCESS,
    SHOW_STAGE_MESSAGE,
    SHOW_STAGES_PARENT_PAGE_MESSAGE,
    HIDE_STAGE_MESSAGE,
    HIDE_STAGE_MAIN_PAGE_MESSAGE,
    ON_SHOW_STAGE_LOADER,
    ON_SHOW_STAGE_MAIN_PAGE_LOADER,
    ADD_STAGE_SUCCESS,
    DELETE_STAGE_SUCCESS,
    ON_SHOW_STAGE_DELETE_LOADER,
    SHOW_DELETE_STAGE_MESSAGE,
    HIDE_STAGE_DELETE_MESSAGE,
    EDIT_STAGE_SUCCESS,
    REMOVE_INDIVIDUAL_STAGE_DATA
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    mainLoader: false,
    stagesList: "",
    allStages: null,
    addStage: null,
    editStage: null,
    individualStageData: null,
    alertMessage: "",
    showMessage: false,
    showMainPageMessage: false,
    alertMainPageMessage: "",
    stageListSuccess: false,
    deleteStageSuccess: false,
    editStageError: false,
    stageDetailSuccess: false,
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_STAGES_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          deleteStageLoader: false,
          stageListSuccess: true,
          allStages: action.payload,
          rowsDelete: [],
          isSort: false,
          individualStageData: null,
          addStage: null,
          showMessage: false,
          alertMessage: "",
          showMainPageMessage: false,
          alertMainPageMessage: "",
          editStage: null,
          deleteStageSuccess: false
        };
      }
      case FETCH_STAGES_WITH_PAGINATION_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          stageListSuccess: true,
          addStage: null,
          stagesList: action.payload,
          allStages: null,
          rowsDelete: [],
          isSort: false,
          deleteStage: false,
          individualStageData: null,
          editStage: null,
          deleteStageSuccess: false
        };
      }
  
      case SHOW_STAGES_PARENT_PAGE_MESSAGE: {
        return {
          ...state,
          mainLoader: false,
          alertMainPageMessage: action.payload,
          showMainPageMessage: true,
          alertMessage: "",
          showMessage: false,
          deleteStageSuccess: false
        }
      }
      case SEARCH_STAGES_SUCCESS: {
        return {
          ...state,
          loader: false,
          stageListSuccess: true,
          stagesList: action.payload,
          rowsDelete: [],
          isSort: false,
          deleteStageLoader: false,
          deleteStageSuccess: false,
          individualStageData: null,
        };
      }
      case FETCH_INDIVIDUAL_STAGE_SUCCESS: {
        return {
          ...state,
          individualStageData: action.payload,
          deleteStageSuccess: false,
          stageDetailSuccess: true,
          loader: false
        };
      }
      case ADD_STAGE_SUCCESS: {
        return {
          ...state,
          individualStageData: null,
          loader: false,
          addStage: action.payload,
          alertMessage: '',
          showMessage: false,
          deleteStageSuccess: false
        };
      }
      case SHOW_STAGE_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false,
          deleteStageSuccess: false
        };
      }
      case HIDE_STAGE_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteStageSuccess: false
        }
      }
      case HIDE_STAGE_MAIN_PAGE_MESSAGE: {
        return {
          ...state,
          alertMainPageMessage: "",
          showMainPageMessage: false,
          mainLoader: false,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteStageSuccess: false
        }
      }
      case ON_SHOW_STAGE_LOADER: {
        return {
          ...state,
          loader: true,
          deleteStageSuccess: false
        }
      }
      case ON_SHOW_STAGE_MAIN_PAGE_LOADER: {
        return {
          ...state,
          mainLoader: true,
          deleteStageSuccess: false
        }
      }
  
      case DELETE_STAGE_SUCCESS: {
        return {
          ...state,
          deleteStageSuccess: true,
          deleteStageLoader: false,
        };
      }
      case ON_SHOW_STAGE_DELETE_LOADER: {
        return {
          ...state,
          deleteStageSuccess: false,
          deleteStageLoader: true,
          loader: false,
          mainLoader: false
        }
      }
      case SHOW_DELETE_STAGE_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          deleteStageLoader: false,
          loader: false,
          mainLoader: false,
          deleteStageSuccess: false
        };
      }
      case HIDE_STAGE_DELETE_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          deleteStageLoader: false,
          loader: false,
          mainLoader: false,
          deleteStageSuccess: false
        }
      }
      case EDIT_STAGE_SUCCESS: {
        return {
          ...state,
          deleteStageLoader: false,
          deleteStageSuccess: false,
          editStage: action.payload,
          loader: false
        };
      }
  
      case REMOVE_INDIVIDUAL_STAGE_DATA: {
        return {
          ...state,
          individualStageData: null
        }
      }
      default:
        return state;
    }
  };
  