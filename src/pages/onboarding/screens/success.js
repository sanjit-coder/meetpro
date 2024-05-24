import Card from "@/components/Card";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import successicon from "../../../assets/images/successIcon.png";
import rightarrow from "../../../assets/images/rightarrow.svg";
import toast from "react-hot-toast";
import logoTest from "../../../assets/images/logoTest.png";
import landingPageLogo from "../../../assets/images/meetProFinal.svg";
import profileTest from "../../../assets/images/avatarTest.png";
import instLearnHeading from "../../../assets/images/instaLearnHead.png";
import copyBtn from "../../../assets/images/copyButton.png";
import linkedInBox from "../../../assets/images/linkedInBox.svg";
import arrowup from "../../../assets/images/arrowup.svg";
import OfferingsCard from "@/components/OfferingsCard";
import BottomNavbar from "@/components/BottomNavbar";
import Navbar from "@/components/Navbar";
import copyIcon from "../../../assets/images/copy.png";
import Image from "next/image";
import Illustration from "@/components/Illustration";
import { useDispatch, useSelector } from "react-redux";
import getUserExists from "@/utils/getUserExists";
import getOnboardingStatus from "@/utils/getOnboardingStatus";
import * as actions from "../../../store/Onboarding/actions";
import * as offeringactions from "../../../store/Offerings/actions";
import * as analyticsactions from "../../../store/Analytics/actions";
import CallingCard from "@/components/CallingCard";
import ModalContainer from "@/components/ModalContainer";
import { getAllCalls } from "@/store/Calling/actions";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";

import phone from "../../../assets/images/call.png";
import money from "../../../assets/images/moneys.png";
import sms from "../../../assets/images/sms.png";
import user from "../../../assets/images/user.png";
import copy from "../../../assets/images/copyButton.png";
import Sidenav from "@/components/SideNav";
import getFoldName from "@/utils/getFoldName";
import { trackEvent } from "@/utils/ganalytics";
import envconfig from "../../../../env.config";
import Input from "@/components/Input";
import getUserToken from "@/utils/getUserToken";

