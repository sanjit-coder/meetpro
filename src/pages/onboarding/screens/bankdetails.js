import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Notes from "@/components/Notes";
import Input from "@/components/Input";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import backIcon from "../../../assets/images/backIcon.png";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import * as actions from "../../../store/Onboarding/actions";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Sidenav from "../../../components/SideNav";
import PricingDetailsPopup from "@/components/PricingDetailsPopup";

const Bankdetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  //REDUX DATA
  const isLoading = useSelector((state) => state.onboardingReducer.isLoading);
  const userData = useSelector((state) => state?.onboardingReducer?.user);
  const useremail = useSelector(
    (state) => state?.onboardingReducer?.user?.email
  );

  const bankDetails = useSelector(
    (state) => state?.onboardingReducer?.bankDetails
  );

  //STATES

  const [showPricingDetailsPopup, setShowPricingDetailsPopup] = useState(false);
  const [isDisabled, setisDisabled] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [disableFields, setDisableFields] = useState(false);
  var accountRegex = new RegExp("[0-9]{9,18}");
  var emailregex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  var beneficiaryNameRegex = new RegExp(/^[a-zA-Z ]*$/);
  var IFSCRegex = new RegExp(/^[a-zA-Z0-9]*$/);

  const [IsDesktopView, setIsDesktopView] = useState(false);

  useEffect(() => {
    if (name !== "" && number !== "" && ifscCode !== "" && email !== "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [name, number, ifscCode, email]);

  const callBack = () => {
    dispatch(actions.getUserDetails());
    router.push("/onboarding/screens/success");
  };

  const handleBack = () => {
    router.back();
  };

  const submitBankDetails = () => {
    if (!IFSCRegex.test(ifscCode)) {
      toast.error("Please enter valid IFSC code");
    } else if (!accountRegex.test(number)) {
      toast.error("Invalid Account Number");
    } else if (!emailregex.test(email)) {
      toast.error("Invalid email");
    } else {
      const payload = {
        beneficiaryName: name,
        accountNumber: number,
        IFSC: ifscCode,
        email: email,
      };
      dispatch(actions.setBankDetails({ payload, callBack }));
    }
  };

  const calculateCommission = () => {
    const totalAmount = 1000;
    const commissionPercentage = userData?.commissionPercentage;
    const razorPayPercentage = userData?.razorpayCommissionPercentage;

    const combinedPercent = commissionPercentage + razorPayPercentage;
    const deductionAmount =
      combinedPercent !== 0 ? (combinedPercent / 100) * totalAmount : 0;
    const finalAmount = totalAmount - deductionAmount;

    const finalObject = {
      finalAmount: Math.floor(finalAmount),
      deductionAmount: Math.floor(deductionAmount),
    };

    return finalObject;
  };

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  // // page refresh
  // useEffect(() => {
  //   if (!userData) {
  //     router.push("/onboarding/screens/success");
  //   }
  // }, [userData]);

  useEffect(() => {
    if (userData?.bankDetails !== null) {
      dispatch(actions.getBankDetails());
    }
    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
  }, []);

  useEffect(() => {
    if (
      bankDetails !== null &&
      bankDetails !== undefined &&
      Object.keys(bankDetails)?.length !== 0
    ) {
      setDisableFields(true);
      setName(bankDetails?.beneficiaryName);
      setNumber(bankDetails?.accountNumber);
      setIfscCode(bankDetails?.IFSC);
      if (
        bankDetails.hasOwnProperty("emailId") &&
        bankDetails?.emailId !== "" &&
        bankDetails?.emailId !== null &&
        bankDetails?.emailId !== undefined
      ) {
        setEmail(bankDetails?.emailId);
      }
    } else {
      setEmail(useremail);
    }
  }, [bankDetails]);

  useEffect(() => {
    if (userData) {
      if (userData?.commissionPercentage !== 0) {
        setShowPricingDetailsPopup(true);
      }
    }
  }, [userData]);

  return (
    <>
      {!IsDesktopView && (
        <Navbar
          logo={backIcon}
          heading={"Bank Details"}
          handleBack={handleBack}
        />
      )}
      <Sidenav tabSelected={"earnings"} IsDesktopView={IsDesktopView}  heading={"Bank Details"} isBackNavigation={true}>
        <div className="onboardingcontainer onboardingcontainer__bankdetails">
          <div className="onboardingcontainer__box onboardingcontainer__box__bankdetails">
            <div className="onboardingcontainer__box__notescontainer">
              <Notes
                text={
                  "We will settle your earnings directly to this bank account."
                }
                secondaryText={
                  userData?.commissionPercentage !== 0
                    ? `We charge a small ${userData?.commissionPercentage}% commission fees + ${userData?.razorpayCommissionPercentage}% Payment Gateway charges on every paid transaction`
                    : ""
                }
                ctaText={
                  userData?.commissionPercentage !== 0 ? "Know More" : ""
                }
                handleCtaClick={() => setShowPricingDetailsPopup(true)}
              />
            </div>
            <Input
              value={name}
              label={"Beneficiary Name"}
              icon={""}
              disabled={disableFields}
              placeholder={"Eg. Swapnil Pande"}
              onChange={(value) => setName(value)}
              className={"bankDetails_name"}
              // type="text"
            />

            <Input
              type="number"
              value={number}
              label={"Account Number"}
              icon={""}
              disabled={disableFields}
              placeholder={"Eg. 5100268898908899"}
              onChange={(value) => {
                setNumber(value);
              }}
              className={"bankDetails_desc"}
              onBlur={() => {
                // if (!accountRegex.test(number)) {
                //   toast.error("Invalid Account Number");
                // }
              }}
            />

            <Input
              value={ifscCode}
              label={"IFSC Code"}
              disabled={disableFields}
              placeholder={"Eg. ICIC00000261"}
              onChange={(value) => {
                setIfscCode(value.toUpperCase());
              }}
              className={"bankDetails_price"}
              splitInput={false}
            />

            <Input
              value={email}
              label={"Email Id"}
              disabled={disableFields}
              placeholder={"Enter email id"}
              onChange={(value) => {
                setEmail(value);
              }}
              className={"bankDetails_price"}
              splitInput={false}
            />
          </div>

          {!disableFields && (
            <div className="buttoncontainer buttoncontainer__bankdetails">
              <Button
                className="buttoncontainer__button buttoncontainer__button__bankdetails"
                onClick={() => submitBankDetails()}
                disabled={buttonDisabled}
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </Sidenav>
      {showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}
      {showPricingDetailsPopup && (
        <PricingDetailsPopup
          commissionPercentage={userData?.commissionPercentage}
          razorpayCommissionPercentage={userData?.razorpayCommissionPercentage}
          finalAmount={calculateCommission()?.finalAmount}
          classplusAmount={calculateCommission()?.deductionAmount}
          open={showPricingDetailsPopup}
          handleClose={() => setShowPricingDetailsPopup(false)}
        />
      )}
    </>
  );
};

export default Bankdetails;
