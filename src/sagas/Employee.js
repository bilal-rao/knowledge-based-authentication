import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import endPointHandler from "./../config/index";
import {
  fetchUserSuccess,
  searchUserSuccess,
  showUserMessage,
  showUsersParentPageMessage,
  fetchIndividualUserSuccess,
  addUserSuccess,
  deleteUserSuccess,
  showDeleteUserMessage,
  editUserSuccess,
  editDraftUserSuccess,
  changePasswordSuccess
} from "../actions/Employee";
import {
  FETCH_ALL_USER,
  FETCH_INDIVIDUAL_USER,
  ADD_USER,
  DELETE_USER,
  DELETE_USER_From_ViewPage,
  EDIT_USER,
  EDIT_DRAFT_USER,
  SEARCH_USERS,
  CHANGE_PASSWORD
} from "../constants/ActionTypes";
import errorHandle from "../functions/errorHandle";

let identity = new endPointHandler("IDENTITY");

const getUsers = async params => {
  return await identity.getHandler("Users", {
    pageNumber: params.pageNumber,
    pageSize: params.pageSize
  });
};

const searchUsers = async params => {
  return await identity.getHandler("Users", {
    name: params.name,
    email: params.email
  });
};

const addUsers = async params => {
  return await identity.postHandler("Users", {
    emailAddress: params.emailAddress,
    name: params.name,
    code: params.code,
    description: params.description,
    groupIds: params.groupIds,
    departmentId: params.departmentId,
    designationId: params.designationId,
    hierarchyId: 1
  });
};

const editUsers = async params => {
  return await identity.putHandler(`Users/${params.uId}`, {
    userId: params.uId,
    emailAddress: params.emailAddress,
    name: params.name,
    code: params.code,
    description: params.description,
    groupIds: params.groupIds,
    departmentId: params.departmentId,
    designationId: params.designationId,
    status: params.status,
    hierarchyId: 1
  });
};

const editDraftUserHandler = async params => {
  return await identity.putHandler(`Users/Drafts/${params.sId}`, {
    userId: params.uId,
    emailAddress: params.emailAddress,
    name: params.name,
    code: params.code,
    description: params.description,
    groupIds: params.groupIds,
    departmentId: params.departmentId,
    designationId: params.designationId,
    status: params.status,
    hierarchyId: 1
  });
};

const getIndividualUsers = async params => {
  return await identity.getHandler(`Users/${params.payload.userId}`);
};

const deleteUsers = async params => {
  return await identity.deleteHandler(`Users/${params.id}`);
};

const deleteUsersFromViewPage = async params => {
  return await identity.deleteHandler(`Users/${params}`);
};

const changePassword = async params => {
  return await identity.putHandler(`Users/${params.id}/Password`, {
    password: params.password
  });
};

function* fetchUserRequest(obj) {
  try {
    const fetchedUser = yield call(getUsers, obj.payload);
    if (fetchedUser.message) {
      if (fetchedUser.response) {
        yield put(
          showUsersParentPageMessage(errorHandle(fetchedUser.response))
        );
      } else {
        yield put(showUsersParentPageMessage(fetchedUser.message));
      }
    } else {
      yield put(fetchUserSuccess(fetchedUser));
    }
  } catch (error) {
    yield put(showUsersParentPageMessage(error));
  }
}

function* searchUserRequest(obj) {
  try {
    const searchedUser = yield call(searchUsers, obj.payload);
    if (searchedUser.message) {
      if (searchedUser.response) {
        yield put(showUserMessage(errorHandle(searchedUser.response)));
      } else {
        yield put(showUserMessage(searchedUser.message));
      }
    } else {
      yield put(searchUserSuccess(searchedUser));
    }
  } catch (error) {
    yield put(showUserMessage(error));
  }
}

function* fetchIndividualUserRequest(data) {
  try {
    const fetchedUser = yield call(getIndividualUsers, data);
    if (fetchedUser.message) {
      if (fetchedUser.response) {
        yield put(showUserMessage(errorHandle(fetchedUser.response)));
      } else {
        yield put(showUserMessage(fetchedUser.message));
      }
    } else {
      fetchedUser.data.page = data.payload.page;
      yield put(fetchIndividualUserSuccess(fetchedUser));
    }
  } catch (error) {
    yield put(showUserMessage(error));
  }
}

