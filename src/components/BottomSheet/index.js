import React, { useState, useRef } from "react";
import closeButton from "../../assets/images/closeButton.png";

const BottomSheet = ({
  customClass,
  customProps,
  children,
  handleClose,
  header,
  blockBackdrop,
  onblockBackdrop = () => { },
  footer,
  style,
  hideCross = false,
  onCloseBottomSheet,
}) => {
  const [returnContent, setReturnContent] = useState(true);
  return (
    <div
      className={
        returnContent
          ? "ModalWrapper blockSlide ModalWrapper__Show"
          : "ModalWrapper blockSlide ModalWrapper__Hide"
      }
    >
      <div
        onClick={() => {
          if (!blockBackdrop) {
            onblockBackdrop();
            setReturnContent(false);
          }
        }}
        className={
          returnContent ? "Backdrop Backdrop__Show" : "Backdrop Backdrop__Hide"
        }
      />
      <div
        className={
          returnContent
            ? `Modal Modal__Show ${customClass ? customClass : ""}`
            : `Modal Modal__Hide ${customClass ? customClass : ""}`
        }
        {...customProps}
      >
        {!hideCross && (
          <div
            className="Modal--Close"
            onClick={() => {
              setReturnContent(false);
              onCloseBottomSheet();
            }}
          >
            <img
              src={closeButton.src}
              alt="crossIcon"
              width="35px"
              height="35px"
            />
          </div>
        )}
        <div
          className="Modal__Head"
          style={{
            borderBottom: header ? "1px solid #e5e5e5" : "",
          }}
        >
          {header && <div className="Modal__Head--Details">{header}</div>}
        </div>
        <div className="Modal__Body">{children}</div>

        {footer ? (
          <div
            className={
              returnContent
                ? "Modal__Footer Modal__Footer__Fixed"
                : "Modal__Footer Modal__Footer__Absolute"
            }
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BottomSheet;
