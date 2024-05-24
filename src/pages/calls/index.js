import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import CallingCard from "@/components/CallingCard";

import Navbar from "@/components/Navbar";

import landingPageLogo from "../../assets/images/meetProFinal.svg";
import phone from "../../assets/images/call.png";
import money from "../../assets/images/moneys.png";
import gmeet from "../../assets/images/gmeet.svg";
import copyIcon from "../../assets/images/copyIcon.svg";
import sms from "../../assets/images/sms.svg";
import user from "../../assets/images/user.png";
import copy from "../../assets/images/copyButton.png";
import trash from "../../assets/images/trash.svg";
import linkedInBox from "../../assets/images/linkedInBox.svg";
import arrowup from "../../assets/images/arrowup.svg";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";

import * as actions from "../../store/Calling/actions";
import * as testimonialactions from "../../store/Testimonial/actions";
import BottomSheet from "@/components/BottomSheet";
import ModalContainer from "@/components/ModalContainer";

import InfiniteScroll from "react-infinite-scroll-component";
import BottomNavbar from "@/components/BottomNavbar";

import toast from "react-hot-toast";
import Sidenav from "../../components/SideNav";

import { useRouter } from "next/router";

import config from "../../../env.config";
import getUserToken from "@/utils/getUserToken";
import axios from "axios";
import Testimonialcard from "@/components/Testimonialcard";
import Input from "@/components/Input";

const token = getUserToken();

const CallsScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userDetails = useSelector((state) => state?.onboardingReducer?.user);
  const callingReducer = useSelector((state) => state?.callingReducer);
  const testimonialReducer = useSelector((state) => state?.testimonialReducer);

  const count = useSelector((state) => state?.callingReducer?.count);

  // const questions = [
  //   {
  //     id: 1,
  //     question: "How can I help you?",
  //     answer: "How can I get more interaction on my LinkedIn profile?",
  //   },
  //   {
  //     id: 2,
  //     question: "How can I help yfdnfnbfnfu?",
  //     answer: "How can I get more interaction on my LinkedIn profile?",
  //   },
  //   {
  //     id: 3,
  //     question: "How can I help you ndndnd?",
  //     answer: null,
  //   },
  // ];

  const headerOptions = [
    {
      id: 1,
      name: "upcoming",
      text: "Upcoming Calls",
      isSelected: true,
      count: count?.upcoming,
    },
    {
      id: 2,
      name: "completed",
      text: "Completed Calls",
      isSelected: false,
      count: count?.completed,
    },
  ];

  const [callType, setcallType] = useState({});
  const [selectedData, setselectedData] = useState();
  const [openModal, setopenModal] = useState(false);
  const [openTestimonialModal, setOpenTestimonialModal] = useState(false);
  const [publishButtonDisabled, setPublishButtonDisabled] = useState(false);
  const [testimonialId, setTestimonialId] = useState();
  const [testimonialData, setTestimonialData] = useState();
  const [CallDetailsModal, setCallDetailsModal] = useState({
    show: false,
    bookingId: "",
  });

  const [IsDesktopView, setIsDesktopView] = useState(false);

  const getCallDataService = async (bookingId) => {
    return await axios({
      method: "GET",
      baseURL: config.API_BASE_URL,
      url: `/insta-learn/bookings/details?bookingId=${bookingId}`,
      headers: {
        "x-access-token": getUserToken(),
      },
    });
  };

  const getTestimonialDataService = async (testimonialId, enc) => {
    return await axios({
      method: "GET",
      baseURL: config.API_BASE_URL,
      url: `/insta-learn/testimonial/details?id=${testimonialId}&enc=${enc}`,
      headers: {
        "x-access-token": getUserToken(),
      },
    });
  };

  const getTestimonialData = async (testimonialId, enc) => {
    dispatch(testimonialactions.setIsLoading(true));
    try {
      let response = await getTestimonialDataService(testimonialId, enc);

      if (response?.data?.message === "success") {
        let data = [
          {
            testimonial: response?.data?.data?.testimonial,
            customerName: response?.data?.data?.customerName,
            serviceTitle: response?.data?.data?.serviceTitle,
            rating: response?.data?.data?.rating,
          },
        ];
        dispatch(testimonialactions.setIsLoading(false));
        setTestimonialData(data);
        setTestimonialId(response?.data?.data?.testimonialId);
        setOpenTestimonialModal(true);
        setPublishButtonDisabled(response?.data?.data?.isPublished);
      } else {
        dispatch(testimonialactions.setIsLoading(false));
        setOpenTestimonialModal(false);
        setPublishButtonDisabled(true);
      }
    } catch (error) {
      dispatch(testimonialactions.setIsLoading(false));
      toast.error(error?.response?.data?.message);
      setPublishButtonDisabled(true);
      setOpenTestimonialModal(false);
    }
  };

  const onSelectCard = async (data, bookingId) => {
    if (data) {
      setselectedData(data);
    } else {
      let response = await getCallDataService(bookingId);

      setselectedData(response?.data?.data);
    }
    setopenModal(true);
  };

  useEffect(() => {
    if (
      router?.isReady &&
      router?.pathname === "/calls" &&
      router?.query?.bookingId
    ) {
      if (token) {
        onSelectCard(null, router?.query?.bookingId);
      } else {
        router.push("/authorization");
      }
    } else if (
      router?.isReady &&
      router?.pathname === "/calls" &&
      router?.query?.testimonialId
    ) {
      if (token) {
        getTestimonialData(router?.query?.testimonialId, 1);
      } else {
        router.push("/authorization");
      }
    }
  }, [router]);

  useEffect(() => {
    dispatch(actions?.setIsLoading(true));

    dispatch(actions?.getServiceCount());

    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
  }, []);

  useEffect(() => {
    if (callType?.count) {
      dispatch(actions?.setIsLoading(true));
      dispatch(
        actions?.getAllCalls({
          type: callType?.type || "upcoming",
          limit: 10,
          offset: 0,
          totalService: parseInt(callType?.count),
        })
      );
    }
  }, [callType]);

  useEffect(() => {
    if (count) {
      setcallType({ type: "upcoming", count: count?.upcoming });
    }
  }, [count]);

  const fetchData = () => {
    dispatch(
      actions?.getAllCalls({
        type: callType?.type,
        limit: callingReducer?.limit,
        offset: callingReducer?.offset,
        totalService: parseInt(callType?.count),
      })
    );
  };

  const copyLinkHandler = (meetlink) => {
    navigator.clipboard.writeText(meetlink);
    toast.success("Copied Successfully");
  };

  const callBack = () => {
    router.replace("/calls");
    toast.success("Testimonial published successfully");
  };

  const callBackUnpublish = () => {
    router.replace("/calls");
    toast.success("Testimonial unpublished !");
  };

  const publishTestimonial = () => {
    let data = {
      publish: true,
      testimonialId: parseInt(testimonialId),
    };
    setOpenTestimonialModal(false);
    dispatch(
      testimonialactions.publishTestimonial({ payload: data, callBack })
    );
  };

  const unpublishTestimonial = () => {
    let data = {
      publish: false,
      testimonialId: parseInt(testimonialId),
    };
    setOpenTestimonialModal(false);
    dispatch(
      testimonialactions.unpublishTestimonial({
        payload: data,
        callBack: callBackUnpublish,
      })
    );
  };

  useEffect(() => {
    console.log("SELECTED DATA IS", selectedData);
  }, [selectedData]);

  return (
    <>
      {!IsDesktopView && (
        <Navbar
          logo={landingPageLogo}
          backIcon={false}
          profile={{ src: userDetails?.imageUrl }}
        />
      )}

      <Sidenav
        tabSelected={"calls"}
        IsDesktopView={IsDesktopView}
        heading={"Calls"}
      >
        <div className="callscontainer">
          <div className="callscontainer__box">
            <div className="callscontainer__box__header">
              {headerOptions?.map((options) => (
                <>
                  <div
                    className={`callscontainer__box__header__badge ${
                      options?.name == callType?.type
                        ? `callHeaderActive`
                        : `callHeaderNonActive`
                    } `}
                    onClick={(e) =>
                      setcallType({
                        type: options?.name,
                        count: options?.count,
                      })
                    }
                  >
                    {options?.text}
                    <span className="callscontainer__box__header__badge__count">
                      {options?.count}
                    </span>
                  </div>
                </>
              ))}
            </div>

            {!callingReducer?.allCalls.length &&
              callType?.type == "upcoming" && (
                <div className="callscontainer__nocallsbox">
                  <div className="primary">No Upcoming Calls</div>
                  <div className="secondary">
                    Looks like you don't have any upcoming calls as of now
                  </div>
                </div>
              )}

            {!callingReducer?.allCalls.length &&
              callType?.type == "completed" && (
                <div className="callscontainer__nocallsbox">
                  <div className="primary">No Completed Calls</div>
                  <div className="secondary">
                    Looks like you have no completed calls
                  </div>
                </div>
              )}

            {callType?.type == "upcoming" &&
            Object.entries(count).length &&
            callingReducer?.allCalls.length ? (
              <>
                <div className="callscontainer__box__upcoming">
                  Next Upcoming Call
                </div>
                <CallingCard
                  data={callingReducer?.allCalls[0]}
                  highlight={true}
                  onSelectCard={onSelectCard}
                  showCta={true}
                />

                {!!callingReducer.allCalls?.slice(1).length && (
                  <>
                    <div className="callscontainer__box__nextBookings">
                      Next bookings
                    </div>
                    <div
                      id="nextBookings"
                      className="infinitescrollcontainer-nextBookings"
                    >
                      <InfiniteScroll
                        dataLength={callingReducer?.dataLength || 0} //This is important field to render the next data
                        next={fetchData}
                        scrollThreshold={0.8}
                        hasMore={callingReducer?.hasMore}
                        scrollableTarget={IsDesktopView ? "nextBookings" : ""}
                        loader={<Loader />}
                        endMessage={
                          callingReducer.allCalls?.length !== 0 ? (
                            <p
                              style={{
                                textAlign: "center",
                                margin: "10px 0px",
                              }}
                            >
                              <b>Yay! You have seen it all</b>
                            </p>
                          ) : (
                            <></>
                          )
                        }
                      >
                        <div className="callscontainer__box__nextBookingsContainer">
                          {callingReducer.allCalls?.slice(1)?.map((data) => (
                            <CallingCard
                              data={data}
                              onSelectCard={onSelectCard}
                              showCta={false}
                            />
                          ))}
                        </div>
                      </InfiniteScroll>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {
                  <div
                    id="completedCalls"
                    className="infinitescroll-completedcalls"
                  >
                    <InfiniteScroll
                      dataLength={callingReducer?.dataLength || 0} //This is important field to render the next data
                      next={fetchData}
                      scrollThreshold={0.8}
                      scrollableTarget={IsDesktopView ? "completedCalls" : ""}
                      hasMore={callingReducer?.hasMore}
                      loader={<Loader />}
                      endMessage={
                        callingReducer.allCalls?.length !== 0 ? (
                          <p
                            style={{
                              textAlign: "center",
                              margin: "10px 0px",
                            }}
                          >
                            <b>Yay! You have seen it all</b>
                          </p>
                        ) : (
                          <></>
                        )
                      }
                    >
                      <div className="callscontainer__box__nextBookingsContainer">
                        {callingReducer.allCalls?.map((data) => (
                          <CallingCard
                            data={data}
                            completed={true}
                            onSelectCard={onSelectCard}
                            showCta={false}
                            onClickTestimonial={(id) =>
                              getTestimonialData(id, 0)
                            }
                          />
                        ))}
                      </div>
                    </InfiniteScroll>
                  </div>
                }
              </>
            )}
          </div>
        </div>
      </Sidenav>

      {!IsDesktopView && <BottomNavbar selected={"calls"} />}

      {openModal && (
        <ModalContainer
          customClass={"calls_modalContainer"}
          open={openModal}
          header={"Session Details"}
          onCloseBottomSheet={() => {
            router.replace("/calls", undefined, { shallow: true });
            setopenModal(false);
          }}
        >
          <div className="callsModalContainer">
            <div className="callsModalContainer__basicDetails">
              <div className="callsModalContainer__basicDetails__personalinfo">
                <div className="topcontainer">
                  <div>
                    <div className="topcontainer__name">
                      {" "}
                      {selectedData?.payment?.customer?.name}
                    </div>
                    <div className="topcontainer__phone">
                      {" "}
                      {selectedData?.payment?.customer?.mobile}
                    </div>
                  </div>

                  <div className="bottomcontainer__details__text">
                    {`₹ ${selectedData?.payment?.amount}`}
                  </div>
                </div>
                <div className="bottomcontainer">
                  <div className="bottomcontainer__details">
                    <img src={sms?.src}></img>
                    <div className="bottomcontainer__details__text">
                      {selectedData?.payment?.customer?.email}
                    </div>
                  </div>

                  {selectedData?.payment?.customer?.linkedinUrl !== null && (
                    <div className="bottomcontainer__details">
                      <img
                        src={linkedInBox?.src}
                        className="bottomcontainer__details__linkedinImage"
                      ></img>
                      <a
                        className="bottomcontainer__details__linktag"
                        href={selectedData?.payment?.customer?.linkedinUrl}
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
              <div className="callsModalContainer__otherdetails__meetboxContainer">
                {callType?.type == "upcoming" ? (
                  <a
                    className="callsModalContainer__otherdetails__meetbox"
                    href={selectedData?.meetingLink}
                    target="_blank"
                  >
                    <div className="callsModalContainer__otherdetails__meetbox__icon">
                      <img src={gmeet.src} alt="Meeticon" />
                    </div>
                    <div>Join session</div>
                  </a>
                ) : (
                  <div className="callsModalContainer__otherdetails__meetbox completedCall">
                    <span>{selectedData?.meetingLink}</span>
                  </div>
                )}

                <div
                  onClick={() => copyLinkHandler(selectedData?.meetingLink)}
                  className="copyIcon"
                >
                  <img
                    src={copyIcon.src}
                    className="callsModalContainer__otherdetails__meetbox__img"
                  />
                </div>
              </div>
            </div>

            {selectedData &&
              selectedData?.answers !== null &&
              JSON.parse(selectedData?.answers).length !== 0 && (
                <div className="callsModalContainer__otherdetails">
                  {selectedData &&
                    JSON.parse(selectedData?.answers)?.map((item) => {
                      if (item?.answerType === "text") {
                        return (
                          <Input
                            label={`
                        <div>
                          ${item?.question}
                          ${
                            !item?.isMandatory
                              ? '<span class="labelSecondary">(<i> Optional </i>)</span>'
                              : ""
                          }
                        </div>
                   `}
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
                      } else if (item?.answerType === "file") {
                        return (
                          <div className="uploadFileContainer">
                            <div className="uploadFileContainer_heading">
                              {item?.question}
                              {!item?.isMandatory && (
                                <span class="labelSecondary">
                                  (<i> Optional </i>)
                                </span>
                              )}
                            </div>
                            {item?.answer ? (
                              <div className="fileContainer">
                                <div className="fileContainer_text">
                                  {item?.answer}
                                </div>

                                <a
                                  className="fileContainer_viewButtonLink"
                                  href={item?.answer}
                                  target="_blank"
                                >
                                  View
                                </a>
                              </div>
                            ) : (
                              <div
                                style={{ fontSize: "16px", color: "#0a1629" }}
                              >
                                User has not responded to this question yet
                              </div>
                            )}
                          </div>
                        );
                      }
                    })}
                </div>
              )}
          </div>
        </ModalContainer>
      )}

      {openTestimonialModal && (
        <ModalContainer
          customClass={"calls_modalContainer"}
          open={openTestimonialModal}
          header={"Testimonial"}
          onCloseBottomSheet={() => {
            router.replace("/calls", undefined, { shallow: true });
            setOpenTestimonialModal(false);
          }}
        >
          <div className="testimonialModalContainer">
            <div style={{ flex: 1 }}>
              <Testimonialcard
                testimonialData={testimonialData}
                callsPage={true}
              />
            </div>
            <button
              className={
                !publishButtonDisabled
                  ? "testimonialModalContainer__publishButton"
                  : "testimonialModalContainer__publishButton testimonialModalContainer__publishButton__delete"
              }
              onClick={() => {
                if (publishButtonDisabled) {
                  unpublishTestimonial();
                } else {
                  publishTestimonial();
                }
              }}
            >
              {publishButtonDisabled && (
                <span className="trashicon">
                  <img
                    src={trash.src}
                    alt="Trash icon"
                    style={{ width: "100%", height: "100%" }}
                  ></img>
                </span>
              )}
              <span className="publishtext">
                {publishButtonDisabled
                  ? "Unpublish Testimonial"
                  : "Publish on your page"}
              </span>
            </button>
          </div>
        </ModalContainer>
      )}

      {(callingReducer?.isLoading || testimonialReducer?.isLoading) && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}
    </>
  );
};

export default CallsScreen;
