import {
  FETCH_ALL_DOCUMENT_TYPES_SUCCESS,
  FETCH_DOCUMENT_TYPES_WITH_PAGINATION_SUCCESS,
  SEARCH_DOCUMENT_TYPES_SUCCESS,
  FETCH_INDIVIDUAL_DOCUMENT_TYPE_SUCCESS,
  SHOW_DOCUMENT_TYPE_MESSAGE,
  SHOW_DOCUMENT_TYPES_PARENT_PAGE_MESSAGE,
  HIDE_DOCUMENT_TYPE_MESSAGE,
  HIDE_DOCUMENT_TYPE_MAIN_PAGE_MESSAGE,
  ON_SHOW_DOCUMENT_TYPE_LOADER,
  ON_SHOW_DOCUMENT_TYPE_MAIN_PAGE_LOADER,
  ADD_DOCUMENT_TYPE_SUCCESS,
  DELETE_DOCUMENT_TYPE_SUCCESS,
  ON_SHOW_DOCUMENT_TYPE_DELETE_LOADER,
  SHOW_DELETE_DOCUMENT_TYPE_MESSAGE,
  HIDE_DOCUMENT_TYPE_DELETE_MESSAGE,
  EDIT_DOCUMENT_TYPE_SUCCESS,
  REMOVE_INDIVIDUAL_DOCUMENT_TYPE_DATA
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  mainLoader: false,
  documentTypesList: "",
  allDocumentTypes: null,
  addDocumentType: null,
  editDocumentType: null,
  individualDocumentTypeData: null,
  alertMessage: "",
  showMessage: false,
  showMainPageMessage: false,
  alertMainPageMessage: "",
  documentTypeListSuccess: false,
  deleteDocumentTypeSuccess: false,
  editDocumentTypeError: false,
  documentTypeDetailSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_DOCUMENT_TYPES_SUCCESS: {
      return {
        ...state,
        loader: false,
        mainLoader: false,
        deleteDocumentTypeLoader: false,
        documentTypeListSuccess: true,
        allDocumentTypes: action.payload,
        rowsDelete: [],
        isSort: false,
        individualDocumentTypeData: null,
        addDocumentType: null,
        showMessage: false,
        alertMessage: "",
        showMainPageMessage: false,
        alertMainPageMessage: "",
        editDocumentType: null,
        deleteDocumentTypeSuccess: false
      };
    }
    case FETCH_DOCUMENT_TYPES_WITH_PAGINATION_SUCCESS: {
      return {
        ...state,
        loader: false,
        mainLoader: false,
        documentTypeListSuccess: true,
        addDocumentType: null,
        documentTypesList: action.payload,
        allDocumentTypes: null,
        rowsDelete: [],
        isSort: false,
        deleteDocumentType: false,
        individualDocumentTypeData: null,
        editDocumentType: null,
        deleteDocumentTypeSuccess: false
      };
    }

    case SHOW_DOCUMENT_TYPES_PARENT_PAGE_MESSAGE: {
      return {
        ...state,
        mainLoader: false,
        alertMainPageMessage: action.payload,
        showMainPageMessage: true,
        alertMessage: "",
        showMessage: false,
        deleteDocumentTypeSuccess: false
      }
    }
    case SEARCH_DOCUMENT_TYPES_SUCCESS: {
      return {
        ...state,
        loader: false,
        documentTypeListSuccess: true,
        documentTypesList: action.payload,
        rowsDelete: [],
        isSort: false,
        deleteDocumentTypeLoader: false,
        deleteDocumentTypeSuccess: false,
        individualDocumentTypeData: null,
      };
    }
    case FETCH_INDIVIDUAL_DOCUMENT_TYPE_SUCCESS: {
      return {
        ...state,
        individualDocumentTypeData: action.payload,
        deleteDocumentTypeSuccess: false,
        documentTypeDetailSuccess: true,
        loader: false
      };
    }
    case ADD_DOCUMENT_TYPE_SUCCESS: {
      return {
        ...state,
        individualDocumentTypeData: null,
        loader: false,
        addDocumentType: action.payload,
        alertMessage: '',
        showMessage: false,
        deleteDocumentTypeSuccess: false
      };
    }
    case SHOW_DOCUMENT_TYPE_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        deleteDocumentTypeSuccess: false
      };
    }
    case HIDE_DOCUMENT_TYPE_MESSAGE: {
      return {
          ...state,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteDocumentTypeSuccess: false
      }
  }
    case HIDE_DOCUMENT_TYPE_MAIN_PAGE_MESSAGE: {
       return {
      ...state,
      alertMainPageMessage: "",
      showMainPageMessage: false,
      mainLoader: false,
      alertMessage: "",
      showMessage: false,
      loader: false,
      deleteDocumentTypeSuccess: false
    }
  }
    case ON_SHOW_DOCUMENT_TYPE_LOADER: {
      return {
          ...state,
          loader: true,
          deleteDocumentTypeSuccess: false
      }
  }
  case ON_SHOW_DOCUMENT_TYPE_MAIN_PAGE_LOADER: {
    return {
      ...state,
      mainLoader: true,
      deleteDocumentTypeSuccess: false
    }
  }

    case DELETE_DOCUMENT_TYPE_SUCCESS: {
      return {
        ...state,
        deleteDocumentTypeSuccess: true,
        deleteDocumentTypeLoader: false,
      };
    }
    case ON_SHOW_DOCUMENT_TYPE_DELETE_LOADER: {
      return {
          ...state,
          deleteDocumentTypeSuccess: false,
          deleteDocumentTypeLoader: true,
          loader: false,
          mainLoader: false
      }
  }
    case SHOW_DELETE_DOCUMENT_TYPE_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        deleteDocumentTypeLoader: false,
        loader: false,
        mainLoader: false,
        deleteDocumentTypeSuccess: false
      };
    }
    case HIDE_DOCUMENT_TYPE_DELETE_MESSAGE: {
      return {
          ...state,
          alertMessage: "",
          showMessage: false,
          deleteDocumentTypeLoader: false,
          loader: false,
          mainLoader: false,
          deleteDocumentTypeSuccess: false
      }
  }
    case EDIT_DOCUMENT_TYPE_SUCCESS: {
      return {
        ...state,
        deleteDocumentTypeLoader: false,
        deleteDocumentTypeSuccess: false,
        editDocumentType: action.payload,
        loader: false
      };
    }

    case REMOVE_INDIVIDUAL_DOCUMENT_TYPE_DATA: {
      return {
        ...state,
        individualDocumentTypeData: null
      }
    }
    default:
      return state;
  }
};
