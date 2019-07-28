import {
  FETCH_ALL_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENTS_WITH_PAGINATION_SUCCESS,
  SEARCH_DEPARTMENTS_SUCCESS,
  FETCH_INDIVIDUAL_DEPARTMENT_SUCCESS,
  SHOW_DEPARTMENT_MESSAGE,
  SHOW_DEPARTMENTS_PARENT_PAGE_MESSAGE,
  HIDE_DEPARTMENT_MESSAGE,
  HIDE_DEPARTMENT_MAIN_PAGE_MESSAGE,
  ON_SHOW_DEPARTMENT_LOADER,
  ON_SHOW_DEPARTMENT_MAIN_PAGE_LOADER,
  ADD_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_SUCCESS,
  ON_SHOW_DEPARTMENT_DELETE_LOADER,
  SHOW_DELETE_DEPARTMENT_MESSAGE,
  HIDE_DEPARTMENT_DELETE_MESSAGE,
  EDIT_DEPARTMENT_SUCCESS,
  EDIT_DRAFT_DEPARTMENT_SUCCESS,
  REMOVE_INDIVIDUAL_DEPARTMENT_DATA,
  RESET_SUCCESS_INDICATORS
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  mainLoader: false,
  departmentsList: "",
  allDepartments: null,
  addDepartment: null,
  editDepartment: null,
  individualDepartmentData: null,
  alertMessage: "",
  showMessage: false,
  showMainPageMessage: false,
  alertMainPageMessage: "",
  departmentListSuccess: false,
  deleteDepartmentSuccess: false,
  editDepartmentError: false,
  departmentDetailSuccess: false,
  editDepartmentSuccess: false,
  addDepartmentSuccess: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_DEPARTMENTS_SUCCESS: {
      return {
        ...state,
        loader: false,
        mainLoader: false,
        deleteDepartmentLoader: false,
        departmentListSuccess: true,
        allDepartments: action.payload,
        rowsDelete: [],
        isSort: false,
        individualDepartmentData: null,
        addDepartment: null,
        showMessage: false,
        alertMessage: "",
        showMainPageMessage: false,
        alertMainPageMessage: "",
        editDepartment: null,
        deleteDepartmentSuccess: false,
        editDepartmentSuccess: false,
        addDepartmentSuccess: false
      };
    }
    case FETCH_DEPARTMENTS_WITH_PAGINATION_SUCCESS: {
      return {
        ...state,
        loader: false,
        mainLoader: false,
        departmentListSuccess: true,
        addDepartment: null,
        departmentsList: action.payload,
        allDepartments: null,
        rowsDelete: [],
        isSort: false,
        deleteDepartment: false,
        individualDepartmentData: null,
        editDepartment: null,
        deleteDepartmentSuccess: false,
        editDepartmentSuccess: false,
        addDepartmentSuccess: false
      };
    }

    case SHOW_DEPARTMENTS_PARENT_PAGE_MESSAGE: {
      return {
        ...state,
        mainLoader: false,
        alertMainPageMessage: action.payload,
        showMainPageMessage: true,
        alertMessage: "",
        showMessage: false,
        deleteDepartmentSuccess: false
      }
    }
    case SEARCH_DEPARTMENTS_SUCCESS: {
      return {
        ...state,
        loader: false,
        departmentListSuccess: true,
        departmentsList: action.payload,
        rowsDelete: [],
        isSort: false,
        deleteDepartmentLoader: false,
        deleteDepartmentSuccess: false,
        individualDepartmentData: null,
        editDepartmentSuccess: false,
        addDepartmentSuccess: false
      };
    }
    case FETCH_INDIVIDUAL_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        individualDepartmentData: action.payload,
        deleteDepartmentSuccess: false,
        departmentDetailSuccess: true,
        loader: false,
        editDepartmentSuccess: false,
        addDepartmentSuccess: false
      };
    }
    case ADD_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        individualDepartmentData: null,
        loader: false,
        addDepartment: action.payload,
        alertMessage: '',
        showMessage: false,
        deleteDepartmentSuccess: false,
        editDepartmentSuccess: false,
        addDepartmentSuccess: true
      };
    }
    case SHOW_DEPARTMENT_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
        deleteDepartmentSuccess: false
      };
    }
    case HIDE_DEPARTMENT_MESSAGE: {
      return {
          ...state,
          alertMessage: "",
          showMessage: false,
          loader: false,
          deleteDepartmentSuccess: false
      }
  }
    case HIDE_DEPARTMENT_MAIN_PAGE_MESSAGE: {
       return {
      ...state,
      alertMainPageMessage: "",
      showMainPageMessage: false,
      mainLoader: false,
      alertMessage: "",
      showMessage: false,
      loader: false,
      deleteDepartmentSuccess: false
    }
  }
    case ON_SHOW_DEPARTMENT_LOADER: {
      return {
          ...state,
          loader: true,
          deleteDepartmentSuccess: false
      }
  }
  case ON_SHOW_DEPARTMENT_MAIN_PAGE_LOADER: {
    return {
      ...state,
      mainLoader: true,
      deleteDepartmentSuccess: false
    }
  }

    case DELETE_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        deleteDepartmentSuccess: true,
        deleteDepartmentLoader: false,
      };
    }
    case ON_SHOW_DEPARTMENT_DELETE_LOADER: {
      return {
          ...state,
          deleteDepartmentSuccess: false,
          deleteDepartmentLoader: true,
          loader: true,
          mainLoader: false
      }
  }
    case SHOW_DELETE_DEPARTMENT_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        deleteDepartmentLoader: false,
        loader: false,
        mainLoader: false,
        deleteDepartmentSuccess: false
      };
    }
    case HIDE_DEPARTMENT_DELETE_MESSAGE: {
      return {
          ...state,
          alertMessage: "",
          showMessage: false,
          deleteDepartmentLoader: false,
          loader: false,
          mainLoader: false,
          deleteDepartmentSuccess: false
      }
  }
    case EDIT_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        deleteDepartmentLoader: false,
        deleteDepartmentSuccess: false,
        editDepartment: action.payload,
        loader: false,
        editDepartmentSuccess: true,
        addDepartmentSuccess: false
      };
    }

    case EDIT_DRAFT_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        loader: false,
        deleteDepartmentSuccess: false,
        editDepartmentSuccess: true,
        addDepartmentSuccess: false,
        editDepartment: action.payload
      };
    }

    case REMOVE_INDIVIDUAL_DEPARTMENT_DATA: {
      return {
        ...state,
        individualDepartmentData: null
      }
    }
    case RESET_SUCCESS_INDICATORS: {
      return {
        ...state,
        loader: false,
        editDepartmentSuccess: false,
        addDepartmentSuccess: false
      };
    }
    default:
      return state;
  }
};
