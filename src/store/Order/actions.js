import * as CONSTANTS from "./constants";

export const createOrder = (payload) => ({
  type: CONSTANTS.CREATE_ORDER,
  payload,
});

export const checkPaymentStatusAction = (payload) => ({
  type: CONSTANTS.CHECK_PAYMENT_STATUS,
  payload,
});

export const getBookingQuestions = (payload) => ({
  type: CONSTANTS.GET_BOOKING_QUESTIONS,
  payload,
});

export const setModalStatus = (payload) => ({
  type: CONSTANTS.SET_MODAL_STATUS,
  payload,
});
