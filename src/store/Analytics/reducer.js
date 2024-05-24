import * as CONSTANTS from "./constants";

const initialState = {
  isLoading: false,
  eventSelected: "REVENUE",
  headerData: [],
  graphData: [],
};

const analyticsReducer = (state = initialState, action) => {
  switch (action?.type) {
    case CONSTANTS.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case CONSTANTS.POST_ANALYTICS_SUCCESS:
      console.log("PAYLOAD IS", action.payload);
      window.localStorage.setItem("uniqueId", action.payload?.uuid);
      return {
        ...state,
        isLoading: false,
      };
    case CONSTANTS.GET_ANALYTICS_HEADER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        headerData: [...action.payload],
      };
    case CONSTANTS.SELECT_EVENT:
      return {
        ...state,
        eventSelected: action.payload,
      };

    case CONSTANTS?.GET_GRAPH_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        graphData: action?.payload,
      };

    case CONSTANTS.RESET_STATE:
      return {
        isLoading: false,
        eventSelected: "REVENUE",
        headerData: [],
        graphData: [],
      };
    default:
      return state;
  }
};

export default analyticsReducer;
