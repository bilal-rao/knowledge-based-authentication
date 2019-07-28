import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import config from "../config/masterData";
import axios from "axios";
import {
  fetchDepartmentSuccess,
  searchDepartmentSuccess,
  fetchAllDepartmentsSuccess,
  showDepartmentMessage,
  showDepartmentsParentPageMessage,
  fetchIndividualDepartmentSuccess,
  addDepartmentSuccess,
  deleteDepartmentSuccess,
  showDeleteDepartmentMessage,
  editDepartmentSuccess,
} from "../actions/Department";
import {
  FETCH_INDIVIDUAL_DEPARTMENT,
  FETCH_ALL_DEPARTMENTS,
  FETCH_DEPARTMENTS_WITH_PAGINATION,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_From_ViewPage,
  EDIT_DEPARTMENT,
  SEARCH_DEPARTMENTS
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';

const getDepartments = async obj =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/departments?pagenumber=" +
      obj.pageNumber +
      "&pagesize=" +
      obj.pageSize,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(departmentsList => {
      return departmentsList;
    })
    .catch(error => error);

const searchDepartments = async query =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/Departments?name=" +
      query.byName,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(departmentsList => {
      return departmentsList;
    })
    .catch(error => error);

const getAllDepartments = async obj =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/departments",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(departments => {
      return departments;
    })
    .catch(error => error);

const addDepartments = async obj =>
  await axios({
    method: "post",
    url: config().apiUrl + "/v1.0/departments",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") },
    data: obj
  })
    .then(result => {
      return result;
    })
    .catch(error => error);

const editDepartments = async obj =>
  await axios({
    method: "put",
    url: config().apiUrl + "/v1.0/departments/" + obj.id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") },
    data: obj
  })
    .then(result => {
      return result;
    })
    .catch(error => error);

