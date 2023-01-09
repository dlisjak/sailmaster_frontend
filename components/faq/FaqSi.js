import React from "react";
import { Row, Col, Accordion } from "react-bootstrap";
import { Helmet } from "react-helmet";

import FilterSideWrapper from "../common/FilterSideWrapper";
import Panel from "components/misc/Panel";

export default class FaqSi extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.location.query.selected || "1",
    };
  }

  render() {
    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>
            Pogosta vprašanja - TheSailmaster.si | Najem jadrnice, katamarana,
            jahte - last minute
          </title>
          <meta
            name="description"
            content="Še nikoli niste jadrali, tukaj so pogosta vprašanja in odgovori."
          />
          <meta
            property="og:title"
            content="Pogosta vprašanja - TheSailmaster.si | Najem jadrnice, katamarana, jahte - last minute"
          />
          <meta
            property="og:description"
            content="Še nikoli niste jadrali, tukaj so pogosta vprašanja in odgovori."
          />
        </Helmet>
        <div className="contact">
          <div className="row">
            <Col xs={12} sm={12}>
              <div className="col-inner">
                <h1>Pogosta vprašanja</h1>
                <Accordion defaultActiveKey={this.state.selected}>
                  <Panel
                    header="Še nikoli nisem jadral. Ali kljub temu lahko najamem jadrnico?"
                    eventKey="1"
                  >
                    Vsekakor, vendar potrebujete skiperja (izkušeno osebo z
                    veljavnim dovoljenjem za plovbo in upravljanje z radijsko
                    postajo). Ta je lahko član vaše posadke ali pa ga najamete
                    pri nas, skupaj s plovilom.
                  </Panel>
                  <Panel
                    header="Kako naj izberem primerno plovilo?"
                    eventKey="2"
                  >
                    Izbor plovila (njegova velikost, tip in oprema) je odvisen
                    predvsem od predvidenega števila potnikov, namena in vrste
                    plovbe. Pokličite nas, z veseljem vam bomo svetovali.
                  </Panel>
                  <Panel header="Koliko stane najem skiperja?" eventKey="3">
                    Običajen strošek zanj je 100€ - 150€ dnevno, zagotoviti pa
                    mu je treba tudi hrano in pijačo. Večje kot je število
                    članov posadke, nižji so stroški skiperja na osebo.
                  </Panel>
                  <Panel
                    header="Kdaj se plovilo prevzame in kdaj vrne?"
                    eventKey="4"
                  >
                    Praviloma prevzem (check-in) poteka ob 17. uri, čas vrnitve
                    plovila ob koncu jadranja (check-out) pa do 9. ure. Na željo
                    strank se vedno potrudimo urediti zgodnji check-in, prevzem
                    pred 17. uro, vendar to ni vedno mogoče.
                  </Panel>
                  <Panel
                    header="Imam dodatna vprašanja in bi rad govoril s svetovalcem."
                    eventKey="5"
                  >
                    Za dodatne informacije nas prosim kontaktirajte na{" "}
                    <a href="mailto:info@thesailmaster.si">
                      info@thesailmaster.si
                    </a>{" "}
                    ali nas pokličite na +386(0)599 05700 ter +386(0)51 337 999
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
