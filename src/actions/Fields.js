import {
  FETCH_ALL_FIELD,
  FETCH_ALL_FIELD_SUCCESS,
  FETCH_FIELD_WITH_PAGINATION,
  FETCH_FIELD_WITH_PAGINATION_SUCCESS,
  SEARCH_FIELDS,
  SEARCH_FIELDS_SUCCESS,
  SHOW_FIELD_MESSAGE,
  SHOW_DELETE_FIELD_MESSAGE,
  SHOW_FIELDS_PARENT_PAGE_MESSAGE,
  HIDE_FIELD_MESSAGE,
  HIDE_FIELD_DELETE_MESSAGE,
  HIDE_FIELD_MAIN_PAGE_MESSAGE,
  FETCH_INDIVIDUAL_FIELD,
  FETCH_INDIVIDUAL_FIELD_SUCCESS,
  ADD_FIELD,
  ADD_FIELD_SUCCESS,
  ON_SHOW_FIELD_LOADER,
  ON_SHOW_FIELD_DELETE_LOADER,
  ON_SHOW_FIELD_MAIN_PAGE_LOADER,
  DELETE_FIELD,
  DELETE_FIELD_SUCCESS,
  EDIT_FIELD,
  EDIT_FIELD_SUCCESS,
  EDIT_DRAFT_FIELD,
  EDIT_DRAFT_FIELD_SUCCESS,
  DELETE_FIELD_From_ViewPage,
  REMOVE_INDIVIDUAL_FIELD_DATA
} from "../constants/ActionTypes";

export const fetchField = obj => {
  return {
    type: FETCH_FIELD_WITH_PAGINATION,
    payload: obj
  };
};

export const fetchFieldSuccess = field => {
  return {
    type: FETCH_FIELD_WITH_PAGINATION_SUCCESS,
    payload: field
  };
};

export const fetchAllField = () => {
  return {
    type: FETCH_ALL_FIELD,
  };
};

export const fetchAllFieldSuccess = fields => {
  return {
    type: FETCH_ALL_FIELD_SUCCESS,
    payload: fields
  };
};

export const searchField = obj => {
  return {
    type: SEARCH_FIELDS,
    payload: obj
  };
};

export const searchFieldSuccess = field => {
  return {
    type: SEARCH_FIELDS_SUCCESS,
    payload: field
  };
};

export const addField = obj => {
  return {
    type: ADD_FIELD,
    payload: obj
  };
};

export const addFieldSuccess = obj => {
  return {
    type: ADD_FIELD_SUCCESS,
    payload: obj
  };
};

export const fetchIndividualField = data => {
  return {
    type: FETCH_INDIVIDUAL_FIELD,
    payload: data
  };
};

export const fetchIndividualFieldSuccess = field => {
  return {
    type: FETCH_INDIVIDUAL_FIELD_SUCCESS,
    payload: field
  };
};

export const deleteField = id => {
  return {
    type: DELETE_FIELD,
    payload: id
  };
};

export const deleteFieldSuccess = () => {
  return {
    type: DELETE_FIELD_SUCCESS
  };
};

export const deleteFieldFromViewPage = id => {
  return {
    type: DELETE_FIELD_From_ViewPage,
    payload: id
  };
};

export const editField = obj => {
  return {
    type: EDIT_FIELD,
    payload: obj
  };
};

export const editFieldSuccess = obj => {
  return {
    type: EDIT_FIELD_SUCCESS,
    payload: obj
  };
};

export const editDraftField = obj => {
  return {
    type: EDIT_DRAFT_FIELD,
    payload: obj
  };
};

export const editDraftFieldSuccess = obj => {
  return {
    type: EDIT_DRAFT_FIELD_SUCCESS,
    payload: obj
  };
};

export const showFieldLoader = () => {
  return {
    type: ON_SHOW_FIELD_LOADER,
  };
};

export const showFieldDeleteLoader = () => {
  return {
    type: ON_SHOW_FIELD_DELETE_LOADER,
  };
};

export const showFieldMainPageLoader = () => {
  return {
    type: ON_SHOW_FIELD_MAIN_PAGE_LOADER,
  };
};

export const hideFieldMessage = () => {
  return {
    type: HIDE_FIELD_MESSAGE,
  };
};

export const hideFieldDeleteMessage = () => {
  return {
    type: HIDE_FIELD_DELETE_MESSAGE,
  };
};

export const hideFieldMainPageMessage = () => {
  return {
    type: HIDE_FIELD_MAIN_PAGE_MESSAGE,
  };
};

export const showFieldMessage = message => {
  return {
    type: SHOW_FIELD_MESSAGE,
    payload: message
  };
};

export const showDeleteFieldMessage = message => {
  return {
    type: SHOW_DELETE_FIELD_MESSAGE,
    payload: message
  };
};

export const showFieldsParentPageMessage = (message) => {
  return {
    type: SHOW_FIELDS_PARENT_PAGE_MESSAGE,
    payload: message
  }
}

export const removeIndividualFieldData = () => {
  return {
    type: REMOVE_INDIVIDUAL_FIELD_DATA
  }
}