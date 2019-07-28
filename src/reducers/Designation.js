import {
  FETCH_ALL_DESIGNATIONS_SUCCESS,
  FETCH_DESIGNATIONS_WITH_PAGINATION_SUCCESS,
  SEARCH_DESIGNATIONS_SUCCESS,
  FETCH_INDIVIDUAL_DESIGNATION_SUCCESS,
  SHOW_DESIGNATION_MESSAGE,
  SHOW_DESIGNATIONS_PARENT_PAGE_MESSAGE,
  HIDE_DESIGNATION_MESSAGE,
  HIDE_DESIGNATION_MAIN_PAGE_MESSAGE,
  ON_SHOW_DESIGNATION_LOADER,
  ON_SHOW_DESIGNATION_MAIN_PAGE_LOADER,
  ADD_DESIGNATION_SUCCESS,
  DELETE_DESIGNATION_SUCCESS,
  ON_SHOW_DESIGNATION_DELETE_LOADER,
  SHOW_DELETE_DESIGNATION_MESSAGE,
  HIDE_DESIGNATION_DELETE_MESSAGE,
  EDIT_DESIGNATION_SUCCESS,
  REMOVE_INDIVIDUAL_DESIGNATION_DATA
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  mainLoader: false,
  designationsList: "",
  allDesignations: null,
  addDesignation: null,
  editDesignation: null,
  individualDesignationData: null,
  alertMessage: "",
  showMessage: false,
  showMainPageMessage: false,
  alertMainPageMessage: "",
  designationListSuccess: false,
  deleteDesignationSuccess: false,
  editDesignationError: false,
  designationDetailSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_DESIGNATIONS_SUCCESS: {
      return {
        ...state,
        loader: false,
        mainLoader: false,
        deleteDesignationLoader: false,
        designationListSuccess: true,
        allDesignations: action.payload,
        rowsDelete: [],
        isSort: false,
        individualDesignationData: null,
        addDesignation: null,
        showMessage: false,
        alertMessage: "",
        showMainPageMessage: false,
        alertMainPageMessage: "",
        editDesignation: null,
        deleteDesignationSuccess: false
      };
    }
    case FETCH_DESIGNATIONS_WITH_PAGINATION_SUCCESS: {
      return {
        ...state,
        loader: false,
        mainLoader: false,
        designationListSuccess: true,
        addDesignation: null,
        designationsList: action.payload,
        allDesignations: null,
        rowsDelete: [],
        isSort: false,
        deleteDesignation: false,
        individualDesignationData: null,
        editDesignation: null,
        deleteDesignationSuccess: false
      };
    }

    case SHOW_DESIGNATIONS_PARENT_PAGE_MESSAGE: {
      return {
        ...state,
        mainLoader: false,
        alertMainPageMessage: action.payload,
        showMainPageMessage: true,
        alertMessage: "",
        showMessage: false,
        deleteDesignationSuccess: false
      }
    }
    case SEARCH_DESIGNATIONS_SUCCESS: {
      return {
        ...state,
        loader: false,
        designationListSuccess: true,
        designationsList: action.payload,
        rowsDelete: [],
        isSort: false,
        deleteDesignationLoader: false,
        deleteDesignationSuccess: false,
        individualDesignationData: null,
      };
    }
    case FETCH_INDIVIDUAL_DESIGNATION_SUCCESS: {
      return {
        ...state,
        individualDesignationData: action.payload,
        deleteDesignationSuccess: false,
        designationDetailSuccess: true,
        loader: false
      };
    }
    case ADD_DESIGNATION_SUCCESS: {
      return {
        ...state,
        individualDesignationData: null,
        loader: false,
        addDesignation: action.payload,
        alertMessage: '',
        showMessage: false,
        deleteDesignationSuccess: false
      };
    }
    case SHOW_DESIGNATION_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        deleteDesignationSuccess: false
      };
    }
    case HIDE_DESIGNATION_MESSAGE: {
      return {
          ...state,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteDesignationSuccess: false
      }
  }
    case HIDE_DESIGNATION_MAIN_PAGE_MESSAGE: {
       return {
      ...state,
      alertMainPageMessage: "",
      showMainPageMessage: false,
      mainLoader: false,
      alertMessage: "",
      showMessage: false,
      loader: false,
      deleteDesignationSuccess: false
    }
  }
    case ON_SHOW_DESIGNATION_LOADER: {
      return {
          ...state,
          loader: true,
          deleteDesignationSuccess: false
      }
  }
  case ON_SHOW_DESIGNATION_MAIN_PAGE_LOADER: {
    return {
      ...state,
      mainLoader: true,
      deleteDesignationSuccess: false
    }
  }

    case DELETE_DESIGNATION_SUCCESS: {
      return {
        ...state,
        deleteDesignationSuccess: true,
        deleteDesignationLoader: false,
      };
    }
    case ON_SHOW_DESIGNATION_DELETE_LOADER: {
      return {
          ...state,
          deleteDesignationSuccess: false,
          deleteDesignationLoader: true,
          loader: false,
          mainLoader: false
      }
  }
    case SHOW_DELETE_DESIGNATION_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        deleteDesignationLoader: false,
        loader: false,
        mainLoader: false,
        deleteDesignationSuccess: false
      };
    }
    case HIDE_DESIGNATION_DELETE_MESSAGE: {
      return {
          ...state,
          alertMessage: "",
          showMessage: false,
          deleteDesignationLoader: false,
          loader: false,
          mainLoader: false,
          deleteDesignationSuccess: false
      }
  }
    case EDIT_DESIGNATION_SUCCESS: {
      return {
        ...state,
        deleteDesignationLoader: false,
        deleteDesignationSuccess: false,
        editDesignation: action.payload,
        loader: false
      };
    }

    case REMOVE_INDIVIDUAL_DESIGNATION_DATA: {
      return {
        ...state,
        individualDesignationData: null
      }
    }
    default:
      return state;
  }
};
