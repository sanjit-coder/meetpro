import * as CONSTANTS from "./constants";

import { call, put, race, takeLatest, take, delay } from "redux-saga/effects";
import toast from "react-hot-toast";

import {
  createOrderService,
  getOrderStatusService,
  getBookingQuestionsService,
} from "./services";

function* createOrder({ payload }) {
  try {
    const response = yield call(createOrderService, payload?.orderPayload);
    console.log(
      "reespodkjdnkjdnf",
      response?.data?.data?.status,
      payload?.orderPayload?.returnUrl
    );

    if (response?.data?.data?.payment?.status == "Success") {
      sessionStorage?.setItem("bookingId", response?.data?.data?.bookingId)
      payload && payload?.callBack();
      yield put({
        type: CONSTANTS.SET_MODAL_STATUS,
        payload: { modal: "successModal", status: true },
      });
    }
    if (
      response?.data?.data?.status == "Initiated" &&
      payload?.orderPayload?.returnUrl
    ) {
      sessionStorage?.setItem("bookingId", response?.data?.data?.bookingId)
      window.open(response?.data?.data?.completePaymentUrl, "_self");
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
}

function* paymentStatusPollingWorker(payload) {
  let { orderId, pollingStartTime, callBack } = payload;

  try {
    sessionStorage.setItem("orderId", orderId);
    while (true) {
      let apiRes = yield call(getOrderStatusService, orderId);

      if (Date.now() - pollingStartTime > 1 * 60 * 1000) {
        callBack();
        yield put({
          type: CONSTANTS?.CANCEL_STATUS_POLLING,
          payload: { status: "pending", orderId },
        });
      } else if (apiRes?.data?.data?.payment?.status === "Success") {
        callBack();
        yield put({
          type: CONSTANTS?.CANCEL_STATUS_POLLING,
          payload: { status: "success", orderId, bookingId: apiRes?.data?.data?.payment?.bookingId },
        });
        break;
      } else if (apiRes?.data?.data?.payment?.status === "Failed") {
        callBack();
        yield put({
          type: CONSTANTS?.CANCEL_STATUS_POLLING,
          payload: { status: "failed", orderId },
        });
        break;
      } else if (apiRes?.data?.data?.payment?.status === "Refunded") {
        callBack();
        yield put({
          type: CONSTANTS?.CANCEL_STATUS_POLLING,
          payload: { status: "failed", orderId },
        });
      }
      yield delay(3000);
    }
  } catch (error) {
    yield put({
      type: CONSTANTS?.CANCEL_STATUS_POLLING,
      payload: { status: "failed", orderId },
    });
  }
}

function* checkpaymentStatusPolling(data) {
  yield race({
    task: call(paymentStatusPollingWorker, data.payload),
    //5. Start a take effect waiting for the cancel action.
    cancel: take(CONSTANTS?.CANCEL_STATUS_POLLING),
  });
}

function* cancelStatusPolling(payload) {
  console.log(payload);

  if (payload?.payload?.status == "success") {
    console.log("STATUS IS SUCCESS");

    yield put({
      type: CONSTANTS.SET_MODAL_STATUS,
      payload: {
        modal: "successModal",
        status: true,
        orderId: payload?.payload?.orderId,
        bookingId: payload?.payload?.bookingId
      },
    });
  }

  if (payload?.payload?.status == "failed") {
    yield put({
      type: CONSTANTS.SET_MODAL_STATUS,
      payload: {
        modal: "failedModal",
        status: true,
        orderId: payload?.payload?.orderId,
      },
    });
  }

  if (payload?.payload?.status == "refunded") {
    yield put({
      type: CONSTANTS.SET_MODAL_STATUS,
      payload: {
        modal: "refundModal",
        status: true,
        orderId: payload?.payload?.orderId,
      },
    });
  }

  if (payload?.payload?.status == "pending") {
    yield put({
      type: CONSTANTS.SET_MODAL_STATUS,
      payload: {
        modal: "pending",
        status: true,
        orderId: payload?.payload?.orderId,
      },
    });
  }

  if (payload?.payload?.status == "pending") {
    yield put({
      type: CONSTANTS.SET_MODAL_STATUS,
      payload: {
        modal: "pendingModal",
        status: true,
        orderId: payload?.payload?.orderId,
      },
    });
  }
}

function* getBookingQuestions(payload) {
  console.log("PAYLOAD FOR BOOKING QUESTIONS IS ****", payload);
  try {
    const response = yield call(getBookingQuestionsService, payload?.payload);
    console.log("QUESTIONS RESPONSE IS", response);
    if (response?.data?.status === "success") {
      yield put({
        type: CONSTANTS.GET_BOOKING_QUESTIONS_SUCCESS,
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    console.log("QUESTIONS ERROR", error);
    toast.error(error?.response?.data?.message);
  }
}

export default function* orderSaga() {
  yield takeLatest(CONSTANTS.CREATE_ORDER, createOrder);
  yield takeLatest(CONSTANTS?.CHECK_PAYMENT_STATUS, checkpaymentStatusPolling);
  yield takeLatest(CONSTANTS.CANCEL_STATUS_POLLING, cancelStatusPolling);
  yield takeLatest(CONSTANTS.GET_BOOKING_QUESTIONS, getBookingQuestions);
}
