import { all, call, fork, put, takeEvery, take } from "redux-saga/effects";
import endPointHandler from "./../config/index";
import {
  fetchScrutinizerSuccess,
  searchScrutinizerSuccess,
  showScrutinizerMessage,
  showProcessRequestMessage,
  showScrutinizersParentPageMessage,
  fetchIndividualScrutinizerSuccess,
  deleteScrutinizerSuccess,
  showDeleteScrutinizerMessage,
  editScrutinizerSuccess,
  scrutinizerProcessRequestSuccess
} from "../actions/Scrutinizer";
import {
  FETCH_ALL_SCRUTINIZER,
  FETCH_INDIVIDUAL_SCRUTINIZER,
  DELETE_SCRUTINIZER,
  DELETE_SCRUTINIZER_From_ViewPage,
  EDIT_SCRUTINIZER,
  SEARCH_SCRUTINIZERS,
  SCRUTINIZER_PROCESS_REQUEST
} from "../constants/ActionTypes";
import errorHandle from "../functions/errorHandle";

let scrutinizer = new endPointHandler("SCRUTINIZER");

const getScrutinizers = async params => {
  return await scrutinizer.getHandler("Entities", {
    pageNumber: params.pageNumber,
    pageSize: params.pageSize,
    ModuleCode: params.moduleCode
  });
};

const searchScrutinizers = async params => {
  return await scrutinizer.getHandler("Entities", {
    moduleCode: params.moduleCode,
    filter: params.filter
  });
};

const editScrutinizers = async params => {
  return await scrutinizer.putHandler(
    `Entities/${params.id}?ModuleCode=${params.moduleCode}`,
    {
      moduleCode: params.moduleCode,
      payload: params.payload
    }
  );
};

const scrutinizerProcessRequests = async params => {
  return await scrutinizer.postHandler(`Entities/${params.id}/Process`, {
    action: params.action,
    comments: params.comments
  });
};

const getIndividualScrutinizers = async params => {
  return await scrutinizer.getHandler(`Entities/${params.payload.id}`);
};

const deleteScrutinizers = async params => {
  return await scrutinizer.deleteHandler(
    `Entities/${params.id}?ModuleCode=${params.moduleCode}`
  );
};

const deleteScrutinizersFromViewPage = async params => {
  return await scrutinizer.deleteHandler(
    `Entities/${params.id}?ModuleCode=${params.moduleCode}`
  );
};

function* fetchScrutinizerRequest(obj) {
  try {
    const fetchedScrutinizer = yield call(getScrutinizers, obj.payload);
    if (fetchedScrutinizer.message) {
      if (fetchedScrutinizer.response) {
        yield put(
          showScrutinizersParentPageMessage(
            errorHandle(fetchedScrutinizer.response)
          )
        );
      } else {
        yield put(
          showScrutinizersParentPageMessage(fetchedScrutinizer.message)
        );
      }
    } else {
      yield put(fetchScrutinizerSuccess(fetchedScrutinizer));
    }
  } catch (error) {
    yield put(showScrutinizersParentPageMessage(error));
  }
}

function* searchScrutinizerRequest(obj) {
  try {
    const searchedScrutinizer = yield call(searchScrutinizers, obj.payload);
    if (searchedScrutinizer.message) {
      if (searchedScrutinizer.response) {
        yield put(
          showScrutinizerMessage(errorHandle(searchedScrutinizer.response))
        );
      } else {
        yield put(showScrutinizerMessage(searchedScrutinizer.message));
      }
    } else {
      yield put(searchScrutinizerSuccess(searchedScrutinizer));
    }
  } catch (error) {
    yield put(showScrutinizerMessage(error));
  }
}

function* fetchIndividualScrutinizerRequest(data) {
  try {
    const fetchedScrutinizer = yield call(getIndividualScrutinizers, data);
    if (fetchedScrutinizer.message) {
      if (fetchedScrutinizer.response) {
        yield put(
          showScrutinizerMessage(errorHandle(fetchedScrutinizer.response))
        );
      } else {
        yield put(showScrutinizerMessage(fetchedScrutinizer.message));
      }
    } else {
      fetchedScrutinizer.data.page = data.payload.page;
      yield put(fetchIndividualScrutinizerSuccess(fetchedScrutinizer));
    }
  } catch (error) {
    yield put(showScrutinizerMessage(error));
  }
}

