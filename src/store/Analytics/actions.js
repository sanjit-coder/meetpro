import * as CONSTANTS from "./constants";

export const setIsLoading = (payload) => ({
  type: CONSTANTS.SET_IS_LOADING,
  payload,
});

export const getAnalyticsHeader = (payload) => ({
  type: CONSTANTS.GET_ANALYTICS_HEADER,
  payload,
});

export const postAnalytics = (payload) => ({
  type: CONSTANTS.POST_ANALYTICS,
  payload,
});

export const selectEvent = (payload) => ({
  type: CONSTANTS.SELECT_EVENT,
  payload,
});

export const getGraphData = (payload) => ({
  type: CONSTANTS.GET_GRAPH_DATA,
  payload,
});

export const resetState = (payload) => ({
  type: CONSTANTS.RESET_STATE,
  payload,
});
