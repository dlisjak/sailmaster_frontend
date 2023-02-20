import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import HEADER from '../public/media/header-opt.jpg';

const DestinationTeaser = ({ destination, yachtType, t }) => (
  <div className="destination-teaser mb-4">
    <div className="row">
      <div className="w-full px-4 sm:w-2/5">
        {destination?.image ? (
          <Image
            className="destination-teaser__img img-fluid"
            src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}${destination.image.thumbnail}`}
            alt={destination.name}
            width={325}
            height={217}
          />
        ) : (
          <Image
            className="destination-teaser__img img-fluid"
            src={HEADER}
            alt="Najem plovil na Jadranu - TheSailmaster.si"
            width={325}
            height={217}
          />
        )}
      </div>
      <div className="w-full px-4 sm:w-3/5">
        <h1 className="destination-title text-2xl">
          {t('rental_title', {
            yachtType: yachtType ? yachtType : 'Plovil',
            destination: destination ? destination.name : 'na Jadranu',
          })}
        </h1>
        <div
          className="destination-teaser__text"
          dangerouslySetInnerHTML={{
            __html: destination ? destination.text : t('rental_subtitle'),
          }}
        />
      </div>
    </div>
  </div>
);

export default DestinationTeaser;
