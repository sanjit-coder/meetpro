import React from "react";

const Card = ({ heading, desc, logo, count }) => {
  return (
    <div className="card" >
      <div className="card__info">
        <div className="card__info__left">
          {/* {count !== 0 && (
            <div className="card__info__left__number">{count}</div>
          )} */}
          <div className="card__info__left__text">
            <div className="card__info__left__text__heading">{heading}</div>
            <p>{desc}</p>
          </div>
        </div>
        <div className="card__info__right">
          <img src={logo} alt="Right Arrow" />
        </div>
      </div>
    </div >
  );
};

export default Card;
