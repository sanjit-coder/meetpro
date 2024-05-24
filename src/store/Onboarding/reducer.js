import * as CONSTANTS from "./constants";

const initialState = {
  userName: "",
  isLoading: false,
  userExists: "",
  onboardingData: {},
  user: null,
  profileExists: false,
  goodToUse: false,
  availability: [],
  isEdited: false,
  bankDetailsadded: false,
  bankDetails: null,
};

const onboardingReducer = (state = initialState, action) => {
  switch (action?.type) {
    case CONSTANTS.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case CONSTANTS.SET_USERNAME:
      return {
        ...state,
        userName: action.payload,
      };
    case CONSTANTS.GET_TOKEN_SUCCESS:
      console.log("TOKEN SUCCESS payload IS", action.payload);
      window.localStorage.setItem("token", action.payload?.token);
      window.localStorage.setItem("isExists", action.payload?.exists);
      window.localStorage.setItem(
        "onboardingStatus",
        action?.payload?.onboardingStatus
      );
      window.localStorage.removeItem("utmobject");
      window.localStorage.removeItem("signupPoint");

      return {
        ...state,
        isLoading: false,
        userExists: action?.payload?.onboardingStatus,
        // tokenApiSuccess: true,
        onboardingData: { ...action.payload },
      };

    case CONSTANTS.CHECK_USERNAME_AVAILABILITY_SUCCESS:
      return {
        ...state,
        goodToUse: action.payload?.goodToUse,
      };

    case CONSTANTS.GET_SERVICES_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case CONSTANTS.GET_AVAILABILITY_SUCCESS:
      return {
        ...state,
        availability: action.payload,
        isLoading: false,
      };

    case CONSTANTS.GET_SERVICES_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case CONSTANTS.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: { ...action.payload },
        profileExists: true,
      };

    case CONSTANTS.EDIT_AVAILABILITY_SUCCESS:
      console.log("SUCCESS PAYLOAD IS", action.payload);
      return {
        ...state,
        isLoading: false,
      };

    case CONSTANTS.SET_BANK_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bankDetailsadded: true,
      };

    case CONSTANTS.GET_BANK_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bankDetails: action.payload,
      };

    case CONSTANTS.SET_BANK_DETAILS_ADDED:
      return {
        ...state,
        bankDetailsadded: action.payload,
      };

    case CONSTANTS.SET_ONBOARDING_DATA:
      action?.payload && action?.payload?.moveToPage?.callBack();

      return {
        ...state,
        onboardingData: {
          ...state.onboardingData,
          ...action?.payload?.data,
        },
      };

    case CONSTANTS.SET_IS_PROFILE_EXISTS:
      return {
        ...state,
        profileExists: action.payload,
      };

    case CONSTANTS?.SET_GOO_TO_USE:
      return {
        ...state,
        goodToUse: false,
      };

    case CONSTANTS?.LOGOUT_USER:
      window.localStorage.clear();
      return {
        userName: "",
        isLoading: false,
        userExists: "",
        onboardingData: {},
        user: null,
        profileExists: false,
        goodToUse: false,
        availability: [],
        isEdited: false,
        bankDetailsadded: false,
        bankDetails: null,
      };
    default:
      return state;
  }
};

export default onboardingReducer;
