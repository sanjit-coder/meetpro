import * as CONSTANTS from "./constants";

import { call, put, race, takeLatest, take, delay } from "redux-saga/effects";
import { submitAnswersService } from "./services"
import toast from "react-hot-toast";



function* submitAnswers({ payload }) {
    try {

        const response = yield call(submitAnswersService, payload);
        if (response?.status == 200) {
            payload?.payload?.callBack()
            yield put({
                type: CONSTANTS?.SUBMIT_ANSWERS_SUCCESS,
                payload: response
            })
        }

    } catch (error) {
        console.log(error);
        // toast.error(error?.response?.data?.message);
    }
}



export default function* questionsSaga() {
    yield takeLatest(CONSTANTS.SUBMIT_ANSWERS, submitAnswers);
}