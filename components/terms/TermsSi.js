import React from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FilterSideWrapper from "../common/FilterSideWrapper";

const PAGE_HTML = `
<h1 class="western">SPLO&Scaron;NI POGOJI 
UPORABE</h1>
<h2 class="western">SPLO&Scaron;NO</h2>
<p><a></a>Gospodarska družba EOLIS, d.o.o., s sedežem na Železni cesti 14, Ljubljana (v nadaljnjem besedilu: Eolis d.o.o.), preko svoje spletne strani www.thesailmaster.si ponuja informacijske storitve, organizacijo ter agencijsko posredovanje pri najemu plovil in drugih s tem povezanih, oziroma navtičnih storitev.</p>
<p>Za vse uporabnike spletne strani veljajo na tem mestu objavljeni Splo&scaron;ni pogoji uporabe.</p>
<p>Uporabnik spletne strani www.thesailmaster.si se z dostopom nanjo v celoti strinja s pogoji uporabe ter s pravili zasebnosti in varovanja osebnih podatkov. Eolis d.o.o., si pridržuje pravico, da te pogoje in pravila v kateremkoli času spremeni. Spremembam, ki pričnejo veljati s trenutkom objave, je uporabnik dolžan slediti. &Scaron;teje se, da je seznanjen z vsakokrat veljavnimi pogoji in pravili, da jih je razumel in se z njimi v celoti strinja.</p>
<p>Uporabnik je dolžan ob uporabi spletne strani in tudi sicer družbi Eolis d.o.o. posredovati le resnične in popolne podatke.</p>
<p>Eolis d.o.o. bo z uporabnikom spletne strani komunicirala na daljavo in mu po&scaron;iljala oglasna elektronska sporočila le, če bo za to podal privoljenje. Način odjave od prejemanja oglasnih sporočil bo v njih jasno predstavljen.</p>
<h3 class="western">Omejitev odgovornosti</h3>
<p>Eolis d.o.o., ne jamči za resničnost, točnost in popolnost ponudbenih vsebin, objavljenih na spletni strani www.thesailmaster.si, saj jih povzema od svojih poslovnih partnerjev – čarter podjetij.</p>
<p>Uporabnik izjavlja, da Eolis d.o.o. in njenih zaposlenih ne bo &scaron;tel za odgovorne za nadomestilo kakr&scaron;nihkoli morebitnih &scaron;kod ali stro&scaron;kov pravnega zastopanja, nastalih zaradi uporabe spletne strani www.thesailmaster.si, razen v primerih namerne zlorabe.</p>
<p>Eolis d.o.o., ne zagotavlja, da uporaba spletne strani www.thesailmaster.si ne bo prekinjena zaradi okvar na komunikacijskih povezavah, računalni&scaron;kega virusa, nepoobla&scaron;čenega dostopa, zlorabe podatkov ali kakr&scaron;nikoli drugih neprimernih dejanj tretjih oseb in zato ne odgovarja za s tem nastalo &scaron;kodo.</p>
<h2 class="western">SPLO&Scaron;NI POGOJI NAJEMA</h2>
<p>Ponudba s ceno najema plovil in drugih storitev posrednika (agencije) THESAILMASTER je objavljena na spletni strani www.thesailmaster.si in se lahko dnevno spreminja, ob povpra&scaron;evanju pa tudi prilagaja.</p>
<p>Posrednik za opravljene storitve ne obračunava nikakr&scaron;nih administrativnih stro&scaron;kov.</p>
<h3 class="western">Kontakt</h3>
<p>Za najem plovila ali druge storitve, objavljene na spletni strani, lahko uporabnik posrednika kontaktira po telefonu, elektronski po&scaron;ti, preko spletnega kontaktnega obrazca ali socialnih omrežij.</p>
<h3 class="western">Rezervacija, najem plovila in plačilo</h3>
<p>Posrednik na podlagi uporabnikovega povpra&scaron;evanja (predstavljenih želja) ponudbo konkretizira in ustrezna plovila postavi pod "opcijo". V času njene veljavnosti, ki zna&scaron;a največ 7 dni, se lahko uporabnik odloči za potrditev najema.</p>
<p>Za potrditev rezervacije (najema) in izdajo predračuna mora uporabnik posredniku posredovati:</p>
<ul>
<li>ime in priimek/podjetje,</li>
<li>naslov/sedež,</li>
<li>za podjetje ID za DDV,</li>
<li>telefonsko &scaron;tevilko in elektronski naslov.</li>
</ul>
<p>Rezervacija je potrjena, in s tem vzpostavljeno pogodbeno razmerje, s plačilom 50 % cene najema po predračunu. Preostali del cene se poravna najkasneje 5 tednov pred datumom najema plovila. V primeru Last minute najema, to je v časovnem obdobju 5 tednov ali manj do prevzema plovila, je treba poravnati 100 % cene po predračunu.</p>
<p>Posrednik za vsako izvr&scaron;eno plačilo po predračunu izda avansni račun.</p>
<p>Po potrjeni rezervaciji posreduje posrednik najemniku pogodbo v podpis, hkrati z obrazcem za popis posadke (crew list). Najemnik ju mora izpolnjena vrniti posredniku.</p>
<p>Po plačilu celotne cene po predračunu prejme najemnik potrdilo o prevzemu plovila (voucher), in sicer v tednu pred pričetkom najema. Potrdilo mu omogoča prevzem plovila pri čarter podjetju.</p>
<p>Račun je izdan po zaključenem najemu.</p>
<h3 class="western">Najem drugih storitev</h3>
<p>Najem drugih storitev (skiper, hostesa, kuhar itd.) je mogoč tudi brez najetja plovila, ob upo&scaron;tevanju vsakokratnih zanje podanih pogojev izbranega čarter podjetja.</p>
<h3 class="western">Cena in zavarovanje</h3>
<p>Cena najema vključuje uporabo opremljenega plovila z običajno obrabo, njegovo zavarovanje proti tretjim osebam, kasko zavarovanje ob lastni udeležbi (kavcija) in privez v matični marini, če je v njej za plovilo zakupljen celoletni privez. V ceno niso vključeni gorivo in druge posebne storitve ter takse in privezi v tujih marinah in sidri&scaron;čih, v zavarovanje pa ne nezgode oseb na plovilu, nastala &scaron;koda na stvareh, prine&scaron;enih na plovilo, in &scaron;koda, povzročena z nepravilno uporabo ali izgubo opreme na plovilu.</p>
<h3 class="western">Var&scaron;čina in drugi obvezni stro&scaron;ki</h3>
<p>Najemnik ob prevzemu plovila v marini položi var&scaron;čino (kavcijo) z gotovino ali kreditno kartico v znesku, ki je po ceniku čarter podjeta zapisana v pogodbi. Var&scaron;čina se najemniku vrne v celoti, če je plovilo vrnjeno pravočasno, nepo&scaron;kodovano in s polnim rezervoarjem goriva, v nasprotnem primeru pa znižana za dejanske stro&scaron;ke, nastale zaradi popravila ali nadomestitve po&scaron;kodovanih ali izgubljenih delov stvari s plovila ali delov opreme. &Scaron;kode, nastale zaradi pregretja motorja in po&scaron;kodb jader, kot posledice naklepnega ravnanja ali malomarnega upravljanja z njimi, krije najemnik v celoti. Od&scaron;kodnina se obračuna ob vrnitvi plovila, v primeru, da nastalih stro&scaron;kov ni mogoče obračunati takoj, pa ob zadržanju ustreznega dela ali celotne var&scaron;čine v roku, ki je odvisen od politike čarter podjetja.</p>
<p>Najemnik plača var&scaron;čino tudi ob najetju plovila s skiperjem. V tem primeru se iz nje ne krijejo stro&scaron;ki, nastali zaradi skiperjeve nepazljivosti, napak ali slabega upravljanja plovila in opreme.</p>
<p>Var&scaron;čino je mogoče zavarovati. To možnost omogoča posrednik po ceniku in pravilih zavarovalnice Yacht Pool (YACHT INSURANCE d.o.o., Poreč). Zneska zavarovanja se najemniku ne vrača.</p>
<p>Ob prevzemu plovila plača najemnik tudi turistično takso ter stro&scaron;ke či&scaron;čenja plovila in posteljnine (transit log).</p>
<h3 class="western">Podalj&scaron;anje najema</h3>
<p>O možnosti podalj&scaron;anja najema plovila se najemnik v času pred njegovim prevzemom in po njem dogovarja izključno s posrednikom. Za ravnanje v nasprotju s to določbo je najemnik od&scaron;kodninsko odgovoren.</p>
<p>Najem je podalj&scaron;an s sklenitvijo dodatne pogodbe in z izvr&scaron;enim plačilom zanj.</p>
<h3 class="western">Odstop od najema</h3>
<p>V primeru, da najemnik (s posadko) iz kateregakoli razloga ne more pričeti z najemom plovila, lahko s soglasjem posrednika najde drugo osebo, ki prevzame njegove pravice in obveznosti iz sklenjene pogodbe. Če druge osebe ne uspe najti, posrednik zadrži:</p>
<ul>
<li>30 % cene najema v primeru, da sam najde nadomestnega najemnika za odpovedani termin,</li>
<li>če mu to ne uspe, pa 50 % cene najema za odpoved do 5 tednov pred začetkom najema in 100 % cene najema za odpoved, dano v obdobju, ki je kraj&scaron;e od 5 tednov pred začetkom najema.</li>
</ul>
<p>Posrednik lahko odda plovilo v najem drugi osebi, če najemnik v 8 dneh od dneva zapadlosti predračuna ne poravna cene najema. Dotlej izvr&scaron;ena plačila posrednik zadrži.</p>
<p>V izogib navedenim situacijam lahko najemnik sklene zavarovanje rizika odpovedi najema.</p>
<h3 class="western">Obveznosti najemnika:</h3>
<p>Najemnik izjavlja, da ima on sam ali drug član posadke, ki bo upravljal plovilo, veljavno dovoljenje za plovbo ter primerno jadralsko in navigacijsko znanje (izjava ni potrebna v primeru najema plovila s skiperjem).</p>
<p>Najemnik se obvezuje:</p>
<ul>
<li>do bo z najetim plovilom in pripadajočo opremo ravnal skrbno in vestno, kot dober gospodar;</li>
<li>da bo plovilo uporabljal le na območju teritorialnih voda in dosledno spo&scaron;toval predpise o plovbi, pomorske predpise in pomorske običaje;</li>
<li>da bo plovilo uporabljal zgolj za dopustni&scaron;ke namene, da ga ne bo posojal tretjim osebam in tudi ne uporabljal za pridobitni&scaron;ke namene. Na plovilu so lahko le tiste osebe, ki so vpisane v spisek posadke (crew listo);</li>
<li>da s plovilom ne bo sodeloval na regatah, razen če je to pisno dogovorjeno;</li>
<li>da s plovilom ne bo vlekel drugih plovil, razen v primeru skrajne sile;</li>
<li>da bo dnevno pregledoval nivo motornega olja in hladilne tekočine;</li>
<li>da bo plovilo in njegovo opremo vestno in skrbno prevzel ter predal;</li>
</ul>
<h3 class="western">Po&scaron;kodbe plovila</h3>
<p>Najemnik mora v primeru kakr&scaron;nihkoli napak ali po&scaron;kodb plovila ali njegove opreme nemudoma obvestiti čarter podjetje in obenem tudi posrednika, ter se ravnati po danih navodilih. Pri huj&scaron;ih po&scaron;kodbah, nesrečah, kraji ali nesposobnosti manevriranja mora sestaviti "poročilo o &scaron;kodi" in ga overiti pri lu&scaron;ki kapetaniji ali policiji, če to ni mogoče pa v marini, pri zdravniku ali dveh pravno opravilnih osebah.</p>
<p>Napake ali okvare instrumentov ali opreme plovila najemniku ne dajejo pravice prekinitve najema in tudi ne pravice do finančnih nadomestil, če je pravilna navigacija mogoča s klasičnimi metodami plovbe in če je zagotovljena varnost plovila in posadke.</p>
<p>Čarter podjetje lahko morebitne po&scaron;kodbe plovila, nastale v času najema, preverja tudi z usposobljenim potapljačem ali dvigom plovila iz vode. To storitev lahko najemniku tudi posebej obračuna.</p>
<h3 class="western">Prevzem in vrnitev plovila</h3>
<p>Plovilo se najemniku preda na dogovorjenem kraju in v dogovorjenem času. Če ga iz objektivnih razlogov ni mogoče predati, se najemniku zagotovi nadomestno plovilo podobnih ali bolj&scaron;ih karakteristik za isto ceno najema, če tudi tega ni mogoče predati v roku, se najemnina ustrezno zniža za vsak zamujeni dan. Če plovila ni mogoče predati do preteka 40 ur od dogovorjenega roka ali v kraju, ki je od matične marine oddaljen manj od 30 navtičnih milj, ima najemnik pravico odstopiti od pogodbe. V tem primeru prejme povrnjeno najemnino, ni pa upravičen do kakr&scaron;nihkoli drugih nadomestil. Če najemnik v roku 24 ur od dogovorjenega roka ne prevzame plovila in svoje zamude ne javi, lahko posrednik plovilo odda drugi osebi.</p>
<p>Najemnik mora pri prevzemu plovila skrbno preveriti njegovo stanje in stanje opreme. Vse pripombe in pomanjklivosti morajo biti vnesene v primopredajni zapisnik. Kasnej&scaron;i ugovori glede plovne sposobnosti ali opreme so izključeni.</p>
<p>Skiper se je dolžan ob prevzemu dobro spoznati s plovilom, z njegovo opremo in instrumenti, načinom njihovega delovanja in z njihovim potrebnim vzdrževanjem za čas najema. Čarter podjetje ima pravico, da ob ugotovljeni skiperjevi nezmožnosti varnega upravljanja s plovilom (iz kakr&scaron;negakoli razloga), tega ne preda, ali da posadki dodeli usposobljenega skiperja (če je to mogoče), ki ga mora najemnik posebej plačati.</p>
<p>Najemnik se obvezuje, da bo vrnil plovilo na dogovorjeno mesto in v dogovorjenem času (v ta namen mora plovbo prilagoditi vremenskim razmeram) ter nepo&scaron;kodovano in s polnim rezervoarjem goriva. Ob rednih tedenskih terminih najema se plovila vrača zvečer pred njegovim zaključkom, razen če ni s soglasjem čarter podjetja dogovorjeno drugače. V primeru, da plovila ne bo mogel vrniti pravočasno in na dogovorjeni kraj, mora o tem nemudoma obvestiti čarter podjetje in obenem tudi posrednika, ter slediti danim navodilom. Vse stro&scaron;ke, nastale zaradi zamude, krije najemnik, v skladu s pogoji čarter podjetja.</p>
<h3 class="western">Najem plovila s skiperjem</h3>
<p>Dolžnosti najetega skiperja so omejene le na upravljanje plovila in opreme ter plovbo. Najemnik in posadka se morajo med plovbo brezpogojno podrejati skiperjevim poveljem, v nasprotnem primeru lahko skiper odstopi od najema.</p>
<h3 class="western">Domače živali</h3>
<p>Na plovilo domačih živali ni dovoljeno jemati, razen po drugačnem predhodnem dogovoru.</p>
<h3 class="western">Od&scaron;kodninski zahtevki</h3>
<p>Morebitne od&scaron;kodninske zahtevke je mogoče posredniku podati pisno v roku 8 dni po končanem najemu, s priporočeno po&scaron;iljko. Nana&scaron;ajo se lahko zgolj na pripombe in pritožbe, ki so bile ob predaji plovila vpisane v primopredajni zapisnik.</p>
<p>Posrednik in najemnik si bosta vse morebitne spore prizadevala re&scaron;iti sporazumno. V primeru, ko to ne bo mogoče, je za re&scaron;evanje sporov pristojno sodi&scaron;če na območju posrednikovega sedeža.</p>
<p>&nbsp;</p>
<p>Zadnja sprememba: 30. 6. 2020</p>
`;

export default class TermsSi extends React.Component {
  render() {
    return (
      <FilterSideWrapper location={this.props.location.pathname}>
        <Helmet>
          <title>
            Splošni pogoji uporabe - TheSailmaster.si | Najem jadrnice,
            katamarana, jahte - last minute
          </title>
          <meta
            name="description"
            content="Gospodarska družba EOLIS, d.o.o., s sedežem na Železni cesti št. 14, Ljubljana, preko spletnega portala www.thesailmaster.si ponuja informacijske storitve, organizacijo ter posredovanje pri najemu plovil in drugih s tem povezanih, oziroma navtičnih storitev."
          />
          <meta
            property="og:title"
            content="Splošni pogoji uporabe - TheSailmaster.si | Najem jadrnice, katamarana, jahte - last minute"
          />
          <meta
            property="og:description"
            content="Gospodarska družba EOLIS, d.o.o., s sedežem na Železni cesti št. 14, Ljubljana, preko spletnega portala www.thesailmaster.si ponuja informacijske storitve, organizacijo ter posredovanje pri najemu plovil in drugih s tem povezanih, oziroma navtičnih storitev."
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
