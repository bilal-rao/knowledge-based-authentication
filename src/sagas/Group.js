import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import endPointHandler from "./../config/index";
import {
  fetchGroupSuccess,
  searchGroupSuccess,
  fetchAllGroupsSuccess,
  showGroupMessage,
  showGroupsParentPageMessage,
  fetchIndividualGroupSuccess,
  addGroupSuccess,
  deleteGroupSuccess,
  showDeleteGroupMessage,
  editGroupSuccess,
  editDraftGroupSuccess
} from "../actions/Group";
import {
  FETCH_INDIVIDUAL_GROUP,
  FETCH_ALL_GROUPS,
  FETCH_GROUPS_WITH_PAGINATION,
  ADD_GROUP,
  DELETE_GROUP,
  DELETE_GROUP_From_ViewPage,
  EDIT_GROUP,
  EDIT_DRAFT_GROUP,
  SEARCH_GROUPS
} from "../constants/ActionTypes";
import errorHandle from "../functions/errorHandle";

let identity = new endPointHandler("IDENTITY");

const getGroups = async params => {
  return await identity.getHandler("Groups", {
    pageNumber: params.pageNumber,
    pageSize: params.pageSize
  });
};

const searchGroups = async params => {
  return await identity.getHandler("Groups", {
    name: params.name,
    code: params.code
  });
};

const getAllGroups = async () => {
  return await identity.getHandler("Groups");
};

const addGroups = async params => {
  return await identity.postHandler("Groups", {
    description: params.description,
    name: params.name,
    code: params.code,
    roleIds: params.roles
  });
};

const editGroups = async params => {
  return await identity.putHandler(`Groups/${params.gId}`, {
    name: params.name,
    description: params.description,
    roleIds: params.roles,
    code: params.code,
    status: params.status
  });
};

const editDraftGroupHandler = async params => {
  return await identity.putHandler(`Groups/Drafts/${params.sId}`, {
    groupId: params.gId,
    name: params.name,
    description: params.description,
    roleIds: params.roles,
    code: params.code,
    status: params.status
  });
};

const getIndividualGroups = async params => {
  return await identity.getHandler(`Groups/${params.payload.groupId}`);
};

const deleteGroups = async params => {
  return await identity.deleteHandler(`Groups/${params.id}`);
};

const deleteGroupsFromViewPage = async params => {
  return await identity.deleteHandler(`Groups/${params}`);
};

function* fetchGroupRequest(obj) {
  try {
    const fetchedGroup = yield call(getGroups, obj.payload);
    if (fetchedGroup.message) {
      if (fetchedGroup.response) {
        yield put(
          showGroupsParentPageMessage(errorHandle(fetchedGroup.response))
        );
      } else {
        yield put(showGroupsParentPageMessage(fetchedGroup.message));
      }
    } else {
      yield put(fetchGroupSuccess(fetchedGroup));
    }
  } catch (error) {
    yield put(showGroupsParentPageMessage(error));
  }
}

function* searchGroupRequest(obj) {
  try {
    const searchedGroup = yield call(searchGroups, obj.payload);
    if (searchedGroup.message) {
      if (searchedGroup.response) {
        yield put(showGroupMessage(errorHandle(searchedGroup.response)));
      } else {
        yield put(showGroupMessage(searchedGroup.message));
      }
    } else {
      yield put(searchGroupSuccess(searchedGroup));
    }
  } catch (error) {
    yield put(showGroupMessage(error));
  }
}

function* fetchAllGroupsRequest() {
  try {
    const fetchedGroup = yield call(getAllGroups);
    if (fetchedGroup.message) {
      if (fetchedGroup.response) {
        yield put(showGroupMessage(errorHandle(fetchedGroup.response)));
      } else {
        yield put(showGroupMessage(fetchedGroup.message));
      }
    } else {
      yield put(fetchAllGroupsSuccess(fetchedGroup));
    }
  } catch (error) {
    yield put(showGroupMessage(error));
  }
}

