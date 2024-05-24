import * as CONSTANTS from "./constants";

const initialState = {
  isLoading: false,
  userExists: "",
  slots: [],
  selectedText: "",
  selectedSlot: null,
  bookingData: {},
  availabilitySettings: null,
};

const userReducer = (state = initialState, action) => {
  switch (action?.type) {
    case CONSTANTS.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case CONSTANTS.GET_SLOTS_SUCCESS:
      console.log("SUCCESSFUL RESPONSE ", action.payload);
      return {
        ...state,
        slots: action?.payload?.slotData,
        serviceDetails: action?.payload?.serviceDetails,
        isLoading: false,
      };

    case CONSTANTS.SET_SELECTED_TEXT:
      return {
        ...state,
        selectedText: action.payload,
      };

    case CONSTANTS.SET_SELECTED_SLOT:
      return {
        ...state,
        selectedSlot: action.payload,
      };
    case CONSTANTS.GET_AVAILABILITY_SETTINGS_SUCCCESS:
      return {
        ...state,
        isLoading: false,
        availabilitySettings: action?.payload,
      };
    case CONSTANTS.SET_AVAILABILITY_SETTINGS_SUCCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case CONSTANTS.RESET_STATE:
      return {
        isLoading: false,
        userExists: "",
        slots: [],
        selectedText: "",
        selectedSlot: null,
        bookingData: {},
      };
    // case CONSTANTS.SET_BOOKING_DATA:
    //   return{
    //     ...state,
    //     bookingData:{...bookingData,action.payload}
    //   }

    default:
      return state;
  }
};

export default userReducer;
