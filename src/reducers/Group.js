import {
  FETCH_ALL_GROUPS_SUCCESS,
  FETCH_GROUPS_WITH_PAGINATION_SUCCESS,
  SEARCH_GROUPS_SUCCESS,
  FETCH_INDIVIDUAL_GROUP_SUCCESS,
  SHOW_GROUP_MESSAGE,
  SHOW_GROUPS_PARENT_PAGE_MESSAGE,
  HIDE_GROUP_MESSAGE,
  HIDE_GROUP_MAIN_PAGE_MESSAGE,
  ON_SHOW_GROUP_LOADER,
  ON_SHOW_GROUP_MAIN_PAGE_LOADER,
  ADD_GROUP_SUCCESS,
  DELETE_GROUP_SUCCESS,
  ON_SHOW_GROUP_DELETE_LOADER,
  SHOW_DELETE_GROUP_MESSAGE,
  HIDE_GROUP_DELETE_MESSAGE,
  EDIT_GROUP_SUCCESS,
  EDIT_DRAFT_GROUP_SUCCESS,
  REMOVE_INDIVIDUAL_GROUP_DATA,
  RESET_SUCCESS_INDICATORS
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  groupsList: "",
  allGroups: null,
  addGroup: null,
  editGroup: null,
  individualGroupData: null,
  alertMessage: "",
  showMessage: false,
  showMainPageMessage: false,
  alertMainPageMessage: "",
  groupListSuccess: false,
  deleteGroupSuccess: false,
  editGroupError: false,
  editGroupSuccess: false,
  groupDetailSuccess: false,
  addGroupSuccess: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_GROUPS_SUCCESS: {
      return {
        ...state,
        loader: false,
        editGroupSuccess: false,
        groupListSuccess: true,
        allGroups: action.payload,
        rowsDelete: [],
        isSort: false,
        individualGroupData: null,
        addGroup: null,
        showMessage: false,
        alertMessage: "",
        showMainPageMessage: false,
        alertMainPageMessage: "",
        editGroup: null,
        addGroupSuccess: false,
        deleteGroupSuccess: false
      };
    }
    case FETCH_GROUPS_WITH_PAGINATION_SUCCESS: {
      return {
        ...state,
        loader: false,
        editGroupSuccess: false,
        groupListSuccess: true,
        addGroup: null,
        groupsList: action.payload,
        allGroups: null,
        rowsDelete: [],
        isSort: false,
        deleteGroup: false,
        addGroupSuccess: false,
        individualGroupData: null,
        editGroup: null,
        deleteGroupSuccess: false
      };
    }

    case SHOW_GROUPS_PARENT_PAGE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMainPageMessage: action.payload,
        showMainPageMessage: true,
        alertMessage: "",
        showMessage: false,
        deleteGroupSuccess: false
      };
    }
    case SEARCH_GROUPS_SUCCESS: {
      return {
        ...state,
        loader: false,
        groupListSuccess: true,
        groupsList: action.payload,
        rowsDelete: [],
        isSort: false,
        addGroupSuccess: false,
        deleteGroupSuccess: false,
        individualGroupData: null
      };
    }
    case FETCH_INDIVIDUAL_GROUP_SUCCESS: {
      return {
        ...state,
        loader: false,
        individualGroupData: action.payload,
        deleteGroupSuccess: false,
        editGroupSuccess: false,
        addGroupSuccess: false,
        groupDetailSuccess: true
      };
    }
    case ADD_GROUP_SUCCESS: {
      return {
        ...state,
        loader: false,
        individualGroupData: null,
        addGroup: action.payload,
        alertMessage: "",
        showMessage: false,
        addGroupSuccess: true,
        editGroupSuccess: false,
        deleteGroupSuccess: false
      };
    }
    case SHOW_GROUP_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true,
        deleteGroupSuccess: false
      };
    }
    case HIDE_GROUP_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: "",
        showMessage: false,
        deleteGroupSuccess: false
      };
    }
    case HIDE_GROUP_MAIN_PAGE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMainPageMessage: "",
        showMainPageMessage: false,
        alertMessage: "",
        showMessage: false,
        deleteGroupSuccess: false
      };
    }
    case ON_SHOW_GROUP_LOADER: {
      return {
        ...state,
        loader: true,
        deleteGroupSuccess: false
      };
    }
    case ON_SHOW_GROUP_MAIN_PAGE_LOADER: {
      return {
        ...state,
        mainLoader: true,
        deleteGroupSuccess: false
      };
    }

    case DELETE_GROUP_SUCCESS: {
      return {
        ...state,
        loader: false,
        deleteGroupSuccess: true
      };
    }
    case ON_SHOW_GROUP_DELETE_LOADER: {
      return {
        ...state,
        loader: true,
        deleteGroupSuccess: false
      };
    }
    case SHOW_DELETE_GROUP_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true,
        deleteGroupSuccess: false
      };
    }
    case HIDE_GROUP_DELETE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: "",
        showMessage: false,
        deleteGroupSuccess: false
      };
    }
    case EDIT_GROUP_SUCCESS: {
      return {
        ...state,
        loader: false,
        deleteGroupSuccess: false,
        editGroupSuccess: true,
        addGroupSuccess: false,
        editGroup: action.payload
      };
    }
    case EDIT_DRAFT_GROUP_SUCCESS: {
      return {
        ...state,
        loader: false,
        deleteGroupSuccess: false,
        editGroupSuccess: true,
        addGroupSuccess: false,
        editGroup: action.payload
      };
    }

    case REMOVE_INDIVIDUAL_GROUP_DATA: {
      return {
        ...state,
        loader: false,
        individualGroupData: null
      };
    }
    case RESET_SUCCESS_INDICATORS: {
      return {
        ...state,
        loader: false,
        editGroupSuccess: false,
        addGroupSuccess: false
      };
    }
    default:
      return state;
  }
};
