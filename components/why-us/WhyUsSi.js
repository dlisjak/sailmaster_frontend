import React from "react";
import { Row, Col, Accordion } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";
import Panel from "components/misc/Panel";
import { getSelectedFromQuery } from 'utils/miscUtils';

export default class WhyUsSi extends React.Component {
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
          <title>
            Zakaj najeti plovilo pri nas - TheSailmaster.si | Najem jadrnice,
            katamarana, jahte - last minute
          </title>
          <meta
            name="description"
            content="Zakaj najeti plovilo z uporabo spletnega portala www.thesailmaster.si."
          />
          <meta
            property="og:title"
            content="Zakaj najeti plovilo pri nas - TheSailmaster.si | Najem jadrnice, katamarana, jahte - last minute"
          />
          <meta
            property="og:description"
            content="Zakaj najeti plovilo z uporabo spletnega portala www.thesailmaster.si."
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <h1>Zakaj najeti plovilo pri nas?</h1>
                <Accordion activeKey={this.state.selected}>
                  <Panel
                    header="Storitev po meri"
                    eventKey="1"
                    onClick={() => this.setState({ selected: "1" })}
                  >
                    Iskanje primernega plovila je lahko stresno. Naj namesto vas
                    to opravimo mi. Vzeli si bomo čas, in vam, v skladu z vašimi
                    potrebami in željami, zagotovili najboljšo možno ponudbo, za
                    nepozabne počitnice.
                  </Panel>
                  <Panel
                    header="Brezplačni postopek rezervacije"
                    eventKey="2"
                    onClick={() => this.setState({ selected: "2" })}
                  >
                    Za najem plovil ne zaračunavamo nikakršnih administrativnih
                    stroškov ali skritih dodatkov. Postopek rezervacije je
                    povsem brezplačen.
                  </Panel>
                  <Panel
                    header="Najnižje cene"
                    eventKey="3"
                    onClick={() => this.setState({ selected: "3" })}
                  >
                    Zaradi odličnih odnosov z lastniki plovil, našimi partnerji,
                    vam z veseljem lahko ponudimo najnižje cene najema na trgu.
                  </Panel>
                  <Panel
                    header="Več kot 3000 plovil"
                    eventKey="4"
                    onClick={() => this.setState({ selected: "4" })}
                  >
                    Plovila v naši ponudbi so preverjena v skladu z najvišjimi
                    merili kakovosti, izbrana pri najboljših ponudnikih.
                    Izbirate lahko med več kot 3000 plovili.
                  </Panel>
                  <Panel
                    header="Stalna razpoložljivost"
                    eventKey="5"
                    onClick={() => this.setState({ selected: "5" })}
                  >
                    Strankam smo na voljo ves čas, od prvega stika, med
                    potovanjem, po povratku domov. Za kakršnakoli vprašanja nas
                    pokličite ali pišite na kontaktni naslov. Odgovorili vam
                    bomo ali poiskali rešitev v najkrajšem možnem času.
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
