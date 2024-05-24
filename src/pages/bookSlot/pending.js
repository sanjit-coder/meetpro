import React, { useState, useEffect } from "react";
import paymentPendingIcon from "../../assets/images/pendingIcon.png";
import Image from "next/image";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";

import { useDispatch } from "react-redux";

import { useRouter } from "next/router";
import { trackEvent } from "../../utils/ganalytics";

const BookSlotFailure = ({ orderId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  // let orderPayload = JSON.parse(sessionStorage.getItem("orderRetryPayload"))

  useEffect(() => {
    let pageData = JSON.parse(sessionStorage.getItem("pageData"));
    trackEvent(`Open_PostPayment_Progress_${pageData?.creatorId}`);
  }, []);

  return (
    <>
      <div className="bookSlotResultContainer">
        <div className="bookSlotResultContainer__box bookSlotResultContainer__box__failedpayment">
          <div className="bookSlotResultContainer__box__logo bookSlotResultContainer__box__logo__failure">
            <Image
              src={paymentPendingIcon}
              alt="Success Icon"
              style={{ width: "100%", height: "100%" }}
            ></Image>
          </div>
          <div className="bookSlotResultContainer__box__text">
            <div className="bookSlotResultContainer__box__text__heading">
              We are trying to process your payment
            </div>
            <div className="bookSlotResultContainer__box__text__secondaryheading">
              <br />
              Order Id: {orderId}
            </div>
            <div className="bookSlotResultContainer__box__text__secondary">
              <div className="bookSlotResultContainer__box__text__secondary__textBlock">
                1.If the payment is successful, we will share the link to join
                the channel via sms and email within 2 hours.
              </div>
              <br />
              <div className="bookSlotResultContainer__box__text__secondary__textBlock">
                2.In case the payment fails, the amount will be refunded to the
                source with 2-3 business days.
              </div>
              <br />
              <div className="bookSlotResultContainer__box__text__secondary__textBlock">
                3.In case you don't get the channel invite link within 2 hours
                contact us on : support@meetpro.club
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}
    </>
  );
};

export default BookSlotFailure;
