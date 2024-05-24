import React, { useRef } from "react";
import Slider from "react-slick";
import invertedComma from "@/assets/images/invertedComma.svg";
import { Rating } from "semantic-ui-react";
import lefttestimonial from "../../assets/images/lefttestimonial.svg";
import righttestimonial from "../../assets/images/rightTestimonial.svg";

const Testimonialcard = ({ callsPage = false, testimonialData }) => {
  const sliderRef = useRef();
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <img src={righttestimonial.src} alt="right testimonial"></img>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <img src={lefttestimonial.src} alt="left testimonial"></img>
      </div>
    );
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "progressive",
    centerPadding: false ? "40px 0 0" : "8px 0 0 ",

    // centerMode: true
  };

  let dumpData = [
    {
      text: "Thank you for building such an empowering tool, especially for designers! The site went from Figma to Framer in less than a week! The site went from Figma to Framer in less than a week! The site went from Figma to Framer in less than.",
      name: "Swapnil Pande",
      service: "1:1 Interview",
      rating: "4",
    },
    {
      text: "Thank you for building such an empowering tool, especially for designers! The site went from Figma to Framer in less than a week! The site went from Figma to Framer in less than a week! The site went from Figma to Framer in less than.",
      name: "Swapnil Pande",
      service: "1:1 Interview",
      rating: "4",
    },
    {
      text: "Thank you for building such an empowering tool, especially for designers! The site went from Figma to Framer in less than a week! The site went from Figma to Framer in less than a week! The site went from Figma to Framer in less than.",
      name: "Swapnil Pande",
      service: "1:1 Interview",
      rating: "4",
    },
    {
      text: "Thank you for building such an empowering tool, especially for designers! The site went from Figma to Framer in less than a week! The site went from Figma to Framer in less than a week! The site went from Figma to Framer in less than.",
      name: "Swapnil Pande",
      service: "1:1 Interview",
      rating: "4",
    },
    {
      text: "Thank you for building such an empowering tool, especially for designers! The site went from Figma to Framer in less than a week! The site went from Figma to Framer in less than a week! The site went from Figma to Framer in less than.",
      name: "Swapnil Pande",
      service: "1:1 Interview",
      rating: "4",
    },
  ];

  return (
    <div
      className={
        callsPage
          ? `testimonialcardContainer testimonialcardContainer__callsPage`
          : `testimonialcardContainer`
      }
    >
      <div className="testimonialcardContainer__slides">
        <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
          {testimonialData &&
            testimonialData?.length > 0 &&
            testimonialData?.map((data) => (
              <>
                <div className="testimonialcardContainer__slides__card">
                  <div className="testimonialcardContainer__slides__card__topContainer">
                    <img
                      src={invertedComma?.src}
                      className="testimonialcardContainer__slides__card__topContainer__img"
                    />
                  </div>
                  <div className="testimonialcardContainer__slides__card__reviewText">
                    {data?.testimonial}
                  </div>

                  <div className="testimonialcardContainer__slides__card__bottomContainer">
                    <div className="testimonialcardContainer__slides__card__bottomContainer__left">
                      <div className="testimonialcardContainer__slides__card__bottomContainer__left__name">
                        {data?.customerName || data?.customer?.name}
                      </div>
                      <div className="testimonialcardContainer__slides__card__bottomContainer__left__service">
                        {data?.serviceTitle || data?.service?.title}
                      </div>
                    </div>
                    <div className="testimonialcardContainer__slides__card__bottomContainer__right">
                      <Rating
                        icon="star"
                        rating={data?.rating}
                        maxRating={5}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </>
            ))}
        </Slider>
        {testimonialData && testimonialData.length > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              position: "relative",
            }}
          >
            <div
              className="testimonialarrow"
              onClick={() => sliderRef?.current?.slickPrev()}
            >
              <img
                src={lefttestimonial.src}
                style={{ width: "100%", height: "100%" }}
              ></img>
            </div>
            <div
              className="testimonialarrow"
              onClick={() => sliderRef?.current?.slickNext()}
            >
              <img
                src={righttestimonial.src}
                style={{ width: "100%", height: "100%" }}
              ></img>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonialcard;
