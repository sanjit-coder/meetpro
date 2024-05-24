import React from "react";
import Button from "../Button";

import meetIcon from "../../assets/images/GoogleMeet.png";
import calenderIcon from "../../assets/images/calenderIcon.png";
import callIcon from "../../assets/images/callIcon.png";
import testimonialactive from "../../assets/images/testimonialactive.svg";
import testimonialinactive from "../../assets/images/testimonialinactive.svg";
import tick from "../../assets/images/tick.png";
import Link from "next/link";
import { Rating } from "semantic-ui-react";
import moment from "moment";
import { useRouter } from "next/router";

const CallingCard = ({
  completed,
  data,
  highlight,
  onSelectCard,
  showCta,
  onClickTestimonial,
}) => {
  const router = useRouter();
  console.log("dataff", onSelectCard);
  console.log("DATA IS ***", data.testimonial);
  return (
    <div
      className="CallingCard"
      style={{ border: highlight ? "1px solid #0A1629" : " 1px solid #D8E0F0" }}
      onClick={() => {
        if (!completed) {
          onSelectCard(data);
        } else {
          return false;
        }
      }}
    >
      <div className="CallingCard__topContainer">
        <div
          className="CallingCard__topContainer__left"
          style={{
            background: !completed
              ? "linear-gradient(180deg, #0A1629 0%, #17315A 100%)"
              : " #00C68A",
          }}
        >
          {completed && (
            <img
              src={tick.src}
              className="CallingCard__topContainer__left__tick"
            />
          )}
          <div className="CallingCard__topContainer__left__date">
            {moment(data?.bookingDate, "YYYY-MM-DD").format("DD MMM")}{" "}
          </div>
          <div className="CallingCard__topContainer__left__day">
            {moment(data?.bookingDate, "YYYY-MM-DD").format("dddd")}
          </div>
        </div>

        <div className="CallingCard__topContainer__right">
          <div className="CallingCard__topContainer__right__name">
            {data?.payment?.customer?.name}
          </div>
          {completed && (
            <div className="CallingCard__topContainer__right__testimonial">
              {data?.testimonial !== null ? (
                <div className="CallingCard__topContainer__right__testimonial__rating">
                  <Rating
                    icon="star"
                    rating={data?.testimonial?.rating}
                    maxRating={5}
                    disabled
                  />
                </div>
              ) : (
                <div className="CallingCard__topContainer__right__testimonial__rating">
                  <Rating icon="star" rating={0} maxRating={5} disabled />
                </div>
              )}
              <div className="CallingCard__topContainer__right__testimonial__icon">
                <img
                  src={
                    data?.testimonial !== null &&
                    data?.testimonial !== undefined
                      ? testimonialactive?.src
                      : testimonialinactive?.src
                  }
                  alt="Testimonial active"
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => {
                    if (
                      data?.testimonial !== null &&
                      data?.testimonial !== undefined
                    ) {
                      onClickTestimonial(data?.testimonial?.id);
                    } else {
                      return false;
                    }
                  }}
                ></img>
              </div>
            </div>
          )}
          <div className="CallingCard__topContainer__right__service">
            {" "}
            <img
              className="CallingCard__topContainer__right__service__icon"
              src={calenderIcon?.src}
            />
            {data?.service?.title}
          </div>
          <div className="CallingCard__topContainer__right__time">
            <img
              className="CallingCard__topContainer__right__time__icon"
              src={callIcon?.src}
            />{" "}
            {moment(data?.from).format("hh:mm A")} -{" "}
            {moment(data?.to).format("hh:mm A")}
          </div>
          <div className="CallingCard__topContainer__right__viewDetails">
            <span onClick={() => onSelectCard(data)}> View Details</span>
          </div>
        </div>
      </div>

      {showCta && (
        <div className="CallingCard__bottomContainer">
          <Button
            icon={meetIcon}
            onClick={() => router.push(data?.meetingLink)}
          >
            Join Session
          </Button>
        </div>
      )}
    </div>
  );
};

export default CallingCard;
