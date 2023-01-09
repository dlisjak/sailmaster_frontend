import React from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";

export default class ReservationStepsIt extends React.Component {
  render() {
    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>Procedimento di prenotazione - TheSailmaster.it</title>
          <meta
            name="description"
            content="Procedimento di prenotazione - TheSailmaster.it"
          />
          <meta
            property="og:title"
            content="Procedimento di prenotazione - TheSailmaster.it"
          />
          <meta
            property="og:description"
            content="Procedimento di prenotazione - TheSailmaster.it"
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <h1>Procedimento di prenotazione dell'imbarcazione</h1>
                <ol>
                  <li>
                    <strong>SPEDITE LA RICHIESTA:</strong> Per tutti i vostri
                    desideri riguardanti il noleggio dell'imbarcazione, siamo a
                    disposizione per telefono, e mail , a mezzo compilazione
                    scheda elettronica o rete social.
                  </li>

                  <li>
                    <strong>VI SPEDIAMO L'OFFERTA:</strong> Alla vs. gentile
                    richiesta provederemo a verificare la disponibilitá delle
                    imbarcazioni presso tutti i ns. collaboratori nella zona
                    richiesta e al più presto vi presenteremo le migliori
                    offerte.
                  </li>

                  <li>
                    <strong>SCEGLIETE L'IMBARCAZIONE:</strong> Vi preghiamo di
                    comunicarci la vostra scelta per quanto riguarda
                    l'imbarcazione e di fornirci le seguenti informazioni:
                    <span>• nome e cognome / ditta,</span>
                    <span>• indirizzo /sede,</span>
                    <span>• per ditte - partita IVA,</span>
                    <span>• telefono</span>
                    <span>• posta elettronica.</span>
                  </li>

                  <li>
                    <strong>FATTURA PROFORMA (PREVENTIVO):</strong> Dopo aver
                    ricevuto tutti i dati del punto precedente Vi spediremo la
                    fattura proforma (il preventivo).
                  </li>

                  <li>
                    <strong>PRENOTAZIONE:</strong> Dopo l'avenuto pagamento da
                    parte vostra, come da fattura proforma il noleggio
                    dell'imbarcazione è confermato.{" "}
                    <a href="termini-e-condizioni.php">TERMINI E CONDIZIONI</a>
                  </li>

                  <li>
                    <strong>CONTRATTO E L'ELENCO DELL'EQUIPAGGIO:</strong>{" "}
                    l'avenuta conferma della prenotazione vi spediamo il
                    contratto da firmare e un modulo da compilare con i nomi
                    dell'equipaggio (crew list). Compilando e spedendoci
                    entrambi, il contratto diventa valido.{" "}
                    <a href="termini-e-condizioni.php">TERMINI E CONDIZIONI</a>
                  </li>

                  <li>
                    <strong>
                      RICEVUTA PER IL RITIRO DELL'IMBARCAZIONE (VOUCHER):
                    </strong>{" "}
                    Dopo aver ricevuto l'intero pagamento della fattura
                    proforma, vi spediremo il VOUCHER una settimana prima del
                    ritiro dell'imbarcazione con tutti i dati necessari.{" "}
                    <a href="termini-e-condizioni.php">TERMINI E CONDIZIONI</a>
                  </li>

                  <li>
                    <strong>FATTURA:</strong> Alla fine del noleggio riceverete
                    la fattura.{" "}
                  </li>
                </ol>
              </div>
            </Col>
          </div>
        </div>
      </FilterSideWrapper>
    );
  }
}
