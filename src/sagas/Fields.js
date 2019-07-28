import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import endPointHandler from './../config/index';
import {
  fetchFieldSuccess,
  searchFieldSuccess,
  fetchAllFieldSuccess,
  showFieldMessage,
  showFieldsParentPageMessage,
  fetchIndividualFieldSuccess,
  addFieldSuccess,
  deleteFieldSuccess,
  showDeleteFieldMessage,
  editFieldSuccess,
  editDraftFieldSuccess,
} from "../actions/Fields";
import {
  FETCH_INDIVIDUAL_FIELD,
  FETCH_ALL_FIELD,
  FETCH_FIELD_WITH_PAGINATION,
  ADD_FIELD,
  DELETE_FIELD,
  DELETE_FIELD_From_ViewPage,
  EDIT_FIELD,
  EDIT_DRAFT_FIELD,
  SEARCH_FIELDS
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';

let masterData = new endPointHandler('MASTERDATA');

const getFields = async params => {
  return await masterData.getHandler('Fields', { pageNumber: params.pageNumber, pageSize: params.pageSize });
}

const searchFields = async params => {
  return await masterData.getHandler('Fields?Name=' + params.byName + '&&Type=' + params.byType);
}

const getAllFields = async () => {
  return await masterData.getHandler('Fields');
}

const getIndividualFields = async params => {
  return await masterData.getHandler(`Fields/${params.payload.Id}`);
}

const addFields = async params => {
  return await masterData.postHandler('Fields', params);
}

const editFields = async params => {
  return await masterData.putHandler(`Fields/${params.Id}`, params);
}

const editDraftFieldHandler = async params => {
  return await masterData.putHandler(`Fields/Drafts/${params.sId}`, params);
}

const deleteFields = async params => {
  return await masterData.deleteHandler(`Fields/${params.id}`);
}

const deleteFieldsFromViewPage = async params => {
  return await masterData.deleteHandler(`Fields/${params}`);
}

function* fetchFieldRequest(obj) {
  try {
    const fetchedField = yield call(getFields, obj.payload);
    if (fetchedField.message) {
      if (fetchedField.response) {
        yield put(showFieldsParentPageMessage(errorHandle(fetchedField.response)));
      }
      else {
        yield put(showFieldsParentPageMessage(fetchedField.message));
      }
    } else {
      yield put(fetchFieldSuccess(fetchedField));
    }
  } catch (error) {
    yield put(showFieldsParentPageMessage(error));
  }
}

function* searchFieldRequest(obj) {
  try {
    const searchedField = yield call(searchFields, obj.payload);
    if (searchedField.message) {
      if (searchedField.response) {
        yield put(showFieldMessage(errorHandle(searchedField.response)));
      }
      else {
        yield put(showFieldMessage(searchedField.message));
      }
    } else {
      yield put(searchFieldSuccess(searchedField));
    }
  } catch (error) {
    yield put(showFieldMessage(error));
  }
}

function* fetchAllFieldsRequest() {
  try {
    const fetchedField = yield call(getAllFields);
    if (fetchedField.message) {
      if (fetchedField.response) {
        yield put(showFieldMessage(errorHandle(fetchedField.response)));
      }
      else {
        yield put(showFieldMessage(fetchedField.message));
      }
    }
    else {
      yield put(fetchAllFieldSuccess(fetchedField));
    }
  } catch (error) {
    yield put(showFieldMessage(error));
  }
}

function* fetchIndividualFieldRequest(data) {
  try {
    const fetchedField = yield call(getIndividualFields, data);
    if (fetchedField.message) {
      if (fetchedField.response) {
        yield put(showFieldMessage(errorHandle(fetchedField.response)));
      }
      else {
        yield put(showFieldMessage(fetchedField.message));
      }
    } else {
      fetchedField.data.page = data.payload.page;
      yield put(fetchIndividualFieldSuccess(fetchedField));
    }
  } catch (error) {
    yield put(showFieldMessage(error));
  }
}

function* addFieldRequest(obj) {
  try {
    const addField = yield call(addFields, obj.payload);
    if (addField.message) {
      if (addField.response) {
        yield put(showFieldMessage(errorHandle(addField.response)));
      }
      else {
        yield put(showFieldMessage(addField.message));
      }
    } else {
      yield put(addFieldSuccess(addField));
    }
  } catch (error) {
    yield put(showFieldMessage(error));
  }
}

function* deleteFieldRequest(obj) {
  try {
    const deleteField = yield call(deleteFields, obj.payload);
    if (deleteField.message) {
      if (deleteField.response) {
        yield put(showDeleteFieldMessage(errorHandle(deleteField.response)));
      }
      else {
        yield put(showDeleteFieldMessage(deleteField.message));
      }
    }
    else {
      yield put(deleteFieldSuccess(deleteField));
      try {
        const fetchedField = yield call(getFields, obj.payload);
        if (fetchedField.message) {
          if (fetchedField.response) {
            yield put(showFieldMessage(errorHandle(fetchedField.response)));
          }
          else {
            yield put(showFieldMessage(fetchedField.message));
          }
        } else {
          yield put(fetchFieldSuccess(fetchedField));
        }
      } catch (error) {
        yield put(showFieldMessage(error));
      }
    }
  } catch (error) {
    yield put(showDeleteFieldMessage(error));
  }
}

function* deleteFieldRequestFromViewPage(obj) {
  try {
    const deleteField = yield call(deleteFieldsFromViewPage, obj.payload);
    if (deleteField.message) {
      if (deleteField.response) {
        yield put(showDeleteFieldMessage(errorHandle(deleteField.response)));
      }
      else {
        yield put(showDeleteFieldMessage(deleteField.message));
      }
    } else {
      yield put(deleteFieldSuccess(deleteField));
    }
  } catch (error) {
    yield put(showDeleteFieldMessage(error));
  }
}

function* editFieldRequest(obj) {
  try {
    const editField = yield call(editFields, obj.payload);
    if (editField.message) {
      if (editField.response) {
        yield put(showFieldMessage(errorHandle(editField.response)));
      }
      else {
        yield put(showFieldMessage(editField.message));
      }
    } else {
      yield put(editFieldSuccess(editField));
    }
  } catch (error) {
    yield put(showFieldMessage(error));
  }
}

function* editDraftFieldRequest(obj) {
  try {
    const editDraftField = yield call(editDraftFieldHandler, obj.payload);
    if (editDraftField.message) {
      if (editDraftField.response) {
        yield put(showFieldMessage(errorHandle(editDraftField.response)));
      }
      else {
        yield put(showFieldMessage(editDraftField.message));
      }
    } else {
      yield put(editDraftFieldSuccess(editDraftField));
    }
  } catch (error) {
    yield put(showFieldMessage(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_FIELD_WITH_PAGINATION, fetchFieldRequest),
    takeEvery(FETCH_INDIVIDUAL_FIELD, fetchIndividualFieldRequest),
    takeEvery(ADD_FIELD, addFieldRequest),
    takeEvery(DELETE_FIELD, deleteFieldRequest),
    takeEvery(DELETE_FIELD_From_ViewPage, deleteFieldRequestFromViewPage),
    takeEvery(EDIT_FIELD, editFieldRequest),
    takeEvery(EDIT_DRAFT_FIELD, editDraftFieldRequest),
    takeEvery(SEARCH_FIELDS, searchFieldRequest),
    takeEvery(FETCH_ALL_FIELD, fetchAllFieldsRequest)
  ]);
}