import {
  FETCH_ALL_DEPARTMENTS,
  FETCH_ALL_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENTS_WITH_PAGINATION,
  FETCH_DEPARTMENTS_WITH_PAGINATION_SUCCESS,
  SEARCH_DEPARTMENTS,
  SEARCH_DEPARTMENTS_SUCCESS,
  SHOW_DEPARTMENT_MESSAGE,
  SHOW_DELETE_DEPARTMENT_MESSAGE,
  SHOW_DEPARTMENTS_PARENT_PAGE_MESSAGE,
  HIDE_DEPARTMENT_MESSAGE,
  HIDE_DEPARTMENT_DELETE_MESSAGE,
  HIDE_DEPARTMENT_MAIN_PAGE_MESSAGE,
  FETCH_INDIVIDUAL_DEPARTMENT,
  FETCH_INDIVIDUAL_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT,
  ADD_DEPARTMENT_SUCCESS,
  ON_SHOW_DEPARTMENT_LOADER,
  ON_SHOW_DEPARTMENT_DELETE_LOADER,
  ON_SHOW_DEPARTMENT_MAIN_PAGE_LOADER,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_SUCCESS,
  EDIT_DEPARTMENT,
  EDIT_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_From_ViewPage,
  REMOVE_INDIVIDUAL_DEPARTMENT_DATA,
  RESET_SUCCESS_INDICATORS
} from "../constants/ActionTypes";

export const fetchDepartment = obj => {
  return {
    type: FETCH_DEPARTMENTS_WITH_PAGINATION,
    payload: obj
  };
};

export const fetchDepartmentSuccess = department => {
  return {
    type: FETCH_DEPARTMENTS_WITH_PAGINATION_SUCCESS,
    payload: department
  };
};
export const fetchAllDepartments = () => {
  return {
    type: FETCH_ALL_DEPARTMENTS,
  };
};

export const fetchAllDepartmentsSuccess = departments => {
  return {
    type: FETCH_ALL_DEPARTMENTS_SUCCESS,
    payload: departments
  };
};

export const searchDepartment = obj => {
  return {
    type: SEARCH_DEPARTMENTS,
    payload: obj
  };
};

export const searchDepartmentSuccess = department => {
  return {
    type: SEARCH_DEPARTMENTS_SUCCESS,
    payload: department
  };
};

export const addDepartment = obj => {
  return {
    type: ADD_DEPARTMENT,
    payload: obj
  };
};
export const addDepartmentSuccess = obj => {
  return {
    type: ADD_DEPARTMENT_SUCCESS,
    payload: obj
  };
};

export const fetchIndividualDepartment = data => {
  return {
    type: FETCH_INDIVIDUAL_DEPARTMENT,
    payload: data
  };
};

export const fetchIndividualDepartmentSuccess = department => {
  return {
    type: FETCH_INDIVIDUAL_DEPARTMENT_SUCCESS,
    payload: department
  };
};

export const deleteDepartment = id => {
  return {
    type: DELETE_DEPARTMENT,
    payload: id
  };
};

export const deleteDepartmentSuccess = () => {
  return {
    type: DELETE_DEPARTMENT_SUCCESS
  };
};


export const deleteDepartmentFromViewPage = id => {
  return {
    type: DELETE_DEPARTMENT_From_ViewPage,
    payload: id
  };
};

export const editDepartment = obj => {
  return {
    type: EDIT_DEPARTMENT,
    payload: obj
  };
};


export const editDepartmentSuccess = obj => {
  return {
    type: EDIT_DEPARTMENT_SUCCESS,
    payload: obj
  };
};


export const showDepartmentLoader = () => {
  return {
    type: ON_SHOW_DEPARTMENT_LOADER,
  };
};


export const showDepartmentDeleteLoader = () => {
  return {
    type: ON_SHOW_DEPARTMENT_DELETE_LOADER,
  };
};

export const showDepartmentMainPageLoader = () => {
  return {
    type: ON_SHOW_DEPARTMENT_MAIN_PAGE_LOADER,
  };
};



export const hideDepartmentMessage = () => {
  return {
    type: HIDE_DEPARTMENT_MESSAGE,
  };
};

export const hideDepartmentDeleteMessage = () => {
  return {
    type: HIDE_DEPARTMENT_DELETE_MESSAGE,
  };
};

export const hideDepartmentMainPageMessage = () => {
  return {
    type: HIDE_DEPARTMENT_MAIN_PAGE_MESSAGE,
  };
};


export const showDepartmentMessage = message => {
  return {
    type: SHOW_DEPARTMENT_MESSAGE,
    payload: message
  };
};
export const showDeleteDepartmentMessage = message => {
  return {
    type: SHOW_DELETE_DEPARTMENT_MESSAGE,
    payload: message
  };
};
export const showDepartmentsParentPageMessage = (message) => {
  return {
    type: SHOW_DEPARTMENTS_PARENT_PAGE_MESSAGE,
    payload: message
  }
}

export const removeIndividualDepartmentData = () => {
  return {
    type: REMOVE_INDIVIDUAL_DEPARTMENT_DATA
  }
}

export const resetDepartmentSuccessIndicators = () => {
  return {
    type: RESET_SUCCESS_INDICATORS
  };
};