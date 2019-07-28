import {
  FETCH_ALL_GROUPS,
  FETCH_ALL_GROUPS_SUCCESS,
  FETCH_GROUPS_WITH_PAGINATION,
  FETCH_GROUPS_WITH_PAGINATION_SUCCESS,
  SEARCH_GROUPS,
  SEARCH_GROUPS_SUCCESS,
  SHOW_GROUP_MESSAGE,
  SHOW_DELETE_GROUP_MESSAGE,
  SHOW_GROUPS_PARENT_PAGE_MESSAGE,
  HIDE_GROUP_MESSAGE,
  HIDE_GROUP_DELETE_MESSAGE,
  HIDE_GROUP_MAIN_PAGE_MESSAGE,
  FETCH_INDIVIDUAL_GROUP,
  FETCH_INDIVIDUAL_GROUP_SUCCESS,
  ADD_GROUP,
  ADD_GROUP_SUCCESS,
  ON_SHOW_GROUP_LOADER,
  ON_SHOW_GROUP_DELETE_LOADER,
  ON_SHOW_GROUP_MAIN_PAGE_LOADER,
  DELETE_GROUP,
  DELETE_GROUP_SUCCESS,
  EDIT_GROUP,
  EDIT_GROUP_SUCCESS,
  EDIT_DRAFT_GROUP,
  EDIT_DRAFT_GROUP_SUCCESS,
  DELETE_GROUP_From_ViewPage,
  REMOVE_INDIVIDUAL_GROUP_DATA,
  RESET_SUCCESS_INDICATORS
} from "../constants/ActionTypes";

export const fetchGroup = obj => {
  return {
    type: FETCH_GROUPS_WITH_PAGINATION,
    payload: obj
  };
};

export const fetchGroupSuccess = group => {
  return {
    type: FETCH_GROUPS_WITH_PAGINATION_SUCCESS,
    payload: group
  };
};

export const fetchAllGroups = () => {
  return {
    type: FETCH_ALL_GROUPS
  };
};

export const fetchAllGroupsSuccess = groups => {
  return {
    type: FETCH_ALL_GROUPS_SUCCESS,
    payload: groups
  };
};

export const searchGroup = obj => {
  return {
    type: SEARCH_GROUPS,
    payload: obj
  };
};

export const searchGroupSuccess = group => {
  return {
    type: SEARCH_GROUPS_SUCCESS,
    payload: group
  };
};

export const addGroup = obj => {
  return {
    type: ADD_GROUP,
    payload: obj
  };
};

export const addGroupSuccess = obj => {
  return {
    type: ADD_GROUP_SUCCESS,
    payload: obj
  };
};

export const fetchIndividualGroup = data => {
  return {
    type: FETCH_INDIVIDUAL_GROUP,
    payload: data
  };
};

export const fetchIndividualGroupSuccess = group => {
  return {
    type: FETCH_INDIVIDUAL_GROUP_SUCCESS,
    payload: group
  };
};

export const deleteGroup = id => {
  return {
    type: DELETE_GROUP,
    payload: id
  };
};

export const deleteGroupSuccess = () => {
  return {
    type: DELETE_GROUP_SUCCESS
  };
};

export const deleteGroupFromViewPage = id => {
  return {
    type: DELETE_GROUP_From_ViewPage,
    payload: id
  };
};

export const editGroup = obj => {
  return {
    type: EDIT_GROUP,
    payload: obj
  };
};

export const editGroupSuccess = obj => {
  return {
    type: EDIT_GROUP_SUCCESS,
    payload: obj
  };
};

export const editDraftGroup = obj => {
  return {
    type: EDIT_DRAFT_GROUP,
    payload: obj
  };
};

export const editDraftGroupSuccess = obj => {
  return {
    type: EDIT_DRAFT_GROUP_SUCCESS,
    payload: obj
  };
};

export const showGroupLoader = () => {
  return {
    type: ON_SHOW_GROUP_LOADER
  };
};

export const showGroupDeleteLoader = () => {
  return {
    type: ON_SHOW_GROUP_DELETE_LOADER
  };
};

export const showGroupMainPageLoader = () => {
  return {
    type: ON_SHOW_GROUP_MAIN_PAGE_LOADER
  };
};

export const hideGroupMessage = () => {
  return {
    type: HIDE_GROUP_MESSAGE
  };
};

export const hideGroupDeleteMessage = () => {
  return {
    type: HIDE_GROUP_DELETE_MESSAGE
  };
};

export const hideGroupMainPageMessage = () => {
  return {
    type: HIDE_GROUP_MAIN_PAGE_MESSAGE
  };
};

export const showGroupMessage = message => {
  return {
    type: SHOW_GROUP_MESSAGE,
    payload: message
  };
};

export const showDeleteGroupMessage = message => {
  return {
    type: SHOW_DELETE_GROUP_MESSAGE,
    payload: message
  };
};

export const showGroupsParentPageMessage = message => {
  return {
    type: SHOW_GROUPS_PARENT_PAGE_MESSAGE,
    payload: message
  };
};

export const removeIndividualGroupData = () => {
  return {
    type: REMOVE_INDIVIDUAL_GROUP_DATA
  };
};

export const resetGroupSuccessIndicators = () => {
  return {
    type: RESET_SUCCESS_INDICATORS
  };
};
