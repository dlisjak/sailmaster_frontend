import React from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";

export default class PaymentTypeSi extends React.Component {
  render() {
    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>Modalità di pagamento - TheSailmaster.it</title>
          <meta
            name="description"
            content="TheSailmaster - Modalità di pagamento"
          />
          <meta
            property="og:title"
            content="Modalità di pagamento - TheSailmaster.it"
          />
          <meta
            property="og:description"
            content="TheSailmaster - Modalità di pagamento"
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <h1>Modalità di pagamento</h1>
                <p>
                  Il pagamento della fattura proforma (del preventivo) è
                  possibile solo a mezzo bonifico bancario.
                </p>
                <p>
                  Per garantire i costi di noleggio più economici, abbiamo
                  optato solamente per la modalità di pagamento tramite bonifico
                  bancario, perché è il modo più semplice e non richiede spese
                  aggiuntive (provvigioni).
                </p>
                <p>
                  Eseguire il bonifico bancario tramite una banca di fiducia,
                  posta o tramite web bancari (es. Intesa Sanpaolo Online,
                  UniCredit Banca Online, ecc.)
                </p>
              </div>
            </Col>
          </div>
        </div>
      </FilterSideWrapper>
    );
  }
}
