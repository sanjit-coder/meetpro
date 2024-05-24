import envconfig from "../../../env.config";
import getUserToken from "@/utils/getUserToken";
import axios from "axios";

const token = getUserToken();

export const getTestimonialService = async (payload) => {
  return await axios({
    method: "GET",
    baseURL: envconfig.API_BASE_URL,
    url: `/insta-learn/testimonial?id=${payload}`,
  });
};

export const createTestimonialService = async (payload) => {
  return await axios({
    method: "POST",
    baseURL: envconfig.API_BASE_URL,
    data: payload,
    url: `/insta-learn/testimonial/create`,
  });
};

export const publishTestimonialService = async (payload) => {
  return await axios({
    method: "POST",
    baseURL: envconfig.API_BASE_URL,
    data: payload,
    url: `/insta-learn/testimonial/publish`,
    headers: {
      "x-access-token": token,
    },
  });
};

export const unpublishTestimonialService = async (payload) => {
  return await axios({
    method: "POST",
    baseURL: envconfig.API_BASE_URL,
    data: payload,
    url: `/insta-learn/testimonial/publish`,
    headers: {
      "x-access-token": token,
    },
  });
};
