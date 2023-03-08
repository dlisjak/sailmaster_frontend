import Carousel from 'react-bootstrap/Carousel';
import YouTube from 'react-youtube';

export default function Gallery({ yacht, priority = false }) {
  const { youtube, pictures } = yacht;

  return (
    <Carousel interval={10000000} className="offer-carousel__carousel">
      {youtube && (
        <Carousel.Item>
          <YouTube videoId={youtube} opts={{ height: '210', width: '100%' }} />
        </Carousel.Item>
      )}
      {pictures.map((image, i) => {
        return (
          <Carousel.Item key={`${image}-${i}`}>
            <div className="carousel-offer-item" style={{ backgroundImage: `url(${image})` }} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