function* addUserRequest(obj) {
  try {
    const addUser = yield call(addUsers, obj.payload);
    if (addUser.message) {
      if (addUser.response) {
        yield put(showUserMessage(errorHandle(addUser.response)));
      } else {
        yield put(showUserMessage(addUser.message));
      }
    } else {
      yield put(addUserSuccess(addUser));
    }
  } catch (error) {
    yield put(showUserMessage(error));
  }
}

function* deleteUserRequest(obj) {
  try {
    const deleteUser = yield call(deleteUsers, obj.payload);
    if (deleteUser.message) {
      if (deleteUser.response) {
        yield put(showDeleteUserMessage(errorHandle(deleteUser.response)));
      } else {
        yield put(showDeleteUserMessage(deleteUser.message));
      }
    } else {
      yield put(deleteUserSuccess(deleteUser));
      try {
        const fetchedUser = yield call(getUsers, obj.payload);
        if (fetchedUser.message) {
          if (fetchedUser.response) {
            yield put(showUserMessage(errorHandle(fetchedUser.response)));
          } else {
            yield put(showUserMessage(fetchedUser.message));
          }
        } else {
          yield put(fetchUserSuccess(fetchedUser));
        }
      } catch (error) {
        yield put(showUserMessage(error));
      }
    }
  } catch (error) {
    yield put(showDeleteUserMessage(error));
  }
}

function* deleteUserRequestFromViewPage(obj) {
  try {
    const deleteUser = yield call(deleteUsersFromViewPage, obj.payload);
    if (deleteUser.message) {
      if (deleteUser.response) {
        yield put(showDeleteUserMessage(errorHandle(deleteUser.response)));
      } else {
        yield put(showDeleteUserMessage(deleteUser.message));
      }
    } else {
      yield put(deleteUserSuccess(deleteUser));
    }
  } catch (error) {
    yield put(showDeleteUserMessage(error));
  }
}

function* editUserRequest(obj) {
  try {
    const editUser = yield call(editUsers, obj.payload);
    if (editUser.message) {
      if (editUser.response) {
        yield put(showUserMessage(errorHandle(editUser.response)));
      } else {
        yield put(showUserMessage(editUser.message));
      }
    } else {
      yield put(editUserSuccess(editUser));
    }
  } catch (error) {
    yield put(showUserMessage(error));
  }
}

function* editDraftUserRequest(obj) {
  try {
    const editDraftUser = yield call(editDraftUserHandler, obj.payload);
    if (editDraftUser.message) {
      if (editDraftUser.response) {
        yield put(showUserMessage(errorHandle(editDraftUser.response)));
      } else {
        yield put(showUserMessage(editDraftUser.message));
      }
    } else {
      yield put(editDraftUserSuccess(editDraftUser));
    }
  } catch (error) {
    yield put(showUserMessage(error));
  }
}

function* changePasswordRequest(obj) {
  try {
    const changePasswordRes = yield call(changePassword, obj.payload);
    if (changePasswordRes.message) {
      if (changePasswordRes.response) {
        yield put(showUserMessage(errorHandle(changePasswordRes.response)));
      } else {
        yield put(showUserMessage(changePasswordRes.message));
      }
    } else {
      yield put(changePasswordSuccess(changePasswordRes));
    }
  } catch (error) {
    yield put(showUserMessage(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(ADD_USER, addUserRequest),
    takeEvery(EDIT_USER, editUserRequest),
    takeEvery(EDIT_DRAFT_USER, editDraftUserRequest),
    takeEvery(FETCH_INDIVIDUAL_USER, fetchIndividualUserRequest),
    takeEvery(FETCH_ALL_USER, fetchUserRequest),
    takeEvery(DELETE_USER, deleteUserRequest),
    takeEvery(DELETE_USER_From_ViewPage, deleteUserRequestFromViewPage),
    takeEvery(SEARCH_USERS, searchUserRequest),
    takeEvery(CHANGE_PASSWORD, changePasswordRequest)
  ]);
}
