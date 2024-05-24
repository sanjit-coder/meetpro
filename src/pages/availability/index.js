import React, { useState, useEffect } from "react";
import Cardcomponent from "@/components/Card";
import Button from "@/components/Button";

import Navbar from "@/components/Navbar";
import logoTest from "../../assets/images/logoTest.png";
import backIcon from "../../assets/images/backIcon.png";
import profileTest from "../../assets/images/avatarTest.png";
import rightarrow from "../../assets/images/rightarrow.svg";
import axios from "axios";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import BottomNavbar from "@/components/BottomNavbar";
import Sidenav from "../../components/SideNav";
import Card from "semantic-ui-react";
import deleteIcon from "../../assets/images/trashIcon.png";
import ModalContainer from "@/components/ModalContainer";

import * as actions from "../../store/availability/actions";
import moment from "moment";

const SlotsCard = ({ data }) => {
  const dispatch = useDispatch();

  const handleDeleteConfiguredSlot = (id) => {
    dispatch(actions?.setIsLoading(true));
    dispatch(actions?.deleteConfiguredSlot({ id: id }));
  };

  const singleSlot = data?.rules?.map(
    (slot) =>
      `${moment(slot?.from, "HH:mm").format("h:mm A")} - ${moment(
        slot?.to,
        "HH:mm"
      ).format("h:mm A")}`
  );

  return (
    <>
      <div className="slotsCardcontainer">
        <div className="slotsCardcontainer__left">
          <div className="slotsCardcontainer__left__date">
            {moment(data?.date).format("DD MMM'YY, dddd")}
          </div>

          <div className="slotsCardcontainer__left__slots">
            {singleSlot &&
              singleSlot?.map((slot) => {
                return (
                  <>
                    <div className="slotsCardcontainer__left__slots__singleslot">
                      {/* {moment(slot, 'HH:mm').format('h:mm A')} */}
                      {slot}
                    </div>
                  </>
                );
              })}

            {/* {!singleSlot?.length && (
              <div className="slotsCardcontainer__left__slots__singleslot">
                Unavailable all day
              </div>
            )} */}
          </div>
        </div>

        <div className="slotsCardcontainer__center">
          {singleSlot?.length == 0 ? (
            <div className="slotsCardcontainer__center__unavailable">
              Unavailable
            </div>
          ) : null}

          {singleSlot?.length > 0 ? (
            <div className="slotsCardcontainer__center__edited">Edited</div>
          ) : null}
        </div>

        <div className="slotsCardcontainer__right">
          <img
            src={deleteIcon.src}
            className="slotsCardcontainer__right__img"
            onClick={() => handleDeleteConfiguredSlot(data?.id)}
          />
        </div>
      </div>
    </>
  );
};

const Availability = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [IsDesktopView, setIsDesktopView] = useState(false);
  const [openModal, setopenModal] = useState(false);

  const modifiedDates = useSelector(
    (state) => state?.availabilityReducer?.modifiedDates
  );
  const isLoading = useSelector((state) => state.availabilityReducer.isLoading);

  useEffect(() => {
    dispatch(actions?.setIsLoading(true));
    dispatch(actions?.getModifiedDates());
    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  const callBack = () => {
    if (router.isReady) {
      router.push("/onboarding/screens/success");
    }
  };

  const handleEditWeeklyAvailability = () => {
    router.push("/weeklyavailability");
  };

  const handleBlockedDates = () => {
    router.push("/blockcalender");
  };

  const handleBack = () => {
    router.push("/onboarding/screens/success");
  };

  console.log({ IsDesktopView });
  return (
    <>
      {!IsDesktopView && (
        <Navbar
          logo={backIcon}
          heading={"Availability"}
          handleBack={handleBack}
        />
      )}

      <Sidenav
        tabSelected={"availability"}
        IsDesktopView={IsDesktopView}
        heading={"Availability"}
      >
        <div className="availabilitycontainer">
          <div className="availabilitycontainer__weeklyavailablitycardContainer">
            <div className="availabilitycontainer__weeklyavailablitycardContainer__heading">
              Recurring Availability
            </div>
            <div className="availabilitycontainer__weeklyavailablitycardContainer__subheading">
              Edit your weekly recurring availability from here
            </div>
            <Button
              className="confirmbuttoncontainer__button availabilitycontainer__weeklyavailablitycardContainer__weeklyavailability__button"
              disabled={false}
              onClick={() => handleEditWeeklyAvailability()}
            >
              Click here to edit
            </Button>
          </div>

          <div className="availabilitycontainer__heading">
            <div className="availabilitycontainer__heading__heading">
              Manage Availability
            </div>
            {!!modifiedDates?.length && (
              <>
                <div
                  className="availabilitycontainer__heading__viewAll"
                  onClick={() => setopenModal(true)}
                >
                  View all
                </div>
              </>
            )}
          </div>

          <div
            className="availabilitycontainer__cardscontainer"
            onClick={() => handleBlockedDates()}
          >
            <Cardcomponent
              heading={"Configure Availability"}
              desc={"Block or update availability of specific dates"}
              count={0}
              logo={rightarrow.src}
            ></Cardcomponent>
          </div>
        </div>
      </Sidenav>

      {!IsDesktopView && <BottomNavbar selected={"availability"} />}

      {openModal && (
        <ModalContainer
          customClass={"availability_container"}
          open={openModal}
          header={"Configured Slots"}
          onCloseBottomSheet={() => {
            // router.replace("/calls", undefined, { shallow: true });
            setopenModal(false);
          }}
        >
          <div className="availability_container__cardsContainer">
            {modifiedDates &&
              modifiedDates?.map((slots) => {
                return <SlotsCard data={slots} />;
              })}
          </div>
        </ModalContainer>
      )}

      {showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}
    </>
  );
};

export default Availability;
