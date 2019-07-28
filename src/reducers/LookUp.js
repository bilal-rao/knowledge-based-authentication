import {
  FETCH_ALL_LOOKUPS_SUCCESS,
  FETCH_LOOKUPS_WITH_PAGINATION_SUCCESS,
  SEARCH_LOOKUPS_SUCCESS,
  FETCH_INDIVIDUAL_LOOKUP_SUCCESS,
  SHOW_LOOKUP_MESSAGE,
  SHOW_LOOKUPS_PARENT_PAGE_MESSAGE,
  HIDE_LOOKUP_MESSAGE,
  HIDE_LOOKUP_MAIN_PAGE_MESSAGE,
  ON_SHOW_LOOKUP_LOADER,
  ON_SHOW_LOOKUP_MAIN_PAGE_LOADER,
  ADD_LOOKUP_SUCCESS,
  DELETE_LOOKUP_SUCCESS,
  ON_SHOW_LOOKUP_DELETE_LOADER,
  SHOW_DELETE_LOOKUP_MESSAGE,
  HIDE_LOOKUP_DELETE_MESSAGE,
  EDIT_LOOKUP_SUCCESS,
  EDIT_DRAFT_LOOKUP_SUCCESS,
  REMOVE_INDIVIDUAL_LOOKUP_DATA,
  POP_UP_CLOSE,
  POP_UP_OPEN,
  RESET_SUCCESS_INDICATORS
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  lookupsList: "",
  allLookUps: null,
  addLookUp: null,
  editLookUp: null,
  individualLookUpData: null,
  alertMessage: "",
  showMessage: false,
  showMainPageMessage: false,
  alertMainPageMessage: "",
  lookupListSuccess: false,
  deleteLookUpSuccess: false,
  editLookUpError: false,
  lookupDetailSuccess: false,
  editLookUpSuccess: false,
  addLookUpSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_LOOKUPS_SUCCESS: {
      return {
        ...state,
        loader: false,
        lookupListSuccess: true,
        allLookUps: action.payload,
        rowsDelete: [],
        isSort: false,
        individualLookUpData: null,
        addLookUp: null,
        showMessage: false,
        alertMessage: "",
        showMainPageMessage: false,
        alertMainPageMessage: "",
        editLookUp: null,
        deleteLookUpSuccess: false
      };
    }
    case FETCH_LOOKUPS_WITH_PAGINATION_SUCCESS: {
      return {
        ...state,
        loader: false,
        lookupListSuccess: true,
        addLookUp: null,
        lookupsList: action.payload,
        allLookUps: null,
        rowsDelete: [],
        isSort: false,
        deleteLookUp: false,
        individualLookUpData: null,
        editLookUp: null,
        deleteLookUpSuccess: false
      };
    }
    case SHOW_LOOKUPS_PARENT_PAGE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMainPageMessage: action.payload,
        showMainPageMessage: true,
        alertMessage: "",
        showMessage: false,
        deleteLookUpSuccess: false
      };
    }
    case SEARCH_LOOKUPS_SUCCESS: {
      return {
        ...state,
        loader: false,
        lookupListSuccess: true,
        lookupsList: action.payload,
        rowsDelete: [],
        isSort: false,
        deleteLookUpSuccess: false,
        individualLookUpData: null
      };
    }
    case FETCH_INDIVIDUAL_LOOKUP_SUCCESS: {
      return {
        ...state,
        loader: false,
        individualLookUpData: action.payload,
        deleteLookUpSuccess: false,
        lookupDetailSuccess: true
      };
    }
    case ADD_LOOKUP_SUCCESS: {
      return {
        ...state,
        loader: false,
        individualLookUpData: null,
        addLookUp: action.payload,
        alertMessage: "",
        showMessage: false,
        addLookUpSuccess: true,
        editLookUpSuccess: false,
        deleteLookUpSuccess: false
      };
    }
    case SHOW_LOOKUP_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true,
        deleteLookUpSuccess: false
      };
    }
    case HIDE_LOOKUP_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: "",
        showMessage: false,
        deleteLookUpSuccess: false
      };
    }
    case HIDE_LOOKUP_MAIN_PAGE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMainPageMessage: "",
        showMainPageMessage: false,
        alertMessage: "",
        showMessage: false,
        deleteLookUpSuccess: false
      };
    }
    case ON_SHOW_LOOKUP_LOADER: {
      return {
        ...state,
        loader: true,
        deleteLookUpSuccess: false
      };
    }
    case ON_SHOW_LOOKUP_MAIN_PAGE_LOADER: {
      return {
        ...state,
        loader: true,
        deleteLookUpSuccess: false
      };
    }
    case DELETE_LOOKUP_SUCCESS: {
      return {
        ...state,
        deleteLookUpSuccess: true,
        deleteLookUpLoader: false
      };
    }
    case ON_SHOW_LOOKUP_DELETE_LOADER: {
      return {
        ...state,
        loader: false,
        deleteLookUpSuccess: false,
        deleteLookUpLoader: true
      };
    }
    case SHOW_DELETE_LOOKUP_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true,
        deleteLookUpSuccess: false
      };
    }
    case HIDE_LOOKUP_DELETE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: "",
        showMessage: false,
        deleteLookUpSuccess: false
      };
    }
    case EDIT_LOOKUP_SUCCESS: {
      return {
        ...state,
        loader: false,
        addLookUpSuccess: false,
        editLookUpSuccess: true,
        deleteLookUpSuccess: false,
        editLookUp: action.payload
      };
    }
    case EDIT_DRAFT_LOOKUP_SUCCESS: {
      return {
        ...state,
        loader: false,
        addLookUpSuccess: false,
        editLookUpSuccess: true,
        deleteLookUpSuccess: false,
        editLookUp: action.payload,
      };
    }
    case REMOVE_INDIVIDUAL_LOOKUP_DATA: {
      return {
        ...state,
        loader: false,
        individualLookUpData: null
      };
    }
    case POP_UP_CLOSE: {
      return {
        ...state,
        loader: false
      };
    }
    case POP_UP_OPEN: {
      return {
        ...state,
        loader: false
      };
    }
    case RESET_SUCCESS_INDICATORS: {
      return {
        ...state,
        loader: false,
        editLookUpSuccess: false,
        addLookUpSuccess: false
      };
    }
    default:
      return state;
  }
};