const getIndividualDepartments = async data =>
  await axios({
    method: "get",
    url: config().apiUrl + "/v1.0/departments/" + data.payload.id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(employeeIndvidualList => {
      return employeeIndvidualList;
    })
    .catch(error => error);

const deleteDepartments = async obj =>
  await axios({
    method: "delete",
    url: config().apiUrl + "/v1.0/Departments/" + obj.id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(deleteDepartmentRecord => {
      return deleteDepartmentRecord;
    })
    .catch(error => error);

const deleteDepartmentsFromViewPage = async id =>
  await axios({
    method: "delete",
    url: config().apiUrl + "/v1.0/departments/" + id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(deleteDepartmentRecord => {
      return deleteDepartmentRecord;
    })
    .catch(error => error);

function* fetchDepartmentRequest(obj) {
  try {
    const fetchedDepartment = yield call(getDepartments, obj.payload);
    if (fetchedDepartment.message) {
      if (fetchedDepartment.response) {
        yield put(showDepartmentsParentPageMessage(errorHandle(fetchedDepartment.response)));
      }
      else {
        yield put(showDepartmentsParentPageMessage(fetchedDepartment.message));
      }
    } else {
      yield put(fetchDepartmentSuccess(fetchedDepartment));
    }
  } catch (error) {
    yield put(showDepartmentsParentPageMessage(error));
  }
}

function* searchDepartmentRequest(obj) {
  try {
    const searchedDepartment = yield call(searchDepartments, obj.payload);
    if (searchedDepartment.message) {
      if (searchedDepartment.response) {
        yield put(showDepartmentMessage(errorHandle(searchedDepartment.response)));
      }
      else {
        yield put(showDepartmentMessage(searchedDepartment.message));
      }
    } else {
      yield put(searchDepartmentSuccess(searchedDepartment));
    }
  } catch (error) {
    yield put(showDepartmentMessage(error));
  }
}

function* fetchAllDepartmentsRequest() {
  try {
    const fetchedDepartment = yield call(getAllDepartments);
    if (fetchedDepartment.message) {
      if (fetchedDepartment.response) {
        yield put(showDepartmentMessage(errorHandle(fetchedDepartment.response)));
      }
      else {
        yield put(showDepartmentMessage(fetchedDepartment.message));
      }
    }
    else {
      yield put(fetchAllDepartmentsSuccess(fetchedDepartment));
    }
  } catch (error) {
    yield put(showDepartmentMessage(error));
  }
}

function* fetchIndividualDepartmentRequest(data) {
  try {
    const fetchedDepartment = yield call(getIndividualDepartments, data);
    if (fetchedDepartment.message) {
      if (fetchedDepartment.response) {
        yield put(showDepartmentMessage(errorHandle(fetchedDepartment.response)));
      }
      else {
        yield put(showDepartmentMessage(fetchedDepartment.message));
      }
    } else {
      fetchedDepartment.data.page = data.payload.page;
      yield put(fetchIndividualDepartmentSuccess(fetchedDepartment));
    }
  } catch (error) {
    yield put(showDepartmentMessage(error));
  }
}

function* addDepartmentRequest(obj) {
  try {
    const addDepartment = yield call(addDepartments, obj.payload);
    if (addDepartment.message) {
      if (addDepartment.response) {
        yield put(showDepartmentMessage(errorHandle(addDepartment.response)));
      }
      else {
        yield put(showDepartmentMessage(addDepartment.message));
      }
    } else {
      yield put(addDepartmentSuccess(addDepartment));
    }
  } catch (error) {
    yield put(showDepartmentMessage(error));
  }
}

function* deleteDepartmentRequest(obj) {
  try {
    const deleteDepartment = yield call(deleteDepartments, obj.payload);
    if (deleteDepartment.message) {
      if (deleteDepartment.response) {
        yield put(showDeleteDepartmentMessage(errorHandle(deleteDepartment.response)));
      }
      else {
        yield put(showDeleteDepartmentMessage(deleteDepartment.message));
      }
    }
    else {
      yield put(deleteDepartmentSuccess(deleteDepartment));
      try {
        const fetchedDepartment = yield call(getDepartments, obj.payload);
        if (fetchedDepartment.message) {
          if (fetchedDepartment.response) {
            yield put(showDepartmentMessage(errorHandle(fetchedDepartment.response)));
          }
          else {
            yield put(showDepartmentMessage(fetchedDepartment.message));
          }
        } else {
          yield put(fetchDepartmentSuccess(fetchedDepartment));
        }
      } catch (error) {
        yield put(showDepartmentMessage(error));
      }
    }
  } catch (error) {
    yield put(showDeleteDepartmentMessage(error));
  }
}

function* deleteDepartmentRequestFromViewPage(obj) {
  try {
    const deleteDepartment = yield call(deleteDepartmentsFromViewPage, obj.payload);
    if (deleteDepartment.message) {
      if (deleteDepartment.response) {
        yield put(showDeleteDepartmentMessage(errorHandle(deleteDepartment.response)));
      }
      else {
        yield put(showDeleteDepartmentMessage(deleteDepartment.message));
      }
    } else {
      yield put(deleteDepartmentSuccess(deleteDepartment));
    }
  } catch (error) {
    yield put(showDeleteDepartmentMessage(error));
  }
}

function* editDepartmentRequest(obj) {
  try {
    const editDepartment = yield call(editDepartments, obj.payload);
    if (editDepartment.message) {
      if (editDepartment.response) {
        yield put(showDepartmentMessage(errorHandle(editDepartment.response)));
      }
      else {
        yield put(showDepartmentMessage(editDepartment.message));
      }
    } else {
      yield put(editDepartmentSuccess(editDepartment));
    }
  } catch (error) {
    yield put(showDepartmentMessage(error));
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_DEPARTMENTS_WITH_PAGINATION, fetchDepartmentRequest),
    takeEvery(FETCH_INDIVIDUAL_DEPARTMENT, fetchIndividualDepartmentRequest),
    takeEvery(ADD_DEPARTMENT, addDepartmentRequest),
    takeEvery(DELETE_DEPARTMENT, deleteDepartmentRequest),
    takeEvery(DELETE_DEPARTMENT_From_ViewPage, deleteDepartmentRequestFromViewPage),
    takeEvery(EDIT_DEPARTMENT, editDepartmentRequest),
    takeEvery(SEARCH_DEPARTMENTS, searchDepartmentRequest),
    takeEvery(FETCH_ALL_DEPARTMENTS, fetchAllDepartmentsRequest)
  ]);
}
