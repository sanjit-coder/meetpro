import envconfig from "../../../env.config";
import getUserToken from "@/utils/getUserToken";
import axios from "axios";

const token = getUserToken();

export const getEarningsService = async (payload) => {
  return await axios({
    method: "GET",
    baseURL: envconfig.API_BASE_URL,
    url:
      payload?.startDate !== null && payload?.endDate !== null
        ? `/insta-learn/userEarnings?startDate=${payload?.startDate}&endDate=${payload?.endDate}`
        : `/insta-learn/userEarnings`,

    headers: {
      "x-access-token": token,
    },
  });
};

export const getServiceEarningsService = async (payload) => {
  return await axios({
    method: "GET",
    baseURL: envconfig.API_BASE_URL,
    url: payload?.startDate !== null && payload?.endDate !== null
      ? `/insta-learn/serviceEarnings?startDate=${payload?.startDate}&endDate=${payload?.endDate}&serviceId=${payload?.serviceId}&limit=${payload?.limit}&offset=${payload?.offset}`
      : `/insta-learn/serviceEarnings?serviceId=${payload?.serviceId}&limit=${payload?.limit}&offset=${payload?.offset}`
    ,
    headers: {
      "x-access-token": token,
    },
  });
};
