import {
  FETCH_ALL_PRODUCTS,
  FETCH_ALL_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_WITH_PAGINATION,
  FETCH_PRODUCTS_WITH_PAGINATION_SUCCESS,
  SEARCH_PRODUCTS,
  SEARCH_PRODUCTS_SUCCESS,
  SHOW_PRODUCT_MESSAGE,
  SHOW_DELETE_PRODUCT_MESSAGE,
  SHOW_PRODUCTS_PARENT_PAGE_MESSAGE,
  HIDE_PRODUCT_MESSAGE,
  HIDE_PRODUCT_DELETE_MESSAGE,
  HIDE_PRODUCT_MAIN_PAGE_MESSAGE,
  FETCH_INDIVIDUAL_PRODUCT,
  FETCH_INDIVIDUAL_PRODUCT_SUCCESS,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ON_SHOW_PRODUCT_LOADER,
  ON_SHOW_PRODUCT_DELETE_LOADER,
  ON_SHOW_PRODUCT_MAIN_PAGE_LOADER,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_DRAFT_PRODUCT,
  EDIT_DRAFT_PRODUCT_SUCCESS,
  DELETE_PRODUCT_From_ViewPage,
  REMOVE_INDIVIDUAL_PRODUCT_DATA,
  RESET_SUCCESS_INDICATORS
} from "../constants/ActionTypes";

export const fetchProduct = obj => {
  return {
    type: FETCH_PRODUCTS_WITH_PAGINATION,
    payload: obj
  };
};

export const fetchProductSuccess = product => {
  return {
    type: FETCH_PRODUCTS_WITH_PAGINATION_SUCCESS,
    payload: product
  };
};

export const fetchAllProducts = () => {
  return {
    type: FETCH_ALL_PRODUCTS
  };
};

export const fetchAllProductsSuccess = products => {
  return {
    type: FETCH_ALL_PRODUCTS_SUCCESS,
    payload: products
  };
};

export const searchProduct = obj => {
  return {
    type: SEARCH_PRODUCTS,
    payload: obj
  };
};

export const searchProductSuccess = product => {
  return {
    type: SEARCH_PRODUCTS_SUCCESS,
    payload: product
  };
};

export const addProduct = obj => {
  return {
    type: ADD_PRODUCT,
    payload: obj
  };
};

export const addProductSuccess = obj => {
  return {
    type: ADD_PRODUCT_SUCCESS,
    payload: obj
  };
};

export const fetchIndividualProduct = data => {
  return {
    type: FETCH_INDIVIDUAL_PRODUCT,
    payload: data
  };
};

export const fetchIndividualProductSuccess = product => {
  return {
    type: FETCH_INDIVIDUAL_PRODUCT_SUCCESS,
    payload: product
  };
};

export const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT,
    payload: id
  };
};

export const deleteProductSuccess = () => {
  return {
    type: DELETE_PRODUCT_SUCCESS
  };
};

export const deleteProductFromViewPage = id => {
  return {
    type: DELETE_PRODUCT_From_ViewPage,
    payload: id
  };
};

export const editProduct = obj => {
  return {
    type: EDIT_PRODUCT,
    payload: obj
  };
};

export const editProductSuccess = obj => {
  return {
    type: EDIT_PRODUCT_SUCCESS,
    payload: obj
  };
};

export const editDraftProduct = obj => {
  return {
    type: EDIT_DRAFT_PRODUCT,
    payload: obj
  };
};

export const editDraftProductSuccess = obj => {
  return {
    type: EDIT_DRAFT_PRODUCT_SUCCESS,
    payload: obj
  };
};

export const showProductLoader = () => {
  return {
    type: ON_SHOW_PRODUCT_LOADER
  };
};

export const showProductDeleteLoader = () => {
  return {
    type: ON_SHOW_PRODUCT_DELETE_LOADER
  };
};

export const showProductMainPageLoader = () => {
  return {
    type: ON_SHOW_PRODUCT_MAIN_PAGE_LOADER
  };
};

export const hideProductMessage = () => {
  return {
    type: HIDE_PRODUCT_MESSAGE
  };
};

export const hideProductDeleteMessage = () => {
  return {
    type: HIDE_PRODUCT_DELETE_MESSAGE
  };
};

export const hideProductMainPageMessage = () => {
  return {
    type: HIDE_PRODUCT_MAIN_PAGE_MESSAGE
  };
};

export const showProductMessage = message => {
  return {
    type: SHOW_PRODUCT_MESSAGE,
    payload: message
  };
};

export const showDeleteProductMessage = message => {
  return {
    type: SHOW_DELETE_PRODUCT_MESSAGE,
    payload: message
  };
};

export const showProductsParentPageMessage = message => {
  return {
    type: SHOW_PRODUCTS_PARENT_PAGE_MESSAGE,
    payload: message
  };
};

export const removeIndividualProductData = () => {
  return {
    type: REMOVE_INDIVIDUAL_PRODUCT_DATA
  };
};

export const resetProductSuccessIndicators = () => {
  return {
    type: RESET_SUCCESS_INDICATORS
  };
};
