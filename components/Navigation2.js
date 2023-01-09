import Image from "next/image";
import React, { useState } from "react";
import { useTranslation } from 'next-i18next';
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Popover from "react-bootstrap/Popover";
import Badge from "react-bootstrap/Badge";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";

import Phone from "../public/icons/telefon.svg";
import Heart from "../public/icons/heart.svg";
import LogoSi from "../public/icons/the-sailmaster-si.svg";
import LogoIt from "../public/icons/the-sailmaster-it.svg";
import { language, WISHLIST_URL } from "../constants";
import QuickContact from "components/QuickContact";

const Logo = process.env.REACT_APP_LANGUAGE === "it" ? LogoIt : LogoSi;

const LANGUAGES = {
  si: {
    show: "SI",
    key: "si",
    url: "http://thesailmaster.si",
  },
  it: {
    show: "IT",
    key: "it",
    url: "http://thesailmaster.it",
  },
};

const Lang = ({ lang }) => {
  return (
    <div className="flex">
      <Image
        src={`/media/langs/${lang.key}.svg`}
        className="flag"
        alt={lang.key}
        width={24}
        height={12}
      />
      <span>{lang.show}</span>
    </div>
  );
};

export const Navigation2 = ({ wishlistCount, onShowInquiry }) => {
  const [expanded, setExpanded] = useState(false);

  const { t } = useTranslation();

  const links = [
    {
      link: t("offers_route"),
      name: t("regular_offer"),
    },
    {
      link: t("destinations_route"),
      name: t("destinations"),
    },
    {
      link: t("contact_route"),
      name: t("contact"),
    },
  ];
  const linkHome = "/";

  const popoverContact = (
    <Popover id="popover-positioned-bottom" title="Popover bottom">
      <QuickContact />
    </Popover>
  );

  return (
    <Navbar
      variant="light"
      fixed="top"
      expand="lg"
      className="navbar--navbar2"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand>
          <Link className="d-inline-block" href={linkHome}>
            <Logo />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Button
              size="sm"
              className="btn--request-offer"
              onClick={onShowInquiry}
            >
              {t("nav_request_offer")}
            </Button>
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="bottom"
              overlay={popoverContact}
            >
              <Button size="sm" variant="light">
                <Phone className="navbar-icon" />
              </Button>
            </OverlayTrigger>
            <Link
              onClick={() => setExpanded(false)}
              href="/seznam-zelja">
              <Button size="sm" variant="light">
                <Heart className="navbar-icon navbar-icon--heart" />
                <Badge pill variant="secondary" className="btn-wishlist__badge">
                  {wishlistCount}
                </Badge>
              </Button>
            </Link>
            {links.map((link, index) => (
              <Nav.Item
                onClick={() => setExpanded(false)}
                key={index} href={link.link} as={Link} className="nav-link">
                {link.name}
              </Nav.Item>
            ))}
            <NavDropdown
              title={<Lang lang={LANGUAGES[language]} />}
              id="basic-nav-dropdown"
            >
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

// function mapStateToProps(state) {
//   return {
//     wishlistCount: state.wishlist.count,
//   };
// }
export default Navigation2;
