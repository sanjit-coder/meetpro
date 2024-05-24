import React from "react";
import infocircle from "../../assets/images/infocircle.svg";
import { Popup } from "semantic-ui-react";

const TotalEarnings = ({ totalEarnings = 0, bookings = "" }) => {
  const style = {
    padding: "12px 16px",
    background: "#333333",
    opacity: 0.9,
    border: "1px solid #606060",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    fontFamily: "Nunito Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "150%",
  };
  return (
    <>
      {/* {totalEarnings !== "" && bookings !== "" && ( */}
      <div className="totalearnings">
        <div className="totalearnings__topsection">
          <div className="topsectiontext">
            <div className="topsectiontext__heading">
              Total Earnings
              <span className="infoicon">
                <Popup
                  trigger={
                    <img
                      src={infocircle.src}
                      alt="Info circle"
                      style={{ width: "100%", height: "100%" }}
                    ></img>
                  }
                  style={style}
                  content="It takes up-to 2 business day to settle the amount in your bank account."
                  inverted
                  position="top center"
                />
              </span>
            </div>
            <div className="topsectiontext__price">₹ {totalEarnings == 0 ? 0 : totalEarnings}</div>
          </div>
        </div>
        <div className="totalearnings__bottomsection">
          <div className="bottomtext">
            Accounts for {bookings} {bookings === 1 ? "booking" : "bookings"}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default TotalEarnings;
