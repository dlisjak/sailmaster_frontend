// Import react modules
import { CSSTransitionGroup } from "react-transition-group";

// Import other modules
//import { browserHistory } from "react-router-dom";
import { withTranslation } from "react-i18next";
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
                  this.changeRoute(this.props.t("home_route"))
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
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withTranslation()(StickyNavigation);
