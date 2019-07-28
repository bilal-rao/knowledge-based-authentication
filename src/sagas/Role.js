import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import config from "../config/identity";
import axios from "axios";
import {
  fetchRoleSuccess,
  searchRoleSuccess,
  fetchAllRolesSuccess,
  showRoleMessage,
  showRolesParentPageMessage,
  fetchIndividualRoleSuccess,
  addRoleSuccess,
  deleteRoleSuccess,
  showDeleteRoleMessage,
  editRoleSuccess,
  fetchAllModulesSuccess,
} from "../actions/Role";
import {
  FETCH_INDIVIDUAL_ROLE,
  FETCH_ALL_ROLES,
  FETCH_ROLES_WITH_PAGINATION,
  ADD_ROLE,
  DELETE_ROLE,
  DELETE_ROLE_From_ViewPage,
  EDIT_ROLE,
  SEARCH_ROLES,
  FETCH_ALL_MODULES
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';

const getRoles = async obj =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/roles?pagenumber=" +
      obj.pageNumber +
      "&pagesize=" +
      obj.pageSize,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(rolesList => {
      return rolesList;
    })
    .catch(error => error);

const searchRoles = async query =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/Roles?name=" +
      query.byName,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(rolesList => {
      return rolesList;
    })
    .catch(error => error);

const getAllRoles = async obj =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/roles",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(roles => {
      return roles;
    })
    .catch(error => error);

