import {
  FETCH_ALL_HIERARCHY,
  FETCH_ALL_HIERARCHY_SUCCESS,
  FETCH_HIERARCHY_WITH_PAGINATION,
  FETCH_HIERARCHY_WITH_PAGINATION_SUCCESS,
  SEARCH_HIERARCHYS,
  SEARCH_HIERARCHYS_SUCCESS,
  SHOW_HIERARCHY_MESSAGE,
  SHOW_DELETE_HIERARCHY_MESSAGE,
  SHOW_HIERARCHYS_PARENT_PAGE_MESSAGE,
  HIDE_HIERARCHY_MESSAGE,
  HIDE_HIERARCHY_DELETE_MESSAGE,
  HIDE_HIERARCHY_MAIN_PAGE_MESSAGE,
  FETCH_INDIVIDUAL_HIERARCHY,
  FETCH_INDIVIDUAL_HIERARCHY_SUCCESS,
  ADD_HIERARCHY,
  ADD_HIERARCHY_SUCCESS,
  ON_SHOW_HIERARCHY_LOADER,
  ON_SHOW_HIERARCHY_DELETE_LOADER,
  ON_SHOW_HIERARCHY_MAIN_PAGE_LOADER,
  DELETE_HIERARCHY,
  DELETE_HIERARCHY_SUCCESS,
  EDIT_HIERARCHY,
  EDIT_HIERARCHY_SUCCESS,  
  DELETE_HIERARCHY_From_ViewPage,
  REMOVE_INDIVIDUAL_HIERARCHY_DATA,
  GET_HIERARCHY_TYPES,
  GET_HIERARCHY_TYPES_SUCCESS,
  GET_HIERARCHY_TYPES_NAME,
  GET_HIERARCHY_TYPES_NAME_SUCCESS
} from "../constants/ActionTypes";

export const fetchAllHierarchy = obj => {
  return {
    type: FETCH_ALL_HIERARCHY,
    payload: obj
  };
};


export const fetchAllHierarchySuccess = hierarchy => {
  return {
    type: FETCH_ALL_HIERARCHY_SUCCESS,
    payload: hierarchy
  };
};
export const fetchHierarchy = obj => {
  return {
    type: FETCH_HIERARCHY_WITH_PAGINATION,
    payload: obj
  };
};

export const fetchHierarchySuccess = group => {
  return {
    type: FETCH_HIERARCHY_WITH_PAGINATION_SUCCESS,
    payload: group
  };
};
export const searchHierarchy = obj => {
  return {
    type: SEARCH_HIERARCHYS,
    payload: obj
  };
};

export const searchHierarchySuccess = hierarchy => {
  return {
    type: SEARCH_HIERARCHYS_SUCCESS,
    payload: hierarchy
  };
};

export const addHierarchy = obj => {
  return {
    type: ADD_HIERARCHY,
    payload: obj
  };
};
export const addHierarchySuccess = obj => {
  return {
    type: ADD_HIERARCHY_SUCCESS,
    payload: obj
  };
};

export const fetchIndividualHierarchy = data => {
  return {
    type: FETCH_INDIVIDUAL_HIERARCHY,
    payload: data
  };
};

export const fetchIndividualHierarchySuccess = hierarchy => {
  return {
    type: FETCH_INDIVIDUAL_HIERARCHY_SUCCESS,
    payload: hierarchy
  };
};

export const deleteHierarchy = id => {
  return {
    type: DELETE_HIERARCHY,
    payload: id
  };
};

export const deleteHierarchySuccess = () => {
  return {
    type: DELETE_HIERARCHY_SUCCESS
  };
};


export const deleteHierarchyFromViewPage = id => {
  return {
    type: DELETE_HIERARCHY_From_ViewPage,
    payload: id
  };
};
 
  export const editHierarchy = obj => {
    return {
      type: EDIT_HIERARCHY,
      payload: obj
    };
  };
  

  export const editHierarchySuccess = obj => {
    return {
      type: EDIT_HIERARCHY_SUCCESS,
      payload: obj
    };
  };
  

  export const showHierarchyLoader = () => {
    return {
        type: ON_SHOW_HIERARCHY_LOADER,
    };
  };

  
  export const showHierarchyDeleteLoader = () => {
    return {
        type: ON_SHOW_HIERARCHY_DELETE_LOADER,
    };
  };

  export const showHierarchyMainPageLoader = () => {
    return {
        type: ON_SHOW_HIERARCHY_MAIN_PAGE_LOADER,
    };
  };



  export const hideHierarchyMessage = () => {
    return {
        type: HIDE_HIERARCHY_MESSAGE,
    };
  };

  export const hideHierarchyDeleteMessage = () => {
    return {
        type: HIDE_HIERARCHY_DELETE_MESSAGE,
    };
  };

  export const hideHierarchyMainPageMessage = () => {
    return {
        type: HIDE_HIERARCHY_MAIN_PAGE_MESSAGE,
    };
  };


  export const showHierarchyMessage = message => {
    return {
      type: SHOW_HIERARCHY_MESSAGE,
      payload: message
    };
  };
  export const showDeleteHierarchyMessage = message => {
    return {
      type: SHOW_DELETE_HIERARCHY_MESSAGE,
      payload: message
    };
  };
  export const showHierarchysParentPageMessage = (message) => {
    return {
      type: SHOW_HIERARCHYS_PARENT_PAGE_MESSAGE,
      payload: message
    }
  }

  export const removeIndividualHierarchyData = () => {
    return {
      type: REMOVE_INDIVIDUAL_HIERARCHY_DATA
    }
  }

  export const getHierarchyTypes = (data) => {
    return {
      type: GET_HIERARCHY_TYPES,
      payload: data
    };
  };

  export const getHierarchyTypesSuccess = hierarchyTypes => {
    return {
      type: GET_HIERARCHY_TYPES_SUCCESS,
      payload: hierarchyTypes
    }
  }

  export const getHierarchyTypesName = obj => {
    return {
      type: GET_HIERARCHY_TYPES_NAME,
      payload: obj
    };
  };

  export const getHierarchyTypesNameSuccess = hierarchyTypesNames => {
    return {
      type: GET_HIERARCHY_TYPES_NAME_SUCCESS,
      payload: hierarchyTypesNames
    }
  }

