// FUNCTION TO GET DIY USER ID IF USER LOGIN TO MEETPRO THROUGH DIY
const getDiyUserId = () => {
  const diyUserId =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("diyUserId")
      : "";

  return diyUserId;
};

export default getDiyUserId;
