import React, { useState, useEffect, useLayoutEffect } from "react";
import Head from "next/head";
import coverPage from "../assets/images/coverPage.png";
import videoIcon from "../assets/images/videoIcon.svg";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import ReadMoreText from "@/components/ReadMoreText";
import BookSlotCard from "@/components/BookSlotCard";
import footerIcon from "../assets/images/footerIcon.svg";
import landingPageLogo from "../assets/images/meetProFinal.svg";
import inputrightarrow from "../assets/images/inputrightarrow.svg";
import twitterIcon from "../assets/images/twitterIcon.svg";
import instaIcon from "../assets/images/instaIcon.svg";
import linkedInIcon from "../assets/images/linkedInIcon.svg";
import mediumIcon from "../assets/images/mediumIcon.svg";
import webIcon from "../assets/images/webIcon.svg";
import axios from "axios";
import { useRouter } from "next/router";
import setEndCustomerName from "@/utils/setEndCustomerName";
import envconfig from "../../env.config";
import setFoldName from "@/utils/setFoldName";
import { trackEvent } from "../utils/ganalytics";
import { useDispatch } from "react-redux";
import * as actions from "../store/User/actions";
import * as analyticsactions from "../store/Analytics/actions";
import Testimonialcard from "@/components/Testimonialcard";
import config from "../../env.config";
import { Rating } from "semantic-ui-react";
import setSignupPoint from "@/utils/setSignupPoint";
import { uuid } from "uuidv4";
import getUniqueId from "@/utils/getUniqueId";
import getCpBranding from "@/utils/getCpBranding";

