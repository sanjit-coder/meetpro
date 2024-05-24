import * as CONSTANTS from "./constants";

export const setIsLoading = (payload) => ({
  type: CONSTANTS.SET_IS_LOADING,
  payload,
});

export const getOfferings = (payload) => ({
  type: CONSTANTS.GET_OFFERINGS,
  payload,
});

export const editOfferings = (payload) => ({
  type: CONSTANTS.EDIT_OFFERINGS,
  payload,
});

export const deleteOffering = (payload) => ({
  type: CONSTANTS.DELETE_OFFERING,
  payload,
});

export const addOffering = (payload) => ({
  type: CONSTANTS.ADD_OFFERING,
  payload,
});

export const selectOffering = (payload) => ({
  type: CONSTANTS.SELECT_OFFERING,
  payload,
});

export const setOfferingDetails = (payload) => ({
  type: CONSTANTS.SET_OFFERING_DETAILS,
  payload,
});

export const resetOfferingDetails = () => ({
  type: CONSTANTS.RESET_OFFERING_DETAILS,
});

export const setServiceId = (payload) => ({
  type: CONSTANTS.SET_SERVICE_ID,
  payload,
});
