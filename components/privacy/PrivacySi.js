import React from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";

const PAGE_HTML = `
<h1 class="western"><strong>ZAUPNOST PODATKOV</strong></h1>
<h2>SPLO&Scaron;NO</h2>
<p>Gospodarska družba Eolis, d.o.o., s sedežem na Železni cesti 14, Ljubljana (v nadaljnjem besedilu: Eolis d.o.o.) spo&scaron;tuje zasebnost in kot zaupne obravnava vse podatke, ki jih od uporabnikov svojih storitev pridobi z uporabo spletne strani www.thesailmaster.si ali na drug način, in ki jih zaradi opravljanja navedenih storitev in poslovanja poseduje v svojih zbirkah. Zavezuje se, da bo vse osebne podatke skrbno varovala in da jih ne bo posredovala tretjim osebam, razen kolikor je to potrebno za sklenitev, oziroma realizacijo pogodbe o najemu plovil ali drugih storitev, ali zaradi izvajanja veljavne zakonodaje.</p>
<p>Eolis d.o.o. se zaradi preprečitve nepoobla&scaron;čenega dostopa do pridobljenih osebnih podatkov ali njihovega razkritja in ohranjanja njihove natančnosti poslužuje ustreznih tehničnih in organizacijskih ukrepov. Kljub temu zaradi narave spletnega poslovanja in njegovega neprestanega napredka ne more zagotavljati popolne in stalne za&scaron;čite informacij, ki jih uporabniki prena&scaron;ajo na spletno stran www.thesailmaster.si ali z nje, zato tudi ni odgovorna za njihov nepoobla&scaron;čen prejem, uporabo ali odtujitev in s tem povezana &scaron;kodljiva dejanja tretjih oseb.</p>
<p>Uporabniki spletne strani www.thesailmaster.si nepreklicno potrjujejo, da so z dostopom nanjo poleg Splo&scaron;nih pogojev uporabe prebrali in razumeli na njej objavljena vsakokrat veljavna pravila o zasebnosti in varovanju osebnih podatkov, in da se ob njeni uporabi z njimi strinjajo. S spremljanjem spletne strani lahko sledijo njihovim morebitnim spremembam in s tem tudi načinu in namenu obdelave zbranih osebnih podatkov. Spremembe pričnejo veljati s trenutkom njihove objave.</p>
<h3>O uporabljenih pi&scaron;kotkih na spletni strani www.thesailmaster.si</h3>
<p>Pi&scaron;kotki so bistveni za zagotavljanje uporabnikom prijaznih spletnih storitev, saj je z njihovo pomočjo pregledovanje vsebin spletne strani učinkovitej&scaron;e, omogočajo pa hkrati tudi prepoznavanje, če je uporabnik spletno stran že obiskal.</p>
<p>Zaradi nemotenega delovanja svoje spletne strani in prepoznavanja za uporabnike najkoristnej&scaron;ih informacij, uporablja Eolis d.o.o. pi&scaron;kotke orodja Google Analytics. Z njimi zbrani podatki ne omogočajo osebne prepoznave uporabnikov.</p>
<p>Seznam uporabljenih pi&scaron;kotkov:</p>

<table class="table">
  <tr>
    <th>ime pi&scaron;kotka
    </th>
    <th>trajanje
    </th>
    <th>namen uporabe
    </th>
  </tr>
  <tr>
    <td>
ga
    </td>
    <td>
2 leti
    </td>
    <td>
 &nbsp;omogoča opazovanje premikanja uporabnikov po spletni strani
    </td>
  </tr>
  <tr>
    <td>gat_gtag_</td>
    <td>2 leti</td>
    <td>predstavlja identifikacijsko kodo spletne strani za spremljanje obiskov</td>
  </tr>
  <tr>
    <td>gid:</td>
    <td>24 ur</td>
    <td>omogoča razlikovanje med uporabniki, s tem da informacij o njih ne vsebuje</td>
  </tr>
</table>
<p>&nbsp;</p>
<h2>VAROVANJE OSEBNIH PODATKOV</h2>
<h3>O zbiranju in obdelavi osebnih podatkov</h3>
<p>Osebni podatek je katerakoli informacija, ki uporabnika identificira.</p>
<p>Eolis d.o.o. zaradi opravljanja svojih storitev in poslovanja, in izključno v ta namen, v skladu z veljavno slovensko in evropsko zakonodajo (Zakon o varstvu osebnih podatkov, Zakon o varstvu potro&scaron;nikov, Zakon o elektronskih komunikacijah in Splo&scaron;na uredba o varstvu osebnih podatkov) zbira in obdeluje osebne podatke uporabnikov svojih storitev, ki mu jih posredujejo z uporabo spletne strani www.thesailmaster.si ali na drug način.</p>
<p>S posredovanjem navedenih podatkov dajejo uporabniki privoljenje za njihovo obdelavo.</p>
<p>Vrste zbiranih osebnih podatkov:</p>
<ul>
<li>ime in priimek</li>
<li>naslov prebivali&scaron;ča</li>
<li>kontaktni telefonska &scaron;tevilka in &scaron;tevilka faksa</li>
<li>naslov elektronske po&scaron;te</li>
</ul>
<p>Zbrani podatki služijo:</p>
<ul>
<li>po&scaron;iljanju e-novic in obvestil</li>
<li>neposrednemu trženju</li>
<li>realizaciji uporabnikovih povpra&scaron;evanj</li>
<li>sklenitvi in realizaciji pogodb o najemu plovil in drugih storitev</li>
<li>analizi obiskov spletne strani</li>
</ul>
<p>Na podlagi privolitve posameznega uporabnika, dane z izjavo ali na drug jasen način, lahko Eolis d.o.o. kot upravljalec zbira in obdeluje tudi njegove druge osebne podatke.</p>
<h3>Prijava na e-novice in obvestila</h3>
<p>Uporabniki spletne strani www.thesailmaster.si se lahko prijavijo na e-novice in obvestila, s katerimi Eolis d.o.o. do preklica obve&scaron;ča o posebnih ponudbah, ugodnostih, novostih in drugih vsebinah, povezanih s storitvami, ki jih opravlja.</p>
<p>Uporabniki za prijavo na e-novice in obvestila posredujejo elektronski naslov ter svoja ime in priimek. Po poslanem obrazcu o prijavi prejmejo na navedeni naslov potrditveno sporočilo, na kar bodo po njegovi potrditvi vne&scaron;eni na seznam prejemnikov e-novic in obvestil.</p>
<h3>Pravice uporabnikov</h2>
<p>Vsak uporabnik lahko kadarkoli pisno ali s klikom na gumb Odjava v e-novicah zahteva, da Eolis d.o.o. trajno ali začasno preneha uporabljati njegove osebne podatke za namen neposrednega trženja. Na navedeno zahtevo se bo upravljalec odzval v 15-ih dneh in o tem uporabnika obvestil.</p>
<p>Vsak uporabnik ima tudi pravico do obve&scaron;čenosti. Kadarkoli lahko od upravljalca zahteva dostop do svojih osebnih podatkov, njihovo popravo, izbris, prenos ali omejitev njihove obdelave, lahko pa obdelavi tudi ugovarja.</p>
<p>Upravljalec osebnih podatkov je: Eolis d.o.o., Železna cesta 14, SI-Ljubljana. Morebitna vpra&scaron;anja o zasebnosti in obdelavi osebnih podatkov lahko naslovite na info@thesailmaster.si</p>
<p>&nbsp;</p>
<p>Zadnja sprememba: 30. 6. 2020</p>
`;

