import React from 'react';

const FirstSubtopic = ({ onComplete, completed }) => {
    return (
        <div className='first-subtopic' id="section-1">
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Podtéma: <strong>Príkaz – ls (list)</strong> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="section-title">Kľúčové slová</td>
                        <td><i>ls</i> (list), man ls, unix </td>
                    </tr>
                    <tr>
                        <td className="section-title">Ciele</td>
                        <td>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>
                                    príkaz <i>ls</i>:
                                    <ul>
                                        <li>prečítať si manuálové stránky v Unixe
                                            /Linuxe, Linux dokumentačný projekt</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>
                                    štruktúre i-uzlov
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>príkaz <i>ls</i> výpis obsahu adresára:
                                    <ul>
                                        <li>z výpisu určiť či sa jedná o súbor alebo
                                            adresár</li>
                                        <li>rozpoznať koreňový adresár </li>
                                        <li>strom adresárov</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Vedieť:</td>
                                <td>vypísať obsah adresára a rozlíšiť jednotlivé položky
                                    vo výpise. </td>
                            </tr>
                        </td>
                    </tr>
                    <tr>
                        <td className="section-title">Odhadovaný čas</td>
                        <td>20 minút</td>
                    </tr>
                    <tr>
                        <td className="section-title"> Scenár</td>
                        <td>Sofia sa prihlásila do systému. Nevie v ktorom adresári sa práve
                            nachádza resp. potrebuje zistiť čo v danom adresári má uložené. Preto
                            musí prehľadať jednotlivé adresáre. Zistila, že na zorientovanie sa
                            v adresárovej štruktúre a k vypísaniu obsahu adresára jej poslúži
                            príkaz ls, ktorý jej vypíše obsah aktuálneho adresára.
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP</strong>
            </div>
            <strong>KROK1- naučiť sa používať príkaz <i>ls</i>:</strong> <br /><br />
            Na zorientovanie sa v adresárovej hierarchii a k vypísaniu obsahu adresára jej poslúži
            príkaz <i>ls (list)</i> (v skutočnosti sa jedná o rozpis obsahu i-uzlov). Príkaz <i>ls</i> zobrazí na
            štandardnom výstupe jednostĺpcový výpis pracovného adresára.
            <p style={{ textDecoration: 'underline' }}>Syntax:</p>
            <pre>{`
    ls [-volba..] [meno_suboru...]
                    `}

            </pre>
            <div className='annotations'>
                Pre podrobnejšie informácie zadáj príkaz  man ls.
            </div> <br />
            Pre príkaz ls existuje viacero možností dodefinovanie:
            <br />
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Voľba za ls</th>
                        <th>Popis príkazu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>-a</td>
                        <td>vypíše všetky súbory aj tie čo začínajú znakom bodka</td>
                    </tr>
                    <tr>
                        <td>-B</td>
                        <td>nevypisujú sa súbory ktoré končia znakom '~' (takto sa označujú záložné súbory)</td>
                    </tr>
                    <tr>
                        <td>-I vzorka</td>
                        <td>nevypisujú sa súbory ktoré vyhovujú zadanej vzorke. Vzorku zadávame pomocou znakov '*' '?' napr. *.tar spôsobí že sa nebudú vypisovať súbory s koncovkou tar</td>
                    </tr>
                    <tr>
                        <td>-l (long)</td>
                        <td>
                            Vypíšu sa rozsiahlejšie informácie o súbore:
                            <ul>
                                <li>typ súboru</li>
                                <li>prístupové práva</li>
                                <li>počet hard links, toto je vlastne počet pevných odkazov na súbor</li>
                                <li>meno vlastníka</li>
                                <li>meno skupiny</li>
                                <li>veľkosť v bajtoch</li>
                                <li>dátum a čas poslednej zmeny</li>
                                <li>meno adresára alebo súboru</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>-R (rekurzívne)</td>
                        <td>Rekurzívne vypisuje obsah adresárov (vypisuje aj obsahy podadresárov)</td>
                    </tr>
                    <tr>
                        <td>-C (column)</td>
                        <td>Výpis po stĺpcoch</td>
                    </tr>
                    <tr>
                        <td>-x (across)</td>
                        <td>Výpis zotriedený vodorovne</td>
                    </tr>
                    <tr>
                        <td>-F (function)</td>
                        <td>Oznámi, ktoré z vypísaných súborov sú adresáre a ktoré sú spustiteľné súbory</td>
                    </tr>
                    <tr>
                        <td>-t (time)</td>
                        <td>Výpis v poradí podľa doby zmeny</td>
                    </tr>
                    <tr>
                        <td>-d (directory)</td>
                        <td>Vypisuje informácie o adresári</td>
                    </tr>
                    <tr>
                        <td>-r (reverse)</td>
                        <td>Výpis v opačnom poradí</td>
                    </tr>
                </tbody>
            </table><br />
            <strong>KROK2 – zjednodušiť si prácu v OS UNIX/Linux: </strong>
            <br /><br />
            Niektoré znaky využívané v UNIX/LINUXe:
            <table>
                <thead>
                    <tr>
                        <th>Znak</th>
                        <th>Meno</th>
                        <th>Funkcia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>~</td>
                        <td>Tilda</td>
                        <td>Skratka do domovského adresára</td>
                    </tr>
                    <tr>
                        <td>*</td>
                        <td>Hviezdička “ * ”</td>
                        <td>Náhradný znak</td>
                    </tr>
                    <tr>
                        <td>?</td>
                        <td>Otáznik</td>
                        <td>Náhradný/Pomocný znak</td>
                    </tr>
                    <tr>
                        <td>[ ]</td>
                        <td>Hranaté zátvorky</td>
                        <td>Hranice rozsahu príkazu</td>
                    </tr>
                    <tr>
                        <td>;</td>
                        <td>Bodkočiarka</td>
                        <td>Oddel’ovanie príkazov</td>
                    </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>ÚLOHY NA SAMOSTATNÚ PRÁCU: </strong>
            </div>
            <ul>
                <li>Zadaj príkaz pre zmenu svojho domovského adresára. Aký príkaz je potrebné 
                použiť? </li>
                <li>Zadaj príkaz, ktorým zistíš v akom adresári sa práve nachádzaš? Aký príkaz je 
                potrebné použiť? </li>
                <li>Ak zadáš nasledujúci príkaz $ls čo sa vypíše na obrazovku? </li>
                <li>Použi znak pre oddelenie príkazov a v jednom kroku zmeň svoj aktuálny adresár 
                a vypíš obsah zvoleného.</li>
            </ul>
        </div>
    );
};

export default FirstSubtopic;
