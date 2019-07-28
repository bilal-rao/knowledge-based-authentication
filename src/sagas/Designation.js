import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import config from "../config/masterData";
import axios from "axios";
import {
  fetchDesignationSuccess,
  searchDesignationSuccess,
  fetchAllDesignationsSuccess,
  showDesignationMessage,
  showDesignationsParentPageMessage,
  fetchIndividualDesignationSuccess,
  addDesignationSuccess,
  deleteDesignationSuccess,
  showDeleteDesignationMessage,
  editDesignationSuccess,
} from "../actions/Designation";
import {
  FETCH_INDIVIDUAL_DESIGNATION,
  FETCH_ALL_DESIGNATIONS,
  FETCH_DESIGNATIONS_WITH_PAGINATION,
  ADD_DESIGNATION,
  DELETE_DESIGNATION,
  DELETE_DESIGNATION_From_ViewPage,
  EDIT_DESIGNATION,
  SEARCH_DESIGNATIONS
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';

const getDesignations = async obj =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/designations?pagenumber=" +
      obj.pageNumber +
      "&pagesize=" +
      obj.pageSize,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(designationsList => {
      return designationsList;
    })
    .catch(error => error);

const searchDesignations = async query => 
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/Designations?departmentId=" + query.DepartmentId,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(designationsList => {
      return designationsList;
    })
    .catch(error => error);
  

const getAllDesignations = async obj =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/designations",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(designations => {
      return designations;
    })
    .catch(error => error);

