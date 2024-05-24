import React from "react";
import landingPageLogo from "../../assets/images/meetProFinal.svg";
import Image from "next/image";

const LandingPage = () => {
  return (
    <>
      <div className="landingpagecontainer">
        <div className="header">
          <div className="header__logocontainer">
            <div className="header__logocontainer__logo">
              <Image
                src={landingPageLogo}
                alt="Landing Page Logo"
                style={{ width: "100%", height: "100%" }}
              ></Image>
            </div>
            <div className="header__logocontainer__text">
              <span>Meet</span>
              Pro
            </div>
          </div>
          <div className="header__buttoncontainer">
            <div className="loginbutton">Login</div>
            <div className="signupbutton">Sign up - It’s free</div>
          </div>
        </div>
        <div className="landingpage"></div>
      </div>
    </>
  );
};

export default LandingPage;
