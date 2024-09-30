import React from 'react';
const LessonOverviewFourth = () => {
    return (
        <div className="lesson-overview" id="section-0">
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Téma:  Prístupové práva </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="section-title">Kľúčové slová</td>
                        <td>maska prístupových práv, read, write, execute </td>
                    </tr>
                    <tr>
                        <td className="section-title">Ciele</td>
                        <td>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>
                                    <ul>
                                        koncepciu prístupových práv a čo je maska
                                        prístupových práv
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>
                                    <ul>
                                        <li>pojmu maska </li>
                                        <li>pojmom user, group, other </li>
                                        <li>rozdiely medzi súbormi a adresármi </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>služby jadra spojené s riadením prístupových práv </td>
                            </tr>
                            <tr>
                                <td className="section-title">Vedieť:</td>
                                <td>využiť získané skúsenosti pri tvorbe programov</td>
                            </tr>
                        </td>
                    </tr>
                    <tr>
                        <td className="section-title">Odhadovaný čas</td>
                        <td>30 minút</td>
                    </tr>
                    <tr>
                        <td className="section-title"> Scenár</td>
                        <td>Sofia sa po tom, ako sa naučila pracovať so súbormi a adresármi,
                            zameria teraz na prístupové práva. Potrebuje sa s nimi naučiť
                            efektívne pracovať. Predstavme si situáciu, keď Sofia vytvorí súbor
                            a nechce, aby si hocikto iný, okrem nej, mohol súbor zmeniť či
                            dokonca zmazať. Práve pre takéto situácie je dobré ovládať
                            prístupové práva.
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP</strong>
            </div>
            Táto kapitola sa zameriava na:
            <ul>
                <li><strong>Systémové volania: </strong>
                    <ul>
                        <li className='terminal-command'>umask()</li>
                        <li className='terminal-command'>chmod()</li>
                        <li className='terminal-command'>chown()</li>
                    </ul>
                </li>
            </ul>
            <br /><br />
            <div className="title-box">
                <strong>KRÁTKY ÚVOD</strong>
            </div>
            <br />
            <strong>KROK 1 - úvod do prístupových práv: </strong> <br />
            Prístupové práva súborov sú rozdelené na čítanie (read), zápis (write) a vykonávanie
            (execute). Pri adresároch právo čítania znamená možnosť výpisu adresára, právo zápisu
            umožňuje vytvárať súbory v adresári a právo vykonávania povoľuje zmenu aktuálneho
            adresára na iný adresár a jeho podadresáre. Prístupové práva k súboru sú zaznamenané
            v i-uzle v bitovom tvare, kde „1“ indikuje pridelenie práva použitia.
            <br /> <br />
            <strong>KROK 2 - výpis prístupových práv: </strong>
            Výpis prístupových práv a ďalších údajov uskutočňujeme príkazom <i>ls</i> s voľbou <i>–l</i>.
            v prvom stĺpci je zobrazený typ súboru a za ním prístupové práva v symbolickom tvare.
            Typ (prvý znak prvého stĺpca) je kódovaný takto:
            <ul>
                <li><strong>-</strong> znamená obyčajný súbor </li>
                <li><strong>d</strong> indikuje adresár </li>
                <li><strong>c</strong> a<strong> b</strong> sú príkazy znakového a blokového špeciálneho zariadenia </li>
            </ul>
            <br />
            V druhom stĺpci je počet odkazov na súbor. V treťom a štvrtom je vlastník a skupina
            súborov (napríklad súborov patriacich projektu project ). V ďalších stĺpcoch je veľkosť,
            dátum vytvorenia a meno súboru.
            <br /><br />
            <strong>Príklad</strong> výpisu príkazu <i>ls –l</i>:
            <pre>{
                `
        $ls –l 
        total 72
        -rw-r-----  1  martin  project     58  May   12  13:02  File1
        -rw-r-----  1  martin  project     58  May   12  13:03  File2
        -rwxr-x—x   1  martin  project   0469  May   12  13:03  program
        -rw-r-----  2  martin  project     21  May   12  13:02  Text
        -rw-r-----  2  martin  project     21  May   12  13:02  Text12 
        drw-r-----  2  martin  project    128  May   13  10:05  Reserve 
        $ 
`
            }</pre>
            <br />
            Pomocou príkazu <i>whoami</i> sa zobrazí vaše práve používané užívateľské meno, pod
            ktorým vás systém pozná. Je to veľmi užitočný príkaz ak máte viacero kont v systéme
            a prepínate sa medzi nimi. Každý používateľ je členom jednej alebo viacerých skupín.
            Na zistenie ku ktorej skupine patríte, použite príkaz: <i>groups</i>.
            <br /><br />
            <strong>KROK 3 - kategórie používateľov </strong> <br />
            Užívatelia pracujúci pod OS UNIX/Linux sú delení do troch kategórií:
            <dl>
                <dt><code>u</code> (user)</dt>
                <dd>vlastník súboru</dd>

                <dt><code>g</code> (group)</dt>
                <dd>pracovná skupina, do ktorej vlastník súboru patrí (pracovná skupina je každému používateľovi pridelená správcom systému)</dd>

                <dt><code>o</code> (others)</dt>
                <dd>ostatní (t.j. členovia ostatných pracovných skupín)</dd>
            </dl>

            <br /><br />
            <strong>Priklad</strong>
            <table border="1" cellpadding="10" cellspacing="0">
                <thead>
                    <tr>
                        <th colspan="3">vlastník</th>
                        <th colspan="3">skupina</th>
                        <th colspan="3">ostatní</th>
                    </tr>
                    <tr>
                        <th>read</th>
                        <th>write</th>
                        <th>execute</th>
                        <th>read</th>
                        <th>write</th>
                        <th>execute</th>
                        <th>read</th>
                        <th>write</th>
                        <th>execute</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>0</td>
                        <td>1</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
            Uvedený súbor môže vlastník čítať a môže doňho  zapisovať, užívatelia rovnakej
            skupiny môžu súbor čítať a ostatní nemôžu nič. Vyššie uvedené práva sa zobrazujú
            v symbolickom tvare
            <br /><br />
            <div className='terminal-command'>
                $ rw-r–––-
            </div>
        </div>
    );
};

export default LessonOverviewFourth;
