import envconfig from "../../../env.config";
import getUserToken from "@/utils/getUserToken";
import axios from "axios";

const token = getUserToken();

export const getOfferingsServices = async (payload) => {
  return await axios({
    method: "GET",
    baseURL: envconfig.API_BASE_URL,
    url: `/insta-learn/services`,
    headers: {
      "x-access-token": token,
    },
  });
};

export const editOfferingsService = async (payload) => {
  return await axios({
    method: "PUT",
    baseURL: envconfig.API_BASE_URL,
    url: `/insta-learn/services/${payload?.id}`,
    data: {
      title: payload?.title,
      description: payload?.description,
      price: payload?.cost,
      duration: payload?.duration,
      questions: payload?.questions,
    },
    headers: {
      "x-access-token": token,
    },
  });
};

export const deleteOfferingService = async (payload) => {
  return await axios({
    method: "DELETE",
    baseURL: envconfig.API_BASE_URL,
    url: `/insta-learn/services/${payload?.id}`,
    headers: {
      "x-access-token": token,
    },
  });
};

export const addOfferingService = async (payload) => {
  return await axios({
    method: "POST",
    baseURL: envconfig.API_BASE_URL,
    url: "insta-learn/service",
    data: {
      title: payload?.title,
      description: payload?.description,
      price: payload?.price,
      duration: payload?.duration,
      questions: payload?.questions,
    },
    headers: {
      "x-access-token": token,
    },
  });
};
