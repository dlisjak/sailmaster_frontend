import React from "react";
import { Row, Col, Accordion } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";
import Panel from "components/misc/Panel";
import { getSelectedFromQuery } from 'utils/miscUtils';

export default class FaqIt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: getSelectedFromQuery(props.location.search)
    };
  }

  render() {
    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>Domande frequenti - TheSailmaster.it</title>
          <meta
            name="description"
            content="TheSailmaster - Domande frequenti"
          />
          <meta
            property="og:title"
            content="Domande frequenti - TheSailmaster.it"
          />
          <meta
            property="og:description"
            content="TheSailmaster - Domande frequenti"
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <h1>Domande frequenti</h1>
                <Accordion defaultActiveKey={this.state.selected}>
                  <Panel
                    header="Non sono mai andato in barca a vela . Posso noleggiare un'imbarcazione a vela nonostante ciò?"
                    eventKey="1"
                  >
                    Sicuramente avrete bisogno di uno skipper (una persona con
                    esperienza, con una licenza valida e in grado di gestire la
                    ricetrasmittente). Può essere un membro del vostro
                    equipaggio oppure da noi ingagiato, inclusa l'imbarcazione.
                  </Panel>
                  <Panel
                    header="Come scegliere un’imbarcazione su misura?"
                    eventKey="2"
                  >
                    La scelta dell'imbarcazione (lunghezza, tipo ed
                    equipaggiamento) dipende soprattutto dal numero di persone,
                    dallo scopo e dal tipo di navigazione. Chiamateci, saremo
                    ben lieti di consigliarvi.
                  </Panel>
                  <Panel
                    header="Quanto costa il noleggio dello skipper?"
                    eventKey="3"
                  >
                    Il costo normale va da 100 a 150 euro giornalieri ai quali
                    bisogna aggiungere il vitto. Più persone d'equipaggio ci
                    sono, meno viene il costo dello skipper a persona.
                  </Panel>
                  <Panel
                    header="Quando avvengono il ritiro e la cosegna dell’imbarcazione?"
                    eventKey="4"
                  >
                    Di regola il ritiro dell’imbarcazione (il check in) avviene
                    alle 17.00 e il tempo della consegna dell'imbarcazione a
                    fine crociera (il check out) avviene alle ore 9.00. A
                    richiesta dei clienti possiamo sistemare il check in anche
                    molto prima delle 17.00, ma esaudire questa richiesta non è
                    sempre possibile.
                  </Panel>
                  <Panel
                    header="Ho altre domande e vorrei parlare con un consulente?"
                    eventKey="5"
                  >
                    Per maggiori informazioni prego contattare{" "}
                    <a href="mailto:info@thesailmaster.it">
                      info@thesailmaster.it
                    </a>{" "}
                    o chiamare per telefono +386(0)599 05700, oppure +386(0)51
                    337 999.
                  </Panel>
                </Accordion>
              </div>
            </Col>
          </div>
        </div>
      </FilterSideWrapper>
    );
  }
}
