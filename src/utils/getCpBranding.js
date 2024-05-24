// FUNCTION TO GET CP BRANDING SAVED IN LOCAL STORAGE
const getCpBranding = () => {
  const isCpBranding =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("isCpBranding")
      : "";

  return isCpBranding;
};

export default getCpBranding;
