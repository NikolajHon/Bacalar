import React from 'react';
const LessonOverview = () => {
    return (
        <div className="lesson-overview" id="section-0">
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Téma:  Ovládanie zariadení, terminálová disciplína</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="section-title">Kľúčové slová</td>
                        <td>terminálová disciplína, terminál, termios, <code>/dev/tty</code></td>
                    </tr>
                    <tr>
                        <td className="section-title">Ciele</td>
                        <td>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>
                                    služby jadra a príkazy na ovládania terminálov
                                    a iných zariadení
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>
                                    mechanizmu ovládania zariadení
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>služby jadra a príkazy na zmenu nastavenia
                                    terminálov a zariadení
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Vedieť:</td>
                                <td>
                                    <ul>
                                        <li>zmeniť základné nastavenie terminálu,
                                            napr. na vypnutie echa</li>
                                        <li>využiť zmenu nastavenia terminálu
                                            v zadaniach a ďalších programoch</li>
                                    </ul>
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
                        <td>Sofia chce chrániť svoju aplikáciu heslom, aby k nej nemal prístup
                            administrátor. Potrebuje vypnúť echo. Pritom narazila na tému
                            Ovládanie zariadení, terminálová disciplína. V tejto téme sa naučí,
                            akým spôsobom UNIX/Linux komunikuje so zariadeniami a ako je
                            možné túto komunikáciu používať pri tvorbe svojich programov.
                            Bude schopná nastavovať parametre terminálu počas behu
                            programu aj mimo neho.
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            Táto kapitola sa zameriava na:
            <ul >
                <strong>Príkazy: </strong>
                <li class="custom-item"><code>tty</code></li>
                <li class="custom-item"><code>stty</code> </li>
            </ul>
            <ul>
                <strong>Služby: </strong>
                <li class="custom-item"><code>ioctl()</code></li>
                <li class="custom-item"><code>tcgetattr()</code> </li>
                <li class="custom-item"><code>tcsetattr() </code> </li>
            </ul>
            <ul >
                <strong>Služby: </strong>
                <li class="custom-item"><code> termios</code></li>
            </ul>
            <div className="title-box">
                <strong>KRÁTKY ÚVOD :</strong>
            </div>
            <strong>KROK1 – pochopiť ovládanie zariadení v OS UNIX/Linux: </strong> <br />
            Operačný systém UNIX/Linux, podobne ako väčšina operačných systémov, komunikuje
            s technickým vybavením počítača pomocou programových komponentov nazývaných
            ovládače zariadení (device drivers). Ovládače zariadení obsahujú detaily
            komunikačného protokolu medzi jadrom OS a technickým vybavením počítača, ktoré
            umožňujú systému komunikovať so zariadením prostredníctvom štandardného
            rozhrania. <br />
            V OS UNIX/Linux sú ovládače zariadení súčasťou jadra alebo sa do jadra zavadzajú
            ako špeciálne moduly. OS UNIX/Linux však poskytuje mechanizmus, pomocou ktorého
            môžu procesy komunikovať s ovládačmi zariadení, teda aj s technickými zaradeniami
            počítača, prostredníctvom objektov podobných súborom. Tieto objekty sa nachádzajú
            v súborovom systéme a programy ich môžu otvárať, čítať z nich a zapisovať do nich,
            ako by to boli obyčajné súbory. <br /> <br />

            <strong>KROK2 - typy zariadení v OS UNIX/LINUX: </strong> <br />
            Existujú dva základne typy ovládačov zariadení:
            <ul class="list-point">
                <li>
                    Znakové zariadenie reprezentujú technické zariadenia, ktoré zapisuje dáta ako postupnosť bajtov. Patria sem porty, terminály alebo zvukové karty.
                </li>
                <li>
                    Blokové zariadenia reprezentujú zariadenia, ktoré čítajú alebo zapisujú dáta v blokoch stanovenej veľkosti. Umožňujú priamy prístup k dátam uložených na zariadení. Patria sem napr. diskové zariadenia.
                </li>
            </ul>
            <br /><br />

            Výpis niektorých blokových zariadení:
            <table>
                <thead>
                    <tr>
                        <th>Zariadenie</th>
                        <th>Meno</th>
                        <th>Hlavné číslo</th>
                        <th>Vedľajšie číslo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Prvá disková jednotka</td>
                        <td><code>/dev/fd0</code></td>
                        <td>2</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Druhá disková jednotka</td>
                        <td><code>/dev/fd1</code></td>
                        <td>2</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Prvý SCSI CD-ROM disk</td>
                        <td><code>/dev/scd0</code></td>
                        <td>11</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Druhý SCSI CD-ROM</td>
                        <td><code>/dev/csd1</code></td>
                        <td>11</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
            <br />
            Výpis niektorých znakových zariadení:
            <table>
                <thead>
                    <tr>
                        <th>Zariadenie</th>
                        <th>Meno</th>
                        <th>Hlavné číslo</th>
                        <th>Vedľajšie číslo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Prvý sériový port</td>
                        <td><code>/dev/ttyS0</code></td>
                        <td>4</td>
                        <td>64</td>
                    </tr>
                    <tr>
                        <td>Druhý sériový port</td>
                        <td>/<code>dev/ttyS1</code></td>
                        <td>4</td>
                        <td>65</td>
                    </tr>
                    <tr>
                        <td>Prvý virtuálny terminál</td>
                        <td><code>/dev/tty1</code></td>
                        <td>4</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Druhý virtuálny terminál</td>
                        <td><code>/dev/tty2</code></td>
                        <td>4</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Aktuálne zariadenie terminálu</td>
                        <td><code>/dev/tty</code></td>
                        <td>5</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
            <br />

            <strong>KROK3 – terminál: </strong> <br />
            OS UNIX/Linux používa hostiteľský počítač a k nemu je pripojený Terminal (niekedy
            virtuálny- napr. cez program putty). <br /><br />

            <i>Terminal</i> je zariadenie, ktoré sprostredkováva vstupy a výstupy hostiteľského počítača.
            V reči OS UNIX/Linux sa terminálu zvyčajne hovorí TTY. Meno „tty“ je odvodené od
            slova „teletype“. Každé zariadenie je v UNIX/Linux-e reprezentované špeciálnym
            súborom. Tieto súbory sa spravidla nachádzajú v adresári <code>/dev</code>, napr. súbor <code>/dev/tty</code>
            reprezentuje aktuálne používaný terminál.

            Špeciálny súbor /dev/tty je zástupcom (logickým zariadením) pre riadiaci terminál
            (klávesnicu a obrazovku alebo okno) procesu, pokiaľ ho má. <br /><br />
            Keď potrebujeme presmerovať časti programu, ktoré komunikujú s používateľom, ale
            pritom zachovať ostatný vstup a výstup, musíme túto interakciu viesť mimo
            štandardného výstupu a štandardného chybového výstupu8. Dá sa to dosiahnuť
            zapisovaním priamo na terminál. UNIX/Linux nám to zjednodušuje a poskytuje nám
            špeciálne zariadenie s názvom /dev/tty/, ktorým je vždy aktuálny terminál alebo relácia
            (anlg. session). Pretože UNIX/Linux so všetkým zaobchádza ako so štandardným
            súborom, môžeme pri čítaní a zápise na zariadenie /dev/tty používať štandardné
            operácie so súbormi.
        </div>
    );
};

export default LessonOverview;
