import * as CONSTANTS from "./constants";

const initialState = {
  isLoading: false,
  userExists: "",
  services: null,
  selectedService: "overall",
  serviceTitle: "",
  serviceDescription: "",
  serviceDuration: "",
  servicePrice: 0,
  serviceId: null,
};

const offeringReducer = (state = initialState, action) => {
  switch (action?.type) {
    case CONSTANTS?.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action?.payload,
      };

    case CONSTANTS.GET_OFFERINGS_SUCCESS:
      return {
        ...state,
        services: action?.payload,
        // selectedService: action?.payload[0]?.id,
        isLoading: false,
      };

    case CONSTANTS.SELECT_OFFERING:
      return {
        ...state,
        selectedService: action.payload,
        isLoading: false,
      };

    case CONSTANTS.SET_OFFERING_DETAILS:
      return {
        ...state,
        [action?.payload?.type]: action?.payload?.value,
      };

    case CONSTANTS.RESET_OFFERING_DETAILS:
      return {
        ...state,
        serviceTitle: "",
        serviceDescription: "",
        serviceDuration: "",
        servicePrice: 0,
        serviceId: null,
      };

    case CONSTANTS.SET_SERVICE_ID:
      return {
        ...state,
        serviceId: action?.payload,
      };

    default:
      return state;
  }
};

export default offeringReducer;
