import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import endPointHandler from './../config/index';
import {
  fetchProductSuccess,
  searchProductSuccess,
  fetchAllProductsSuccess,
  showProductMessage,
  showProductsParentPageMessage,
  fetchIndividualProductSuccess,
  addProductSuccess,
  deleteProductSuccess,
  showDeleteProductMessage,
  editProductSuccess,
  editDraftProductSuccess,
} from "../actions/Product";
import {
  FETCH_INDIVIDUAL_PRODUCT,
  FETCH_ALL_PRODUCTS,
  FETCH_PRODUCTS_WITH_PAGINATION,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  DELETE_PRODUCT_From_ViewPage,
  EDIT_PRODUCT,
  EDIT_DRAFT_PRODUCT,
  SEARCH_PRODUCTS
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';

let jarvis = new endPointHandler('JARVIS');

const getProducts = async params => {
  return await jarvis.getHandler('Products', { pageNumber: params.pageNumber, pageSize: params.pageSize });
}

const searchProducts = async params => {
  return await jarvis.getHandler('Products', { name: params.name, code: params.code });
}

const getAllProducts = async () => {
  return await jarvis.getHandler('Products');
}

const getIndividualProducts = async params => {
  return await jarvis.getHandler(`Products/${params.payload.productId}`);
}

const addProducts = async params => {
  return await jarvis.postHandler('Products', params);
}

const editProducts = async params => {
  return await jarvis.putHandler(`Products/${params.pId}`, params);
}

const editDraftProductHandler = async params => {
  return await jarvis.putHandler(`Products/Drafts/${params.sId}`, params);
}

const deleteProducts = async params => {
  return await jarvis.deleteHandler(`Products/${params.id}`);
}

const deleteProductsFromViewPage = async params => {
  return await jarvis.deleteHandler(`Products/${params}`);
}

function* fetchProductRequest(obj) {
  try {
    const fetchedProduct = yield call(getProducts, obj.payload);
    if (fetchedProduct.message) {
      if (fetchedProduct.response) {
        yield put(showProductsParentPageMessage(errorHandle(fetchedProduct.response)));
      }
      else {
        yield put(showProductsParentPageMessage(fetchedProduct.message));
      }
    } else {
      yield put(fetchProductSuccess(fetchedProduct));
    }
  } catch (error) {
    yield put(showProductsParentPageMessage(error));
  }
}

function* searchProductRequest(obj) {
  try {
    const searchedProduct = yield call(searchProducts, obj.payload);
    if (searchedProduct.message) {
      if (searchedProduct.response) {
        yield put(showProductMessage(errorHandle(searchedProduct.response)));
      }
      else {
        yield put(showProductMessage(searchedProduct.message));
      }
    } else {
      yield put(searchProductSuccess(searchedProduct));
    }
  } catch (error) {
    yield put(showProductMessage(error));
  }
}

function* fetchAllProductsRequest() {
  try {
    const fetchedProduct = yield call(getAllProducts);
    if (fetchedProduct.message) {
      if (fetchedProduct.response) {
        yield put(showProductMessage(errorHandle(fetchedProduct.response)));
      }
      else {
        yield put(showProductMessage(fetchedProduct.message));
      }
    }
    else {
      yield put(fetchAllProductsSuccess(fetchedProduct));
    }
  } catch (error) {
    yield put(showProductMessage(error));
  }
}

function* fetchIndividualProductRequest(data) {
  try {
    const fetchedProduct = yield call(getIndividualProducts, data);
    if (fetchedProduct.message) {
      if (fetchedProduct.response) {
        yield put(showProductMessage(errorHandle(fetchedProduct.response)));
      }
      else {
        yield put(showProductMessage(fetchedProduct.message));
      }
    } else {
      fetchedProduct.data.page = data.payload.page;
      yield put(fetchIndividualProductSuccess(fetchedProduct));
    }
  } catch (error) {
    yield put(showProductMessage(error));
  }
}

function* addProductRequest(obj) {
  try {
    const addProduct = yield call(addProducts, obj.payload);
    if (addProduct.message) {
      if (addProduct.response) {
        yield put(showProductMessage(errorHandle(addProduct.response)));
      }
      else {
        yield put(showProductMessage(addProduct.message));
      }
    } else {
      yield put(addProductSuccess(addProduct));
    }
  } catch (error) {
    yield put(showProductMessage(error));
  }
}

function* deleteProductRequest(obj) {
  try {
    const deleteProduct = yield call(deleteProducts, obj.payload);
    if (deleteProduct.message) {
      if (deleteProduct.response) {
        yield put(showDeleteProductMessage(errorHandle(deleteProduct.response)));
      }
      else {
        yield put(showDeleteProductMessage(deleteProduct.message));
      }
    }
    else {
      yield put(deleteProductSuccess(deleteProduct));
      try {
        const fetchedProduct = yield call(getProducts, obj.payload);
        if (fetchedProduct.message) {
          if (fetchedProduct.response) {
            yield put(showProductMessage(errorHandle(fetchedProduct.response)));
          }
          else {
            yield put(showProductMessage(fetchedProduct.message));
          }
        } else {
          yield put(fetchProductSuccess(fetchedProduct));
        }
      } catch (error) {
        yield put(showProductMessage(error));
      }
    }
  } catch (error) {
    yield put(showDeleteProductMessage(error));
  }
}

function* deleteProductRequestFromViewPage(obj) {
  try {
    const deleteProduct = yield call(deleteProductsFromViewPage, obj.payload);
    if (deleteProduct.message) {
      if (deleteProduct.response) {
        yield put(showDeleteProductMessage(errorHandle(deleteProduct.response)));
      }
      else {
        yield put(showDeleteProductMessage(deleteProduct.message));
      }
    } else {
      yield put(deleteProductSuccess(deleteProduct));
    }
  } catch (error) {
    yield put(showDeleteProductMessage(error));
  }
}

function* editProductRequest(obj) {
  try {
    const editProduct = yield call(editProducts, obj.payload);
    if (editProduct.message) {
      if (editProduct.response) {
        yield put(showProductMessage(errorHandle(editProduct.response)));
      }
      else {
        yield put(showProductMessage(editProduct.message));
      }
    } else {
      yield put(editProductSuccess(editProduct));
    }
  } catch (error) {
    yield put(showProductMessage(error));
  }
}

function* editDraftProductRequest(obj) {
  try {
    const editDraftProduct = yield call(editDraftProductHandler, obj.payload);
    if (editDraftProduct.message) {
      if (editDraftProduct.response) {
        yield put(showProductMessage(errorHandle(editDraftProduct.response)));
      }
      else {
        yield put(showProductMessage(editDraftProduct.message));
      }
    } else {
      yield put(editDraftProductSuccess(editDraftProduct));
    }
  } catch (error) {
    yield put(showProductMessage(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_PRODUCTS_WITH_PAGINATION, fetchProductRequest),
    takeEvery(FETCH_INDIVIDUAL_PRODUCT, fetchIndividualProductRequest),
    takeEvery(ADD_PRODUCT, addProductRequest),
    takeEvery(DELETE_PRODUCT, deleteProductRequest),
    takeEvery(DELETE_PRODUCT_From_ViewPage, deleteProductRequestFromViewPage),
    takeEvery(EDIT_PRODUCT, editProductRequest),
    takeEvery(EDIT_DRAFT_PRODUCT, editDraftProductRequest),
    takeEvery(SEARCH_PRODUCTS, searchProductRequest),
    takeEvery(FETCH_ALL_PRODUCTS, fetchAllProductsRequest)
  ]);
}