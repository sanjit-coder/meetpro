import Badge from "@/components/Badge";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import checkcircle from "../../../assets/images/checkcircle.svg";
import errorIcon from "../../../assets/images/errorIcon.svg";
import ProgressBar from "@/components/ProgressBar";
import { useRouter } from "next/router";
import getUserToken from "@/utils/getUserToken";
import getUserName from "@/utils/getUserName";
import getEndCustomerName from "@/utils/getEndCustomerName";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedEffect } from "@/customHooks/useDebounceEffect";
import * as actions from "../../../store/Onboarding/actions";
import getFoldName from "@/utils/getFoldName";
import { trackEvent } from "@/utils/ganalytics";

const OnboardingUserScreen = () => {
  const foldName = getFoldName();
  const dispatch = useDispatch();
  const router = useRouter();
  const [expertise, setExpertise] = useState([]);
  const [expertiseOptions, setExpertiseOptions] = useState([]);
  const [userName, setUserName] = useState(
    getUserName() !== null
      ? getUserName()
      : getEndCustomerName() !== null
      ? getEndCustomerName()
      : ""
  );
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showGreenTick, setshowGreenTick] = useState(false);

  const [error, setError] = useState(false);

  const [isTyping, setisTyping] = useState(false);

  const state = useSelector((state) => state?.onboardingReducer);

  console.log({ expertise });

  useEffect(() => {
    // setting expertise array as empty on reload, back , etc
    setExpertise([]);
  }, [router]);

  useDebouncedEffect(
    () => {
      if (userName !== "" && userName !== null) {
        dispatch(
          actions.checkUserNameAvailability({
            userName: userName,
          })
        );
      } else {
        setshowGreenTick(false);
        setError(false);
      }
    },
    [userName],
    500
  );

  useEffect(() => {
    if (state?.onboardingData?.username && state?.onboardingData?.expertise) {
      setUserName(state?.onboardingData?.username);
      // setExpertise(state?.onboardingData?.expertise);
    } else {
      dispatch(actions.getServices());
    }
  }, []);

  useEffect(() => {
    if (userName && state?.goodToUse) {
      setshowGreenTick(true);
      setError(false);
    } else if (userName && !state?.goodToUse) {
      setshowGreenTick(false);
      setError(true);
    }
  }, [userName, state?.goodToUse]);

  useEffect(() => {
    if (userName !== "" && expertise.length !== 0 && state?.goodToUse) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [userName, expertise, state?.goodToUse]);

  useEffect(() => {
    console.log("LOCAL STORAGE TOKEN", getUserToken());
  }, []);

  const handleChange = (value, index) => {
    let badgeoptions = [...expertiseOptions];
    let options = [...expertise];
    if (!value?.isSelected) {
      badgeoptions[index].isSelected = true;
      setExpertiseOptions(badgeoptions);
      setExpertise([...options, value?.name]);
    } else {
      badgeoptions[index].isSelected = false;
      setExpertiseOptions(badgeoptions);
      const expindex = options.indexOf(value?.name);
      options.splice(expindex, 1);
      setExpertise(options);
    }
  };

  const handleSubmit = () => {
    // console.log("usefbdsjk", userName.replace(/[^\w\s_]/gi, '').replace(/\s+/g, ''))

    const callBack = () => router.push("/onboarding/screens/services");
    dispatch(
      actions.setOnboardingData({
        data: { username: `${userName.replaceAll(/\s/g, "")}`, expertise },
        moveToPage: { callBack },
      })
    );
  };

  useEffect(() => {
    console.log(
      "LOCAL STORAGE VALUES ARE",
      getUserName(),
      getEndCustomerName()
    );
  }, []);

  useEffect(() => {
    console.log("EXPERTISE OPTIONS ARE", expertiseOptions);
    console.log("EXPERTISE SELECTED IS", expertise);
  }, [expertise, expertiseOptions]);

  useEffect(() => {
    if (
      state?.expertise !== null &&
      state?.expertise !== undefined &&
      state?.expertise.length > 0
    ) {
      let options = state?.expertise.map((item) => {
        return {
          ...item,
          isSelected: false,
        };
      });
      setExpertiseOptions(options);
    }
  }, [state?.expertise]);

  useEffect(() => {
    trackEvent(`Open_Onboarding_S1_${foldName}`);
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
              <ProgressBar size="tiny" percent={0} />
            </div>
            <div>
              <ProgressBar size="tiny" percent={0} />
            </div>
          </div>

          <h1>Let’s get started</h1>
          <p>Fill details for a personalised experience</p>

          <div className="label">Your Webpage Link</div>

          <div
            className={
              !error
                ? "splitinputcontainer splitinputcontainer__onboarding"
                : "splitinputcontainer splitinputcontainer__onboarding errorstate"
            }
            // style={{ marginBottom: "24px" }}
          >
            <div className="lefticonbox lefticonbox__onboarding">
              meetpro.club/
            </div>

            <div className="inputbox inputbox__onboarding">
              <input
                className="nameinput nameinput__onboarding"
                placeholder="Enter Username"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              ></input>
            </div>
            {showGreenTick && (
              <div className="righticonbox">
                <img src={checkcircle.src} className="righticon"></img>
              </div>
            )}
            {error && (
              <div className="righticonbox">
                <img src={errorIcon.src} className="righticonerror"></img>
              </div>
            )}
          </div>

          {error && (
            <div className="errorstate__text">Username already exists</div>
          )}

          <div style={{ marginTop: "24px" }}>
            <Badge
              options={expertiseOptions}
              label="Select your Expertise"
              value={expertise}
              onClick={(value, index) => {
                console.log("EXPERTISE VALUE is", value);
                handleChange(value, index);
                // setExpertise([...expertise, value]);
              }}
              multiSelect={true}
            />
          </div>
        </div>
      </div>

      <div className="buttoncontainer">
        <Button
          className="buttoncontainer__button"
          onClick={handleSubmit}
          disabled={buttonDisabled}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default OnboardingUserScreen;
