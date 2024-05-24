import React from "react";

const Notes = ({
  icon,
  text,
  secondaryText,
  className,
  ctaText,
  handleCtaClick,
}) => {
  return (
    <div className="notes">
      {icon && (
        <div className="notes__icon">
          <img src={icon.src} alt="Whatsapp Icon" />
        </div>
      )}
      <div className="notes__text">
        <div>{text}</div>
        {secondaryText && <div>{secondaryText}</div>}
        {ctaText && (
          <div className="notes__cta" onClick={() => handleCtaClick()}>
            {ctaText}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
