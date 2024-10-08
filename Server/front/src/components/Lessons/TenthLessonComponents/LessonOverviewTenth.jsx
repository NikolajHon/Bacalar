import React from 'react';
import Obr1 from '../../../images/ThirdPageImages/Obr1.png';
import Obr2 from '../../../images/ThirdPageImages/Obr2.png';

const LessonOverview = () => {
    return (
        <div className="lesson-overview" id="section-0">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Téma: Medziprocesová komunikácia – synchronizácia procesov</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td>Medziprocesová komunikácia, synchronizácia, pasívne čakanie,
                        semafory
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                <li>techniky synchronizácie procesov</li>
                                <li>pojem kritická sekcia</li>
                                <li>synchronizácia procesov vo vzťahu
                                    producent – konzument
                                </li>
                                <li>syntax jednotlivých služieb pre
                                    synchronizačný nástroj semafor
                                </li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <li>synchronizácii aktívnym a pasívnym
                                    čakaním.
                                </li>
                                <li>použitiu semaforov v rámci
                                    synchronizácie procesov v IPC
                                </li>
                                <li>argumentom jednotlivých služieb</li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>služby jadra týkajúce sa problematiky
                                synchronizácie procesov prostredníctvom
                                semaforov
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vedieť:</td>
                            <td>
                                <li>uvedomiť si výhody použitia semaforov,
                                    ale aj ich náročnosť pri implementácii
                                </li>
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
                    <td>Sofia ma za úlohu vytvoriť procesy, ktoré medzi sebou zdieľajú
                        systémové prostriedky (napr. zdieľanú pamäť) a synchronizovať
                        ich vykonávanie. Je to však rozsiahla problematika a preto sa bude
                        zameriavať na synchronizáciu procesov pomocou semaforov. Ale
                        najprv sa musí oboznámiť s pojmami ako napr. synchronizácia
                        procesov alebo kritická sekcia. Po preštudovaní tejto kapitoly bude
                        schopná vytvárať procesy využívajúce IPC.

                    </td>
                </tr>
                </tbody>
            </table>
            <div className={'title-box'}>POSTUP:</div>
            Táto kapitola sa zameriava na: <br/>
            <ul>
                <strong>Systémové volania:</strong> <br/>
                <li className={'terminal-command'}>semget()</li>
                <li className={'terminal-command'}>semop()</li>
                <li className={'terminal-command'}>semctl()</li>
            </ul>
            <br/>
            <div className={'title-box'}>KRÁTKY ÚVOD</div>
            <br/>
            <strong>KROK1 - úvod do synchronizácie procesov: </strong> <br/>
            V OS UNIX/Linux môže súčasne bežať veľa procesov a môže existovať mnoho
            inštancií jedného programu (jeden program môže byť spustený niekoľkokrát súčasne).
            Tieto procesy môžu byť navzájom nezávislé alebo beh jedného procesu môže nejakým
            spôsobom závisieť od behu iného procesu. Môžu sa teda navzájom ovplyvňovať. Proces
            môže mať vo svojom kóde sekciu, nazvanú <strong>kritická sekcia</strong>, v ktorej môže používať
            zdieľané prostriedky systému alebo modifikovať zdieľané dáta (spoločné premenné,
            tabuľky, zdieľané súbory a iné). Tento prístup môže viesť k <strong>nekonzistencii</strong> dát vtedy,
            keď sa vo svojich kritických sekciách nachádzajú súčasne dva procesy, ktoré pracujú
            s tými istými spoločnými systémovými prostriedkami.
            <br/> <br/>
            <strong>Príklad: </strong> <br/>
            <h2>Rezervačný systém leteniek</h2>
            <p>Rezervačný systém má dve používateľské funkcie (z nášho pohľadu transakcie):</p>

            <div class="transaction">
                <div class="transaction-title">a) Zrušenie N rezervácií zo dňa X a prevod na deň Y</div>
                <code>
                    read_item(X) <br/>
                    X = X - N <br/>
                    write_item(X) <br/>
                    read_item(Y) <br/>
                    Y = Y + N <br/>
                    write_item(Y)
                </code>

            </div>
            <br/>
            <div class="transaction">
                <div class="transaction-title">b) Pridanie M rezervácií</div>
                <code>
                    read_item(X)
                    X=X+M
                    write_item(X)
                </code>

            </div>
            <br/>
            V praxi sa vyžaduje vykonať tieto funkcie aspoň čiastočne paralelne. Uskutočníme ich
            ako transakcie T1 a T2. Samozrejme, že systém môže vykonávať naraz len jednu
            vnútrotransakčnú operáciu (read, write, výpočet a pod.), pričom je zrejmé, že
            postupnosť ich vykonávania môže byť rôzna - čo je problém (vznikajú konflikty
            prístupu k údajom), ktorý musí systém vyriešiť tak, aby stav dát oboch transakcií ostal
            konzistentný. Príklady možného paralelného vykonania transakcií T1 a T2
            <i>The lost update problem (stratená aktualizácia):</i>
            <br/>
            <table>
                <thead>
                <tr>
                    <th>T1</th>
                    <th>T2</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>read_item(X) <br/> X = X - N</td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>read_item(X) <br/>
                        X=X+M
                    </td>
                </tr>
                <tr>
                    <td>write_item(X) <br/>
                        read_item(Y)
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>write_item(X)</td>
                </tr>
                <tr>
                    <td>Y=Y+N <br/>
                        write_item(Y)
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>
            <br/>
            Potom je potrebné mať k dispozícii mechanizmy pre synchronizáciu dvoch alebo
            viacerých procesov navzájom a zabezpečiť odovzdávanie dát medzi procesmi.
            128
            Úlohou synchronizácie je zaistiť vzájomné vylúčenie paralelných procesov, ktoré
            využívajú zdieľané prostriedky. Prakticky to znamená, že sa vykonávanie procesov
            musí zosúladiť tak, aby sa vykonávanie ich kritických sekcií neprekrývalo v čase. Pri
            tom sa uplatňujú dva základné princípy:
            <br/>
            <ol className="list-style-1">
                <li>Synchronizácia aktívnym čakaním:
                    <ul className="list-style-2">
                        <li>znamená, že sa odsunutie vstupu do kritickej sekcie uskutoční vložením pomocných (obyčajne
                            prázdnych) inštrukcií do kódu procesu (dekkerov algoritmus, algoritmus pekára).
                        </li>
                    </ul>
                </li>
                <li>Synchronizácia pasívnym čakaním:
                    <ul className="list-style-2">
                        <li>znamená, že sa odsunutie vstupu do kritickej sekcie uskutoční dočasným pozastavením procesu,
                            kým sa kritická sekcia neuvoľní (semafory, monitory).
                        </li>
                    </ul>
                </li>
            </ol>
            <br/>
            <strong>KROK2 - oboznámiť sa s pojmom semafor:</strong> <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<i>Semafor</i> je pasívny synchronizačný nástroj. Vo svojej najjednoduchšej podobe
            je
            semafor miesto v pamäti prístupné viacerým procesom. Semafor je celočíselná
            systémová „premenná“ nadobúdajúca povolené hodnoty &lt;0,max (intiger)>, ktorá
            obmedzuje prístup k zdieľaným prostriedkom OS UNIX/Linux. Je to počítadlo, ktoré sa
            operáciami nad ním zvyšuje alebo znižuje, avšak nikdy neklesne pod nulu.
            Synchronizáciu zabezpečujú dve neprerušiteľné operácie P a V (buď sa vykoná celá
            naraz, alebo sa nevykoná vôbec). Názvy týchto operácii pochádzajú od tvorcu
            semaforov, pána <i>Edsger Wybe Dijkstra</i>. V je skratka slova „<i>verhoog</i>“, čo znamená v
            holandčine <i>zvýšiť</i>. P je skratka zo zloženého slova „<i>prolaag</i>“, čo znamená <i>skús-a-zníž</i>.
            Operácie sú definované nasledovne:
            <br/>
            <li>Operácia P sa pokúša odpočítať hodnotu jedna od hodnoty semaforu. Ak je
                hodnota semaforu väčšia ako 0, operácia sa vykoná. Ak je hodnota semaforu
                0, operácia sa vykonať nedá a proces zostane zablokovaný, pokiaľ iný proces
                nezvýši hodnotu semaforu.
            </li>
            <li>
                Operácia V zvýši hodnotu semaforu a môže spôsobiť odblokovanie
                zablokovaného procesu.
            </li>
        </div>
    );
};

export default LessonOverview;




