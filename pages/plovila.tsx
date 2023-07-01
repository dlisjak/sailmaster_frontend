import Link from 'next/link';
import classNames from 'classnames';
import Container from 'react-bootstrap/Container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../next-i18next.config';
import { getYachtBrands, getYachtModels } from '../queries/getters';

const VsaPlovila = ({ yachts }) => {
  return (
    <div className={classNames('base-layout')}>
      <Container>
        <h1>Vsa plovila</h1>
        <ul className="columns-2 md:columns-3 lg:columns-4">
          {yachts.map(({ brand, models }) => {
            return (
              <li key={brand.value} className="inline-block w-full p-2 pb-4">
                <Link
                  className="text-lg font-bold text-primary"
                  href={`/najem-plovil?yacht__yacht_model__builder=${brand.value}`}
                  target="_blank"
                >
                  {brand.label}
                </Link>
                <ul>
                  {models.map((model) => (
                    <li className="" key={model.value}>
                      <Link
                        href={`/najem-plovil?yacht__yacht_model__builder=${brand.value}&yacht__yacht_model__parent=${model.value}`}
                        target="_blank"
                      >
                        {model.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
};

export const getStaticProps = async (ctx) => {
  const translations = await serverSideTranslations(ctx.locale, ['common'], nextI18nextConfig);

  const brands = await getYachtBrands();
  const promises = [];

  brands.forEach((brand, i) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const models = await getYachtModels(brand.value);
          resolve({ brand, models });
        } catch (err) {
          resolve({ brand });
        }
      }, 300 * i);
    });

    promises.push(promise);
  });

  const yachts = await Promise.all(promises).then((arr) => arr.flat());

  return {
    props: {
      yachts,
      ...translations,
    },
  };
};

export default VsaPlovila;
