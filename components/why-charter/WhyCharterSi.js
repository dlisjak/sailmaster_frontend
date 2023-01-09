import React from "react";
import { Row, Col, Accordion } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";
import Panel from "components/misc/Panel";
import { getSelectedFromQuery } from 'utils/miscUtils';

export default class WhyCharterSi extends React.Component {
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
          <title>
            Zakaj charter - TheSailmaster.si | Najem jadrnice, katamarana, jahte
            - last minute
          </title>
          <meta
            name="description"
            content="V trenutku, ko se znajdete na krovu barke, se vam odpira svet novih doživetij. Ustvari se občutek popolne svobode, ki vam ponudi brezkončne možnosti uživanja v pristnem stiku z naravo."
          />
          <meta
            property="og:title"
            content="Zakaj charter - TheSailmaster.si | Najem jadrnice, katamarana, jahte - last minute"
          />
          <meta
            property="og:description"
            content="V trenutku, ko se znajdete na krovu barke, se vam odpira svet novih doživetij. Ustvari se občutek popolne svobode, ki vam ponudi brezkončne možnosti uživanja v pristnem stiku z naravo."
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <h1>Zakaj charter</h1>
                <p>
                  V trenutku, ko se znajdete na krovu barke, se vam odpira svet
                  novih doživetij. Ustvari se občutek popolne svobode, ki vam
                  ponudi brezkončne možnosti uživanja v pristnem stiku z naravo.
                  V nasprotju z omejitvami ustaljenih poti pri potovanjih s
                  potniškimi ladjami ali preobljudenostjo obmorskih letovišč in
                  hotelov, ponuja najem barke neomejeno mobilnost, zasebnost ter
                  možnosti, prilagojene izključno vašim potrebam in željam.
                  <br />
                </p>
                <Accordion defaultActiveKey={this.state.selected}>
                  <Panel header="Ker ponuja popolno svobodo!" eventKey="1">
                    Naj vašo domišljijo vodijo neomejene možnosti potovanja po
                    morju. Najem plovil ponuja občutek svobode, omogoča prijetna
                    doživetja, pobeg iz vsakdanjih rutin, bolj kot katerokoli
                    drugo počitnikovanje.
                    <br />
                    <br />
                    Prednost čarterja je možnost načrtovanja lastne poti in
                    njeno popolno uresničitev. Najem barke vam omogoča
                    raziskovanje najbolj spektakularnih krajev, a vedno z veliko
                    mero udobja in varnosti.
                  </Panel>
                  <Panel header="Ker je cenovno dostopen!" eventKey="2">
                    Doživljanje morja na način, ki je bil še nedolgo tega
                    rezerviran le za redke izbrance, se je dandanes cenovno
                    močno približalo klasični hotelski ali apartmajski ponudbi
                    in postalo dosegljivo vsem ljubiteljem morja, ki si želijo
                    drugačnih, pristnejših doživetij.
                    <br />
                    <br />
                    Preverite našo ponudbo. Za zgodnje ali »last minute«
                    rezervacije, ki se ponujajo skozi celo leto, je še posebej
                    ugodna.
                  </Panel>
                  <Panel
                    header="Ker je primeren tudi za popolne začetnike!"
                    eventKey="3"
                  >
                    Najem plovila je primeren za vsakogar. Čeprav je običajno,
                    da ima vsaj en član posadke predhodne izkušnje z
                    upravljanjem plovil podobne velikosti, kot tudi vsa potrebna
                    dovoljenja za plovbo, je barko možno najeti tudi v primeru,
                    ko takšne osebe med zbrano ekipo ni.
                    <br />
                    <br />V tem primeru vam priskrbimo izkušenega,
                    profesionalnega kapitana – skiperja, ki bo ves čas ali le za
                    določene posamezne dni, kolikor ga boste potrebovali, skrbel
                    za varno plovbo, ob upoštevanju vseh vaših želja.
                  </Panel>
                  <Panel
                    header="Ker si vedno v prvi vrsti, z najboljšim razgledom!"
                    eventKey="4"
                  >
                    Kje drugje kot na barki lahko doživite sončni zahod vsak dan
                    na drugem mestu, a le korak od morja?
                    <br />
                    <br />
                    Ne glede na to ali želite obiskovati obalna mesta,
                    pristanišča polna zabave, preživeti večino svojega časa na
                    odprtem morju ali preživljati počitnice v samotnih zalivih,
                    vedno ste v središču dogajanja. Odločitev je le vaša.
                  </Panel>
                  <Panel
                    header="Ker nudi zasebnost in spodbuja druženje!"
                    eventKey="5"
                  >
                    Iskanje miru v krogu družine, brez množic in stresa, »party
                    boat« s prijatelji ali »teambuilding« s sodelavci?
                    <br />
                    <br />S pravo izbiro plovila to ni več vprašanje. Čeravno so
                    vsa s prostorom bolj ali manj omejena, odvisno od izvedbe
                    trupa in njegove dolžine, ima vsako plovilo dovolj prostora
                    za vse člane posadke in skupno druženje. V vsakem primeru
                    znotraj svoje kabine obdržite popolno zasebnost.
                  </Panel>
                  <Panel
                    header="Ker sam odločaš: aktivnost ali počitek!"
                    eventKey="6"
                  >
                    Ste jadralski navdušenec, iščete pomorsko avanturo? Ali
                    iščete le udobno počitnikovanje za družino in prijatelje, z
                    veliko možnosti plavanja v neokrnjenih zalivih,
                    raziskovanjem sveta pod gladino ali drugih zabavnih
                    aktivnosti? Najem plovil s svojimi skoraj neomejenimi
                    možnostmi omogoča izbiro prave rešitve za vsakogar.
                    <br />
                    <br />
                    Vaša naloga je le, da ob povpraševanju svoje želje in
                    pričakovanja čim natančneje izrazite, da bi se jim lahko
                    TheSailmaster svetovalci pri izboru najboljših ponudb kar
                    najbolje približali.
                  </Panel>
                  <Panel header="Ker omogoča raziskovanja!" eventKey="7">
                    Najem barke je najboljša odločitev za pobeg iz vrveža
                    vsakdanjega življenja in prava vstopnica k novim morskim
                    dogodivščinam odkrivanja neznanih krajev.
                    <br />
                    <br />
                    Želite obiskati oddaljene kraje in otočja, se potapljati k
                    ladijskim in letalskim razbitinam, ostankom svetovnih vojn,
                    odkrivati svet pod morjem ali pa obiskovati naravne
                    znamenitosti, srednjeveška mestna jedra in trdnjave ter
                    poletne festivale? Najem plovil ponuja nepozabna doživetja
                    pri raziskovanju naravnih čudes Mediterana.
                    <br />
                    <br />
                    Za tiste, ki iščete več, vam počitnice na barki nudijo prave
                    mornarske izzive, hkrati pa predstavljajo popolne luksuzne
                    počitnice. A ne le zaradi udobja, predvsem zaradi vseh
                    raznovrstnih možnosti raziskovanj, pristnega stika z naravo,
                    odkrivanja divjine in naravnih habitatov.
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
