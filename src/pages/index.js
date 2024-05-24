import React, { useState, useEffect } from "react";
import landingPageLogo from "../assets/images/meetProFinal.svg";
import landingPagePhoneLogo from "../assets/images/landingPagePhoneLogo.svg";
import phoneview from "../assets/images/phoneview.svg";
import toast, { useToaster } from "react-hot-toast";
import inputrightarrow from "../assets/images/inputrightarrow.svg";
import aboutImage from "../assets/images/aboutImage.svg";
import mentorIcon1 from "../assets/images/mentorIcon1.svg";
import mentorIcon2 from "../assets/images/mentorIcon2.svg";
import mentorIcon3 from "../assets/images/mentorIcon3.svg";
import mentorIcon4 from "../assets/images/mentorIcon4.svg";
import mentorIcon5 from "../assets/images/mentorIcon5.svg";
import footerIcon1 from "../assets/images/footerIcon1.svg";
import footerIcon2 from "../assets/images/footerIcon2.svg";
import footerIcon3 from "../assets/images/footerIcon3.svg";
import footerIcon4 from "../assets/images/footerIcon4.svg";
import createLinkImage from "../assets/images/createLinkImage.svg";
import Image from "next/image";
import Link from "next/link";
import { Input, Label, Header } from "semantic-ui-react";
import footerIcon from "../assets/images/footerIcon.svg";
import faqdownarrow from "../assets/images/faqdownarrow.svg";
import { faqOptions } from "@/utils/constants";
import { useRouter } from "next/router";
import ReactHotToast from "@/components/ReactHotToast";
import setUserName from "@/utils/setUserName";
import setFoldName from "@/utils/setFoldName";
import { trackEvent } from "../utils/ganalytics";
import setSignupPoint from "@/utils/setSignupPoint";

