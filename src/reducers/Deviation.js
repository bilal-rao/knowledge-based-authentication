import {
  FETCH_ALL_DEVIATION_SUCCESS,
  FETCH_DEVIATION_WITH_PAGINATION_SUCCESS,
  SEARCH_DEVIATIONS_SUCCESS,
  FETCH_INDIVIDUAL_DEVIATION_SUCCESS,
  SHOW_DEVIATION_MESSAGE,
  SHOW_DEVIATIONS_PARENT_PAGE_MESSAGE,
  HIDE_DEVIATION_MESSAGE,
  HIDE_DEVIATION_MAIN_PAGE_MESSAGE,
  ON_SHOW_DEVIATION_LOADER,
  ON_SHOW_DEVIATION_MAIN_PAGE_LOADER,
  ADD_DEVIATION_SUCCESS,
  DELETE_DEVIATION_SUCCESS,
  ON_SHOW_DEVIATION_DELETE_LOADER,
  SHOW_DELETE_DEVIATION_MESSAGE,
  HIDE_DEVIATION_DELETE_MESSAGE,
  EDIT_DEVIATION_SUCCESS,
  EDIT_DRAFT_DEVIATION,
  EDIT_DRAFT_DEVIATION_SUCCESS,
  EDIT_DRAFT_DEVIATION_PENDING,
  EDIT_DRAFT_DEVIATION_ERROR,
  REMOVE_INDIVIDUAL_DEVIATION_DATA
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  mainLoader: false,
  deviationsList: "",
  allDeviations: null,
  addDeviation: null,
  editDeviation: null,
  individualDeviationData: null,
  alertMessage: "",
  showMessage: false,
  showMainPageMessage: false,
  alertMainPageMessage: "",
  deviationListSuccess: false,
  addDeviationSuccess: false,
  deleteDeviationSuccess: false,
  editDeviationSuccess: false,
  editDeviationError: false,
  deviationDetailSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_DEVIATION_SUCCESS: {
      return {
        ...state,
        loader: false,
        mainLoader: false,
        deleteDeviationLoader: false,
        deviationListSuccess: true,
        allDeviations: action.payload,
        rowsDelete: [],
        isSort: false,
        individualDeviationData: null,
        addDeviation: null,
        showMessage: false,
        alertMessage: "",
        showMainPageMessage: false,
        alertMainPageMessage: "",
        editDeviation: null,
        deleteDeviationSuccess: false
      };
    }
    case FETCH_DEVIATION_WITH_PAGINATION_SUCCESS: {
      return {
        ...state,
        loader: false,
        mainLoader: false,
        deviationListSuccess: true,
        addDeviation: null,
        deviationsList: action.payload,
        allDeviations: null,
        rowsDelete: [],
        isSort: false,
        deleteDeviation: false,
        individualDeviationData: null,
        editDeviation: null,
        deleteDeviationSuccess: false
      };
    }
    case SHOW_DEVIATIONS_PARENT_PAGE_MESSAGE: {
      return {
        ...state,
        mainLoader: false,
        alertMainPageMessage: action.payload,
        showMainPageMessage: true,
        alertMessage: "",
        showMessage: false,
        deleteDeviationSuccess: false
      }
    }
    case SEARCH_DEVIATIONS_SUCCESS: {
      return {
        ...state,
        loader: false,
        deviationListSuccess: true,
        deviationsList: action.payload,
        rowsDelete: [],
        isSort: false,
        deleteDeviationLoader: false,
        deleteDeviationSuccess: false,
        individualDeviationData: null,
      };
    }
    case FETCH_INDIVIDUAL_DEVIATION_SUCCESS: {
      return {
        ...state,
        individualDeviationData: action.payload,
        deleteDeviationSuccess: false,
        deviationDetailSuccess: true,
        loader: false
      };
    }
    case ADD_DEVIATION_SUCCESS: {
      return {
        ...state,
        individualDeviationData: null,
        loader: false,
        addDeviation: action.payload,
        alertMessage: '',
        showMessage: true,
        addDeviationSuccess: true,
        deleteDeviationSuccess: false,
        editDeviationSuccess: false,
      };
    }
    case SHOW_DEVIATION_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        deleteDeviationSuccess: false
      };
    }
    case HIDE_DEVIATION_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        loader: false,
        addDeviationSuccess: false,
        deleteDeviationSuccess: false,
        editDeviationSuccess: false,
      }
    }
    case HIDE_DEVIATION_MAIN_PAGE_MESSAGE: {
      return {
        ...state,
        alertMainPageMessage: "",
        showMainPageMessage: false,
        mainLoader: false,
        alertMessage: "",
        showMessage: false,
        loader: false,
        addDeviationSuccess: false,
        deleteDeviationSuccess: false,
        editDeviationSuccess: false,
      }
    }
    case ON_SHOW_DEVIATION_LOADER: {
      return {
        ...state,
        loader: true,
        deleteDeviationSuccess: false
      }
    }
    case ON_SHOW_DEVIATION_MAIN_PAGE_LOADER: {
      return {
        ...state,
        mainLoader: true,
        deleteDeviationSuccess: false
      }
    }
    case DELETE_DEVIATION_SUCCESS: {
      return {
        ...state,
        deleteDeviationSuccess: true,
        deleteDeviationLoader: false,
        addDeviationSuccess: false,
        deleteDeviationSuccess: false,
        editDeviationSuccess: false,
      };
    }
    case ON_SHOW_DEVIATION_DELETE_LOADER: {
      return {
        ...state,
        deleteDeviationSuccess: false,
        deleteDeviationLoader: true,
        loader: true,
        mainLoader: false
      }
    }
    case SHOW_DELETE_DEVIATION_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        deleteDeviationLoader: false,
        loader: false,
        mainLoader: false,
        deleteDeviationSuccess: false
      };
    }
    case HIDE_DEVIATION_DELETE_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        deleteDeviationLoader: false,
        loader: false,
        mainLoader: false,
        deleteDeviationSuccess: false
      }
    }
    case EDIT_DEVIATION_SUCCESS: {
      return {
        ...state,
        deleteDeviationLoader: false,
        addDeviationSuccess: false,
        deleteDeviationSuccess: false,
        editDeviationSuccess: true,
        showMessage: true,
        editDeviation: action.payload,
        loader: false
      };
    }
    case EDIT_DRAFT_DEVIATION_SUCCESS: {
      return {
        ...state,
        deleteDeviationLoader: false,
        addDeviationSuccess: false,
        deleteDeviationSuccess: false,
        editDeviation: true,
        showMessage: true,
        editDeviation: action.payload,
        loader: false
      };
    }
    case REMOVE_INDIVIDUAL_DEVIATION_DATA: {
      return {
        ...state,
        individualDeviationData: null
      }
    }
    default:
      return state;
  }
};