const CreatorPublishPage = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isCpBranding = getCpBranding();

  const [creatordata, setCreatorData] = useState(null);
  const [name, setName] = useState("");
  const [imgUrlTem, setImgUrlTemp] = useState("");
  const [showCpBranding, setShowCpBranding] = useState(false);

  const callBack = (uniqueId) => {
    if (typeof window !== undefined) {
      const id = getUniqueId();
      if (id === null || id === undefined) {
        window.localStorage.setItem("uniqueId", uniqueId);
      } else if (uniqueId === id) {
        console.log("VISITING THE SAME PAGE AGAIN!!");
      }
    }
  };

  const postAnalyticsData = () => {
    if (typeof window !== undefined) {
      let id = getUniqueId();
      const data = {
        username: props?.pagedata?.username,
        uuid: id === null || id === "undefined" ? uuid() : id,
        eventType: "OPEN_PP",
      };

      dispatch(analyticsactions.postAnalytics(data));
    }
  };

  useEffect(() => {
    setCreatorData(props?.pagedata);

    let pageData = JSON.stringify(props?.pagedata);
    sessionStorage.setItem("pageData", pageData);
    console.log(props?.pageData?.creatorId);

    if (props?.pagedata) {
      trackEvent(`Open_PP_${props?.pagedata?.creatorId}`);
      postAnalyticsData();
    }
  }, []);

  useEffect(() => {
    dispatch(actions.resetState());
  }, []);

  const imgURL = `${config?.GRAPH_BASEURL}api/og?imgUrl=${props?.pagedata?.imageUrl}&services=${props?.services}&pageUrl=${props?.pagedata?.username}`;

  useEffect(() => {
    if (router?.query?.isCpBranding === "false") {
      if (typeof window !== undefined) {
        window.localStorage.setItem("isCpBranding", false);
      }
    }

    if (isCpBranding == "false" || router?.query?.isCpBranding == "false") {
      setShowCpBranding(false);
    } else {
      setShowCpBranding(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Book a slot with {props?.pagedata?.name} on MeetPro</title>
        <meta
          property="og:title"
          content={`Book a slot with ${props?.pagedata?.name} on MeetPro`}
        />
        <meta
          property="og:description"
          content="MeetPro - The tool you need to monetise your time and knowledge"
        />
        <meta property="og:image" content={imgURL} />
        <meta property="og:type" content="image/png" />
        <meta property="og:url" content={imgURL} />
        <meta property="og:image:secure_url" content={imgURL} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:type" content="image/png" />
      </Head>

      {props.pagedata !== null && showCpBranding && (
        <Navbar
          logo={landingPageLogo}
          publishPage={true}
          backIcon={false}
          publishLink="/authorization"
          creatorId={props?.pagedata?.creatorId}
        />
      )}
      {props.pagedata !== null && (
        <div
          className={
            showCpBranding
              ? "publishpagecontainer"
              : "publishpagecontainer publishpagecontainer__hide"
          }
        >
          <div className="publishpagecontainer__coverpage">
            <div
              className="publishpagecontainer__coverpage__image"
              style={{
                height: "142px",
                width: "100%",
                backgroundPosition: "center",
                // backgroundSize: "contain",
              }}
            >
              <Image src={coverPage} layout="fill"></Image>
            </div>
            <div className="socialiconscontainer">
              {!!creatordata &&
                creatordata !== null &&
                creatordata?.socialLinks?.map((item) => {
                  const getSocialIcon = (type) => {
                    switch (type) {
                      case "twitter":
                        return twitterIcon;
                      case "instagram":
                        return instaIcon;
                      case "linkedIn":
                        return linkedInIcon;
                      case "medium":
                        return mediumIcon;
                      case "website":
                        return webIcon;
                      default:
                        return twitterIcon;
                    }
                  };
                  return (
                    <a
                      className="socialiconscontainer__icon"
                      href={item?.url}
                      target="_blank"
                    >
                      <Image
                        src={getSocialIcon(item?.type)}
                        style={{ width: "100%", height: "100%" }}
                      ></Image>
                    </a>
                  );
                })}
            </div>
            <div className="profileimagecontainer">
              {!!creatordata &&
                creatordata !== null &&
                creatordata?.imageUrl && (
                  <img
                    src={
                      !!creatordata &&
                      creatordata !== null &&
                      creatordata?.imageUrl
                    }
                    width="100%"
                    height="100%"
                    style={{
                      backgroundPosition: "center",
                      objectFit: "cover",
                    }}
                  ></img>
                )}
            </div>
          </div>
          <div className="detailscontainer">
            <div className="detailscontainer__box">
              <div className="detailscontainer__box__heading">
                <div className="detailscontainer__box__heading__name">
                  {" "}
                  {!!creatordata && creatordata !== null
                    ? creatordata?.name
                    : ""}{" "}
                </div>
                {creatordata?.ratings >= 3 && (
                  <div className="detailscontainer__box__heading__rating">
                    {parseFloat(creatordata?.ratings)}/5
                    <span>
                      <Rating
                        icon="star"
                        defaultRating={1}
                        size="huge"
                        disabled
                      />
                    </span>
                  </div>
                )}
              </div>
              {creatordata?.about && (
                <ReadMoreText heading="" desc={creatordata?.about} />
              )}

              {creatordata !== null &&
                creatordata?.serviceDetails.length > 0 && (
                  <div className="detailscontainer__box__slotheading">
                    Choose a slot for
                  </div>
                )}
              <div className="detailscontainer__box__servicescontainer">
                {creatordata !== null &&
                  creatordata?.serviceDetails.length > 0 &&
                  creatordata.serviceDetails.map((item) => {
                    return (
                      <BookSlotCard
                        icon={videoIcon}
                        title={item?.title}
                        desc={item?.description}
                        price={item?.price}
                        id={item?.id}
                        creatorId={creatordata?.creatorId}
                        duration={item?.duration}
                        websiteUrl={props?.pagedata?.username.split("/").pop()}
                        creatorName={props?.pagedata?.name}
                        username={props?.pagedata?.username}
                      />
                    );
                  })}
              </div>
              <div className="publishpagecontainer__testimonialContainer">
                {creatordata?.testimonials &&
                  creatordata?.testimonials.length > 0 && (
                    <div className="publishpagecontainer__testimonialContainer__heading">
                      Testimonials
                    </div>
                  )}
                <Testimonialcard
                  testimonialData={creatordata?.testimonials.slice(0, 10)}
                  callsPage={true}
                />
              </div>
            </div>
          </div>

          {showCpBranding && (
            <div className="publishfooter">
              <div className="publishfooter__box">
                <div className="publishfooter__box__heading">
                  Start your mentorship journey
                </div>
                <div className="publishfooter__box__input">
                  <div className="splitinputcontainer splitinputcontainer__publishpage">
                    <div className="lefticonbox">
                      <img src={footerIcon.src} className="lefticon"></img>
                    </div>
                    <div className="labelbox">meetpro.club/</div>
                    <div className="inputbox">
                      <input
                        className="nameinput"
                        placeholder="yourname..."
                        value={name}
                        style={{ background: "white" }}
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                    <div
                      className="righticonbox"
                      onClick={() => {
                        {
                          trackEvent(
                            `Click_PP_ClaimLink_Bottom_${props?.pagedata?.creatorId}`
                          );
                          setSignupPoint(
                            `${props?.pagedata?.creatorId}_bottom`
                          );
                          setEndCustomerName(name);
                          setFoldName("CPP_Footer");
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
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const websiteUrl = `${context.req?.headers?.host}${context?.resolvedUrl}`;
  console.log("URL IS", websiteUrl);

  let newWebsiteUrl;

  const questionMarkIndex = websiteUrl.indexOf("?");
  if (questionMarkIndex !== -1) {
    newWebsiteUrl = websiteUrl.substring(0, questionMarkIndex);
  } else {
    newWebsiteUrl = websiteUrl;
  }

  try {
    let resdata = await axios({
      method: "GET",
      url: envconfig.API_BASE_URL + "/insta-learn/landingPageDetails",
      headers: {
        "website-url": newWebsiteUrl, //OUR WEBSITE URL WILL COME HERE
      },
    });

    let pagedata = await resdata?.data?.data;

    console.log("API DATA IS", pagedata?.serviceDetails);
    // let services = pagedata?.serviceDetails?.map((services) => services?.title)
    // services = `${services[0]}-${services[services?.length - 1]}`
    // services = services.replace(/ /g, '_');

    const serviceTitles = pagedata?.serviceDetails
      ?.map((service) => service?.title?.split(" ")?.join("_"))
      ?.join("-");

    // const firstTitle = serviceTitles?.[0] ?? "";
    // const lastTitle = serviceTitles?.[serviceTitles?.length - 1] ?? "";

    // const servicesTemp = serviceTitles?.map((service)=>service?.title)

    // const services = `${firstTitle}-${lastTitle}`.replace(/ /g, "_");
    console.log("servicesxxxx", pagedata);
    return {
      props: {
        // websiteUrl: websiteUrl,
        services: serviceTitles,
        pagedata: pagedata,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {
        // websiteUrl: websiteUrl,
        pagedata: null,
      }, // will be passed to the page component as props
    };
  }
}

export default CreatorPublishPage;
