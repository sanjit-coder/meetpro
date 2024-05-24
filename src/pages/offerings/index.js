import Navbar from "@/components/Navbar";
import logoTest from "../../assets/images/logoTest.png";
import backIcon from "../../assets/images/backIcon.png";
import profileTest from "../../assets/images/avatarTest.png";
import React, { useEffect, useState } from "react";
import OfferingsCard from "@/components/OfferingsCard";
import Image from "next/image";
import addicon from "../../assets/images/add.png";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/Offerings/actions";
import * as Onboardingactions from "../../store/Onboarding/actions";
import { useRouter } from "next/router";
import BottomNavbar from "@/components/BottomNavbar";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import Sidenav from "@/components/SideNav";
import {
  resetQuestions,
  setEditQuestionsState,
} from "@/store/Questions/actions";

const Offerings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.onboardingReducer.user);
  const serviceDetails = useSelector(
    (state) => state?.offeringReducer?.services
  );
  const [IsDesktopView, setIsDesktopView] = useState(false);
  const isLoading = useSelector((state) => state.offeringReducer.isLoading);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    dispatch(actions.getOfferings());
    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
  }, []);

  const handleAddOffering = () => {
    dispatch(actions.resetOfferingDetails());
    router.push("offerings/add");
  };

  const handleGoBack = () => {
    router.push("/onboarding/screens/success");
  };

  // page refresh
  useEffect(() => {
    if (!userDetails) {
      dispatch(Onboardingactions.getUserDetails());
    }
  }, [userDetails]);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(setEditQuestionsState(false));
    return () => {
      dispatch(resetQuestions());
    };
  }, []);

  return (
    <>
      {!IsDesktopView && (
        <Navbar
          logo={backIcon}
          heading={"Offerings"}
          profile={
            userDetails?.imageUrl
              ? userDetails?.imageUrl
              : userDetails?.googleUrl
          }
          handleBack={handleGoBack}
        />
      )}

      <Sidenav
        tabSelected={"offerings"}
        IsDesktopView={IsDesktopView}
        heading={"Offerings"}
      >
        <div className="offerings">
          <div className="offerings__box">
            <div className="offerings__box__list">
              {serviceDetails?.map((service) => {
                return (
                  <>
                    <OfferingsCard
                      title={service?.title}
                      id={service?.id}
                      cost={service?.price}
                      duration={service?.duration}
                      description={service?.description}
                      numberOfOfferings={serviceDetails?.length}
                      questions={service?.questions}
                    />
                  </>
                );
              })}
            </div>
            <div
              className="offerings__box__buttoncontainer"
              onClick={() => handleAddOffering()}
            >
              <button className="offerings__box__buttoncontainer__button">
                <span>
                  <Image src={addicon} alt="Add Icon"></Image>
                </span>
                Add Offering
              </button>
            </div>
          </div>
        </div>
      </Sidenav>
      {!IsDesktopView && <BottomNavbar selected={"offerings"} />}
      {showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}
    </>
  );
};

export default Offerings;
