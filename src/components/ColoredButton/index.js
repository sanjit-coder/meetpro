import React from "react";
// import Image from "next/image";
import { Icon } from "semantic-ui-react";

const ColoredButton = ({ color, text, icon, onClick }) => {
  return (
    <div
      className={`coloredbutton coloredbutton__${color}`}
      onClick={() => color === "black" && onClick(text)}
    >
      {color != "black" && (
        <div className="coloredbutton__icon">
          {icon && <img src={icon?.src}></img>}
        </div>
      )}
      <div className="coloredbutton__text">{text}</div>
      {color === "black" && (
        <div className="coloredbutton__righticon">
          <Icon name="angle right" size="large" />
        </div>
      )}
    </div>
  );
};

export default ColoredButton;
