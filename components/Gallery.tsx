import Image from 'next/image';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import YouTube from 'react-youtube';

export default function Gallery({ yacht }) {
  const { youtube, pictures } = yacht;

  return (
    <Carousel interval={10000000} className="offer-carousel__carousel">
      {youtube && (
        <Carousel.Item>
          <YouTube videoId={this.props.youtube} opts={{ height: '210', width: '100%' }} />
        </Carousel.Item>
      )}
      {pictures.map((image, i) => (
        <Carousel.Item key={`${image}-${i}`}>
          <div className="featuredYacht__imageContainer relative w-full h-full flex overflow-hidden mb-1 aspect-[16/9] md:aspect-[4/3]">
            <Image
              className="carousel-offer-item object-cover"
              src={image}
              alt={`${yacht.yacht_model.name} ${yacht.yacht_model.category_name}`}
              width={480}
              height={325}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
