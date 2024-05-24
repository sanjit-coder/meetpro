import * as CONSTANTS from "./constants";

export const setIsLoading = (payload) => ({
  type: CONSTANTS.SET_IS_LOADING,
  payload,
});

export const getTestimonial = (payload) => ({
  type: CONSTANTS.GET_TESTIMONIAL,
  payload,
});

export const createTestimonial = (payload) => ({
  type: CONSTANTS.CREATE_TESTIMONIAL,
  payload,
});

export const publishTestimonial = (payload) => ({
  type: CONSTANTS.PUBLISH_TESTIMONIAL,
  payload,
});

export const unpublishTestimonial = (payload) => ({
  type: CONSTANTS.UNPUBLISH_TESTIMONIAL,
  payload,
});
