import React from "react";
import { Row, Col, Accordion } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";
import { getSelectedFromQuery } from 'utils/miscUtils';

import Panel from "components/misc/Panel";

export default class WhyCharterIt extends React.Component {
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
          <title>PERCHÉ CHARTER - TheSailmaster.it</title>
          <meta
            name="description"
            content="PERCHÉ CHARTER - TheSailmaster.it"
          />
          <meta
            property="og:title"
            content="PERCHÉ CHARTER - TheSailmaster.it"
          />
          <meta
            property="og:description"
            content="PERCHÉ CHARTER - TheSailmaster.it"
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <h1>Perché charter</h1>
                <p>
                  Nel momento in cui ci si trova a bordo dell'imbarcazione, vi
                  si apre un mondo di esperienze tutto nuovo. Si crea una
                  sensazione di totale libertà, la quale vi offre infinite
                  opportunitá di essere a stretto contatto con la natura. In
                  contrasto con le limitazioni presentate dalle navi da crociera
                  con percorsi già stabiliti, spiaggie affollate delle località
                  balneari e hotel, prendere in noleggio un'imbarcazione vuol
                  dire libertà e mobilità senza limiti, privacy e la possibilità
                  di scegliere itinerari su misura, esaudendo tutte le vostre
                  esigenze e desideri.
                  <br />
                </p>
                <Accordion defaultActiveKey={this.state.selected}>
                  <Panel
                    header="Il noleggio offre libertà totale!"
                    eventKey="1"
                  >
                    Date spazio alla vostra immaginazione e scoprite le immense
                    possibilità che un viaggio per mare vi può offrire. Prendere
                    un'imbarcazione a noleggio offre un senso di libertà,
                    permette piacevoli avventure, la fuga dalla routine
                    quotidiana, più di qualsiasi altra vacanza.
                    <br />
                    <br />
                    Prendere l'imbarcazione a noleggio offre la possibilitá di
                    pianificare i propri percorsi e la sua piena realizzazione.
                    Il noleggio ci permette di scoprire luoghi più spettacolari
                    e affascinanti in grande comfort e sicurezza.
                  </Panel>
                  <Panel header="Perchè è coveniente!" eventKey="2">
                    Non tanto tempo fa andare in mare noleggiando una barca era
                    una vacanza riservata a pochi fortunati, ma oggi il prezzo
                    di un noleggio barca è diventato molto più accessibile ed
                    economico per tutti gli amanti del mare che desiderano una
                    vacanza a stretto contatto con la natura, con un pizzico di
                    avventura ma sempre vivendo nel comfort che le nostre barche
                    offrono. Consultando le nostre offerte troverai sicuramente
                    l'imbarcazione più adatta alle tue esigenze sia per un
                    noleggio programmato mesi prima o usufruendo delle offerte
                    “last minute” a prezzi veramente competitivi.
                  </Panel>
                  <Panel header="È adatto anche ai principianti!" eventKey="3">
                    Il noleggio di un’imbarcazione è adatto a tutti. Chiaramente
                    almeno una persona dell'equipaggio deve avere esperienze
                    precedenti di navigazione con barche di certa lunghezza e
                    deve avere la licenza e tutti i documenti necessari per la
                    navigazione.
                    <br />
                    <br />
                    Ma possiamo concedersi una vacanza in barca, anche se nella
                    scelta dell'equipaggio non si trova un navigatore. In questo
                    caso vi possiamo fornire uno skipper, il quale si prenderà
                    cura di una navigazione sicura e sarà a vostra disposizione
                    per tutto il tempo del noleggio, oppure per i giorni da voi
                    scelti.
                  </Panel>
                  <Panel
                    header="Sei sempre in prima fila, con la migliore vista!"
                    eventKey="4"
                  >
                    Dove meglio di una barca per vivere un tramonto ogni volta
                    su un posto diverso, a un passo dal mare?
                    <br />
                    <br />
                    Non importa se desiderate visitare paesi e porti che offrono
                    divertimento, vivere tutto il proprio tempo al mare aperto,
                    oppure passare la vacanza in baie solitarie, siete sempre al
                    centro dell'attenzione. La scelta è vostra.
                  </Panel>
                  <Panel
                    header="Offre privacy e favorisce la socializzazione!"
                    eventKey="5"
                  >
                    Cercate pace nell'intimità della famiglia, senza gente e
                    stress, un “party boat” con gli amici, oppure volete
                    organizzare un “teambuilding” con i collaboratori? Con una
                    giusta scelta dell'imbarcazione non si pone più come una
                    domanda. È ovvio che l’imbarcazione offra uno spazio
                    limitato e dipende dall'imbarcazione scelta, ma le barche
                    moderne offrono abbastanza spazio e comfort per tutti i
                    membri dell'equipaggio. In ogni caso dentro la vostra cabina
                    manterrete la vostra privacy più assoluta.
                  </Panel>
                  <Panel
                    header="Attività o riposo! Sta a te decidere!"
                    eventKey="6"
                  >
                    Siete appassionati di vela, cercate libertà e avventura che
                    il mare offre o semplicemente una comoda vacanza con la
                    famiglia o amici, con nuotate in baie solitarie alla
                    scoperta del fondale marino oppure altre attività
                    divertenti? Noleggiare una barca ci offre tante possibilità
                    e ognuno più trovare qualcosa per se. Siate precisi al
                    momento della richiesta, dateci tutte le vostre preferenze,
                    elencateci i vostri desideri, cosi TheSailmaster vi offrirà
                    le soluzioni migliori avvicinandosi il più possibile ai
                    vostri desideri.
                  </Panel>
                  <Panel
                    header="Permette esplorazioni e avventura!"
                    eventKey="7"
                  >
                    Il noleggio della barca è la soluzione migliore per fuggire
                    dalla routine e dal trambusto quotidiano alla scoperta di
                    nuove località, vivere un'avventura a stretto contatto con
                    la natura. Desiderate visitare posti lontani e isole, fare
                    immersioni ai relitti di navi, aerei o altri relitti di
                    guerra, scoprire il fondo marino, oppure visitare paesi
                    medioevali, fortezze o festival estivi? Noleggiare una barca
                    offre un'esperienza indimenticabile nella scoperta delle
                    meraviglie del Mediterraneo. Per voi che cercate più di una
                    semplice vacanza, un'imbarcazione offre veramente
                    un'avventura di mare e nello stesso tempo rappresenta una
                    vacanza di lusso, non solo per il comfort che le moderne
                    imbarcazioni offrono ma soprattutto per la vasta scelta di
                    possibilità di un contatto genuino con la natura alla
                    scoperta del habitat naturale.
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
