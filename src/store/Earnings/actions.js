import * as CONSTANTS from "./constants";

export const setIsLoading = (payload) => ({
  type: CONSTANTS.SET_IS_LOADING,
  payload,
});

export const getEarnings = (payload) => ({
  type: CONSTANTS.GET_EARNINGS,
  payload,
});

export const getServiceEarnings = (payload) => ({
  type: CONSTANTS.GET_SERVICE_EARNINGS,
  payload,
});

export const setDuration = (payload) => ({
  type: CONSTANTS.SET_DURATION,
  payload,
});

export const resetState = () => ({
  type: CONSTANTS.RESET_STATE,
});
