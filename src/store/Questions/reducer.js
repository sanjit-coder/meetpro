import * as CONSTANTS from "./constants";

const initialState = {
  isLoading: false,
  questions: null, //STATE FOR FETCHING QUESTIONS AFTER PAYMENT success
  isEditStateChanged: false,
  questionsPayload: [
    {
      question: "",
      answerType: "text",
      isMandatory: 1,
    },
  ],
  serviceQuestions: [
    {
      question: "",
      answerType: "text",
      isMandatory: 1,
    },
  ],
};

const questionsReducer = (state = initialState, action) => {
  switch (action?.type) {
    case CONSTANTS.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action?.payload,
      };
    case CONSTANTS.GET_BOOKING_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action?.payload,
      };

    case CONSTANTS.SUBMIT_ANSWERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case CONSTANTS.SAVE_QUESTIONS:
      return {
        ...state,
        serviceQuestions: action?.payload,
      };

    case CONSTANTS.RESET_QUESTIONS:
      return {
        ...state,
        isEditStateChanged: false,
        serviceQuestions: [
          {
            question: "",
            answerType: "text",
            isMandatory: 1,
          },
        ],
      };

    case CONSTANTS.SET_EDIT_QUESTIONS_STATE:
      return {
        ...state,
        isEditStateChanged: action?.payload,
      };

    case CONSTANTS.SET_EDIT_QUESTIONS_PAYLOAD:
      console.log("PAYLOAD IS", action?.payload);
      return {
        ...state,
        questionsPayload: action?.payload,
      };

    default:
      return state;
  }
};

export default questionsReducer;
