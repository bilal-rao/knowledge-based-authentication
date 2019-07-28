import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import config from "../config/jarvis";
import axios from "axios";
import {
    fetchPolicySuccess,
    searchPolicySuccess,
    fetchAllPoliciesSuccess,
    showPolicyMessage,
    showPoliciesParentPageMessage,
    fetchIndividualPolicySuccess,
    addPolicySuccess,
    deletePolicySuccess,
    showDeletePolicyMessage,
    editPolicySuccess,
} from "../actions/Policies";
import {
    FETCH_INDIVIDUAL_POLICY,
    FETCH_ALL_POLICIES,
    FETCH_POLICIES_WITH_PAGINATION,
    ADD_POLICY,
    DELETE_POLICY,
    DELETE_POLICY_From_ViewPage,
    EDIT_POLICY,
    SEARCH_POLICIES
} from "../constants/ActionTypes";
import errorHandle from '../functions/errorHandle';

const getPolicies = async obj =>
    await axios({
        method: "get",
        url:
            config().apiUrl +
            "/v1.0/policies?pagenumber=" +
            obj.pageNumber +
            "&pagesize=" +
            obj.pageSize,
        headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
    })
        .then(policiesList => {
            return policiesList;
        })
        .catch(error => error);

const searchPolicies = async query =>
    await axios({
        method: "get",
        url:
            config().apiUrl +
            "/v1.0/Policies?name=" +
            query.byName,
        headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
    })
        .then(policiesList => {
            return policiesList;
        })
        .catch(error => error);

const getAllPolicies = async obj =>
    await axios({
        method: "get",
        url:
            config().apiUrl +
            "/v1.0/products/" +
            obj.pId +
            "/policies",
        headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
    })
        .then(policies => {
            return policies;
        })
        .catch(error => error);

const addPolicies = async obj =>
    await axios({
        method: obj.method,
        url: obj.step === 0 ? config().apiUrl + "/v1.0/policies" : config().apiUrl + "/v1.0/products/" + obj.pId + '/' + obj.productStep,
        headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") },
        data: {
            min: obj.min,
            max: obj.max,
            deviationId: obj.deviationId,
            stageIds: obj.stageIds,
            overrides: obj.overrides
        }
    })
        .then(result => {
            return result;
        })
        .catch(error => error);

const editPolicies = async obj =>
    await axios({
        method: "put",
        url: config().apiUrl + "/v1.0/policies/" + obj.Id,
        headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") },
        data: {
            code: obj.code,
            name: obj.name,
            description: obj.description,
            RoleIds: obj.roles,
            status: obj.status
        }
    })
        .then(result => {
            return result;
        })
        .catch(error => error);


const getIndividualPolicies = async data =>
    await axios({
        method: "get",
        url: config().apiUrl + "/v1.0/policies/" + data.payload.deletePolicyRecord,
        headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
    })
        .then(employeeIndvidualList => {
            return employeeIndvidualList;
        })
        .catch(error => error);

const deletePolicies = async obj =>
    await axios({
        method: "delete",
        url: config().apiUrl + "/v1.0/Policies/" + obj.id,
        headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
    })
        .then(deletePolicyRecord => {
            return deletePolicyRecord;
        })
        .catch(error => error);

const deletePoliciesFromViewPage = async id =>
    await axios({
        method: "delete",
        url: config().apiUrl + "/v1.0/policies/" + id,
        headers: { Authorization: localStorage.getItem('token_type') + " " + localStorage.getItem("access_token") }
    })
        .then(deletePolicyRecord => {
            return deletePolicyRecord;
        })
        .catch(error => error);

function* fetchPolicyRequest(obj) {
    try {
        const fetchedPolicy = yield call(getPolicies, obj.payload);
        if (fetchedPolicy.message) {
            if (fetchedPolicy.response) {
                yield put(showPoliciesParentPageMessage(errorHandle(fetchedPolicy.response)));
            }
            else {
                yield put(showPoliciesParentPageMessage(fetchedPolicy.message));
            }
        } else {
            yield put(fetchPolicySuccess(fetchedPolicy));
        }
    } catch (error) {
        yield put(showPoliciesParentPageMessage(error));
    }
}

function* searchPolicyRequest(obj) {
    try {
        const searchedPolicy = yield call(searchPolicies, obj.payload);
        if (searchedPolicy.message) {
            if (searchedPolicy.response) {
                yield put(showPolicyMessage(errorHandle(searchedPolicy.response)));
            }
            else {
                yield put(showPolicyMessage(searchedPolicy.message));
            }
        } else {
            yield put(searchPolicySuccess(searchedPolicy));
        }
    } catch (error) {
        yield put(showPolicyMessage(error));
    }
}