export default class PrivacySi extends React.Component {
  render() {
    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>
            Zaupnost podatkov - TheSailmaster.si | Najem jadrnice, katamarana,
            jahte - last minute
          </title>
          <meta
            name="description"
            content="Izjava o zaupnosti podatkov se nanaša na vse podatke, ki so bili prodobljeni z uporabo spletnega portala www.thesailmaster.si in so objavljeni na njem ali se nahajajo v njegovih bazah in bazah gospodarake družbe EOLIS, d.o.o., zaradi opravljanja storitev in poslovanja."
          />
          <meta
            property="og:title"
            content="Zaupnost podatkov - TheSailmaster.si | Najem jadrnice, katamarana, jahte - last minute"
          />
          <meta
            property="og:description"
            content="Izjava o zaupnosti podatkov se nanaša na vse podatke, ki so bili prodobljeni z uporabo spletnega portala www.thesailmaster.si in so objavljeni na njem ali se nahajajo v njegovih bazah in bazah gospodarake družbe EOLIS, d.o.o., zaradi opravljanja storitev in poslovanja."
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div
                className="col-inner"
                dangerouslySetInnerHTML={{ __html: PAGE_HTML }}
              ></div>
            </Col>
          </div>
        </div>
      </FilterSideWrapper>
    );
  }
}
