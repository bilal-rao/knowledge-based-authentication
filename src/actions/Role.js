import {
  FETCH_ALL_ROLES,
  FETCH_ALL_ROLES_SUCCESS,
  FETCH_ROLES_WITH_PAGINATION,
  FETCH_ROLES_WITH_PAGINATION_SUCCESS,
  SEARCH_ROLES,
  SEARCH_ROLES_SUCCESS,
  SHOW_ROLE_MESSAGE,
  SHOW_DELETE_ROLE_MESSAGE,
  SHOW_ROLES_PARENT_PAGE_MESSAGE,
  HIDE_ROLE_MESSAGE,
  HIDE_ROLE_DELETE_MESSAGE,
  HIDE_ROLE_MAIN_PAGE_MESSAGE,
  FETCH_INDIVIDUAL_ROLE,
  FETCH_INDIVIDUAL_ROLE_SUCCESS,
  ADD_ROLE,
  ADD_ROLE_SUCCESS,
  ON_SHOW_ROLE_LOADER,
  ON_SHOW_ROLE_DELETE_LOADER,
  ON_SHOW_ROLE_MAIN_PAGE_LOADER,
  DELETE_ROLE,
  DELETE_ROLE_SUCCESS,
  EDIT_ROLE,
  EDIT_ROLE_SUCCESS,
  DELETE_ROLE_From_ViewPage,
  REMOVE_INDIVIDUAL_ROLE_DATA,
  FETCH_ALL_MODULES,
  FETCH_ALL_MODULES_SUCCESS
} from "../constants/ActionTypes";

export const fetchRole = obj => {
  return {
    type: FETCH_ROLES_WITH_PAGINATION,
    payload: obj
  };
};

export const fetchRoleSuccess = role => {
  return {
    type: FETCH_ROLES_WITH_PAGINATION_SUCCESS,
    payload: role
  };
};
export const fetchAllRoles = () => {
  return {
    type: FETCH_ALL_ROLES,
  };
};

export const fetchAllRolesSuccess = roles => {
  return {
    type: FETCH_ALL_ROLES_SUCCESS,
    payload: roles
  };
};

export const searchRole = obj => {
  return {
    type: SEARCH_ROLES,
    payload: obj
  };
};

export const searchRoleSuccess = role => {
  return {
    type: SEARCH_ROLES_SUCCESS,
    payload: role
  };
};

export const addRole = obj => {
  return {
    type: ADD_ROLE,
    payload: obj
  };
};
export const addRoleSuccess = obj => {
  return {
    type: ADD_ROLE_SUCCESS,
    payload: obj
  };
};

export const fetchIndividualRole = data => {
  return {
    type: FETCH_INDIVIDUAL_ROLE,
    payload: data
  };
};

export const fetchIndividualRoleSuccess = role => {
  return {
    type: FETCH_INDIVIDUAL_ROLE_SUCCESS,
    payload: role
  };
};

export const deleteRole = id => {
  return {
    type: DELETE_ROLE,
    payload: id
  };
};

export const deleteRoleSuccess = () => {
  return {
    type: DELETE_ROLE_SUCCESS
  };
};


export const deleteRoleFromViewPage = id => {
  return {
    type: DELETE_ROLE_From_ViewPage,
    payload: id
  };
};

export const editRole = obj => {
  return {
    type: EDIT_ROLE,
    payload: obj
  };
};


export const editRoleSuccess = obj => {
  return {
    type: EDIT_ROLE_SUCCESS,
    payload: obj
  };
};


export const showRoleLoader = () => {
  return {
    type: ON_SHOW_ROLE_LOADER,
  };
};


export const showRoleDeleteLoader = () => {
  return {
    type: ON_SHOW_ROLE_DELETE_LOADER,
  };
};

export const showRoleMainPageLoader = () => {
  return {
    type: ON_SHOW_ROLE_MAIN_PAGE_LOADER,
  };
};



export const hideRoleMessage = () => {
  return {
    type: HIDE_ROLE_MESSAGE,
  };
};

export const hideRoleDeleteMessage = () => {
  return {
    type: HIDE_ROLE_DELETE_MESSAGE,
  };
};

export const hideRoleMainPageMessage = () => {
  return {
    type: HIDE_ROLE_MAIN_PAGE_MESSAGE,
  };
};


export const showRoleMessage = message => {
  return {
    type: SHOW_ROLE_MESSAGE,
    payload: message
  };
};
export const showDeleteRoleMessage = message => {
  return {
    type: SHOW_DELETE_ROLE_MESSAGE,
    payload: message
  };
};
export const showRolesParentPageMessage = (message) => {
  return {
    type: SHOW_ROLES_PARENT_PAGE_MESSAGE,
    payload: message
  }
}

export const removeIndividualRoleData = () => {
  return {
    type: REMOVE_INDIVIDUAL_ROLE_DATA
  }
}


//Work For Modules

export const fetchAllModules = () => {
  return {
    type: FETCH_ALL_MODULES,
  };
};

export const fetchAllModulesSuccess = modules => {
  return {
    type: FETCH_ALL_MODULES_SUCCESS,
    payload: modules
  };
};
