import * as CONSTANTS from "./constants";
import axios from "axios";
import toast from "react-hot-toast";

import {
  call,
  put,
  race,
  takeLatest,
  take,
  delay,
  select,
  all,
} from "redux-saga/effects";

import {
  getAnalyticsHeaderService,
  postAnalyticsService,
  getGraphDataService,
} from "./services";

function* postAnalytics(payload) {
  console.log("DATA IS", payload);
  try {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: true,
    });
    const response = yield call(postAnalyticsService, payload?.payload);
    if (response?.data?.status == "success") {
      console.log("RESPONSE IS", response?.data);
      yield put({
        type: CONSTANTS.POST_ANALYTICS_SUCCESS,
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
}

function* getAnalyticsHeader({ payload }) {
  console.log("PAYLOAD IS", payload);
  yield put({
    type: CONSTANTS.SET_IS_LOADING,
    payload: true,
  });
  try {
    const response = yield call(getAnalyticsHeaderService, payload);
    if (response?.data?.status == "success") {
      console.log("RESPONSE IS", response?.data);
      yield put({
        type: CONSTANTS.GET_ANALYTICS_HEADER_SUCCESS,
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
}

function* getGraphData({ payload }) {
  console.log("THIS IS THE PAYLOAD", payload);
  yield put({
    type: CONSTANTS.SET_IS_LOADING,
    payload: true,
  });

  try {
    const response = yield call(getGraphDataService, payload);

    if (response?.data?.status == "success") {
      yield put({
        type: CONSTANTS.GET_GRAPH_DATA_SUCCESS,
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
}

export default function* analyticsSaga() {
  yield takeLatest(CONSTANTS.POST_ANALYTICS, postAnalytics);
  yield takeLatest(CONSTANTS.GET_ANALYTICS_HEADER, getAnalyticsHeader);
  yield takeLatest(CONSTANTS.GET_GRAPH_DATA, getGraphData);
}
