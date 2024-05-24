import * as CONSTANTS from "./constants"


import { call, put, race, takeLatest, take, delay, all, select } from "redux-saga/effects";
import toast from "react-hot-toast";

import { getAllCallsService, getServicesCount } from "./services"





function* getAllCalls({ payload }) {
    const state = yield select();
    console.log("stateeedd", state?.callingReducer?.count)
    try {

        const services = yield call(getAllCallsService, payload);



        if (services?.data?.status == "success")
            yield put({
                type: CONSTANTS.GET_ALL_CALLS_SUCCESS,
                payload: { services: services?.data?.data, totalService: payload?.totalService, offset: payload?.offset, limit: payload?.limit }
            });


    } catch (error) {
        console.log(error);
        // toast.error(error?.response?.data?.message);
    }
}


function* getServiceCount({ payload }) {

    try {

        const counts = yield call(getServicesCount, payload)
        yield put({
            type: CONSTANTS?.GET_SERVICE_COUNT_SUCCESS,
            payload: { count: counts?.data?.data }

        })

    } catch (err) {
        console.log(err)
    }

}


export default function* callingSaga() {
    yield takeLatest(CONSTANTS.GET_ALL_CALLS, getAllCalls);
    yield takeLatest(CONSTANTS.GET_SERVICE_COUNT, getServiceCount)
}