import * as CONSTANTS from "./constants"



import { call, put, takeLatest, select } from "redux-saga/effects";
import toast from "react-hot-toast"

import { getModifiedDatesService, deleteConfiguredSlotService } from "./service";


function* getModifiedDates(payload) {
    try {
        const response = yield call(getModifiedDatesService, payload)

        if (response?.data?.status == "success") {

            yield put({
                type: CONSTANTS?.GET_MODIFIED_DATES_SUCCESS,
                payload: response?.data?.data
            })
        }
    } catch (error) {
        toast.error(error.message)
    }
}


function* deleteConfiguredSlot({ payload }) {
    try {
        const response = yield call(deleteConfiguredSlotService, payload)

        if (response?.data?.status == "success") {

            yield put({
                type: CONSTANTS?.GET_MODIFIED_DATES,
                payload: response?.data?.data
            })
        }
    } catch (err) {
        toast.error(error.message)
    }
}


export default function* availabilitySaga() {
    yield takeLatest(CONSTANTS?.GET_MODIFIED_DATES, getModifiedDates)
    yield takeLatest(CONSTANTS?.DELETE_CONFIGURED_DATE, deleteConfiguredSlot)

}