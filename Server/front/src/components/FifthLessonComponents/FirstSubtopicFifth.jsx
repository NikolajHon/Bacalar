import React from 'react';
const FirstSubtopicFifth = () => {
    return (
        <div className="first-subtopic" id="section-1">
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Podtéma: Reprezentácia zariadení  </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="section-title">Kľúčové slová</td>
                        <td><code>tty, stty</code>, echo</td>
                    </tr>
                    <tr>
                        <td className="section-title">Ciele</td>
                        <td>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>
                                    reprezentáciu zariadení v UNIX/LINUXe, prečítať si manuálové stránky
                                    v Unixe/Linuxe, Linux dokumentačný
                                    projekt
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>mechanizmu prístupu k zariadeniam</td>
                            </tr>
                            <tr>
                                <td className="section-title">Naučiť sa:</td>
                                <td>príkazy na manipuláciu so zariadeniami </td>
                            </tr>
                            <tr>
                                <td className="section-title">Vedieť:</td>
                                <td>
                                    <ul>
                                        <li>zistiť vlastnosti zariadenia</li>
                                        <li>zmeniť nastavenia zariadenia</li>
                                    </ul>

                                </td>
                            </tr>
                        </td>
                    </tr>
                    <tr>
                        <td className="section-title">Odhadovaný čas</td>
                        <td>20 minút</td>
                    </tr>
                    <tr>
                        <td className="section-title"> Scenár</td>
                        <td>Sofia potrebuje pochopiť princíp ovládania zariadení, zisťovať
                            a nastavovať ich rôzne parametre (napr. rýchlosť komunikácie cez
                            sieťový port) .
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <strong>KROK1 – naučiť sa používať príkaz <code>tty</code>:</strong> <br /> <br />
            <p style={{ textDecoration: 'underline' }}>Syntax:</p>
            <div className='terminal-command'>
                $ tty [volba..]
            </div>
            <br />
            Príkaz tty zobrazí úplné meno súboru, ktorý reprezentuje aktuálne zariadenie
            štandardného vstupu a výstupu, ktorým je obyčajne terminál. Ak použijeme služby
            read(), write() na tento súbor (po jeho otvorení službou open()), môžeme zapisovať
            na terminál, alebo čítať znaky z terminálu.  <br /><br />
            Zadajte príkaz tty a doplňte odozvu na tento príkaz: _____________________ .
            Výstup bude vyzerať napríklad takto:
            <div className='terminal-command'>
                /dev/tty01
            </div> <br />
            V tomto prípade je meno terminálu tty01. Príkaz tty v skutočnosti zobrazí meno
            súboru <code>/dev/tty01</code>, ktoré obsahuje systémové rozhranie terminálu. Nazýva sa
            špeciálny súbor.
            <br /> <br />
            <strong>Príklad:</strong> <br />
            Nasledujúce riadky programu otvoria súbor s aktuálnym zariadením štandardného
            výstupu a zapíšu doňho reťazec vo funkcii <code>fprintf()</code>. Súbor sa nakoniec zatvorí. <br />
            <strong>POZOR:</strong> Vo funkcii <code>fopen()</code> treba doplniť názov a cestu k zariadeniu, ktoré sme zistili
            príkazom <code>tty</code>.
            <div className='terminal-command'>
                FILE *out = fopen("__________________","w"); <br />
                fprintf(out, "Toto je vypis cez subor"); <br />
                fclose(out);
            </div> <br />
            <div className='annotation'>
                Detailnejší manuál k príkazu tty: man 1 tty
            </div>
            <br />
            <strong>KROK2 – naučiť sa používať príkaz stty (set TTY, nastav TTY):</strong> <br />
            Príkaz <code>stty</code> zobrazuje a nastavuje parametre terminálu. Umožňuje riadiť širokú škálu 
            nastavenia terminálu. Týchto nastavení je niekoľko desiatok. Väčšinou budeme príkaz 
            <code>stty</code> používať na kontrolu. 
        </div>
    );
};

export default FirstSubtopicFifth;
