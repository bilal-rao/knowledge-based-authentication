import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import config from "../config/masterData";
import axios from "axios";
import {
  fetchAllFieldsSuccess,
  fetchAllFieldSetSuccess,
  fetchIndividualFieldSetSuccess,
  showBuilderMessage,
} from "../actions/QueryBuilder";
import {
  FETCH_ALL_FIELDS,
  FETCH_ALL_FIELD_SET,
  FETCH_INDIVIDUAL_FIELD_SET
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';
import builderBuitify from '../functions/builderBuitify';


const getAllFields = async obj =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/fields",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(fields => {
      return fields;
    })
    .catch(error => error);


function* fetchAllFieldsRequest() {
  try {
    const fetchedField = yield call(getAllFields);
    if (fetchedField.message) {
      if (fetchedField.response) {
        yield put(showBuilderMessage(errorHandle(fetchedField.response)));
      }
      else {
        yield put(showBuilderMessage(fetchedField.message));
      }
    }
    else {
      if (fetchedField.data) {
        yield put(fetchAllFieldsSuccess(fetchedField.data));
        // yield put(fetchAllFieldsSuccess(builderBuitify(fetchedField.data)));
      }
    }
  } catch (error) {
    yield put(showBuilderMessage(error));
  }
}


const getAllFieldSet = async () =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/fieldsets",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(fieldSet => {
      return fieldSet;
    })
    .catch(error => error);

    const getIndividualFieldSet = async data =>
    await axios({
      method: "get",
      url: config().apiUrl + "/v1.0/fieldsets/" + data.payload.id,
      headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
    })
      .then(individualFieldSet => {
        return individualFieldSet;
      })
      .catch(error => error);

function* fetchAllFieldSetRequest() {
  try {
    const fetchedFieldSet = yield call(getAllFieldSet);
    if (fetchedFieldSet.message) {
      if (fetchedFieldSet.response) {
        yield put(showBuilderMessage(errorHandle(fetchedFieldSet.response)));
      }
      else {
        yield put(showBuilderMessage(fetchedFieldSet.message));
      }
    }
    else {
      if (fetchedFieldSet.data) {
        yield put(fetchAllFieldSetSuccess(fetchedFieldSet.data));
      }
    }
  } catch (error) {
    yield put(showBuilderMessage(error));
  }
}

function* fetchIndividualFieldSetRequest(data) {
  try {
    const fetchedIndividualFieldSet = yield call(getIndividualFieldSet, data);
    if (fetchedIndividualFieldSet.message) {
      if(fetchedIndividualFieldSet.response){
        yield put(showBuilderMessage(errorHandle(fetchedIndividualFieldSet.response)));
      }
      else{
        yield put(showBuilderMessage(fetchedIndividualFieldSet.message));
      }
    } else {
      fetchedIndividualFieldSet.data.page = data.payload.page;
      yield put(fetchIndividualFieldSetSuccess(fetchedIndividualFieldSet));
    }
  } catch (error) {
    yield put(showBuilderMessage(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_ALL_FIELDS, fetchAllFieldsRequest),
    takeEvery(FETCH_ALL_FIELD_SET, fetchAllFieldSetRequest),
    takeEvery(FETCH_INDIVIDUAL_FIELD_SET, fetchIndividualFieldSetRequest)
  ]);
}
