// FUNCTION TO GET USER NAME SAVED IN LOCAL STORAGE
const getUserName = () => {
  const userName =
    typeof localStorage !== "undefined" ? localStorage.getItem("userName") : "";

  return userName;
};

export default getUserName;
