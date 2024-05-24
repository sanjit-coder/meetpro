const setSignupPoint = (value) => {
  if (typeof window !== undefined) {
    window.localStorage.setItem("signupPoint", value);
  }
};

export default setSignupPoint;
