import {
    FETCH_ALL_BANKS_SUCCESS,
    FETCH_BANKS_WITH_PAGINATION_SUCCESS,
    SEARCH_BANKS_SUCCESS,
    FETCH_INDIVIDUAL_BANK_SUCCESS,
    SHOW_BANK_MESSAGE,
    SHOW_BANKS_PARENT_PAGE_MESSAGE,
    HIDE_BANK_MESSAGE,
    HIDE_BANK_MAIN_PAGE_MESSAGE,
    ON_SHOW_BANK_LOADER,
    ON_SHOW_BANK_MAIN_PAGE_LOADER,
    ADD_BANK_SUCCESS,
    DELETE_BANK_SUCCESS,
    ON_SHOW_BANK_DELETE_LOADER,
    SHOW_DELETE_BANK_MESSAGE,
    HIDE_BANK_DELETE_MESSAGE,
    EDIT_BANK_SUCCESS,
    REMOVE_INDIVIDUAL_BANK_DATA
  } from "../constants/ActionTypes";
  
  const INIT_STATE = {
    loader: false,
    mainLoader: false,
    banksList: "",
    allBanks: null,
    addBank: null,
    editBank: null,
    individualBankData: null,
    alertMessage: "",
    showMessage: false,
    showMainPageMessage: false,
    alertMainPageMessage: "",
    bankListSuccess: false,
    deleteBankSuccess: false,
    editBankError: false,
    bankDetailSuccess: false,
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_BANKS_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          deleteBankLoader: false,
          bankListSuccess: true,
          allBanks: action.payload,
          rowsDelete: [],
          isSort: false,
          individualBankData: null,
          addBank: null,
          showMessage: false,
          alertMessage: "",
          showMainPageMessage: false,
          alertMainPageMessage: "",
          editBank: null,
          deleteBankSuccess: false
        };
      }
      case FETCH_BANKS_WITH_PAGINATION_SUCCESS: {
        return {
          ...state,
          loader: false,
          mainLoader: false,
          bankListSuccess: true,
          addBank: null,
          banksList: action.payload,
          allBanks: null,
          rowsDelete: [],
          isSort: false,
          deleteBank: false,
          individualBankData: null,
          editBank: null,
          deleteBankSuccess: false,
        };
      }
  
      case SHOW_BANKS_PARENT_PAGE_MESSAGE: {
        return {
          ...state,
          mainLoader: false,
          alertMainPageMessage: action.payload,
          showMainPageMessage: true,
          alertMessage: "",
          showMessage: false,
          deleteBankSuccess: false
        }
      }
      case SEARCH_BANKS_SUCCESS: {
        return {
          ...state,
          loader: false,
          bankListSuccess: true,
          banksList: action.payload,
          rowsDelete: [],
          isSort: false,
          deleteBankLoader: false,
          deleteBankSuccess: false,
          individualBankData: null,
        };
      }
      case FETCH_INDIVIDUAL_BANK_SUCCESS: {
        return {
          ...state,
          individualBankData: action.payload,
          deleteBankSuccess: false,
          bankDetailSuccess: true,
          loader: false
        };
      }
      case ADD_BANK_SUCCESS: {
        return {
          ...state,
          individualBankData: null,
          loader: false,
          addBank: action.payload,
          alertMessage: '',
          showMessage: false,
          deleteBankSuccess: false
        };
      }
      case SHOW_BANK_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          loader: false,
          deleteBankSuccess: false
        };
      }
      case HIDE_BANK_MESSAGE: {
        return {
            ...state,
            alertMessage: "",
            showMessage: false,
            loader: false,
            deleteBankSuccess: false
        }
    }
      case HIDE_BANK_MAIN_PAGE_MESSAGE: {
         return {
        ...state,
        alertMainPageMessage: "",
        showMainPageMessage: false,
        mainLoader: false,
        alertMessage: "",
        showMessage: false,
        loader: false,
        deleteBankSuccess: false
      }
    }
      case ON_SHOW_BANK_LOADER: {
        return {
            ...state,
            loader: true,
            deleteBankSuccess: false
        }
    }
    case ON_SHOW_BANK_MAIN_PAGE_LOADER: {
      return {
        ...state,
        mainLoader: true,
        deleteBankSuccess: false
      }
    }
  
      case DELETE_BANK_SUCCESS: {
        return {
          ...state,
          deleteBankSuccess: true,
          deleteBankLoader: false,
        };
      }
      case ON_SHOW_BANK_DELETE_LOADER: {
        return {
            ...state,
            deleteBankSuccess: false,
            deleteBankLoader: true,
            loader: false,
            mainLoader: false
        }
    }
      case SHOW_DELETE_BANK_MESSAGE: {
        return {
          ...state,
          alertMessage: action.payload,
          showMessage: true,
          deleteBankLoader: false,
          loader: false,
          mainLoader: false,
          deleteBankSuccess: false
        };
      }
      case HIDE_BANK_DELETE_MESSAGE: {
        return {
            ...state,
            alertMessage: "",
            showMessage: false,
            deleteBankLoader: false,
            loader: false,
            mainLoader: false,
            deleteBankSuccess: false
        }
    }
      case EDIT_BANK_SUCCESS: {
        return {
          ...state,
          deleteBankLoader: false,
          deleteBankSuccess: false,
          editBank: action.payload,
          loader: false
        };
      }
  
      case REMOVE_INDIVIDUAL_BANK_DATA: {
        return {
          ...state,
          individualBankData: null
        }
      }
      default:
        return state;
    }
  };
  