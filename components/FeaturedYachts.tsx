import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import Image from './Image';
import Location from './Location';
import Properties from './Properties';

import { boatLink, offerLink, offerUrl } from '../utils/url_utils';
import { useFeaturedYachts } from '../queries/queries';

const FeaturedYacht = ({ item }) => {
  const { t } = useTranslation('common');

  const yachtProperties = [
    { name: t('yacht_build_year'), value: item.build_year || '/' },
    {
      name: t('number_cabins_berths'),
      value: `${item.cabins_total} / ${item.berths_total}`,
    },
  ];

  const link = boatLink(item.yacht_id, item.yacht_model_name);

  return (
    <div className="featured-yacht">
      <div>
        <h3 className="featured-yacht__name">
          <Link href={link}>{item.title}</Link>
        </h3>
        {item.price && <h4 className="featured-yacht__price">{item.price}</h4>}
        <Location location={item.location} />
      </div>
      <div>
        {item.image && (
          <div className="featuredYacht__imageContainer relative mb-1 flex aspect-[4/3] w-full overflow-hidden object-cover">
            <Image src={item.image} alt={item.title} width={506} height={380} />
          </div>
        )}
        <div>
          <Properties items={yachtProperties} />
        </div>
      </div>
    </div>
  );
};

const FeaturedYachts = ({ items }) => {
  const { featuredYachts } = useFeaturedYachts();

  return (
    <div className="featured-yachts">
      <div className="row">
        {(featuredYachts || items).results
          .filter((item) => !!item.offer_id)
          .map((item) => (
            <div
              className="flex pl-[15px] pr-[15px] sm:w-1/2 md:w-1/3 xl:w-1/4"
              key={item.yacht_id}
            >
              <FeaturedYacht item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedYachts;
