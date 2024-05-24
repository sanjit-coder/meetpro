import React, { useState, useEffect, useCallback } from "react";
import { memo } from "react";
import backIcon from "../../../assets/images/backIcon.png";
import Navbar from "@/components/Navbar";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import { useRouter } from "next/router";
import addSocialMedia from "../../../assets/images/addSocialIcon.svg";
import alert from "../../../assets/images/alert.svg";
import modalCross from "../../../assets/images/modalCross.svg";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/Offerings/actions";
import * as Onboardingactions from "../../../store/Onboarding/actions";
import toast from "react-hot-toast";
import Sidenav from "@/components/SideNav";
import deleteSocialIcon from "../../../assets/images/deleteSocialIcon.svg";
import questionicon from "../../../assets/images/questionicon.svg";
import { durations } from "../../../constants/getDurationOptions";

import { Popup, Modal } from "semantic-ui-react";

import { uuid } from "uuidv4";
import {
  saveQuestions,
  setEditQuestionsPayload,
  setEditQuestionsState,
} from "@/store/Questions/actions";
import { set } from "lodash";

const style = {
  padding: "12px 16px",
  background: "#333333",
  opacity: 0.9,
  border: "1px solid #606060",
  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
  borderRadius: "8px",
  fontFamily: "Nunito Sans",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "12px",
  lineHeight: "150%",
};
const EditOfferings = memo((props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const offeringData = useSelector((state) => state?.offeringReducer);

  const { serviceTitle, serviceDescription, serviceDuration, servicePrice } =
    useSelector((state) => state?.offeringReducer);

  const userData = useSelector((state) => state?.onboardingReducer?.user);
  const { serviceQuestions, isEditStateChanged, questionsPayload } =
    useSelector((state) => state?.questionsReducer);

  const [isDisabled, setisDisabled] = useState(false);

  const [offerringData, setOfferingData] = useState(router?.query);
  const [IsDesktopView, setIsDesktopView] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState("");

  const [title, setTitle] = useState(serviceTitle);
  const [price, setPrice] = useState(servicePrice);
  const [duration, setDuration] = useState(serviceDuration);
  const [description, setDescription] = useState(serviceDescription);

  // Define callbacks with useCallback to prevent unnecessary re-renders
  const setTitleCallback = useCallback(
    (value) => {
      dispatch(actions.setOfferingDetails({ type: "serviceTitle", value }));
    },
    [dispatch]
  );

  const setDescriptionCallback = useCallback(
    (value) => {
      dispatch(
        actions.setOfferingDetails({ type: "serviceDescription", value })
      );
    },
    [dispatch]
  );

  const setDurationCallback = useCallback(
    (value) => {
      dispatch(
        actions.setOfferingDetails({
          type: "serviceDuration",
          value: parseInt(value.split(" ")[0]),
        })
      );
    },
    [dispatch]
  );

  const setPriceCallback = useCallback(
    (value) => {
      dispatch(
        actions.setOfferingDetails({
          type: "servicePrice",
          value: value === "" ? "" : parseInt(value),
        })
      );
    },
    [dispatch]
  );

  const callBack = () => {
    toast.success("Changes Saved");
    dispatch(actions.resetOfferingDetails());
    dispatch(Onboardingactions.getUserDetails());
    router.push("/offerings");
  };

  const handleEditOffering = () => {
    if (price !== "" && price !== 0 && price <= 10) {
      toast.error("Please enter a price more than 10");
    } else {
      let payload = {
        title,
        cost: price === "" ? 0 : price,
        description,
        duration,
        id: router?.query?.id,
        numberOfOfferings: router?.query?.numberOfOfferings,
        questions: serviceQuestions,
      };
      dispatch(actions.editOfferings({ offerringData: payload, callBack }));
    }
  };

  const handleGoBack = () => {
    router?.back();
  };

  // page refresh
  useEffect(() => {
    if (offeringData?.services === null) {
      router.push("/onboarding/screens/success");
    }

    console.log("OFFERING DATA IS", offerringData);
  }, [offeringData]);

  useEffect(() => {
    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
  }, []);

  const handleEditServiceQuestionsClick = () => {
    findServiceById();
    router.push(`/servicequestions?edit=${true}`);
  };

  const findServiceById = () => {
    const services = offeringData?.services;
    const serviceId = router?.query?.id;
    const service = services?.find((item) => item?.id === Number(serviceId));
    const serviceQuestions = service?.questions;
    //CHECKING THIS CONDITION BECAUSE IF QUESTIONS ARE EMPTY, WE WANT THE SAMPLE QUESTION TO APPEAR
    if (serviceQuestions?.length !== 0) {
      dispatch(saveQuestions(serviceQuestions));
    }
  };

  useEffect(() => {
    if (router?.isReady) {
      //SET SERVICE ID IN REDUX STATE FOR SERVICE QUESTIONS PAGE
      dispatch(actions.setServiceId(router?.query?.id));
      findServiceById();
      // if (router?.query?.questions !== undefined && !isEditStateChanged) {
      //   let questionsFromQuery = JSON.parse(router?.query?.questions);
      //   if (questionsFromQuery?.length !== 0) {
      //     dispatch(saveQuestions(questionsFromQuery));
      //     dispatch(setEditQuestionsPayload(questionsFromQuery));
      //   }
      //   dispatch(setEditQuestionsState(true));
      // }
    }
  }, [router, offeringData?.services]);

  useEffect(() => {
    setTitle(serviceTitle);
    setDescription(serviceDescription);
    setDuration(serviceDuration);
    setPrice(servicePrice);
  }, [serviceTitle, serviceDescription, serviceDuration, servicePrice]);

  return (
    <>
      {!IsDesktopView && (
        <Navbar
          logo={backIcon}
          heading={"Edit Offerings"}
          handleBack={handleGoBack}
        />
      )}
      <Sidenav
        tabSelected={"offerings"}
        IsDesktopView={IsDesktopView}
        heading={offerringData?.title}
        isBackNavigation={true}
      >
        <div className="offerings">
          <div className="offerings__box">
            <Input
              label={"Offering Name"}
              icon={""}
              maxLength="80"
              disabled={false}
              value={title}
              placeholder={"1:1 Interview"}
              onChange={setTitleCallback}
              className={"offeringEdit_name"}
            />

            <Input
              label={"Description"}
              icon={""}
              disabled={false}
              placeholder={"Add Description"}
              value={description}
              onChange={setDescriptionCallback}
              className={"offeringEdit_desc"}
              textArea={true}
              isQuestion={false}
              inputType={"textarea"}
            />

            <div className="offeringEdit_callDuration">
              <Badge
                label={"Call Duration"}
                value={duration}
                onClick={setDurationCallback}
                options={durations}
                offeringsScreen={true}
              />
            </div>

            {!userData?.bankDetails && (
              <div className="offeringEdit__price">
                <h1>Price</h1>
                <div className="offeringEdit__price__pricebox">
                  <div className="freenudge">Free</div>
                  <div className="freenudgedetails">
                    Add your bank details from the home page to launch a paid
                    offering. Don't forget to save the changes made on this page
                  </div>
                </div>
              </div>
            )}

            {userData?.bankDetails && (
              <Input
                label={"Price"}
                textInputLabel={"₹"}
                placeholder={"0"}
                value={price}
                onChange={setPriceCallback}
                // onChange={(value) => {
                //   setOfferingData((prev) => ({
                //     ...prev,
                //     cost: value === "" ? "" : parseInt(value),
                //   }));
                // }}
                className={"offeringEdit_price"}
                splitInput={true}
              />
            )}
            {userData?.commissionPercentage !== 0 && userData?.bankDetails && (
              <div className="offerings_priceDisclaimer">
                {`We charge a small ${userData?.commissionPercentage}% commission fees + ${userData?.razorpayCommissionPercentage}% Payment Gateway
              charges on every paid transaction`}
              </div>
            )}

            <div
              className="offeringEdit_addServiceCta"
              onClick={() => handleEditServiceQuestionsClick()}
            >
              Edit Service Questions
            </div>
          </div>
          <div className="buttoncontainer buttoncontainer__offeringspage">
            <Button
              onClick={() => {
                handleEditOffering();
              }}
              className="buttoncontainer__button buttoncontainer__button__offeringspage"
              disabled={isDisabled}
            >
              Done
            </Button>
          </div>
        </div>
      </Sidenav>

      {showModal && (
        <Modal open={open} style={{ zIndex: "999 !important" }}>
          <Modal.Content>
            <div className="modalcontent">
              <div
                className="modalcontent__crossicon"
                onClick={() => {
                  setShowModal(false);
                  setDeleteIndex("");
                }}
              >
                <img src={modalCross.src} alt="Cross"></img>
              </div>
              <div className="modalcontent__alerticon">
                <img src={alert.src} alt="Alert Icon"></img>
              </div>
              <div className="modalcontent__heading">
                Are you sure you want to delete this question ?
              </div>
              <div className="modalcontent__text">
                This question will be deleted and can not be restored later.
              </div>
              <div
                className="modalcontent__delete"
                onClick={() => {
                  deleteQuestion(deleteIndex);
                  setShowModal(false);
                }}
              >
                Yes, Delete
              </div>
              <div
                className="modalcontent__cancel"
                onClick={() => {
                  setShowModal(false);
                  setDeleteIndex("");
                }}
              >
                No, Cancel
              </div>
            </div>
          </Modal.Content>
        </Modal>
      )}
    </>
  );
});

export default EditOfferings;
