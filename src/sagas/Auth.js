import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import endPointHandler from "./../config/index";
import {
  SIGNIN_USER,
  ACTIVATE_INFO,
  CHANGE_PASSWORD_WL,
  FORGOT_PASSWORD
} from "constants/ActionTypes";
import {
  showAuthMessage,
  userSignInSuccess,
  fetchActivationInfoSuccess,
  changePasswordWLSuccess,
  forgotPasswordSuccess
} from "actions/Auth";
import errorHandle from "../functions/errorHandle";

let identity = new endPointHandler("IDENTITY");

const getActivationInfo = async params => {
  return await identity.getHandler(
    `oauth2/Activate/${params.institutionId}/${params.code}`
  );
};

const signInUserHandler = async params => {
  return await identity.generateToken("oauth2/token", {
    userName: params.email,
    password: params.password,
    grantType: "password",
    institutionId: params.institutionId
  });
};

const changePasswordWL = async params => {
  return await identity.postHandler("oauth2/password", {
    code: params.code,
    password: params.password
  });
};

const forgotPassword = async params => {
  return await identity.postHandler("oauth2/ForgetPassword", {
    institutionId: params.institutionId,
    userName: params.email
  });
};

function* getActivationRequest(obj) {
  try {
    const activationInfo = yield call(getActivationInfo, obj.payload);
    if (activationInfo.message) {
      if (activationInfo.response) {
        yield put(showAuthMessage(errorHandle(activationInfo.response)));
      } else {
        yield put(showAuthMessage(activationInfo.message));
      }
    } else {
      yield put(fetchActivationInfoSuccess(activationInfo));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signInUserRequest(obj) {
  try {
    const signInUser = yield call(signInUserHandler, obj.payload);
    if (signInUser.message) {
      if (signInUser.response) {
        yield put(showAuthMessage(errorHandle(signInUser.response)));
      } else {
        yield put(showAuthMessage(signInUser.message));
      }
    } else {
      localStorage.setItem("access_token", signInUser.data.access_token);
      localStorage.setItem("refresh_token", signInUser.data.refresh_token);
      localStorage.setItem(
        "expires_in",
        Math.round(new Date() / 1000) + Number(signInUser.data.expires_in)
      );
      localStorage.setItem("token_type", signInUser.data.token_type);
      localStorage.setItem("user_id", signInUser.data.user_id);
      yield put(userSignInSuccess(signInUser));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* changePasswordWLRequest(obj) {
  try {
    const changePasswordWLRes = yield call(changePasswordWL, obj.payload);
    if (changePasswordWLRes.message) {
      if (changePasswordWLRes.response) {
        yield put(showAuthMessage(errorHandle(changePasswordWLRes.response)));
      } else {
        yield put(showAuthMessage(changePasswordWLRes.message));
      }
    } else {
      yield put(changePasswordWLSuccess(changePasswordWLRes));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* forgotPasswordRequest(obj) {
  try {
    const forgotPasswordRes = yield call(forgotPassword, obj.payload);
    if (forgotPasswordRes.message) {
      if (forgotPasswordRes.response) {
        yield put(showAuthMessage(errorHandle(forgotPasswordRes.response)));
      } else {
        yield put(showAuthMessage(forgotPasswordRes.message));
      }
    } else {
      yield put(forgotPasswordSuccess(forgotPasswordRes));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(SIGNIN_USER, signInUserRequest),
    takeEvery(ACTIVATE_INFO, getActivationRequest),
    takeEvery(CHANGE_PASSWORD_WL, changePasswordWLRequest),
    takeEvery(FORGOT_PASSWORD, forgotPasswordRequest)
  ]);
}
