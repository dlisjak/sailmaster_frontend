// import { connect } from "react-redux";
import { SubmissionError } from "redux-form";
import { browserHistory } from "react-router-dom";
import LoginForm from "../login/LoginForm";
import RegisterForm from "../register/RegisterForm";
import ForgotPasswordForm from "../forgot-password/ForgotPasswordForm";
import Close from "../../icons/Close";

import { useTranslation } from "next-i18next";

import { Modal, Row, Col } from "react-bootstrap";

class AuthModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forgotPassword: false,
      type: this.props.type,
    };

    // Bind functions
    this.close = this.close.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
    this.submitForgotPasswordForm = this.submitForgotPasswordForm.bind(this);
    this.submitRegisterForm = this.submitRegisterForm.bind(this);
    this.toggleForgotPassword = this.toggleForgotPassword.bind(this);
    this.changeType = this.changeType.bind(this);
  }

  // Change modal type
  // @param type: 'REGISTER' or 'LOGIN'
  changeType(type) {
    this.setState({ type });
  }

  // Handle login form submit
  submitLoginForm(values) {
    this.props.dispatch({ type: "LOGIN_SAGA", login: values });
  }

  // Handle forgot password form submit
  submitForgotPasswordForm(values) {
    console.log(values);
  }

  // Handle register form submit
  submitRegisterForm(values) {
    const booking = JSON.parse(JSON.stringify(values));
    booking["booking"] =
      browserHistory.getCurrentLocation().pathname === "/booking/details"
        ? true
        : false;
    this.props.dispatch({ type: "REGISTER_SAGA", register: booking });
  }

  // Toggle forgo password state
  toggleForgotPassword() {
    this.setState({ forgotPassword: !this.state.forgotPassword });
  }

  // Render footer (left side)
  // @param title_key: title key for i18n
  // @param link_key: link key for i18n
  // @param type: 'REGISTER' or 'LOGIN'
  renderFooter(title_key, link_key, type) {
    const { t } = useTranslation("common");
    return (
      <div className="auth-modal-footer">
        <div className="footer-title">
          {this.props
            .t("" + title_key)
            .split("\n")
            .map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
        </div>
        <div
          className="footer-link"
          onClick={() => {
            this.changeType(type);
          }}
        >
          {t("" + link_key)}
        </div>
      </div>
    );
  }

  // Render forgot password body
  renderForgotPassword() {
    const { t } = useTranslation("common");

    return (
      <div className="forgot-password-body">
        <div>
          <img
            src="/media/back.jpg"
            onClick={this.toggleForgotPassword}
          />
        </div>
        <div className="forgot-password-text">
          {t("FORGOT_PASSWORD_TEXT")
            .split("\n")
            .map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
        </div>
        <div className="forgot-password-form">
          <ForgotPasswordForm onSubmit={this.submitForgotPasswordForm} />
        </div>
      </div>
    );
  }

  // Render login body
  renderLogin() {
    const { t } = useTranslation("common");
    if (this.state.forgotPassword) {
      return this.renderForgotPassword();
    }

    return (
      <div>
        <LoginForm onSubmit={this.submitLoginForm} />
        <div className="forgot-password" onClick={this.toggleForgotPassword}>
          {t("FORGOT_PASSWORD")}
        </div>
      </div>
    );
  }

  // Render register body
  renderRegister() {
    return (
      <div>
        <RegisterForm onSubmit={this.submitRegisterForm} />
      </div>
    );
  }

  // Render body
  renderBody() {
    switch (this.state.type) {
      case "LOGIN":
        return this.renderLogin();
      case "REGISTER":
        return this.renderRegister();
    }
  }

  // Get modal title (left side)
  getTitle() {
    const { t } = useTranslation("common");

    switch (this.state.type) {
      case "LOGIN":
        return t("LOGIN");
      case "REGISTER":
        return t("REGISTER");
    }
  }

  // Get modal footer (left side)
  getFooter() {
    switch (this.state.type) {
      case "LOGIN":
        return this.renderFooter(
          "NOT_A_MEMBER_YET",
          "REGISTER_NOW",
          "REGISTER"
        );
      case "REGISTER":
        return this.renderFooter("ALREADY_A_MEMBER", "LOGIN_HERE", "LOGIN");
    }
  }

  // Close modal
  close() {
    const { dispatch } = this.props;

    switch (this.state.type) {
      case "LOGIN":
        dispatch({
          type: "LOGIN_MODAL",
          login: false,
        });
        return;

      case "REGISTER":
        dispatch({
          type: "REGISTER_MODAL",
          register: false,
        });
        return;
    }
  }

  render() {
    const { t } = useTranslation("common");
    const title = this.getTitle();
    const footer = this.getFooter();
    const body = this.renderBody();

    return (
      <Modal
        show={this.props.openModal}
        onHide={this.close}
        dialogClassName="auth-modal"
        bsSize={this.state.type == "REGISTER" ? "lg" : undefined}
      >
        <Modal.Body>
          <div className="row">
            <Col
              xs={12}
              sm={this.state.type == "REGISTER" ? 3 : 4}
              className="gradient-background"
            >
              <div className="auth-modal-title">{title}</div>
              {footer}
            </Col>
            <Col
              xs={12}
              sm={this.state.type == "REGISTER" ? 9 : 8}
              className="auth-modal-body"
            >
              {this.state.forgotPassword ? (
                <div></div>
              ) : (
                <div className="close-wrapper" onClick={this.close}>
                  <Close />
                </div>
              )}
              {body}
            </Col>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AuthModal;
