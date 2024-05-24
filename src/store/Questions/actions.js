import * as CONSTANTS from "./constants";

export const setIsLoading = (payload) => ({
  type: CONSTANTS.SET_IS_LOADING,
  payload,
});

export const getBookingQuestions = (payload) => ({
  type: CONSTANTS.GET_BOOKING_QUESTIONS,
  payload,
});

export const saveQuestions = (payload) => {
  console.log("payload", payload);
  return {
    type: CONSTANTS.SAVE_QUESTIONS,
    payload,
  };
};

export const resetQuestions = () => ({
  type: CONSTANTS.RESET_QUESTIONS,
});

export const setEditQuestionsState = (payload) => ({
  type: CONSTANTS.SET_EDIT_QUESTIONS_STATE,
  payload,
});

export const postAnswers = (payload) => ({
  type: CONSTANTS.SUBMIT_ANSWERS,
  payload,
});

export const setEditQuestionsPayload = (payload) => ({
  type: CONSTANTS.SET_EDIT_QUESTIONS_PAYLOAD,
  payload,
});