function* deleteScrutinizerRequest(obj) {
  try {
    const deleteScrutinizer = yield call(deleteScrutinizers, obj.payload);
    if (deleteScrutinizer.message) {
      if (deleteScrutinizer.response) {
        yield put(
          showDeleteScrutinizerMessage(errorHandle(deleteScrutinizer.response))
        );
      } else {
        yield put(showDeleteScrutinizerMessage(deleteScrutinizer.message));
      }
    } else {
      yield put(deleteScrutinizerSuccess(deleteScrutinizer));
      try {
        const fetchedScrutinizer = yield call(getScrutinizers, obj.payload);
        if (fetchedScrutinizer.message) {
          if (fetchedScrutinizer.response) {
            yield put(
              showScrutinizerMessage(errorHandle(fetchedScrutinizer.response))
            );
          } else {
            yield put(showScrutinizerMessage(fetchedScrutinizer.message));
          }
        } else {
          yield put(fetchScrutinizerSuccess(fetchedScrutinizer));
        }
      } catch (error) {
        yield put(showScrutinizerMessage(error));
      }
    }
  } catch (error) {
    yield put(showDeleteScrutinizerMessage(error));
  }
}

function* deleteScrutinizerRequestFromViewPage(obj) {
  try {
    const deleteScrutinizer = yield call(
      deleteScrutinizersFromViewPage,
      obj.payload
    );
    if (deleteScrutinizer.message) {
      if (deleteScrutinizer.response) {
        yield put(
          showDeleteScrutinizerMessage(errorHandle(deleteScrutinizer.response))
        );
      } else {
        yield put(showDeleteScrutinizerMessage(deleteScrutinizer.message));
      }
    } else {
      yield put(deleteScrutinizerSuccess(deleteScrutinizer));
    }
  } catch (error) {
    yield put(showDeleteScrutinizerMessage(error));
  }
}

function* editScrutinizerRequest(obj) {
  try {
    const editScrutinizer = yield call(editScrutinizers, obj.payload);
    if (editScrutinizer.message) {
      if (editScrutinizer.response) {
        yield put(
          showScrutinizerMessage(errorHandle(editScrutinizer.response))
        );
      } else {
        yield put(showScrutinizerMessage(editScrutinizer.message));
      }
    } else {
      yield put(editScrutinizerSuccess(editScrutinizer));
    }
  } catch (error) {
    yield put(showScrutinizerMessage(error));
  }
}

function* scrutinizerProcessRequest(obj) {
  try {
    const scrutinizerProcessRequest = yield call(
      scrutinizerProcessRequests,
      obj.payload
    );
    if (scrutinizerProcessRequest.message) {
      if (scrutinizerProcessRequest.response) {
        yield put(
          showProcessRequestMessage(
            errorHandle(scrutinizerProcessRequest.response)
          )
        );
      } else {
        yield put(showProcessRequestMessage(scrutinizerProcessRequest.message));
      }
    } else {
      scrutinizerProcessRequest.data = obj.payload;
      yield put(scrutinizerProcessRequestSuccess(scrutinizerProcessRequest));
      try {
        const fetchedScrutinizer = yield call(getScrutinizers, obj.payload);
        if (fetchedScrutinizer.message) {
          if (fetchedScrutinizer.response) {
            yield put(
              showScrutinizerMessage(errorHandle(fetchedScrutinizer.response))
            );
          } else {
            yield put(showScrutinizerMessage(fetchedScrutinizer.message));
          }
        } else {
          yield put(fetchScrutinizerSuccess(fetchedScrutinizer));
        }
      } catch (error) {
        yield put(showScrutinizerMessage(error));
      }
    }
  } catch (error) {
    yield put(showProcessRequestMessage(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(EDIT_SCRUTINIZER, editScrutinizerRequest),
    takeEvery(FETCH_INDIVIDUAL_SCRUTINIZER, fetchIndividualScrutinizerRequest),
    takeEvery(FETCH_ALL_SCRUTINIZER, fetchScrutinizerRequest),
    takeEvery(DELETE_SCRUTINIZER, deleteScrutinizerRequest),
    takeEvery(
      DELETE_SCRUTINIZER_From_ViewPage,
      deleteScrutinizerRequestFromViewPage
    ),
    takeEvery(SEARCH_SCRUTINIZERS, searchScrutinizerRequest),
    takeEvery(SCRUTINIZER_PROCESS_REQUEST, scrutinizerProcessRequest)
  ]);
}
