import * as CONSTANTS from "./constants";

import { call, put, race, takeLatest, take, delay } from "redux-saga/effects";
import toast from "react-hot-toast";

import {
  getTestimonialService,
  createTestimonialService,
  publishTestimonialService,
  unpublishTestimonialService,
} from "./services";

function* getTestimonial(payload) {
  console.log("PAYLOAD RECEIVED IS", payload);
  yield put({
    type: CONSTANTS.SET_IS_LOADING,
    payload: true,
  });
  try {
    const response = yield call(getTestimonialService, payload?.payload);

    yield put({
      type: CONSTANTS.GET_TESTIMONIAL_SUCCESS,
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

function* createTestimonial({ payload }) {
  console.log("PAYLOAD RECEIVED IS", payload);
  yield put({
    type: CONSTANTS.SET_IS_LOADING,
    payload: true,
  });
  try {
    let response = yield call(createTestimonialService, payload?.payload);
    if (response?.data?.message === "success") {
      yield put({
        type: CONSTANTS.CREATE_TESTIMONIAL_SUCCESS,
      });
      payload && payload?.callBack();
    }
  } catch (error) {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}

function* publishTestimonial({ payload }) {
  console.log("PAYLOAD RECEIVED IS", payload);
  yield put({
    type: CONSTANTS.SET_IS_LOADING,
    payload: true,
  });
  try {
    let response = yield call(publishTestimonialService, payload?.payload);
    if (response?.data?.message === "success") {
      yield put({
        type: CONSTANTS.PUBLISH_TESTIMONIAL_SUCCESS,
      });
      payload && payload?.callBack();
    }
  } catch (error) {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}

function* unpublishTestimonial({ payload }) {
  console.log("PAYLOAD RECEIVED IS", payload);
  yield put({
    type: CONSTANTS.SET_IS_LOADING,
    payload: true,
  });
  try {
    let response = yield call(unpublishTestimonialService, payload?.payload);
    if (response?.data?.message === "success") {
      yield put({
        type: CONSTANTS.UNPUBLISH_TESTIMONIAL_SUCCESS,
      });
      payload && payload?.callBack();
    }
  } catch (error) {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}

export default function* testimonialSaga() {
  yield takeLatest(CONSTANTS.GET_TESTIMONIAL, getTestimonial);
  yield takeLatest(CONSTANTS.CREATE_TESTIMONIAL, createTestimonial);
  yield takeLatest(CONSTANTS.PUBLISH_TESTIMONIAL, publishTestimonial);
  yield takeLatest(CONSTANTS.UNPUBLISH_TESTIMONIAL, unpublishTestimonial);
}