const OnboardingSuccessScreen = () => {
  console.log("API BASE URL IS", envconfig.API_BASE_URL);
  const foldName = getFoldName();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showInitialSuccessPage, setShowInitialSuccessPage] = useState(true);
  const [firstTimeUser, setFirstTimeUser] = useState(true);

  const [selectedData, setselectedData] = useState();

  const [openModal, setopenModal] = useState(false);

  const state = useSelector((state) => state);
  const status = state?.onboardingReducer?.user?.onboardingStatus;
  const bankDetailsadded = state?.onboardingReducer?.bankDetailsadded;
  const profileExists = useSelector(
    (state) => state?.onboardingReducer?.profileExists
  );
  const username = useSelector(
    (state) => state?.onboardingReducer?.user?.username
  );
  const [userStatus, setUserStatus] = useState(status);
  const [IsDesktopView, setIsDesktopView] = useState(false);
  const isLoading = useSelector((state) => state.onboardingReducer.isLoading);
  const [showLoader, setShowLoader] = useState(false);

  const cardsList = [
    {
      count: 1,
      heading: "Edit Offering Details",
      desc: "Add payment plans for your slot bookings",
      logo: rightarrow.src,
    },
    {
      count: 2,
      heading: "Add Bank Details",
      desc: "Add your bank account details where we can credit your earnings",
      logo: rightarrow.src,
    },
  ];

  const InitialSuccessPage = () => {
    return (
      <>
        <Illustration />
        <div>
          <div className="initialsuccessbox">
            <div className="initialsuccessbox__logo">
              <img
                src={successicon.src}
                alt="Success Icon"
                style={{ width: "100%", height: "100%" }}
              ></img>
            </div>
            <div className="initialsuccessbox__text">
              <div className="initialsuccessbox__text__heading">
                Congratulations!
              </div>
              <p>Your MeetPro page is now live.</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const fetchUserDetails = () => {
    const token = getUserToken();
    if (token !== null || token != undefined) {
      dispatch(actions.getUserDetails());
    }
  };

  useEffect(() => {
    const token = getUserToken();
    if (!username) {
      fetchUserDetails();
    }

    if (token !== null || token != undefined) {
      dispatch(getAllCalls({ type: "today", limit: 1, offset: 0 }));
    }

    // const isOnboarded = getOnboardingStatus();
    if (typeof window !== undefined) {
      let user = window.localStorage.getItem("isfirstTimeUser");

      if (user === "true") {
        setTimeout(() => {
          setShowInitialSuccessPage(false);
          window.localStorage.setItem("isfirstTimeUser", false);
        }, 2000);
      } else {
        setShowInitialSuccessPage(false);
        setFirstTimeUser(false);
      }
    }
  }, []);

  useEffect(() => {
    if (bankDetailsadded) {
      fetchUserDetails();
      setTimeout(() => {
        dispatch(actions.setBankDetailsAdded(false));
      }, 1000);
    }
  }, [bankDetailsadded]);

  const handleEditProfile = () => {
    router.push("/onboarding/screens/editprofile");
  };

  const copyLink = async (copyURL) => {
    if (typeof window !== undefined) {
      try {
        await navigator?.clipboard?.writeText(copyURL);
      } catch (error) {
        console.log("error in copying: ", error);
      }
    }
  };

  useEffect(() => {
    setUserStatus(status);
    console.log("USER STATUS IS", status);
  }, [status]);

  const onSelectCard = (data) => {
    setselectedData(data);

    setopenModal(true);
  };

  const CopyContainer = () => {
    return (
      <div className="topsection__copycontainer">
        <div className="topsection__copycontainer__link">
          <a href={state?.onboardingReducer?.user?.username} target="_blank">
            {state?.onboardingReducer?.user?.username}
          </a>
        </div>
        <div
          className="topsection__copycontainer__copybox"
          onClick={() => {
            copyLink(state?.onboardingReducer?.user?.username);
            toast.success("Copied to ClipBoard");
          }}
        >
          <img src={copyBtn.src} className="copyBtn" />
        </div>
      </div>
    );
  };

  const copyLinkHandler = (meetlink) => {
    navigator.clipboard.writeText(meetlink);
    toast.success("Copied Successfully");
  };

  useEffect(() => {
    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
    console.log("FOLD NAME IS", foldName);
    trackEvent(`Open_Homescreen_${foldName}`);
  }, []);

  useEffect(() => {
    //RESET ANALYTICS STATE
    dispatch(analyticsactions.resetState());
  }, []);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  return (
    <>
      {showInitialSuccessPage && firstTimeUser && <InitialSuccessPage />}
      {!showInitialSuccessPage && (
        <>
          {!IsDesktopView && (
            <Navbar
              logo={landingPageLogo}
              backIcon={false}
              profile={{ src: state?.onboardingReducer?.user?.imageUrl }}
            />
          )}

          <Sidenav tabSelected={"home"} IsDesktopView={IsDesktopView}>
            <div className="successcontainer">
              <div className="successcontainer__box">
                {firstTimeUser ? (
                  <div className="topsection">
                    <div className="topsection__logo">
                      <img
                        src={successicon.src}
                        alt="Success Icon"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>

                    <div className="topsection__heading">Congratulations!</div>
                    <p>Your MeetPro page is now live.</p>
                    <CopyContainer />
                  </div>
                ) : (
                  <div className="olduser">
                    <div className="olduser__heading">
                      Welcome back, {state?.onboardingReducer?.user?.name}
                    </div>
                    <div className="olduser__profilebox">
                      <div className="olduser__profilebox__heading">
                        Share your profile forward
                      </div>

                      <CopyContainer />
                    </div>
                  </div>
                )}
                {!state?.onboardingReducer?.user?.bankDetails && (
                  <div className="bankdetailssection">
                    <div className="bankdetailssection__heading">
                      1 Step away from Earning!
                    </div>

                    <div
                      onClick={() =>
                        router.push("/onboarding/screens/bankdetails")
                      }
                    >
                      <Card
                        heading={"Add Bank Details"}
                        desc={
                          "Add your bank account details where we can credit your earnings"
                        }
                        count={0}
                        logo={rightarrow.src}
                      ></Card>
                    </div>
                  </div>
                )}
                <div className="successcontainer__box__detailssection">
                  <h1>
                    {firstTimeUser
                      ? "Review these details and start earning"
                      : "Manage your Page"}
                  </h1>
                  <div className="successcontainer__box__detailssection__cardsection">
                    <div
                      onClick={() => {
                        router.push("/analytics");
                        dispatch(offeringactions.selectOffering("overall"));
                      }}
                    >
                      <Card
                        heading={"Analytics"}
                        desc={
                          "Get a quick overview of your page analytics here"
                        }
                        count={0}
                        logo={rightarrow.src}
                      ></Card>
                    </div>

                    {!state?.onboardingReducer?.user?.hasPaidOfferings && (
                      <div onClick={() => router.push("/offerings")}>
                        <Card
                          heading={"Offerings"}
                          desc={
                            "Manage Your Offerings with Ease - Click Here to Add or Edit"
                          }
                          count={0}
                          logo={rightarrow.src}
                        ></Card>
                      </div>
                    )}

                    {!firstTimeUser && (
                      <>
                        {(state?.onboardingReducer?.user?.imageUrl ===
                          state?.onboardingReducer?.user?.googleUrl ||
                          state?.onboardingReducer?.user?.about === null ||
                          state?.onboardingReducer?.user?.about === "") && (
                          <div onClick={() => handleEditProfile()}>
                            <Card
                              heading={"Your Profile"}
                              desc={
                                "Enhance your profile's credibility by filling all the details."
                              }
                              count={0}
                              logo={rightarrow.src}
                            ></Card>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {firstTimeUser &&
                  state?.onboardingReducer?.user?.imageUrl === null &&
                  state?.onboardingReducer?.user?.about === null && (
                    <div
                      className="successcontainer__box__detailssection"
                      style={{ borderBottom: "none", marginBottom: "32px" }}
                      onClick={() => handleEditProfile()}
                    >
                      <h1>Build your Credibility</h1>
                      <div className="successcontainer__box__detailssection__cardsection">
                        <div>
                          <Card
                            heading={"Complete Your Profile"}
                            desc={
                              "Enhance your profile's credibility by filling all the details."
                            }
                            count={0}
                            logo={rightarrow.src}
                          ></Card>
                        </div>
                      </div>
                    </div>
                  )}
                {state.callingReducer.allCalls[0] && (
                  <div className="successcontainer__box__callsContainer">
                    <div className="successcontainer__box__callsContainer__heading">
                      <h1>Your upcoming call for today</h1>
                      <h5 onClick={() => router.push("/calls")}>View All</h5>
                    </div>

                    <CallingCard
                      data={state.callingReducer.allCalls[0]}
                      highlight={true}
                      onSelectCard={onSelectCard}
                      showCta={true}
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
              </div>
            </div>

            {openModal && (
              <ModalContainer
                open={openModal}
                header={"Session Details"}
                onCloseBottomSheet={() => {
                  setopenModal(false);
                }}
              >
                <div className="callsModalContainer">
                  <div className="callsModalContainer__basicDetails">
                    <div className="callsModalContainer__basicDetails__personalinfo">
                      <div className="topcontainer">
                        <div className="topcontainer__name">
                          {" "}
                          {selectedData?.payment?.customer?.name}
                        </div>
                        <div className="topcontainer__phone">
                          {" "}
                          {selectedData?.payment?.customer?.mobile}
                        </div>
                      </div>
                      <div className="bottomcontainer">
                        <div className="bottomcontainer__details">
                          <img src={sms?.src}></img>
                          <div className="bottomcontainer__details__text">
                            {selectedData?.payment?.customer?.email}
                          </div>
                        </div>

                        <div className="bottomcontainer__details">
                          <img src={money?.src}></img>₹{" "}
                          <div className="bottomcontainer__details__text">
                            {selectedData?.payment?.amount}
                          </div>
                        </div>
                        {selectedData?.payment?.customer?.linkedinUrl !==
                          null && (
                          <div className="bottomcontainer__details">
                            <img
                              src={linkedInBox?.src}
                              className="bottomcontainer__details__linkedinImage"
                            ></img>
                            <a
                              className="bottomcontainer__details__linktag"
                              href={
                                selectedData?.payment?.customer?.linkedinUrl
                              }
                              target="_blank"
                            >
                              Linkedin Profile URL
                              <span className="bottomcontainer__details__linkarrow">
                                <img
                                  src={arrowup?.src}
                                  style={{ width: "100%", height: "100%" }}
                                ></img>
                              </span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedData?.payment?.customer?.query !== "" && (
                      <div
                        className="callsModalContainer__otherdetails__header"
                        style={{ marginTop: "24px" }}
                      >
                        Doubts regarding the session
                      </div>
                    )}
                    {selectedData?.payment?.customer?.query !== "" && (
                      <div className="callsModalContainer__otherdetails__doubtsection">
                        {selectedData?.payment?.customer?.query}
                      </div>
                    )}

                    <div
                      className="callsModalContainer__otherdetails__header"
                      style={{ marginTop: "16px" }}
                    >
                      Meet Link
                    </div>
                    <div className="callsModalContainer__otherdetails__meetbox">
                      <span>{selectedData?.meetingLink}</span>
                      <img
                        onClick={() =>
                          copyLinkHandler(selectedData?.meetingLink)
                        }
                        src={copy.src}
                        className="callsModalContainer__otherdetails__meetbox__img"
                      />
                    </div>
                  </div>

                  {selectedData &&
                    selectedData?.answers !== null &&
                    JSON.parse(selectedData?.answers).length !== 0 && (
                      <div className="callsModalContainer__otherdetails">
                        {selectedData &&
                          JSON.parse(selectedData?.answers)?.map((item) => {
                            return (
                              <Input
                                label={item?.question}
                                icon={""}
                                disabled={true}
                                value={item?.answer}
                                placeholder={
                                  "User has not responded to this question yet"
                                }
                                onChange={(value) => console.log(":", value)}
                                textArea={true}
                                inputType={"textarea"}
                                isQuestion={true}
                              />
                            );
                          })}
                      </div>
                    )}
                </div>
              </ModalContainer>
            )}
          </Sidenav>

          {!IsDesktopView && <BottomNavbar selected={"home"} />}
        </>
      )}
      {!firstTimeUser && showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}
    </>
  );
};

export default OnboardingSuccessScreen;
