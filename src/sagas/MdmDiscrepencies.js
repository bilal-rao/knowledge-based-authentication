import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import config from "../config/masterData";
import axios from "axios";
import {
  fetchAllMdmDiscrepenciesSuccess,
  showMdmDiscrepencyMessage,
} from "../actions/MdmDiscrepencies";
import {
  FETCH_ALL_MDM_DISCREPENCIES,
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';

const getAllMdmDiscrepencies = async () =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/discrepancies",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(discrepancies => {
      return discrepancies;
    })
    .catch(error => error);

function* fetchAllMdmDiscrepenciesRequest() {
  try {
    const fetchedMdm_Discrepency = yield call(getAllMdmDiscrepencies);
    if (fetchedMdm_Discrepency.message) {
      if (fetchedMdm_Discrepency.response) {
        yield put(showMdmDiscrepencyMessage(errorHandle(fetchedMdm_Discrepency.response)));
      }
      else {
        yield put(showMdmDiscrepencyMessage(fetchedMdm_Discrepency.message));
      }
    }
    else {
      yield put(fetchAllMdmDiscrepenciesSuccess(fetchedMdm_Discrepency));
    }
  } catch (error) {
    yield put(showMdmDiscrepencyMessage(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_ALL_MDM_DISCREPENCIES, fetchAllMdmDiscrepenciesRequest)
  ]);
}
