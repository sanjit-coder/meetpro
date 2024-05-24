import * as CONSTANTS from "./constants"

const initialState = {
    isLoading: false,
    allCalls: [],
    count: {},
    limit: 10,
    offset: 0,
    hasMore: true,
}



const callingReducer = (state = initialState, action) => {
    switch (action?.type) {

        case CONSTANTS.SET_ISLOADING:

            return {
                ...state,
                isLoading: action?.payload
            }


        case CONSTANTS.GET_ALL_CALLS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ...(action.payload.offset === 0 ? {
                    offset: 10,
                    hasMore: action?.payload?.services?.length < action?.payload?.totalService,
                    allCalls: [...action?.payload?.services],
                } : {
                    offset: state?.offset + state?.limit,
                    hasMore: state?.allCalls?.length + action?.payload?.services?.length < action?.payload?.totalService,

                    dataLength: state?.allCalls?.length + action?.payload?.services?.length,

                    allCalls: [...state?.allCalls, ...action?.payload?.services]
                })


                // allCalls: [...action?.payload?.services],

            }

        case CONSTANTS?.GET_SERVICE_COUNT_SUCCESS:

            return {
                ...state,
                isLoading: false,
                count: { ...action?.payload?.count }
            }

        default:
            return state
    }
}

export default callingReducer;