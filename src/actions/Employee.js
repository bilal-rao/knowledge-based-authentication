import {
  FETCH_ALL_USER,
  FETCH_ALL_USER_SUCCESS,
  SEARCH_USERS,
  SEARCH_USERS_SUCCESS,
  SHOW_USER_MESSAGE,
  SHOW_DELETE_USER_MESSAGE,
  SHOW_USERS_PARENT_PAGE_MESSAGE,
  HIDE_USER_MESSAGE,
  HIDE_USER_DELETE_MESSAGE,
  HIDE_USER_MAIN_PAGE_MESSAGE,
  FETCH_INDIVIDUAL_USER,
  FETCH_INDIVIDUAL_USER_SUCCESS,
  ADD_USER,
  ADD_USER_SUCCESS,
  ON_SHOW_USER_LOADER,
  ON_SHOW_USER_DELETE_LOADER,
  ON_SHOW_USER_MAIN_PAGE_LOADER,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_DRAFT_USER,
  EDIT_DRAFT_USER_SUCCESS,
  DELETE_USER_From_ViewPage,
  REMOVE_INDIVIDUAL_USER_DATA,
  RESET_SUCCESS_INDICATORS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
} from "../constants/ActionTypes";

export const fetchUser = obj => {
  return {
    type: FETCH_ALL_USER,
    payload: obj
  };
};

export const fetchUserSuccess = user => {
  return {
    type: FETCH_ALL_USER_SUCCESS,
    payload: user
  };
};

export const searchUser = obj => {
  return {
    type: SEARCH_USERS,
    payload: obj
  };
};

export const searchUserSuccess = user => {
  return {
    type: SEARCH_USERS_SUCCESS,
    payload: user
  };
};

export const addUser = obj => {
  return {
    type: ADD_USER,
    payload: obj
  };
};

export const addUserSuccess = obj => {
  return {
    type: ADD_USER_SUCCESS,
    payload: obj
  };
};

export const fetchIndividualUser = data => {
  return {
    type: FETCH_INDIVIDUAL_USER,
    payload: data
  };
};

export const fetchIndividualUserSuccess = user => {
  return {
    type: FETCH_INDIVIDUAL_USER_SUCCESS,
    payload: user
  };
};

export const deleteUser = id => {
  return {
    type: DELETE_USER,
    payload: id
  };
};

export const deleteUserSuccess = () => {
  return {
    type: DELETE_USER_SUCCESS
  };
};

export const deleteUserFromViewPage = id => {
  return {
    type: DELETE_USER_From_ViewPage,
    payload: id
  };
};

export const editUser = obj => {
  return {
    type: EDIT_USER,
    payload: obj
  };
};

export const editUserSuccess = obj => {
  return {
    type: EDIT_USER_SUCCESS,
    payload: obj
  };
};

export const editDraftUser = obj => {
  return {
    type: EDIT_DRAFT_USER,
    payload: obj
  };
};

export const editDraftUserSuccess = obj => {
  return {
    type: EDIT_DRAFT_USER_SUCCESS,
    payload: obj
  };
};

export const showUserLoader = () => {
  return {
    type: ON_SHOW_USER_LOADER
  };
};

export const showUserDeleteLoader = () => {
  return {
    type: ON_SHOW_USER_DELETE_LOADER
  };
};

export const showUserMainPageLoader = () => {
  return {
    type: ON_SHOW_USER_MAIN_PAGE_LOADER
  };
};

export const hideUserMessage = () => {
  return {
    type: HIDE_USER_MESSAGE
  };
};

export const hideUserDeleteMessage = () => {
  return {
    type: HIDE_USER_DELETE_MESSAGE
  };
};

export const hideUserMainPageMessage = () => {
  return {
    type: HIDE_USER_MAIN_PAGE_MESSAGE
  };
};

export const showUserMessage = message => {
  return {
    type: SHOW_USER_MESSAGE,
    payload: message
  };
};

export const showDeleteUserMessage = message => {
  return {
    type: SHOW_DELETE_USER_MESSAGE,
    payload: message
  };
};

export const showUsersParentPageMessage = message => {
  return {
    type: SHOW_USERS_PARENT_PAGE_MESSAGE,
    payload: message
  };
};

export const removeIndividualUserData = () => {
  return {
    type: REMOVE_INDIVIDUAL_USER_DATA
  };
};

export const changePassword = obj => {
  return {
    type: CHANGE_PASSWORD,
    payload: obj
  };
};

export const changePasswordSuccess = obj => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: obj
  };
};

export const resetUserSuccessIndicators = () => {
  return {
    type: RESET_SUCCESS_INDICATORS
  };
};
