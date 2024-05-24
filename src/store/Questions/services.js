import envconfig from "../../../env.config";
import getUserToken from "@/utils/getUserToken";
import axios from "axios";

// const token = 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2LCJlbWFpbCI6ImtzaGl0aWouc2luZ2hAY2xhc3NwbHVzLmNvIiwiaWF0IjoxNjc2OTk3OTA5LCJleHAiOjE2Nzg3MjU5MDl9.2WdbtQUa0W_yll5za7heecrWL5C6yqetQjT9BOaRaPoZpRcRQ1ZiDlnqSMTy55AD'

const token = getUserToken();

export const submitAnswersService = async (payload) => {

    return await axios({
        method: "POST",
        baseURL: envconfig.API_BASE_URL,
        url: `/insta-learn/order/bookingAnswers`,
        data: {
            ...payload?.payload
        },
        headers: {
            "x-access-token": token,
        },
    });
};