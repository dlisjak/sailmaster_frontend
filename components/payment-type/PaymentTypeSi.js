import React from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";

export default class PaymentTypeSi extends React.Component {
  render() {
    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>
            Način plačila - TheSailmaster.si | Najem jadrnice, katamarana, jahte
            - last minute
          </title>
          <meta
            name="description"
            content="Način plačila - rezervacije jadrnice, jahte ali katamarana je možno le z bančnim plačilom predračuna."
          />
          <meta
            property="og:title"
            content="Način plačila - TheSailmaster.si | Najem jadrnice, katamarana, jahte - last minute"
          />
          <meta
            property="og:description"
            content="Način plačila - rezervacije jadrnice, jahte ali katamarana je možno le z bančnim plačilom predračuna."
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <h1>Način plačila</h1>
                <p>Plačilo predračuna je možno le z bančnim nakazilom!</p>
                <p>
                  Zaradi zagotavljanja najnižjih stroškov najema plovil, smo se
                  odločili le za možnost plačila z bančnim nakazilom, ki je
                  najpreprostejša pot znotraj negotovinskega plačilnega prometa
                  in ne zahteva nikakršnih dodatnih stroškov (provizij).
                </p>
                <p>
                  Bančno nakazilo izvedete po standardni poti tako, da položnico
                  plačate na banki, pošti ali preko spletnih aplikacij bank
                  (npr. EBank pri Addiko Bank, Klik pri NLB, Bankanet pri NKBM,
                  Banka IN pri Intesa Sanpaolo, SKB NET, ipd.).
                </p>
              </div>
            </Col>
          </div>
        </div>
      </FilterSideWrapper>
    );
  }
}
