import * as CONSTANTS from "./constants"



const initialState = {
    isLoading: false,
    blockedDatesData: []
}


const blockedDatesReducer = (state = initialState, action) => {
    switch (action?.type) {

        case CONSTANTS.SET_ISLOADING:

            return {
                ...state,
                isLoading: action?.payload
            }

        case CONSTANTS?.GET_BLOCKED_DATES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                blockedDatesData: [...action.payload]
            }

        case CONSTANTS?.MODIFY_BLOCKED_DATES_SUCCESS:
            return {
                ...state,
                isLoading: false,

            }


        default:
            return state
    }

}

export default blockedDatesReducer;