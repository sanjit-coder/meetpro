import React, { useState, useRef } from "react";
import BottomSheet from "../BottomSheet";
import { Modal } from "semantic-ui-react";
import closeButton from "../../assets/images/closeButton.png";
import Image from "next/image";
import useWindowSize from "@/customHooks/useWindowSize";
const ModalContainer = ({
  open,
  header,
  customClass,
  onCloseBottomSheet,
  children,
}) => {
  const size = useWindowSize();
  console.log("size is ", size);
  return (
    <>
      {size?.width <= 768 && (
        <BottomSheet
          customClass={customClass}
          header={header}
          blockBackdrop={true}
          onCloseBottomSheet={() => onCloseBottomSheet()}
        >
          {children}
        </BottomSheet>
      )}
      {size?.width > 768 && (
        <Modal open={open} style={{ zIndex: "999 !important" }}>
          <Modal.Header>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignSelf: "center" }}>
                {header}
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => onCloseBottomSheet()}
              >
                <Image src={closeButton} alt="Close Button"></Image>
              </div>
            </div>
          </Modal.Header>
          <Modal.Content>{children}</Modal.Content>
        </Modal>
      )}
    </>
  );
};

export default ModalContainer;
