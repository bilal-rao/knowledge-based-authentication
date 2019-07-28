import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import config from "../config/documentManagement";
import axios from "axios";
import {
  fetchDocumentTypeSuccess,
  searchDocumentTypeSuccess,
  fetchAllDocumentTypesSuccess,
  showDocumentTypeMessage,
  showDocumentTypesParentPageMessage,
  fetchIndividualDocumentTypeSuccess,
  addDocumentTypeSuccess,
  deleteDocumentTypeSuccess,
  showDeleteDocumentTypeMessage,
  editDocumentTypeSuccess,
} from "../actions/DocumentTypes";
import {
  FETCH_INDIVIDUAL_DOCUMENT_TYPE,
  FETCH_ALL_DOCUMENT_TYPES,
  FETCH_DOCUMENT_TYPES_WITH_PAGINATION,
  ADD_DOCUMENT_TYPE,
  DELETE_DOCUMENT_TYPE,
  DELETE_DOCUMENT_TYPE_From_ViewPage,
  EDIT_DOCUMENT_TYPE,
  SEARCH_DOCUMENT_TYPES
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';

const getDocumentTypes = async obj =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/documentTypes?pagenumber=" +
      obj.pageNumber +
      "&pagesize=" +
      obj.pageSize,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(documentTypesList => {
      return documentTypesList;
    })
    .catch(error => error);

const searchDocumentTypes = async query =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/DocumentTypes?name=" +
      query.byName,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(documentTypesList => {
      return documentTypesList;
    })
    .catch(error => error);

const getAllDocumentTypes = async obj =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/documentTypes",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(documentTypes => {
      return documentTypes;
    })
    .catch(error => error);

const addDocumentTypes = async obj =>
  await axios({
    method: "post",
    url: config().apiUrl + "/v1.0/documentTypes",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") },
    data: {
      emailAddress: obj.emailAddress,
      name: obj.name,
      RoleIds: obj.RolesIds
    }
  })
    .then(result => {
      return result;
    })
    .catch(error => error);

const editDocumentTypes = async obj =>
  await axios({
    method: "put",
    url: config().apiUrl + "/v1.0/documentTypes/" + obj.Id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") },
    data: {
      name: obj.name,
      RoleIds: obj.roles,
      status: obj.status
    }
  })
    .then(result => {
      return result;
    })
    .catch(error => error);


