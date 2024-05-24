import React, { useState, useEffect } from "react";
import SelectTimeSlot from "@/components/SelectTimeSlot";
import Button from "@/components/Button";

import Navbar from "@/components/Navbar";
import logoTest from "../../assets/images/logoTest.png";
import backIcon from "../../assets/images/backIcon.png";
import profileTest from "../../assets/images/avatarTest.png";
import { timeSlots } from "@/utils/constants";
import getUserToken from "@/utils/getUserToken";
import axios from "axios";
import * as actions from "../../store/Onboarding/actions";
import { useSelector, useDispatch } from "react-redux";
import getDay from "@/utils/getDay";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import BottomNavbar from "@/components/BottomNavbar";
import Sidenav from "../../components/SideNav";

const Weeklyavailability = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const availabilityOptions = useSelector(
    (state) => state.onboardingReducer.availability
  );
  const isLoading = useSelector((state) => state.onboardingReducer.isLoading);
  const [availability, setAvailability] = useState([]);
  const [options, setOptions] = useState(availabilityOptions);

  const dropDownOptions = timeSlots;

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [IsDesktopView, setIsDesktopView] = useState(false);

  useEffect(() => {
    console.log("AVAILABILITY VALUE IS", availability);
    if (availability.some((item) => item.isActive === true)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [availability]);

  useEffect(() => {
    dispatch(actions.getAvailability());
  }, []);

  useEffect(() => {
    let storeData = availabilityOptions.map((item) => {
      const dayTitle = getDay(item?.day);
      return {
        ...item,
        dayTitle: dayTitle,
      };
    });

    setOptions(storeData);
    setAvailability(storeData);
  }, [availabilityOptions]);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  const callBack = () => {
    if (router.isReady) {
      router.push("/availability");
    }
  };

  const handleBack = () => {
    router.push("/availability");
    // router.push(router?.query?.websiteUrl);
    //this needs to change
  };

  const editChanges = () => {
    console.log("payload to send is", availability);
    dispatch(actions.editAvailability({ availability, callBack }));
  };

  useEffect(() => {
    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
  }, []);

  return (
    <>
      {!IsDesktopView && (
        <Navbar
          logo={backIcon}
          heading={"Availability"}
          handleBack={handleBack}
        />
      )}

      <Sidenav
        tabSelected={"availability"}
        IsDesktopView={IsDesktopView}
        heading={"Weekly Availability"}
        isBackNavigation={true}
      >
        <div className="weeklyavailabilitycontainer">
          {!showLoader && (
            <>
              <div className="weeklyavailabilitycontainer__box">
                <SelectTimeSlot
                  label=" Choose your available time slots"
                  options={options}
                  dropDownOptions={dropDownOptions}
                  onChange={(value) => {
                    console.log("AFTER DELETED", value);
                    setAvailability(value);
                  }}

                  // options1={options1}
                />
              </div>

              <div className="buttoncontainer buttoncontainer__availability">
                <Button
                  className="buttoncontainer__button buttoncontainer__button__availability"
                  onClick={() => editChanges()}
                  disabled={buttonDisabled}
                >
                  Save Changes
                </Button>
              </div>
            </>
          )}
        </div>
      </Sidenav>

      {!IsDesktopView && <BottomNavbar selected={"availability"} />}

      {showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}
    </>
  );
};

export default Weeklyavailability;
