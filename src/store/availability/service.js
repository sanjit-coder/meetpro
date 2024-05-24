import envconfig from "../../../env.config";
import getUserToken from "@/utils/getUserToken";
import axios from "axios";


const token = getUserToken();



export const getModifiedDatesService = async (payload) => {
    return await axios({
        method: "GET",
        baseURL: envconfig.API_BASE_URL,
        url: `/insta-learn/user/availibility/modifications`,
        headers: {
            "x-access-token": token,
        },
    });
};


export const deleteConfiguredSlotService = async (payload) => {
    return await axios({
        method: "DELETE",
        baseURL: envconfig?.API_BASE_URL,
        url: `/insta-learn/user/availibility/modifications/${payload?.id}`,
        headers: {
            "x-access-token": token,
        }
    })
}