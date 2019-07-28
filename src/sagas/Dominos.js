import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import endPointHandler from "./../config/index";
import {
  fetchAllDominosSuccess,
  showDominosMessage,
  addDominosSuccess,
  addDominosSignUpSuccess,
  addDominosLogInSuccess
} from "../actions/Dominos";
import {
  FETCH_ALL_DOMINOS,
  ADD_DOMINOS_SIGNUP,
  ADD_DOMINOS_LOGIN,
  ADD_DOMINOS
} from "../constants/ActionTypes";
import errorHandle from "../functions/errorHandle";

let dominos = new endPointHandler("DOMINOS");

const getDominos = async params => {
  return await dominos.getHandler("Dominos");
};

const addDominoss = async params => {
  return await dominos.postHandler("Dominos", params);
};

const addDominosSignUpsSignUp = async params => {
  return await dominos.postHandler("Dominos/SignUp", params);
};


const addDominosLogin = async params => {
  return await dominos.postHandler("Dominos/Login", params);
};

function* fetchDominosRequest(obj) {
  try {
    const fetchedDominos = yield call(getDominos, obj.payload);
    if (fetchedDominos.message) {
      if (fetchedDominos.response) {
        yield put(
          showDominosMessage(errorHandle(fetchedDominos.response))
        );
      } else {
        yield put(showDominosMessage(fetchedDominos.message));
      }
    } else {
      yield put(fetchAllDominosSuccess(fetchedDominos));
    }
  } catch (error) {
    yield put(showDominosMessage(error));
  }
}


function* addDominosRequest(obj) {
  try {
    const addDominos = yield call(addDominoss, obj.payload);
    if (addDominos.message) {
      if (addDominos.response) {
        yield put(showDominosMessage(errorHandle(addDominos.response)));
      } else {
        yield put(showDominosMessage(addDominos.message));
      }
    } else {
      yield put(addDominosSuccess(addDominos));
    }
  } catch (error) {
    yield put(showDominosMessage(error));
  }
}

function* addDominosSignUpRequest(obj) {
  try {
    const addDominosSignUp = yield call(addDominosSignUpsSignUp, obj.payload);
    if (addDominosSignUp.message) {
      if (addDominosSignUp.response) {
        yield put(showDominosMessage(errorHandle(addDominosSignUp.response)));
      } else {
        yield put(showDominosMessage(addDominosSignUp.message));
      }
    } else {
      yield put(addDominosSignUpSuccess(addDominosSignUp));
    }
  } catch (error) {
    yield put(showDominosMessage(error));
  }
}


function* addDominosLogInRequest(obj) {
  try {
    const addDominosLogIn = yield call(addDominosLogin, obj.payload);
    if (addDominosLogIn.message) {
      if (addDominosLogIn.response) {
        yield put(showDominosMessage(errorHandle(addDominosLogIn.response)));
      } else {
        yield put(showDominosMessage(addDominosLogIn.message));
      }
    } else {
      yield put(addDominosLogInSuccess(addDominosLogIn));
    }
  } catch (error) {
    yield put(showDominosMessage(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(ADD_DOMINOS, addDominosRequest),
    takeEvery(FETCH_ALL_DOMINOS, fetchDominosRequest),
    takeEvery(ADD_DOMINOS_SIGNUP, addDominosSignUpRequest ),
    takeEvery(ADD_DOMINOS_LOGIN, addDominosLogInRequest )
  ]);
}
