// Import react modules
import { CSSTransitionGroup } from "react-transition-group";

// Import other modules
//import { browserHistory } from "react-router-dom";
import { useTranslation } from "next-i18next";
// import { connect } from "react-redux";
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

import SailmasterSiLe from "../icons/SailmasterSiLe";
import SailmasterItLe from "../icons/SailmasterItLe";

class StickyNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.lang = props.i18n.language;
    this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute(route) {
    //const search = browserHistory.getCurrentLocation().search;
    //browserHistory.push({ pathname: route, search: search });
  }

  render() {
    const { t } = useTranslation("common");
    let logo = "";

    if (this.lang === "it") {
      logo = <SailmasterItLe />;
    } else if (this.lang === "si") logo = <SailmasterSiLe />;

    return (
      <div className="sticky-navigation hidden-xs">
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a
                onClick={() =>
                  this.changeRoute(t("home_route"))
                }
              >
                {logo}
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem
                eventKey={1}
                href="#"
                className={
                  this.props.route === t("home_route")
                    ? "active"
                    : ""
                }
                onClick={() =>
                  this.changeRoute(t("home_route"))
                }
              >
                {t("home")}
              </NavItem>
              <NavItem
                eventKey={2}
                href="#"
                className={
                  this.props.route.includes(t("offers_route"))
                    ? "active"
                    : ""
                }
                onClick={() =>
                  this.changeRoute(t("offers_route"))
                }
              >
                {t("regular_offer")}
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem
                eventKey={1}
                href="#"
                className={
                  this.props.route === t("destinations_route")
                    ? "active"
                    : ""
                }
                onClick={() =>
                  this.changeRoute(t("destinations_route"))
                }
              >
                {t("destinations")}
              </NavItem>
              <NavItem
                eventKey={2}
                href="#"
                className={
                  this.props.route === t("contact_route")
                    ? "active"
                    : ""
                }
                onClick={() =>
                  this.changeRoute(t("contact_route"))
                }
              >
                {t("contact")}
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default StickyNavigation;