function* fetchAllPoliciesRequest(obj) {
    try {
        const fetchedPolicy = yield call(getAllPolicies, obj.payload);
        if (fetchedPolicy.message) {
            if (fetchedPolicy.response) {
                yield put(showPolicyMessage(errorHandle(fetchedPolicy.response)));
            }
            else {
                yield put(showPolicyMessage(fetchedPolicy.message));
            }
        }
        else {
            yield put(fetchAllPoliciesSuccess(fetchedPolicy));
        }
    } catch (error) {
        yield put(showPolicyMessage(error));
    }
}

function* fetchIndividualPolicyRequest(data) {
    try {
        const fetchedPolicy = yield call(getIndividualPolicies, data);
        if (fetchedPolicy.message) {
            if (fetchedPolicy.response) {
                yield put(showPolicyMessage(errorHandle(fetchedPolicy.response)));
            }
            else {
                yield put(showPolicyMessage(fetchedPolicy.message));
            }
        } else {
            fetchedPolicy.data.page = data.payload.page;
            yield put(fetchIndividualPolicySuccess(fetchedPolicy));
        }
    } catch (error) {
        yield put(showPolicyMessage(error));
    }
}

function* addPolicyRequest(obj) {
    try {
        const addPolicy = yield call(addPolicies, obj.payload);
        if (addPolicy.message) {
            if (addPolicy.response) {
                yield put(showPolicyMessage(errorHandle(addPolicy.response)));
            }
            else {
                yield put(showPolicyMessage(addPolicy.message));
            }
        } else {
            yield put(addPolicySuccess(addPolicy));
        }
    } catch (error) {
        yield put(showPolicyMessage(error));
    }
}

function* deletePolicyRequest(obj) {
    try {
        const deletePolicy = yield call(deletePolicies, obj.payload);
        if (deletePolicy.message) {
            if (deletePolicy.response) {
                yield put(showDeletePolicyMessage(errorHandle(deletePolicy.response)));
            }
            else {
                yield put(showDeletePolicyMessage(deletePolicy.message));
            }
        }
        else {
            yield put(deletePolicySuccess(deletePolicy));
            try {
                const fetchedPolicy = yield call(getPolicies, obj.payload);
                if (fetchedPolicy.message) {
                    if (fetchedPolicy.response) {
                        yield put(showPolicyMessage(errorHandle(fetchedPolicy.response)));
                    }
                    else {
                        yield put(showPolicyMessage(fetchedPolicy.message));
                    }
                } else {
                    yield put(fetchPolicySuccess(fetchedPolicy));
                }
            } catch (error) {
                yield put(showPolicyMessage(error));
            }
        }
    } catch (error) {
        yield put(showDeletePolicyMessage(error));
    }
}

function* deletePolicyRequestFromViewPage(obj) {
    try {
        const deletePolicy = yield call(deletePoliciesFromViewPage, obj.payload);
        if (deletePolicy.message) {
            if (deletePolicy.response) {
                yield put(showDeletePolicyMessage(errorHandle(deletePolicy.response)));
            }
            else {
                yield put(showDeletePolicyMessage(deletePolicy.message));
            }
        } else {
            yield put(deletePolicySuccess(deletePolicy));
        }
    } catch (error) {
        yield put(showDeletePolicyMessage(error));
    }
}

function* editPolicyRequest(obj) {
    try {
        const editPolicy = yield call(editPolicies, obj.payload);
        if (editPolicy.message) {
            if (editPolicy.response) {
                yield put(showPolicyMessage(errorHandle(editPolicy.response)));
            }
            else {
                yield put(showPolicyMessage(editPolicy.message));
            }
        } else {
            yield put(editPolicySuccess(editPolicy));
        }
    } catch (error) {
        yield put(showPolicyMessage(error));
    }
}
export default function* rootSaga() {
    yield all([
        takeEvery(FETCH_POLICIES_WITH_PAGINATION, fetchPolicyRequest),
        takeEvery(FETCH_INDIVIDUAL_POLICY, fetchIndividualPolicyRequest),
        takeEvery(ADD_POLICY, addPolicyRequest),
        takeEvery(DELETE_POLICY, deletePolicyRequest),
        takeEvery(DELETE_POLICY_From_ViewPage, deletePolicyRequestFromViewPage),
        takeEvery(EDIT_POLICY, editPolicyRequest),
        takeEvery(SEARCH_POLICIES, searchPolicyRequest),
        takeEvery(FETCH_ALL_POLICIES, fetchAllPoliciesRequest)
    ]);
}
