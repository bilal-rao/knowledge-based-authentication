import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import endPointHandler from './../config/index';
import {
  fetchDeviationSuccess,
  searchDeviationSuccess,
  fetchAllDeviationSuccess,
  showDeviationMessage,
  showDeviationsParentPageMessage,
  fetchIndividualDeviationSuccess,
  addDeviationSuccess,
  deleteDeviationSuccess,
  showDeleteDeviationMessage,
  editDeviationSuccess,
  editDraftDeviationSuccess,
} from "actions/Deviation";
import {
  FETCH_INDIVIDUAL_DEVIATION,
  FETCH_ALL_DEVIATION,
  FETCH_DEVIATION_WITH_PAGINATION,
  ADD_DEVIATION,
  DELETE_DEVIATION,
  DELETE_DEVIATION_From_ViewPage,
  EDIT_DEVIATION,
  EDIT_DRAFT_DEVIATION,
  SEARCH_DEVIATIONS
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';

let masterData = new endPointHandler('MASTERDATA');

const getDeviations = async params => {
  return await masterData.getHandler('Deviations', { pageNumber: params.pageNumber, pageSize: params.pageSize });
}

const searchDeviations = async params => {
  return await masterData.getHandler('Deviations?Name=' + params.byName + '&&Code=' + params.byCode);
}

const getAllDeviations = async () => {
  return await masterData.getHandler('Deviations');
}

const getIndividualDeviations = async params => {
  return await masterData.getHandler(`Deviations/${params.payload.Id}`);
}

const addDeviations = async params => {
  return await masterData.postHandler('Deviations', params);
}

const editDeviations = async params => {
  return await masterData.putHandler(`Deviations/${params.Id}`, params);
}

const editDraftDeviationHandler = async params => {
  return await masterData.putHandler(`Deviations/Drafts/${params.sId}`, params);
}

const deleteDeviations = async params => {
  return await masterData.deleteHandler(`Deviations/${params.id}`);
}

const deleteDeviationsFromViewPage = async params => {
  return await masterData.deleteHandler(`Deviations/${params}`);
}

function* fetchDeviationRequest(obj) {
  try {
    const fetchedDeviation = yield call(getDeviations, obj.payload);
    if (fetchedDeviation.message) {
      if (fetchedDeviation.response) {
        yield put(showDeviationsParentPageMessage(errorHandle(fetchedDeviation.response)));
      }
      else {
        yield put(showDeviationsParentPageMessage(fetchedDeviation.message));
      }
    } else {
      yield put(fetchDeviationSuccess(fetchedDeviation));
    }
  } catch (error) {
    yield put(showDeviationsParentPageMessage(error));
  }
}

function* searchDeviationRequest(obj) {
  try {
    const searchedDeviation = yield call(searchDeviations, obj.payload);
    if (searchedDeviation.message) {
      if (searchedDeviation.response) {
        yield put(showDeviationMessage(errorHandle(searchedDeviation.response)));
      }
      else {
        yield put(showDeviationMessage(searchedDeviation.message));
      }
    } else {
      yield put(searchDeviationSuccess(searchedDeviation));
    }
  } catch (error) {
    yield put(showDeviationMessage(error));
  }
}

function* fetchAllDeviationRequest() {
  try {
    const fetchedDeviation = yield call(getAllDeviations);
    if (fetchedDeviation.message) {
      if (fetchedDeviation.response) {
        yield put(showDeviationMessage(errorHandle(fetchedDeviation.response)));
      }
      else {
        yield put(showDeviationMessage(fetchedDeviation.message));
      }
    }
    else {
      yield put(fetchAllDeviationSuccess(fetchedDeviation));
    }
  } catch (error) {
    yield put(showDeviationMessage(error));
  }
}

function* fetchIndividualDeviationRequest(data) {
  try {
    const fetchedDeviation = yield call(getIndividualDeviations, data);
    if (fetchedDeviation.message) {
      if (fetchedDeviation.response) {
        yield put(showDeviationMessage(errorHandle(fetchedDeviation.response)));
      }
      else {
        yield put(showDeviationMessage(fetchedDeviation.message));
      }
    } else {
      fetchedDeviation.data.page = data.payload.page;
      yield put(fetchIndividualDeviationSuccess(fetchedDeviation));
    }
  } catch (error) {
    yield put(showDeviationMessage(error));
  }
}

function* addDeviationRequest(obj) {
  try {
    const addDeviation = yield call(addDeviations, obj.payload);
    if (addDeviation.message) {
      if (addDeviation.response) {
        yield put(showDeviationMessage(errorHandle(addDeviation.response)));
      }
      else {
        yield put(showDeviationMessage(addDeviation.message));
      }
    } else {
      yield put(addDeviationSuccess(addDeviation));
    }
  } catch (error) {
    yield put(showDeviationMessage(error));
  }
}

function* deleteDeviationRequest(obj) {
  try {
    const deleteDeviation = yield call(deleteDeviations, obj.payload);
    if (deleteDeviation.message) {
      if (deleteDeviation.response) {
        yield put(showDeleteDeviationMessage(errorHandle(deleteDeviation.response)));
      }
      else {
        yield put(showDeleteDeviationMessage(deleteDeviation.message));
      }
    }
    else {
      yield put(deleteDeviationSuccess(deleteDeviation));
      try {
        const fetchedDeviation = yield call(getDeviations, obj.payload);
        if (fetchedDeviation.message) {
          if (fetchedDeviation.response) {
            yield put(showDeviationMessage(errorHandle(fetchedDeviation.response)));
          }
          else {
            yield put(showDeviationMessage(fetchedDeviation.message));
          }
        } else {
          yield put(fetchDeviationSuccess(fetchedDeviation));
        }
      } catch (error) {
        yield put(showDeviationMessage(error));
      }
    }
  } catch (error) {
    yield put(showDeleteDeviationMessage(error));
  }
}

function* deleteDeviationRequestFromViewPage(obj) {
  try {
    const deleteDeviation = yield call(deleteDeviationsFromViewPage, obj.payload);
    if (deleteDeviation.message) {
      if (deleteDeviation.response) {
        yield put(showDeleteDeviationMessage(errorHandle(deleteDeviation.response)));
      }
      else {
        yield put(showDeleteDeviationMessage(deleteDeviation.message));
      }
    } else {
      yield put(deleteDeviationSuccess(deleteDeviation));
    }
  } catch (error) {
    yield put(showDeleteDeviationMessage(error));
  }
}

function* editDeviationRequest(obj) {
  try {
    const editDeviation = yield call(editDeviations, obj.payload);
    if (editDeviation.message) {
      if (editDeviation.response) {
        yield put(showDeviationMessage(errorHandle(editDeviation.response)));
      }
      else {
        yield put(showDeviationMessage(editDeviation.message));
      }
    } else {
      yield put(editDeviationSuccess(editDeviation));
    }
  } catch (error) {
    yield put(showDeviationMessage(error));
  }
}

function* editDraftDeviationRequest(obj) {
  try {
    const editDraftDeviation = yield call(editDraftDeviationHandler, obj.payload);
    if (editDraftDeviation.message) {
      if (editDraftDeviation.response) {
        yield put(showDeviationMessage(errorHandle(editDraftDeviation.response)));
      }
      else {
        yield put(showDeviationMessage(editDraftDeviation.message));
      }
    } else {
      yield put(editDraftDeviationSuccess(editDraftDeviation));
    }
  } catch (error) {
    yield put(showDeviationMessage(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_DEVIATION_WITH_PAGINATION, fetchDeviationRequest),
    takeEvery(FETCH_INDIVIDUAL_DEVIATION, fetchIndividualDeviationRequest),
    takeEvery(ADD_DEVIATION, addDeviationRequest),
    takeEvery(DELETE_DEVIATION, deleteDeviationRequest),
    takeEvery(DELETE_DEVIATION_From_ViewPage, deleteDeviationRequestFromViewPage),
    takeEvery(EDIT_DEVIATION, editDeviationRequest),
    takeEvery(EDIT_DRAFT_DEVIATION, editDraftDeviationRequest),
    takeEvery(SEARCH_DEVIATIONS, searchDeviationRequest),
    takeEvery(FETCH_ALL_DEVIATION, fetchAllDeviationRequest)
  ]);
}