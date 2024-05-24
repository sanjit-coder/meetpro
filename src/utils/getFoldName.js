// FUNCTION TO GET FOLDNAME SAVED IN LOCAL STORAGE
const getFoldName = () => {
  const foldName =
    typeof localStorage !== "undefined" ? localStorage.getItem("foldName") : "";

  return foldName;
};

export default getFoldName;
