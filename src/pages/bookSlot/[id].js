import React, { useState, useEffect } from "react";
import backIcon from "../../assets/images/backIcon.png";
import clockIcon from "../../assets/images/clock.svg";
import greenButtonIcon from "../../assets/images/greenButtonIcon.svg";
import Navbar from "@/components/Navbar";
import ColoredButton from "@/components/ColoredButton";
import Badge from "@/components/Badge";
import Button from "@/components/Button";

import Input from "@/components/Input";
import Image from "next/image";
import razorpayIcon from "../../assets/images/razorpayicon.png";
import ReadMoreText from "@/components/ReadMoreText";
import ModalContainer from "@/components/ModalContainer";
import * as actions from "../../store/User/actions";
import * as analyticsactions from "../../store/Analytics/actions";
import { createOrder } from "../../store/Order/actions";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import getUniqueId from "@/utils/getUniqueId";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import moment from "moment";
import { trackEvent } from "../../utils/ganalytics";

const BookSlot = () => {
  const router = useRouter();
  //VALUES FROM REDUX STORE
  const userSlots = useSelector((state) => state.userReducer.slots);
  const isLoading = useSelector((state) => state.userReducer.isLoading);
  const serviceDetails = useSelector(
    (state) => state?.userReducer?.serviceDetails
  );

  const dispatch = useDispatch();

  //STATE VALUES
  const [showLoader, setShowLoader] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [slots, setSlots] = useState([]);
  const [dateSlots, setDateSlots] = useState([]);
  const [timeslots, setTimeSlots] = useState([]);
  const [day, setDay] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [finalPayload, setFinalPayload] = useState(null);
  const [sellerId, setSellerId] = useState("");
  const [duration, setDuration] = useState("");

  const [confirmDateTimeDisabled, setconfirmDateTimeDisabled] = useState(true);

  const dates = [
    {
      id: 1,
      name: "1 Feb’23",
    },
    {
      id: 2,
      name: "2 Feb’23",
    },
    {
      id: 3,
      name: "3 Feb’23",
    },
    {
      id: 4,
      name: "4 Feb’23",
    },
    {
      id: 5,
      name: "5 Feb’23",
    },
    {
      id: 6,
      name: "6 Feb’23",
    },
  ];

  const handleClick = () => {
    let pageData = JSON.parse(sessionStorage.getItem("pageData"));
    trackEvent(
      `Click_SlotBookingConfirm_${pageData?.creatorId}_${finalPayload?.serviceId}`
    );
    postAnalyticsData(finalPayload?.serviceId, "CLICK_SLOTBOOKING_DATETIME");
    dispatch(actions.setSelectedSlot(selectedSlot));
    dispatch(actions.setSelectedText(selectedText));
    setFinalPayload({ ...finalPayload, bookingDate: selectedSlot });
    setShowBottomSheet(true);
    trackEvent(
      `Open_PaymentInfo_${pageData?.creatorId}_${finalPayload?.serviceId}`
    );
  };

  useEffect(() => {
    console.log("DATE", date);
    console.log("TIME", time);
    if (date !== "" && time !== "") {
      setButtonDisabled(false);
      setconfirmDateTimeDisabled(false);
    } else {
      setButtonDisabled(true);
      setconfirmDateTimeDisabled(true);
    }
  }, [date, time]);

  useEffect(() => {
    if (name !== "" && mobileNo !== "" && email != "") {
      setConfirmButtonDisabled(false);
    } else {
      setConfirmButtonDisabled(true);
    }
  }, [name, email, mobileNo]);

  useEffect(() => {
    setSlots(userSlots);
    const dSlots =
      !!userSlots &&
      userSlots.length > 0 &&
      userSlots.map((item, index) => ({
        id: index,
        name: moment(item?.date).format("D MMM'YY"),
      }));
    const tSlots =
      !!userSlots &&
      userSlots.length > 0 &&
      userSlots.map((item, index) => ({
        id: index,
        name: moment(item?.date).format("D MMM'YY"),
      }));
    setDateSlots(dSlots);
  }, [userSlots]);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  const handleBack = () => {
    router.back();
    // router.push(router?.query?.websiteUrl);
    //this needs to change
  };

  const handleConfirmAndPay = () => {
    setConfirmButtonDisabled(true);

    let emailRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    let emailValidate = emailRegex.test(email);

    // console.log("routerxxss", window.location)
    const callBack = () =>
      router.push(
        {
          pathname: `/bookSlot/orderstatus`,
          query: { name: router?.query?.creatorName },
        },
        `/bookSlot/orderstatus`
      );

    if (emailValidate && mobileNo?.length >= 10) {
      setShowLoader(true);

      //DISPATCH AN ACTION FOR ANALYTICS DATA
      postAnalyticsData(finalPayload?.serviceId, "CLICK_PAYMENT_CONFIRM");

      let orderPayload = {
        ...finalPayload,
        serviceId: parseInt(finalPayload?.serviceId),
        sellerId: parseInt(finalPayload?.sellerId),
        name,
        mobile: mobileNo,
        email,
        query,
      };
      sessionStorage.setItem("selectedText", selectedText);
      if (!serviceDetails?.isFree) {
        console.log("locationsdjkfnds", window.location);
        orderPayload.returnUrl =
          window?.location?.origin + "/bookSlot/orderstatus/";
      }
      let orderRetryPayload = JSON.stringify(orderPayload);
      sessionStorage.setItem("orderRetryPayload", orderRetryPayload);
      trackEvent(
        `Click_PaymentInfo_${router?.query?.creatorId}_${parseInt(
          finalPayload?.serviceId
        )}`
      );
      dispatch(createOrder({ orderPayload, callBack }));
    } else if (mobileNo?.length <= 10 && emailValidate) {
      setConfirmButtonDisabled(false);
      toast.error("Please enter a valid mobile number");
    } else if (!emailValidate && mobileNo?.length >= 10) {
      setConfirmButtonDisabled(false);
      toast.error("Please enter a valid email");
    }
  };

  const postAnalyticsData = (id, eventType) => {
    if (typeof window !== undefined) {
      let uid = getUniqueId();
      const data = {
        serviceId: parseInt(id),
        uuid: uid,
        eventType: eventType,
      };

      dispatch(analyticsactions.postAnalytics(data));
    }
  };

  useEffect(() => {
    console.log("ROUTER INFO", router);

    let pageData = JSON.parse(sessionStorage.getItem("pageData"));

    setSellerId(router.query?.creatorId);

    setDuration(router.query?.duration);

    if (router?.isReady) {
      const { id } = router.query;
      console.log("pidxx", id);

      trackEvent(
        `Open_SlotBooking_${pageData?.creatorId}_${
          router.query?.serviceId || id
        }`
      );

      id &&
        dispatch(
          actions.getSlots({
            userId: router.query?.creatorId || pageData?.creatorId,
            serviceId: router.query?.serviceId || id,
            // duration: router.query?.duration || pageData?.duration,
            lastDate: "",
          })
        );

      //SET THE INITIAL PAYLOAD
      setFinalPayload({
        sellerId: sellerId || parseInt(pageData?.creatorId),
        serviceId: router.query?.id,
      });

      //DISPATCH AN ACTION FOR ANALYTICS DATA
      postAnalyticsData(router.query?.id, "OPEN_SLOTBOOKING_PAGE");
    }
  }, [router]);

  return (
    <>
      <Navbar
        logo={backIcon}
        heading={serviceDetails?.title}
        secondaryText={`Video Meeting ${serviceDetails?.duration} mins`}
        handleBack={handleBack}
        publishPage={true}
        profilePicture={false}
      ></Navbar>
      <div className="addslotcontainer">
        <div className="addslot">
          {serviceDetails?.description && (
            <ReadMoreText
              heading="Description"
              desc={
                !serviceDetails?.description
                  ? ""
                  : serviceDetails?.description.trim()
              }
            />
          )}

          <div className="addslot__buttoncontainer">
            <div className="addslot__buttoncontainer__button">
              {" "}
              <ColoredButton
                color="green"
                text={
                  serviceDetails?.price !== 0 ? serviceDetails?.price : "FREE"
                }
                icon={greenButtonIcon}
              />
            </div>
            <div className="addslot__buttoncontainer__button">
              {" "}
              <ColoredButton
                color="blue"
                text={`${serviceDetails ? serviceDetails?.duration : ""} mins`}
                icon={clockIcon}
              />
            </div>
          </div>

          {dateSlots !== null && dateSlots.length > 0 && (
            <Badge
              label={"Select Date"}
              value={date}
              onClick={(value) => {
                setDate(value);
                setTime("");
                let filteredDate = userSlots.filter(
                  (item) => moment(item?.date).format("D MMM'YY") === value
                );

                console.log("FILTERED DATE IS", filteredDate);
                setDay(moment(filteredDate[0]?.date).format("dddd"));
                setSelectedText(
                  `${value},${moment(filteredDate[0]?.date).format("dddd")}`
                );

                const tSlots = filteredDate[0]?.slots.map((item, index) => ({
                  id: item?.slot,
                  name: moment(item?.slot).format("LT"),
                  slot: item?.slot,
                  available: item?.available,
                }));
                console.log("TIME SLOTS ***", tSlots);
                setTimeSlots(tSlots);
              }}
              options={dateSlots}
            />
          )}

          {date !== "" && (
            <Badge
              label={"Select Time"}
              value={time}
              onClick={(value) => {
                setTime(value);
                let filteredTime = timeslots.filter(
                  (item) => item?.name === value
                );
                console.log("TIME VALUE");
                let tinterval = `${
                  !!filteredTime && filteredTime?.length > 0
                    ? moment(filteredTime[0].id).format("LT")
                    : ""
                }-${
                  !!filteredTime && filteredTime?.length > 0
                    ? moment(filteredTime[0].id)
                        .add(serviceDetails?.duration, "minutes")
                        .format("LT")
                    : ""
                }`;

                setSelectedText(`${date},${day}; ${tinterval}`);
                setSelectedSlot(filteredTime[0].slot);
              }}
              options={timeslots}
            />
          )}
        </div>

        <div className="buttoncontainer">
          {date !== "" && (
            <div className="buttoncontainer__text">{selectedText}</div>
          )}
          <Button
            disabled={confirmDateTimeDisabled}
            onClick={() => handleClick()}
          >
            Confirm Date & Time
          </Button>
        </div>
      </div>

      {showBottomSheet && (
        <ModalContainer
          open={showBottomSheet}
          onCloseBottomSheet={() => setShowBottomSheet(false)}
          header={"Please fill the details"}
        >
          <div className="bottomsheetinputs">
            <Input
              label={"Your Name"}
              maxLength={26}
              value={name}
              icon={""}
              disabled={false}
              placeholder={"Enter your name"}
              onChange={(value) => setName(value)}
            />

            <Input
              type="number"
              label={"Mobile Number"}
              value={mobileNo}
              icon={""}
              disabled={false}
              placeholder={"Enter your phone number"}
              onChange={(value) => {
                if (value.length > 10) {
                  return false;
                } else {
                  setMobileNo(value);
                }
              }}
            />

            <Input
              label={"Email"}
              value={email}
              icon={""}
              disabled={false}
              placeholder={"Enter your email"}
              onChange={(value) => setEmail(value)}
            />

            {/* <Input
              label={"Specific Query for the session"}
              icon={""}
              value={query}
              disabled={false}
              placeholder={"Please help me with..."}
              onChange={(value) => setQuery(value)}
              textArea={true}
              inputType={"textarea"}
            /> */}

            <div className="razorpaytext">
              <div>
                <Image
                  src={razorpayIcon}
                  alt="RazorPay icon"
                  className="razorpaytext__icon"
                ></Image>
              </div>
              Secure payment with Razorpay
            </div>

            <div className="confirmbuttoncontainer">
              <Button
                className="confirmbuttoncontainer__button"
                disabled={confirmButtonDisabled}
                onClick={handleConfirmAndPay}
              >
                {serviceDetails?.price == 0 ? "Confirm" : "Confirm Date & Time"}
              </Button>
            </div>
          </div>
        </ModalContainer>
      )}

      {showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}

      {/* {
        modalStatus?.modal == "successModal" ? <SuccessModal /> : modalStatus?.modal == "failedModal" ? <FailureModal /> : null
      } */}
    </>
  );
};

export default BookSlot;
