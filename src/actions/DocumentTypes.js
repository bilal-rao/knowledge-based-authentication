import {
  FETCH_ALL_DOCUMENT_TYPES,
  FETCH_ALL_DOCUMENT_TYPES_SUCCESS,
  FETCH_DOCUMENT_TYPES_WITH_PAGINATION,
  FETCH_DOCUMENT_TYPES_WITH_PAGINATION_SUCCESS,
  SEARCH_DOCUMENT_TYPES,
  SEARCH_DOCUMENT_TYPES_SUCCESS,
  SHOW_DOCUMENT_TYPE_MESSAGE,
  SHOW_DELETE_DOCUMENT_TYPE_MESSAGE,
  SHOW_DOCUMENT_TYPES_PARENT_PAGE_MESSAGE,
  HIDE_DOCUMENT_TYPE_MESSAGE,
  HIDE_DOCUMENT_TYPE_DELETE_MESSAGE,
  HIDE_DOCUMENT_TYPE_MAIN_PAGE_MESSAGE,
  FETCH_INDIVIDUAL_DOCUMENT_TYPE,
  FETCH_INDIVIDUAL_DOCUMENT_TYPE_SUCCESS,
  ADD_DOCUMENT_TYPE,
  ADD_DOCUMENT_TYPE_SUCCESS,
  ON_SHOW_DOCUMENT_TYPE_LOADER,
  ON_SHOW_DOCUMENT_TYPE_DELETE_LOADER,
  ON_SHOW_DOCUMENT_TYPE_MAIN_PAGE_LOADER,
  DELETE_DOCUMENT_TYPE,
  DELETE_DOCUMENT_TYPE_SUCCESS,
  EDIT_DOCUMENT_TYPE,
  EDIT_DOCUMENT_TYPE_SUCCESS,
  DELETE_DOCUMENT_TYPE_From_ViewPage,
  REMOVE_INDIVIDUAL_DOCUMENT_TYPE_DATA
} from "../constants/ActionTypes";

export const fetchDocumentType = obj => {
  return {
    type: FETCH_DOCUMENT_TYPES_WITH_PAGINATION,
    payload: obj
  };
};

export const fetchDocumentTypeSuccess = documentType => {
  return {
    type: FETCH_DOCUMENT_TYPES_WITH_PAGINATION_SUCCESS,
    payload: documentType
  };
};
export const fetchAllDocumentTypes = () => {
  return {
    type: FETCH_ALL_DOCUMENT_TYPES,
  };
};

export const fetchAllDocumentTypesSuccess = documentTypes => {
  return {
    type: FETCH_ALL_DOCUMENT_TYPES_SUCCESS,
    payload: documentTypes
  };
};

export const searchDocumentType = obj => {
  return {
    type: SEARCH_DOCUMENT_TYPES,
    payload: obj
  };
};

export const searchDocumentTypeSuccess = documentType => {
  return {
    type: SEARCH_DOCUMENT_TYPES_SUCCESS,
    payload: documentType
  };
};

export const addDocumentType = obj => {
  return {
    type: ADD_DOCUMENT_TYPE,
    payload: obj
  };
};
export const addDocumentTypeSuccess = obj => {
  return {
    type: ADD_DOCUMENT_TYPE_SUCCESS,
    payload: obj
  };
};

export const fetchIndividualDocumentType = data => {
  return {
    type: FETCH_INDIVIDUAL_DOCUMENT_TYPE,
    payload: data
  };
};

export const fetchIndividualDocumentTypeSuccess = documentType => {
  return {
    type: FETCH_INDIVIDUAL_DOCUMENT_TYPE_SUCCESS,
    payload: documentType
  };
};

export const deleteDocumentType = id => {
  return {
    type: DELETE_DOCUMENT_TYPE,
    payload: id
  };
};

export const deleteDocumentTypeSuccess = () => {
  return {
    type: DELETE_DOCUMENT_TYPE_SUCCESS
  };
};


export const deleteDocumentTypeFromViewPage = id => {
  return {
    type: DELETE_DOCUMENT_TYPE_From_ViewPage,
    payload: id
  };
};

export const editDocumentType = obj => {
  return {
    type: EDIT_DOCUMENT_TYPE,
    payload: obj
  };
};


export const editDocumentTypeSuccess = obj => {
  return {
    type: EDIT_DOCUMENT_TYPE_SUCCESS,
    payload: obj
  };
};


export const showDocumentTypeLoader = () => {
  return {
    type: ON_SHOW_DOCUMENT_TYPE_LOADER,
  };
};


export const showDocumentTypeDeleteLoader = () => {
  return {
    type: ON_SHOW_DOCUMENT_TYPE_DELETE_LOADER,
  };
};

export const showDocumentTypeMainPageLoader = () => {
  return {
    type: ON_SHOW_DOCUMENT_TYPE_MAIN_PAGE_LOADER,
  };
};



export const hideDocumentTypeMessage = () => {
  return {
    type: HIDE_DOCUMENT_TYPE_MESSAGE,
  };
};

export const hideDocumentTypeDeleteMessage = () => {
  return {
    type: HIDE_DOCUMENT_TYPE_DELETE_MESSAGE,
  };
};

export const hideDocumentTypeMainPageMessage = () => {
  return {
    type: HIDE_DOCUMENT_TYPE_MAIN_PAGE_MESSAGE,
  };
};


export const showDocumentTypeMessage = message => {
  return {
    type: SHOW_DOCUMENT_TYPE_MESSAGE,
    payload: message
  };
};
export const showDeleteDocumentTypeMessage = message => {
  return {
    type: SHOW_DELETE_DOCUMENT_TYPE_MESSAGE,
    payload: message
  };
};
export const showDocumentTypesParentPageMessage = (message) => {
  return {
    type: SHOW_DOCUMENT_TYPES_PARENT_PAGE_MESSAGE,
    payload: message
  }
}

export const removeIndividualDocumentTypeData = () => {
  return {
    type: REMOVE_INDIVIDUAL_DOCUMENT_TYPE_DATA
  }
}