const addDesignations = async obj =>
  await axios({
    method: "post",
    url: config().apiUrl + "/v1.0/designations",
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

const editDesignations = async obj =>
  await axios({
    method: "put",
    url: config().apiUrl + "/v1.0/designations/" + obj.Id,
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


const getIndividualDesignations = async data =>
  await axios({
    method: "get",
    url: config().apiUrl + "/v1.0/designations/" + data.payload.designationId,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(employeeIndvidualList => {
      return employeeIndvidualList;
    })
    .catch(error => error);

const deleteDesignations = async obj =>
  await axios({
    method: "delete",
    url: config().apiUrl + "/v1.0/Designations/" + obj.id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(deleteDesignationRecord => {
      return deleteDesignationRecord;
    })
    .catch(error => error);

const deleteDesignationsFromViewPage = async id =>
  await axios({
    method: "delete",
    url: config().apiUrl + "/v1.0/designations/" + id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(deleteDesignationRecord => {
      return deleteDesignationRecord;
    })
    .catch(error => error);


function* fetchDesignationRequest(obj) {
  try {
    const fetchedDesignation = yield call(getDesignations, obj.payload);
    if (fetchedDesignation.message) {
      if (fetchedDesignation.response) {
        yield put(showDesignationsParentPageMessage(errorHandle(fetchedDesignation.response)));
      }
      else {
        yield put(showDesignationsParentPageMessage(fetchedDesignation.message));
      }
    } else {
      yield put(fetchDesignationSuccess(fetchedDesignation));
    }
  } catch (error) {
    yield put(showDesignationsParentPageMessage(error));
  }
}

function* searchDesignationRequest(obj) {
  try {
    const searchedDesignation = yield call(searchDesignations, obj.payload);
    if (searchedDesignation.message) {
      if (searchedDesignation.response) {
        yield put(showDesignationMessage(errorHandle(searchedDesignation.response)));
      }
      else {
        yield put(showDesignationMessage(searchedDesignation.message));
      }
    } else {
      yield put(searchDesignationSuccess(searchedDesignation));
    }
  } catch (error) {
    yield put(showDesignationMessage(error));
  }
}

function* fetchAllDesignationsRequest() {
  try {
    const fetchedDesignation = yield call(getAllDesignations);
    if (fetchedDesignation.message) {
      if (fetchedDesignation.response) {
        yield put(showDesignationMessage(errorHandle(fetchedDesignation.response)));
      }
      else {
        yield put(showDesignationMessage(fetchedDesignation.message));
      }
    }
    else {
      yield put(fetchAllDesignationsSuccess(fetchedDesignation));
    }
  } catch (error) {
    yield put(showDesignationMessage(error));
  }
}
function* fetchIndividualDesignationRequest(data) {
  try {
    const fetchedDesignation = yield call(getIndividualDesignations, data);
    if (fetchedDesignation.message) {
      if (fetchedDesignation.response) {
        yield put(showDesignationMessage(errorHandle(fetchedDesignation.response)));
      }
      else {
        yield put(showDesignationMessage(fetchedDesignation.message));
      }
    } else {
      fetchedDesignation.data.page = data.payload.page;
      yield put(fetchIndividualDesignationSuccess(fetchedDesignation));
    }
  } catch (error) {
    yield put(showDesignationMessage(error));
  }
}

function* addDesignationRequest(obj) {
  try {
    const addDesignation = yield call(addDesignations, obj.payload);
    if (addDesignation.message) {
      if (addDesignation.response) {
        yield put(showDesignationMessage(errorHandle(addDesignation.response)));
      }
      else {
        yield put(showDesignationMessage(addDesignation.message));
      }
    } else {
      yield put(addDesignationSuccess(addDesignation));
    }
  } catch (error) {
    yield put(showDesignationMessage(error));
  }
}

function* deleteDesignationRequest(obj) {
  try {
    const deleteDesignation = yield call(deleteDesignations, obj.payload);
    if (deleteDesignation.message) {
      if (deleteDesignation.response) {
        yield put(showDeleteDesignationMessage(errorHandle(deleteDesignation.response)));
      }
      else {
        yield put(showDeleteDesignationMessage(deleteDesignation.message));
      }
    }
    else {
      yield put(deleteDesignationSuccess(deleteDesignation));
      try {
        const fetchedDesignation = yield call(getDesignations, obj.payload);
        if (fetchedDesignation.message) {
          if (fetchedDesignation.response) {
            yield put(showDesignationMessage(errorHandle(fetchedDesignation.response)));
          }
          else {
            yield put(showDesignationMessage(fetchedDesignation.message));
          }
        } else {
          yield put(fetchDesignationSuccess(fetchedDesignation));
        }
      } catch (error) {
        yield put(showDesignationMessage(error));
      }
    }
  } catch (error) {
    yield put(showDeleteDesignationMessage(error));
  }
}

function* deleteDesignationRequestFromViewPage(obj) {
  try {
    const deleteDesignation = yield call(deleteDesignationsFromViewPage, obj.payload);
    if (deleteDesignation.message) {
      if (deleteDesignation.response) {
        yield put(showDeleteDesignationMessage(errorHandle(deleteDesignation.response)));
      }
      else {
        yield put(showDeleteDesignationMessage(deleteDesignation.message));
      }
    } else {
      yield put(deleteDesignationSuccess(deleteDesignation));
    }
  } catch (error) {
    yield put(showDeleteDesignationMessage(error));
  }
}

function* editDesignationRequest(obj) {
  try {
    const editDesignation = yield call(editDesignations, obj.payload);
    if (editDesignation.message) {
      if (editDesignation.response) {
        yield put(showDesignationMessage(errorHandle(editDesignation.response)));
      }
      else {
        yield put(showDesignationMessage(editDesignation.message));
      }
    } else {
      yield put(editDesignationSuccess(editDesignation));
    }
  } catch (error) {
    yield put(showDesignationMessage(error));
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_DESIGNATIONS_WITH_PAGINATION, fetchDesignationRequest),
    takeEvery(FETCH_INDIVIDUAL_DESIGNATION, fetchIndividualDesignationRequest),
    takeEvery(ADD_DESIGNATION, addDesignationRequest),
    takeEvery(DELETE_DESIGNATION, deleteDesignationRequest),
    takeEvery(DELETE_DESIGNATION_From_ViewPage, deleteDesignationRequestFromViewPage),
    takeEvery(EDIT_DESIGNATION, editDesignationRequest),
    takeEvery(SEARCH_DESIGNATIONS, searchDesignationRequest),
    takeEvery(FETCH_ALL_DESIGNATIONS, fetchAllDesignationsRequest)
  ]);
}
