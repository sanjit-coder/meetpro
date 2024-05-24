import React from "react";
import { Progress } from "semantic-ui-react";

const ProgressBar = ({ ...props }) => {
  return (
    <Progress percent={props?.percent} size={props?.size} color="#0a1629" />
  );
};

export default ProgressBar;
