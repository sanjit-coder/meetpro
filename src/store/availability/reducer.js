import * as CONSTANTS from "./constants"



const initialState = {
    isLoading: false,
    modifiedDates: []
}


const availabilityReducer = (state = initialState, action) => {
    switch (action?.type) {

        case CONSTANTS.SET_ISLOADING:

            return {
                ...state,
                isLoading: action?.payload
            }

        case CONSTANTS?.GET_MODIFIED_DATES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                modifiedDates: [...action.payload]
            }

        case CONSTANTS?.DELETE_CONFIGURED_DATE_SUCCESS:

            return {
                ...state,
                isLoading: false

            }


        default:
            return state
    }

}

export default availabilityReducer;