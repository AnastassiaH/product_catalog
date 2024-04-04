import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.scss";

export const Banner: React.FC = () => {
  const imageArray = [
    `${process.env.PUBLIC_URL}/img/banner-phones.png`,
    `${process.env.PUBLIC_URL}/img/banner-tablets.png`,
    `${process.env.PUBLIC_URL}/img/banner-accessories.png`,
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="container">
      <Slider {...settings}>
        {imageArray.map((image) => (
          <div key={image} className="image-container">
            <img src={image} alt="image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};
