import {
  FETCH_ALL_HIERARCHY_SUCCESS,
  FETCH_HIERARCHY_WITH_PAGINATION_SUCCESS,
  SEARCH_HIERARCHYS_SUCCESS,
  FETCH_INDIVIDUAL_HIERARCHY_SUCCESS,
  SHOW_HIERARCHY_MESSAGE,
  SHOW_HIERARCHYS_PARENT_PAGE_MESSAGE,
  HIDE_HIERARCHY_MESSAGE,
  HIDE_HIERARCHY_MAIN_PAGE_MESSAGE,
  ON_SHOW_HIERARCHY_LOADER,
  ON_SHOW_HIERARCHY_MAIN_PAGE_LOADER,
  ADD_HIERARCHY_SUCCESS,
  DELETE_HIERARCHY_SUCCESS,
  ON_SHOW_HIERARCHY_DELETE_LOADER,
  SHOW_DELETE_HIERARCHY_MESSAGE,
  HIDE_HIERARCHY_DELETE_MESSAGE,
  EDIT_HIERARCHY_SUCCESS,
  REMOVE_INDIVIDUAL_HIERARCHY_DATA,
  GET_HIERARCHY_TYPES_SUCCESS,
  GET_HIERARCHY_TYPES_NAME_SUCCESS
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  mainLoader: false,
  hierarchyList: "",
  addHierarchy: null,
  editHierarchy: null,
  individualHierarchyData: null,
  alertMessage: "",
  showMessage: false,
  showMainPageMessage: false,
  alertMainPageMessage: "",
  hierarchyListSuccess: false,
  deleteHierarchySuccess: false,
  editHierarchySuccess: false,
  editHierarchyError: false,
  hierarchyDetailSuccess: false,
  addHierarchySuccess: false,
  getHierarchyTypes: null,
  getHierarchyTypesName: null,
  hierarchyTypesSuccess: null,
  hierarchyNamesSuccess: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_HIERARCHY_SUCCESS: {
      return {
        ...state,
        allHierarchies: action.payload
      };
    }
    case FETCH_HIERARCHY_WITH_PAGINATION_SUCCESS: {
      return {
        ...state,
        loader: false,
        mainLoader: false,
        deleteHierarchyLoader: false,
        hierarchyListSuccess: true,
        hierarchyList: action.payload,
        rowsDelete: [],
        isSort: false,
        individualHierarchyData: null,
        addHierarchy: null,
        showMessage: false,
        alertMessage: "",
        showMainPageMessage: false,
        alertMainPageMessage: "",
        editHierarchy: null,
        deleteHierarchySuccess: false,
        hierarchyTypesSuccess: null,
        hierarchyNamesSuccess: null
      };
    }
    case SHOW_HIERARCHYS_PARENT_PAGE_MESSAGE: {
      return {
        ...state,
        mainLoader: false,
        alertMainPageMessage: action.payload,
        showMainPageMessage: true,
        alertMessage: "",
        showMessage: false,
        deleteHierarchySuccess: false
      }
    }
    case SEARCH_HIERARCHYS_SUCCESS: {
      return {
        ...state,
        loader: false,
        hierarchyListSuccess: true,
        hierarchyList: action.payload,
        rowsDelete: [],
        isSort: false,
        deleteHierarchyLoader: false,
        deleteHierarchySuccess: false,
        individualHierarchyData: null,
      };
    }
    case FETCH_INDIVIDUAL_HIERARCHY_SUCCESS: {
      return {
        ...state,
        individualHierarchyData: action.payload,
        deleteHierarchySuccess: false,
        hierarchyDetailSuccess: true,
        loader: false
      };
    }
    case ADD_HIERARCHY_SUCCESS: {
      return {
        ...state,
        individualHierarchyData: null,
        loader: false,
        addHierarchy: action.payload,
        alertMessage: '',
        showMessage: false,
        deleteHierarchySuccess: false
      };
    }
    case SHOW_HIERARCHY_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        deleteHierarchySuccess: false
      };
    }
    case HIDE_HIERARCHY_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        loader: false,
        deleteHierarchySuccess: false
      }
    }
    case HIDE_HIERARCHY_MAIN_PAGE_MESSAGE: {
      return {
        ...state,
        alertMainPageMessage: "",
        showMainPageMessage: false,
        mainLoader: false,
        alertMessage: "",
        showMessage: false,
        loader: false,
        deleteHierarchySuccess: false
      }
    }
    case ON_SHOW_HIERARCHY_LOADER: {
      return {
        ...state,
        loader: true,
        deleteHierarchySuccess: false
      }
    }
    case ON_SHOW_HIERARCHY_MAIN_PAGE_LOADER: {
      return {
        ...state,
        mainLoader: true,
        deleteHierarchySuccess: false
      }
    }

    case DELETE_HIERARCHY_SUCCESS: {
      return {
        ...state,
        deleteHierarchySuccess: true,
        deleteHierarchyLoader: false,
      };
    }
    case ON_SHOW_HIERARCHY_DELETE_LOADER: {
      return {
        ...state,
        deleteHierarchySuccess: false,
        deleteHierarchyLoader: true,
        loader: false,
        mainLoader: false
      }
    }
    case SHOW_DELETE_HIERARCHY_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        deleteHierarchyLoader: false,
        loader: false,
        mainLoader: false,
        deleteHierarchySuccess: false
      };
    }
    case HIDE_HIERARCHY_DELETE_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        deleteHierarchyLoader: false,
        loader: false,
        mainLoader: false,
        deleteHierarchySuccess: false
      }
    }
    case EDIT_HIERARCHY_SUCCESS: {
      return {
        ...state,
        deleteHierarchyLoader: false,
        deleteHierarchySuccess: false,
        editHierarchy: action.payload,
        loader: false
      };
    }

    case REMOVE_INDIVIDUAL_HIERARCHY_DATA: {
      return {
        ...state,
        loader: false,
        mainLoader: false,
        deleteHierarchyLoader: false,
        hierarchyListSuccess: true,
        hierarchyList: action.payload,
        rowsDelete: [],
        isSort: false,
        individualHierarchyData: null,
        addHierarchy: null,
        showMessage: false,
        alertMessage: "",
        showMainPageMessage: false,
        alertMainPageMessage: "",
        editHierarchy: null,
        deleteHierarchySuccess: false,
        hierarchyTypesSuccess: null,
        hierarchyNamesSuccess: null
      }
    }

    case GET_HIERARCHY_TYPES_SUCCESS: {
      return {
        ...state,
        hierarchyTypesSuccess: true,
        getHierarchyTypes: action.payload,
        loader: false
      }
    }

    case GET_HIERARCHY_TYPES_NAME_SUCCESS: {
      return {
        ...state,
        hierarchyNamesSuccess: true,
        getHierarchyTypesName: action.payload,
        loader: false
      };
    }
    default:
      return state;
  }
};
