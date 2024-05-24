import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidenav from "@/components/SideNav";
import backIcon from "../../../assets/images/backIcon.png";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import * as actions from "../../../store/User/actions";
import * as onboardingactions from "../../../store/Onboarding/actions";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const AvailabilitySettings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.onboardingReducer?.user);
  const availabilitySettings = useSelector(
    (state) => state?.userReducer?.availabilitySettings
  );
  const isLoading = useSelector((state) => state?.userReducer?.isLoading);
  const [IsDesktopView, setIsDesktopView] = useState(false);
  const [periodValue, setPeriodValue] = useState();
  const [periodType, setPeriodType] = useState("hours");
  const [maxWindow, setMaxWindow] = useState();
  const [maxWindowOption, setMaxWindowOption] = useState("months");
  const [showLoader, setShowLoader] = useState(false);
  const handleBack = () => {
    router.push("/onboarding/screens/success");
  };
  useEffect(() => {
    dispatch(actions.getAvailabilitySettings());
    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
  }, []);
  const periodTypeOptions = [
    {
      key: "hours",
      text: "Hours",
      value: "hours",
    },
    {
      key: "minutes",
      text: "Minutes",
      value: "minutes",
    },
  ];
  const maxWindowOptions = [
    {
      key: "months",
      text: "Months",
      value: "months",
    },
    {
      key: "days",
      text: "Days",
      value: "days",
    },
  ];

  const fetchUserDetails = () => {
    dispatch(onboardingactions.getUserDetails());
  };

  const callBack = () => {
    toast.success("Settings updated successfully");
    router.push("/onboarding/screens/success");
  };

  const submitChanges = () => {
    // if (periodValue < 1) {
    //   toast.error("You cannot enter a value less than 1");
    // }
    if (maxWindow < 1) {
      toast.error("You cannot enter a value less than 1");
    } else {
      const data = {
        maxWindow: maxWindow,
        periodType: periodType,
        periodValue: periodValue,
      };
      console.log("DATA IS", data);
      dispatch(
        actions.setAvailabilitySettings({ payload: data, callBack: callBack })
      );
    }
  };

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (user === null) {
      fetchUserDetails();
    }
  }, []);

  useEffect(() => {
    if (availabilitySettings === null) {
      setPeriodValue(0);
      setMaxWindow(60);
    } else {
      setPeriodValue(availabilitySettings?.periodValue);
      setMaxWindow(availabilitySettings?.maxWindow);
    }
  }, [availabilitySettings]);
  return (
    <>
      <Navbar
        logo={backIcon}
        heading={"Availability Settings"}
        handleBack={handleBack}
      />
      <div className="settingscontainer">
        <div className="settingscontainer__box">
          <div className="minmaxslotcontainer">
            <div className="minslot">
              <div className="slotheading">Minimum Booking Notice</div>
              <div className="slotsubheading">
                Minimum amount of advance notice required to make a booking
              </div>
              <div className="minslot__inputs">
                <div className="minslot__inputs__days">
                  <Input
                    label=""
                    icon={""}
                    type="number"
                    disabled={false}
                    value={periodValue}
                    placeholder={"Enter a value"}
                    onChange={(value) => {
                      console.log("VALUE is", parseInt(value));
                      setPeriodValue(parseInt(value));
                    }}
                  />
                </div>
                <div className="minslot__inputs__dropdown">
                  {/* <Dropdown
                    selection
                    style={{
                      width: "100%",
                      padding: "12px 12px 12px 16px",
                      border: "1px solid #D8E0F0",
                      height: "45px",
                    }}
                    options={periodTypeOptions}
                    value={periodType}
                    onChange={(e, { value }) => {
                      setPeriodType(value);
                    }}
                  /> */}
                  <Input
                    label=""
                    icon={""}
                    disabled={true}
                    value={"Hours"}
                    placeholder={"Enter a value"}
                  />
                </div>
              </div>
            </div>
            <div className="minslot">
              <div className="slotheading">Advance Booking Period</div>
              <div className="slotsubheading">
                Maximum time frame in advance that attendees can book
              </div>
              <div className="minslot__inputs">
                <div className="minslot__inputs__days">
                  <Input
                    label=""
                    icon={""}
                    type="number"
                    disabled={false}
                    value={maxWindow}
                    placeholder={"Enter a value"}
                    onChange={(value) => {
                      console.log("VALUE is", parseInt(value));
                      setMaxWindow(parseInt(value));
                    }}
                  />
                </div>
                <div className="minslot__inputs__dropdown">
                  <Input
                    label=""
                    icon={""}
                    disabled={true}
                    value={"Days"}
                    placeholder={"Enter a value"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="settingsbuttoncontainer">
            <button className="settingsbutton" onClick={() => submitChanges()}>
              Save Changes
            </button>
          </div>
        </div>
      </div>{" "}
      {showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}
    </>
  );
};

export default AvailabilitySettings;
