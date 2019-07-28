import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import endPointHandler from './../config/index';
import {
  fetchDiscrepancySuccess,
  searchDiscrepancySuccess,
  fetchAllDiscrepancySuccess,
  showDiscrepancyMessage,
  showDiscrepanciesParentPageMessage,
  fetchIndividualDiscrepancySuccess,
  addDiscrepancySuccess,
  deleteDiscrepancySuccess,
  showDeleteDiscrepancyMessage,
  editDiscrepancySuccess,
  editDraftDiscrepancySuccess,
} from "../actions/Discrepancies";
import {
  FETCH_INDIVIDUAL_DISCREPANCY,
  FETCH_ALL_DISCREPANCY,
  FETCH_DISCREPANCY_WITH_PAGINATION,
  ADD_DISCREPANCY,
  DELETE_DISCREPANCY,
  DELETE_DISCREPANCY_From_ViewPage,
  EDIT_DISCREPANCY,
  EDIT_DRAFT_DISCREPANCY,
  SEARCH_DISCREPANCIES
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';

let masterData = new endPointHandler('MASTERDATA');

const getDiscrepancies = async params => {
  return await masterData.getHandler('Discrepancies', { pageNumber: params.pageNumber, pageSize: params.pageSize });
}

const searchDiscrepancies = async params => {
  return await masterData.getHandler('Discrepancies?Name=' + params.byName + '&&Type=' + params.byType);
}

const getAllDiscrepancies = async () => {
  return await masterData.getHandler('Discrepancies');
}

const getIndividualDiscrepancies = async params => {
  return await masterData.getHandler(`Discrepancies/${params.payload.Id}`);
}

const addDiscrepancies = async params => {
  return await masterData.postHandler('Discrepancies', params);
}

const editDiscrepancies = async params => {
  return await masterData.putHandler(`Discrepancies/${params.Id}`, params);
}

const editDraftDiscrepancyHandler = async params => {
  return await masterData.putHandler(`Discrepancies/Drafts/${params.sId}`, params);
}

const deleteDiscrepancies = async params => {
  return await masterData.deleteHandler(`Discrepancies/${params.id}`);
}

const deleteDiscrepanciesFromViewPage = async params => {
  return await masterData.deleteHandler(`Discrepancies/${params}`);
}

function* fetchDiscrepancyRequest(obj) {
  try {
    const fetchedDiscrepancy = yield call(getDiscrepancies, obj.payload);
    if (fetchedDiscrepancy.message) {
      if (fetchedDiscrepancy.response) {
        yield put(showDiscrepanciesParentPageMessage(errorHandle(fetchedDiscrepancy.response)));
      }
      else {
        yield put(showDiscrepanciesParentPageMessage(fetchedDiscrepancy.message));
      }
    } else {
      yield put(fetchDiscrepancySuccess(fetchedDiscrepancy));
    }
  } catch (error) {
    yield put(showDiscrepanciesParentPageMessage(error));
  }
}

function* searchDiscrepancyRequest(obj) {
  try {
    const searchedDiscrepancy = yield call(searchDiscrepancies, obj.payload);
    if (searchedDiscrepancy.message) {
      if (searchedDiscrepancy.response) {
        yield put(showDiscrepancyMessage(errorHandle(searchedDiscrepancy.response)));
      }
      else {
        yield put(showDiscrepancyMessage(searchedDiscrepancy.message));
      }
    } else {
      yield put(searchDiscrepancySuccess(searchedDiscrepancy));
    }
  } catch (error) {
    yield put(showDiscrepancyMessage(error));
  }
}

function* fetchAllDiscrepanciesRequest() {
  try {
    const fetchedDiscrepancy = yield call(getAllDiscrepancies);
    if (fetchedDiscrepancy.message) {
      if (fetchedDiscrepancy.response) {
        yield put(showDiscrepancyMessage(errorHandle(fetchedDiscrepancy.response)));
      }
      else {
        yield put(showDiscrepancyMessage(fetchedDiscrepancy.message));
      }
    }
    else {
      yield put(fetchAllDiscrepancySuccess(fetchedDiscrepancy));
    }
  } catch (error) {
    yield put(showDiscrepancyMessage(error));
  }
}

function* fetchIndividualDiscrepancyRequest(data) {
  try {
    const fetchedDiscrepancy = yield call(getIndividualDiscrepancies, data);
    if (fetchedDiscrepancy.message) {
      if (fetchedDiscrepancy.response) {
        yield put(showDiscrepancyMessage(errorHandle(fetchedDiscrepancy.response)));
      }
      else {
        yield put(showDiscrepancyMessage(fetchedDiscrepancy.message));
      }
    } else {
      fetchedDiscrepancy.data.page = data.payload.page;
      yield put(fetchIndividualDiscrepancySuccess(fetchedDiscrepancy));
    }
  } catch (error) {
    yield put(showDiscrepancyMessage(error));
  }
}

function* addDiscrepancyRequest(obj) {
  try {
    const addDiscrepancy = yield call(addDiscrepancies, obj.payload);
    if (addDiscrepancy.message) {
      if (addDiscrepancy.response) {
        yield put(showDiscrepancyMessage(errorHandle(addDiscrepancy.response)));
      }
      else {
        yield put(showDiscrepancyMessage(addDiscrepancy.message));
      }
    } else {
      yield put(addDiscrepancySuccess(addDiscrepancy));
    }
  } catch (error) {
    yield put(showDiscrepancyMessage(error));
  }
}

function* deleteDiscrepancyRequest(obj) {
  try {
    const deleteDiscrepancy = yield call(deleteDiscrepancies, obj.payload);
    if (deleteDiscrepancy.message) {
      if (deleteDiscrepancy.response) {
        yield put(showDeleteDiscrepancyMessage(errorHandle(deleteDiscrepancy.response)));
      }
      else {
        yield put(showDeleteDiscrepancyMessage(deleteDiscrepancy.message));
      }
    }
    else {
      yield put(deleteDiscrepancySuccess(deleteDiscrepancy));
      try {
        const fetchedDiscrepancy = yield call(getDiscrepancies, obj.payload);
        if (fetchedDiscrepancy.message) {
          if (fetchedDiscrepancy.response) {
            yield put(showDiscrepancyMessage(errorHandle(fetchedDiscrepancy.response)));
          }
          else {
            yield put(showDiscrepancyMessage(fetchedDiscrepancy.message));
          }
        } else {
          yield put(fetchDiscrepancySuccess(fetchedDiscrepancy));
        }
      } catch (error) {
        yield put(showDiscrepancyMessage(error));
      }
    }
  } catch (error) {
    yield put(showDeleteDiscrepancyMessage(error));
  }
}

function* deleteDiscrepancyRequestFromViewPage(obj) {
  try {
    const deleteDiscrepancy = yield call(deleteDiscrepanciesFromViewPage, obj.payload);
    if (deleteDiscrepancy.message) {
      if (deleteDiscrepancy.response) {
        yield put(showDeleteDiscrepancyMessage(errorHandle(deleteDiscrepancy.response)));
      }
      else {
        yield put(showDeleteDiscrepancyMessage(deleteDiscrepancy.message));
      }
    } else {
      yield put(deleteDiscrepancySuccess(deleteDiscrepancy));
    }
  } catch (error) {
    yield put(showDeleteDiscrepancyMessage(error));
  }
}

function* editDiscrepancyRequest(obj) {
  try {
    const editDiscrepancy = yield call(editDiscrepancies, obj.payload);
    if (editDiscrepancy.message) {
      if (editDiscrepancy.response) {
        yield put(showDiscrepancyMessage(errorHandle(editDiscrepancy.response)));
      }
      else {
        yield put(showDiscrepancyMessage(editDiscrepancy.message));
      }
    } else {
      yield put(editDiscrepancySuccess(editDiscrepancy));
    }
  } catch (error) {
    yield put(showDiscrepancyMessage(error));
  }
}

function* editDraftDiscrepancyRequest(obj) {
  try {
    const editDraftDiscrepancy = yield call(editDraftDiscrepancyHandler, obj.payload);
    if (editDraftDiscrepancy.message) {
      if (editDraftDiscrepancy.response) {
        yield put(showDiscrepancyMessage(errorHandle(editDraftDiscrepancy.response)));
      }
      else {
        yield put(showDiscrepancyMessage(editDraftDiscrepancy.message));
      }
    } else {
      yield put(editDraftDiscrepancySuccess(editDraftDiscrepancy));
    }
  } catch (error) {
    yield put(showDiscrepancyMessage(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_DISCREPANCY_WITH_PAGINATION, fetchDiscrepancyRequest),
    takeEvery(FETCH_INDIVIDUAL_DISCREPANCY, fetchIndividualDiscrepancyRequest),
    takeEvery(ADD_DISCREPANCY, addDiscrepancyRequest),
    takeEvery(DELETE_DISCREPANCY, deleteDiscrepancyRequest),
    takeEvery(DELETE_DISCREPANCY_From_ViewPage, deleteDiscrepancyRequestFromViewPage),
    takeEvery(EDIT_DISCREPANCY, editDiscrepancyRequest),
    takeEvery(EDIT_DRAFT_DISCREPANCY, editDraftDiscrepancyRequest),
    takeEvery(SEARCH_DISCREPANCIES, searchDiscrepancyRequest),
    takeEvery(FETCH_ALL_DISCREPANCY, fetchAllDiscrepanciesRequest)
  ]);
}