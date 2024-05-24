// FUNCTION TO GET END CUSTOMER NAME SAVED IN LOCAL STORAGE
const getEndCustomerName = () => {
  const name =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("endCustomerName")
      : "";

  return name;
};

export default getEndCustomerName;
