import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import Illustration from "@/components/Illustration";
import successicon from "@/assets/images/successIcon.png";
import landingPageLogo from "@/assets/images/meetProFinal.svg";
import splashImage from "@/assets/images/feedback-splash.svg";
import { Rating } from "semantic-ui-react";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/Testimonial/actions";
import moment from "moment";
import { toast } from "react-hot-toast";

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
            <div className="initialsuccessbox__text__heading">Thank You!</div>
            <p style={{ textAlign: "center" }}>
              You have successfully submitted your testimonial
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const Feedback = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [ShowThankyou, setShowThankyou] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [rating, setRating] = useState(0);
  const [testimonial, setTestimonial] = useState("");
  const [bookingData, setBookingData] = useState({});
  const [sellerData, setSellerData] = useState({});

  const isLoading = useSelector((state) => state.testimonialReducer.isLoading);
  const testimonialData = useSelector(
    (state) => state.testimonialReducer.testimonialData
  );

  const callBack = () => {
    setShowThankyou(true);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please fill rating");
    } else if (testimonial === "") {
      toast.error("Please fill your testimonial");
    } else {
      let data = {
        bookingId: parseInt(bookingData?.id),
        sellerId: parseInt(bookingData?.sellerId),
        rating: parseInt(rating),
        testimonial: testimonial,
        customerId: parseInt(bookingData?.payment?.customer?.id),
      };

      dispatch(actions.createTestimonial({ payload: data, callBack }));
    }
  };

  useEffect(() => {
    if (router?.isReady) {
      console.log("QUERY IS", router?.query?.testimonialId);
      if (router?.query?.testimonialId) {
        const id = router?.query?.testimonialId;
        dispatch(actions.getTestimonial(id));
      }
    }
  }, [router]);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (Object.keys(testimonialData)?.length !== 0) {
      if (testimonialData?.alreadyfilled === true) {
        setShowThankyou(true);
      } else {
        setShowThankyou(false);
        setBookingData(testimonialData?.booking);
        setSellerData(testimonialData?.seller);
      }
    }
  }, [testimonialData]);

  useEffect(() => {
    if (rating !== 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [rating]);

  return (
    <>
      <Navbar
        logo={landingPageLogo}
        publishPage={true}
        backIcon={false}
        publishLink="/authorization"
        // creatorId={props?.pagedata?.creatorId}
      />
      {!showLoader && (
        <div>
          {ShowThankyou ? (
            <InitialSuccessPage />
          ) : (
            <>
              {" "}
              <div className="feedbackContainer">
                <div className="feedbackContainer__splash">
                  <img
                    src={splashImage.src}
                    className="feedbackContainer__splash__image"
                  />
                </div>

                <div className="feedbackContainer__rateSection">
                  <div className="feedbackContainer__rateSection__heading">
                    Rate your session with
                  </div>
                  <div className="feedbackContainer__rateSection__name">
                    {!!sellerData && Object.keys(sellerData)?.length !== 0
                      ? sellerData?.name
                      : ""}
                  </div>
                  <div className="feedbackContainer__rateSection__service">
                    {!!bookingData &&
                    Object.keys(bookingData)?.length !== 0 &&
                    Object.keys(bookingData?.service)?.length !== 0
                      ? bookingData?.service?.title
                      : ""}
                  </div>
                  <div className="feedbackContainer__rateSection__date">
                    {!!bookingData && Object.keys(bookingData)?.length !== 0
                      ? `${moment(bookingData?.bookingDate).format(
                          "D MMM'YY"
                        )}, ${moment(bookingData?.bookingDate).format("dddd")};
                    ${
                      moment(bookingData?.from).format("LT").toLowerCase() +
                      " " +
                      "-" +
                      " " +
                      moment(bookingData?.to).format("LT").toLowerCase()
                    }
                    `
                      : ""}
                  </div>
                  <div className="feedbackContainer__rateSection__rating">
                    <Rating
                      icon="star"
                      rating={rating}
                      maxRating={5}
                      onRate={(e, data) => {
                        e.preventDefault();
                        setRating(data.rating);
                      }}
                      size="massive"
                    />
                    <div className="feedbackContainer__rateSection__rating__text">
                      <div className="feedbackContainer__rateSection__rating__text__bad">
                        Bad
                      </div>
                      <div className="feedbackContainer__rateSection__rating__text__good">
                        Very good
                      </div>
                    </div>
                  </div>

                  <div className="feedbackContainer__rateSection__testimonialHeader">
                    Your Testimonial
                  </div>
                  <textarea
                    className="feedbackContainer__rateSection__testimonialquery"
                    placeholder="Tell us what you loved..."
                    value={testimonial}
                    onChange={(e) => setTestimonial(e.target.value)}
                    maxLength={230}
                  ></textarea>
                </div>
              </div>
              <div className="feedback_buttonContainer">
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                  disabled={buttonDisabled}
                  className="buttoncontainer__button buttoncontainer__button__feedback"
                  // disabled={isDisabled}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
        </div>
      )}
      {showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}
    </>
  );
};

export default Feedback;
