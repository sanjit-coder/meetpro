// FUNCTION TO CHECK WHETHER USER IS ONBOARDED OR NOT
const getOnboardingStatus = () => {
  const isOnboarded =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("onboardingStatus")
      : "";

  return isOnboarded;
};

export default getOnboardingStatus;
