//FUNCTION TO SET DIY USER ID VALUE IN LOCAL STORAGE
const setDiyUserId = (value) => {
  if (typeof window !== undefined) {
    window.localStorage.setItem("diyUserId", value);
  }
};

export default setDiyUserId;
