import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductsSlider.scss";
import { ProductsContext } from "../../context/ProductsContext";
import { ProductCard } from "../ProductCard";
import { Product } from "../../types";
import { Loader } from "../Loader";

type Props = {
  goods: Product[],
  isLoading: boolean
}

export const ProductsSlider: React.FC<Props> = ({ goods, isLoading }) => {

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  if (isLoading) {
    return (<Loader />)
  } 

  return (
    <>
      {goods.length && (
        <div className="slider-container">
          <Slider {...settings}>
            {goods.map((good) => (
              <div key={good.id} className="slider-item">
                <ProductCard product={good} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};
