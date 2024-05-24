import React, { useState, useEffect } from "react";
import paymentFailedIcon from "../../assets/images/paymentfailed.svg";
import Image from "next/image";
import Button from "@/components/Button";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { createOrder } from "@/store/Order/actions";
import { trackEvent } from "../../utils/ganalytics";

const BookSlotFailure = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);

  const [orderPayload, setorderPayload] = useState({});

  useEffect(() => {
    setorderPayload(JSON.parse(sessionStorage.getItem("orderRetryPayload")));
  }, [router]);

  useEffect(() => {
    let pageData = JSON.parse(sessionStorage.getItem("pageData"));
    trackEvent(`Open_PostPayment_Fail_${pageData?.creatorId}`);
  }, []);

  const handleRetryPayment = () => {
    let pageData = JSON.parse(sessionStorage.getItem("pageData"));
    trackEvent(`Click_Retry_Fail_${pageData?.creatorId}`);
    setShowLoader(true);
    dispatch(createOrder({ orderPayload }));
  };

  return (
    <>
      <div className="bookSlotResultContainer">
        <div className="bookSlotResultContainer__box bookSlotResultContainer__box__failedpayment">
          <div className="bookSlotResultContainer__box__logo bookSlotResultContainer__box__logo__failure">
            <Image
              src={paymentFailedIcon}
              alt="Success Icon"
              style={{ width: "100%", height: "100%" }}
            ></Image>
          </div>
          <div className="bookSlotResultContainer__box__text">
            <div className="bookSlotResultContainer__box__text__heading">
              Payment failed!
            </div>
            {/* <div className="bookSlotResultContainer__box__text__secondaryheading">
              Order Id: {orderId}
            </div> */}
            <div className="bookSlotResultContainer__box__text__secondary">
              Your payment for this session could not be completed. Please retry
              again.
              <br></br>
              <br></br>
              If you have any query contact us on: support@meetpro.club
            </div>
          </div>
        </div>
      </div>
      <div className="buttoncontainer buttoncontainer__bookSlot">
        <Button onClick={handleRetryPayment}>Retry Payment</Button>
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
