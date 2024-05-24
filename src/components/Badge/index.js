import React, { useState } from "react";

const Badge = ({
  value,
  onClick,
  options,
  label,
  offeringsScreen,
  multiSelect = false,
}) => {
  return (
    <>
      <div className="label">{label}</div>
      <div className="onboardingcontainer__box__badgecontainer">
        {options &&
          options.length > 0 &&
          options.map((item, index) => {
            return (
              <div
                className={
                  !multiSelect
                    ? item?.available === false
                      ? `badge badge__inactive`
                      : item?.name != value
                      ? `badge`
                      : `badge badge__active`
                    : item?.isSelected === true
                    ? "badge badge__active"
                    : "badge"
                }
                onClick={() =>
                  !multiSelect
                    ? (item?.available === undefined ||
                        item?.available === true) &&
                      onClick(item?.name)
                    : onClick(item, index)
                }
              >
                {offeringsScreen && offeringsScreen
                  ? `${item?.text}`
                  : `${item?.name}`}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Badge;
