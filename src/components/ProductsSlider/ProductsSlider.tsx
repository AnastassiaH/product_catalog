import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductsSlider.scss";
import { ProductsContext } from "../../context/ProductsContext";
import { ProductCard } from "../ProductCard";

export const ProductsSlider = () => {
  const { goods } = useContext(ProductsContext);
  const preparedGoods = goods
    ? [...goods].sort((a, b) => b.fullPrice - a.fullPrice).slice(0, 10)
    : [];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  console.log(preparedGoods);

  return (
    <div className="products-container">
      <h2 className="products-title">Brand new models</h2>
      {preparedGoods.length && (
        <div className="slider-container">
          <Slider {...settings}>
            {preparedGoods.map((good) => (
              <div key={good.id} className="slider-item">
                <ProductCard product={good} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};
