import AnalyticsCard from "@/components/AnalyticsCard";
import React, { useState, useEffect } from "react";
import Sidenav from "@/components/SideNav";
import BottomNavbar from "@/components/BottomNavbar";
import { Dropdown } from "semantic-ui-react";
import { calculateDate } from "@/utils/calculateDate";
import * as actions from "../../store/Analytics/actions";
import * as offeringactions from "../../store/Offerings/actions";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Areagraph from "@/components/Areagraph";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import Navbar from "@/components/Navbar";
import backIcon from "../../assets/images/backIcon.png";

const options = [
  {
    key: "Last 7 days",
    text: "Last 7 days",
    value: 7,
  },
  {
    key: "Last 14 days ",
    text: "Last 14 days",
    value: 14,
  },
  {
    key: "Last 30 days",
    text: "Last 30 days",
    value: 30,
  },
  {
    key: "Last 90 days",
    text: "Last 90 days",
    value: 90,
  },
];

const Analytics = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  //REDUX STATE
  const services = useSelector((state) => state?.offeringReducer?.services);
  const selectedService = useSelector(
    (state) => state?.offeringReducer?.selectedService
  );
  const selectedEvent = useSelector(
    (state) => state?.analyticsReducer?.eventSelected
  );
  const isLoading = useSelector((state) => state?.analyticsReducer?.isLoading);

  const cardsData = useSelector((state) => state?.analyticsReducer?.headerData);

  const graph = useSelector((state) => state?.analyticsReducer?.graphData);

  //STATE
  const [duration, setDuration] = useState(7);
  const [offering, setOffering] = useState();
  const [IsDesktopView, setIsDesktopView] = useState(false);
  const [offeringOptions, setOfferingOptions] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [graphHeading, setGraphHeading] = useState("Revenue");
  const [eventType, setEventType] = useState("REVENUE");

  const handleDropdownChange = (value) => {
    setDuration(value);
    let calculatedDate = calculateDate(value);
    console.log("CALCULATED DATE IS", calculatedDate);
  };

  const getHeaderData = () => {
    dispatch(
      actions.getAnalyticsHeader({ day: duration, serviceId: selectedService })
    );
  };

  const getGraphData = (payload) => {
    dispatch(actions.getGraphData(payload));
  };

  useEffect(() => {
    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
  }, []);

  useEffect(() => {
    if (services === null) {
      dispatch(offeringactions.getOfferings());
    } else {
      let options = services.map((item) => {
        return {
          key: item?.id,
          text: item?.title,
          value: item?.id,
        };
      });
      options = [
        { key: "overall", text: "Overall", value: "overall" },
        ...options,
      ];
      setOfferingOptions(options);
      setOffering(selectedService);
    }
  }, [services]);

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     dispatch(offeringactions.selectOffering(null));
  //   };

  //   router.events.on("routeChangeStart", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange);
  //   };
  // }, [router]);

  const changeOfferingValue = (value) => {
    setOffering(value);
    dispatch(offeringactions.selectOffering(value));
  };

  useEffect(() => {
    if (services !== null) {
      getHeaderData();
      if (eventType) {
        getGraphData({
          day: duration,
          eventType: eventType,
          serviceId: selectedService,
        });
      }
    }
  }, [duration, selectedService, services]);

  useEffect(() => {
    if (eventType && services !== null) {
      getGraphData({
        day: duration,
        eventType: eventType,
        serviceId: selectedService,
      });
    }
  }, [eventType, duration, services]);

  const cardlist = [
    {
      id: 1,
      offeringName: "1:1 Chat",
      action: "visitor",
      value: "Page Views(Visitors)",
      count: 1200,
      percentage: 5,
      rate: true,
    },
    {
      id: 2,
      offeringName: "1:1 Chat",
      action: "visitor",
      value: "Unique Page Views",
      count: 700,
      percentage: 10,
      rate: true,
    },
    {
      id: 3,
      offeringName: "1:1 Chat",
      action: "visitor",
      value: "Buy Now Clicks",
      count: 120,
      percentage: 10,
      rate: false,
    },
    {
      id: 4,
      offeringName: "1:1 Chat",
      action: "visitor",
      value: "Transactions",
      count: 120,
      percentage: 10,
      rate: false,
    },
    {
      id: 5,
      offeringName: "1:1 Chat",
      action: "visitor",
      value: "Revenue",
      count: "16,0000",
      percentage: 10,
      rate: true,
    },
  ];

  // const optionObj = {
  //   chart: {
  //     type: "areaspline",
  //   },
  //   title: {
  //     text: null,
  //   },
  //   series: [
  //     {
  //       showInLegend: false,
  //       // data: state?.graphData?.map((dt, ind) => {
  //       //   return { x: parseInt(dt.row.split(" ")[0]), y: dt?.col ,name:dt.row};
  //       // }),
  //       // data: state?.graphData?.map((dt, ind) => {
  //       //   return dt.col;
  //       // }),
  //       data: ["1", "2", "3", "4", "5", "6"],
  //     },
  //   ],
  //   credits: {
  //     enabled: false,
  //   },
  //   legends: {
  //     enable: false,
  //   },
  //   yAxis: {
  //     visible: false,
  //   },
  //   xAxis: {
  //     title: {
  //       text: "",
  //     },
  //     minorGridLineWidth: 0,
  //     tickLength: 0,
  //     lineColor: "transparent",
  //     legends: {
  //       enable: false,
  //     },
  //     // categories: state?.graphData?.map((dt, ind) => {
  //     //   return dt.row;
  //     // }),
  //     categories: ["A", "B", "C", "D"],
  //     labels: {
  //       useHTML: true,
  //       formatter: function () {
  //         return (
  //           '<span style="color:#7D8593;borderRadius:7px;display:flex;flexDirection:column;alignItems:center;background:#F4F9FD;padding:4px;margin:2px">' +
  //           '<p style="margin:0px;font-weight: 700;font-size: 13px;">' +
  //           // (this.value.split(" ")[0] +
  //           "</p>" +
  //           '<p style="margin:0px;color: #7D8594;font-weight: 400;">' +
  //           // this.value.split(" ")[1]) +
  //           "</p>" +
  //           "</span>"
  //         );
  //       },
  //       step: 1,
  //     },
  //   },
  //   tooltip: {
  //     enabled: true,
  //     borderColor: "none",
  //     shared: true,
  //     useHTML: true,
  //     shadow: false,
  //     borderRadius: "12px",
  //     // borderWidth: 0,
  //     backgroundColor: "rgb(244, 249, 253)",
  //     // style: {
  //     //     padding: 0
  //     // },
  //     formatter: function (tooltip) {
  //       const header = `<span style="color: rgba(0,0,0,.87);">${this.y}</span><br/>`;
  //       return "value: " + header;
  //     },
  //   },
  //   plotOptions: {
  //     lineColor: "#00ADE7",
  //     areaspline: {
  //       // pointStart: 1,
  //       marker: {
  //         enabled: false,
  //         symbol: "circle",
  //         radius: 0,
  //         states: {
  //           hover: {
  //             enabled: false,
  //           },
  //         },
  //       },
  //     },
  //   },
  //   colors: [
  //     {
  //       linearGradient: {
  //         x1: 0,
  //         x2: 0,
  //         y1: 0,
  //         y2: 1,
  //       },
  //       stops: [
  //         [0, "rgba(0, 173, 231, 0.4)"],
  //         [1, "rgba(0, 173, 231, 0.05)"],
  //       ],
  //     },
  //   ],
  // };

  useEffect(() => {
    if (services !== null && cardsData.length !== 0 && graph.length !== 0) {
      setShowLoader(false);
    } else {
      setShowLoader(true);
    }
  }, [services, cardsData, graph]);

  const handleCardClick = (name, id) => {
    dispatch(actions.selectEvent(id));
    setGraphHeading(name);
    setEventType(id);
  };

  const handleBack = () => {
    router.push("/onboarding/screens/success");
  };

  const graphData = {
    chart: {
      type: "areaspline",
      animation: {
        duration: 300, // set animation duration to 500 milliseconds
      },
      // height: 280,
      marginBottom: 100,
      // marginLeft: 50,
      // marginRight: 50,
      backgroundColor: !IsDesktopView
        ? {
            linearGradient: [0, 0, 0, 500],
            stops: [
              [0, "rgba(0, 209, 255, 0.002)"],
              [0.5, "rgba(0, 209, 255, 0.002)"],
              [1, "rgba(155, 0, 250, 0.002)"],
            ],
          }
        : {},
      borderRadius: IsDesktopView ? "16px" : "none",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: graphHeading,
      align: "left",
      margin: 32,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: true,
        },
        pointStart: 0, // set the starting x value to 0
      },
    },
    xAxis: {
      categories: graph?.map((data) => data?.date),
    },
    yAxis: {
      title: {
        text: "",
      },
      gridLineWidth: 1,
      gridLineColor: "#D8E0F0",
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.x}</b><br/>Value: <b>${this.y}</b>`;
      },
    },
    series: [
      {
        name: "Dates",
        data: graph?.map((data) => data?.count),

        // color: "#6495ED",
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0.21, "#358BFE"],
            [1.08, "rgba(255, 255, 255, 0)"],
          ],
        },
      },
    ],
  };

  return (
    <>
      {!IsDesktopView && (
        <Navbar logo={backIcon} heading={"Analytics"} handleBack={handleBack} />
      )}
      <Sidenav tabSelected={"home"} IsDesktopView={IsDesktopView}>
        <div className="analyticsheader">Analytics</div>
        <div className="analyticscontainer">
          <div className="analyticscontainer__box">
            <div className="analyticstopsection">
              <div className="analyticstopsection__left">
                <div className="analyticstopsection__left--heading">
                  Offerings
                </div>
                <div className="analyticstopsection__left--dropdown">
                  <Dropdown
                    fluid
                    scrolling
                    style={{
                      width: IsDesktopView ? "280px" : "180px",
                      border: "0.833333px solid #D8E0F0",
                      borderRadius: "12px",
                      color: "#0A1629",
                      fontWeight: "600",
                      fontSize: "13.3333px",
                      paddingRight: "6px",
                    }}
                    selection
                    value={offering}
                    options={offeringOptions}
                    onChange={(e, { value }) => {
                      changeOfferingValue(value);
                    }}
                  />
                </div>
              </div>
              <div className="analyticstopsection__right">
                <div className="analyticstopsection__right--dropdown">
                  <Dropdown
                    scrolling
                    style={{
                      width: "120px",
                      border: "0.833333px solid #D8E0F0",
                      borderRadius: "12px",
                      color: "#0A1629",
                      fontWeight: "600",
                      fontSize: "13.3333px",
                      paddingRight: "6px",
                    }}
                    selection
                    value={duration}
                    options={options}
                    onChange={(e, { value }) => {
                      handleDropdownChange(value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="analyticscardcontainer">
              {cardsData &&
                cardsData.length > 0 &&
                cardsData.map((item) => {
                  return (
                    <AnalyticsCard
                      id={item?.key}
                      offeringName={item?.text}
                      subtext={item?.subtext}
                      value={item?.value}
                      direction={item?.direction}
                      // duration={duration}
                      onClickCard={handleCardClick}
                    />
                  );
                })}
            </div>

            <div className="analyticsgraphcontainer">
              <Areagraph data={graphData} isDesktopView={IsDesktopView} />
            </div>
          </div>
        </div>
      </Sidenav>

      {!IsDesktopView && <BottomNavbar selected={"home"} />}

      {showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}

      {!showLoader && isLoading && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}
    </>
  );
};

export default Analytics;
