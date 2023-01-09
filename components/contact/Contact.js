import { Row, Col } from "react-bootstrap";
import { withTranslation, Trans } from "react-i18next";
import { Helmet } from "react-helmet";
import ContactForm from "./ContactForm";
import FilterSideWrapper from "../common/FilterSideWrapper";
import Mail from "../icons/Mail";
import Phone from "../icons/Phone";
import Smartphone from "../icons/Smartphone";
import Skype from "../icons/SkypeNew";

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showContactForm: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contactForm.submitSucceeded) {
      this.setState({ showContactForm: false });

      // this.props.contactForm.values.name
    }
  }

  componentDidUpdate() {
    if (!this.thankYouRef) {
      return;
    }
    this.thankYouRef.scrollIntoView({ behavior: "smooth" });
    window.scroll({
      top: this.thankYouRef.offsetTop - 100,
      behavior: "smooth",
    });
  }

  render() {
    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>{this.props.t("contact_seo_title")}</title>
          <meta
            name="description"
            content={this.props.t("contact_seo_desc")}
          />
          <meta
            property="og:title"
            content={this.props.t("contact_seo_title")}
          />
          <meta
            property="og:description"
            content={this.props.t("contact_seo_desc")}
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <h1>{this.props.t("contact_us")}</h1>
                <Row className="contact-data">
                  <div className="contact-data-inner">
                    <Col xs={12} sm={6}>
                      <ul>
                        <li>{this.props.t("company_name")}</li>
                        <li>{this.props.t("company_address")}</li>
                        <li>{this.props.t("company_zip")}</li>
                      </ul>
                      <ul>
                        <li>{this.props.t("tax_number")}</li>
                        <li>{this.props.t("tax_payer")}</li>
                        <li>{this.props.t("company_number")}</li>
                      </ul>
                    </Col>
                    <Col xs={12} sm={6}>
                      <ul className="icons-ul">
                        <li>
                          <div className="contact-icon">
                            <Mail />
                          </div>
                          {this.props.t("mail")}
                        </li>
                        <li>
                          <div className="contact-icon">
                            <Skype />
                          </div>
                          {this.props.t("skype")}
                        </li>
                        <li>
                          <div className="contact-icon">
                            <Phone />
                          </div>
                          {this.props.t("phone386")}
                        </li>
                        <li>
                          <div className="contact-icon">
                            <Smartphone />
                          </div>
                          {this.props.t("mobile_phone386")}
                        </li>
                      </ul>
                    </Col>

                    <Col xs={12} sm={12} className="last-ul">
                      <ul>
                        <li>{this.props.t("contact_info_1")}</li>
                        <li>{this.props.t("contact_info_2")}</li>
                        <li>{this.props.t("contact_info_3")}</li>
                      </ul>
                    </Col>
                  </div>
                </Row>
                <p>{this.props.t("contact_text")}</p>

                {!this.state.showContactForm ? (
                  <div
                    className="thank-you-message"
                    ref={(section) => {
                      this.thankYouRef = section;
                    }}
                  >
                    <p>
                      <b>{this.props.t("successful_email")}</b>
                    </p>
                    <p>
                      <Trans
                        i18nKey="successful_email_1"
                        value={
                          this.props.contactForm.values &&
                          this.props.contactForm.values.name
                        }
                      />
                    </p>
                  </div>
                ) : (
                  ""
                )}

                <ContactForm lang={this.props.i18n.language} />
              </div>
            </Col>
          </Row>
        </div>
      </FilterSideWrapper>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     contactForm: state.form.contactForm || {},
//   };
// }

export default withTranslation()(Contact);
