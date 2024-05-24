import React from "react";
import ColoredButton from "../ColoredButton";
import Image from "next/image";
import rightIcon from "../../assets/images/rightIcon.svg";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import { trackEvent } from "../../utils/ganalytics";
import * as analyticsactions from "../../store/Analytics/actions";
import { useDispatch } from "react-redux";
import getUniqueId from "@/utils/getUniqueId";
import { uuid } from "uuidv4";

const BookSlotCard = ({
  title,
  desc,
  price,
  icon,
  id,
  creatorId,
  duration,
  websiteUrl,
  creatorName,
  username,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  console.log("iconxxx", icon);

  const postAnalyticsData = () => {
    if (typeof window !== undefined) {
      let uid = getUniqueId();
      const data = {
        serviceId: id,
        username: username,
        uuid: uid === null || uid === undefined ? uuid() : uid,
        eventType: "CLICK_PP_BOOK",
      };

      dispatch(analyticsactions.postAnalytics(data));
    }
  };
  return (
    <>
      <div className="bookSlotcard">
        <div className="bookSlotcard__info">
          {icon && (
            <div
              className="icon"
              style={{ width: "32px", height: "32px", position: "relative" }}
            >
              <Image src={icon} objectFit="contain" layout="fill" />
              {/* <img src={icon.src} /> */}
            </div>
          )}
          <div className="textcontainer">
            <div className="textcontainer__heading">{title}</div>
            <div className="textcontainer__text">{`Video Meeting ${duration} mins`}</div>
          </div>
        </div>
        <div className="bookSlotcard__buttoncontainer">
          <div className="bookSlotcard__buttoncontainer__button">
            <ColoredButton
              color="green"
              text={price !== 0 ? `₹ ${price}` : "FREE"}
            />
          </div>
          <div className="bookSlotcard__buttoncontainer__bookbutton">
            {/* <Link href={`/bookSlot/${id}?creatorId=${creatorId}&duration=${duration}`} > */}
            <ColoredButton
              color="black"
              text="Book Slot"
              id={id}
              creatorId={creatorId}
              duration={duration}
              onClick={(value) => {
                if (value === "Book Slot") {
                  // router.push(`/bookSlot/${id}`);
                  trackEvent(`Click_PP_Book_${creatorId}`);
                  postAnalyticsData();
                  router.push(
                    {
                      pathname: `/bookSlot/${id}`,
                      query: { creatorId, duration, websiteUrl, price },
                    },
                    `/bookSlot/${id}`
                  );
                }
              }}
            />
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookSlotCard;
