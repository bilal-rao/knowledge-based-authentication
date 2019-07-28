import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import config from "../config/identity";
import axios from "axios";
import {
  fetchModuleSuccess,
  showModuleMessage,
} from "../actions/Module";
import {
  FETCH_MODULE,
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';

const getModules = async obj =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/Users/" + localStorage.getItem('user_id') +
      "?IsDetailsRequired=true",
    headers: {
      Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token")
    }
  })
    .then(modulesList => {
      return modulesList;
    })
    .catch(error => error);


function* fetchModuleRequest(obj) {
  try {
    const fetchedModule = yield call(getModules, obj.payload);
    if (fetchedModule.message) {
      if (fetchedModule.response) {
        yield put(showModuleMessage(errorHandle(fetchedModule.response)));
      }
      else {
        yield put(showModuleMessage(fetchedModule.message));
      }
    } else {
      yield put(fetchModuleSuccess(fetchedModule));
    }
  } catch (error) {
    yield put(showModuleMessage(error));
  }
}


export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_MODULE, fetchModuleRequest)
  ]);
}
