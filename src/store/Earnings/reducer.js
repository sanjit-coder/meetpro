import * as CONSTANTS from "./constants";

const initialState = {
  isLoading: false,
  Earnings: null,
  serviceEarnings: {},
  serviceUserDetails: [],
  totalEarnings: "",
  totalBookings: "",
  limit: 10,
  offset: 0,
  hasMore: true,
  duration: 0,
};

const earningReducer = (state = initialState, action) => {
  switch (action?.type) {
    case CONSTANTS.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case CONSTANTS.GET_EARNINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        Earnings: action?.payload?.serviceEarnings,
        totalEarnings: action?.payload?.totalIncome,
        totalBookings: action?.payload?.totalPurchases,
      };

    case CONSTANTS.GET_SERVICE_EARNINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...(action?.payload?.offset === 0
          ? {
            offset: 10,
            hasMore:
              action?.payload?.services?.serviceUserDetails?.length <
              action?.payload?.totalService,
            serviceUserDetails: [
              ...action?.payload?.services?.serviceUserDetails,
            ],
            serviceEarnings: action?.payload?.services?.serviceEarnings,
          }
          : {
            offset: state?.offset + state?.limit,
            hasMore:
              state?.serviceUserDetails?.length +
              action?.payload?.services?.serviceUserDetails?.length <
              action?.payload?.totalService,
            dataLength:
              state?.serviceUserDetails?.length +
              action?.payload?.services?.serviceUserDetails?.length,
            serviceUserDetails: [
              ...state?.serviceUserDetails,
              ...action?.payload?.services?.serviceUserDetails,
            ],
            serviceEarnings: action?.payload?.services?.serviceEarnings,
          }),
      };

    case CONSTANTS.SET_DURATION:
      return {
        ...state,
        duration: action.payload,
      };

    case CONSTANTS.RESET_STATE:
      return {
        isLoading: false,
        Earnings: null,
        serviceEarnings: {},
        serviceUserDetails: [],
        totalEarnings: "",
        totalBookings: "",
        limit: 10,
        offset: 0,
        hasMore: true,
        duration: 0,
      };

    default:
      return state;
  }
};

export default earningReducer;
