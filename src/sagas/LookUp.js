import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import endPointHandler from "./../config/index";
import {
  fetchLookUpSuccess,
  searchLookUpSuccess,
  fetchAllLookUpsSuccess,
  showLookUpMessage,
  showLookUpsParentPageMessage,
  fetchIndividualLookUpSuccess,
  addLookUpSuccess,
  deleteLookUpSuccess,
  showDeleteLookUpMessage,
  editLookUpSuccess,
  editDraftLookUpSuccess
} from "../actions/LookUp";
import {
  FETCH_INDIVIDUAL_LOOKUP,
  FETCH_ALL_LOOKUPS,
  FETCH_LOOKUPS_WITH_PAGINATION,
  ADD_LOOKUP,
  DELETE_LOOKUP,
  DELETE_LOOKUP_From_ViewPage,
  EDIT_LOOKUP,
  EDIT_DRAFT_LOOKUP,
  SEARCH_LOOKUPS
} from "../constants/ActionTypes";
import errorHandle from "../functions/errorHandle";

let masterdata = new endPointHandler("MASTERDATA");

const getLookUps = async params => {
  return await masterdata.getHandler(localStorage.getItem("lookUpPath"), {
    pageNumber: params.pageNumber,
    pageSize: params.pageSize
  });
};

const searchLookUps = async params => {
  return await masterdata.getHandler(localStorage.getItem("lookUpPath"), {
    name: params.name,
    code: params.code
  });
};

const getAllLookUps = async () => {
  return await masterdata.getHandler(localStorage.getItem("lookUpPath"));
};

const addLookUps = async params => {
  return await masterdata.postHandler(localStorage.getItem("lookUpPath"), {
    name: params.name,
    code: params.code,
    status: params.status,
    description: params.description
  });
};

const editLookUps = async params => {
  return await masterdata.putHandler(
    `${localStorage.getItem("lookUpPath")}/${params.id}`,
    {
      name: params.name,
      code: params.code,
      status: params.status,
      description: params.description
    }
  );
};

const editDraftLookUpHandler = async params => {
  return await masterdata.putHandler(
    `${localStorage.getItem("lookUpPath")}/Drafts/${params.sId}`,
    {
      name: params.name,
      code: params.code,
      status: params.status,
      description: params.description
    }
  );
};

const getIndividualLookUps = async params => {
  return await masterdata.getHandler(
    `${localStorage.getItem("lookUpPath")}/${params.payload.id}`
  );
};

const deleteLookUps = async params => {
  return await masterdata.deleteHandler(
    `${localStorage.getItem("lookUpPath")}/${params.id}`
  );
};

const deleteLookUpsFromViewPage = async params => {
  return await masterdata.deleteHandler(
    `${localStorage.getItem("lookUpPath")}/${params}`
  );
};

function* fetchLookUpRequest(obj) {
  try {
    const fetchedLookUp = yield call(getLookUps, obj.payload);
    if (fetchedLookUp.message) {
      if (fetchedLookUp.response) {
        yield put(
          showLookUpsParentPageMessage(errorHandle(fetchedLookUp.response))
        );
      } else {
        yield put(showLookUpsParentPageMessage(fetchedLookUp.message));
      }
    } else {
      yield put(fetchLookUpSuccess(fetchedLookUp));
    }
  } catch (error) {
    yield put(showLookUpsParentPageMessage(error));
  }
}

function* searchLookUpRequest(obj) {
  try {
    const searchedLookUp = yield call(searchLookUps, obj.payload);
    if (searchedLookUp.message) {
      if (searchedLookUp.response) {
        yield put(showLookUpMessage(errorHandle(searchedLookUp.response)));
      } else {
        yield put(showLookUpMessage(searchedLookUp.message));
      }
    } else {
      yield put(searchLookUpSuccess(searchedLookUp));
    }
  } catch (error) {
    yield put(showLookUpMessage(error));
  }
}

function* fetchAllLookUpsRequest() {
  try {
    const fetchedLookUp = yield call(getAllLookUps);
    if (fetchedLookUp.message) {
      if (fetchedLookUp.response) {
        yield put(showLookUpMessage(errorHandle(fetchedLookUp.response)));
      } else {
        yield put(showLookUpMessage(fetchedLookUp.message));
      }
    } else {
      yield put(fetchAllLookUpsSuccess(fetchedLookUp));
    }
  } catch (error) {
    yield put(showLookUpMessage(error));
  }
}

