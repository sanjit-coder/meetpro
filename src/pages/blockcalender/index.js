import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Calendar from "react-calendar";

import SelectTimeSlot from "@/components/SelectTimeSlot";
import Button from "@/components/Button";
import BottomNavbar from "@/components/BottomNavbar";
import { timeSlots } from "@/utils/constants";
import Sidenav from "../../components/SideNav";
import { Select, Dropdown, Checkbox } from "semantic-ui-react";
import backIcon from "../../assets/images/backIcon.png";
import deleteIcon from "../../assets/images/trashIcon.png";
import plusIcon from "../../assets/images/plusIcon.png";
import Navbar from "@/components/Navbar";

import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "moment-timezone";

import * as actions from "../../store/Blockedcalender/actions";
import toast from "react-hot-toast";

const BlockedAvailability = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState(new Date());
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [IsDesktopView, setIsDesktopView] = useState(false);
  const [unavailbleForWholeDay, setUnavailbleForWholeDay] = useState(false);
  const calendarRef = useRef(null);
  const [month, setMonth] = useState("");
  const [slots, setSlots] = useState();
  const [date, setDate] = useState(new Date());
  const minDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const maxDate = new Date(date.getFullYear(), date.getMonth() + 2, 0);
  const blockedDates = useSelector((state) => state?.blockedDatesReducer);
  const [calendarFocused, setCalendarFocused] = useState(false);

  useEffect(() => {
    dispatch(actions?.setIsLoading(true));
    dispatch(actions?.getBlockedDates());

    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
  }, []);

  useEffect(() => {
    if (blockedDates?.isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [blockedDates?.isLoading]);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.focus();
    }
  }, [slots]);

  const checkDisabled = (date) => {
    if (month == "") {
      setMonth(moment().month() + 1);
    }

    const filteredData = blockedDates?.blockedDatesData.filter((item) => {
      const date = moment(item.date, "YYYY-MM-DD");
      return date.month() === month - 1; // Moment.js months are zero-indexed, so subtract 1 from input month number
    });

    const filteredDates = filteredData.map((item) =>
      parseInt(moment(item.date, "YYYY-MM-DD").format("D"))
    );
    // console.log("filterDates", filteredDates)
    return !filteredDates?.includes(date.getDate());
  };

  const onClickDate = (value, e) => {
    calendarRef.current = e.currentTarget;
    setUnavailbleForWholeDay(false);
    setValue(value);
    const dateFormat = "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ";
    const utcDate = moment.tz(value, dateFormat, "GMT+4").utc();
    // const matchingObj = blockedDates?.blockedDatesData?.find(obj => obj?.date === formattedDate);
    const matchingDate = blockedDates?.blockedDatesData?.find(
      (obj) => new Date(obj.date).toDateString() === value.toDateString()
    );

    if (matchingDate) {
      setSlots(matchingDate);
    }
  };

  const changeDropdownValue = (index, type, value) => {
    setButtonDisabled(false);
    let customoptions = { ...slots };
    if (type === "starttime") {
      customoptions.slots[index].from = value;
      setSlots(customoptions);
    } else if (type === "endtime") {
      customoptions.slots[index].to = value;
      setSlots(customoptions);
    }

    console.log("customoptions", customoptions);
  };

  const handleBack = () => {
    router.push("/availability");
  };

  const getCurrentMonth = (value) => {
    let month = moment(value?.activeStartDate);
    setMonth(month?.format("M"));
  };

  const addSlot = (index) => {
    setButtonDisabled(false);
    let newSlots = {
      ...slots,
      slots: [...slots.slots, { from: "10:00", to: "10:30" }],
    };
    setSlots(newSlots);
  };

  const deleteSlot = (index) => {
    setButtonDisabled(false);
    console.log("slotsxxx", slots, index);
    let newSlots = { ...slots };
    newSlots?.slots?.splice(index, 1);
    setSlots(newSlots);
  };

  const callBack = () => {
    router.push("/availability");
    toast.success("Availability changed successfully");
  };

  const handleSubmit = () => {
    let payload = {
      date: slots?.date,
      isActive: true,
      rules: !unavailbleForWholeDay ? [...slots?.slots] : [],
    };
    dispatch(
      actions?.modifyBlockedDates({ payload: payload, callBack: callBack })
    );
  };

  const unavailabilityChange = () => {
    setButtonDisabled(false);
    setUnavailbleForWholeDay(!unavailbleForWholeDay);
  };

  function Toggle({ isChecked, unavailabilityChange }) {
    return (
      <label className="toggle">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => unavailabilityChange()}
        />
        <span className="slider round"></span>
      </label>
    );
  }

  const handleContainerBlur = (event) => {
    // Update state when select loses focus
    // and the calendar is not focused

    // if (!calendarFocused) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      calendarRef.current.focus();
      setCalendarFocused(true);
    }
  };

  const handleSelectFocus = () => {
    setValue(value);
    calendarRef.current.focus();

    setCalendarFocused(true);
  };

  return (
    <>
      {!IsDesktopView && (
        <Navbar
          logo={backIcon}
          heading={"Configure Availability"}
          handleBack={handleBack}
        />
      )}
      <Sidenav
        tabSelected={"availability"}
        IsDesktopView={IsDesktopView}
        heading={"Configure Availability"}
        isBackNavigation={true}
      >
        <div className="blockcalenderContainer" onBlur={handleContainerBlur}>
          <div className="blockcalenderContainer__heading">
            Configure availability
          </div>

          <div className="blockcalenderContainer__subHeading">
            Block dates on which you are unavailable or Update your availability
            timings for specific dates.
          </div>
          <div
            className="blockcalenderContainer__calenderContainer"
            ref={calendarRef}
          >
            <Calendar
              onActiveStartDateChange={(value) => getCurrentMonth(value)}
              value={value}
              view="month"
              prev2Label={null}
              showNeighboringMonth={false}
              next2Label={null}
              tileDisabled={({ date }) => checkDisabled(date)}
              tileClassName="tileview"
              onClickDay={onClickDate}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>

          {slots?.slots && (
            <div className="blockcalenderContainer__selectTime">
              Select Time
            </div>
          )}

          <div className="blockcalenderContainer__timeslot-container">
            {slots?.slots &&
              slots?.slots?.map((item, index) => {
                return (
                  <div className="blockcalenderContainer__timeslot-container__timeslots">
                    <div style={{ width: "42%", marginRight: "10px" }}>
                      <Select
                        onFocus={handleSelectFocus}
                        disabled={unavailbleForWholeDay}
                        value={item.from}
                        placeholder="Start"
                        style={{ width: "100%" }}
                        options={timeSlots}
                        onChange={(e, { value }) =>
                          // console.log(first)
                          changeDropdownValue(index, "starttime", value)
                        }
                      />
                    </div>

                    <div style={{ width: "42%", marginRight: "10px" }}>
                      <Select
                        onFocus={handleSelectFocus}
                        disabled={unavailbleForWholeDay}
                        value={item.to}
                        placeholder="End"
                        style={{ width: "100%" }}
                        options={timeSlots}
                        onChange={(e, { value }) =>
                          changeDropdownValue(index, "endtime", value)
                        }
                      />
                    </div>
                    {slots?.slots?.length > 1 && !unavailbleForWholeDay ? (
                      <div
                        className="blockcalenderContainer__timeslot-container__timeslots__ctaicons"
                        id="addSlot"
                      >
                        <div className="deleteicon">
                          <img
                            src={deleteIcon.src}
                            id="deleteSlot"
                            style={{ width: "100%", height: "100%" }}
                            onClick={() => deleteSlot(index)}
                          />
                        </div>
                      </div>
                    ) : null}
                    {index >= 0 &&
                      slots?.slots?.length <= 2 &&
                      !unavailbleForWholeDay && (
                        <img
                          className="addicon"
                          src={plusIcon?.src}
                          onClick={() => addSlot(index)}
                        />
                      )}
                  </div>
                );
              })}
          </div>
          {slots && (
            <div className="blockcalenderContainer__timeslot-container__unavailableContainer">
              <div className="blockcalenderContainer__timeslot-container__unavailableContainer__text">
                Unavailable all day
              </div>
              {/* <div className="blockcalenderContainer__timeslot-container__unavailableContainer__toggle"><Checkbox value={unavailbleForWholeDay} className='custom-toggle' toggle onChange={(event, data) => unavailabilityChange(event, data)} /></div> */}
              <Toggle
                isChecked={unavailbleForWholeDay}
                unavailabilityChange={unavailabilityChange}
              />
            </div>
          )}
          <div className="blockcalenderContainer-buttonContainer">
            <Button
              className="buttoncontainer__button blockcalenderContainer-buttonContainer__blockedCalender"
              onClick={() => handleSubmit()}
              disabled={buttonDisabled}
            >
              Save Changes
            </Button>
          </div>
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

export default BlockedAvailability;
