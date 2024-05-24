import * as CONSTANTS from "./constants";



export const setIsLoading = (payload) => ({
    type: CONSTANTS.SET_ISLOADING,
    payload
})

export const getBlockedDates = (payload) => ({
    type: CONSTANTS?.GET_BLOCKED_DATES,
    payload
})

export const modifyBlockedDates = (payload) => ({
    type: CONSTANTS?.MODIFY_BLOCKED_DATES,
    payload
})