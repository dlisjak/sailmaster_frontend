import { Row, Col } from "react-bootstrap";
import { withTranslation, Trans } from "react-i18next";
import { Helmet } from "react-helmet";
import PartnersForm from "./PartnersForm";
import FilterSideWrapper from "../common/FilterSideWrapper";

class Partners extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPartnersForm: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.partnersForm.submitSucceeded) {
      this.setState({ showPartnersForm: false });

      // this.props.contactForm.values.name
    }
  }

  render() {
    const { t } = useTranslation("common");

    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>{t("partners_seo_title")}</title>
          <meta
            name="description"
            content={t("partners_seo_desc")}
          />
          <meta
            property="og:title"
            content={t("partners_seo_title")}
          />
          <meta
            property="og:description"
            content={t("partners_seo_desc")}
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <h1>{t("for_partners")}</h1>
                <p>
                  <Trans
                    i18nKey="partners_text"
                    useDangerouslySetInnerHTML={true}
                  />
                </p>

                {!this.state.showPartnersForm ? (
                  <div className="thank-you-message">
                    <p>
                      <b>{t("successful_email")}</b>
                    </p>
                    <p>
                      <Trans
                        i18nKey="successful_email_1"
                        value={
                          this.props.partnersForm.values &&
                          this.props.partnersForm.values.person
                        }
                      />
                    </p>
                  </div>
                ) : (
                  ""
                )}

                <PartnersForm lang={this.props.i18n.language} />
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
//     partnersForm: state.form.partnersForm || {},
//   };
// }

export default Partners;
