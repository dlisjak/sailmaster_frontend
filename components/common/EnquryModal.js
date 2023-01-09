// import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import EnquiryForm from "./EnquiryForm";

class EnquryModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessage: false,
    };

    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.enquiryForm.submitSucceeded && this.mounted) {
      this.setState({ showMessage: true });

      setTimeout(function () {
        document.querySelector(".modal").scrollTop = 0;
      }, 2);
    } else {
      if (this.mounted) {
        this.setState({ showMessage: false });
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let offerId = "";

    if (this.props.offerId) {
      offerId = this.props.offerId.toString().split(",");
    }

    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.closeModal}
        dialogClassName="enquiry-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.t("enquiry")}
            <div className="enquiry-modal-title-data">
              {this.props.yachtModel && (
                <div className="enquiry-modal-title-data-item">
                  <span>{this.props.t("model")}:</span>{" "}
                  {this.props.yachtModel}
                </div>
              )}

              {this.props.yachtTerm && (
                <div className="enquiry-modal-title-data-item">
                  <span>{this.props.t("term")}:</span>{" "}
                  {this.props.yachtTerm}
                </div>
              )}

              {this.props.yachtPrice && (
                <div className="enquiry-modal-title-data-item">
                  <span>{this.props.t("price")}:</span>{" "}
                  {this.props.yachtPrice}
                </div>
              )}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.showMessage ? (
            <div>
              <div className="thank-you-message">
                <p>
                  <b>{this.props.t("successful_enquiry")}</b>
                </p>
                <p>{this.props.t("successful_enquiry_message")}</p>
              </div>
              <a
                className="enquiry-link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.vzajemna.si/sl/zavarovanja/zavarovanje-za-tujino/o-zavarovanju-za-tujino/?utm_source=sailmaster&utm_medium=banner&utm_campaign=tujina"
              >
                <img src="/static/media/vzajemna.jpg" alt="vzajemna" />
              </a>
            </div>
          ) : (
            ""
          )}


          <EnquiryForm
            offerId={offerId}
            countries={this.props.countries || []}
            lang={this.props.i18n.language}
          />
        </Modal.Body>
      </Modal>
    );
  }
}
// function mapStateToProps(state) {
//   return {
//     enquiryForm: state.form.enquiryForm || {},
//   };
// }
export default withTranslation()(EnquryModal);
