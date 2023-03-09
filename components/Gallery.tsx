import Slider from 'react-slick';

import Carousel from 'react-bootstrap/Carousel';
import YouTube from 'react-youtube';

import '../node_modules/slick-carousel/slick/slick.css';

export default function Gallery({ images, youtube }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => <ol className="carousel-indicators">{dots}</ol>,
    customPaging: () => <div className="" />,
  };

  return (
    <Slider {...settings}>
      {youtube && (
        <Carousel.Item>
          <YouTube videoId={youtube} opts={{ height: '210', width: '100%' }} />
        </Carousel.Item>
      )}
      {images.map((image, i) => {
        return (
          <Carousel.Item>
            <div
              className="carousel-offer-item"
              style={{ backgroundImage: `url(${image})` }}
              key={`${image}-${i}`}
            />
          </Carousel.Item>
        );
      })}
    </Slider>
  );
}
