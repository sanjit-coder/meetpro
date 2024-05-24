import React from "react";
import { useRouter } from "next/router";

const SettingsCard = ({ text, routeName, icon }) => {
  const router = useRouter();
  return (
    <div
      className="settingscard"
      onClick={() => router.push(`/settings/${routeName}`)}
    >
      <div className="settingscard__info">
        <div className="settingscard__info__text">{text}</div>
        <div className="settingscard__info__icon">
          <img
            src={icon}
            alt="Right arrow icon"
            style={{ width: "100%", height: "100%" }}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default SettingsCard;
