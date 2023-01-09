// import { connect } from "react-redux";

import EnquryModal from "./common/EnquryModal";
import { formatOfferPeriod, formatOfferPrice } from "utils/offerUtils";

const EnquryModalConnected = EnquryModal;


export const OfferEnquryModal = ({ offer, showEnquiryModal, setShowEnquiryModal }) => {
  const yacht_model = offer.yacht.yacht_model;
  return (
    <EnquryModalConnected
      showModal={showEnquiryModal}
      closeModal={() => setShowEnquiryModal(false)}
      offerId={offer.id}
      yachtModel={yacht_model.name}
      yachtTerm={formatOfferPeriod(offer)}
      yachtPrice={formatOfferPrice(offer)}
    />
  )
}

export default EnquryModalConnected