function* fetchIndividualGroupRequest(data) {
  try {
    const fetchedGroup = yield call(getIndividualGroups, data);
    if (fetchedGroup.message) {
      if (fetchedGroup.response) {
        yield put(showGroupMessage(errorHandle(fetchedGroup.response)));
      } else {
        yield put(showGroupMessage(fetchedGroup.message));
      }
    } else {
      fetchedGroup.data.page = data.payload.page;
      yield put(fetchIndividualGroupSuccess(fetchedGroup));
    }
  } catch (error) {
    yield put(showGroupMessage(error));
  }
}

function* addGroupRequest(obj) {
  try {
    const addGroup = yield call(addGroups, obj.payload);
    if (addGroup.message) {
      if (addGroup.response) {
        yield put(showGroupMessage(errorHandle(addGroup.response)));
      } else {
        yield put(showGroupMessage(addGroup.message));
      }
    } else {
      yield put(addGroupSuccess(addGroup));
    }
  } catch (error) {
    yield put(showGroupMessage(error));
  }
}

function* deleteGroupRequest(obj) {
  try {
    const deleteGroup = yield call(deleteGroups, obj.payload);
    if (deleteGroup.message) {
      if (deleteGroup.response) {
        yield put(showDeleteGroupMessage(errorHandle(deleteGroup.response)));
      } else {
        yield put(showDeleteGroupMessage(deleteGroup.message));
      }
    } else {
      yield put(deleteGroupSuccess(deleteGroup));
      try {
        const fetchedGroup = yield call(getGroups, obj.payload);
        if (fetchedGroup.message) {
          if (fetchedGroup.response) {
            yield put(showGroupMessage(errorHandle(fetchedGroup.response)));
          } else {
            yield put(showGroupMessage(fetchedGroup.message));
          }
        } else {
          yield put(fetchGroupSuccess(fetchedGroup));
        }
      } catch (error) {
        yield put(showGroupMessage(error));
      }
    }
  } catch (error) {
    yield put(showDeleteGroupMessage(error));
  }
}

function* deleteGroupRequestFromViewPage(obj) {
  try {
    const deleteGroup = yield call(deleteGroupsFromViewPage, obj.payload);
    if (deleteGroup.message) {
      if (deleteGroup.response) {
        yield put(showDeleteGroupMessage(errorHandle(deleteGroup.response)));
      } else {
        yield put(showDeleteGroupMessage(deleteGroup.message));
      }
    } else {
      yield put(deleteGroupSuccess(deleteGroup));
    }
  } catch (error) {
    yield put(showDeleteGroupMessage(error));
  }
}

function* editGroupRequest(obj) {
  try {
    const editGroup = yield call(editGroups, obj.payload);
    if (editGroup.message) {
      if (editGroup.response) {
        yield put(showGroupMessage(errorHandle(editGroup.response)));
      } else {
        yield put(showGroupMessage(editGroup.message));
      }
    } else {
      yield put(editGroupSuccess(editGroup));
    }
  } catch (error) {
    yield put(showGroupMessage(error));
  }
}

function* editDraftGroupRequest(obj) {
  try {
    const editDraftGroup = yield call(editDraftGroupHandler, obj.payload);
    if (editDraftGroup.message) {
      if (editDraftGroup.response) {
        yield put(showGroupMessage(errorHandle(editDraftGroup.response)));
      } else {
        yield put(showGroupMessage(editDraftGroup.message));
      }
    } else {
      yield put(editDraftGroupSuccess(editDraftGroup));
    }
  } catch (error) {
    yield put(showGroupMessage(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_GROUPS_WITH_PAGINATION, fetchGroupRequest),
    takeEvery(FETCH_INDIVIDUAL_GROUP, fetchIndividualGroupRequest),
    takeEvery(ADD_GROUP, addGroupRequest),
    takeEvery(DELETE_GROUP, deleteGroupRequest),
    takeEvery(DELETE_GROUP_From_ViewPage, deleteGroupRequestFromViewPage),
    takeEvery(EDIT_GROUP, editGroupRequest),
    takeEvery(EDIT_DRAFT_GROUP, editDraftGroupRequest),
    takeEvery(SEARCH_GROUPS, searchGroupRequest),
    takeEvery(FETCH_ALL_GROUPS, fetchAllGroupsRequest)
  ]);
}
