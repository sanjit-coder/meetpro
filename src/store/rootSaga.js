import { all } from "redux-saga/effects";
import onboardingSaga from "./Onboarding/saga";
import offeringSaga from "./Offerings/saga";
import userSaga from "./User/saga";
import orderSaga from "./Order/saga";
import callingSaga from "./Calling/saga";
import earningSaga from "./Earnings/saga";
import testimonialSaga from "./Testimonial/saga";
import questionsSaga from "./Questions/saga";
import blockedDatesSaga from "./Blockedcalender/saga";
import availabilitySaga from "./availability/saga";
import analyticsSaga from "./Analytics/saga";
//   yield all([actionWatcher()]);

function* rootSaga() {
  yield all([
    onboardingSaga(),
    offeringSaga(),
    userSaga(),
    orderSaga(),
    callingSaga(),
    earningSaga(),
    testimonialSaga(),
    questionsSaga(),
    blockedDatesSaga(),
    availabilitySaga(),
    analyticsSaga(),
  ]);
}

export default rootSaga;
