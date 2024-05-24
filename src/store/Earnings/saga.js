import * as CONSTANTS from "./constants";

import { call, put, race, takeLatest, take, delay } from "redux-saga/effects";
import toast from "react-hot-toast";

import { getEarningsService, getServiceEarningsService } from "./services";

function* getEarnings({ payload }) {
  yield put({
    type: CONSTANTS.SET_IS_LOADING,
    payload: true,
  });
  try {
    const response = yield call(getEarningsService, payload);
    console.log("EARNINGS RESPONSE IS", response);
    yield put({
      type: CONSTANTS.GET_EARNINGS_SUCCESS,
      payload: response?.data?.data,
    });
  } catch (error) {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}

function* getServiceEarnings({ payload }) {
  console.log("PAYLOAD IS", payload);

  try {
    const response = yield call(getServiceEarningsService, payload);
    console.log("SERVICE EARNINGS RESPONSE IS", response);
    yield put({
      type: CONSTANTS.GET_SERVICE_EARNINGS_SUCCESS,
      payload: {
        services: response?.data?.data,
        totalService: response?.data?.data?.serviceEarnings?.purchases,
        offset: payload?.offset,
        limit: payload?.limit,
      },
    });
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}

export default function* earningSaga() {
  yield takeLatest(CONSTANTS.GET_EARNINGS, getEarnings);
  yield takeLatest(CONSTANTS.GET_SERVICE_EARNINGS, getServiceEarnings);
}
