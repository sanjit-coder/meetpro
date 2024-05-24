import React, { useState, useEffect } from "react";
import landingPageLogo from "../../assets/images/meetProFinal.svg";
import Head from "next/head";
import Image from "next/image";
import { GAUTH } from "@/utils/constants";
import tick1circle from "../../assets/images/tick1circle.svg";
import google from "../../assets/images/google.svg";
import Button from "@/components/Button";
import Illustration from "@/components/Illustration";
import { useRouter } from "next/router";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/Onboarding/actions";
import { Checkbox, Item } from "semantic-ui-react";
import toast from "react-hot-toast";
import getFoldName from "@/utils/getFoldName";
import { trackEvent } from "@/utils/ganalytics";
import envconfig from "../../../env.config";
import getSignupPoint from "@/utils/getSignupPoint";
import setSignupPoint from "@/utils/setSignupPoint";
import setDiyUserId from "@/utils/setDiyUserId";
import getDiyUserId from "@/utils/getDiyUserId";
export default function AuthorizationPage() {
  const foldName = getFoldName();
  const dispatch = useDispatch();
  const router = useRouter();
  /*
   * Create form to request access token from Google's OAuth 2.0 server.
   */

  function oauthSignIn() {
    trackEvent(`Click_AuthScreen_${foldName}`);

    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      client_id: envconfig.CLIENT_ID,
      redirect_uri: envconfig.REDIRECT_URI,
      response_type: "code",
      scope: envconfig.SCOPES,
      include_granted_scopes: "true",
      state: "pass-through value",
      access_type: "offline",
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }

  const listitems = [
    {
      boldheading: "Easy Signup",
      paragraph: "No extra info required, just one click and get started!",
    },
    {
      boldheading: "No Spams, we promise :)",
      paragraph: "Don't worry we will not spam you with marketing emails",
    },
  ];

  const isLoading = useSelector((state) => state.onboardingReducer.isLoading);
  const userExists = useSelector((state) => state.onboardingReducer.userExists);
  const userProfileDetails = useSelector(
    (state) => state.onboardingReducer.user
  );
  const [showLoader, setShowLoader] = useState(false);
  const [tcChecked, setTcChecked] = useState(true);

  useEffect(() => {
    if (router?.query?.diyUserId) {
      setSignupPoint("MeetProX2.0");
      setDiyUserId(router?.query?.diyUserId);
    }

    if (router?.query?.code) {
      const code = router?.query?.code;
      const signupPoint = getSignupPoint();
      const diyUserId = getDiyUserId();
      window.localStorage.setItem("authCode", router?.query?.code);

      window.history.pushState(
        {},
        document.title,
        process.env.NODE_ENV === "production"
          ? "/authorization"
          : "/authorization"
      );
      if (typeof window !== undefined) {
        const utmobject = JSON.parse(window.localStorage.getItem("utmobject"));
        console.log("UTM OBJECT IS", utmobject);

        const tokenParams = {
          code: code,
          utmobject: utmobject,
          signupPoint: signupPoint,
        };

        if (diyUserId !== undefined && diyUserId !== null) {
          tokenParams.diyUserId = diyUserId;
        }

        dispatch(actions.getToken(tokenParams));
      }
    }
  }, [router]);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  const redirectFunction = () => {
    if (typeof window !== undefined) {
      const onboardingStatus = window.localStorage.getItem("onboardingStatus");
      console.log("ONBOARDING STATUS", onboardingStatus);
      const tokenString = window.localStorage.getItem("token");

      if (tokenString != null && tokenString !== undefined) {
        dispatch(actions.getUserDetails());
      }
    }
  };

  useEffect(() => {
    redirectFunction();
  }, [userExists]);

  useEffect(() => {
    console.log("PROFILE DETails are", userProfileDetails);
    const userExists = JSON.parse(window.localStorage.getItem("isExists"));

    if (userProfileDetails !== null && userExists === 1) {
      const onboardingStatus = userProfileDetails?.onboardingStatus;

      if (onboardingStatus === true) {
        router.push("/onboarding/screens/success");
      } else if (onboardingStatus === false) {
        router.push("/onboarding/screens/user");
      }
    }
  }, [userProfileDetails]);

  useEffect(() => {
    console.log("ENV", envconfig);
    console.log("FOLD NAME IS", foldName);
    trackEvent(`Open_AuthScreen_${foldName}`);
  }, []);

  return (
    <>
      <Head>
        <title>MeetPro</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Illustration />
      <div className="homepagecontainer">
        <div className="homepage">
          <div className="homepage__logobox">
            <div className="homepage__logobox__logo">
              <Image
                src={landingPageLogo}
                alt="MeetPro Logo"
                style={{ width: "100%", height: "100%" }}
              ></Image>
            </div>
          </div>
          <div className="homepage__mainheading">
            1 Click away from starting your <span>mentorship journey</span>
          </div>
          <div className="homepage__listsection">
            {listitems &&
              listitems.length > 0 &&
              listitems.map((item) => (
                <div className="homepage__listsection__listitem">
                  <div className="homepage__listsection__listitem__icon">
                    <Image src={tick1circle} alt="Yes Icon small"></Image>
                  </div>
                  <div className="homepage__listsection__listitem__text">
                    <div className="homepage__listsection__listitem__text__bold">
                      {item.boldheading}
                    </div>
                    <div className="homepage__listsection__listitem__text__para">
                      {item.paragraph}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="homepage__buttoncontainer">
            <Button
              className="homepage__buttoncontainer__button"
              icon={google}
              onClick={() => {
                if (tcChecked) {
                  oauthSignIn();
                } else {
                  toast.error(
                    "Please accept the terms and conditions to proceed"
                  );
                }
              }}
            >
              Continue with Google
            </Button>
          </div>

          <div className="tctextdesktop">
            <Checkbox
              checked={tcChecked}
              onChange={() => setTcChecked(!tcChecked)}
            ></Checkbox>

            <span className="tctextdesktop__info">
              I agree to all the{" "}
              <a
                className="tctextdesktop__info__link"
                href="https://meetpro.club/terms.html"
                target="_blank"
              >
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a
                className="tctextdesktop__info__link"
                href="https://meetpro.club/privacypolicy.html"
                target="_blank"
              >
                Privacy Policy
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="buttoncontainer buttoncontainer__homepage">
        <Button
          className="buttoncontainer__button buttoncontainer__button__homepage"
          icon={google}
          onClick={() => {
            if (tcChecked) {
              oauthSignIn();
            } else {
              toast.error("Please accept the terms and conditions to proceed");
            }
          }}
        >
          Continue with Google
        </Button>
      </div>

      <div className="tctext">
        <Checkbox
          checked={tcChecked}
          onChange={() => setTcChecked(!tcChecked)}
        ></Checkbox>

        <span className="tctext__info">
          I agree to all the{" "}
          <a
            className="tctext__info__link"
            href="https://meetpro.club/terms.html"
            target="_blank"
          >
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a
            className="tctext__info__link"
            href="https://meetpro.club/privacypolicy.html"
            target="_blank"
          >
            Privacy Policy
          </a>
        </span>
      </div>

      {showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}
    </>
  );
}
