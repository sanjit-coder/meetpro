import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProgressBar from "@/components/ProgressBar";
import SelectTimeSlot from "@/components/SelectTimeSlot";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/Onboarding/actions";
import { timeSlots } from "@/utils/constants";
import getFoldName from "@/utils/getFoldName";
import { trackEvent } from "@/utils/ganalytics";

const OnboardingAvailabilityScreen = () => {
  const foldName = getFoldName();
  const dispatch = useDispatch();
  const router = useRouter();
  const options1 = [
    {
      date: "2023-01-24",
      day: "Mon",
      duration: "30",
      slots: [
        {
          time: "2023-01-24T08:30",
          available: true,
        },
        {
          time: "2023-01-24T09:00",
          available: true,
        },
      ],
    },

    {
      date: "2023-01-25",
      day: "Tue",
      duration: "30",
      slots: [
        {
          time: "2023-01-24T08:30",
          available: true,
        },
        {
          time: "2023-01-24T09:00",
          available: true,
        },
      ],
    },

    {
      date: "2023-01-26",
      day: "Wed",
      duration: "30",
      slots: [
        {
          time: "2023-01-24T08:30",
          available: true,
        },
        {
          time: "2023-01-24T09:00",
          available: true,
        },
      ],
    },
    {
      date: "2023-01-26",
      day: "Wed",
      duration: "30",
      slots: [
        {
          time: "2023-01-24T08:30",
          available: true,
        },
        {
          time: "2023-01-24T09:00",
          available: true,
        },
      ],
    },
    {
      date: "2023-01-26",
      day: "Wed",
      duration: "30",
      slots: [
        {
          time: "2023-01-24T08:30",
          available: true,
        },
        {
          time: "2023-01-24T09:00",
          available: true,
        },
      ],
    },
  ];

  const options = [
    {
      day: 0,
      dayTitle: "Sunday",
      rules: [{ from: "10:00", to: "10:30" }],
      isActive: false,
    },
    {
      day: 1,
      dayTitle: "Monday",
      rules: [{ from: "10:00", to: "10:30" }],
      isActive: false,
    },
    {
      day: 2,
      dayTitle: "Tuesday",
      rules: [{ from: "10:00", to: "10:30" }],
      isActive: false,
    },
    {
      day: 3,
      dayTitle: "Wednesday",
      rules: [{ from: "10:00", to: "10:30" }],
      isActive: false,
    },
    {
      day: 4,
      dayTitle: "Thursday",
      rules: [{ from: "10:00", to: "10:30" }],
      isActive: false,
    },
    {
      day: 5,
      dayTitle: "Friday",
      rules: [{ from: "10:00", to: "10:30" }],
      isActive: false,
    },
    {
      day: 6,
      dayTitle: "Saturday",
      rules: [{ from: "10:00", to: "10:30" }],
      isActive: false,
    },
  ];

  const onboardingData = useSelector(
    (state) => state?.onboardingReducer?.onboardingData
  );
  const [availability, setAvailability] = useState(options);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const dropDownOptions = timeSlots;

  const selectOption = (item, value) => {
    console.log("CHECKED OPTION IS", item, value);
  };

  // page refresh
  useEffect(() => {
    if (!Object.entries(onboardingData).length) {
      router.push("/onboarding/screens/user");
    }
  }, [onboardingData]);

  useEffect(() => {
    console.log("AVAILABILITY VALUE IS", availability);
    if (availability.some((item) => item.isActive === true)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [availability]);

  const callBack = () => {
    router.push("/onboarding/screens/success");
    if (typeof window !== undefined) {
      window.localStorage.setItem("isfirstTimeUser", true);
      window.localStorage.removeItem("userName");
    }
  };

  const handleSetAvailability = () => {
    // let payload = availability.filter((ava) => ava?.isActive === true);
    // dispatch(actions.setAvailability({ availability, callBack }));

    dispatch(actions.onBoardUser({ availability, callBack }));
  };

  useEffect(() => {
    trackEvent(`Open_Onboarding_S3_${foldName}`);
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
              <ProgressBar size="tiny" percent={100} />
            </div>
          </div>

          <h1>Almost there! Now let's set your availability</h1>
          <p>Set available time slots, which your audience can book.</p>

          <SelectTimeSlot
            label=" Choose your available time slots"
            options={availability}
            dropDownOptions={dropDownOptions}
            onChange={(value) => {
              console.log("AFTER DELETED", value);
              setAvailability(value);
            }}
            // options1={options1}
            // onChange={(item, value) => selectOption(item, value)}
          />
        </div>
        <div className="buttoncontainer">
          <Button
            className="buttoncontainer__button"
            onClick={() => handleSetAvailability()}
            disabled={buttonDisabled}
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
};

export default OnboardingAvailabilityScreen;
