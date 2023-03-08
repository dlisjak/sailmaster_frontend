import Image from 'next/image';
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
            <div className="featuredYacht__imageContainer relative mb-1 flex aspect-[16/9] h-full w-full overflow-hidden md:aspect-[4/3]">
              <Image
                className="carousel-offer-item object-cover"
                src={image}
                alt={`${yacht.yacht_model.name} ${yacht.yacht_model.category_name}`}
                width={480}
                height={325}
                priority={i < 1}
                quality={90}
              />
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
