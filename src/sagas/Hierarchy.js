import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import config from "../config/masterData";
import axios from "axios";
import {
  fetchHierarchySuccess,
  searchHierarchySuccess,
  showHierarchyMessage,
  showHierarchysParentPageMessage,
  fetchIndividualHierarchySuccess,
  addHierarchySuccess,
  deleteHierarchySuccess,
  showDeleteHierarchyMessage,
  editHierarchySuccess,
  getHierarchyTypesSuccess,
  getHierarchyTypesNameSuccess,
  fetchAllHierarchySuccess
} from "../actions/Hierarchy";
import {
  FETCH_HIERARCHY_WITH_PAGINATION,
  FETCH_ALL_HIERARCHY,
  FETCH_INDIVIDUAL_HIERARCHY,
  ADD_HIERARCHY,
  DELETE_HIERARCHY,
  DELETE_HIERARCHY_From_ViewPage,
  EDIT_HIERARCHY,
  SEARCH_HIERARCHYS,
  GET_HIERARCHY_TYPES,
  GET_HIERARCHY_TYPES_NAME
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';


const getHierarchies = async obj =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/hierarchies?pagenumber=" +
      obj.pageNumber +
      "&pagesize=" +
      obj.pageSize,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(hierarchyList => {
      return hierarchyList;
    })
    .catch(error => error);


const getAllHierarchies = async obj =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/hierarchies",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(hierarchyList => {
      return hierarchyList;
    })
    .catch(error => error);

const searchHierarchies = async query =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/hierarchies?name=" +
      query.byName +
      "&email=" +
      query.byEmail,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(hierarchysList => {
      return hierarchysList;
    })
    .catch(error => error);

const getHierarchyTypes = async () =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/hierarchytypes",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(hierarchiesList => {
      return hierarchiesList;
    })
    .catch(error => error);

const getHierarchyTypesName = async typeValue =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/hierarchies?HierarchyTypeId=" +
      typeValue,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(hierarchiesList => {
      return hierarchiesList;
    })
    .catch(error => error);

const addHierarchies = async obj =>
  await axios({
    method: "post",
    url: config().apiUrl + "/v1.0/hierarchies",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") },
    data: {
      code: obj.code,
      contactNumber: obj.contactNumber,
      description: obj.description,
      emailAddress: obj.emailAddress,
      image: obj.image,
      name: obj.name,
      parentId: obj.parentId,
      secondaryCode: obj.secondaryCode,
      hierarchyTypeId: obj.hierarchyTypeId,
    }
  })
    .then(result => {
      return result;
    })
    .catch(error => error);

const editHierarchies = async obj =>
  await axios({
    method: "put",
    url: config().apiUrl + "/v1.0/hierarchies/" + obj.id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") },
    data: {
      hierarchyTypeId: obj.hierarchyTypeId,
      name: obj.name,
      emailAddress: obj.emailAddress,
      code: obj.code,
      contactNumber: obj.contactNumber,
      description: obj.description,
      image: obj.image,
      parentId: obj.parentId
    }
  })
    .then(result => {
      return result;
    })
    .catch(error => error);