const LandingPage = () => {
  const [faqoptions, setFaqOptions] = useState(faqOptions);
  const router = useRouter();
  const handleAccordionClick = (id) => {
    let options = [...faqoptions];
    options[id].isOpen = !options[id].isOpen;
    setFaqOptions(options);
  };

  const [name, setName] = useState("");

  useEffect(() => {
    trackEvent("Open_Landing_Page");
  }, []);

  const fireGoogleEvent = (foldName) => {
    setFoldName(foldName);
    trackEvent(`Click_Landing_Signup_${foldName}`);
  };

  useEffect(() => {
    let utmobject = {};
    if (router?.query?.utm_source) {
      utmobject = { ...utmobject, source: router?.query?.utm_source };
    }
    if (router?.query?.utm_medium) {
      utmobject = { ...utmobject, medium: router?.query?.utm_medium };
    }
    if (router?.query?.utm_campaign) {
      utmobject = { ...utmobject, campaign: router?.query?.utm_campaign };
    }

    if (Object.keys(utmobject).length !== 0) {
      const object = JSON.stringify(utmobject);
      if (typeof window !== undefined) {
        window.localStorage.setItem("utmobject", object);
      }
    }
  }, [router]);

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
            <div className="header__logocontainer__phonelogo">
              <Image
                src={landingPagePhoneLogo}
                alt="Landing Page Phone Logo"
                style={{ width: "100%", height: "100%" }}
              ></Image>
            </div>
          </div>
          <div className="header__buttoncontainer">
            <Link href="/authorization" legacyBehavior>
              <div
                className="loginbutton"
                onClick={() => {
                  fireGoogleEvent("TRSignin");
                  setSignupPoint("LP_Top");
                }}
              >
                Login
              </div>
            </Link>

            <Link href="/authorization" legacyBehavior>
              <div
                className="signupbutton"
                onClick={() => {
                  fireGoogleEvent("TRSignup");
                  setSignupPoint("LP_Top");
                }}
              >
                Sign up - It’s free
              </div>
            </Link>
          </div>
        </div>
        <div className="landingpage">
          <div className="topsection">
            <div className="container">
              <div className="topsection__content">
                <div className="topsection__content__left">
                  <h1 className="topsection__content__left__heading">
                    <span>Monetise</span>Your Time And Expertise
                  </h1>
                  <div className="topsection__content__left__text">
                    All you need is just one link to manage your 1:1 sessions,
                    consultations, interviews and much more..
                  </div>
                  <div className="topsection__content__left__inputtext">
                    Create your link now for FREE
                  </div>

                  <div className="splitinputcontainer">
                    <div className="lefticonbox">
                      <img src={footerIcon.src} className="lefticon"></img>
                    </div>
                    <div className="labelbox">meetpro.club/</div>
                    <div className="inputbox">
                      <input
                        className="nameinput"
                        placeholder="yourname..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                    <div
                      className="righticonbox"
                      onClick={() => {
                        {
                          setUserName(name);
                          setSignupPoint("LP_1st_fold");
                          fireGoogleEvent("Fold1");
                          router.push("/authorization");
                        }
                      }}
                    >
                      <img
                        src={inputrightarrow.src}
                        className="righticon"
                      ></img>
                    </div>
                  </div>
                </div>
                <div className="topsection__content__right">
                  <div className="topsection__content__right__imagesection">
                    <img
                      src={phoneview.src}
                      alt="Phone View"
                      style={{ width: "100%", height: "100%" }}
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="aboutsection">
            <div className="container">
              <div className="aboutsection__content">
                <div className="aboutsection__content__signupbox">
                  <h1>Made for you ❤️</h1>
                  <div className="aboutsection__content__signupbox__signup">
                    <Link href="/authorization" legacyBehavior>
                      <a
                        className="signuplink"
                        onClick={() => {
                          fireGoogleEvent("Fold2");
                          setSignupPoint("LP_2nd_fold");
                        }}
                      >
                        Sign up - It’s free
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="aboutsection__content__right">
                  <div className="aboutsection__content__right__imagesection">
                    <img
                      src={aboutImage.src}
                      alt="About Image"
                      style={{ width: "100%", height: "100%" }}
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mentorsection" id="mentorsection">
            <div className="mentorsection__mainheading">
              Mentorship Now Made Easy
            </div>
            <div className="parentcontainer">
              <div className="container">
                <div className="mentorbox">
                  <div className="mentorbox__item">
                    <div className="mentorbox__item__icon">
                      <img
                        src={mentorIcon1.src}
                        alt="Mentor icon 1"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                    <div className="mentorbox__item__title">
                      Scheduling calls, made easier
                    </div>
                    <div className="mentorbox__item__description">
                      “Let me check my Calendar & get back to you”, say no more!
                    </div>
                  </div>

                  <div className="mentorbox__item">
                    <div className="mentorbox__item__icon">
                      <img
                        src={mentorIcon2.src}
                        alt="Mentor icon 2"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                    <div className="mentorbox__item__title">
                      Reminders, a saviour
                    </div>
                    <div className="mentorbox__item__description">
                      Avoid missed calls and ensure everyone’s on time!
                    </div>
                  </div>

                  <div className="mentorbox__item">
                    <div className="mentorbox__item__icon">
                      <img
                        src={mentorIcon3.src}
                        alt="Mentor icon 3"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                    <div className="mentorbox__item__title">
                      Set your price per session
                    </div>
                    <div className="mentorbox__item__description">
                      And your availability, all at your convenience!
                    </div>
                  </div>

                  <div className="mentorbox__item">
                    <div className="mentorbox__item__icon">
                      <img
                        src={mentorIcon4.src}
                        alt="Mentor icon 4"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                    <div className="mentorbox__item__title">
                      Seamless payment collection
                    </div>
                    <div className="mentorbox__item__description">
                      Hello, earnings and timely settlements!
                    </div>
                  </div>

                  <div className="mentorbox__item">
                    <div className="mentorbox__item__icon">
                      <img
                        src={mentorIcon5.src}
                        alt="Mentor icon 5"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                    <div className="mentorbox__item__title">
                      Personalised Dashboard
                    </div>
                    <div className="mentorbox__item__description">
                      Keep track of all your sessions & earnings!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="createlinksection">
            <div className="container">
              <div className="createlinksection__content">
                <div className="createlinksection__content__left">
                  <div className="createlinksection__content__left__heading">
                    Cut the chase. Create your link in 2 minutes.
                  </div>
                  <div className="splitinputcontainer">
                    <div className="lefticonbox">
                      <img src={footerIcon.src} className="lefticon"></img>
                    </div>
                    <div className="labelbox">meetpro.club/</div>
                    <div className="inputbox">
                      <input
                        className="nameinput"
                        placeholder="yourname..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                    <div
                      className="righticonbox"
                      onClick={() => {
                        {
                          setUserName(name);
                          setSignupPoint("LP_3rd_fold");
                          fireGoogleEvent("Fold3");
                          router.push("/authorization");
                        }
                      }}
                    >
                      <img
                        src={inputrightarrow.src}
                        className="righticon"
                      ></img>
                    </div>
                  </div>
                </div>
                <div className="createlinksection__content__right">
                  <div className="createlinksection__content__right__imagesection">
                    <img
                      src={createLinkImage.src}
                      alt="Create Link image"
                      style={{ width: "100%", height: "100%" }}
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="faqsection">
            <div className="faqsection__heading">Got more questions? 🤔</div>
            <div className="faqsection__accordion">
              <div className="container">
                <div className="faqsection__content">
                  {faqoptions &&
                    faqoptions.length > 0 &&
                    faqoptions.map((item, index) => {
                      return (
                        <div
                          className="accordioncontainer"
                          onClick={() => handleAccordionClick(index)}
                        >
                          <div
                            className={
                              item?.isOpen
                                ? "accordioncontainer__topsection accordioncontainer__topsection__open"
                                : "accordioncontainer__topsection"
                            }
                          >
                            <div className="accordioncontainer__topsection__heading">
                              {item?.heading}
                            </div>
                            <div className="accordioncontainer__topsection__icon">
                              <img
                                src={faqdownarrow.src}
                                alt="FAQ down arrow"
                                className={
                                  item?.isOpen
                                    ? "accordioncontainer__topsection__iconimage accordioncontainer__topsection__iconimage__inverted"
                                    : "accordioncontainer__topsection__iconimage"
                                }
                              ></img>
                            </div>
                          </div>
                          {item?.isOpen && (
                            <div className="accordioncontainer__bottomsection">
                              {item?.title}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <div className="footersection">
            <div className="container container__footer">
              <div className="footersection__content">
                <div className="footersection__content__topsection">
                  <div className="footersection__content__topsection__logocontainer">
                    <div className="logo">
                      <Image
                        src={landingPageLogo}
                        alt="Landing Page Logo"
                        style={{ width: "100%", height: "100%" }}
                      ></Image>
                    </div>
                  </div>
                  <div className="footersection__content__topsection__right">
                    <div className="linkscontainer">
                      <ul className="linkscontainer__links">
                        <li>
                          <a
                            href="#mentorsection"
                            className="linkscontainer__links__offering"
                          >
                            Our Offerings
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://meetpro.club/privacypolicy.html"
                            className="linkscontainer__links__offering"
                          >
                            Privacy Policy
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://meetpro.club/terms.html"
                            className="linkscontainer__links__offering"
                          >
                            Terms and Conditions
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="linkscontainer">
                      <div className="linkscontainer__heading">Contact</div>
                      <ul className="linkscontainer__links">
                        <li style={{ fontWeight: 400 }}>
                          <a
                            href="mailto:support@meetpro.club"
                            className="linkscontainer__links__maillink"
                          >
                            support@meetpro.club
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="footersection__content__bottomsection">
                  <div className="bottomlinks">
                    <div className="bottomlinks__link">
                      <a
                        href="https://www.facebook.com/classplusapp"
                        target="_blank"
                      >
                        <img
                          src={footerIcon1.src}
                          alt="FooterIcon 1"
                          style={{ width: "100%", height: "100%" }}
                        ></img>
                      </a>
                    </div>
                    <div className="bottomlinks__link">
                      <a
                        href="https://twitter.com/classplusapps"
                        target="_blank"
                      >
                        <img
                          src={footerIcon2.src}
                          alt="FooterIcon 2"
                          style={{ width: "100%", height: "100%" }}
                        ></img>
                      </a>
                    </div>
                    <div className="bottomlinks__link">
                      <a
                        href="https://www.linkedin.com/company/classplus/"
                        target="_blank"
                      >
                        <img
                          src={footerIcon3.src}
                          alt="FooterIcon 3"
                          style={{ width: "100%", height: "100%" }}
                        ></img>
                      </a>
                    </div>
                    <div className="bottomlinks__link">
                      <a
                        href="https://www.youtube.com/channel/UCp0yDDnyu-C-0Bo_y1JbGtA"
                        target="_blank"
                      >
                        <img
                          src={footerIcon4.src}
                          alt="FooterIcon 4"
                          style={{ width: "100%", height: "100%" }}
                        ></img>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottomstripe">© 2023 All Rights Reserved</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
