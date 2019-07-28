import {
  FETCH_ALL_FIELD_SUCCESS,
  FETCH_FIELD_WITH_PAGINATION_SUCCESS,
  SEARCH_FIELDS_SUCCESS,
  FETCH_INDIVIDUAL_FIELD_SUCCESS,
  SHOW_FIELD_MESSAGE,
  SHOW_FIELDS_PARENT_PAGE_MESSAGE,
  HIDE_FIELD_MESSAGE,
  HIDE_FIELD_MAIN_PAGE_MESSAGE,
  ON_SHOW_FIELD_LOADER,
  ON_SHOW_FIELD_MAIN_PAGE_LOADER,
  ADD_FIELD_SUCCESS,
  DELETE_FIELD_SUCCESS,
  ON_SHOW_FIELD_DELETE_LOADER,
  SHOW_DELETE_FIELD_MESSAGE,
  HIDE_FIELD_DELETE_MESSAGE,
  EDIT_FIELD_SUCCESS,
  EDIT_DRAFT_FIELD,
  EDIT_DRAFT_FIELD_SUCCESS,
  EDIT_DRAFT_FIELD_PENDING,
  EDIT_DRAFT_FIELD_ERROR,
  REMOVE_INDIVIDUAL_FIELD_DATA
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  mainLoader: false,
  fieldsList: "",
  allFields: null,
  addField: null,
  editField: null,
  individualFieldData: null,
  alertMessage: "",
  showMessage: false,
  showMainPageMessage: false,
  alertMainPageMessage: "",
  fieldListSuccess: false,
  addFieldSuccess: false,
  deleteFieldSuccess: false,
  editFieldSuccess: false,
  editFieldError: false,
  fieldDetailSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_FIELD_SUCCESS: {
      return {
        ...state,
        loader: false,
        mainLoader: false,
        deleteFieldLoader: false,
        fieldListSuccess: true,
        allFields: action.payload,
        rowsDelete: [],
        isSort: false,
        individualFieldData: null,
        addField: null,
        showMessage: false,
        alertMessage: "",
        showMainPageMessage: false,
        alertMainPageMessage: "",
        editField: null,
        deleteFieldSuccess: false,
        addFieldSuccess: false,
        editFieldSuccess: false,
      };
    }
    case FETCH_FIELD_WITH_PAGINATION_SUCCESS: {
      return {
        ...state,
        loader: false,
        mainLoader: false,
        fieldListSuccess: true,
        addField: null,
        fieldsList: action.payload,
        allFields: null,
        rowsDelete: [],
        isSort: false,
        deleteField: false,
        individualFieldData: null,
        editField: null,
        deleteFieldSuccess: false,
        addFieldSuccess: false,
        editFieldSuccess: false,
      };
    }
    case SHOW_FIELDS_PARENT_PAGE_MESSAGE: {
      return {
        ...state,
        mainLoader: false,
        alertMainPageMessage: action.payload,
        showMainPageMessage: true,
        alertMessage: "",
        showMessage: false,
        deleteFieldSuccess: false
      }
    }
    case SEARCH_FIELDS_SUCCESS: {
      return {
        ...state,
        loader: false,
        fieldListSuccess: true,
        fieldsList: action.payload,
        rowsDelete: [],
        isSort: false,
        deleteFieldLoader: false,
        deleteFieldSuccess: false,
        individualFieldData: null,
      };
    }
    case FETCH_INDIVIDUAL_FIELD_SUCCESS: {
      return {
        ...state,
        individualFieldData: action.payload,
        deleteFieldSuccess: false,
        fieldDetailSuccess: true,
        loader: false
      };
    }
    case ADD_FIELD_SUCCESS: {
      return {
        ...state,
        individualFieldData: null,
        loader: false,
        addField: action.payload,
        alertMessage: '',
        showMessage: false,
        addFieldSuccess: true,
        deleteFieldSuccess: false,
        editFieldSuccess: false,
      };
    }
    case SHOW_FIELD_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        deleteFieldSuccess: false
      };
    }
    case HIDE_FIELD_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        loader: false,
        addFieldSuccess: false,
        deleteFieldSuccess: false,
        editFieldSuccess: false,
      }
    }
    case HIDE_FIELD_MAIN_PAGE_MESSAGE: {
      return {
        ...state,
        alertMainPageMessage: "",
        showMainPageMessage: false,
        mainLoader: false,
        alertMessage: "",
        showMessage: false,
        loader: false,
        addFieldSuccess: false,
        deleteFieldSuccess: false,
        editFieldSuccess: false,
      }
    }
    case ON_SHOW_FIELD_LOADER: {
      return {
        ...state,
        loader: true,
        deleteFieldSuccess: false
      }
    }
    case ON_SHOW_FIELD_MAIN_PAGE_LOADER: {
      return {
        ...state,
        mainLoader: true,
        deleteFieldSuccess: false
      }
    }
    case DELETE_FIELD_SUCCESS: {
      return {
        ...state,
        deleteFieldSuccess: true,
        deleteFieldLoader: false,
        addFieldSuccess: false,
        editFieldSuccess: false,
      };
    }
    case ON_SHOW_FIELD_DELETE_LOADER: {
      return {
        ...state,
        deleteFieldSuccess: false,
        deleteFieldLoader: true,
        loader: true,
        mainLoader: false
      }
    }
    case SHOW_DELETE_FIELD_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        deleteFieldLoader: false,
        loader: false,
        mainLoader: false,
        deleteFieldSuccess: false
      };
    }
    case HIDE_FIELD_DELETE_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        deleteFieldLoader: false,
        loader: false,
        mainLoader: false,
        deleteFieldSuccess: false
      }
    }
    case EDIT_FIELD_SUCCESS: {
      return {
        ...state,
        deleteFieldLoader: false,
        addFieldSuccess: false,
        deleteFieldSuccess: false,
        editFieldSuccess: true,
        showMessage: false,
        editField: action.payload,
        loader: false
      };
    }
    case EDIT_DRAFT_FIELD_SUCCESS: {
      return {
        ...state,
        deleteFieldLoader: false,
        addFieldSuccess: false,
        deleteFieldSuccess: false,
        editField: true,
        showMessage: false,
        editField: action.payload,
        loader: false
      };
    }
    case REMOVE_INDIVIDUAL_FIELD_DATA: {
      return {
        ...state,
        individualFieldData: null
      }
    }
    default:
      return state;
  }
};
