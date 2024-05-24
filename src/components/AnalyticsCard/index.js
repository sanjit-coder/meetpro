import React from "react";
import greenarrow from "../../assets/images/greenarrow.svg";
import redarrow from "../../assets/images/redarrow.svg";
import * as actions from "../../store/Analytics/actions";
import { useDispatch, useSelector } from "react-redux";

const AnalyticsCard = ({
  id,
  offeringName,
  subtext,
  value,
  count,
  onClickCard,
  direction,
}) => {
  const dispatch = useDispatch();

  //SELECTED CARD STATE INITIALLY
  const eventSelected = useSelector(
    (state) => state?.analyticsReducer?.eventSelected
  );
  // const handleCardClick = () => {
  //   dispatch(actions.selectEvent(value));
  // };

  console.log("cardsData 2", value);

  return (
    <>
      <div
        className={
          id?.toLowerCase() === "revenue"
            ? id === eventSelected
              ? "analyticscard analyticscard__active analyticscard__revenue"
              : "analyticscard  analyticscard__revenue"
            : id === eventSelected
            ? "analyticscard analyticscard__active"
            : "analyticscard"
        }
        onClick={() => onClickCard(offeringName, id)}
      >
        <div className="analyticscard__heading">{offeringName}</div>
        <div className="analyticscard__number">{value}</div>
        <div className="analyticscard__percentage">
          <div className="analyticscard__percentage__icon">
            <img
              src={direction == "up" ? greenarrow.src : redarrow.src}
              alt={direction == "down" ? "Green arrow" : "Red arrow"}
              style={{ width: "14px", height: "14px" }}
            ></img>
          </div>
          <div className="analyticscard__percentage__text">{subtext}</div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsCard;
