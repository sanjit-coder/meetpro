import * as CONSTANTS from "./constants";

import { call, put, takeLatest, select } from "redux-saga/effects";
import toast from "react-hot-toast";

import { getBlockedDatesService, modifyBlockedDatesService } from "./service";

function* getBlockedDates(payload) {
  try {
    const response = yield call(getBlockedDatesService, payload);

    if (response?.data?.status == "success") {
      console.log("GET SUCCESS");
      yield put({
        type: CONSTANTS?.GET_BLOCKED_DATES_SUCCESS,
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    console.log("GET ERROR");
    toast.error(error?.response?.data?.message);
  }
}

function* modifyBlockedDates(payload) {
  console.log("PAYLOAD IS", payload);
  try {
    const response = yield call(modifyBlockedDatesService, payload?.payload);

    if (response?.data?.status === "success") {
      console.log("SUCCESS");
      payload && payload?.payload?.callBack();

      yield put({
        type: CONSTANTS?.GET_BLOCKED_DATES,
        payload: {},
      });

      // yield put({
      //     type: CONSTANTS?.MODIFY_BLOCKED_DATES_SUCCESS,
      //     payload: response?.data?.data
      // })
    }
  } catch (error) {
    debugger
    toast.error(error?.response?.data?.message);
  }
}

export default function* blockedDatesSaga() {
  yield takeLatest(CONSTANTS?.GET_BLOCKED_DATES, getBlockedDates);
  yield takeLatest(CONSTANTS?.MODIFY_BLOCKED_DATES, modifyBlockedDates);
}
