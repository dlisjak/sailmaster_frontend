import React from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";

export default class AbousUsIt extends React.Component {
  render() {
    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>Chi siamo - TheSailmaster.it</title>
          <meta
            name="description"
            content="TheSailmaster è il posto migliore per noleggiare barche a vela, catamarani e barche a motore nell’Adriatico."
          />
          <meta property="og:title" content="Chi siamo - TheSailmaster.it" />
          <meta
            property="og:description"
            content="TheSailmaster è il posto migliore per noleggiare barche a vela, catamarani e barche a motore nell’Adriatico."
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner about">
                <h1>Chi siamo</h1>
                <p>
                  TheSailmaster è il posto migliore per noleggiare barche a
                  vela, catamarani e barche a motore nell’Adriatico.
                </p>
                <p>
                  Agli amanti del mare, vela e delle avventure nautiche offriamo
                  un accesso semplice e trasparente alle migliori offerte in
                  brevissimo tempo, al prezzo piú conveniente. Forniamo servizi
                  personalizzati e disponibilità continua. La procedura di
                  prenotazione è gratuita. Consultate le nostre offerte sul sito
                  www.thesailmaster.it e garantitevi una vacanza da sogno.
                </p>
                <h2>Missione</h2>
                <p>
                  Facilitiamo il noleggio d'imbarcazioni di ogni tipo e
                  organizziamo eventi nautici a prezzi competitivi. Ci
                  concentriamo sui desideri e le esigenze dei clienti, trovando
                  la migliore soluzione in termini di prezzo e qualità. Siamo
                  disponibili, gentili, affidabili e flessibili. Stabiliamo e
                  manteniamo un’eccellente collaborazione di lavoro, basata
                  sulla fiducia e la creazione di un ambiente piacevole tra i
                  dipendenti.
                </p>
                <h2>Visione</h2>
                <p>
                  Con un lavoro professionale e un team motivato vogliamo essere
                  riconosciuti come il fornitore leader di servizi nautici
                  nell'Adriatico.
                </p>
                <p>
                  TheSailmaster è sinonimo di alta qualità a prezzi accessibili,
                  offre agli utenti un amichevole, sicuro noleggio
                  d’imbarcazioni e organizza eventi nautici.
                </p>
                <h2>Valori</h2>
                <ul>
                  <li>responsabilità</li>
                  <li>la cura per i clienti e dipendenti</li>
                  <li>qualità</li>
                  <li>onestà e fiducia</li>
                  <li>economia</li>
                </ul>
                <h2>Team</h2>
                <div className="team-it">
                  <div className="row">
                    <Col xs={12} sm={6} md={6} className="team-item">
                      <img
                        src="/media/team/jernej.jpg"
                        className="img-fluid"
                        alt="JERNEJ"
                      />
                      <strong>JERNEJ</strong>
                      <p>
                        Il leader, la forza motrice, confondatore dell'azienda.
                        Energetico, intraprendente, esperto nel campo del
                        noleggio delle imbarcazioni e ottimo consigliere per i
                        clienti.
                      </p>
                    </Col>
                    <Col xs={12} sm={6} md={6} className="team-item">
                      <img
                        src="/media/team/marko.jpg"
                        className="img-fluid"
                        alt="MARKO"
                      />
                      <strong>MARKO</strong>
                      <p>
                        Con un'ottima conoscienza nel campo dell'economia e
                        della finanza contribuisce al raggiungimento degli
                        obiettivi prefissati con diligenza ed economicità.
                        Analista, specializzato nel marketing, confondatore
                        dell'azienda e ottimo consulente per informazioni
                        riguardanti il noleggio delle imbarcazioni.
                      </p>
                    </Col>
                    <Col xs={12} sm={6} md={6} className="team-item">
                      <img
                        src="/media/team/bojan.jpg"
                        className="img-fluid"
                        alt="BOJAN"
                      />
                      <strong>BOJAN</strong>
                      <p>
                        Tecnico informatico con pluriennale esperienza e grande
                        passione per la materia, realizza le nostre idee con
                        prontezza e capacità.
                      </p>
                    </Col>
                    <Col xs={12} sm={6} md={6} className="team-item">
                      <img
                        src="/media/team/nika.jpg"
                        className="img-fluid"
                        alt="NIKA"
                      />
                      <strong>NIKA</strong>
                      <p>
                        Eccellente collaboratrice, positiva, sempre piena di
                        nuove idee! Insostituibile nel nostro ufficio per lavori
                        amministrativi e organizzativi.
                      </p>
                    </Col>
                  </div>
                </div>
              </div>
            </Col>
          </div>
        </div>
      </FilterSideWrapper>
    );
  }
}
