import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const Areagraph = ({ data, isDesktopView }) => {
  return (
    <div
      className="areagraph-container"
      style={{
        width: isDesktopView ? "1060px" : "100%",
        border: isDesktopView ? "1px solid #D8E0F0" : "none",
        borderRadius: isDesktopView ? "16px" : "0px",
      }}
    >
      <HighchartsReact
        containerProps={{
          style: {
            width: "100%",
            // background: "#FFFFFF"
            background:
              "linear-gradient(180.88deg, rgba(0, 209, 255, 0.04) 0.76%, rgba(155, 0, 250, 0.04) 99.24%) !important",
            boxShadow: "0px 6px 58px rgba(196, 203, 214, 0.103611)",
            // padding: "24px",
            // border: "1px solid #D8E0F0",
            // borderRadius: "16px",
            display: "flex",
            padding: "24px",
            justifyContent: "center",
            // marginBottom: "40px",
          },
        }}
        highcharts={Highcharts}
        options={data}
      />
    </div>
  );
};

export default Areagraph;
