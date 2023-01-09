import React from "react";
import { Row, Col, Accordion } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";
import Panel from "components/misc/Panel";
import { getSelectedFromQuery } from 'utils/miscUtils';

export default class WhyUsIt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: getSelectedFromQuery(props.location.search)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selected: getSelectedFromQuery(nextProps.location.search) });
  }

  render() {
    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>Perche noleggiare le barche da noi - TheSailmaster.it</title>
          <meta
            name="description"
            content="Perche noleggiare le barche da noi - TheSailmaster.it"
          />
          <meta
            property="og:title"
            content="Perche noleggiare le barche da noi - TheSailmaster.it"
          />
          <meta
            property="og:description"
            content="Perche noleggiare le barche da noi - TheSailmaster.it"
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <h1>Perche noleggiare le barche da noi?</h1>
                <Accordion activeKey={this.state.selected}>
                  <Panel
                    header="Servizio su misura"
                    eventKey="1"
                    onClick={() => this.setState({ selected: "1" })}
                  >
                    La ricerca di un'imbarcazione può rivelarsi stressante.
                    Lasciate questo compito a noi. Ci prenderemo il tempo
                    necessario e in base alle vostre esigenze e desideri vi
                    proporremo la migliore offerta per trascorrere delle vacanze
                    indimenticabili.
                  </Panel>
                  <Panel
                    header="Procedura di prenotazione gratuita"
                    eventKey="2"
                    onClick={() => this.setState({ selected: "2" })}
                  >
                    Per il noleggio delle imbarcazioni non addebitiamo nessun
                    costo amministrativo o altre spese nascoste. La procedura di
                    prenotazione è completamente gratuita.
                  </Panel>
                  <Panel
                    header="I prezzi competitivi"
                    eventKey="3"
                    onClick={() => this.setState({ selected: "3" })}
                  >
                    Grazie alle eccellenti relazioni che abbiamo istaurato con i
                    proprietari delle imbarcazioni, i nostri partner, possiamo
                    offrirvi i prezzi di noleggio più vantaggiosi sul mercato.
                  </Panel>
                  <Panel
                    header="Scelta con più di 3000 barche"
                    eventKey="4"
                    onClick={() => this.setState({ selected: "4" })}
                  >
                    Tutte le imbarcazioni della nostra offerta sono verificate e
                    conformi con gli standard più elevati, scelte dai migliori
                    fornitori. Potete scegliere tra più di 3000 imbarcazioni.
                  </Panel>
                  <Panel
                    header="Costante disponibilità"
                    eventKey="5"
                    onClick={() => this.setState({ selected: "5" })}
                  >
                    Per i nostri clienti siamo a disposizione tutto il tempo,
                    dal primo contatto, durante il noleggio e dopo il loro
                    ritorno a casa. Per qualsiasi altra domanda potete
                    telefonarci o scriverci al nostro indirizzo. Vi risponderemo
                    e insieme troveremo la soluzione migliore in più breve tempo
                    possibile.
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
