import {
  FETCH_ALL_ROLES_SUCCESS,
  FETCH_ROLES_WITH_PAGINATION_SUCCESS,
  SEARCH_ROLES_SUCCESS,
  FETCH_INDIVIDUAL_ROLE_SUCCESS,
  SHOW_ROLE_MESSAGE,
  SHOW_ROLES_PARENT_PAGE_MESSAGE,
  HIDE_ROLE_MESSAGE,
  HIDE_ROLE_MAIN_PAGE_MESSAGE,
  ON_SHOW_ROLE_LOADER,
  ON_SHOW_ROLE_MAIN_PAGE_LOADER,
  ADD_ROLE_SUCCESS,
  DELETE_ROLE_SUCCESS,
  ON_SHOW_ROLE_DELETE_LOADER,
  SHOW_DELETE_ROLE_MESSAGE,
  HIDE_ROLE_DELETE_MESSAGE,
  EDIT_ROLE_SUCCESS,
  FETCH_ALL_MODULES_SUCCESS,
  REMOVE_INDIVIDUAL_ROLE_DATA
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  mainLoader: false,
  rolesList: "",
  allRoles: null,
  addRole: null,
  editRole: null,
  individualRoleData: null,
  alertMessage: "",
  showMessage: false,
  showMainPageMessage: false,
  alertMainPageMessage: "",
  roleListSuccess: false,
  deleteRoleSuccess: false,
  editRoleError: false,
  roleDetailSuccess: false,
  addRoleSuccess: false,
  fetchAllModulesSuccess: false,
  fetchAllModules: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_ROLES_SUCCESS: {
      return {
        ...state,
        loader: false,
        mainLoader: false,
        deleteRoleLoader: false,
        roleListSuccess: true,
        allRoles: action.payload,
        rowsDelete: [],
        isSort: false,
        individualRoleData: null,
        addRole: null,
        showMessage: false,
        alertMessage: "",
        showMainPageMessage: false,
        alertMainPageMessage: "",
        editRole: null,
        deleteRoleSuccess: false
      };
    }
    case FETCH_ROLES_WITH_PAGINATION_SUCCESS: {
      return {
        ...state,
        loader: false,
        mainLoader: false,
        roleListSuccess: true,
        rolesList: action.payload,
        allRoles: null,
        rowsDelete: [],
        isSort: false,
        deleteRole: false,
        individualRoleData: null,
        editRole: null,
        addRole: null,
        deleteRoleSuccess: false
      };
    }

    case SHOW_ROLES_PARENT_PAGE_MESSAGE: {
      return {
        ...state,
        mainLoader: false,
        alertMainPageMessage: action.payload,
        showMainPageMessage: true,
        alertMessage: "",
        showMessage: false,
        deleteRoleSuccess: false
      }
    }
    case SEARCH_ROLES_SUCCESS: {
      return {
        ...state,
        loader: false,
        roleListSuccess: true,
        rolesList: action.payload,
        rowsDelete: [],
        isSort: false,
        deleteRoleLoader: false,
        deleteRoleSuccess: false,
        individualRoleData: null,
      };
    }
    case FETCH_INDIVIDUAL_ROLE_SUCCESS: {
      return {
        ...state,
        individualRoleData: action.payload,
        deleteRoleSuccess: false,
        roleDetailSuccess: true,
        loader: false
      };
    }
    case ADD_ROLE_SUCCESS: {
      return {
        ...state,
        individualRoleData: null,
        loader: false,
        addRole: action.payload,
        alertMessage: '',
        showMessage: false,
        deleteRoleSuccess: false
      };
    }
    case SHOW_ROLE_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        deleteRoleSuccess: false
      };
    }
    case HIDE_ROLE_MESSAGE: {
      return {
          ...state,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteRoleSuccess: false
      }
  }
    case HIDE_ROLE_MAIN_PAGE_MESSAGE: {
       return {
      ...state,
      alertMainPageMessage: "",
      showMainPageMessage: false,
      mainLoader: false,
      alertMessage: "",
      showMessage: false,
      loader: false,
      deleteRoleSuccess: false
    }
  }
    case ON_SHOW_ROLE_LOADER: {
      return {
          ...state,
          loader: true,
          deleteRoleSuccess: false
      }
  }
  case ON_SHOW_ROLE_MAIN_PAGE_LOADER: {
    return {
      ...state,
      mainLoader: true,
      deleteRoleSuccess: false
    }
  }

    case DELETE_ROLE_SUCCESS: {
      return {
        ...state,
        deleteRoleSuccess: true,
        deleteRoleLoader: false,
      };
    }
    case ON_SHOW_ROLE_DELETE_LOADER: {
      return {
          ...state,
          deleteRoleSuccess: false,
          deleteRoleLoader: true,
          loader: false,
          mainLoader: false
      }
  }
    case SHOW_DELETE_ROLE_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        deleteRoleLoader: false,
        loader: false,
        mainLoader: false,
        deleteRoleSuccess: false
      };
    }
    case HIDE_ROLE_DELETE_MESSAGE: {
      return {
          ...state,
          alertMessage: "",
          showMessage: false,
          deleteRoleLoader: false,
          loader: false,
          mainLoader: false,
          deleteRoleSuccess: false
      }
  }
    case EDIT_ROLE_SUCCESS: {
      return {
        ...state,
        deleteRoleLoader: false,
        deleteRoleSuccess: false,
        editRole: action.payload,
        loader: false
      };
    }

    case FETCH_ALL_MODULES_SUCCESS: {
      return {
        ...state,
        fetchAllModulesSuccess: true,
        fetchAllModules: action.payload,
        loader: false
      };
    }


    case REMOVE_INDIVIDUAL_ROLE_DATA: {
      return {
        ...state,
        individualRoleData: null
      }
    }
    default:
      return state;
  }
};
