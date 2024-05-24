import React from "react";
import illustrationtop from "../../assets/images/illustrationTop.svg";
import illustrationbottom from "../../assets/images/illustrationBottom.svg";

const Illustration = () => {
  return (
    <>
      <div className="illustrationtop">
        <img src={illustrationtop.src}></img>
      </div>
      <div className="illustrationbottom">
        <img src={illustrationbottom.src}></img>
      </div>
    </>
  );
};

export default Illustration;
