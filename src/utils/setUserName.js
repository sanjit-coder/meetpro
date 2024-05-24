const setUserName = (value) => {
  if (typeof window !== undefined) {
    window.localStorage.setItem("userName", value);
  }
};

export default setUserName;
