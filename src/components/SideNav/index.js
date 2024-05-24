import React, { memo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import backIcon from "@/assets/images/backIcon.png";
import meetproLogo from "../../assets/images/meetProFinal.svg";
import home from "../../assets/images/home.svg";
import homeactive from "../../assets/images/homeactive.svg";
import calls from "../../assets/images/calling.svg";
import callsactive from "../../assets/images/callsactive.svg";
import offerings from "../../assets/images/note.svg";
import offeringsactive from "../../assets/images/offeringsactive.svg";
import availability from "../../assets/images/availability.svg";
import availabilityactive from "../../assets/images/availabilityactive.svg";
import earnings from "../../assets/images/wallet.svg";
import earningsactive from "../../assets/images/earningsactive.svg";
import viewProfile from "../../assets/images/viewProfile.svg";
import settings from "../../assets/images/settings.svg";
import logout from "../../assets/images/logout.svg";
import arrowdown from "../../assets/images/arrowdown.svg";
import arrowdropdownup from "../../assets/images/arrowdropdownup.svg";
import { Dropdown } from "semantic-ui-react";
import * as actions from "../../store/Onboarding/actions";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Sidenav = memo(
  ({
    children,
    tabSelected,
    IsDesktopView,
    heading = null,
    isBackNavigation = false,
  }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userName = useSelector(
      (state) => state?.onboardingReducer?.user?.name
    );
    const userLogo = useSelector(
      (state) =>
        state?.onboardingReducer?.user?.imageUrl ||
        state?.onboardingReducer?.user?.googleUrl
    );
    const [showDropdown, setShowDropDown] = useState(false);
    const navLinkData = [
      {
        tabImage: home,
        tabName: "home",
        tabText: "Home",
        tabActive: homeactive,
        route: "/onboarding/screens/success",
      },
      {
        tabImage: calls,
        tabName: "calls",
        tabText: "Calls",
        tabActive: callsactive,
        route: "/calls",
      },
      {
        tabImage: offerings,
        tabName: "offerings",
        tabText: "Offerings",
        tabActive: offeringsactive,
        route: "/offerings",
      },
      {
        tabImage: availability,
        tabName: "availability",
        tabText: "Availability",
        tabActive: availabilityactive,
        route: "/availability",
      },
      {
        tabImage: earnings,
        tabName: "earnings",
        tabText: "Earnings",
        tabActive: earningsactive,
        route: `/earnings`,
      },
    ];

    const logoutUser = () => {
      toast.success("Logged out successfully");
      router.push("/");
      dispatch(actions.logoutUser());
    };

    const handleBack = () => {
      router.back();
    };

    const NavLink = ({ data }) => {
      const handleNavClick = (data) => {
        router?.push(data?.route);
      };

      return (
        <div
          className="navlinkContainer"
          style={
            tabSelected == data?.tabName
              ? {
                  background:
                    "linear-gradient(92.6deg, rgba(0, 209, 255, 0.04) 0.47%, rgba(155, 0, 250, 0.04) 43.2%)",
                  borderRight: "3px solid #0A1629",
                }
              : null
          }
          onClick={() => handleNavClick(data)}
        >
          <img
            src={
              tabSelected == data?.tabName
                ? data?.tabActive?.src
                : data.tabImage.src
            }
            className="navlinkContainer__img"
          />
          <div className="navlinkContainer__text">{data?.tabText}</div>
        </div>
      );
    };

    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <>
        {IsDesktopView ? (
          <div className="sideNavBarContainer">
            <div className="sideNavBarContainer__items">
              <div className="sideNavBarContainer__items__navbar">
                <div className="sideNavBarContainer__items__navbar__logocontainer">
                  <img
                    src={meetproLogo.src}
                    className="sideNavBarContainer__items__navbar__logocontainer__img"
                  />
                </div>

                <div className="sideNavBarContainer__items__navbar__navlinksContainer">
                  {navLinkData?.map((data) => {
                    return <NavLink data={data} />;
                  })}
                </div>
              </div>

              <div
                className="sideNavBarContainer__items__profile"
                ref={dropdownRef}
                onClick={() => setShowDropDown(!showDropdown)}
              >
                <div className="sideNavBarContainer__items__profile__left">
                  <img
                    src={userLogo}
                    className="sideNavBarContainer__items__profile__left__img"
                  />
                </div>

                <div className="sideNavBarContainer__items__profile__right">
                  <div className="sideNavBarContainer__items__profile__right__username">
                    {userName}
                  </div>
                </div>

                <div
                  className={
                    showDropdown
                      ? `sideNavBarContainer__items__profile__righticon sideNavBarContainer__items__profile__righticon__active`
                      : `sideNavBarContainer__items__profile__righticon`
                  }
                >
                  <img
                    src={arrowdown.src}
                    alt="Dropdown down arrow"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    className={showDropdown ? "arrow arrow__active" : "arrow"}
                  ></img>
                </div>

                {showDropdown && (
                  <div className="sideNavBarContainer__dropDown">
                    <div className="sideNavBarContainer__dropDown__info">
                      <div
                        className="sideNavBarContainer__dropDown__item"
                        onClick={() =>
                          router.push("/onboarding/screens/editprofile")
                        }
                      >
                        <div className="sideNavBarContainer__dropDown__item__icon">
                          <img
                            src={viewProfile.src}
                            alt="View profile icon"
                            style={{ width: "100%", height: "100%" }}
                          ></img>
                        </div>
                        <div className="sideNavBarContainer__dropDown__item__text">
                          View Profile
                        </div>
                      </div>

                      <div
                        className="sideNavBarContainer__dropDown__item"
                        onClick={() => router.push("/settings/availability")}
                      >
                        <div className="sideNavBarContainer__dropDown__item__icon">
                          <img
                            src={settings.src}
                            alt="View profile icon"
                            style={{ width: "100%", height: "100%" }}
                          ></img>
                        </div>
                        <div className="sideNavBarContainer__dropDown__item__text">
                          Settings
                        </div>
                      </div>

                      <div
                        className="sideNavBarContainer__dropDown__item"
                        onClick={() => logoutUser()}
                      >
                        <div className="sideNavBarContainer__dropDown__item__icon">
                          <img
                            src={logout.src}
                            alt="View profile icon"
                            style={{ width: "100%", height: "100%" }}
                          ></img>
                        </div>
                        <div
                          className="sideNavBarContainer__dropDown__item__text"
                          style={{ color: "#cb0606" }}
                        >
                          Logout
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="sideNavBarContainer__contentContainer">
              {heading && (
                <div className="sideNavBarContainer__topContainer">
                  <div className="sideNavBarContainer__topContainer__headingContainer">
                    {isBackNavigation && (
                      <div
                        className="sideNavBackIcon"
                        onClick={() => handleBack()}
                      >
                        <Image
                          src={backIcon}
                          alt="backIcon"
                          width={40}
                          height={40}
                        />
                      </div>
                    )}
                    <div className="sideNavheading">{heading}</div>
                  </div>
                </div>
              )}
              <div className="sideNavBarContainer__content">{children}</div>
            </div>
          </div>
        ) : (
          <div className="sideNavBarContainer__content_mobileView">
            {children}
          </div>
        )}
      </>
    );
  }
);

export default Sidenav;
