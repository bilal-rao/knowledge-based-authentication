import {
  FETCH_ALL_DEVIATION,
  FETCH_ALL_DEVIATION_SUCCESS,
  FETCH_DEVIATION_WITH_PAGINATION,
  FETCH_DEVIATION_WITH_PAGINATION_SUCCESS,
  SEARCH_DEVIATIONS,
  SEARCH_DEVIATIONS_SUCCESS,
  SHOW_DEVIATION_MESSAGE,
  SHOW_DELETE_DEVIATION_MESSAGE,
  SHOW_DEVIATIONS_PARENT_PAGE_MESSAGE,
  HIDE_DEVIATION_MESSAGE,
  HIDE_DEVIATION_DELETE_MESSAGE,
  HIDE_DEVIATION_MAIN_PAGE_MESSAGE,
  FETCH_INDIVIDUAL_DEVIATION,
  FETCH_INDIVIDUAL_DEVIATION_SUCCESS,
  ADD_DEVIATION,
  ADD_DEVIATION_SUCCESS,
  ON_SHOW_DEVIATION_LOADER,
  ON_SHOW_DEVIATION_DELETE_LOADER,
  ON_SHOW_DEVIATION_MAIN_PAGE_LOADER,
  DELETE_DEVIATION,
  DELETE_DEVIATION_SUCCESS,
  EDIT_DEVIATION,
  EDIT_DEVIATION_SUCCESS,
  EDIT_DRAFT_DEVIATION,
  EDIT_DRAFT_DEVIATION_SUCCESS,
  DELETE_DEVIATION_From_ViewPage,
  REMOVE_INDIVIDUAL_DEVIATION_DATA
} from "../constants/ActionTypes";

export const fetchDeviation = obj => {
  return {
    type: FETCH_DEVIATION_WITH_PAGINATION,
    payload: obj
  };
};

export const fetchDeviationSuccess = deviation => {
  return {
    type: FETCH_DEVIATION_WITH_PAGINATION_SUCCESS,
    payload: deviation
  };
};

export const fetchAllDeviation = () => {
  return {
    type: FETCH_ALL_DEVIATION,
  };
};

export const fetchAllDeviationSuccess = deviations => {
  return {
    type: FETCH_ALL_DEVIATION_SUCCESS,
    payload: deviations
  };
};

export const searchDeviation = obj => {
  return {
    type: SEARCH_DEVIATIONS,
    payload: obj
  };
};

export const searchDeviationSuccess = deviation => {
  return {
    type: SEARCH_DEVIATIONS_SUCCESS,
    payload: deviation
  };
};

export const addDeviation = obj => {
  return {
    type: ADD_DEVIATION,
    payload: obj
  };
};

export const addDeviationSuccess = obj => {
  return {
    type: ADD_DEVIATION_SUCCESS,
    payload: obj
  };
};

export const fetchIndividualDeviation = data => {
  return {
    type: FETCH_INDIVIDUAL_DEVIATION,
    payload: data
  };
};

export const fetchIndividualDeviationSuccess = deviation => {
  return {
    type: FETCH_INDIVIDUAL_DEVIATION_SUCCESS,
    payload: deviation
  };
};

export const deleteDeviation = id => {
  return {
    type: DELETE_DEVIATION,
    payload: id
  };
};

export const deleteDeviationSuccess = () => {
  return {
    type: DELETE_DEVIATION_SUCCESS
  };
};

export const deleteDeviationFromViewPage = id => {
  return {
    type: DELETE_DEVIATION_From_ViewPage,
    payload: id
  };
};

export const editDeviation = obj => {
  return {
    type: EDIT_DEVIATION,
    payload: obj
  };
};

export const editDeviationSuccess = obj => {
  return {
    type: EDIT_DEVIATION_SUCCESS,
    payload: obj
  };
};

export const editDraftDeviation = obj => {
  return {
    type: EDIT_DRAFT_DEVIATION,
    payload: obj
  };
};

export const editDraftDeviationSuccess = obj => {
  return {
    type: EDIT_DRAFT_DEVIATION_SUCCESS,
    payload: obj
  };
};

export const showDeviationLoader = () => {
  return {
    type: ON_SHOW_DEVIATION_LOADER,
  };
};

export const showDeviationDeleteLoader = () => {
  return {
    type: ON_SHOW_DEVIATION_DELETE_LOADER,
  };
};

export const showDeviationMainPageLoader = () => {
  return {
    type: ON_SHOW_DEVIATION_MAIN_PAGE_LOADER,
  };
};

export const hideDeviationMessage = () => {
  return {
    type: HIDE_DEVIATION_MESSAGE,
  };
};

export const hideDeviationDeleteMessage = () => {
  return {
    type: HIDE_DEVIATION_DELETE_MESSAGE,
  };
};

export const hideDeviationMainPageMessage = () => {
  return {
    type: HIDE_DEVIATION_MAIN_PAGE_MESSAGE,
  };
};

export const showDeviationMessage = message => {
  return {
    type: SHOW_DEVIATION_MESSAGE,
    payload: message
  };
};

export const showDeleteDeviationMessage = message => {
  return {
    type: SHOW_DELETE_DEVIATION_MESSAGE,
    payload: message
  };
};

export const showDeviationsParentPageMessage = (message) => {
  return {
    type: SHOW_DEVIATIONS_PARENT_PAGE_MESSAGE,
    payload: message
  }
}

export const removeIndividualDeviationData = () => {
  return {
    type: REMOVE_INDIVIDUAL_DEVIATION_DATA
  }
}