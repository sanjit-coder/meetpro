import * as CONSTANTS from "./constants";



export const setIsLoading = (payload) => ({
    type: CONSTANTS.SET_ISLOADING,
    payload
})

export const getModifiedDates = (payload) => ({
    type: CONSTANTS?.GET_MODIFIED_DATES,
    payload
})


export const deleteConfiguredSlot = (payload) => ({
    type: CONSTANTS?.DELETE_CONFIGURED_DATE,
    payload
})