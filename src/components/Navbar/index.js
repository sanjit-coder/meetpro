import React, { useState, useEffect } from "react";
import Image from "next/image";
import arrowupright from "../../assets/images/arrowupright.svg";
import { useDispatch, useSelector } from "react-redux";
import { GAUTH } from "@/utils/constants";
import { useRouter } from "next/router";
import * as actions from "../../store/Onboarding/actions";
import { trackEvent } from "../../utils/ganalytics";
import setFoldName from "@/utils/setFoldName";
import { Dropdown } from "semantic-ui-react";
import Link from "next/link";
import viewProfile from "../../assets/images/viewProfile.svg";
import settings from "../../assets/images/settings.svg";
import logout from "../../assets/images/logout.svg";
import arrowdown from "../../assets/images/arrowdown.svg";
import setSignupPoint from "@/utils/setSignupPoint";
import toast from "react-hot-toast";
import getUserToken from "@/utils/getUserToken";

const Navbar = ({
  logo,
  heading,
  secondaryText,
  profile,
  className,
  handleBack,
  publishPage = false,
  publishLink,
  backIcon = true,
  creatorId,
  profilePicture = true,
}) => {
  // console.log("handleBack", profile);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state?.onboardingReducer?.user);
  const userExists = useSelector(
    (state) => state?.onboardingReducer?.userExists
  );
  console.log("USER DETAILS **", user);
  const [IsDesktopView, setIsDesktopView] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState(false);

  useEffect(() => {
    const token = getUserToken();
    if (user === null && !publishPage) {
      if (token !== null || token != undefined) {
        dispatch(actions.getUserDetails());
      }
    }
  }, [user]);

  useEffect(() => {
    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
  }, []);

  const logoutUser = () => {
    toast.success("Logged out successfully");
    router.push("/");
    dispatch(actions.logoutUser());
  };

  const trigger = (
    <>
      <div className="navbarContainer__profileSection">
        <div
          className={
            !publishPage
              ? "profileImage"
              : "profileImage profileImage__publishpage"
          }
        >
          <img
            src={user?.imageUrl ? user?.imageUrl : user?.googleUrl}
            alt="Profile Image"
            // onClick={() => router.push("/onboarding/screens/editprofile")}
          />
        </div>
        <div className="dropdownContainer">
          <img
            src={arrowdown.src}
            alt="Down arrow"
            className={
              dropdownOpen
                ? "dropdownContainerArrow dropdownContainerArrow__active"
                : "dropdownContainerArrow"
            }
          />
        </div>
      </div>
    </>
  );
  const options = [
    {
      key: "profile",
      text: (
        <>
          <div
            className="floatingDropdownText"
            onClick={() => router.push("/onboarding/screens/editprofile")}
          >
            <div className="floatingDropdownText__icon">
              <img
                src={viewProfile.src}
                alt="View profile icon"
                style={{ width: "100%", height: "100%" }}
              ></img>
            </div>
            <div className="floatingDropdownText__label">View Profile</div>
          </div>
        </>
      ),
      value: "profile",
    },
    {
      key: "settings",
      text: (
        <>
          <div
            className="floatingDropdownText"
            onClick={() => router.push("/settings/availability")}
          >
            <div className="floatingDropdownText__icon">
              <img
                src={settings.src}
                alt="View profile icon"
                style={{ width: "100%", height: "100%" }}
              ></img>
            </div>
            <div className="floatingDropdownText__label">Settings</div>
          </div>
        </>
      ),
      value: "settings",
    },
    {
      key: "logout",
      text: (
        <>
          <div className="floatingDropdownText" onClick={() => logoutUser()}>
            <div className="floatingDropdownText__icon">
              <img
                src={logout.src}
                alt="View profile icon"
                style={{ width: "100%", height: "100%" }}
              ></img>
            </div>
            <div className="floatingDropdownText__label floatingDropdownText__label__error">
              Logout
            </div>
          </div>
        </>
      ),
      value: "logout",
    },
  ];

  return (
    <div
      className={`navbarContainer ${className ? className : null}`}
      style={!profilePicture ? { justifyContent: "left", gap: "0" } : {}}
    >
      {backIcon && (
        <div className="logo" onClick={handleBack}>
          {logo && (
            <img src={logo?.src} style={{ width: "100%", height: "100%" }} />
          )}
        </div>
      )}

      {!backIcon && (
        <div className="logo__landingpage" onClick={handleBack}>
          {" "}
          {logo && (
            <img src={logo?.src} style={{ width: "100%", height: "100%" }} />
          )}
        </div>
      )}

      {heading && (
        <div
          className="headingBox"
          style={{ width: !profilePicture ? "72%" : "unset" }}
        >
          <div className="heading">{heading}</div>
        </div>
      )}

      {user && !IsDesktopView && (
        <Dropdown
          open={dropdownOpen}
          inline
          header={user?.name}
          floating
          className="icon"
          options={options}
          trigger={trigger}
          direction="left"
          icon={null}
          onClick={() => setDropDownOpen(!dropdownOpen)}
          onBlur={() => setDropDownOpen(false)}
        />
      )}

      {user && IsDesktopView && (
        <div className="navbarContainer__profileSection">
          <div
            className={
              !publishPage
                ? "profileImage"
                : "profileImage profileImage__publishpage"
            }
            onClick={() => router.push("/onboarding/screens/editprofile")}
          >
            <img
              src={user?.imageUrl ? user?.imageUrl : user?.googleUrl}
              alt="Profile Image"
            />
          </div>
        </div>
      )}

      {publishPage && profilePicture && (
        <Link href="/authorization" legacyBehavior>
          <a
            className="claimLinkBox"
            onClick={() => {
              setFoldName("CPP_TR");
              setSignupPoint(`${creatorId}_top`);
              trackEvent(`Click_PP_ClaimLink_Top_${creatorId}`);
            }}
          >
            <div className="claimLinkBox__text"> Claim your Link</div>
            <div className="claimLinkBox__icon">
              <Image
                src={arrowupright}
                style={{ width: "100%", height: "100%" }}
              ></Image>
            </div>
          </a>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
