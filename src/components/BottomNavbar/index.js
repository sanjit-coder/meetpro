import React from "react";

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
import { useRouter } from "next/router";

const BottomNavbar = ({ selected }) => {
  const router = useRouter();

  const bottomNavs = [
    {
      tabImage: home,
      tabName: "home",
      tabText: "Home",
      tabActive: homeactive,
    },
    {
      tabImage: calls,
      tabName: "calls",
      tabText: "Calls",
      tabActive: callsactive,
    },
    {
      tabImage: offerings,
      tabName: "offerings",
      tabText: "Offerings",
      tabActive: offeringsactive,
    },
    {
      tabImage: availability,
      tabName: "availability",
      tabText: "Availability",
      tabActive: availabilityactive,
    },
    {
      tabImage: earnings,
      tabName: "earnings",
      tabText: "Earnings",
      tabActive: earningsactive,
    },
  ];

  const onTabClick = (tabName) => {
    if (tabName == "home") {
      router.push(`/onboarding/screens/success`);
    } else {
      router.push(`/${tabName}`);
    }
  };

  return (
    <div className="bottomNavBarContainer">
      {bottomNavs?.map((navs, index) => (
        <div
          className="bottomNavBarContainer__tabContainer"
          key={index}
          style={{
            borderTop: selected == navs?.tabName ? "3px solid #0A1629" : "none",
          }}
          onClick={() => onTabClick(navs?.tabName)}
        >
          <>
            <img
              src={
                selected == navs?.tabName
                  ? navs?.tabActive?.src
                  : navs.tabImage.src
              }
              className="bottomNavBarContainer__tabContainer__tabImage"
            />
            <div className="bottomNavBarContainer__tabContainer__tabName">
              {navs?.tabText}
            </div>
          </>
        </div>
      ))}
    </div>
  );
};

export default BottomNavbar;
