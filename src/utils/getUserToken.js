// FUNCTION TO GET USER TOKEN
const getUserToken = () => {
  const userToken =
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : "";

  return userToken;
};

export default getUserToken;
