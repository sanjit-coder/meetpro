import React from "react";
import { Modal } from "semantic-ui-react";
import Lottie from "react-lottie";
import * as animationData from "../../../pricingPopupAnimation.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const PricingDetailsPopup = ({
  open,
  handleClose,
  commissionPercentage,
  razorpayCommissionPercentage,
  finalAmount,
  classplusAmount,
}) => {
  const pricingPoints = [
    `For instance - if your client books a Rs.1000 slot with you, then Rs. ${finalAmount} will be credited to your bank account and Rs.${classplusAmount} will be credited to Classplus’s account`,
    " You can take unlimited bookings from your clients with the same pricing",
  ];
  return (
    <>
      <Modal open={open} style={{ zIndex: "999 !important" }}>
        <div className="pricingDetailsParentContainer">
          <div className="pricingDetailsContainer">
            <Lottie options={defaultOptions} height={153} width={271} />
            <h1 className="pricingDetailsContainer_heading">
              For every paid transaction, we charge a small{" "}
              <span>{`${commissionPercentage}% commission fees + ${razorpayCommissionPercentage}% Payment Gateway charges`}</span>
            </h1>
            <ol>
              {pricingPoints &&
                pricingPoints.map((item) => {
                  return <li>{item}</li>;
                })}
            </ol>
            <button
              className="pricingDetailsContainer_submitBtn"
              onClick={() => handleClose()}
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PricingDetailsPopup;
