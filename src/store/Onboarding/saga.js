import * as CONSTANTS from "./constants";
import axios from "axios";
import toast from "react-hot-toast";

import {
  call,
  put,
  race,
  takeLatest,
  take,
  delay,
  select,
  all,
} from "redux-saga/effects";

import {
  getTokenService,
  checkUserNameAvailabilityService,
  getAvailabilityService,
  getServicesService,
  setAvailabilityService,
  getBankDetailsService,
  setBankDetailsService,
  editAvailabilityService,
  getUserProfileService,
  setServicesService,
  updateUserDetailsService,
} from "./services";

function* getToken(data) {
  console.log("DATA IS", data);
  try {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: true,
    });
    const apiCall = yield call(
      getTokenService,
      data?.payload?.code,
      data?.payload?.utmobject,
      data?.payload?.signupPoint,
      data?.payload?.diyUserId
    );
    if (apiCall?.data?.status == "success") {
      yield put({
        type: CONSTANTS.GET_TOKEN_SUCCESS,
        payload: apiCall?.data?.data,
      });
      axios.interceptors.request.use(
        async (config) => {
          config.headers = {
            "x-access-token": apiCall?.data?.data?.token,
          };
          return config;
        },
        (error) => {
          Promise.reject(error);
        }
      );
    }
  } catch (error) {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
    window.localStorage.setItem("token", null);
    window.localStorage.setItem("isExists", null);
    window.localStorage.setItem("onboardingStatus", null);
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}

function* checkUserNameAvailability(data) {
  try {
    const apiCall = yield call(checkUserNameAvailabilityService, data?.payload);
    if (apiCall?.data?.status == "success") {
      yield put({
        type: CONSTANTS.CHECK_USERNAME_AVAILABILITY_SUCCESS,
        payload: apiCall?.data?.data,
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}

function* getAvailability() {
  try {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: true,
    });
    const response = yield call(getAvailabilityService);
    if (response?.data?.status == "success") {
      yield put({
        type: CONSTANTS.GET_AVAILABILITY_SUCCESS,
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}

function* getServices(data) {
  try {
    const response = yield call(getServicesService, data?.payload);
    if (response?.data?.status == "success") {
      yield put({
        type: CONSTANTS.GET_SERVICES_SUCCESS,
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}

function* getUserDetails(payload) {
  yield put({
    type: CONSTANTS.SET_IS_LOADING,
    payload: true,
  });

  try {
    const response = yield call(getUserProfileService, payload);
    yield put({
      type: CONSTANTS.GET_USER_DETAILS_SUCCESS,
      payload: response?.data?.data,
    });
  } catch (error) {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
    toast.error(error?.response?.data?.message);
  }
}

// function* setAvailability(payload) {
//   try {
//     // const response = yield call(setAvailabilityService, payload?.payload);
//     payload && payload?.callBack();
//     if (response?.data?.status == "success") {
//       payload && payload?.callBack();
//     }
//   } catch (error) {
//     payload && payload?.callBack();
//     console.log(error);
//   }
// }

function* editAvailability({ payload }) {
  console.log("PAYLOAD RECEIveD IS ***", payload);
  yield put({
    type: CONSTANTS.SET_IS_LOADING,
    payload: true,
  });

  try {
    const response = yield call(editAvailabilityService, payload?.availability);

    if (response?.data?.status == "success") {
      payload?.callBack();
      yield put({
        type: CONSTANTS.SET_IS_LOADING,
        payload: false,
      });
      yield put({
        type: CONSTANTS.EDIT_AVAILABILITY_SUCCESS,
        payload: payload,
      });
    }
  } catch (error) {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
    // payload && payload?.callBack();
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
}

function* getBankDetails({ payload }) {
  yield put({
    type: CONSTANTS.SET_IS_LOADING,
    payload: true,
  });
  try {
    const response = yield call(getBankDetailsService);
    if (response?.data?.status == "success") {
      yield put({
        type: CONSTANTS.GET_BANK_DETAILS_SUCCESS,
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
}

function* setBankDetails({ payload }) {
  console.log("PAYLOAD RECEIVED IS **", payload);
  yield put({
    type: CONSTANTS.SET_IS_LOADING,
    payload: true,
  });
  try {
    const response = yield call(setBankDetailsService, payload?.payload);

    if (response?.data?.status == "success") {
      toast.success("Bank Details Added Successfully");
      setTimeout(() => {
        payload && payload?.callBack();
      }, 1000);

      yield put({
        type: CONSTANTS.SET_BANK_DETAILS_SUCCESS,
        payload: payload,
      });
    }
  } catch (error) {
    yield put({
      type: CONSTANTS.SET_IS_LOADING,
      payload: false,
    });

    if (Object.keys(error?.response?.data?.data).length !== 0) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
}

function* updateUserDetails({ payload }) {
  try {
    const response = yield call(updateUserDetailsService, payload?.payload);

    if (response?.data?.message == "success") {
      yield put({
        type: CONSTANTS.GET_USER_DETAILS,
        payload,
      });

      payload && payload?.callBack();
      toast.success("Changes saved successfully");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

function* onBoardUser({ payload }) {
  const state = yield select();

  let checkPointOnePayload = {
    ...state?.onboardingReducer?.onboardingData,
  };

  const [response1, response2] = yield all([
    call(setAvailabilityService, payload?.availability),
    call(updateUserDetailsService, checkPointOnePayload),
  ]);
  // debugger
  if (
    response1?.data?.message == "success" &&
    response2?.data?.message == "success"
  ) {
    payload?.callBack();
  }
}

export default function* onboardingSaga() {
  yield takeLatest(CONSTANTS.GET_TOKEN, getToken);
  yield takeLatest(
    CONSTANTS.CHECK_USERNAME_AVAILABILITY,
    checkUserNameAvailability
  );
  yield takeLatest(CONSTANTS.GET_AVAILABILITY, getAvailability);
  yield takeLatest(CONSTANTS.GET_SERVICES, getServices);
  // yield takeLatest(CONSTANTS.SET_AVAILABILITY, setAvailability);
  yield takeLatest(CONSTANTS.EDIT_AVAILABILITY, editAvailability);
  yield takeLatest(CONSTANTS.GET_USER_DETAILS, getUserDetails);
  yield takeLatest(CONSTANTS.GET_BANK_DETAILS, getBankDetails);
  yield takeLatest(CONSTANTS.SET_BANK_DETAILS, setBankDetails);
  // yield takeLatest(CONSTANTS.SET_SERVICES, setServices)
  yield takeLatest(CONSTANTS.UPDATE_USER_DETAILS, updateUserDetails);
  yield takeLatest(CONSTANTS.ON_BOARD_USER, onBoardUser);
}
