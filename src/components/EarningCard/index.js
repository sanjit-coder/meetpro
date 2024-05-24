import React from "react";

import rightarrow from "../../assets/images/rightarrow.svg";

const EarningCard = ({ title, bookings, price, onClick }) => {
  return (
    <>
      <div className="earningcard" onClick={() => onClick()}>
        <div className="earningcard__leftsection">
          <div className="bookinginfo">
            <div className="bookinginfo__heading">{title}</div>
            <div className="bookinginfo__text">
              {bookings === 1 ? `${bookings} Booking` : `${bookings} Bookings`}
            </div>
          </div>
        </div>
        <div className="earningcard__rightsection">
          <div className="priceinfo">
            <div className="priceinfo__price">₹ {price}</div>
            <div className="priceinfo__rightarrow">
              <img
                src={rightarrow.src}
                alt="Right Arrow"
                style={{ width: "100%", height: "100%" }}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EarningCard;
