import { useEffect, useState } from 'react';
import { Row, Col, Accordion } from 'react-bootstrap';
import { useRouter } from 'next/router';
import FilterSideWrapper from '../components/common/FilterSideWrapper';
import Panel from '../components/misc/Panel';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../next-i18next.config';

const WhyUsSi = () => {
  const [selected, setSelected] = useState('');
  const router = useRouter();

  useEffect(() => {
    let { selected } = router.query;

    if (typeof selected === 'string') {
      return setSelected(selected);
    }

    if (Array.isArray(router.query.selected)) {
      return setSelected(selected[0]);
    }

    return setSelected('1');
  }, [router]);

  return (
    <FilterSideWrapper location={router.pathname}>
      <Head>
        <title>
          Zakaj najeti plovilo pri nas - TheSailmaster.si | Najem jadrnice, katamarana, jahte - last
          minute
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
      </Head>
      <div className="contact">
        <Row>
          <Col xs={12} sm={12}>
            <div className="col-inner">
              <h1>Zakaj najeti plovilo pri nas?</h1>
              <Accordion activeKey={selected}>
                <Panel header="Storitev po meri" eventKey="1" onClick={() => setSelected('1')}>
                  Iskanje primernega plovila je lahko stresno. Naj namesto vas to opravimo mi. Vzeli
                  si bomo čas, in vam, v skladu z vašimi potrebami in željami, zagotovili najboljšo
                  možno ponudbo, za nepozabne počitnice.
                </Panel>
                <Panel
                  header="Brezplačni postopek rezervacije"
                  eventKey="2"
                  onClick={() => setSelected('2')}
                >
                  Za najem plovil ne zaračunavamo nikakršnih administrativnih stroškov ali skritih
                  dodatkov. Postopek rezervacije je povsem brezplačen.
                </Panel>
                <Panel header="Najnižje cene" eventKey="3" onClick={() => setSelected('3')}>
                  Zaradi odličnih odnosov z lastniki plovil, našimi partnerji, vam z veseljem lahko
                  ponudimo najnižje cene najema na trgu.
                </Panel>
                <Panel header="Več kot 3000 plovil" eventKey="4" onClick={() => setSelected('4')}>
                  Plovila v naši ponudbi so preverjena v skladu z najvišjimi merili kakovosti,
                  izbrana pri najboljših ponudnikih. Izbirate lahko med več kot 3000 plovili.
                </Panel>
                <Panel
                  header="Stalna razpoložljivost"
                  eventKey="5"
                  onClick={() => setSelected('5')}
                >
                  Strankam smo na voljo ves čas, od prvega stika, med potovanjem, po povratku domov.
                  Za kakršnakoli vprašanja nas pokličite ali pišite na kontaktni naslov. Odgovorili
                  vam bomo ali poiskali rešitev v najkrajšem možnem času.
                </Panel>
              </Accordion>
            </div>
          </Col>
        </Row>
      </div>
    </FilterSideWrapper>
  );
};

export const getStaticProps = async (ctx) => {
  const translations = await serverSideTranslations(ctx.locale, ['common'], nextI18nextConfig);

  return {
    props: {
      ...translations,
    },
  };
};

export default WhyUsSi;
