import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import Image from './Image';
import Location from './Location';
import Properties from './Properties';

import { offerUrl } from '../utils/url_utils';

const FeaturedYacht = ({ item }) => {
  const { t } = useTranslation('common');

  const yachtProperties = [
    { name: t('yacht_build_year'), value: item.build_year || '/' },
    {
      name: t('number_cabins_berths'),
      value: `${item.cabins_total} / ${item.berths_total}`,
    },
  ];
  return (
    <div className="featured-yacht">
      <div>
        <h3 className="featured-yacht__name">
          <Link href={offerUrl(item.yacht_id, item.yacht_model_name, item.offer_id)}>
            {item.title}
          </Link>
        </h3>
        {item.price && <h4 className="featured-yacht__price">{item.price}</h4>}
        <Location location={item.location} />
      </div>
      <div>
        {item.image && (
          <div className="featuredYacht__imageContainer relative w-full flex overflow-hidden mb-1 aspect-[4/3]">
            <Image src={item.image} alt={item.title} width={640} height={640} />
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
  return (
    <div className="featured-yachts">
      <div className="row">
        {items
          .filter((item) => !!item.offer_id)
          .map((item) => (
            <div
              className="flex xl:w-1/4 pr-4 pl-4 md:w-1/3 pr-4 pl-4 sm:w-1/2 pr-4 pl-4"
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
