import * as CONSTANTS from "./constants";

const initialState = {
  isLoading: false,
  testimonialData: {},
};

const testimonialReducer = (state = initialState, action) => {
  switch (action?.type) {
    case CONSTANTS.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case CONSTANTS.GET_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        testimonialData: action.payload,
      };
    case CONSTANTS.CREATE_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case CONSTANTS.PUBLISH_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case CONSTANTS.UNPUBLISH_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default testimonialReducer;
