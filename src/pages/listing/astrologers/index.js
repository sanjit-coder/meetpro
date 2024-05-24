import React from "react";
import Image from "next/image";
import arrowleft from "@/assets/images/arrowleft.svg";
import { Rating } from "semantic-ui-react";
import rightDirection from "@/assets/images/rightDirection.svg";
import { astrologersData } from "@/utils/constants/astrologersData";

const AstrologersSection = () => {
  const redirectToProfile = (link) => {
    if (typeof window !== undefined) {
      window.open(link);
    }
  };
  const AstrologerCard = ({ item }) => {
    return (
      <div
        className="cardsListItem"
        onClick={() => redirectToProfile(item?.profileLink)}
        key={item?.name}
      >
        <div className="cardsListItem_leftContainer">
          <div className="profileImageContainer">
            <Image
              src={item?.imageUrl}
              className="profileImageContainer_picture"
            />
          </div>
          <div className="details">
            <h1>{item?.name}</h1>

            {/* <div className="ratingContainer">
                        {item?.rating !== 0 && (
                          <>
                            <div>Rating:</div>

                            <div>{`${item?.rating} / 5`}</div>
                            <div
                              style={{ display: "flex", alignSelf: "center" }}
                            >
                              <Rating
                                icon="star"
                                defaultRating={1}
                                size="small"
                                disabled
                              />
                            </div>
                          </>
                        )}
                      </div> */}
          </div>
        </div>
        <div
          className="cardsListItem_rightContainer"
          onClick={() => redirectToProfile(item?.profileLink)}
        >
          <Image src={rightDirection} width="24" height="24" />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="cardsParentContainer">
        <div className="cardsContainer">
          <div className="cardsList">
            {astrologersData &&
              astrologersData.map((item) => <AstrologerCard item={item} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default AstrologersSection;
