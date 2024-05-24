import getUserToken from "@/utils/getUserToken";
import axios from "axios";
import envconfig from "../../../env.config";

const token = getUserToken();

export const getSlotsServices = async (payload) => {
  return await axios({
    method: "GET",
    baseURL: envconfig.API_BASE_URL,
    params: {
      userId: payload?.userId,
      duration: payload?.duration,
      serviceId: payload?.serviceId,
    },
    url: `/insta-learn/user/slots`,
    headers: {
      "x-access-token": token,
    },
  });
};
export const getAvailabilitySettingsService = async (data) => {
  return await axios({
    method: "GET",
    baseURL: envconfig.API_BASE_URL,
    url: "/insta-learn/user/availibility/configure",
    headers: {
      "x-access-token": token,
    },
  });
};
export const setAvailabilitySettingsService = async (data) => {
  return await axios({
    method: "PUT",
    baseURL: envconfig.API_BASE_URL,
    url: "/insta-learn/user/availibility/configure",
    data: data,
    headers: {
      "x-access-token": token,
    },
  });
};
