import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BottomSheet from "@/components/BottomSheet";

const Profile = () => {
  const router = useRouter();
  // function logout() {
  //   let code = localStorage.getItem("authCode");
  //   let info = JSON.parse(localStorage.getItem("authInfo"));
  //   fetch("https://oauth2.googleapis.com/revoke?token=" + info?.access_token, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/x-www-form-urlencoded",
  //     },
  //   }).then((data) => {
  //     window.localStorage.clear();
  //     window.location.href = "http://localhost:3000/";
  //   });
  // }

  //Parse query string to see if page request is coming from OAuth 2.0 server.
  useEffect(() => {
    console.log("FRAGMENT STRING IS", router?.query?.code);

    if (router?.query?.code) {
      window.localStorage.setItem("authCode", router?.query?.code);
      window.history.pushState({}, document.title, "/");
    }
  }, []);

  useEffect(() => {
    var fragmentString = window.location.hash.substring(1);
    var params = {};
    var regex = /([^&=]+)=([^&]*)/g,
      m;
    while ((m = regex.exec(fragmentString))) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    if (Object.keys(params).length > 0) {
      console.log("PARAMS are", params);
      localStorage.setItem("authInfo", JSON.stringify(params));
      window.history.pushState({}, document.title, "/");
    }
  }, []);

  return (
    <>
      <h3>Profile Page</h3>
      <button onClick={() => logout()}>Logout</button>
      <BottomSheet header={"Please fill the details"}></BottomSheet>
    </>
  );
};

export default Profile;
