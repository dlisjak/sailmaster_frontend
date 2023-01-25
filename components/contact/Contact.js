import { Row, Col } from "react-bootstrap";
import { withTranslation, Trans } from "react-i18next";
import { useTranslation } from "next-i18next";
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
    const { t } = useTranslation("common");

    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>{t("contact_seo_title")}</title>
          <meta
            name="description"
            content={t("contact_seo_desc")}
          />
          <meta
            property="og:title"
            content={t("contact_seo_title")}
          />
          <meta
            property="og:description"
            content={t("contact_seo_desc")}
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <h1>{t("contact_us")}</h1>
                <div className="row contact-data">
                  <div className="contact-data-inner">
                    <Col xs={12} sm={6}>
                      <ul>
                        <li>{t("company_name")}</li>
                        <li>{t("company_address")}</li>
                        <li>{t("company_zip")}</li>
                      </ul>
                      <ul>
                        <li>{t("tax_number")}</li>
                        <li>{t("tax_payer")}</li>
                        <li>{t("company_number")}</li>
                      </ul>
                    </Col>
                    <Col xs={12} sm={6}>
                      <ul className="icons-ul">
                        <li>
                          <div className="contact-icon">
                            <Mail />
                          </div>
                          {t("mail")}
                        </li>
                        <li>
                          <div className="contact-icon">
                            <Skype />
                          </div>
                          {t("skype")}
                        </li>
                        <li>
                          <div className="contact-icon">
                            <Phone />
                          </div>
                          {t("phone386")}
                        </li>
                        <li>
                          <div className="contact-icon">
                            <Smartphone />
                          </div>
                          {t("mobile_phone386")}
                        </li>
                      </ul>
                    </Col>

                    <Col xs={12} sm={12} className="last-ul">
                      <ul>
                        <li>{t("contact_info_1")}</li>
                        <li>{t("contact_info_2")}</li>
                        <li>{t("contact_info_3")}</li>
                      </ul>
                    </Col>
                  </div>
                </div>
                <p>{t("contact_text")}</p>

                {!this.state.showContactForm ? (
                  <div
                    className="thank-you-message"
                    ref={(section) => {
                      this.thankYouRef = section;
                    }}
                  >
                    <p>
                      <b>{t("successful_email")}</b>
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
          </div>
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

export default Contact;
