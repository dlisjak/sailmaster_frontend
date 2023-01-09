import React from "react";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";

export default class ReservationStepsSi extends React.Component {

  render() {
    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>
            Postopek rezervacije plovila - TheSailmaster.si | Najem jadrnice,
            katamarana, jahte - last minute
          </title>
          <meta
            name="description"
            content="Postopek rezervacije jadrnice, katamarana jahte ali drugega motornega plovila pri TheSailmaster.si"
          />
          <meta
            property="og:title"
            content="Postopek rezervacije plovila - TheSailmaster.si | Najem jadrnice, katamarana, jahte - last minute"
          />
          <meta
            property="og:description"
            content="Postopek rezervacije jadrnice, katamarana jahte ali drugega motornega plovila pri TheSailmaster.si"
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <h1>Postopek rezervacije plovila</h1>
                <ol>
                  <li>
                    <strong>POŠLJITE POVPRAŠEVANJE:</strong> Vaše želje za najem
                    izbranega plovila nam sporočite po telefonu, e-pošti, preko
                    spletnega kontaktnega obrazca ali socialnih omrežij.{" "}
                  </li>

                  <li>
                    <strong>POŠLJEMO VAM PONUDBO:</strong> Na vaše povpraševanje
                    bomo preverili razpoložljivost plovil pri vseh partnerjih na
                    izbranem območju in vam v najkrajšem času predložili
                    najboljše ponudbe.
                  </li>

                  <li>
                    <strong>IZBERITE PLOVILO:</strong> Sporočite nam svojo
                    odločitev glede izbranega plovila in nam posredujte
                    naslednje podatke:
                    <span>• ime in priimek/podjetje,</span>
                    <span>• naslov/sedež,</span>
                    <span>• za podjetje ID za DDV,</span>
                    <span>• telefonsko številko in</span>
                    <span>• elektronski naslov.</span>
                  </li>

                  <li>
                    <strong>PREDRAČUN:</strong> Po prejemu v prejšnji točki
                    navedenih podatkov vam izstavimo predračun.
                  </li>

                  <li>
                    <strong>REZERVACIJA:</strong> S plačilom zneska po
                    predračunu je rezervacija plovila potrjena.{" "}
                    <Link href="pogoji-uporabe">Splošni pogoji</Link>
                  </li>

                  <li>
                    <strong>POGODBA IN LISTA POSADKE:</strong> Po izvršeni
                    rezervaciji vam pošljemo v podpis pogodbo in v izpolnitev
                    obrazec za popis posadke (crew list). Z izpolnitvijo in
                    vrnitvijo obeh je pogodba sklenjena.{" "}
                    <Link href="pogoji-uporabe">Splošni pogoji</Link>
                  </li>

                  <li>
                    <strong>POTRDILO ZA PREVZEM PLOVILA (VOUCHER):</strong> Po
                    izvršenem celotnem plačilu predračuna vam v tednu pred
                    prevzemom plovila pošljemo voucher z vsemi potrebnimi
                    podatki. <Link href="pogoji-uporabe">Splošni pogoji</Link>
                  </li>

                  <li>
                    <strong>RAČUN:</strong> Po zaključenem najemu prejmete
                    račun.{" "}
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
