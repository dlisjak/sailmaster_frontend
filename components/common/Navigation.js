// Import react modules
import { CSSTransitionGroup } from "react-transition-group";

// Import other modules
import { browserHistory } from "react-router-dom";
import { withTranslation } from "react-i18next";
// import { connect } from "react-redux";
import Link from "next/link";
import {
  Navbar,
  Nav,
  NavDropdown,
  NavItem,
  DropdownItem,
  Row,
  Col,
} from "react-bootstrap";
import i18n from "./../../i18n.js";

// Icons
import Mail from "../icons/Mail";
import Phone from "../icons/Phone";
import Smartphone from "../icons/Smartphone";
import Skype from "../icons/Skype";
import SailmasterSiPo from "../icons/SailmasterSiPo";
import SailmasterItPo from "../icons/SailmasterItPo";
import Heart from "../icons/Heart";
import generateQueryString from "../common/utils/generateQueryString";

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    // All langs
    this.langs = {
      si: {
        show: "SI",
        key: "si",
      },
      it: {
        show: "IT",
        key: "it",
      },
    };

    // Bind functions
    this.handleChangeLang = this.handleChangeLang.bind(this);
    this.handleShowOtherLangs = this.handleShowOtherLangs.bind(this);
    this.changeRoute = this.changeRoute.bind(this);
  }

  /*
  Set langs when component did mount
  */
  componentWillMount() {
    // Get all langs
    let allLangs = this.langs;

    // Get active lang
    let activeLang = allLangs[this.props.i18n.options.lng];

    // Get other langs
    let langs = [];
    Object.keys(allLangs).forEach(function (key) {
      if (key !== activeLang.key) {
        langs.push(allLangs[key]);
      }
    });

    // Set state
    this.setState({
      langs: {
        activeLang: activeLang,
        otherLangs: langs,
      },
    });
  }

  changeRoute(route) {
    const search = browserHistory.getCurrentLocation().search;
    browserHistory.push({ pathname: route, search: search });
  }

  /*
  Delete lang from langs
  */
  handleDeleteLangFromLangs(langs, lang) {
    let _langs = [];

    langs.forEach(function (_lang) {
      if (_lang.key !== lang.key) {
        _langs.push(_lang);
      }
    });

    return _langs;
  }

  /*
    Change lang
  */
  handleChangeLang(lang) {
    // Get all langs
    let allLangs = this.langs;

    // Get active lang
    let activeLang = allLangs[lang];
    if (activeLang.key === "si") {
      window.location.href = "http://thesailmaster.si";
    } else if (activeLang.key === "it") {
      window.location.href = "http://thesailmaster.it";
    }
  }

  handleShowOtherLangs() {
    this.setState({ showLangs: !this.state.showLangs });
  }

  render() {
    if (!this.state) {
      return <div>loading</div>;
    }

    let logo = "";

    if (this.state.langs.activeLang.key === "it") {
      logo = <SailmasterItPo />;
    } else if (this.state.langs.activeLang.key === "si")
      logo = <SailmasterSiPo />;

    const langs = this.state.langs.otherLangs.map((lang) => (
      <li onClick={() => this.handleChangeLang(lang.key)} key={lang.key}>
        <img
          src={`/static/media/langs/${lang.key}.svg`}
          className="flag"
          alt={lang.key}
        />
        <span>{lang.show}</span>
      </li>
    ));

    let countries = <div></div>;
    if (this.state.showLangs) {
      countries = (
        <div className="countries">
          <ul>{langs}</ul>
        </div>
      );
    }

    const route = browserHistory.getCurrentLocation().pathname;
    const query = browserHistory.getCurrentLocation().query || {};

    return (
      <div className="navigation">
        <div className="top-navigation-border left-border"></div>
        <div className="top-navigation-border right-border"></div>
        <Navbar collapseOnSelect>
          {countries}
          <Col xs={6} className="navigation-top hidden-xs">
            <div className="top-item item-mail">
              <div className="top-navigation-flex">
                <Mail />
                <span>{this.props.t("mail")}</span>
              </div>
            </div>
            <div className="top-item item-smartphone hidden-xs">
              <div className="top-navigation-flex">
                <Smartphone />
                <span>{this.props.t("mobile_phone")}</span>
              </div>
            </div>

            {/*<div className="top-item item-skype hidden-sm">
			    		<div className="top-navigation-flex">
			    			<Skype />
			    			<span>{this.props.t('nav:skype')}</span>
			    		</div>
		    		</div>*/}
          </Col>
          <Col xs={6} className="navigation-top top-right">
            <div className="top-item lang" onClick={this.handleShowOtherLangs}>
              <img
                src={`/static/media/langs/${this.state.langs.activeLang.key}.svg`}
                className="flag"
              />
              <span>{this.state.langs.activeLang.show}</span>
            </div>

            <div className="top-item item-phone hidden-xs">
              <div className="top-navigation-flex">
                <Phone />
                <span>{this.props.t("phone")}</span>
              </div>
            </div>

            <div className="top-item item-heart hidden-xs">
              <Link href={this.props.t("wishlist_route")}>
                <div className="top-navigation-flex">
                  <Heart />
                  <span>{this.props.t("wishlist_nav")}</span>
                  <span className="wishlist-span">
                    {this.props.wishlist.count}
                  </span>
                </div>
              </Link>
            </div>
          </Col>
          <Navbar.Header>
            <Navbar.Brand>
              <div
                onClick={() =>
                  this.changeRoute(this.props.t("home_route"))
                }
              >
                {logo}
              </div>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem
                eventKey={1}
                href="#"
                className={
                  this.props.route === this.props.t("home_route")
                    ? "active"
                    : ""
                }
                onClick={() =>
                  this.changeRoute(this.props.t("home_route"))
                }
              >
                {this.props.t("home")}
              </NavItem>
              <NavItem
                eventKey={2}
                href="#"
                className={
                  this.props.route.includes(this.props.t("offers_route"))
                    ? "active"
                    : ""
                }
                onClick={() =>
                  this.changeRoute(this.props.t("offers_route"))
                }
              >
                {this.props.t("regular_offer")}
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem
                eventKey={1}
                href="#"
                className={
                  this.props.route === this.props.t("destinations_route")
                    ? "active"
                    : ""
                }
                onClick={() =>
                  this.changeRoute(this.props.t("destinations_route"))
                }
              >
                {this.props.t("destinations")}
              </NavItem>
              <NavItem
                eventKey={2}
                href="#"
                className={
                  this.props.route === this.props.t("contact_route")
                    ? "active"
                    : ""
                }
                onClick={() =>
                  this.changeRoute(this.props.t("contact_route"))
                }
              >
                {this.props.t("contact")}
              </NavItem>
              {this.props.wishlist.count && this.props.wishlist.count > 0 ? (
                <NavItem
                  eventKey={2}
                  href="#"
                  className={"visible-xs"}
                  onClick={() =>
                    this.changeRoute(this.props.t("wishlist_route"))
                  }
                >
                  {this.props.t("wishlist_nav")}
                </NavItem>
              ) : (
                <NavItem
                  eventKey={2}
                  href="#"
                  className={"visible-xs"}
                  onClick={() =>
                    this.changeRoute(this.props.t("wishlist_route"))
                  }
                >
                  {this.props.t("wishlist_nav")}
                </NavItem>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     wishlist: state.wishlist || {},
//   };
// }
export default withTranslation()(Navigation);
