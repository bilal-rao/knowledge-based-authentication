import {
  FETCH_ALL_USER_SUCCESS,
  SEARCH_USERS_SUCCESS,
  FETCH_INDIVIDUAL_USER_SUCCESS,
  SHOW_USER_MESSAGE,
  SHOW_USERS_PARENT_PAGE_MESSAGE,
  HIDE_USER_MESSAGE,
  HIDE_USER_MAIN_PAGE_MESSAGE,
  ON_SHOW_USER_LOADER,
  ON_SHOW_USER_MAIN_PAGE_LOADER,
  ADD_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  ON_SHOW_USER_DELETE_LOADER,
  SHOW_DELETE_USER_MESSAGE,
  HIDE_USER_DELETE_MESSAGE,
  EDIT_USER_SUCCESS,
  EDIT_DRAFT_USER_SUCCESS,
  REMOVE_INDIVIDUAL_USER_DATA,
  CHANGE_PASSWORD_SUCCESS,
  RESET_SUCCESS_INDICATORS
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  usersList: "",
  addUser: null,
  editUser: null,
  individualUserData: null,
  alertMessage: "",
  showMessage: false,
  showMainPageMessage: false,
  alertMainPageMessage: "",
  userListSuccess: false,
  deleteUserSuccess: false,
  editUserSuccess: false,
  editUserError: false,
  userDetailSuccess: false,
  addUserSuccess: false,
  changePasswordSuccess: false,
  changePassword: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        userListSuccess: true,
        usersList: action.payload,
        rowsDelete: [],
        isSort: false,
        individualUserData: null,
        addUser: null,
        showMessage: false,
        alertMessage: "",
        showMainPageMessage: false,
        alertMainPageMessage: "",
        editUser: null,
        deleteUserSuccess: false,
        editUserSuccess: false,
        addUserSuccess: false
      };
    }
    case SHOW_USERS_PARENT_PAGE_MESSAGE: {
      return {
        ...state,
        mainLoader: false,
        alertMainPageMessage: action.payload,
        showMainPageMessage: true,
        alertMessage: "",
        showMessage: false,
        deleteUserSuccess: false,
        addUserSuccess: false
      };
    }
    case SEARCH_USERS_SUCCESS: {
      return {
        ...state,
        loader: false,
        userListSuccess: true,
        usersList: action.payload,
        rowsDelete: [],
        isSort: false,
        deleteUserSuccess: false,
        individualUserData: null,
        editUserSuccess: false,
        addUserSuccess: false
      };
    }
    case FETCH_INDIVIDUAL_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        individualUserData: action.payload,
        deleteUserSuccess: false,
        userDetailSuccess: true,
        editUserSuccess: false,
        addUserSuccess: false
      };
    }
    case ADD_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        addUserSuccess: true,
        individualUserData: null,
        addUser: action.payload,
        alertMessage: "",
        showMessage: false,
        editUserSuccess: false,
        deleteUserSuccess: false
      };
    }
    case SHOW_USER_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true,
        deleteUserSuccess: false
      };
    }
    case HIDE_USER_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: "",
        showMessage: false,
        deleteUserSuccess: false
      };
    }
    case HIDE_USER_MAIN_PAGE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMainPageMessage: "",
        showMainPageMessage: false,
        alertMessage: "",
        showMessage: false,
        deleteUserSuccess: false
      };
    }
    case ON_SHOW_USER_LOADER: {
      return {
        ...state,
        loader: true,
        deleteUserSuccess: false
      };
    }
    case ON_SHOW_USER_MAIN_PAGE_LOADER: {
      return {
        ...state,
        loader: true,
        deleteUserSuccess: false
      };
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        editUserSuccess: false,
        deleteUserSuccess: true
      };
    }
    case ON_SHOW_USER_DELETE_LOADER: {
      return {
        ...state,
        loader: false,
        deleteUserSuccess: false
      };
    }
    case SHOW_DELETE_USER_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        deleteUserLoader: false,
        loader: false,
        mainLoader: false,
        deleteUserSuccess: false
      };
    }
    case HIDE_USER_DELETE_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        deleteUserLoader: false,
        loader: false,
        mainLoader: false,
        deleteUserSuccess: false
      };
    }
    case EDIT_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        editUserSuccess: true,
        deleteUserSuccess: false,
        editUser: action.payload,
        addUserSuccess: false
      };
    }
    case EDIT_DRAFT_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        editUserSuccess: true,
        deleteUserSuccess: false,
        editUser: action.payload,
        addUserSuccess: false
      };
    }
    case REMOVE_INDIVIDUAL_USER_DATA: {
      return {
        ...state,
        loader: false,
        individualUserData: null,
        addUserSuccess: false
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        changePasswordSuccess: true,
        loader: false,
        changePassword: action.payload
      };
    }
    case RESET_SUCCESS_INDICATORS: {
      return {
        ...state,
        loader: false,
        changePasswordSuccess: false,
        editUserSuccess: false,
        addUserSuccess: false
      };
    }
    default:
      return state;
  }
};
