import React, { useState, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";
import MultiSelect from "@/components/MultiSelect";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../store/Onboarding/actions";
import getFoldName from "@/utils/getFoldName";
import { trackEvent } from "@/utils/ganalytics";

const OnboardingServiceScreen = () => {
  const foldName = getFoldName();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const router = useRouter();
  const options = state?.onboardingReducer?.services?.map((serv) => [
    { title: serv.title, description: serv?.description },
  ]);

  const onboardingData = state?.onboardingReducer?.onboardingData;

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (services.length === 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [services]);

  useEffect(() => {
    if (!Object.entries(onboardingData).length) {
      router.push("/onboarding/screens/user");
    }
  }, [onboardingData]);

  const onNextClick = () => {
    // const callBack = () => router.push("/onboarding/screens/availability");

    const callBack = () => router.push("/onboarding/screens/availability");
    dispatch(
      actions.setOnboardingData({
        data: { defaultServices: services },
        moveToPage: { callBack },
      })
    );

    // dispatch(actions.setService({ services, callBack }));
  };

  useEffect(() => {
    trackEvent(`Open_Onboarding_S2_${foldName}`);
  }, []);

  return (
    <>
      <div className="onboardingcontainer">
        <div className="onboardingcontainer__box onboardingcontainer__box__register">
          <div className="onboardingcontainer__box__progresscontainer">
            <div>
              <ProgressBar size="tiny" percent={100} />
            </div>
            <div>
              <ProgressBar size="tiny" percent={100} />
            </div>
            <div>
              <ProgressBar size="tiny" percent={0} />
            </div>
          </div>

          <h1>What 1:1 service do you want to offer</h1>
          <p>
            Select offerings your audience would want. You can edit them later.
          </p>

          <MultiSelect
            label="Suggested Offerings"
            options={options}
            onChange={(list) => {
              console.log("list **", list);
              setServices(list);
            }}
          />
        </div>
      </div>

      <div className="buttoncontainer">
        <Button onClick={() => onNextClick()} disabled={buttonDisabled}>
          Next
        </Button>
      </div>
    </>
  );
};

export default OnboardingServiceScreen;
