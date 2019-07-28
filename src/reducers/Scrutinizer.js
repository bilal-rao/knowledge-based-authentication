import {
  FETCH_ALL_SCRUTINIZER_SUCCESS,
  SEARCH_SCRUTINIZERS_SUCCESS,
  FETCH_INDIVIDUAL_SCRUTINIZER_SUCCESS,
  SHOW_SCRUTINIZER_MESSAGE,
  SHOW_SCRUTINIZERS_PARENT_PAGE_MESSAGE,
  HIDE_SCRUTINIZER_MESSAGE,
  HIDE_SCRUTINIZER_MAIN_PAGE_MESSAGE,
  ON_SHOW_SCRUTINIZER_LOADER,
  ON_SHOW_SCRUTINIZER_MAIN_PAGE_LOADER,
  ADD_SCRUTINIZER_SUCCESS,
  DELETE_SCRUTINIZER_SUCCESS,
  ON_SHOW_SCRUTINIZER_DELETE_LOADER,
  SHOW_DELETE_SCRUTINIZER_MESSAGE,
  HIDE_SCRUTINIZER_DELETE_MESSAGE,
  EDIT_SCRUTINIZER_SUCCESS,
  REMOVE_INDIVIDUAL_SCRUTINIZER_DATA,
  SCRUTINIZER_PROCESS_REQUEST_SUCCESS,
  ON_SHOW_PROCESS_REQUEST_LOADER,
  SHOW_PROCESS_REQUEST_MESSAGE,
  HIDE_PROCESS_REQUEST_MESSAGE
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  scrutinizersList: "",
  addScrutinizer: null,
  editScrutinizer: null,
  individualScrutinizerData: null,
  alertMessage: "",
  showMessage: false,
  showMainPageMessage: false,
  alertMainPageMessage: "",
  scrutinizerListPending: false,
  scrutinizerListSuccess: false,
  deleteScrutinizerSuccess: false,
  editScrutinizerPending: false,
  editScrutinizerSuccess: false,
  editScrutinizerError: false,
  scrutinizerDetailSuccess: false,
  scrutinizerDetailPending: false,
  addScrutinizerPending: false,
  addScrutinizerSuccess: false,
  processRequest: false,
  showProcessRequestMessage: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_SCRUTINIZER_SUCCESS: {
      return {
        ...state,
        loader: false,
        scrutinizerListPending: false,
        scrutinizerListSuccess: true,
        scrutinizersList: action.payload,
        rowsDelete: [],
        isSort: false,
        individualScrutinizerData: null,
        addScrutinizerPending: false,
        addScrutinizer: null,
        showMessage: false,
        alertMessage: "",
        showMainPageMessage: false,
        showProcessRequestMessage: false,
        alertMainPageMessage: "",
        editScrutinizer: null,
        deleteScrutinizerSuccess: false,
        processRequest: false,
        alertProcessRequestMessage: "",
        requestData: null
      };
    }
    case SHOW_SCRUTINIZERS_PARENT_PAGE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMainPageMessage: action.payload,
        showMainPageMessage: true,
        alertMessage: "",
        showMessage: false,
        showProcessRequestMessage: false,
        deleteScrutinizerSuccess: false
      };
    }
    case SEARCH_SCRUTINIZERS_SUCCESS: {
      return {
        ...state,
        loader: false,
        scrutinizerListPending: false,
        scrutinizerListSuccess: true,
        scrutinizersList: action.payload,
        rowsDelete: [],
        isSort: false,
        deleteScrutinizerSuccess: false,
        individualScrutinizerData: null,
        addScrutinizerPending: false
      };
    }
    case FETCH_INDIVIDUAL_SCRUTINIZER_SUCCESS: {
      return {
        ...state,
        loader: false,
        individualScrutinizerData: action.payload,
        deleteScrutinizerSuccess: false,
        scrutinizerDetailPending: false,
        scrutinizerDetailSuccess: true
      };
    }
    case ADD_SCRUTINIZER_SUCCESS: {
      return {
        ...state,
        loader: false,
        individualScrutinizerData: null,
        addScrutinizer: action.payload,
        alertMessage: "",
        showMessage: false,
        showProcessRequestMessage: false,
        deleteScrutinizerSuccess: false
      };
    }
    case SHOW_SCRUTINIZER_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true,
        showProcessRequestMessage: false,
        processRequest: false,
        deleteScrutinizerSuccess: false
      };
    }
    case HIDE_SCRUTINIZER_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: "",
        showMessage: false,
        deleteScrutinizerSuccess: false
      };
    }
    case HIDE_SCRUTINIZER_MAIN_PAGE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMainPageMessage: "",
        showMainPageMessage: false,
        alertMessage: "",
        showMessage: false,
        showProcessRequestMessage: false,
        deleteScrutinizerSuccess: false
      };
    }
    case ON_SHOW_SCRUTINIZER_LOADER: {
      return {
        ...state,
        loader: true,
        deleteScrutinizerSuccess: false
      };
    }
    case ON_SHOW_SCRUTINIZER_MAIN_PAGE_LOADER: {
      return {
        ...state,
        loader: true,
        deleteScrutinizerSuccess: false
      };
    }

    case DELETE_SCRUTINIZER_SUCCESS: {
      return {
        ...state,
        loader: false,
        deleteScrutinizerSuccess: true
      };
    }
    case ON_SHOW_SCRUTINIZER_DELETE_LOADER: {
      return {
        ...state,
        loader: false,
        deleteScrutinizerSuccess: false
      };
    }
    case SHOW_DELETE_SCRUTINIZER_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true,
        deleteScrutinizerSuccess: false
      };
    }
    case HIDE_SCRUTINIZER_DELETE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: "",
        showMessage: false,
        deleteScrutinizerSuccess: false
      };
    }
    case EDIT_SCRUTINIZER_SUCCESS: {
      return {
        ...state,
        loader: false,
        deleteScrutinizerSuccess: false,
        editScrutinizer: action.payload
      };
    }

    case REMOVE_INDIVIDUAL_SCRUTINIZER_DATA: {
      return {
        ...state,
        loader: false,
        individualScrutinizerData: null
      };
    }

    case SCRUTINIZER_PROCESS_REQUEST_SUCCESS: {
      return {
        ...state,
        loader: false,
        processRequest: true,
        requestData: action.payload
      };
    }

    case ON_SHOW_PROCESS_REQUEST_LOADER: {
      return {
        ...state,
        loader: false,
        processRequest: false,
        requestData: null
      };
    }
    case SHOW_PROCESS_REQUEST_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertProcessRequestMessage: action.payload,
        showProcessRequestMessage: true,
        processRequest: false,
        requestData: null
      };
    }
    case HIDE_PROCESS_REQUEST_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertProcessRequestMessage: "",
        showProcessRequestMessage: false,
        alertMessage: "",
        showMessage: false,
        processRequest: false,
        requestData: null
      };
    }
    default:
      return state;
  }
};
