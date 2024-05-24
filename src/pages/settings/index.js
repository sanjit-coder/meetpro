import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidenav from "@/components/SideNav";
import backIcon from "../../assets/images/backIcon.png";
import { useRouter } from "next/router";
import SettingsCard from "@/components/SettingsCard";
import rightarrow from "../../assets/images/rightarrow.svg";

const Settings = () => {
  const router = useRouter();
  const [IsDesktopView, setIsDesktopView] = useState(false);
  const handleBack = () => {
    router.push("/onboarding/screens/success");
  };
  useEffect(() => {
    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
  }, []);

  const settingsOption = [
    {
      id: 1,
      text: "Availability Settings",
      routeName: "availability",
    },
    // {
    //   id: 2,
    //   text: "Call Settings",
    //   routeName: "call",
    // },
    // {
    //   id: 3,
    //   text: "Reminder Settings",
    //   routeName: "reminder",
    // },
    // {
    //   id: 4,
    //   text: "Calendar Settings",
    //   routeName: "calendar",
    // },
  ];

  return (
    <>
      <Navbar logo={backIcon} heading={"Settings"} handleBack={handleBack} />

      <div className="settingscontainer">
        <div className="settingscontainer__box">
          <div className="settingscardcontainer">
            {settingsOption &&
              settingsOption.length > 0 &&
              settingsOption.map((item) => {
                return (
                  <SettingsCard
                    text={item?.text}
                    routeName={item?.routeName}
                    icon={rightarrow.src}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
