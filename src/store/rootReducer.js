const { combineReducers } = require("redux");
import onboardingReducer from "./Onboarding/reducer";
import offeringReducer from "./Offerings/reducer";
import userReducer from "./User/reducer";
import orderReducer from "./Order/reducer";
import callingReducer from "./Calling/reducer";
import earningReducer from "./Earnings/reducer";
import testimonialReducer from "./Testimonial/reducer";
import questionsReducer from "./Questions/reducer";
import blockedDatesReducer from "./Blockedcalender/reducer";
import availabilityReducer from "./availability/reducer";
import analyticsReducer from "./Analytics/reducer";

const appReducer = combineReducers({
  onboardingReducer: onboardingReducer,
  offeringReducer: offeringReducer,
  userReducer: userReducer,
  orderReducer: orderReducer,
  callingReducer: callingReducer,
  earningReducer: earningReducer,
  testimonialReducer: testimonialReducer,
  questionsReducer: questionsReducer,
  blockedDatesReducer: blockedDatesReducer,
  availabilityReducer: availabilityReducer,
  analyticsReducer: analyticsReducer,
});

const rootReducer = (state, action) => {
  console.log("questionsReducer", state, action);
  if (action.type === "LOGOUT_USER ") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

// const rootReducer = combineReducers({
//   onboardingReducer: onboardingReducer,
//   offeringReducer: offeringReducer,
//   userReducer: userReducer,
//   orderReducer: orderReducer,
//   callingReducer: callingReducer,
//   earningReducer: earningReducer,
//   testimonialReducer: testimonialReducer,
//   questionsReducer: questionsReducer
// });

export default rootReducer;
