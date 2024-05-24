const setEndCustomerName = (value) => {
  if (typeof window !== undefined) {
    window.localStorage.setItem("endCustomerName", value);
  }
};

export default setEndCustomerName;
