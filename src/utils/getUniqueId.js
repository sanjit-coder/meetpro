// FUNCTION TO GET UNIQUE ID SAVED IN LOCAL STORAGE
const getUniqueId = () => {
  const uniqueId =
    typeof localStorage !== "undefined" ? localStorage.getItem("uniqueId") : "";

  return uniqueId;
};

export default getUniqueId;
