// FUNCTION TO CHECK NEW USER OR OLD USER
const getUserExists = () => {
  const isExists =
    typeof localStorage !== "undefined" ? localStorage.getItem("isExists") : "";

  return isExists;
};

export default getUserExists;
