import React from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";

const PAGE_HTML = `
<h1>PRIVACY</h1>
<h2>IN GENERALE</h2>
<p align="justify">La societ&agrave; Eolis d.o.o., con sede in via Železna cesta 14, Lubiana (d'ora innanzi del testo: Eolis d.o.o.) rispetta la privacy e tratta in modo riservato tutti i dati che riceve dagli utenti dei servizi offerti e che utilizzano il sito internet www.thesailmaster.it o in altro modo, e che per poter svolgere i servizi e la propria attivit&agrave; detiene nelle proprie raccolte. S'impegna, inoltre, a tenere tutti i dati personali con la cura dovuta e di non trasmetterli a terzi, a meno ci&ograve; non sia necessario per la stipula ovvero la realizzazione del contratto di noleggio del natante o di altri servizi, o per l'attuazione delle leggi in vigore.</p>
<p align="justify">Per impedire l'accesso non autorizzato ai dati personali raccolti o la loro comunicazione e al fine di conservarne l'integrit&agrave;, Eolis d.o.o. utilizza misure tecniche ed organizzative idonee. Ciononostante vista la natura del commercio on-line e dell&rsquo;incessante progresso non pu&ograve; garantire la costante e totale protezione delle informazioni, che gli utenti trasmettono o ricavano dal sito www.thesailmaster.it, per tale motivo non &egrave; responsabile per eventuali utilizzi, acquisizioni o cessioni non autorizzate ed altre azioni con essere connesse da parte di terzi.</p>
<p align="justify">Gli utenti del sito www.thesailmaster.it confermano irrevocabilmente che con l'accesso al sito, oltre alle Condizioni generali di utilizzo hanno letto anche le regole di volta in volta valide sulla privacy e sulla protezione dei dati personali, e che oltre al loro utilizzo, convengono con esse. Con il monitoraggio del sito internet &egrave; possibile verificare eventuali cambiamenti e con essi anche il metodo ed il fine della pubblicazione delle raccolte dei dati. Le modifiche entrano in vigore con la loro pubblicazione.</p>
<h3>I cookies sul sito www.thesailmaster.it</h3>
<p align="justify">I cookies sono di fondamentale importanza per assicurare agli utenti dei servizi user friendly visto che con essi &egrave; possibile navigare nei contenuti delle pagine web con maggiore efficacia, permettendo al contempo anche di riconoscere eventuali visitatori del sito.</p>
<p align="justify">Per poter riconoscere i visitatori e fornire informazioni pi&ugrave; utili e per garantire un funzionamento irreprensibile del sito la societ&agrave; Eolis d.o.o. utilizza i cookies di Google Analytics. Con i dati raccolti tramite i cookies non viene autorizzato il riconoscimento personale.</p>
<p align="justify">Elenco dei cookies utilizzati:</p>
<table class="table">
<tbody>
<tr>
<td><em>nome cookies</em></td>
<td><em>durata</em></td>
<td><em>motivo di utilizzo</em></td>
</tr>
<tr>
<td>ga</td>
<td>2 anni</td>
<td>permette l'osservazione dei movimenti degli utenti sul sito internet</td>
</tr>
<tr>
<td>gat_gtag_</td>
<td>2 anni</td>
<td>
<p align="justify">rappresenta il codice identificativo del sito internet 							per il monitoraggio delle visite</p>
</td>
</tr>
<tr>
<td>gid:</td>
<td>24 ore</td>
<td>permette la distinzione tra gli utenti, senza alcuna informazione su di essi </td>
</tr>
</tbody>
</table>
<p align="justify">&nbsp;</p>
<h2>PROTEZIONE DEI DATI PERSONALI</h2>
<h3>Raccolta e trattamento dati personali</h3>
<p align="justify">Il dato personale &egrave; un'informazione che identifica l'utente.</p>
<p align="justify">Eolis d.o.o. a fronte dello svolgimento delle proprie attivit&agrave; e dei servizi ed esclusivamente a tal fine, ai sensi della normativa slovena ed europea (Legge sulla privacy, Legge sui consumatori, Legge sulle comunicazioni elettroniche e Regolamento generale sulla protezione dei dati personali) raccoglie e tratta i dati personali degli utenti dei propri servizi che vengono trasmessi con l'utilizzo del sito internet www.thesailmaster.it o in altro modo.</p>
<p align="justify">Con la trasmissione dei dati gli utenti forniscono il consenso per il loro trattamento.</p>
<p align="justify">Tipologie di dati personali raccolti:</p>
<ul>
<li>nome e cognome</li>
<li>indirizzo residenza</li>
<li>numero di telefono e numero di fax</li>
<li>email</li>
</ul>
<p align="justify">I dati raccolti servono a:</p>
<ul>
<li>invio eNews e avvisi</li>
<li>attivit&agrave; promozionale diretta</li>
<li>trattamento delle richieste degli utenti</li>
<li>stipula e attuazione di contratti di noleggio dei natanti ed altri servizi</li>
<li>analisi visite sito</li>
</ul>
<p align="justify">In base al consenso del singolo utente fornito con la dichiarazione o in altro modo, Eolis d.o.o. in qualit&agrave; di gestore, raccoglie e tratta anche i loro dati personali.</p>
<h3>Abbonamento ad eNews e avvisi</h3>
<p align="justify">Gli utenti del sito www.thesailmaster.it possono registrarsi e ricevere eNews e avvisi di particolari offerte, sconti, novit&agrave; o altro tipo di contenuti, connessi con i servizi offerti da Eolis d.o.o. sino a revoca.</p>
<p align="justify">Gli utenti per abilitarsi alla ricezione di eNews ed avvisi devono trasmettere l'indirizzo di posta elettronica assieme a nome e cognome. Con la trasmissione del modulo di registrazione si riceve all'indirizzo indicato anche la comunicazione di conferma, in seguito alla quale si provveder&agrave; ad inserire i dati dei destinatari di eNews ed avvisi.</p>
<h3>Diritti degli utenti</h3>
<p align="justify">Ogni utente pu&ograve; in qualsiasi momento per iscritto o con un click sul tasto Unsubscribe richiedere l'interruzione definitiva o temporanea dell'utilizzo dei propri dati personali ai fini di attivit&agrave; promozionale. La richiesta di che sopra verr&agrave; trattata entro 15 giorni dalla ricezione con relativo invio della risposta.</p>
<p align="justify">Ogni utente ha il diritto all'informazione. Chiunque ha facolt&agrave; di richiedere al titolare la cessione, la correzione, la cancellazione, la trasmissione o la limitazione di trattamento dei propri dati personali, come anche rifiutare il trattamento.</p>
<p align="justify">Il titolare dei dati personali &egrave;: Eolis d.o.o., Železna cesta 14, SI-Ljubljana. Eventuali richieste in merito a privacy o sul trattamento dei dati personali possono essere inviate a info@thesailmaster.it</p>
<p align="justify">Ultima modifica: 30. 6. 2020</p>
<p>&nbsp;</p>
`;

export default class PrivacyIt extends React.Component {
  render() {
    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>
            TheSailmaster - Dichiarazione della tutela sulla privacy
          </title>
          <meta
            name="description"
            content="TheSailmaster - Modalità di pagamento"
          />
          <meta
            property="og:title"
            content="Dichiarazione della tutela sulla privacy - TheSailmaster.it"
          />
          <meta
            property="og:description"
            content="TheSailmaster - Dichiarazione della tutela sulla privacy"
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
