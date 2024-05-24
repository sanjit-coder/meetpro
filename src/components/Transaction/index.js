import React from "react";
import moment from "moment";

const Transaction = ({ transactionData }) => {
  return (
    <>
      {!!transactionData &&
        transactionData !== null &&
        transactionData !== undefined &&
        transactionData.length > 0 && (
          <div className="transactioncontainer">
            {transactionData.map((item) => {
              const name =
                !!item?.name && item?.name !== null && item?.name !== undefined
                  ? item?.name
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")
                  : "";
              const transactionDate = moment(item?.purchaseDate).format(
                "D MMM'YY, dddd"
              );
              const callDate = moment(item?.bookingDate).format(
                "D MMM'YY, dddd"
              );
              return (
                <div className="transaction">
                  <div className="transaction__heading">
                    <div className="transaction__heading__name">{name}</div>
                    <div className="transaction__heading__price">
                      {item?.income !== 0 ? `₹ ${item?.income}` : `FREE`}
                    </div>
                  </div>
                  <div className="transaction__date">
                    <div className="transaction__date__text">
                      Transaction Date
                    </div>
                    <div className="transaction__date__value">
                      {transactionDate}
                    </div>
                  </div>
                  <div className="transaction__date">
                    <div className="transaction__date__text">Call Date</div>
                    <div className="transaction__date__value">{callDate}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
    </>
  );
};

export default Transaction;
