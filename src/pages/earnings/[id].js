import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import backIcon from "../../assets/images/backIcon.png";
import { useRouter } from "next/router";
import TotalEarnings from "@/components/TotalEarnings";
import { Dropdown } from "semantic-ui-react";
import Transaction from "@/components/Transaction";
import { useDispatch, useSelector } from "react-redux";
import * as earningactions from ".././../store/Earnings/actions";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { calculateDate } from "@/utils/calculateDate";
import Sidenav from "../../components/SideNav";

const ViewEarning = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleBack = () => {
    // dispatch(earningactions.resetState());
    router.back();
  };
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

  //REDUX STATE
  const earningReducer = useSelector((state) => state?.earningReducer);
  const serviceEarnings = useSelector(
    (state) => state?.earningReducer?.serviceEarnings
  );
  const serviceUserDetails = useSelector(
    (state) => state?.earningReducer?.serviceUserDetails
  );
  const isLoading = useSelector((state) => state?.earningReducer?.isLoading);

  //STATE
  const [duration, setDuration] = useState(earningReducer?.duration);
  const [transactionData, setTransactionData] = useState(serviceUserDetails);
  const [serviceEarningsData, setServiceEarningsData] =
    useState(serviceEarnings);
  const [showLoader, setShowLoader] = useState(false);
  const [heading, setHeading] = useState("");
  const [IsDesktopView, setIsDesktopView] = useState(false);

  const handleDropdownChange = (value) => {
    dispatch(earningactions.resetState());
    dispatch(earningactions.setDuration(value));
    fetchDataOnDropdownChange(value);
  };

  const fetchDataOnDropdownChange = (value) => {
    setDuration(value);
    let calculatedDate = calculateDate(value);
    dispatch(earningactions.setIsLoading(true));
    dispatch(
      earningactions.getServiceEarnings({
        startDate: calculatedDate?.startDate,
        endDate: calculatedDate?.endDate,
        serviceId: router?.query?.id,
        limit: 10,
        offset: 0,
      })
    );
  };

  const fetchData = () => {
    let calculatedDate = calculateDate(earningReducer?.duration);

    dispatch(
      earningactions.getServiceEarnings({
        startDate: calculatedDate?.startDate,
        endDate: calculatedDate?.endDate,
        serviceId: router?.query?.id,
        limit: earningReducer?.limit,
        offset: earningReducer?.offset,
      })
    );
  };

  useEffect(() => {
    if (router.isReady) {
      let calculatedDate = calculateDate(earningReducer?.duration);
      dispatch(earningactions.setIsLoading(true));
      dispatch(
        earningactions.getServiceEarnings({
          // startDate: calculatedDate?.startDate,
          // endDate: calculatedDate?.endDate,
          startDate:
            earningReducer?.duration == 0 ? null : calculatedDate?.startDate,
          endDate:
            earningReducer?.duration == 0 ? null : calculatedDate?.endDate,
          serviceId: router?.query?.id,
          limit: 10,
          offset: 0,
        })
      );
    }
  }, [router]);

  useEffect(() => {
    if (serviceEarnings) {
      setServiceEarningsData(serviceEarnings);
    }
    if (serviceUserDetails) {
      setTransactionData(serviceUserDetails);
    }
  }, [serviceEarnings, serviceUserDetails]);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

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
          heading={
            !!serviceEarnings &&
            serviceEarnings !== null &&
            serviceEarnings !== undefined
              ? serviceEarnings?.title
              : ""
          }
          handleBack={handleBack}
        />
      )}
      <Sidenav
        tabSelected={"earnings"}
        IsDesktopView={IsDesktopView}
        heading={
          !!serviceEarnings &&
          serviceEarnings !== null &&
          serviceEarnings !== undefined
            ? serviceEarnings?.title
            : ""
        }
        isBackNavigation={true}
      >
        <div className="earningscontainer">
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
              totalEarnings={serviceEarningsData?.totalIncome}
              bookings={serviceEarningsData?.purchases}
            />
            <div
              id="earningsscroll"
              className="infinitescrollcontainer-earnings"
            >
              <InfiniteScroll
                dataLength={earningReducer?.dataLength || 0} //This is important field to render the next data
                next={fetchData}
                scrollThreshold={0.8}
                hasMore={earningReducer?.hasMore}
                loader={<Loader />}
                scrollableTarget={IsDesktopView ? "earningsscroll" : ""}
                endMessage={
                  transactionData?.length !== 0 ? (
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  ) : (
                    <></>
                  )
                }
              >
                {!showLoader && (
                  <Transaction transactionData={transactionData} />
                )}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </Sidenav>

      {showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}
    </>
  );
};

export default ViewEarning;
