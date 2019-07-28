import {
  FETCH_ALL_DESIGNATIONS,
  FETCH_ALL_DESIGNATIONS_SUCCESS,
  FETCH_DESIGNATIONS_WITH_PAGINATION,
  FETCH_DESIGNATIONS_WITH_PAGINATION_SUCCESS,
  SEARCH_DESIGNATIONS,
  SEARCH_DESIGNATIONS_SUCCESS,
  SHOW_DESIGNATION_MESSAGE,
  SHOW_DELETE_DESIGNATION_MESSAGE,
  SHOW_DESIGNATIONS_PARENT_PAGE_MESSAGE,
  HIDE_DESIGNATION_MESSAGE,
  HIDE_DESIGNATION_DELETE_MESSAGE,
  HIDE_DESIGNATION_MAIN_PAGE_MESSAGE,
  FETCH_INDIVIDUAL_DESIGNATION,
  FETCH_INDIVIDUAL_DESIGNATION_SUCCESS,
  ADD_DESIGNATION,
  ADD_DESIGNATION_SUCCESS,
  ON_SHOW_DESIGNATION_LOADER,
  ON_SHOW_DESIGNATION_DELETE_LOADER,
  ON_SHOW_DESIGNATION_MAIN_PAGE_LOADER,
  DELETE_DESIGNATION,
  DELETE_DESIGNATION_SUCCESS,
  EDIT_DESIGNATION,
  EDIT_DESIGNATION_SUCCESS,
  DELETE_DESIGNATION_From_ViewPage,
  REMOVE_INDIVIDUAL_DESIGNATION_DATA
} from "../constants/ActionTypes";

export const fetchDesignation = obj => {
  return {
    type: FETCH_DESIGNATIONS_WITH_PAGINATION,
    payload: obj
  };
};

export const fetchDesignationSuccess = designation => {
  return {
    type: FETCH_DESIGNATIONS_WITH_PAGINATION_SUCCESS,
    payload: designation
  };
};
export const fetchAllDesignations = () => {
  return {
    type: FETCH_ALL_DESIGNATIONS,
  };
};

export const fetchAllDesignationsSuccess = designations => {
  return {
    type: FETCH_ALL_DESIGNATIONS_SUCCESS,
    payload: designations
  };
};

export const searchDesignation = obj => {
  return {
    type: SEARCH_DESIGNATIONS,
    payload: obj
  };
};

export const searchDesignationSuccess = designation => {
  return {
    type: SEARCH_DESIGNATIONS_SUCCESS,
    payload: designation
  };
};

export const addDesignation = obj => {
  return {
    type: ADD_DESIGNATION,
    payload: obj
  };
};
export const addDesignationSuccess = obj => {
  return {
    type: ADD_DESIGNATION_SUCCESS,
    payload: obj
  };
};

export const fetchIndividualDesignation = data => {
  return {
    type: FETCH_INDIVIDUAL_DESIGNATION,
    payload: data
  };
};

export const fetchIndividualDesignationSuccess = designation => {
  return {
    type: FETCH_INDIVIDUAL_DESIGNATION_SUCCESS,
    payload: designation
  };
};

export const deleteDesignation = id => {
  return {
    type: DELETE_DESIGNATION,
    payload: id
  };
};

export const deleteDesignationSuccess = () => {
  return {
    type: DELETE_DESIGNATION_SUCCESS
  };
};


export const deleteDesignationFromViewPage = id => {
  return {
    type: DELETE_DESIGNATION_From_ViewPage,
    payload: id
  };
};

export const editDesignation = obj => {
  return {
    type: EDIT_DESIGNATION,
    payload: obj
  };
};


export const editDesignationSuccess = obj => {
  return {
    type: EDIT_DESIGNATION_SUCCESS,
    payload: obj
  };
};


export const showDesignationLoader = () => {
  return {
    type: ON_SHOW_DESIGNATION_LOADER,
  };
};


export const showDesignationDeleteLoader = () => {
  return {
    type: ON_SHOW_DESIGNATION_DELETE_LOADER,
  };
};

export const showDesignationMainPageLoader = () => {
  return {
    type: ON_SHOW_DESIGNATION_MAIN_PAGE_LOADER,
  };
};



export const hideDesignationMessage = () => {
  return {
    type: HIDE_DESIGNATION_MESSAGE,
  };
};

export const hideDesignationDeleteMessage = () => {
  return {
    type: HIDE_DESIGNATION_DELETE_MESSAGE,
  };
};

export const hideDesignationMainPageMessage = () => {
  return {
    type: HIDE_DESIGNATION_MAIN_PAGE_MESSAGE,
  };
};


export const showDesignationMessage = message => {
  return {
    type: SHOW_DESIGNATION_MESSAGE,
    payload: message
  };
};
export const showDeleteDesignationMessage = message => {
  return {
    type: SHOW_DELETE_DESIGNATION_MESSAGE,
    payload: message
  };
};
export const showDesignationsParentPageMessage = (message) => {
  return {
    type: SHOW_DESIGNATIONS_PARENT_PAGE_MESSAGE,
    payload: message
  }
}

export const removeIndividualDesignationData = () => {
  return {
    type: REMOVE_INDIVIDUAL_DESIGNATION_DATA
  }
}