const getIndividualHierarchies = async data =>
  await axios({
    method: "get",
    url: config().apiUrl + "/v1.0/hierarchies/" + data.payload.id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(employeeIndvidualList => {
      return employeeIndvidualList;
    })
    .catch(error => error);

const deleteHierarchies = async obj =>
  await axios({
    method: "delete",
    url: config().apiUrl + "/v1.0/hierarchies/" + obj.id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(deleteHierarchyRecord => {
      return deleteHierarchyRecord;
    })
    .catch(error => error);

const deleteHierarchiesFromViewPage = async id =>
  await axios({
    method: "delete",
    url: config().apiUrl + "/v1.0/hierarchies/" + id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(deleteHierarchyRecord => {
      return deleteHierarchyRecord;
    })
    .catch(error => error);


function* fetchIndividualHierarchyRequest(data) {
  try {
    const fetchedHierarchy = yield call(getIndividualHierarchies, data);
    if (fetchedHierarchy.message) {
      if(fetchedHierarchy.response){
        yield put(showHierarchyMessage(errorHandle(fetchedHierarchy.response)));
      }
      else{
        yield put(showHierarchyMessage(fetchedHierarchy.message));
      }
    } else {
      fetchedHierarchy.data.page = data.payload.page;
      yield put(fetchIndividualHierarchySuccess(fetchedHierarchy));
    }
  } catch (error) {
    yield put(showHierarchyMessage(error));
  }
}


function* fetchAllHierarchyRequest(obj) {
  try {
    const fetchedHierarchy = yield call(getAllHierarchies, obj.payload);
    if (fetchedHierarchy.message) {
      if(fetchedHierarchy.response){
        yield put(showHierarchyMessage(errorHandle(fetchedHierarchy.response)));
      }
      else{
        yield put(showHierarchyMessage(fetchedHierarchy.message));
      }
    } else {
      yield put(fetchAllHierarchySuccess(fetchedHierarchy));
    }
  } catch (error) {
    yield put(showHierarchyMessage(error));
  }
}

function* searchHierarchyRequest(obj) {
  try {
    const searchedHierarchy = yield call(searchHierarchies, obj.payload);
    if (searchedHierarchy.message) {
      if(searchedHierarchy.response){
        yield put(showHierarchyMessage(errorHandle(searchedHierarchy.response)));
      }
      else{
        yield put(showHierarchyMessage(searchedHierarchy.message));
      }
    } else {
      yield put(searchHierarchySuccess(searchedHierarchy));
    }
  } catch (error) {
    yield put(showHierarchyMessage(error));
  }
}

function* getHierarchyTypesRequest(data) {
  try {
    const gettingHierarchyTypes = yield call(getHierarchyTypes);
    if (gettingHierarchyTypes.message) {
      if(gettingHierarchyTypes.response){
        yield put(showHierarchyMessage(errorHandle(gettingHierarchyTypes.response)));
      }
      else{
        yield put(showHierarchyMessage(gettingHierarchyTypes.message));
      }
    } else {
      gettingHierarchyTypes.data.page = data.payload.page;
      yield put(getHierarchyTypesSuccess(gettingHierarchyTypes));
    }
  } catch (error) {
    yield put(showHierarchyMessage(error));
  }
}

function* getHierarchyTypesNameRequest(obj) {
  try {
    const gettingTypes = yield call(getHierarchyTypesName, obj.payload);
    if (gettingTypes.message) {
      if(gettingTypes.response){
        yield put(showHierarchyMessage(errorHandle(gettingTypes.response)));
      }
      else{
        yield put(showHierarchyMessage(gettingTypes.message));
      }
    } else {
      yield put(getHierarchyTypesNameSuccess(gettingTypes));
    }
  } catch (error) {
    yield put(showHierarchyMessage(error));
  }
}

function* fetchHierarchyRequest(obj) {
  try {
    const fetchedHierarchy = yield call(getHierarchies, obj.payload);
    if (fetchedHierarchy.message) {
      if(fetchedHierarchy.response){
        yield put(showHierarchysParentPageMessage(errorHandle(fetchedHierarchy.response)));
      }
      else{
        yield put(showHierarchysParentPageMessage(fetchedHierarchy.message));
      }
    } else {
      yield put(fetchHierarchySuccess(fetchedHierarchy));
    }
  } catch (error) {
    yield put(showHierarchysParentPageMessage(error));
  }
}

function* addHierarchyRequest(obj) {
  try {
    const addHierarchy = yield call(addHierarchies, obj.payload);
    if (addHierarchy.message) {
      if(addHierarchy.response){
        yield put(showHierarchyMessage(errorHandle(addHierarchy.response)));
      }
      else{
        yield put(showHierarchyMessage(addHierarchy.message));
      }
    } else {
      yield put(addHierarchySuccess(addHierarchy));
    }
  } catch (error) {
    yield put(showHierarchyMessage(error));
  }
}

function* deleteHierarchyRequest(obj) {
  try {
    const deleteHierarchy = yield call(deleteHierarchies, obj.payload);
    if (deleteHierarchy.message) {
      if(deleteHierarchy.response){
        yield put(showDeleteHierarchyMessage(errorHandle(deleteHierarchy.response)));
      }
      else{
        yield put(showDeleteHierarchyMessage(deleteHierarchy.message));
      }
    }
    else {
      yield put(deleteHierarchySuccess(deleteHierarchy));
      try {
        const fetchedHierarchy = yield call(getHierarchies, obj.payload);
        if (fetchedHierarchy.message) {
          if(fetchedHierarchy.response){
            yield put(showHierarchyMessage(errorHandle(fetchedHierarchy.response)));
          }
          else{
            yield put(showHierarchyMessage(fetchedHierarchy.message));
          }
        } else {
          yield put(fetchHierarchySuccess(fetchedHierarchy));
        }
      } catch (error) {
        yield put(showHierarchyMessage(error));
      }
    }
  } catch (error) {
    yield put(showDeleteHierarchyMessage(error));
  }
}

function* deleteHierarchyRequestFromViewPage(obj) {
  try {
    const deleteHierarchy = yield call(deleteHierarchiesFromViewPage, obj.payload);
    if (deleteHierarchy.message) {
      if(deleteHierarchy.response){
        yield put(showDeleteHierarchyMessage(errorHandle(deleteHierarchy.response)));
      }
      else{
        yield put(showDeleteHierarchyMessage(deleteHierarchy.message));
      }
    } else {
      yield put(deleteHierarchySuccess(deleteHierarchy));
    }
  } catch (error) {
    yield put(showDeleteHierarchyMessage(error));
  }
}

function* editHierarchyRequest(obj) {
  try {
    const editHierarchy = yield call(editHierarchies, obj.payload);
    if (editHierarchy.message) {
      if(editHierarchy.response){
        yield put(showHierarchyMessage(errorHandle(editHierarchy.response)));
      }
      else{
        yield put(showHierarchyMessage(editHierarchy.message));
      }
    } else {
      yield put(editHierarchySuccess(editHierarchy));
    }
  } catch (error) {
    yield put(showHierarchyMessage(error));
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_HIERARCHY_WITH_PAGINATION, fetchHierarchyRequest),
    takeEvery(ADD_HIERARCHY, addHierarchyRequest),
    takeEvery(EDIT_HIERARCHY, editHierarchyRequest),
    takeEvery(FETCH_INDIVIDUAL_HIERARCHY, fetchIndividualHierarchyRequest),
    takeEvery(FETCH_ALL_HIERARCHY, fetchAllHierarchyRequest),
    takeEvery(DELETE_HIERARCHY, deleteHierarchyRequest),
    takeEvery(DELETE_HIERARCHY_From_ViewPage, deleteHierarchyRequestFromViewPage),
    takeEvery(SEARCH_HIERARCHYS, searchHierarchyRequest),
    takeEvery(GET_HIERARCHY_TYPES, getHierarchyTypesRequest),
    takeEvery(GET_HIERARCHY_TYPES_NAME, getHierarchyTypesNameRequest)
  ]);
}
