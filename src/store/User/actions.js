import * as CONSTANTS from "./constants";

export const setIsLoading = (payload) => ({
  type: CONSTANTS.SET_IS_LOADING,
  payload,
});

export const getSlots = (payload) => ({
  type: CONSTANTS.GET_SLOTS,
  payload,
});

export const setBookingData = (payload) => ({
  type: CONSTANTS.SET_BOOKING_DATA,
  payload,
});

export const setSelectedText = (payload) => ({
  type: CONSTANTS.SET_SELECTED_TEXT,
  payload,
});

export const setSelectedSlot = (payload) => ({
  type: CONSTANTS.SET_SELECTED_SLOT,
  payload,
});

export const resetState = (payload) => ({
  type: CONSTANTS.RESET_STATE,
});

export const getAvailabilitySettings = (payload) => ({
  type: CONSTANTS.GET_AVAILABILITY_SETTINGS,
  payload,
});

export const setAvailabilitySettings = (payload) => ({
  type: CONSTANTS.SET_AVAILABILITY_SETTINGS,
  payload,
});