const getIndividualDocumentTypes = async data =>
  await axios({
    method: "get",
    url: config().apiUrl + "/v1.0/documentTypes/" + data.payload.documentTypeId,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(employeeIndvidualList => {
      return employeeIndvidualList;
    })
    .catch(error => error);

const deleteDocumentTypes = async obj =>
  await axios({
    method: "delete",
    url: config().apiUrl + "/v1.0/DocumentTypes/" + obj.id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(deleteDocumentTypeRecord => {
      return deleteDocumentTypeRecord;
    })
    .catch(error => error);

const deleteDocumentTypesFromViewPage = async id =>
  await axios({
    method: "delete",
    url: config().apiUrl + "/v1.0/documentTypes/" + id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(deleteDocumentTypeRecord => {
      return deleteDocumentTypeRecord;
    })
    .catch(error => error);


function* fetchDocumentTypeRequest(obj) {
  try {
    const fetchedDocumentType = yield call(getDocumentTypes, obj.payload);
    if (fetchedDocumentType.message) {
      if (fetchedDocumentType.response) {
        yield put(showDocumentTypesParentPageMessage(errorHandle(fetchedDocumentType.response)));
      }
      else {
        yield put(showDocumentTypesParentPageMessage(fetchedDocumentType.message));
      }
    } else {
      yield put(fetchDocumentTypeSuccess(fetchedDocumentType));
    }
  } catch (error) {
    yield put(showDocumentTypesParentPageMessage(error));
  }
}

function* searchDocumentTypeRequest(obj) {
  try {
    const searchedDocumentType = yield call(searchDocumentTypes, obj.payload);
    if (searchedDocumentType.message) {
      if (searchedDocumentType.response) {
        yield put(showDocumentTypeMessage(errorHandle(searchedDocumentType.response)));
      }
      else {
        yield put(showDocumentTypeMessage(searchedDocumentType.message));
      }
    } else {
      yield put(searchDocumentTypeSuccess(searchedDocumentType));
    }
  } catch (error) {
    yield put(showDocumentTypeMessage(error));
  }
}

function* fetchAllDocumentTypesRequest() {
  try {
    const fetchedDocumentType = yield call(getAllDocumentTypes);
    if (fetchedDocumentType.message) {
      if (fetchedDocumentType.response) {
        yield put(showDocumentTypeMessage(errorHandle(fetchedDocumentType.response)));
      }
      else {
        yield put(showDocumentTypeMessage(fetchedDocumentType.message));
      }
    }
    else {
      yield put(fetchAllDocumentTypesSuccess(fetchedDocumentType));
    }
  } catch (error) {
    yield put(showDocumentTypeMessage(error));
  }
}
function* fetchIndividualDocumentTypeRequest(data) {
  try {
    const fetchedDocumentType = yield call(getIndividualDocumentTypes, data);
    if (fetchedDocumentType.message) {
      if (fetchedDocumentType.response) {
        yield put(showDocumentTypeMessage(errorHandle(fetchedDocumentType.response)));
      }
      else {
        yield put(showDocumentTypeMessage(fetchedDocumentType.message));
      }
    } else {
      fetchedDocumentType.data.page = data.payload.page;
      yield put(fetchIndividualDocumentTypeSuccess(fetchedDocumentType));
    }
  } catch (error) {
    yield put(showDocumentTypeMessage(error));
  }
}

function* addDocumentTypeRequest(obj) {
  try {
    const addDocumentType = yield call(addDocumentTypes, obj.payload);
    if (addDocumentType.message) {
      if (addDocumentType.response) {
        yield put(showDocumentTypeMessage(errorHandle(addDocumentType.response)));
      }
      else {
        yield put(showDocumentTypeMessage(addDocumentType.message));
      }
    } else {
      yield put(addDocumentTypeSuccess(addDocumentType));
    }
  } catch (error) {
    yield put(showDocumentTypeMessage(error));
  }
}

function* deleteDocumentTypeRequest(obj) {
  try {
    const deleteDocumentType = yield call(deleteDocumentTypes, obj.payload);
    if (deleteDocumentType.message) {
      if (deleteDocumentType.response) {
        yield put(showDeleteDocumentTypeMessage(errorHandle(deleteDocumentType.response)));
      }
      else {
        yield put(showDeleteDocumentTypeMessage(deleteDocumentType.message));
      }
    }
    else {
      yield put(deleteDocumentTypeSuccess(deleteDocumentType));
      try {
        const fetchedDocumentType = yield call(getDocumentTypes, obj.payload);
        if (fetchedDocumentType.message) {
          if (fetchedDocumentType.response) {
            yield put(showDocumentTypeMessage(errorHandle(fetchedDocumentType.response)));
          }
          else {
            yield put(showDocumentTypeMessage(fetchedDocumentType.message));
          }
        } else {
          yield put(fetchDocumentTypeSuccess(fetchedDocumentType));
        }
      } catch (error) {
        yield put(showDocumentTypeMessage(error));
      }
    }
  } catch (error) {
    yield put(showDeleteDocumentTypeMessage(error));
  }
}

function* deleteDocumentTypeRequestFromViewPage(obj) {
  try {
    const deleteDocumentType = yield call(deleteDocumentTypesFromViewPage, obj.payload);
    if (deleteDocumentType.message) {
      if (deleteDocumentType.response) {
        yield put(showDeleteDocumentTypeMessage(errorHandle(deleteDocumentType.response)));
      }
      else {
        yield put(showDeleteDocumentTypeMessage(deleteDocumentType.message));
      }
    } else {
      yield put(deleteDocumentTypeSuccess(deleteDocumentType));
    }
  } catch (error) {
    yield put(showDeleteDocumentTypeMessage(error));
  }
}

function* editDocumentTypeRequest(obj) {
  try {
    const editDocumentType = yield call(editDocumentTypes, obj.payload);
    if (editDocumentType.message) {
      if (editDocumentType.response) {
        yield put(showDocumentTypeMessage(errorHandle(editDocumentType.response)));
      }
      else {
        yield put(showDocumentTypeMessage(editDocumentType.message));
      }
    } else {
      yield put(editDocumentTypeSuccess(editDocumentType));
    }
  } catch (error) {
    yield put(showDocumentTypeMessage(error));
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_DOCUMENT_TYPES_WITH_PAGINATION, fetchDocumentTypeRequest),
    takeEvery(FETCH_INDIVIDUAL_DOCUMENT_TYPE, fetchIndividualDocumentTypeRequest),
    takeEvery(ADD_DOCUMENT_TYPE, addDocumentTypeRequest),
    takeEvery(DELETE_DOCUMENT_TYPE, deleteDocumentTypeRequest),
    takeEvery(DELETE_DOCUMENT_TYPE_From_ViewPage, deleteDocumentTypeRequestFromViewPage),
    takeEvery(EDIT_DOCUMENT_TYPE, editDocumentTypeRequest),
    takeEvery(SEARCH_DOCUMENT_TYPES, searchDocumentTypeRequest),
    takeEvery(FETCH_ALL_DOCUMENT_TYPES, fetchAllDocumentTypesRequest)
  ]);
}
