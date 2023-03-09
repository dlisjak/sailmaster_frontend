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
        console.log(image.replaceAll(' ', '%20'));
        return (
          <Carousel.Item key={`${image}-${i}`}>
            <div
              className="carousel-offer-item"
              style={{ backgroundImage: `url("${image.replaceAll(' ', '%20')}")` }}
            />
          </Carousel.Item>
        );
      })}
    </Slider>
  );
}
