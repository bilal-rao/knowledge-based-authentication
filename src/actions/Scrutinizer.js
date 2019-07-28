import {
  FETCH_ALL_SCRUTINIZER,
  FETCH_ALL_SCRUTINIZER_SUCCESS,
  SEARCH_SCRUTINIZERS,
  SEARCH_SCRUTINIZERS_SUCCESS,
  SHOW_SCRUTINIZER_MESSAGE,
  SHOW_DELETE_SCRUTINIZER_MESSAGE,
  SHOW_SCRUTINIZERS_PARENT_PAGE_MESSAGE,
  SHOW_PROCESS_REQUEST_MESSAGE,
  HIDE_SCRUTINIZER_MESSAGE,
  HIDE_SCRUTINIZER_DELETE_MESSAGE,
  HIDE_SCRUTINIZER_MAIN_PAGE_MESSAGE,
  HIDE_PROCESS_REQUEST_MESSAGE,
  FETCH_INDIVIDUAL_SCRUTINIZER,
  FETCH_INDIVIDUAL_SCRUTINIZER_SUCCESS,
  ADD_SCRUTINIZER,
  ADD_SCRUTINIZER_SUCCESS,
  ON_SHOW_SCRUTINIZER_LOADER,
  ON_SHOW_SCRUTINIZER_DELETE_LOADER,
  ON_SHOW_SCRUTINIZER_MAIN_PAGE_LOADER,
  ON_SHOW_PROCESS_REQUEST_LOADER,
  DELETE_SCRUTINIZER,
  DELETE_SCRUTINIZER_SUCCESS,
  EDIT_SCRUTINIZER,
  EDIT_SCRUTINIZER_SUCCESS,
  DELETE_SCRUTINIZER_From_ViewPage,
  REMOVE_INDIVIDUAL_SCRUTINIZER_DATA,
  SCRUTINIZER_PROCESS_REQUEST,
  SCRUTINIZER_PROCESS_REQUEST_SUCCESS
} from "../constants/ActionTypes";

export const fetchScrutinizer = obj => {
  return {
    type: FETCH_ALL_SCRUTINIZER,
    payload: obj
  };
};

export const fetchScrutinizerSuccess = scrutinizer => {
  return {
    type: FETCH_ALL_SCRUTINIZER_SUCCESS,
    payload: scrutinizer
  };
};

export const searchScrutinizer = obj => {
  return {
    type: SEARCH_SCRUTINIZERS,
    payload: obj
  };
};

export const searchScrutinizerSuccess = scrutinizer => {
  return {
    type: SEARCH_SCRUTINIZERS_SUCCESS,
    payload: scrutinizer
  };
};

export const addScrutinizer = obj => {
  return {
    type: ADD_SCRUTINIZER,
    payload: obj
  };
};

export const addScrutinizerSuccess = obj => {
  return {
    type: ADD_SCRUTINIZER_SUCCESS,
    payload: obj
  };
};

export const fetchIndividualScrutinizer = data => {
  return {
    type: FETCH_INDIVIDUAL_SCRUTINIZER,
    payload: data
  };
};

export const fetchIndividualScrutinizerSuccess = scrutinizer => {
  return {
    type: FETCH_INDIVIDUAL_SCRUTINIZER_SUCCESS,
    payload: scrutinizer
  };
};

export const deleteScrutinizer = id => {
  return {
    type: DELETE_SCRUTINIZER,
    payload: id
  };
};

export const deleteScrutinizerSuccess = () => {
  return {
    type: DELETE_SCRUTINIZER_SUCCESS
  };
};

export const deleteScrutinizerFromViewPage = id => {
  return {
    type: DELETE_SCRUTINIZER_From_ViewPage,
    payload: id
  };
};

export const editScrutinizer = obj => {
  return {
    type: EDIT_SCRUTINIZER,
    payload: obj
  };
};

export const editScrutinizerSuccess = obj => {
  return {
    type: EDIT_SCRUTINIZER_SUCCESS,
    payload: obj
  };
};

export const scrutinizerProcessRequest = obj => {
  return {
    type: SCRUTINIZER_PROCESS_REQUEST,
    payload: obj
  };
};

export const scrutinizerProcessRequestSuccess = response => {
  return {
    type: SCRUTINIZER_PROCESS_REQUEST_SUCCESS,
    payload: response
  };
};

export const showScrutinizerLoader = () => {
  return {
    type: ON_SHOW_SCRUTINIZER_LOADER
  };
};

export const showScrutinizerDeleteLoader = () => {
  return {
    type: ON_SHOW_SCRUTINIZER_DELETE_LOADER
  };
};

export const showScrutinizerMainPageLoader = () => {
  return {
    type: ON_SHOW_SCRUTINIZER_MAIN_PAGE_LOADER
  };
};

export const showProcessRequestLoader = () => {
  return {
    type: ON_SHOW_PROCESS_REQUEST_LOADER
  };
};

export const hideScrutinizerMessage = () => {
  return {
    type: HIDE_SCRUTINIZER_MESSAGE
  };
};

export const hideScrutinizerDeleteMessage = () => {
  return {
    type: HIDE_SCRUTINIZER_DELETE_MESSAGE
  };
};

export const hideScrutinizerMainPageMessage = () => {
  return {
    type: HIDE_SCRUTINIZER_MAIN_PAGE_MESSAGE
  };
};

export const hideProcessRequestMessage = () => {
  return {
    type: HIDE_PROCESS_REQUEST_MESSAGE
  };
};

export const showScrutinizerMessage = message => {
  return {
    type: SHOW_SCRUTINIZER_MESSAGE,
    payload: message
  };
};

export const showDeleteScrutinizerMessage = message => {
  return {
    type: SHOW_DELETE_SCRUTINIZER_MESSAGE,
    payload: message
  };
};

export const showScrutinizersParentPageMessage = message => {
  return {
    type: SHOW_SCRUTINIZERS_PARENT_PAGE_MESSAGE,
    payload: message
  };
};

export const showProcessRequestMessage = message => {
  return {
    type: SHOW_PROCESS_REQUEST_MESSAGE,
    payload: message
  };
};

export const removeIndividualScrutinizerData = () => {
  return {
    type: REMOVE_INDIVIDUAL_SCRUTINIZER_DATA
  };
};
