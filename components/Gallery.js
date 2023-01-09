import React from "react";
import Carousel from "react-bootstrap/Carousel";
import YouTube from "react-youtube";

export default function Gallery({ images, youtube }) {
  return (
    <Carousel interval={10000000} className="offer-carousel__carousel">
      {youtube && (
        <Carousel.Item>
          <YouTube
            videoId={this.props.youtube}
            opts={{ height: "210", width: "100%" }}
          />
        </Carousel.Item>
      )}
      {images.map((image, i) => (
        <Carousel.Item key={`${image}-${i}`}>
          <div
            className="carousel-offer-item"
            style={{ backgroundImage: `url(${image})` }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
