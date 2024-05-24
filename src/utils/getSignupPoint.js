// FUNCTION TO GET SIGNUP POINT SAVED IN LOCAL STORAGE
const getSignupPoint = () => {
  const signupPoint =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("signupPoint")
      : "";

  return signupPoint;
};

export default getSignupPoint;
