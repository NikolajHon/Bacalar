import React from 'react';
import Obr1 from '../../../images/EleventhPageImg/Obr1.png'
import phone from '../../../images/EleventhPageImg/phone.png'
import letter from '../../../images/EleventhPageImg/letter.png'
import Obr2 from '../../../images/EleventhPageImg/Obr2.png'

const LessonOverview = () => {
    return (
        <div className="lesson-overview" id="section-0">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Téma: Sokety - sieťová komunikácia</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td>klient, server, socket, medziprocesová komunikácia</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                <li>základné princípy komunikácie medzi
                                    procesmi prostredníctvom socketov
                                </li>
                                <li>model klient/server</li>
                                <li>syntax jednotlivých služieb</li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>priebehu komunikácie pomocou socketov</td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>služby jadra spojené s komunikáciou cez sockety</td>
                        </tr>
                        <tr>
                            <td className="section-title">Vyriešiť:</td>
                            <td>
                                <li>nadviazať spojenie pomocou socketov</li>
                                <li>využiť získané skúsenosti pri tvorbe
                                    programov
                                </li>
                            </td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>60 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Sofia dostala za úlohu vytvoriť procesy, ktoré by komunikovali
                        v rámci počítačovej siete pomocou protokolov spojovanej služby.
                        Až doteraz sa Sofia spoliehala na zdieľané zdroje systému jedného
                        počítača. Jeden proces má plniť rolu servera a druhý rolu klienta. Pri
                        analýze úlohy musí zistiť, aké ma použiť služby jadra na strane
                        procesu-servera a procesu-klienta pri použití spojovanej
                        komunikácie. Pri riešení tejto úlohy má použiť komunikačný nástroj
                        socket, ktorý umožňuje procesom komunikovať prostredníctvom
                        počítačovej siete
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            Táto kapitola sa zameriava na:
            <ul>
                <li><strong>Systémové volania:</strong>
                    <ul>
                        <li className='terminal-command'>socket()</li>
                        <li className='terminal-command'>bind()</li>
                        <li className='terminal-command'>listen()</li>
                        <li className='terminal-command'>accept()</li>
                        <li className='terminal-command'>connect()</li>
                    </ul>
                </li>
            </ul>
            <div className={'title-box'}><strong>KRÁTKY ÚVOD</strong></div>
            Komunikačný mechanizmu socket je obojsmernou komunikačnou technológiou.
            Umožňuje komunikáciu medzi procesmi na tom istom počítači (tzv. sockety unixovej
            domény) alebo s procesmi vykonávanými na iných počítačoch prostredníctvom
            počítačovej siete (tzv. sockety internetovej domény). Možno s ním pracovať ako so
            súborom, má pridelený vlastný jedinečný deskriptor. <br/> <br/>
            <strong>Model Klient – Server</strong> <br/>
            Model Klient – Server
            Jedným zo základných modelov pre komunikáciu medzi procesmi prostredníctvom
            socketov je model klient–server. Tento model je založený na existencii dvoch typov
            procesov: procesu-servera a procesu-klienta. Proces-server vykonáva pasívnu úlohu -
            čaká na požiadavky od klientských procesov, ktorým poskytuje nejakú „službu“. Proces
            klient vykonáva aktívnu úlohu na tom istom počítači alebo na inom počítači. Je to
            proces odosielajúci požiadavky na spojenie a využívajúci služby procesu server. Klienti,
            ktorí spolupracujú s jedným typom servera, môžu byť rôzneho typu a môžu sa navzájom
            líšiť používateľským prostredím.
            <img src={Obr1} alt="Obr1"/> <br/>

            Server sám inicializuje a následne pozastaví svoju činnosť dovtedy, kým nepríde
            požiadavka zo strany klienta (pozri Obr. 1). Server a klient vzájomne kooperujú pri
            riešení jednotlivých úloh. Procesy typu klient väčšinou inicializuje používateľ. Je
            dôležité pochopiť, že nie počítač určuje, kto je klient a kto je server, ale proces, ktorý
            využíva sockety. Spolupráca klienta so serverom je zabezpečená prostredníctvom
            komunikačného systému a protokolov počítačových sieti. Komunikačný systém
            pozostáva z týchto častí:
            <li><i>IP adresa</i> je adresa stroja (vzťahuje sa na jeho sieťové rozhranie), kde je
                komunikujúci proces vykonávaný. Pomocou nej dokážu s týmto procesom
                komunikovať iné procesy v rámci počítačovej siete. IP adresu tvoria štyri bajty,
                interpretované ako 32-bitové celé číslo (IPv4; novsí protkol IPv6 rozširuje IP
                adresu na 16 bajtov). </li>
            <li><i>Port</i> je celočíselný identifikátor komunikujúceho procesu, na ktorom sú
                vybavované požiadavky procesov (na strane servera sa zvyčajne používajú tzv.
                známe porty (angl. well known) do 1024 a na strane klienta sa využívajú
                dynamicky prideľované od 1024).
            </li>
            Súbor
            protokolov <strong>TCP/IP</strong> (<strong>T</strong>ransmission <strong>C</strong>ontrol <strong>P</strong>rotocol/<strong>I</strong>nternet <strong>P</strong>rotocol)
            je určený
            pre prepájanie heterogénnych sieti, t.j. sieti rôznych ako po stránke technickej, tak aj
            programovej. Protokol TCP/IP pozostáva zo skupiny protokolov, z ktorých pre prácu so
            socketmi na štvrtej vrstve TCP/IP modelu sa využívajú protokoly uvedené v nasledujúcej tabuľke
            <table>
                <caption><strong>TCP/IP protokoly</strong></caption>
                <tr>
                    <th>Spojované služby (protokoly TCP)</th>
                    <th>Nespojované služby (protokoly UDP)</th>
                </tr>
                <tr>
                    <td>
                        <img src={phone} alt="Phone"/>
                        <br/>
                        Jeden partner zavolá <br/>
                        Druhý akceptuje volanie<br/>
                        Spojenie je vytvorené<br/>
                        Začína komunikácia<br/>
                        Jeden z partnerov ukončí <br/>komunikáciu uzatvorením spojenia<br/>
                        Synchronné<br/>
                        Okamžité potvrdeni<br/>
                        Réžia vytvorenia spojenia<br/>
                        Stavové

                    </td>
                    <td>
                        <img src={letter} alt="Letter"/>
                        <br/>
                        Odosielateľ napíše list <br/>
                        Na obálku napíše adresu prijímateľa <br/>
                        Doručí list na poštu<br/>
                        Prijímateľ obdrží list (?)<br/>
                        Asynchronné<br/>
                        Zásadná neurčitosť<br/>
                        Réžia smerovania každej správy<br/>
                        Bezstavové<br/>

                    </td>
                </tr>
            </table>
            <pre className={'image-container'}>
                <img src={Obr2} alt=""/>
            </pre>
            Na strane procesu server (protokol TCP) musíme na rozdiel od procesu klient priradiť socketu adresu (službou
            <code>bind())</code>. Potom musíme vytvoriť front, do ktorého sa budú ukladať požiadavky na spojenie
            (službou <code>listen()</code>).
            Požiadavky na spojenie musíme z frontu vyberať postupne (služba a<code>ccept()</code>). Ak vo fronte nie je
            žiadna
            požiadavka na spojenie, proces server počká (bude uspatý), kým nejaká požiadavka nedôjde.
            Služba <code>accept()</code>
            nám vráti nový socket, pomocou ktorého budeme komunikovať s procesom-klientom, ktorý sa pripája na proces
            server systémovým volaním <code>connect()</code>.<code></code>
        </div>
    );
};

export default LessonOverview;
