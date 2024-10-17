import React from 'react';

const FirstSubtopicFifth = ({onComplete, completed}) => {
    return (
        <div className="first-subtopic" id="section-1">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Reprezentácia zariadení</th>
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
                            <td>príkazy na manipuláciu so zariadeniami</td>
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
            <strong>KROK1 – naučiť sa používať príkaz <code>tty</code>:</strong> <br/> <br/>
            <p style={{textDecoration: 'underline'}}>Syntax:</p>
            <div className='terminal-command'>
                $ tty [volba..]
            </div>
            <br/>
            Príkaz tty zobrazí úplné meno súboru, ktorý reprezentuje aktuálne zariadenie
            štandardného vstupu a výstupu, ktorým je obyčajne terminál. Ak použijeme služby
            read(), write() na tento súbor (po jeho otvorení službou open()), môžeme zapisovať
            na terminál, alebo čítať znaky z terminálu. <br/><br/>
            Zadajte príkaz tty a doplňte odozvu na tento príkaz: _____________________ .
            Výstup bude vyzerať napríklad takto:
            <div className='terminal-command'>
                /dev/tty01
            </div> <br/>
            V tomto prípade je meno terminálu tty01. Príkaz tty v skutočnosti zobrazí meno
            súboru <code>/dev/tty01</code>, ktoré obsahuje systémové rozhranie terminálu. Nazýva sa
            špeciálny súbor.
            <br/> <br/>
            <strong>Príklad:</strong> <br/>
            Nasledujúce riadky programu otvoria súbor s aktuálnym zariadením štandardného
            výstupu a zapíšu doňho reťazec vo funkcii <code>fprintf()</code>. Súbor sa nakoniec zatvorí. <br/>
            <strong>POZOR:</strong> Vo funkcii <code>fopen()</code> treba doplniť názov a cestu k zariadeniu, ktoré sme
            zistili
            príkazom <code>tty</code>.
            <div className='terminal-command'>
                FILE *out = fopen("__________________","w"); <br/>
                fprintf(out, "Toto je vypis cez subor"); <br/>
                fclose(out);
            </div> <br/>
            <div className='annotation'>
                Detailnejší manuál k príkazu tty: man 1 tty
            </div>
            <br/>
            <strong>KROK2 – naučiť sa používať príkaz stty (set TTY, nastav TTY):</strong> <br/>
            Príkaz <code>stty</code> zobrazuje a nastavuje parametre terminálu. Umožňuje riadiť širokú škálu
            nastavenia terminálu. Týchto nastavení je niekoľko desiatok. Väčšinou budeme príkaz
            <code>stty</code> používať na kontrolu.

            <p style={{textDecoration: 'underline'}}>Syntax:</p>
            <div className='terminal-command'>
                $ stty [-F zariadenie][--file=zariadenie][nastavenie..]
            </div>
            Spustením príkazu sa zobrazia základné nastavenia terminálu, ako je rýchlosť,
            vypisovanie echa, a pod. Príkazom stty –a zobrazíme všetky nastavenia terminálu.
            <div className={'annotations'}>
                Pre podrobnejšie informácie pozrieť man 1 stty.
            </div>
            <br/>
            <strong>Príklad</strong> na vypnutie echa (vypisovania znakov) pomocou príkazu stty
            z príkazového riadka (pozor, neplatí pre niektoré typy shellov):
            <ol>
                <li>zadajte príkaz <code>stty -echo</code></li>
                <li>po tomto príkaze sa na obrazovku terminálu nevypisujú žiadne znaky pri stláčaní kláves</li>
                <li>pre návrat do režimu vypisovania echa zadajte príkaz <code>stty echo</code></li>
            </ol>

            <div style={{border: '1px solid black', padding: '10px', margin: '10px 0'}}>

                <p>Nesprávne tvrdenie (o vypisovaní vstupu pri vypnutom echu) prečiarknite:</p>
                <ol type="a">
                    <li>UNIX/Linux registruje príkaz, aj keď sa nevypisuje na obrazovku. To znamená, že aj keď
                        príkaz <code>stty echo</code> nevidíte na obrazovke, vykoná sa.
                    </li>
                    <li>UNIX/Linux neregistruje príkaz, keď sa nevypisuje na obrazovku. To znamená, že ak príkaz <code>stty
                        echo</code> nevidíte na obrazovke, nevykoná sa.
                    </li>
                </ol>
            </div>

            <ol start="4">
                <li>po zadaní príkazu <code>stty echo</code> sa zapne vypisovanie echa.</li>
            </ol>
            V poslednom príklade je zrejmé, že ak zadáme parameter príkazu <code>stty</code> so znakom ‘-‘
            (<code>stty –echo</code>), tak sa dané nastavenie vypne a ak zadáme parameter príkazu <code>stty</code> bez
            znaku ‘-‘ (stty <code>echo</code>), tak sa dané nastavenie zapne.
            <br/> <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default FirstSubtopicFifth;
