import {
    FETCH_ALL_BANKS,
    FETCH_ALL_BANKS_SUCCESS,
    FETCH_BANKS_WITH_PAGINATION,
    FETCH_BANKS_WITH_PAGINATION_SUCCESS,
    SEARCH_BANKS,
    SEARCH_BANKS_SUCCESS,
    SHOW_BANK_MESSAGE,
    SHOW_DELETE_BANK_MESSAGE,
    SHOW_BANKS_PARENT_PAGE_MESSAGE,
    HIDE_BANK_MESSAGE,
    HIDE_BANK_DELETE_MESSAGE,
    HIDE_BANK_MAIN_PAGE_MESSAGE,
    FETCH_INDIVIDUAL_BANK,
    FETCH_INDIVIDUAL_BANK_SUCCESS,
    ADD_BANK,
    ADD_BANK_SUCCESS,
    ON_SHOW_BANK_LOADER,
    ON_SHOW_BANK_DELETE_LOADER,
    ON_SHOW_BANK_MAIN_PAGE_LOADER,
    DELETE_BANK,
    DELETE_BANK_SUCCESS,
    EDIT_BANK,
    EDIT_BANK_SUCCESS,
    DELETE_BANK_From_ViewPage,
    REMOVE_INDIVIDUAL_BANK_DATA
  } from "../constants/ActionTypes";
  
  export const fetchBank = obj => {
    return {
      type: FETCH_BANKS_WITH_PAGINATION,
      payload: obj
    };
  };
  
  export const fetchBankSuccess = bank => {
    return {
      type: FETCH_BANKS_WITH_PAGINATION_SUCCESS,
      payload: bank
    };
  };
  export const fetchAllBanks = () => {
    return {
      type: FETCH_ALL_BANKS,
    };
  };
  
  export const fetchAllBanksSuccess = banks => {
    return {
      type: FETCH_ALL_BANKS_SUCCESS,
      payload: banks
    };
  };
  
  export const searchBank = obj => {
    return {
      type: SEARCH_BANKS,
      payload: obj
    };
  };
  
  export const searchBankSuccess = bank => {
    return {
      type: SEARCH_BANKS_SUCCESS,
      payload: bank
    };
  };
  
  export const addBank = obj => {
    return {
      type: ADD_BANK,
      payload: obj
    };
  };
  export const addBankSuccess = obj => {
    return {
      type: ADD_BANK_SUCCESS,
      payload: obj
    };
  };
  
  export const fetchIndividualBank = data => {
    return {
      type: FETCH_INDIVIDUAL_BANK,
      payload: data
    };
  };
  
  export const fetchIndividualBankSuccess = bank => {
    return {
      type: FETCH_INDIVIDUAL_BANK_SUCCESS,
      payload: bank
    };
  };
  
  export const deleteBank = id => {
    return {
      type: DELETE_BANK,
      payload: id
    };
  };
  
  export const deleteBankSuccess = () => {
    return {
      type: DELETE_BANK_SUCCESS
    };
  };
  
  
  export const deleteBankFromViewPage = id => {
    return {
      type: DELETE_BANK_From_ViewPage,
      payload: id
    };
  };
  
  export const editBank = obj => {
    return {
      type: EDIT_BANK,
      payload: obj
    };
  };
  
  
  export const editBankSuccess = obj => {
    return {
      type: EDIT_BANK_SUCCESS,
      payload: obj
    };
  };
  
  
  export const showBankLoader = () => {
    return {
      type: ON_SHOW_BANK_LOADER,
    };
  };
  
  
  export const showBankDeleteLoader = () => {
    return {
      type: ON_SHOW_BANK_DELETE_LOADER,
    };
  };
  
  export const showBankMainPageLoader = () => {
    return {
      type: ON_SHOW_BANK_MAIN_PAGE_LOADER,
    };
  };
  
  
  
  export const hideBankMessage = () => {
    return {
      type: HIDE_BANK_MESSAGE,
    };
  };
  
  export const hideBankDeleteMessage = () => {
    return {
      type: HIDE_BANK_DELETE_MESSAGE,
    };
  };
  
  export const hideBankMainPageMessage = () => {
    return {
      type: HIDE_BANK_MAIN_PAGE_MESSAGE,
    };
  };
  
  
  export const showBankMessage = message => {
    return {
      type: SHOW_BANK_MESSAGE,
      payload: message
    };
  };
  export const showDeleteBankMessage = message => {
    return {
      type: SHOW_DELETE_BANK_MESSAGE,
      payload: message
    };
  };
  export const showBanksParentPageMessage = (message) => {
    return {
      type: SHOW_BANKS_PARENT_PAGE_MESSAGE,
      payload: message
    }
  }
  
  export const removeIndividualBankData = () => {
    return {
      type: REMOVE_INDIVIDUAL_BANK_DATA
    }
  }