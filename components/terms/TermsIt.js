import React from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";

const PAGE_HTML = `
<h1>TERMINI E CONDIZIONI</h1>
<h2>IN GENERALE</h2>
<p>La societ&agrave; EOLIS, d.o.o., con sede in via Železna cesta 14, Lubiana (d'ora innanzi del testo: Eolis d.o.o.), offre tramite i proprio sito internet www.thesailmaster.it informazioni, organizzazione e mediazione per noleggio di natanti ed altri servizi nautici, connessi con i precedenti.</p>
<p>A tutti gli utenti del sito vengono applicate le Condizioni generali qui di seguito pubblicate.</p>
<p>L'utente del sito www.thesailmaster con l'accesso al predetto conferma di convenire <em>in toto</em> con le condizioni di utilizzo e con le norme di privacy e riservatezza dei dati. EOLIS, d.o.o., si riserva il diritto di modificare le regole e le condizioni in qualsiasi momento. L'utente deve rispettare le modifiche che entrano in vigore immediatamente con la pubblicazione. Si ritiene che egli sia al corrente di regole e condizioni, di volta in volta valide al momento dell'utilizzo, che le abbia comprese ed accettate senza riserve.</p>
<p>Per poter utilizzare il sito internet, l'utente &egrave; tenuto a trasmettere alla societ&agrave; Eolis d.o.o., solo dati veritieri e completi.</p>
<p>Eolis d.o.o. comunicher&agrave; con l'utente del sito internet a distanza, inviando messaggi commerciali per email, nel caso dia il consenso. La cancellazione della ricezione dei messaggi commerciali verr&agrave; spiegata in modo chiaro e comprensibile.</p>
<h3>Limitazione di responsabilit&agrave;</h3>
<p>La societ&agrave; EOLIS, d.o.o. non garantisce per la veridicit&agrave;, la puntualit&agrave; e la completezza dei contenuti, pubblicati sul sito internet www.thesailmaster.it, visto che li raccoglie dai propri partner commerciali - societ&agrave; di charter.</p>
<p>L'utente dichiara espressamente di esonerare tanto Eolis d.o.o. quanto i suoi dipendenti da eventuali richieste di risarcimento danni o spese di rappresentanza legale, insorti nell'utilizzo del sito internet www.thesailmaster.it, ad eccezione dei casi in cui non se ne accerti l'intenzionale abuso.</p>
<p>Eolis d.o.o. non garantisce l'accesso ininterrotto al sito internet www.thesailmaster.it, sul quale possono influire interruzioni di servizio, dovute a guasti nella connessione di comunicazione, virus, accesso non autorizzato, uso illecito di dati o qualsiasi altra azione indebita da parte di terzi e per tale motivo nemmeno risponde per eventuali danni da essi derivanti.</p>
<h2>CONDIZIONI GENERALI DI NOLEGGIO</h2>
<p>L'offerta con i relativi prezzi di noleggio dei natanti e di altri servizi dell'intermediario (agenzia) THESAILMASTER &egrave; pubblicata sul sito internet www.thesailmaster.it ed &egrave; passibile a modifiche anche giornaliere, o di adattamenti in caso di specifica richiesta.</p>
<p>Per i servizi prestati l'intermediario non conteggia alcuna spesa amministrativa.</p>
<h3>Contatti</h3>
<p>Per informazioni su noleggio del natante o altri servizi, pubblicati sul sito internet, l'utente pu&ograve; contattare l'intermediario per telefono, email, modulo telematico in rete o social network.</p>
<h3>Prenotazione, noleggio del natante e pagamento</h3>
<p>L'intermediario redige l'offerta in base alla richiesta dell'utente (desideri indicati) e la concretizza presentando il natante idoneo a titolo di "opzione". Durante la validit&agrave; dell'offerta, che non &egrave; mai maggiore di 5 giorni, l'utente ha facolt&agrave; di decidere se accettare o meno l'offerta di noleggio.</p>
<p>Per confermare la prenotazione (noleggio) e ricevere la fattura proforma, l'utente deve trasmettere all'intermediario i seguenti dati:</p>
<ul>
<li>nome e cognome/societ&agrave;,</li>
<li>indirizzo/sede,</li>
<li>per le societ&agrave; P.IVA,</li>
<li>numero telefonico ed email.</li>
</ul>
<p>La prenotazione viene confermata e con essa anche la creazione di un rapporto contrattuale con il pagamento del 50 % del prezzo di noleggio, indicato appunto nel proforma di fattura. La parte restante dell'importo deve essere corrisposto al pi&ugrave; tardi entro 5 settimane prima della data di inizio del noleggio del natante. In caso di noleggio last minute, cio&egrave; entro un periodo inferiore di 5 settimane o meno dal ritiro del natante, &egrave; necessario corrispondere il 100 % del prezzo indicato nel proforma di fattura.</p>
<p>L'intermediario provvede ad emettere fattura di anticipo per ogni versamento corrisposto ai sensi nel proforma di fattura inviato.</p>
<p>Con la conferma della prenotazione l'intermediario trasmette al noleggiante il contratto da sottoscrivere, assieme al modulo per la rilevazione dati dell'equipaggio (crew list). Il noleggiatore deve rendere all'intermediario i documenti di cui sopra compilati.</p>
<p>In seguito al pagamento del prezzo come da proforma di fattura il noleggiante riceve la conferma di ritiro del natante (voucher) nella settimana prima dell'inizio del noleggio vero e proprio. Tale conferma gli d&agrave; diritto al ritiro del natante presso la societ&agrave; di charter.</p>
<p>La fattura verr&agrave; rilasciata a conclusione del noleggio.</p>
<h3>Altri servizi</h3>
<p>L'offerta di altri servizi (skipper, cuoco, assistenti, ecc.) pu&ograve; essere usufruita anche senza il noleggio del natante, prendendo in debita considerazione le condizioni indicate di volta in volta dalla societ&agrave; di charter scelta.</p>
<h3>Prezzo e assicurazione</h3>
<p>Il prezzo del noleggio comprende l'utilizzo del natante allestito, considerando la regolare usura del predetto, l'assicurazione responsabilit&agrave; civile e caso in caso di implicazioni in prima persona (cauzione) come anche l'attracco nella marina di partenza, nel caso sia stato pagato l'affitto dell'attracco per tutto l'anno. Nel prezzo non sono inclusi il carburante ed altri servizi, imposte e ormeggi in altre marine e ancoraggi, nell'assicurazione non sono inclusi infortuni per persone a bordo, danni su cose, portate a bordo, e danni causati dall'utilizzo improprio o perdita dell'attrezzatura del natante.</p>
<h3>Cauzione ed altri costi obbligatori</h3>
<p>Il noleggiante, con il ritiro del natante presso la marina, deve pagare la cauzione in contanti o con carta di credito per l'importo, che la societ&agrave; di charter indicher&agrave; ai sensi del listino indicato nel contratto. La cauzione viene restituita integralmente al noleggiante, in caso di riconsegna del natante entro i termini, intatto e con il serbatoio pieno, in caso contrario l'importo viene ridotto per i costi effettivi, dovuti a riparazione e sostituzione di parti danneggiate o smarrite dal natante o di parte dell'allestimento. I danni causati per surriscaldamento del motore o danneggiamento delle vele, dovuti a comportamenti imputabili a dolo eventuale o negligenza, dovranno essere risarciti interamente dal noleggiante. L'importo per il risarcimento dei danni viene computato alla restituzione del natante, nel caso i danni non possano essere accertati nell'immediatezza, verr&agrave; trattenuto un importo idoneo o tutta la cauzione e il calcolo verr&agrave; fatto entro il termine in uso ai sensi delle politiche della societ&agrave; di charter</p>
<p>Il noleggiante deve versare la caparra anche per il noleggio del natante con lo skipper. In questo caso gli eventuali danni causati per disattenzione, errore o cattiva gestione del natante e dell'attrezzatura da parte dello skipper non vengono coperti dalla predetta caparra.</p>
<p>La caparra pu&ograve; essere coperta da garanzia. Tale possibilit&agrave; viene garantita dall'intermediario in base al listino prezzi e le regole dettate dall'assicurazione Yacht Pool (YACHT INSURANCE d.o.o., Parenzo). L'importo dell'assicurazione non viene restituito.</p>
<p>Con il ritiro del natante il noleggiante deve corrispondere anche la tassa turistica, le spese di pulizia ed il contributo per la biancheria (transit log).</p>
<h3>Proroga del noleggio</h3>
<p>Il noleggiante deve accordarsi con l'intermediario in caso di eventuale proroga del noleggio del natante, prima e dopo il ritiro di quest'ultimo. In caso di violazione della disposizione di cui sopra, il noleggiatore deve rimborsare i danni.</p>
<p>Il noleggio viene prorogato con la stipula di un contratto di noleggio aggiuntivo e con una maggiorazione del prezzo di noleggio.</p>
<h3>Rescissione del contratto di noleggio</h3>
<p>Nel caso il noleggiante (con l'equipaggio) per un qualsiasi motivo non possa dare seguito al noleggio del natante pattuito, pu&ograve;, previo consenso l'intermediario, trovare altra persona, che si assuma i diritti ed i doveri derivanti dalla stipula del contratto. Nel caso il noleggiante non dovesse trovare un'altra persona, l'intermediario ha il diritto di trattenere:</p>
<ul>
<li>il 30 % del prezzo di noleggio nel caso trovi autonomamente un altro noleggiante per il periodo prenotato e disdetto,</li>
<li>nel caso ci&ograve; non fosse possibile il 50 % del prezzo di noleggio per la cancellazione della prenotazione entro 5 settimane prima dell'inizio del noleggio effettivo e il 100 % del prezzo per le cancellazioni pervenute in un periodo inferiore alle 5 settimane prima dell'inizio del noleggio.</li>
</ul>
<p>L'intermediario ha diritto di noleggiare ad altra persona anche nel caso il noleggiante, entro 8 giorni dalla decorrenza del pagamento della proforma fattura, non dovesse pagare l'importo pattuito del noleggio. L'intermediario provveder&agrave; a trattenere tutti gli importi sino ad allora versati.</p>
<p>Per evitare le situazioni di cui sopra, il noleggiatore pu&ograve; stipulare una polizza assicurativa contro rischi di disdetta di noleggio.</p>
<h3>Doveri del noleggiante:</h3>
<p>Il noleggiante, come anche ogni altro membro dell'equipaggio, che provveder&agrave; a timonare il natante, dichiara di avere la patente nautica valida e capacit&agrave; e conoscenze idonee di navigazione e veleggiamento (tale dichiarazione non &egrave; necessaria in caso di noleggio del natante con lo skipper).</p>
<p>Il noleggiatore s'impegna:</p>
<ul>
<li>ad utilizzare il natante noleggiato e tutta la relativa attrezzatura con la dovuta diligenza ed alla stregua del buon padre di famiglia;</li>
<li>ad utilizzare il natante esclusivamente entro le acque territoriali e rispettare in modo pedissequo regole e norme nautiche, sulla navigazione e sugli usi e costumi di pertinenza;</li>
<li>ad utilizzare il natante ai soli fini riferiti alle vacanze, di non prestarlo a terzi e non utilizzarlo ai fini commerciali; sul natante possono esservi solo le persone indicate nella lista dell'equipaggio (crew list);</li>
<li>a non utilizzare il natante per regate, a meno che non sia stato previamente concordato diversamente per iscritto;</li>
<li>a non utilizzare il natante per trainare altre imbarcazioni, a meno che ci&ograve; non sia assolutamente necessario;</li>
<li>a verificare giornalmente il livello dell'olio e del liquido refrigerante;</li>
<li>a prendersi carico, restituire ed utilizzare il natante con tutta l'attrezzatura in modo consono, avendone debita cura.</li>
</ul>
<h3>Danni sul natante</h3>
<p>Il noleggiante deve, in caso di accertamento di qualsiasi tipo di difetto o danno del natante, comunicare immediatamente tali circostanze alla societ&agrave; di charter ed anche all'intermediario e comportarsi secondo le indicazioni fornite. In caso di gravi danni, incidenti, furto o incapacit&agrave; di manovrare deve redigere una "relazione del danno" e farla avallare presso la capitaneria di porto o polizia, se ci&ograve; non fosse possibile, deve provvedervi presso la marina, il medico o due persone con idonea capacit&agrave; giuridica nel settore.</p>
<p>Eventuali difetti o mal funzionamento degli strumenti o dell'attrezzatura del natante non danno il diritto al noleggiante ad indennizzi finanziari, nel caso fosse possibile navigare con metodi classici e fosse garantita la sicurezza del natante e dell'equipaggio.</p>
<p>La societ&agrave; di charter ha facolt&agrave; di verificare eventuali danni sul natante, insorti durante il periodo di noleggio anche con un sub professionista o issando il natante dall'acqua. Tale servizio &egrave; a carico del noleggiante e verr&agrave; addebitato separatamente.</p>
<h3>Ritiro e restituzione del natante</h3>
<p>Il natante verr&agrave; consegnato al noleggiante nel posto e nei tempi convenuti. Se per motivi oggettivi ci&ograve; non fosse possibile, verr&agrave; garantito al noleggiante un natante sostitutivo con caratteristiche simili o migliori allo stesso prezzo di noleggio, e se non fosse possibile consegnarlo entro i termini pattuiti, verr&agrave; garantito al noleggiante una riduzione idonea del prezzo di noleggio per ogni giorno di ritardo. Se non fosse possibile consegnare il natante entro le 40 ore dalla scadenza pattuita o nel luogo che dalla marina pattuita per il ritiro dista meno di 30 miglia nautiche, il noleggiante ha diritto di rescindere il contratto. In questo caso al noleggiante viene restituito l'importo del noleggio, ma non ha diritto al alcun altro rimborso o indennit&agrave;. Nel caso il noleggiante entro 24 ore dal termine pattuito non dovesse ritirare il natante, e non dovesse comunicare il ritardo, l'intermediario ha facolt&agrave; di noleggiare il natante ad un terzo.</p>
<p>Il noleggiante deve verificare con la massima cura lo stato del natante e dell'attrezzatura. Eventuali osservazioni e carenze devono essere indicate nel verbale di consegna. Successivi reclami o lagnanze in merito alle capacit&agrave; di navigazione o allo stato dell'attrezzatura non saranno accettate.</p>
<p>Lo skipper &egrave; tenuto a prendere conoscenza con il natante con il ritiro dello stesso, come anche con l'attrezzatura e gli strumenti, il metodo di funzionamento e manutenzione necessari per tutto il periodo di noleggio. La societ&agrave; di charter ha diritto, in caso di accertamento dell'impossibilit&agrave; dello skipper di timonare il natante in sicurezza (indipendente dal motivo) di non consegnare il natante, o di dare all'equipaggio uno skipper abilitato (se possibile) che il noleggiatore dovr&agrave; pagare separatamente.</p>
<p>Il noleggiante s'impegna a restituire il natante nel luogo e nei tempi convenuti (a tal fine deve adattare la navigazione alle condizioni meteorologiche) e restituirlo integro, con il serbatoio pieno. Durante i termini settimanali usuali di noleggio il natante deve essere reso la sera prima della decorrenza, a meno che la societ&agrave; di charter non abbia dato la propria approvazione e confermato diversamente. Nel caso il noleggiante non fosse in grado di restituire il natante entro i termini e nel luogo pattuito, deve avvisare immediatamente di un tanto la societ&agrave; di charter ed anche l'intermediario e seguire le indicazioni che gli verranno impartite. Tutte le spese dovute al ritardo sono a carico del noleggiante ai sensi delle condizioni indicate dalla societ&agrave; di charter.</p>
<h3>Noleggio natante con skipper</h3>
<p>I doveri dello skipper incaricato sono limitati unicamente alla conduzione del natante e alla gestione dell'attrezzatura e alla navigazione. Il noleggiante e l'equipaggio durante la navigazione devono rispettare incondizionatamente le istruzioni impartite, in caso contrario lo skipper ha facolt&agrave; di rescindere l'incarico.</p>
<h3>Animali domestici</h3>
<p>Sui natanti non &egrave; consentito portare animali domestici, a meno che non sia stato convenuto preventivamente in modo diverso.</p>
<h3>Risarcimento danni</h3>
<p>Eventuali domande di risarcimento danni devono essere presentate per mezzo di posta raccomandata all'intermediario per iscritto entro 8 giorni dalla fine del noleggio. Tali lamentele possono riferirsi unicamente a osservazioni e reclami, gi&agrave; indicati nel verbale in occasione della consegna del natante.</p>
<p>L'intermediario ed il noleggiante tenteranno di risolvere eventuali liti in modo bonario. Nel caso ci&ograve; non fosse possibile, il tribunale competente per la soluzione delle liti &egrave; quello presente nell'area della sede dell'intermediario.</p>
<p>Ultima modifica: 30. 6. 2020</p>
`;

export default class TermsIt extends React.Component {
  render() {
    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>Termini e condizioni - TheSailmaster.it</title>
          <meta
            name="description"
            content="Termini e condizioni - TheSailmaster.it"
          />
          <meta
            property="og:title"
            content="Termini e condizioni - TheSailmaster.it"
          />
          <meta
            property="og:description"
            content="Termini e condizioni - TheSailmaster.it"
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
