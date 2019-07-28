import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import config from "../config/masterData";
import axios from "axios";
import {
  fetchBankSuccess,
  searchBankSuccess,
  fetchAllBanksSuccess,
  showBankMessage,
  showBanksParentPageMessage,
  fetchIndividualBankSuccess,
  addBankSuccess,
  deleteBankSuccess,
  showDeleteBankMessage,
  editBankSuccess,
} from "actions/Bank";
import {
  FETCH_INDIVIDUAL_BANK,
  FETCH_ALL_BANKS,
  FETCH_BANKS_WITH_PAGINATION,
  ADD_BANK,
  DELETE_BANK,
  DELETE_BANK_From_ViewPage,
  EDIT_BANK,
  SEARCH_BANKS
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';

const getBanks = async obj =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/banks?pagenumber=" +
      obj.pageNumber +
      "&pagesize=" +
      obj.pageSize,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(banksList => {
      return banksList;
    })
    .catch(error => error);

const searchBanks = async query =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/Banks?name=" +
      query.byName +
      "&&code=" +
      query.byCode,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(banksList => {
      return banksList;
    })
    .catch(error => error);

const getAllBanks = async obj =>
  await axios({
    method: "get",
    url:
      config().apiUrl +
      "/v1.0/banks",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(banks => {
      return banks;
    })
    .catch(error => error);

const addBanks = async obj =>
  await axios({
    method: "post",
    url: config().apiUrl + "/v1.0/banks",
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") },
    data: {
      name: obj.name,
      code: obj.code,
      description: obj.description,
      image: obj.image
    }
  })
    .then(result => {
      return result;
    })
    .catch(error => error);

const editBanks = async obj =>
  await axios({
    method: "put",
    url: config().apiUrl + "/v1.0/banks/" + obj.id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") },
    data: {
      name: obj.name,
      status: obj.status,
      code: obj.code,
      description: obj.description,
      image: obj.image
    }
  })
    .then(result => {
      return result;
    })
    .catch(error => error);


const getIndividualBanks = async data =>
  await axios({
    method: "get",
    url: config().apiUrl + "/v1.0/banks/" + data.payload.id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(employeeIndvidualList => {
      return employeeIndvidualList;
    })
    .catch(error => error);

const deleteBanks = async obj =>
  await axios({
    method: "delete",
    url: config().apiUrl + "/v1.0/Banks/" + obj.id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(deleteBankRecord => {
      return deleteBankRecord;
    })
    .catch(error => error);

const deleteBanksFromViewPage = async id =>
  await axios({
    method: "delete",
    url: config().apiUrl + "/v1.0/banks/" + id,
    headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
  })
    .then(deleteBankRecord => {
      return deleteBankRecord;
    })
    .catch(error => error);


function* fetchBankRequest(obj) {
  try {
    const fetchedBank = yield call(getBanks, obj.payload);
    if (fetchedBank.message) {
      if (fetchedBank.response) {
        yield put(showBanksParentPageMessage(errorHandle(fetchedBank.response)));
      }
      else {
        yield put(showBanksParentPageMessage(fetchedBank.message));
      }
    } else {
      yield put(fetchBankSuccess(fetchedBank));
    }
  } catch (error) {
    yield put(showBanksParentPageMessage(error));
  }
}

function* searchBankRequest(obj) {
  try {
    const searchedBank = yield call(searchBanks, obj.payload);
    if (searchedBank.message) {
      if (searchedBank.response) {
        yield put(showBankMessage(errorHandle(searchedBank.response)));
      }
      else {
        yield put(showBankMessage(searchedBank.message));
      }
    } else {
      yield put(searchBankSuccess(searchedBank));
    }
  } catch (error) {
    yield put(showBankMessage(error));
  }
}

function* fetchAllBanksRequest() {
  try {
    const fetchedBank = yield call(getAllBanks);
    if (fetchedBank.message) {
      if (fetchedBank.response) {
        yield put(showBankMessage(errorHandle(fetchedBank.response)))
      }
      else {
        yield put(showBankMessage(fetchedBank.message))
      }
    }
    else {
      yield put(fetchAllBanksSuccess(fetchedBank));
    }
  } catch (error) {
    yield put(showBankMessage(error));
  }
}

function* fetchIndividualBankRequest(data) {
  try {
    const fetchedBank = yield call(getIndividualBanks, data);
    if (fetchedBank.message) {
      if (fetchedBank.response) {
        yield put(showBankMessage(errorHandle(fetchedBank.response)));
      }
      else {
        yield put(showBankMessage(fetchedBank.message));
      }
    } else {
      fetchedBank.data.page = data.payload.page;
      yield put(fetchIndividualBankSuccess(fetchedBank));
    }
  } catch (error) {
    yield put(showBankMessage(error));
  }
}

function* addBankRequest(obj) {
  try {
    const addBank = yield call(addBanks, obj.payload);
    if (addBank.message) {
      if (addBank.response) {
        yield put(showBankMessage(errorHandle(addBank.response)));
      }
      else {
        yield put(showBankMessage(addBank.message));
      }
    } else {
      yield put(addBankSuccess(addBank));
    }
  } catch (error) {
    yield put(showBankMessage(error));
  }
}

function* deleteBankRequest(obj) {
  try {
    const deleteBank = yield call(deleteBanks, obj.payload);
    if (deleteBank.message) {
      if (deleteBank.response) {
        yield put(showDeleteBankMessage(errorHandle(deleteBank.response)));
      }
      else {
        yield put(showDeleteBankMessage(deleteBank.message));
      }
    }
    else {
      yield put(deleteBankSuccess(deleteBank));
      try {
        const fetchedBank = yield call(getBanks, obj.payload);
        if (fetchedBank.message) {
          if (fetchedBank.response) {
            yield put(showBankMessage(errorHandle(fetchedBank.response)));
          }
          else {
            yield put(showBankMessage(fetchedBank.message));
          }
        } else {
          yield put(fetchBankSuccess(fetchedBank));
        }
      } catch (error) {
        yield put(showBankMessage(error));
      }
    }
  } catch (error) {
    yield put(showDeleteBankMessage(error));
  }
}

function* deleteBankRequestFromViewPage(obj) {
  try {
    const deleteBank = yield call(deleteBanksFromViewPage, obj.payload);
    if (deleteBank.message) {
      if (deleteBank.response) {
        yield put(showDeleteBankMessage(errorHandle(deleteBank.response)));
      }
      else {
        yield put(showDeleteBankMessage(deleteBank.message));
      }
    } else {
      yield put(deleteBankSuccess(deleteBank));
    }
  } catch (error) {
    yield put(showDeleteBankMessage(error));
  }
}

function* editBankRequest(obj) {
  try {
    const editBank = yield call(editBanks, obj.payload);
    if (editBank.message) {
      if (editBank.response) {
        yield put(showBankMessage(errorHandle(editBank.response)));
      }
      else {
        yield put(showBankMessage(editBank.message));
      }
    } else {
      yield put(editBankSuccess(editBank));
    }
  } catch (error) {
    yield put(showBankMessage(error));
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_BANKS_WITH_PAGINATION, fetchBankRequest),
    takeEvery(FETCH_INDIVIDUAL_BANK, fetchIndividualBankRequest),
    takeEvery(ADD_BANK, addBankRequest),
    takeEvery(DELETE_BANK, deleteBankRequest),
    takeEvery(DELETE_BANK_From_ViewPage, deleteBankRequestFromViewPage),
    takeEvery(EDIT_BANK, editBankRequest),
    takeEvery(SEARCH_BANKS, searchBankRequest),
    takeEvery(FETCH_ALL_BANKS, fetchAllBanksRequest)
  ]);
}
