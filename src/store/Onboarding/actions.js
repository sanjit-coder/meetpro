import * as CONSTANTS from "./constants";

export const setIsLoading = (payload) => ({
  type: CONSTANTS.SET_IS_LOADING,
  payload,
});

export const setUserName = (payload) => ({
  type: CONSTANTS.SET_USERNAME,
  payload,
});

export const setIsProfileExists = (payload) => ({
  type: CONSTANTS.SET_IS_PROFILE_EXISTS,
  payload,
});

export const getToken = (payload) => ({
  type: CONSTANTS.GET_TOKEN,
  payload,
});

export const checkUserNameAvailability = (payload) => ({
  type: CONSTANTS.CHECK_USERNAME_AVAILABILITY,
  payload,
});

export const getAvailability = () => ({
  type: CONSTANTS.GET_AVAILABILITY,
});

export const getServices = (payload) => ({
  type: CONSTANTS.GET_SERVICES,
  payload,
});

export const setAvailability = (payload) => ({
  type: CONSTANTS.SET_AVAILABILITY,
  payload,
});

export const editAvailability = (payload) => ({
  type: CONSTANTS.EDIT_AVAILABILITY,
  payload,
});

export const getUserDetails = (payload) => ({
  type: CONSTANTS.GET_USER_DETAILS,
  payload,
});

export const setService = (payload) => ({
  type: CONSTANTS.SET_SERVICES,
  payload: payload,
});

export const getBankDetails = (payload) => ({
  type: CONSTANTS.GET_BANK_DETAILS,
  payload: payload,
});

export const setBankDetails = (payload) => ({
  type: CONSTANTS.SET_BANK_DETAILS,
  payload: payload,
});

export const setBankDetailsAdded = (payload) => ({
  type: CONSTANTS.SET_BANK_DETAILS_ADDED,
  payload: payload,
});

export const updateUserDetails = (payload) => ({
  type: CONSTANTS.UPDATE_USER_DETAILS,
  payload,
});

export const setOnboardingData = (payload) => ({
  type: CONSTANTS.SET_ONBOARDING_DATA,
  payload,
});

export const onBoardUser = (payload) => ({
  type: CONSTANTS.ON_BOARD_USER,
  payload,
});

export const setGoodToUse = (payload) => ({
  type: CONSTANTS.SET_GOO_TO_USE,
  payload,
});

export const logoutUser = (payload) => ({
  type: CONSTANTS.LOGOUT_USER,
  payload,
});
