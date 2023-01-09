import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Button } from "react-bootstrap";

class CookieLaw extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closedCookies: localStorage.getItem("closedCookies"),
    };

    this.handleCloseCookies = this.handleCloseCookies.bind(this);
  }

  handleCloseCookies() {
    localStorage.setItem("closedCookies", true);
    this.setState({ closedCookies: true });
  }

  render() {
    if (this.state.closedCookies) {
      return <div />;
    }

    return (
      <div className="CookieLaw">
        <div className="container">
          <div className="row">
            <Col xs={12}>
              <div className="CookieLaw__inner">
                <Col xs={12} sm={10} className="CookieLaw__left">
                  <div className="CookieLaw__left__info">i</div>
                  <div
                    className="CookieLaw__left__infoText"
                    dangerouslySetInnerHTML={{ __html: this.props.text }}
                  ></div>
                </Col>
                <Col xs={12} sm={2} className="CookieLaw__right">
                  <Button
                    className="gold-button"
                    onClick={this.handleCloseCookies}
                  >
                    {this.props.buttonText}
                  </Button>
                </Col>
              </div>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

CookieLaw.defaultProps = {
  text: "",
};

CookieLaw.propTypes = {
  text: PropTypes.string,
};

export default CookieLaw;
