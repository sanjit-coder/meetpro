const getBaseUrl = () => {
  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://instalearn.classplus.co"
      : "https://instalearn-preprod.classplus.co";

  return BASE_URL;
};

export default getBaseUrl;
