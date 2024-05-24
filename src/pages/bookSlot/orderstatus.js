import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import BookSlotFailure from "./failure";
import BookSlotSuccess from "./success";
import BookSlotPending from "./pending";

import { useRouter } from "next/router";
import { checkPaymentStatusAction } from "../../store/Order/actions";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import * as actions from "../../store/Order/actions";
import { setModalStatus } from "../../store/Order/actions";

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const paymentPayload = useSelector(
    (state) => state?.orderReducer?.orderPayload
  );
  const [successText, setSuccessText] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const modalStatus = useSelector((state) => state?.orderReducer?.statusModal);

  const Questions = useSelector(
    (state) => state?.orderReducer?.bookingQuestions
  );
  const [creatorQuestions, setCreatorQuestions] = useState(Questions);

  console.log("questionsxx ashu", Questions);

  useEffect(() => {
    if (router?.isReady) {
      let selectedText = sessionStorage?.getItem("selectedText");
      setSuccessText(selectedText);

      var orderId = router.query["orderId"];
      var paymentStatus = router.query["paymentStatus"];
      // var orderId = '3101676304400190'

      if (orderId) {
        const callBack = () => {};

        const pollingStartTime = Date.now();
        const poll = () => {
          dispatch(
            checkPaymentStatusAction({ orderId, pollingStartTime, callBack })
          );
        };
        poll();
      } else if (paymentStatus == "failed") {
        dispatch(
          setModalStatus({ modal: "failedModal", status: true, orderId: "" })
        );
      }
    }
  }, [router]);

  useEffect(() => {
    if (modalStatus?.modal == "successModal") {
      if (typeof window !== undefined) {
        const orderRetryPayload = JSON.parse(
          window.sessionStorage.getItem("orderRetryPayload")
        );

        dispatch(
          actions.getBookingQuestions({
            sellerId: orderRetryPayload?.sellerId,
            serviceId: orderRetryPayload?.serviceId,
          })
        );
      }
    }
  }, [modalStatus]);

  useEffect(() => {
    console.log("MODAL STATUS", modalStatus);
    if (Questions !== null) {
      setCreatorQuestions(Questions);
    }
  }, [Questions]);

  return (
    <div className="checkoutPage-container">
      {modalStatus?.modal == "successModal" ? (
        <BookSlotSuccess
          creatorName={router?.query?.name}
          successText={successText}
          orderId={modalStatus?.orderId}
          creatorQuestions={creatorQuestions}
          bookingId={modalStatus?.bookingId}
        />
      ) : modalStatus?.modal == "failedModal" ? (
        <BookSlotFailure />
      ) : modalStatus?.modal == "pendingModal" ? (
        <BookSlotPending orderId={modalStatus?.orderId} />
      ) : (
        <>
          <Backdrop>
            <Loader active size="large"></Loader>
          </Backdrop>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