const getAllModules = async obj =>
  await axios({
    method: "get",
    url: config().apiUrl + "/v1.0/moduleactions",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(modules => {
      modules.data.map((item) => { item.moduleId = 'm-' + item.moduleId })
      return modules;
    })
    .catch(error => error);


const addRoles = async obj =>
  await axios({
    method: "post",
    url: config().apiUrl + "/v1.0/roles",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") },
    data: {
      name: obj.name,
      moduleActionId: obj.moduleActionId,
      description: obj.description,
    }
  })
    .then(result => {
      return result;
    })
    .catch(error => error);

const editRoles = async obj =>
  await axios({
    method: "put",
    url: config().apiUrl + "/v1.0/roles/" + obj.Id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") },
    data: {
      name: obj.name,
      moduleActionId: obj.moduleActionId,
      status: obj.status,
      description: obj.description
    }
  })
    .then(result => {
      return result;
    })
    .catch(error => error);

const getIndividualRoles = async data =>
  await axios({
    method: "get",
    url: config().apiUrl + "/v1.0/roles/" + data.payload.roleId,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") },
  })
    .then(employeeIndvidualList => {
      return employeeIndvidualList;
    })
    .catch(error => error);

const deleteRoles = async obj =>
  await axios({
    method: "delete",
    url: config().apiUrl + "/v1.0/Roles/" + obj.id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(deleteRoleRecord => {
      return deleteRoleRecord;
    })
    .catch(error => error);

const deleteRolesFromViewPage = async id =>
  await axios({
    method: "delete",
    url: config().apiUrl + "/v1.0/roles/" + id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(deleteRoleRecord => {
      return deleteRoleRecord;
    })
    .catch(error => error);

function* fetchRoleRequest(obj) {
  try {
    const fetchedRole = yield call(getRoles, obj.payload);
    if (fetchedRole.message) {
      if (fetchedRole.response) {
        yield put(showRolesParentPageMessage(errorHandle(fetchedRole.response)));
      }
      else {
        yield put(showRolesParentPageMessage(fetchedRole.message));
      }
    } else {
      yield put(fetchRoleSuccess(fetchedRole));
    }
  } catch (error) {
    yield put(showRolesParentPageMessage(error));
  }
}

function* searchRoleRequest(obj) {
  try {
    const searchedRole = yield call(searchRoles, obj.payload);
    if (searchedRole.message) {
      if (searchedRole.response) {
        yield put(showRoleMessage(errorHandle(searchedRole.response)));
      }
      else {
        yield put(showRoleMessage(searchedRole.message));
      }
    } else {
      yield put(searchRoleSuccess(searchedRole));
    }
  } catch (error) {
    yield put(showRoleMessage(error));
  }
}

function* fetchAllRolesRequest() {
  try {
    const fetchedRole = yield call(getAllRoles);
    if (fetchedRole.message) {
      if (fetchedRole.response) {
        yield put(showRoleMessage(errorHandle(fetchedRole.response)));
      }
      else {
        yield put(showRoleMessage(fetchedRole.message));
      }
    }
    else {
      yield put(fetchAllRolesSuccess(fetchedRole));
    }
  } catch (error) {
    yield put(showRoleMessage(error));
  }
}
function* fetchAllModulesRequest() {
  try {
    const fetchedModule = yield call(getAllModules);
    if (fetchedModule.message) {
      if (fetchedModule.response) {
        yield put(showRoleMessage(errorHandle(fetchedModule.response)));
      }
      else {
        yield put(showRoleMessage(fetchedModule.message));
      }
    }

    else {
      let checkedKeys = []
      if (fetchedModule.data) {
        function a(el) {
          if (el.actions) {
            el.actions.forEach((e) => {
              if (e.isSelected) {
                checkedKeys.push(String(e.moduleActionId));
              }
              if (el.modules) {
                el.modules.push(e);

              } else {
                el.modules = [];
                el.modules.push(e);
              }
            });
          }
        }
        function b(children) {
          if (children.modules) {
            children.modules.forEach((grChild) => {
              b(grChild);

            })
          }
          a(children);
        }
        fetchedModule.data.forEach(element => {
          b(element);
        });
      }
      yield put(fetchAllModulesSuccess(fetchedModule));
    }
  } catch (error) {
    //Role Message just for temporary 
    // Modules call should place on different file
    yield put(showRoleMessage(error));
  }
}


function* fetchIndividualRoleRequest(data) {
  try {
    const fetchedRole = yield call(getIndividualRoles, data);
    if (fetchedRole.message) {
      if (fetchedRole.response) {
        yield put(showRoleMessage(errorHandle(fetchedRole.response)));
      }
      else {
        yield put(showRoleMessage(fetchedRole.message));
      }
    } else {
      fetchedRole.data.page = data.payload.page;
      yield put(fetchIndividualRoleSuccess(fetchedRole));
    }
  } catch (error) {
    yield put(showRoleMessage(error));
  }
}

function* addRoleRequest(obj) {
  try {
    const addRole = yield call(addRoles, obj.payload);
    if (addRole.message) {
      if (addRole.response) {
        yield put(showRoleMessage(errorHandle(addRole.response)));
      }
      else {
        yield put(showRoleMessage(addRole.message));
      }
    } else {
      yield put(addRoleSuccess(addRole));
    }
  } catch (error) {
    yield put(showRoleMessage(error));
  }
}

function* deleteRoleRequest(obj) {
  try {
    const deleteRole = yield call(deleteRoles, obj.payload);
    if (deleteRole.message) {
      if (deleteRole.response) {
        yield put(showDeleteRoleMessage(errorHandle(errorHandle(deleteRole.response))));
      }
      else {
        yield put(showDeleteRoleMessage(deleteRole.message));
      }
    }
    else {
      yield put(deleteRoleSuccess(deleteRole));
      try {
        const fetchedRole = yield call(getRoles, obj.payload);
        if (fetchedRole.message) {
          if (fetchedRole.response) {
            yield put(showRoleMessage(errorHandle(fetchedRole.response)));
          }
          else {
            yield put(showRoleMessage(fetchedRole.message));
          }
        } else {
          yield put(fetchRoleSuccess(fetchedRole));
        }
      } catch (error) {
        yield put(showRoleMessage(error));
      }
    }
  } catch (error) {
    yield put(showDeleteRoleMessage(error));
  }
}

function* deleteRoleRequestFromViewPage(obj) {
  try {
    const deleteRole = yield call(deleteRolesFromViewPage, obj.payload);
    if (deleteRole.message) {
      if (deleteRole.response) {
        yield put(showDeleteRoleMessage(errorHandle(deleteRole.response)));
      }
      else {
        yield put(showDeleteRoleMessage(deleteRole.message));
      }
    } else {
      yield put(deleteRoleSuccess(deleteRole));
    }
  } catch (error) {
    yield put(showDeleteRoleMessage(error));
  }
}

function* editRoleRequest(obj) {
  try {
    const editRole = yield call(editRoles, obj.payload);
    if (editRole.message) {
      if (editRole.response) {
        yield put(showRoleMessage(errorHandle(editRole.response)));
      }
      else {
        yield put(showRoleMessage(editRole.message));
      }
    } else {
      yield put(editRoleSuccess(editRole));
    }
  } catch (error) {
    yield put(showRoleMessage(error));
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_ROLES_WITH_PAGINATION, fetchRoleRequest),
    takeEvery(FETCH_INDIVIDUAL_ROLE, fetchIndividualRoleRequest),
    takeEvery(ADD_ROLE, addRoleRequest),
    takeEvery(DELETE_ROLE, deleteRoleRequest),
    takeEvery(DELETE_ROLE_From_ViewPage, deleteRoleRequestFromViewPage),
    takeEvery(EDIT_ROLE, editRoleRequest),
    takeEvery(SEARCH_ROLES, searchRoleRequest),
    takeEvery(FETCH_ALL_ROLES, fetchAllRolesRequest),
    takeEvery(FETCH_ALL_MODULES, fetchAllModulesRequest)
  ]);
}
