import {
    FETCH_ALL_DISCREPANCY,
    FETCH_ALL_DISCREPANCY_SUCCESS,
    FETCH_DISCREPANCY_WITH_PAGINATION,
    FETCH_DISCREPANCY_WITH_PAGINATION_SUCCESS,
    SEARCH_DISCREPANCIES,
    SEARCH_DISCREPANCIES_SUCCESS,
    SHOW_DISCREPANCY_MESSAGE,
    SHOW_DELETE_DISCREPANCY_MESSAGE,
    SHOW_DISCREPANCIES_PARENT_PAGE_MESSAGE,
    HIDE_DISCREPANCY_MESSAGE,
    HIDE_DISCREPANCY_DELETE_MESSAGE,
    HIDE_DISCREPANCY_MAIN_PAGE_MESSAGE,
    FETCH_INDIVIDUAL_DISCREPANCY,
    FETCH_INDIVIDUAL_DISCREPANCY_SUCCESS,
    ADD_DISCREPANCY,
    ADD_DISCREPANCY_SUCCESS,
    ON_SHOW_DISCREPANCY_LOADER,
    ON_SHOW_DISCREPANCY_DELETE_LOADER,
    ON_SHOW_DISCREPANCY_MAIN_PAGE_LOADER,
    DELETE_DISCREPANCY,
    DELETE_DISCREPANCY_SUCCESS,
    EDIT_DISCREPANCY,
    EDIT_DISCREPANCY_SUCCESS,
    EDIT_DRAFT_DISCREPANCY,
    EDIT_DRAFT_DISCREPANCY_SUCCESS,
    DELETE_DISCREPANCY_From_ViewPage,
    REMOVE_INDIVIDUAL_DISCREPANCY_DATA
  } from "../constants/ActionTypes";
  
  export const fetchDiscrepancy = obj => {
    return {
      type: FETCH_DISCREPANCY_WITH_PAGINATION,
      payload: obj
    };
  };
  
  export const fetchDiscrepancySuccess = discrepancy => {
    return {
      type: FETCH_DISCREPANCY_WITH_PAGINATION_SUCCESS,
      payload: discrepancy
    };
  };
  
  export const fetchAllDiscrepancy = () => {
    return {
      type: FETCH_ALL_DISCREPANCY,
    };
  };
  
  export const fetchAllDiscrepancySuccess = discrepancies => {
    return {
      type: FETCH_ALL_DISCREPANCY_SUCCESS,
      payload: discrepancies
    };
  };
  
  export const searchDiscrepancy = obj => {
    return {
      type: SEARCH_DISCREPANCIES,
      payload: obj
    };
  };
  
  export const searchDiscrepancySuccess = discrepancy => {
    return {
      type: SEARCH_DISCREPANCIES_SUCCESS,
      payload: discrepancy
    };
  };
  
  export const addDiscrepancy = obj => {
    return {
      type: ADD_DISCREPANCY,
      payload: obj
    };
  };
  
  export const addDiscrepancySuccess = obj => {
    return {
      type: ADD_DISCREPANCY_SUCCESS,
      payload: obj
    };
  };
  
  export const fetchIndividualDiscrepancy = data => {
    return {
      type: FETCH_INDIVIDUAL_DISCREPANCY,
      payload: data
    };
  };
  
  export const fetchIndividualDiscrepancySuccess = discrepancy => {
    return {
      type: FETCH_INDIVIDUAL_DISCREPANCY_SUCCESS,
      payload: discrepancy
    };
  };
  
  export const deleteDiscrepancy = id => {
    return {
      type: DELETE_DISCREPANCY,
      payload: id
    };
  };
  
  export const deleteDiscrepancySuccess = () => {
    return {
      type: DELETE_DISCREPANCY_SUCCESS
    };
  };
  
  export const deleteDiscrepancyFromViewPage = id => {
    return {
      type: DELETE_DISCREPANCY_From_ViewPage,
      payload: id
    };
  };
  
  export const editDiscrepancy = obj => {
    return {
      type: EDIT_DISCREPANCY,
      payload: obj
    };
  };
  
  export const editDiscrepancySuccess = obj => {
    return {
      type: EDIT_DISCREPANCY_SUCCESS,
      payload: obj
    };
  };
  
  export const editDraftDiscrepancy = obj => {
    return {
      type: EDIT_DRAFT_DISCREPANCY,
      payload: obj
    };
  };
  
  export const editDraftDiscrepancySuccess = obj => {
    return {
      type: EDIT_DRAFT_DISCREPANCY_SUCCESS,
      payload: obj
    };
  };
  
  export const showDiscrepancyLoader = () => {
    return {
      type: ON_SHOW_DISCREPANCY_LOADER,
    };
  };
  
  export const showDiscrepancyDeleteLoader = () => {
    return {
      type: ON_SHOW_DISCREPANCY_DELETE_LOADER,
    };
  };
  
  export const showDiscrepancyMainPageLoader = () => {
    return {
      type: ON_SHOW_DISCREPANCY_MAIN_PAGE_LOADER,
    };
  };
  
  export const hideDiscrepancyMessage = () => {
    return {
      type: HIDE_DISCREPANCY_MESSAGE,
    };
  };
  
  export const hideDiscrepancyDeleteMessage = () => {
    return {
      type: HIDE_DISCREPANCY_DELETE_MESSAGE,
    };
  };
  
  export const hideDiscrepancyMainPageMessage = () => {
    return {
      type: HIDE_DISCREPANCY_MAIN_PAGE_MESSAGE,
    };
  };
  
  export const showDiscrepancyMessage = message => {
    return {
      type: SHOW_DISCREPANCY_MESSAGE,
      payload: message
    };
  };
  
  export const showDeleteDiscrepancyMessage = message => {
    return {
      type: SHOW_DELETE_DISCREPANCY_MESSAGE,
      payload: message
    };
  };
  
  export const showDiscrepanciesParentPageMessage = (message) => {
    return {
      type: SHOW_DISCREPANCIES_PARENT_PAGE_MESSAGE,
      payload: message
    }
  }
  
  export const removeIndividualDiscrepancyData = () => {
    return {
      type: REMOVE_INDIVIDUAL_DISCREPANCY_DATA
    }
  }