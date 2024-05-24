import * as CONSTANTS from "./constants";

import { call, put, race, takeLatest, take, delay } from "redux-saga/effects";
import toast from "react-hot-toast";

import {
  getAvailabilitySettingsService,
  getSlotsServices,
  setAvailabilitySettingsService,
} from "./services";

function* getSlots({ payload }) {
  yield put({
    type: CONSTANTS.SET_IS_LOADING,
    payload: true,
  });
  try {
    const response = yield call(getSlotsServices, payload);

    yield put({
      type: CONSTANTS.GET_SLOTS_SUCCESS,
      payload: response?.data?.data,
    });
  } catch (error) {
    console.log("ERROR", error);
    toast.error(error?.response?.data?.message);
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
  }
}

function* getAvailabilitySettings() {
  yield put({
    type: CONSTANTS.SET_IS_LOADING,
    payload: true,
  });
  try {
    const response = yield call(getAvailabilitySettingsService);
    if (response?.data?.status == "success") {
      yield put({
        type: CONSTANTS.GET_AVAILABILITY_SETTINGS_SUCCCESS,
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    console.log("ERROR", error);
    toast.error(error?.response?.data?.message);
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
  }
}

function* setAvailabilitySettings({ payload }) {
  console.log("PAYLOAD IS", payload);
  yield put({
    type: CONSTANTS.SET_IS_LOADING,
    payload: true,
  });
  try {
    const response = yield call(
      setAvailabilitySettingsService,
      payload?.payload
    );
    if (response?.data?.status == "success") {
      yield put({
        type: CONSTANTS.SET_AVAILABILITY_SETTINGS_SUCCCESS,
        payload: response?.data?.data,
      });
      payload && payload?.callBack();
    }
  } catch (error) {
    console.log("ERROR", error);
    toast.error(error?.response?.data?.message);
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
  }
}

export default function* userSaga() {
  yield takeLatest(CONSTANTS.GET_SLOTS, getSlots);
  yield takeLatest(
    CONSTANTS.GET_AVAILABILITY_SETTINGS,
    getAvailabilitySettings
  );
  yield takeLatest(
    CONSTANTS.SET_AVAILABILITY_SETTINGS,
    setAvailabilitySettings
  );
}
