import getUserToken from "@/utils/getUserToken";
import { GAUTH } from "@/utils/constants";
import config from "../../../env.config";
import axios from "axios";
import envconfig from "../../../env.config";
const token = getUserToken();

export const getTokenService = async (
  code,
  utmobject,
  signupPoint,
  diyUserId
) => {
  const params = {
    code,
    redirect_uri: config.REDIRECT_URI,
    signupPoint,
  };

  if (utmobject !== null) {
    if (utmobject.source !== undefined) params.source = utmobject.source;
    if (utmobject.medium !== undefined) params.medium = utmobject.medium;
    if (utmobject.campaign !== undefined) params.campaign = utmobject.campaign;
  }

  if (diyUserId !== undefined && diyUserId !== null) {
    params.diyUserId = diyUserId;
  }

  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const url = `insta-learn/auth/token?${queryString}`;

  return await axios({
    method: "GET",
    baseURL: envconfig.API_BASE_URL,
    url,
  });
};

export const checkUserNameAvailabilityService = async (data) => {
  return await axios({
    method: "GET",
    baseURL: envconfig.API_BASE_URL,
    url: `insta-learn/user/checkUsername?username=${data?.userName}`,
    headers: {
      "x-access-token": token,
    },
  });
};

export const getServicesService = async (data) => {
  return await axios({
    method: "GET",
    baseURL: envconfig.API_BASE_URL,
    url: `insta-learn/user/getServices`,
  });
};

export const getAvailabilityService = async (data) => {
  return await axios({
    method: "GET",
    baseURL: envconfig.API_BASE_URL,
    url: `/insta-learn/user/availibility/fetch`,
    headers: {
      "x-access-token": token,
    },
  });
};

export const setAvailabilityService = async (data) => {
  return await axios({
    method: "POST",
    baseURL: envconfig.API_BASE_URL,
    url: "/insta-learn/user/availibility/set",
    data: {
      availability: [...data],
    },
    headers: {
      "x-access-token": token,
    },
  });
};

export const getBankDetailsService = async (data) => {
  return await axios({
    method: "GET",
    baseURL: envconfig.API_BASE_URL,
    url: "/insta-learn/user/bankdetails",
    headers: {
      "x-access-token": token,
    },
  });
};

export const setBankDetailsService = async (data) => {
  return await axios({
    method: "POST",
    baseURL: envconfig.API_BASE_URL,
    url: "/insta-learn/user/addBankDetails",
    data: data,
    headers: {
      "x-access-token": token,
    },
  });
};

export const editAvailabilityService = async (data) => {
  return await axios({
    method: "PUT",
    baseURL: envconfig.API_BASE_URL,
    url: "/insta-learn/user/availibility/edit",
    data: {
      availability: data,
    },
    headers: {
      "x-access-token": token,
    },
  });
};

export const getUserProfileService = async (data) => {
  return await axios({
    method: "GET",
    baseURL: envconfig.API_BASE_URL,
    url: "/insta-learn/user",
    headers: {
      "x-access-token": token,
    },
  });
};

export const updateUserDetailsService = async (data) => {
  return await axios({
    method: "PUT",
    baseURL: envconfig.API_BASE_URL,
    url: "insta-learn/user/update",
    data: {
      ...data,
    },
    headers: {
      "x-access-token": token,
    },
  });
};
