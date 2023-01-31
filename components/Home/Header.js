import { useTranslation } from 'next-i18next';
import { Parallax, Background } from 'react-parallax';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';

import IconsLine from './IconsLine';
import HomeFilter from '../filter/HomeFilter';

import HEADER from '../../public/media/header-opt.jpg';

const Header = () => {
  const { t } = useTranslation('home');

  return (
    <header className="home-header">
      <Parallax className="home-header__paralax" strength={300}>
        <Background className="custom-bg w-full min-h-[1080px]">
          <Image
            src={HEADER}
            alt="Sailmaster - najem jadrnice, katamarana, plovil"
            width={1920}
            height={1080}
            priority
          />
        </Background>
        <Container className="home-header__container">
          <div className="home-header__content">
            <div className='flex flex-col max-w-[640px] m-auto'>
              <h1>{t("index_h1_title")}</h1>
              <p className="text-white text-center lg:text-lg lg:mb-12 uppercase">{t('index_subtitle')}</p>
            </div>
            <HomeFilter />
          </div>
        </Container>
        <IconsLine />
      </Parallax>
    </header>
  );
};

export default Header;
