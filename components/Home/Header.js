import { useTranslation } from 'next-i18next';
import { Parallax, Background } from 'react-parallax';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';

import HomeFilter from '../filter/HomeFilter';
import IconsLine from './IconsLine';

import HEADER from '../../public/media/header-opt.jpg';

const Header = ({ yachtTypes, onSearch }) => {
  const { t } = useTranslation('common');

  const description = t('description')
    .split('\n')
    .map((item, key) => {
      return (
        <span key={key}>
          {item}
          <br />
        </span>
      );
    });

  return (
    <header className="home-header">
      <Parallax className="home-header__paralax" strength={300}>
        <Background className="custom-bg w-full min-h-[1080px]">
          <Image
            src={HEADER}
            alt="Sailmaster - najem jadrnice, katamarana, plovil"
            width={1920}
            height={1080}
          />
        </Background>
        <Container className="home-header__container">
          <div className="home-header__content">
            <h1>{t('page_name')}</h1>
            <h2>{description}</h2>
            <HomeFilter onSubmit={onSearch} yachtTypes={yachtTypes} />
          </div>
        </Container>
        <IconsLine />
      </Parallax>
    </header>
  );
};

export default Header;
