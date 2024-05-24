import React from "react";
import Image from "next/image";

const Button = ({
  onClick,
  className = "buttoncontainer__button",
  disabled,
  icon,
  children,
  ...buttonProps
}) => {
  // HANDLE BUTTON CLICKED
  const handleButtonClicked = (e) => {
    e.stopPropagation();
    onClick && onClick();
  };
  return (
    <>
      <button
        onClick={handleButtonClicked}
        className={className}
        disabled={disabled}
      >
        {icon && (
          <div className="buttoncontainer__icon">
            <Image src={icon} style={{ width: "100%", height: "100%" }} />
          </div>
        )}

        {children}
      </button>
    </>
  );
};

export default Button;
