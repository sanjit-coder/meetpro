import React from "react";

const Backdrop = ({ children }) => {
  return (
    <>
      <div className="backdrop">{children}</div>
    </>
  );
};

export default Backdrop;
