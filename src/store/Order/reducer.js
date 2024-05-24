import * as CONSTANTS from "./constants";

const initialState = {
  isLoading: false,
  userExists: "",
  orderPayload: {},
  statusModal: {},
  bookingQuestions: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action?.type) {
    case CONSTANTS.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        // orderStatus: action?.payload
        orderPayload: { ...action?.payload },
      };

    case CONSTANTS.SET_MODAL_STATUS:
      return {
        ...state,
        statusModal: {
          ...action?.payload,
        },
      };

    case CONSTANTS.GET_BOOKING_QUESTIONS_SUCCESS:
      return {
        ...state,
        bookingQuestions: action?.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
