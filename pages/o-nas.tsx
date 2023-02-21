import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import FilterSideWrapper from '../components/common/FilterSideWrapper';
import nextI18nextConfig from '../next-i18next.config';

const AbousUsSi = () => {
  const router = useRouter();

  return (
    <FilterSideWrapper location={router.pathname}>
      <Head>
        <title>O nas - TheSailmaster.si | Najem jadrnice, katamarana, jahte - last minute</title>
        <meta
          name="description"
          content="TheSailmaster, najprijaznejše mesto za najem jadrnic, katamaranov in motornih plovil na Jadranu. Zagotovite si svoje sanjske počitnice po najnižjih cenah."
        />
        <meta content="O nas - TheSailmaster.si | Najem jadrnice, katamarana, jahte - last minute" />
        <meta
          property="og:description"
          content="TheSailmaster, najprijaznejše mesto za najem jadrnic, katamaranov in motornih plovil na Jadranu. Zagotovite si svoje sanjske počitnice po najnižjih cenah."
        />
      </Head>
      <div className="contact">
        <Row>
          <Col xs={12} sm={12}>
            <div className="col-inner about">
              <h1>O nas</h1>
              <p>
                TheSailmaster, najprijaznejše mesto za najem jadrnic, katamaranov in motornih plovil
                na Jadranu.
              </p>
              <p>
                Ljubiteljem morja, jadranja in morskih dogodivščin omogočamo enostaven, pregleden
                dostop do najboljših ponudb, v najkrajšem času in za najnižjo ceno. Zagotavljamo
                storitev po meri. Stalno razpoložljivost. Brezplačen postopek rezervacije. Preverite
                našo ponudbo na spletni strani www.thesailmaster.si in si zagotovite svoje sanjske
                počitnice.
              </p>
              <h2>Poslanstvo</h2>
              <p>
                Zagotavljamo enostaven najem raznovrstnih plovil in organizacijo navtičnih dogodkov,
                po najnižjih cenah. Osredotočeni smo na želje in zahteve strank, kar pomeni, da si
                zanje vzamemo čas, poiščemo najboljšo možnost glede cene in kakovosti, smo
                dosegljivi, prijazni, zanesljivi in prilagodljivi. Vzpostavljamo in ohranjamo
                odlične partnerske odnose, temelječe na zaupanju, in ustvarjamo prijetno delovno
                ozračje med zaposlenimi.
              </p>
              <h2>Vizija</h2>
              <p>
                S profesionalnim delom in motivirano ekipo želimo postati prepoznavni kot prvovrstni
                ponudnik navtičnih storitev na Jadranu.
              </p>
              <p>
                TheSailmaster naj predstavlja sinonim visoko kakovostnega, cenovno ugodnega,
                uporabnikom prijaznega in varnega najema plovil ter organizatorja navtičnih
                dogodkov.
              </p>
              <h2>Vrednote</h2>
              <ul>
                <li>odgovornost</li>
                <li>skrb za stranke in zaposlene</li>
                <li>kakovost</li>
                <li>poštenost in zaupanje</li>
                <li>gospodarnost</li>
              </ul>
              <h2>Ekipa</h2>
              <div className="team">
                <Row>
                  <Col xs={12} sm={6} md={6} className="team-item">
                    <img src="/media/team/jernej.jpg" className="img-fluid" alt="JERNEJ" />
                    <strong>JERNEJ</strong>
                    <p>
                      Idejni vodja, gonilna sila in ustanovitelj podjetja. Vezni člen ekipe.
                      Energičen, podjeten, preizkušen na področju najema plovil in svetovanja
                      strankam.
                    </p>
                  </Col>
                  <Col xs={12} sm={6} md={6} className="team-item">
                    <img src="/media/team/marko.jpg" className="img-fluid" alt="MARKO" />
                    <strong>MARKO</strong>
                    <p>
                      Z ekonomskim in finančnim znanjem doprinaša k uresničevanju zastavljenih
                      ciljev in gospodarnosti. Analitik, tržnik, ustanovitelj podjetja. Svetovalec
                      strankam.
                    </p>
                  </Col>
                  <Col xs={12} sm={6} md={6} className="team-item">
                    <img src="/media/team/bojan.jpg" className="img-fluid" alt="BOJAN" />
                    <strong>BOJAN</strong>
                    <p>
                      Informatik, z dolgoletnimi izkušnjami in strastno predan stroki. Naše zamisli
                      v najkrajšem času zavzeto in zanesljvo udejani.
                    </p>
                  </Col>
                  <Col xs={12} sm={6} md={6} className="team-item">
                    <img src="/media/team/nika.jpg" className="img-fluid" alt="NIKA" />
                    <strong>NIKA</strong>
                    <p>
                      Vsestranska, pozitivna. Vedno polna novih zamisli. Nepogrešljiva pri
                      administrativnih in organizacijskih delih v pisarni.{' '}
                    </p>
                  </Col>
                </Row>
              </div>
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

export default AbousUsSi;