function* fetchIndividualLookUpRequest(data) {
  try {
    const fetchedLookUp = yield call(getIndividualLookUps, data);
    if (fetchedLookUp.message) {
      if (fetchedLookUp.response) {
        yield put(showLookUpMessage(errorHandle(fetchedLookUp.response)));
      } else {
        yield put(showLookUpMessage(fetchedLookUp.message));
      }
    } else {
      fetchedLookUp.data.page = data.payload.page;
      yield put(fetchIndividualLookUpSuccess(fetchedLookUp));
    }
  } catch (error) {
    yield put(showLookUpMessage(error));
  }
}

function* addLookUpRequest(obj) {
  try {
    const addLookUp = yield call(addLookUps, obj.payload);
    if (addLookUp.message) {
      if (addLookUp.response) {
        yield put(showLookUpMessage(errorHandle(addLookUp.response)));
      } else {
        yield put(showLookUpMessage(addLookUp.message));
      }
    } else {
      yield put(addLookUpSuccess(addLookUp));
    }
  } catch (error) {
    yield put(showLookUpMessage(error));
  }
}

function* deleteLookUpRequest(obj) {
  try {
    const deleteLookUp = yield call(deleteLookUps, obj.payload);
    if (deleteLookUp.message) {
      if (deleteLookUp.response) {
        yield put(showDeleteLookUpMessage(errorHandle(deleteLookUp.response)));
      } else {
        yield put(showDeleteLookUpMessage(deleteLookUp.message));
      }
    } else {
      yield put(deleteLookUpSuccess(deleteLookUp));
      try {
        const fetchedLookUp = yield call(getLookUps, obj.payload);
        if (fetchedLookUp.message) {
          if (fetchedLookUp.response) {
            yield put(showLookUpMessage(errorHandle(fetchedLookUp.response)));
          } else {
            yield put(showLookUpMessage(fetchedLookUp.message));
          }
        } else {
          yield put(fetchLookUpSuccess(fetchedLookUp));
        }
      } catch (error) {
        yield put(showLookUpMessage(error));
      }
    }
  } catch (error) {
    yield put(showDeleteLookUpMessage(error));
  }
}

function* deleteLookUpRequestFromViewPage(obj) {
  try {
    const deleteLookUp = yield call(deleteLookUpsFromViewPage, obj.payload);
    if (deleteLookUp.message) {
      if (deleteLookUp.response) {
        yield put(showDeleteLookUpMessage(errorHandle(deleteLookUp.response)));
      } else {
        yield put(showDeleteLookUpMessage(deleteLookUp.message));
      }
    } else {
      yield put(deleteLookUpSuccess(deleteLookUp));
    }
  } catch (error) {
    yield put(showDeleteLookUpMessage(error));
  }
}

function* editLookUpRequest(obj) {
  try {
    const editLookUp = yield call(editLookUps, obj.payload);
    if (editLookUp.message) {
      if (editLookUp.response) {
        yield put(showLookUpMessage(errorHandle(editLookUp.response)));
      } else {
        yield put(showLookUpMessage(editLookUp.message));
      }
    } else {
      yield put(editLookUpSuccess(editLookUp));
    }
  } catch (error) {
    yield put(showLookUpMessage(error));
  }
}

function* editDraftLookUpRequest(obj) {
  try {
    const editDraftLookUp = yield call(editDraftLookUpHandler, obj.payload);
    if (editDraftLookUp.message) {
      if (editDraftLookUp.response) {
        yield put(showLookUpMessage(errorHandle(editDraftLookUp.response)));
      } else {
        yield put(showLookUpMessage(editDraftLookUp.message));
      }
    } else {
      yield put(editDraftLookUpSuccess(editDraftLookUp));
    }
  } catch (error) {
    yield put(showLookUpMessage(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_LOOKUPS_WITH_PAGINATION, fetchLookUpRequest),
    takeEvery(FETCH_INDIVIDUAL_LOOKUP, fetchIndividualLookUpRequest),
    takeEvery(ADD_LOOKUP, addLookUpRequest),
    takeEvery(DELETE_LOOKUP, deleteLookUpRequest),
    takeEvery(DELETE_LOOKUP_From_ViewPage, deleteLookUpRequestFromViewPage),
    takeEvery(EDIT_LOOKUP, editLookUpRequest),
    takeEvery(EDIT_DRAFT_LOOKUP, editDraftLookUpRequest),
    takeEvery(SEARCH_LOOKUPS, searchLookUpRequest),
    takeEvery(FETCH_ALL_LOOKUPS, fetchAllLookUpsRequest)
  ]);
}
