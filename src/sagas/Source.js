import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import config from "../config/masterData";
import axios from "axios";
import {
  fetchAllSourcesSuccess,
  showSourceMessage,
} from "../actions/Source";
import {
  FETCH_ALL_SOURCES,
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';

const getAllSources = async () =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/sources",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(sources => {
      return sources;
    })
    .catch(error => error);

function* fetchAllSourcesRequest() {
  try {
    const fetchedSource = yield call(getAllSources);
    if (fetchedSource.message) {
      if (fetchedSource.response) {
        yield put(showSourceMessage(errorHandle(fetchedSource.response)));
      }
      else {
        yield put(showSourceMessage(fetchedSource.message));
      }
    }
    else {
      yield put(fetchAllSourcesSuccess(fetchedSource));
    }
  } catch (error) {
    yield put(showSourceMessage(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_ALL_SOURCES, fetchAllSourcesRequest)
  ]);
}
