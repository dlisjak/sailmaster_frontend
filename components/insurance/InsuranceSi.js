import React from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";

const PAGE_HTML = `
<h1>Zavarovanja</h1>
<h2>Čarter zavarovanja</h2>

<div class="row py1">
	<div class="col-sm-3">
		<img class="img-fluid" src="/media/yacht-pool-Financial_System_2022.jpg" />
	</div>
	<div class="col-sm-8">
<p>Nem&scaron;ka zavarovalnica <a  rel="noopener noreferrer" target="_blank" href="https://www.charterfairtrag.de/charterfirmen-checked-and-trusted/">Yacht Pool</a> nas je kot svojega uradnega partnerja uvrstila v sistem agencij &raquo;Checked &amp; Trusted&laquo;, to je tistih, ki ustrezajo njihovim strogim pogojem solventnosti in finančne stabilnosti. S tem so vsa plačila na&scaron;ih strank za najem plovil pridobila garancijo popolne varnosti.</p>
</div>
</div>

<div class="row">
	<div class="col-sm-3">
		<img class="img-fluid" src="/media/yachtpool-2.png" />
	</div>
	<div class="col-sm-8">

<p>Ob najemu plovil omogočamo tudi možnost sklenitve dodatnih čarter zavarovanj:</p>
<ul>
<li>
zavarovanje kavcije
</li>
<li>
zavarovanje rizika odpovedi in stro&scaron;kov skraj&scaron;anja potovanja
</li>
<li>
zavarovanje odgovornosti skiperja
</li>
</ul>
	</div>
</div>

<h2>Zdravstveno in nezgodno zavarovanje</h2>
<div class="row py1">
	<div class="col-sm-3">
		<img class="img-fluid" src="/media/VZ_LOGO_sekundarni_RGB.svg" />
	</div>
	<div class="col-sm-8">

<p>Kot uradni partner zavarovalnice <span><a  rel="noopener noreferrer" target="_blank" href="https://www.vzajemna.si/sl/ugodnosti/ugodnosti/thesailmaster">Vzajemna zdravstvena zavarovalnica</a></span> omogočamo na&scaron;im strankam tudi osebna zavarovanja. Ob najemu plovila lahko izberete:</p>
<ul>
<li>
zavarovanje za tujino
</li>
<li>
dodatna kritja za primer nezgode v tujini
</li>
</ul>
</div>
</div>

<p>Za dodatne informacije nas kontaktirajte na 051 337 999 ali <span style="text-decoration: underline;"><a href="mailto:info@thesailmaster.si">info@thesailmaster.si</a></span></p>

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
