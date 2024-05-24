import envconfig from "../../../env.config";
import getUserToken from "@/utils/getUserToken";
import axios from "axios";


const token = getUserToken();



export const getBlockedDatesService = async (payload) => {
    return await axios({
        method: "GET",
        baseURL: envconfig.API_BASE_URL,
        url: `/insta-learn/user/calendarDates`,
        headers: {
            "x-access-token": token,
        },
    });
};

export const modifyBlockedDatesService = async (payload) => {

    return await axios({
        method: "POST",
        baseURL: envconfig?.API_BASE_URL,
        url: "/insta-learn/user/availibility/modify",
        data: {
            ...payload?.payload
        },
        headers: {
            "x-access-token": token
        }
    })
}