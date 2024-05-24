import getUserToken from "@/utils/getUserToken";
import config from "../../../env.config";
import axios from "axios";
import envconfig from "../../../env.config";
const token = getUserToken();

export const postAnalyticsService = async (data) => {
  return await axios({
    method: "POST",
    baseURL: envconfig.API_BASE_URL,
    url: "/insta-learn/analytics",
    data: data,
  });
};

export const getAnalyticsHeaderService = async (data) => {
  return await axios({
    method: "GET",
    baseURL: envconfig.API_BASE_URL,
    url:
      data?.serviceId !== "overall"
        ? `/insta-learn/analytics/header?day=${data?.day}&serviceId=${data?.serviceId}`
        : `/insta-learn/analytics/header?day=${data?.day}`,
    data: data,
    headers: {
      "x-access-token": token,
    },
  });
};

export const getGraphDataService = async (payload) => {
  return await axios({
    method: "GET",
    baseURL: envconfig.API_BASE_URL,
    url:
      payload?.serviceId !== "overall"
        ? `/insta-learn/analytics?day=${payload?.day}&eventType=${payload?.eventType}&serviceId=${payload?.serviceId}`
        : `/insta-learn/analytics?day=${payload?.day}&eventType=${payload?.eventType}`,
    headers: {
      "x-access-token": token,
    },
  });
};
