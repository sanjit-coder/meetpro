import * as CONSTANTS from "./constants";

import { call, put, race, takeLatest, take, delay } from "redux-saga/effects";
import toast from "react-hot-toast";

import {
  getOfferingsServices,
  editOfferingsService,
  deleteOfferingService,
  addOfferingService,
} from "./services";

function* getOfferings(payload) {
  try {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: true,
    });
    const response = yield call(getOfferingsServices, payload);
    yield put({
      type: CONSTANTS.GET_OFFERINGS_SUCCESS,
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

function* editOfferings(payload) {
  console.log("PAYLOAD RECEIVED IS", payload);
  try {
    yield call(editOfferingsService, payload?.payload?.offerringData);
    payload && payload?.payload?.callBack();
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}

function* deleteOffering({ payload }) {
  try {
    const response = yield call(deleteOfferingService, payload);
    console.log("respinsenjj", response);
    if (response?.data?.message === "success") {
      yield put({
        type: CONSTANTS.GET_OFFERINGS,
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}

function* addOffering({ payload }) {
  console.log("PAYLOAD RECEIVED IS", payload);
  try {
    let response = yield call(addOfferingService, payload?.payload);
    if (response?.data?.message === "success") {
      payload && payload?.callBack();
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}

export default function* offeringSaga() {
  yield takeLatest(CONSTANTS.GET_OFFERINGS, getOfferings);
  yield takeLatest(CONSTANTS.EDIT_OFFERINGS, editOfferings);
  yield takeLatest(CONSTANTS.DELETE_OFFERING, deleteOffering);
  yield takeLatest(CONSTANTS.ADD_OFFERING, addOffering);
}
