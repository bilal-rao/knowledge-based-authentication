import {
  FETCH_ALL_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_WITH_PAGINATION_SUCCESS,
  SEARCH_PRODUCTS_SUCCESS,
  FETCH_INDIVIDUAL_PRODUCT_SUCCESS,
  SHOW_PRODUCT_MESSAGE,
  SHOW_PRODUCTS_PARENT_PAGE_MESSAGE,
  HIDE_PRODUCT_MESSAGE,
  HIDE_PRODUCT_MAIN_PAGE_MESSAGE,
  ON_SHOW_PRODUCT_LOADER,
  ON_SHOW_PRODUCT_MAIN_PAGE_LOADER,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  ON_SHOW_PRODUCT_DELETE_LOADER,
  SHOW_DELETE_PRODUCT_MESSAGE,
  HIDE_PRODUCT_DELETE_MESSAGE,
  EDIT_PRODUCT_SUCCESS,
  EDIT_DRAFT_PRODUCT_SUCCESS,
  REMOVE_INDIVIDUAL_PRODUCT_DATA,
  RESET_SUCCESS_INDICATORS
} from "../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  productsList: "",
  allProducts: null,
  addProduct: null,
  editProduct: null,
  individualProductData: null,
  alertMessage: "",
  showMessage: false,
  showMainPageMessage: false,
  alertMainPageMessage: "",
  productListSuccess: false,
  addProductSuccess: false,
  deleteProductSuccess: false,
  editProductSuccess: false,
  editProductError: false,
  productDetailSuccess: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loader: false,
        productListSuccess: true,
        allProducts: action.payload,
        rowsDelete: [],
        isSort: false,
        individualProductData: null,
        addProduct: null,
        showMessage: false,
        alertMessage: "",
        showMainPageMessage: false,
        alertMainPageMessage: "",
        editProduct: null,
        deleteProductSuccess: false
      };
    }
    case FETCH_PRODUCTS_WITH_PAGINATION_SUCCESS: {
      return {
        ...state,
        loader: false,
        productListSuccess: true,
        addProduct: null,
        productsList: action.payload,
        allProducts: null,
        rowsDelete: [],
        isSort: false,
        deleteProduct: false,
        individualProductData: null,
        editProduct: null,
        deleteProductSuccess: false
      };
    }
    case SHOW_PRODUCTS_PARENT_PAGE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMainPageMessage: action.payload,
        showMainPageMessage: true,
        alertMessage: "",
        showMessage: false,
        deleteProductSuccess: false
      };
    }
    case SEARCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loader: false,
        productListSuccess: true,
        productsList: action.payload,
        rowsDelete: [],
        isSort: false,
        deleteProductSuccess: false,
        individualProductData: null
      };
    }
    case FETCH_INDIVIDUAL_PRODUCT_SUCCESS: {
      return {
        ...state,
        loader: false,
        individualProductData: action.payload,
        deleteProductSuccess: false,
        productDetailSuccess: true
      };
    }
    case ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        loader: false,
        individualProductData: null,
        addProduct: action.payload,
        alertMessage: "",
        showMessage: true,
        addProductSuccess: true,
        deleteProductSuccess: false,
        editProductSuccess: false
      };
    }
    case SHOW_PRODUCT_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true,
        deleteProductSuccess: false
      };
    }
    case HIDE_PRODUCT_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: "",
        showMessage: false,
        addProductSuccess: false,
        deleteProductSuccess: false,
        editProductSuccess: false
      };
    }
    case HIDE_PRODUCT_MAIN_PAGE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMainPageMessage: "",
        showMainPageMessage: false,
        alertMessage: "",
        showMessage: false,
        addProductSuccess: false,
        deleteProductSuccess: false,
        editProductSuccess: false
      };
    }
    case ON_SHOW_PRODUCT_LOADER: {
      return {
        ...state,
        loader: true,
        deleteProductSuccess: false
      };
    }
    case ON_SHOW_PRODUCT_MAIN_PAGE_LOADER: {
      return {
        ...state,
        loader: true,
        deleteProductSuccess: false
      };
    }
    case DELETE_PRODUCT_SUCCESS: {
      return {
        ...state,
        loader: false,
        deleteProductSuccess: true,
        addProductSuccess: false,
        deleteProductSuccess: false,
        editProductSuccess: false
      };
    }
    case ON_SHOW_PRODUCT_DELETE_LOADER: {
      return {
        ...state,
        loader: true,
        deleteProductSuccess: false
      };
    }
    case SHOW_DELETE_PRODUCT_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true,
        deleteProductSuccess: false
      };
    }
    case HIDE_PRODUCT_DELETE_MESSAGE: {
      return {
        ...state,
        loader: false,
        alertMessage: "",
        showMessage: false,
        deleteProductSuccess: false
      };
    }
    case EDIT_PRODUCT_SUCCESS: {
      return {
        ...state,
        loader: false,
        addProductSuccess: false,
        deleteProductSuccess: false,
        editProductSuccess: true,
        showMessage: true,
        editProduct: action.payload
      };
    }
    case EDIT_DRAFT_PRODUCT_SUCCESS: {
      return {
        ...state,
        loader: false,
        addProductSuccess: false,
        deleteProductSuccess: false,
        editProduct: true,
        showMessage: true,
        editProduct: action.payload
      };
    }
    case REMOVE_INDIVIDUAL_PRODUCT_DATA: {
      return {
        ...state,
        loader: false,
        individualProductData: null
      };
    }
    case RESET_SUCCESS_INDICATORS: {
      return {
        ...state,
        loader: false,
        editProductSuccess: false,
        addProductSuccess: false
      };
    }
    default:
      return state;
  }
};
