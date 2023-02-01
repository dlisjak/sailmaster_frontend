import Image from 'next/image';
import { useState } from 'react';
import YouTube from 'react-youtube';

const SliderGallery = ({ yacht }) => {
  const { youtube, pictures } = yacht;
  const [idx, setIdx] = useState(0);

  const handleSliderChange = (newIdx) => {
    if (newIdx < 0) {
      return setIdx(pictures.length - 1);
    }
    if (newIdx > pictures.length - 1) {
      return setIdx(0);
    }
    setIdx(newIdx);
  };

  return (
    <div className="offer-carousel__carousel">
      {youtube && (
        <div className={`carousel-item`}>
          <YouTube videoId={youtube} opts={{ height: '210', width: '100%' }} />
        </div>
      )}
      {pictures.map((image, i) => {
        const loading = i === 0 ? 'eager' : 'lazy';

        return (
          <div className={`carousel-item ${idx === i ? 'active' : ''}`} key={`${image}-${i}`}>
            <div className="featuredYacht__imageContainer relative mb-1 flex aspect-[16/9] h-full w-full overflow-hidden md:aspect-[4/3]">
              {idx === i && (
                <Image
                  className="carousel-offer-item object-cover"
                  src={image}
                  alt={`${yacht.yacht_model.name} ${yacht.yacht_model.category_name}`}
                  width={480}
                  height={325}
                  loading={loading}
                />
              )}
            </div>
          </div>
        );
      })}
      <ol className="carousel-indicators">
        {pictures.map((image, i) => (
          <li className={idx === i ? 'active' : ''} key={`${image}-${i}`}></li>
        ))}
      </ol>
      <button
        className="carousel-control-prev"
        role="button"
        tabIndex={0}
        onClick={() => handleSliderChange(idx - 1)}
      >
        <span aria-hidden="true" className="carousel-control-prev-icon">
          <span className="visually-hidden">Previous</span>
        </span>
      </button>
      <button
        className="carousel-control-next"
        role="button"
        tabIndex={0}
        onClick={() => handleSliderChange(idx + 1)}
      >
        <span aria-hidden="true" className="carousel-control-next-icon">
          <span className="visually-hidden">Next</span>
        </span>
      </button>
    </div>
  );
};

export default SliderGallery;
