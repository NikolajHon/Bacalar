import React from 'react';

const LessonOverview = () => {
    return (
        <div className="lesson-overview" id="section-0">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Téma: Komunikácia medzi procesmi – rúry - nepomenované, pomenované</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td>rúra, pomenovaná rúra, pipe, fifo</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                <li>pojem medziprocesová komunikácia</li>
                                <li>nástroje na komunikáciu medzi
                                    procesmi
                                </li>
                                <li>syntax služieb jadra a funkcií</li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <li>pojmu rúra</li>
                                <li>rozdielu medzi pomenovanou
                                    a nepomenovanou rúrou (PIPE a FIFO)
                                </li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>služby jadra určené na vytvorenie
                                a komunikáciu prostredníctvom rúry
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vedieť:</td>
                            <td>
                                <li>využiť skúsenosti pri tvorbe programov</li>
                                <li>vytvoriť takýto prostriedok
                                    komunikácie medzi procesmi
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
                    <td>Sofia už vie vytvárať procesy, avšak tento mechanizmus nedáva
                        možnosť rodičovskému procesu komunikovať s procesom
                        potomkom inak, než prostredníctvom argumentov, premenných
                        prostredia a návratového kódu. V tejto kapitole sa Sofia naučí
                        používať ďalší nástroj pre komunikáciu medzi procesmi, ktorý
                        prekonáva tieto nedostatky - komunikácia pomocou rúr.

                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <ul>
                <li><strong>Systémové volania:</strong>
                    <ul>
                        <li className='terminal-command'>pipe()</li>
                        <li className='terminal-command'>mkfifo()</li>
                        <li className='terminal-command'>mknod()</li>
                    </ul>
                </li>
            </ul>
            <div className="title-box">
                <strong>KRÁTKY ÚVOD :</strong>
            </div>
            <strong>KROK 1 - úvod do medziprocesovej komunikácie:</strong> <br/>
            KROK 1 - úvod do medziprocesovej komunikácie:
            Procesy v operačnom systéme UNIX/Linux sú chápané ako nezávislé entity, ktoré
            nemajú možnosť priamo komunikovať s ďalšími procesmi súbežne v systéme
            spracovávanými (proces nemôže pracovať s pamäťou iného procesu). Jadro operačného
            systému poskytuje viacero spôsobov komunikácie medzi nimi. Mechanizmus
            medziprocesovej komunikácie (InterProcess Communication, ďalej len IPC) umožňuje
            ľubovoľným procesom výmenu dát a synchronizáciu ich spracovania. V tradičných
            UNIX/Linux -ových systémoch sa stretávame s nasledovnými možnosťami IPC:
            <li><strong>signály</strong> - jedná sa o spôsob upozornenia procesu o výskyte asynchrónnej
                udalosti. Nie sú posielané žiadne dáta. Procesy si môžu zasielať signály alebo
                samotné jadro môže vyvolať signál interne pri výskyte asynchrónnej udalosti  </li>
            <li><strong>rúry</strong> - sú najstarším komunikačným mechanizmom vo všetkých
                typoch UNIX/Linux -ov a majú obmedzujúce vlastnosti.</li>
            <li><strong>pomenované rúry</strong> - dovoľujú komunikovať aj procesom, ktoré nie sú príbuzné. </li>
            <li><strong>System V IPC</strong> - obsahuje mechanizmy komunikácie známe z komerčných
                implementácií UNIX/Linux-u, ako sú mechanizmy <code>frontov správ</code> umožňujúcich
                procesom zasielať formátované postupnosti dát, <code>zdieľanej pamäte</code>, keď procesy
                môžu zdieľať časti ich virtuálneho adresného priestoru a <code>semaforov</code>, pomocou
                ktorých procesy synchronizujú svoju činnosť  </li>
            <li><strong>sockety</strong> - umožňujú medziprocesovú komunikáciu nielen na lokálnej úrovni
                v rámci toho istého počítača, ale pomocou komplikovanejších sieťových
                protokolov umožňujúcich komunikovať procesom medzi počítačmi v rámci
                počítačovej siete spôsobom klient - server.  </li> <br/>
            <strong>KROK2 - oboznámiť sa s pojmom rúra: </strong> <br/>
            <strong>Nepomenovaná rúra</strong> (<code>pipe</code>) je komunikačný prostriedok, ktorý umožňuje dátovú
            komunikáciu medzi dvoma procesmi. Je dôležité poznamenať, že tieto procesy musia
            byť vzájomne príbuzné, teda musí sa jednať o vzťah typu rodič – potomok (nemusí byť
            bezprestredným potomkom).
            <br/> <br/>
            <strong>Princíp komunikácie</strong> pomocou rúr spočíva v tom, že údaje zapisované na jednom
            (zapisovacom) konci rúry sú prečítané na druhom (čítacom) konci rúry. Rúra je
            sériovou komunikáciou, čo znamená, že údaje zapísané na jednom konci rúry sú na
            druhom konci rúry prečítané v rovnakom poradí. <br/> <br/>
            <i>Nevýhody</i> nepomenovanej rúry sú:
            <li>Rúra je jednosmerný komunikačný prostriedok. Údaje zapisované na jednom
                konci rúry sú prečítané na druhom konci rúry (jednosmerný tok dát).  </li>
            <li>Rúra je vytvorená volaním jadra <code>pipe()</code>. Pri vytvorení rúry systém obsadí dve
                pozície tabuľky otvorených súborov procesu. Takto vzniknutú rúru dedí každý
                potomok. Ten sa môže na rúru pripojiť pre čítanie i zápis, rovnako ako sa na ňu
                môže pripojiť rodič, ale nikto iný mimo stromu potomkov, pretože rúra je
                súčasťou dedičstva, ktoré nemožno exportovať do iného prostredia. Tento
                mechanizmus neumožňuje spojenie dvoch ľubovoľných procesov. Snaha
                odstrániť túto nevýhodu viedla k vytvoreniu tzv. pomenovaných rúr (FIFO).</li>
            <li>Rúry predstavujú samosynchronizujúci prostriedok, ale len na úrovni jedného
                volania jadra pre čítanie. Pri rozdelení čítania na viac volaní môže dochádzať ku
                konfliktom medzi procesmi, ktoré môžu z rúry čítať údaje.</li>
            <strong>Poznámka: </strong> <br/>
            Pravdepodobne ste už s rúrami pracovali v príkazovom priadku.  V príkazovom priadku
            sa rúra vytvorí pomocou znaku „|“. Napríklad nasledujúci príkaz vytvorí 2 procesy,
            jeden pre <code>ls</code> a jeden pre <code>less</code>. <br/> <br/>
            <div className={'terminal-command'}> % ls | less </div> <br/>
            Príkazový procesor medzi týmito procesmi vytvorí rúru spojujúcu štandardný výstup
            procesu <code>ls</code> so štandardným vstupom procesu <code>less</code>. Mená súborov na výstupe
            z programu <code>ls</code> sa odosielajú programu <code>less</code> v rovnakom poradí, v akom by sa
            vypisovali na terminál.

        </div>
    );
};

export default LessonOverview;
