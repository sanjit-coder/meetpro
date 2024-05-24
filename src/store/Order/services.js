import envconfig from "../../../env.config";
import getUserToken from "@/utils/getUserToken";
import axios from "axios";

const token = getUserToken();

export const createOrderService = async (payload) => {
  return await axios({
    method: "POST",
    baseURL: envconfig.API_BASE_URL,
    url: `/insta-learn/order/create`,
    headers: {
      "x-access-token": token,
    },
    data: {
      ...payload,
    },
  });
};

export const getOrderStatusService = async (payload) => {
  return await axios({
    method: "POST",
    url: envconfig.API_BASE_URL + "/insta-learn/order/status",
    headers: {
      "x-access-token": token,
    },

    data: {
      orderId: payload,
    },
  });
};

export const getBookingQuestionsService = async (payload) => {
  return await axios({
    method: "GET",
    url:
      envconfig.API_BASE_URL +
      `/insta-learn/user/getBookingQuestions?sellerId=${payload?.sellerId}&serviceId=${payload?.serviceId}`,
    headers: {
      "x-access-token": token,
    },
  });
};
