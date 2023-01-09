import React from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";

const PAGE_HTML = `
<h1>Assicurazione</h1>
<h2>Assicurazioni charter</h2>

<div class="row py1">
	<div class="col-sm-3">
		<img class="img-fluid" src="/static/media/yacht-pool-Financial_System_2022.jpg" />
	</div>
	<div class="col-sm-8">
<p>
Siamo divenuti partner ufficiali dell'Assicurazione tedesca <a  rel="noopener noreferrer" target="_blank" href="https://www.charterfairtrag.de/charterfirmen-checked-and-trusted/">Yacht Pool</a> e siamo entrati nel sistema delle agenzie »Checked & Trusted«, in quanto soggetti che rispondono a condizioni rigorose di solvibilità e stabilità finanziaria. In questo modo tutti i pagamenti per il noleggio di natanti dei nostri clienti sono coperti da garanzia e totalmente sicuri.
</p>
</div>
</div>

<div class="row">
	<div class="col-sm-3">
		<img class="img-fluid" src="/static/media/yachtpool-2.png" />
	</div>
	<div class="col-sm-8">

<p>Per il noleggio dei natanti offriamo anche la possibilità di stipulare altre assicurazioni charter:
<ul>
<li>assicurazione cauzioni</li>
<li>assicurazione contro il rischio di annullamento della conferma e di spese per la riduzione dei giorni di viaggio</li>
<li>assicurazione responsabilità skipper</li>
</ul>
	</div>
</div>

<h2>Assicurazione sanitaria e infortuni</h2>
<div class="row py1">
	<div class="col-sm-3">
		<img class="img-fluid" src="/static/media/VZ_LOGO_sekundarni_RGB.svg" />
	</div>
	<div class="col-sm-8">

<p>
Quale partner ufficiale dell'assicurazione <a  rel="noopener noreferrer" target="_blank" href="https://www.vzajemna.si/sl/ugodnosti/ugodnosti/thesailmaster">Vzajemna zdravstvena zavarovalnica</a></span>  siamo in grado di offrire ai nostri clienti anche assicurazioni sulla persona. Con il noleggio del natante potrete scegliere tra:
</p>
<ul>
<li>
assicurazioni per l'estero
</li>
<li>
assicurazioni aggiuntive in caso di infortunio all'estero
</li>
</ul>
</div>
</div>

<p>
Per ulteriori informazioni contattateci telefonando allo 00386 51 337 999 o scrivendo a <span style="text-decoration: underline;"><a href="mailto:info@thesailmaster.it">info@thesailmaster.it</a></span>
</p>

`;

export default class TermsSi extends React.Component {
  render() {
    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>
            Zavarovanja - TheSailmaster.si | Najem jadrnice, katamarana, jahte -
            last minute
          </title>
          <meta name="description" content="" />
          <meta
            property="og:title"
            content="Zavarovanja - TheSailmaster.si | Najem jadrnice, katamarana, jahte - last minute"
          />
          <meta property="og:description" content="" />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div
                className="col-inner about"
                dangerouslySetInnerHTML={{ __html: PAGE_HTML }}
              ></div>
            </Col>
          </div>
        </div>
      </FilterSideWrapper>
    );
  }
}
