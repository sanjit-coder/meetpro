import * as CONSTANTS from "./constants"


export const setIsLoading = (payload) => ({
    type: CONSTANTS.SET_ISLOADING,
    payload
})


export const getAllCalls = (payload) => ({
    type: CONSTANTS.GET_ALL_CALLS,
    payload
})

export const getServiceCount = (payload) => ({
    type: CONSTANTS.GET_SERVICE_COUNT,
    payload
})