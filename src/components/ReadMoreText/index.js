import React, { useRef, useEffect, useState, use } from "react";
const _ = require("lodash");

const ReadMoreText = ({ heading, desc }) => {
  const containerRef = useRef(null);
  const [showReadMore, setShowReadMore] = useState(false);
  const [open, setOpen] = useState(false);

  const [description, setDescription] = useState(desc);

  useEffect(() => {
    const containerHeight = containerRef.current.clientHeight;
    const contentHeight = containerRef.current.scrollHeight;

    const numLines = Math.round(contentHeight / containerHeight);

    console.log("NUM", numLines);
    const threshold = 3;

    if (numLines > threshold) {
      console.log("EXCEEDING THE THRESHOLD");
      setShowReadMore(true);
    } else {
      document.getElementById("textContainer").style.height = "auto";
    }
  }, []);

  return (
    <>
      <div className="readMoreText">
        {!!heading && heading !== "" && (
          <div className="readMoreText__heading">{heading}</div>
        )}
        <div
          ref={containerRef}
          className={
            open
              ? "readMoreText__description readMoreText__description__active"
              : "readMoreText__description"
          }
          id="textContainer"
        >
          {desc}
        </div>
        {showReadMore && (
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className="readMoreText__read"
          >
            {!open ? "Read More" : "Read Less"}
          </div>
        )}
      </div>
    </>
  );
};

export default ReadMoreText;
