import {
  FETCH_ALL_LOOKUPS,
  FETCH_ALL_LOOKUPS_SUCCESS,
  FETCH_LOOKUPS_WITH_PAGINATION,
  FETCH_LOOKUPS_WITH_PAGINATION_SUCCESS,
  SEARCH_LOOKUPS,
  SEARCH_LOOKUPS_SUCCESS,
  SHOW_LOOKUP_MESSAGE,
  SHOW_DELETE_LOOKUP_MESSAGE,
  SHOW_LOOKUPS_PARENT_PAGE_MESSAGE,
  HIDE_LOOKUP_MESSAGE,
  HIDE_LOOKUP_DELETE_MESSAGE,
  HIDE_LOOKUP_MAIN_PAGE_MESSAGE,
  FETCH_INDIVIDUAL_LOOKUP,
  FETCH_INDIVIDUAL_LOOKUP_SUCCESS,
  ADD_LOOKUP,
  ADD_LOOKUP_SUCCESS,
  ON_SHOW_LOOKUP_LOADER,
  ON_SHOW_LOOKUP_DELETE_LOADER,
  ON_SHOW_LOOKUP_MAIN_PAGE_LOADER,
  DELETE_LOOKUP,
  DELETE_LOOKUP_SUCCESS,
  EDIT_LOOKUP,
  EDIT_LOOKUP_SUCCESS,
  EDIT_DRAFT_LOOKUP,
  EDIT_DRAFT_LOOKUP_SUCCESS,
  DELETE_LOOKUP_From_ViewPage,
  REMOVE_INDIVIDUAL_LOOKUP_DATA,
  POP_UP_CLOSE,
  RESET_SUCCESS_INDICATORS
} from "../constants/ActionTypes";

export const fetchLookUp = obj => {
  return {
    type: FETCH_LOOKUPS_WITH_PAGINATION,
    payload: obj
  };
};

export const fetchLookUpSuccess = lookup => {
  return {
    type: FETCH_LOOKUPS_WITH_PAGINATION_SUCCESS,
    payload: lookup
  };
};

export const fetchAllLookUps = () => {
  return {
    type: FETCH_ALL_LOOKUPS
  };
};

export const fetchAllLookUpsSuccess = lookups => {
  return {
    type: FETCH_ALL_LOOKUPS_SUCCESS,
    payload: lookups
  };
};

export const searchLookUp = obj => {
  return {
    type: SEARCH_LOOKUPS,
    payload: obj
  };
};

export const searchLookUpSuccess = lookup => {
  return {
    type: SEARCH_LOOKUPS_SUCCESS,
    payload: lookup
  };
};

export const addLookUp = obj => {
  return {
    type: ADD_LOOKUP,
    payload: obj
  };
};

export const addLookUpSuccess = obj => {
  return {
    type: ADD_LOOKUP_SUCCESS,
    payload: obj
  };
};

export const fetchIndividualLookUp = data => {
  return {
    type: FETCH_INDIVIDUAL_LOOKUP,
    payload: data
  };
};

export const fetchIndividualLookUpSuccess = lookup => {
  return {
    type: FETCH_INDIVIDUAL_LOOKUP_SUCCESS,
    payload: lookup
  };
};

export const deleteLookUp = id => {
  return {
    type: DELETE_LOOKUP,
    payload: id
  };
};

export const deleteLookUpSuccess = () => {
  return {
    type: DELETE_LOOKUP_SUCCESS
  };
};

export const deleteLookUpFromViewPage = id => {
  return {
    type: DELETE_LOOKUP_From_ViewPage,
    payload: id
  };
};

export const editLookUp = obj => {
  return {
    type: EDIT_LOOKUP,
    payload: obj
  };
};

export const editLookUpSuccess = obj => {
  return {
    type: EDIT_LOOKUP_SUCCESS,
    payload: obj
  };
};

export const editDraftLookUp = obj => {
  return {
    type: EDIT_DRAFT_LOOKUP,
    payload: obj
  };
};

export const editDraftLookUpSuccess = obj => {
  return {
    type: EDIT_DRAFT_LOOKUP_SUCCESS,
    payload: obj
  };
};

export const showLookUpLoader = () => {
  return {
    type: ON_SHOW_LOOKUP_LOADER
  };
};

export const showLookUpDeleteLoader = () => {
  return {
    type: ON_SHOW_LOOKUP_DELETE_LOADER
  };
};

export const showLookUpMainPageLoader = () => {
  return {
    type: ON_SHOW_LOOKUP_MAIN_PAGE_LOADER
  };
};

export const hideLookUpMessage = () => {
  return {
    type: HIDE_LOOKUP_MESSAGE
  };
};

export const hideLookUpDeleteMessage = () => {
  return {
    type: HIDE_LOOKUP_DELETE_MESSAGE
  };
};

export const hideLookUpMainPageMessage = () => {
  return {
    type: HIDE_LOOKUP_MAIN_PAGE_MESSAGE
  };
};

export const showLookUpMessage = message => {
  return {
    type: SHOW_LOOKUP_MESSAGE,
    payload: message
  };
};

export const showDeleteLookUpMessage = message => {
  return {
    type: SHOW_DELETE_LOOKUP_MESSAGE,
    payload: message
  };
};

export const showLookUpsParentPageMessage = message => {
  return {
    type: SHOW_LOOKUPS_PARENT_PAGE_MESSAGE,
    payload: message
  };
};

export const removeIndividualLookUpData = () => {
  return {
    type: REMOVE_INDIVIDUAL_LOOKUP_DATA
  };
};

export const popUpClose = () => {
  return {
    type: POP_UP_CLOSE
  };
};

export const resetLookUpSuccessIndicators = () => {
  return {
    type: RESET_SUCCESS_INDICATORS
  };
};
