import {
    FETCH_ALL_SCORING_CARDS_SUCCESS,
    FETCH_SCORING_CARDS_WITH_PAGINATION_SUCCESS,
    SEARCH_SCORING_CARDS_SUCCESS,
    FETCH_INDIVIDUAL_SCORING_CARD_SUCCESS,
    SHOW_SCORING_CARD_MESSAGE,
    SHOW_SCORING_CARDS_PARENT_PAGE_MESSAGE,
    HIDE_SCORING_CARD_MESSAGE,
    HIDE_SCORING_CARD_MAIN_PAGE_MESSAGE,
    ON_SHOW_SCORING_CARD_LOADER,
    ON_SHOW_SCORING_CARD_MAIN_PAGE_LOADER,
    ADD_SCORING_CARD_SUCCESS,
    DELETE_SCORING_CARD_SUCCESS,
    ON_SHOW_SCORING_CARD_DELETE_LOADER,
    SHOW_DELETE_SCORING_CARD_MESSAGE,
    HIDE_SCORING_CARD_DELETE_MESSAGE,
    EDIT_SCORING_CARD_SUCCESS,
    REMOVE_INDIVIDUAL_SCORING_CARD_DATA
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    mainLoader: false,
    ScoringCardsList: "",
    allScoringCards: null,
    addScoringCard: null,
    editScoringCard: null,
    individualScoringCardData: null,
    alertMessage: "",
    showMessage: false,
    showMainPageMessage: false,
    alertMainPageMessage: "",
    ScoringCardListSuccess: false,
    deleteScoringCardSuccess: false,
    editScoringCardError: false,
    ScoringCardDetailSuccess: false,
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_SCORING_CARDS_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          deleteScoringCardLoader: false,
          ScoringCardListSuccess: true,
          allScoringCards: action.payload,
          rowsDelete: [],
          isSort: false,
          individualScoringCardData: null,
          addScoringCard: null,
          showMessage: false,
          alertMessage: "",
          showMainPageMessage: false,
          alertMainPageMessage: "",
          editScoringCard: null,
          deleteScoringCardSuccess: false
        };
      }
      case FETCH_SCORING_CARDS_WITH_PAGINATION_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          ScoringCardListSuccess: true,
          addScoringCard: null,
          ScoringCardsList: action.payload,
          allScoringCards: null,
          rowsDelete: [],
          isSort: false,
          deleteScoringCard: false,
          individualScoringCardData: null,
          editScoringCard: null,
          deleteScoringCardSuccess: false
        };
      }
  
      case SHOW_SCORING_CARDS_PARENT_PAGE_MESSAGE: {
        return {
          ...state,
          mainLoader: false,
          alertMainPageMessage: action.payload,
          showMainPageMessage: true,
          alertMessage: "",
          showMessage: false,
          deleteScoringCardSuccess: false
        }
      }
      case SEARCH_SCORING_CARDS_SUCCESS: {
        return {
          ...state,
          loader: false,
          ScoringCardListSuccess: true,
          ScoringCardsList: action.payload,
          rowsDelete: [],
          isSort: false,
          deleteScoringCardLoader: false,
          deleteScoringCardSuccess: false,
          individualScoringCardData: null,
        };
      }
      case FETCH_INDIVIDUAL_SCORING_CARD_SUCCESS: {
        return {
          ...state,
          individualScoringCardData: action.payload,
          deleteScoringCardSuccess: false,
          ScoringCardDetailSuccess: true,
          loader: false
        };
      }
      case ADD_SCORING_CARD_SUCCESS: {
        return {
          ...state,
          individualScoringCardData: null,
          loader: false,
          addScoringCard: action.payload,
          alertMessage: '',
          showMessage: false,
          deleteScoringCardSuccess: false
        };
      }
      case SHOW_SCORING_CARD_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false,
          deleteScoringCardSuccess: false
        };
      }
      case HIDE_SCORING_CARD_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteScoringCardSuccess: false
        }
      }
      case HIDE_SCORING_CARD_MAIN_PAGE_MESSAGE: {
        return {
          ...state,
          alertMainPageMessage: "",
          showMainPageMessage: false,
          mainLoader: false,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteScoringCardSuccess: false
        }
      }
      case ON_SHOW_SCORING_CARD_LOADER: {
        return {
          ...state,
          loader: true,
          deleteScoringCardSuccess: false
        }
      }
      case ON_SHOW_SCORING_CARD_MAIN_PAGE_LOADER: {
        return {
          ...state,
          mainLoader: true,
          deleteScoringCardSuccess: false
        }
      }
  
      case DELETE_SCORING_CARD_SUCCESS: {
        return {
          ...state,
          deleteScoringCardSuccess: true,
          deleteScoringCardLoader: false,
        };
      }
      case ON_SHOW_SCORING_CARD_DELETE_LOADER: {
        return {
          ...state,
          deleteScoringCardSuccess: false,
          deleteScoringCardLoader: true,
          loader: false,
          mainLoader: false
        }
      }
      case SHOW_DELETE_SCORING_CARD_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          deleteScoringCardLoader: false,
          loader: false,
          mainLoader: false,
          deleteScoringCardSuccess: false
        };
      }
      case HIDE_SCORING_CARD_DELETE_MESSAGE: {
        return {
          ...state,
          alertMessage: "",
          showMessage: false,
          deleteScoringCardLoader: false,
          loader: false,
          mainLoader: false,
          deleteScoringCardSuccess: false
        }
      }
      case EDIT_SCORING_CARD_SUCCESS: {
        return {
          ...state,
          deleteScoringCardLoader: false,
          deleteScoringCardSuccess: false,
          editScoringCard: action.payload,
          loader: false
        };
      }
  
      case REMOVE_INDIVIDUAL_SCORING_CARD_DATA: {
        return {
          ...state,
          individualScoringCardData: null
        }
      }
      default:
        return state;
    }
  };
  