import React, { useState, useEffect, useCallback } from "react";
import backIcon from "../../../assets/images/backIcon.png";
import Navbar from "@/components/Navbar";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/Offerings/actions";
import toast from "react-hot-toast";
import Sidenav from "@/components/SideNav";
import alert from "../../../assets/images/alert.svg";
import modalCross from "../../../assets/images/modalCross.svg";
import { durations } from "../../../constants/getDurationOptions";
import { Modal } from "semantic-ui-react";
import { resetQuestions } from "@/store/Questions/actions";

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

const AddOffering = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [isDisabled, setisDisabled] = useState(false);
  const [IsDesktopView, setIsDesktopView] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState("");
  const userData = useSelector((state) => state?.onboardingReducer?.user);
  const offeringData = useSelector((state) => state?.offeringReducer);
  const { serviceQuestions } = useSelector((state) => state?.questionsReducer);

  const { serviceTitle, serviceDescription, serviceDuration, servicePrice } =
    useSelector((state) => state?.offeringReducer);

  const handleGoBack = () => {
    router?.back();
  };

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
      dispatch(actions.setOfferingDetails({ type: "servicePrice", value }));
    },
    [dispatch]
  );

  const callBack = () => {
    toast.success("Offering Added Successfully");
    dispatch(actions.resetOfferingDetails());
    dispatch(resetQuestions());
    router.push("/offerings");
  };

  const handleAddOffering = () => {
    let payload = {
      description,
      duration,
      price: price === "" ? 0 : parseInt(price),
      title,
    };

    if (price !== "" && price !== 0 && price <= 10) {
      toast.error("Please enter a price more than 10");
    } else {
      const isFirstQuestionEmpty = serviceQuestions?.[0]?.question === "";

      payload = {
        ...payload,
        questions:
          serviceQuestions?.length === 1 && isFirstQuestionEmpty
            ? []
            : serviceQuestions,
      };

      console.log("QUESTIONS PAYLOAD", payload);
      debugger;
      dispatch(actions.addOffering({ payload, callBack }));
    }
  };

  const handleAddServiceQuestionsClick = () => {
    router.push(`/servicequestions?edit=false`);
  };

  // page refresh
  useEffect(() => {
    if (!offeringData.hasOwnProperty("services")) {
      router.push("/onboarding/screens/success");
    }
  }, [offeringData]);

  useEffect(() => {
    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
  }, []);

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
          heading={"Add Offering"}
          handleBack={handleGoBack}
        />
      )}
      <Sidenav
        tabSelected={"offerings"}
        IsDesktopView={IsDesktopView}
        heading={"Add Offering"}
        isBackNavigation={true}
      >
        <div className="offerings">
          <div className="offerings__box">
            <Input
              label={"Offering Name"}
              icon={""}
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
              onClick={() => handleAddServiceQuestionsClick()}
            >
              Add Service Questions
            </div>
          </div>
          <div className="buttoncontainer buttoncontainer__offeringspage">
            <Button
              onClick={() => {
                handleAddOffering();
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
};

export default AddOffering;
