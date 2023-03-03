import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Popover from 'react-bootstrap/Popover';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';

import Phone from '../public/icons/telefon.svg';
import Heart from '../public/icons/heart.svg';
import LogoSi from '../public/icons/the-sailmaster-si.svg';
import LogoIt from '../public/icons/the-sailmaster-it.svg';
import { WISHLIST_URL } from '../constants/urls';
import QuickContact from '../components/QuickContact';

import { useWishlist } from '../queries/queries';

const Logo = process.env.REACT_APP_LANGUAGE === 'it' ? LogoIt : LogoSi;

const LANGUAGES = {
  si: {
    show: 'SI',
    key: 'si',
    url: 'http://thesailmaster.si',
  },
  it: {
    show: 'IT',
    key: 'it',
    url: 'http://thesailmaster.it',
  },
};

const Lang = ({ lang }) => {
  return (
    <div className="flex">
      <img src={`/media/langs/${lang.key}.svg`} className="flag" alt={lang.key} />
      <span>{lang.show}</span>
    </div>
  );
};

export const Navigation = ({ setShowInquiry }) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const { wishlist } = useWishlist();

  const { i18n, t } = useTranslation('common');
  const language = i18n.language;

  const links = [
    {
      link: t('offers_route'),
      name: t('regular_offer'),
    },
    {
      link: t('destinations_route'),
      name: t('destinations'),
    },
    {
      link: t('contact_route'),
      name: t('contact'),
    },
  ];
  const linkHome = '/';

  const popoverContact = (
    <Popover id="popover-positioned-bottom" title="Popover bottom">
      <QuickContact />
    </Popover>
  );

  return (
    <Navbar variant="light" fixed="top" expand="lg" className="navbar--navbar2" expanded={expanded}>
      <Container>
        <div className="flex">
          <Link className="flex h-[78px] w-[221px] items-center" href={linkHome}>
            <Logo className="w-full" />
          </Link>
        </div>
        <Navbar.Toggle onClick={() => setExpanded(expanded ? false : true)} />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Button size="sm" className="btn--request-offer" onClick={() => setShowInquiry(true)}>
              {t('nav_request_offer')}
            </Button>
            <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverContact}>
              <button type="button" className="btn btn-light btn-sm text-[#323d43]">
                <Phone className="navbar-icon" />
              </button>
            </OverlayTrigger>
            <Link
              onClick={() => setExpanded(false)}
              className="btn btn-light btn-sm flex items-center"
              href={WISHLIST_URL}
            >
              <Heart className="navbar-icon navbar-icon--heart" />
              <Badge pill bg="secondary" className="btn-wishlist__badge">
                {Array.from(wishlist).length}
              </Badge>
            </Link>
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.link}
                className="nav-link"
                aria-current={router.pathname === link.link ? 'page' : null}
              >
                {link.name}
              </Link>
            ))}
            <NavDropdown title={<Lang lang={LANGUAGES[language]} />} id="basic-nav-dropdown">
              {Object.keys(LANGUAGES).map((language, index) => (
                <Dropdown.Item href={LANGUAGES[language].url} key={index}>
                  <Lang lang={LANGUAGES[language]} />
                </Dropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
