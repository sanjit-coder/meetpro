import React, { useState, useEffect } from "react";
import EarningCard from "@/components/EarningCard";
import TotalEarnings from "@/components/TotalEarnings";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import landingPageLogo from "../../assets/images/meetProFinal.svg";
import bank from "../../assets/images/bank.svg";
import nobookingicon from "../../assets/images/nobookingicon.svg";
import chevronright from "../../assets/images/chevronright.svg";
import { Dropdown } from "semantic-ui-react";
import { useRouter } from "next/router";
import * as actions from ".././../store/Onboarding/actions";
import * as earningactions from ".././../store/Earnings/actions";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import { calculateDate } from "@/utils/calculateDate";

import BottomNavbar from "@/components/BottomNavbar";
import Sidenav from "@/components/SideNav";

const Earnings = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  //REDUX STATE
  const state = useSelector((state) => state);
  const earningReducer = useSelector((state) => state?.earningReducer);
  const user = useSelector((state) => state?.onboardingReducer?.user);
  const Earnings = useSelector((state) => state?.earningReducer?.Earnings);
  const stateearnings = useSelector(
    (state) => state?.earningReducer?.totalEarnings
  );
  const statebookings = useSelector(
    (state) => state?.earningReducer?.totalBookings
  );
  const isLoading = useSelector((state) => state?.earningReducer?.isLoading);

  const options = [
    {
      key: "Lifetime",
      text: "Lifetime",
      value: 0,
    },
    {
      key: "Last 7 days",
      text: "Last 7 days",
      value: 7,
    },
    {
      key: "Last 14 days ",
      text: "Last 14 days",
      value: 14,
    },
    {
      key: "Last 30 days",
      text: "Last 30 days",
      value: 30,
    },
    {
      key: "Last 90 days",
      text: "Last 90 days",
      value: 90,
    },
  ];

  //STATES
  const [duration, setDuration] = useState(0);
  const [bankDetailsFilled, setBankDetailsFilled] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(stateearnings);
  const [bookings, setBookings] = useState(statebookings);
  const [earnings, setEarnings] = useState(Earnings);
  const [showLoader, setShowLoader] = useState(false);

  const [IsDesktopView, setIsDesktopView] = useState(false);

  const handleDropdownChange = (value) => {
    setDuration(value);
    let calculatedDate = calculateDate(value);
    fetchData(calculatedDate?.startDate, calculatedDate?.endDate);
    dispatch(earningactions.setDuration(value));
  };

  const fetchData = (startDate, endDate) => {
    dispatch(
      earningactions.getEarnings({
        startDate: startDate,
        endDate: endDate,
      })
    );
  };

  useEffect(() => {
    if (user === null) {
      dispatch(actions.getUserDetails());
    } else {
      if (user?.bankDetails !== null) {
        setBankDetailsFilled(true);
      } else {
        setBankDetailsFilled(false);
      }
    }
  }, [user]);

  useEffect(() => {
    //GET USER EARNINGS WITH INITIAL DURATION SET TO OVERALL
    const calculatedDate = calculateDate(duration);
    dispatch(
      earningactions.getEarnings({
        // startDate: calculatedDate?.startDate,
        // endDate: calculatedDate?.endDate,
        startDate: null,
        endDate: null,
      })
    );
    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
  }, []);

  useEffect(() => {
    setBookings(statebookings);
    setTotalEarnings(stateearnings);
    setEarnings(Earnings);
    console.log("EARNINGS ARE **", Earnings, earnings);
  }, [Earnings, statebookings, stateearnings]);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(earningactions.resetState());
  }, []);

  return (
    <>
      {!IsDesktopView && (
        <Navbar
          logo={landingPageLogo}
          backIcon={false}
          profile={{ src: state?.onboardingReducer?.user?.imageUrl }}
        />
      )}
      <Sidenav
        tabSelected={"earnings"}
        IsDesktopView={IsDesktopView}
        heading={"Earnings"}
      >
        <div className="earningscontainer">
          {!showLoader && (
            <div className="earningscontainer__box">
              <div className="earningstext">
                <div className="earningstext__heading">Earnings</div>
                <div className="earningstext__selectbox">
                  <Dropdown
                    style={{
                      width: "120px",
                      border: "0.833333px solid #D8E0F0",
                      borderRadius: "10px",
                      color: "#0A1629",
                      fontWeight: "600",
                      fontSize: "13.3333px",
                      paddingRight: "6px",
                    }}
                    selection
                    value={duration}
                    options={options}
                    onChange={(e, { value }) => {
                      handleDropdownChange(value);
                    }}
                  />
                </div>
              </div>
              <TotalEarnings
                totalEarnings={totalEarnings}
                bookings={bookings}
              />
              {earnings && earnings.length === 0 && (
                <div className="nobookingcontainer">
                  <div className="nobookingcontainer__icon">
                    <img
                      src={nobookingicon.src}
                      alt="No Booking Icon"
                      style={{ width: "100%", height: "100%" }}
                    ></img>
                  </div>

                  <div className="nobookingcontainer__text">
                    No Bookings Yet
                  </div>

                  {!bankDetailsFilled && (
                    <div className="nobookingcontainer__secondarytext">
                      Add your bank account details where we can credit your
                      earnings
                    </div>
                  )}

                  {bankDetailsFilled && (
                    <div className="nobookingcontainer__secondarytext">
                      Oops! It feels very empty. Start promoting your custom
                      link now
                    </div>
                  )}

                  {!bankDetailsFilled && (
                    <div
                      className="nobookingcontainer__button"
                      onClick={() =>
                        router.push("/onboarding/screens/bankdetails")
                      }
                    >
                      Add Bank Details
                    </div>
                  )}
                </div>
              )}

              <div className="earningscardcontainer">
                {earnings &&
                  earnings.length > 0 &&
                  earnings.map((item) => {
                    const title =
                      !!item?.title &&
                      item?.title !== null &&
                      item?.title !== undefined
                        ? item?.title
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")
                        : "";
                    const purchases =
                      !!item?.purchases &&
                      item?.purchases !== null &&
                      item?.purchases !== undefined
                        ? item?.purchases
                        : "";
                    const totalIncome =
                      item?.totalIncome !== null &&
                      item?.totalIncome !== undefined
                        ? item?.totalIncome
                        : "";
                    return (
                      <EarningCard
                        title={title}
                        bookings={purchases}
                        price={totalIncome}
                        onClick={() =>
                          router.push(
                            {
                              pathname: `/earnings/${item?.serviceId}`,
                              query: { duration: duration, title: item?.title },
                            },
                            `/earnings/${item?.serviceId}`
                          )
                        }
                      ></EarningCard>
                    );
                  })}
              </div>

              {bankDetailsFilled && (
                <div
                  className="bankdetailsview"
                  onClick={() => router.push("/onboarding/screens/bankdetails")}
                >
                  <div className="bankdetailsview__left">
                    <div className="bankicon">
                      <img
                        src={bank.src}
                        alt="Bank icon"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                    <div className="bankdetailsview__left__text">
                      View Bank Details
                    </div>
                  </div>
                  <div className="bankdetailsview__right">
                    <div className="righticon">
                      <img
                        src={chevronright.src}
                        alt="Chevron Right"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Sidenav>
      {showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}

      {!IsDesktopView && <BottomNavbar selected={"earnings"} />}
    </>
  );
};

export default Earnings;
