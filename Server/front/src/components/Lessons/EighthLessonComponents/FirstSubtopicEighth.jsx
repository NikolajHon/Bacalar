import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const FirstSubtopicEighth = ({onComplete, completed}) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="first-subtopic" id="section-1">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Príkaz - kill</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>kill</code>, send signal</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                <li> najdôležitejšie parametre tohto príkazu
                                </li>
                                <li> jeho syntax
                                </li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>funkcii a využitiu príkazu
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>pre potrebu ukončenia alebo signalizácie
                                procesu
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vedieť:</td>
                            <td>špecifické situácie súvisiace s uviaznutím
                                procesu
                            </td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>3 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Pokiaľ chce Sofia poslať signál inému procesu prostredníctvom
                        príkazového riadku, použije príkaz <code>kill</code>. Aby ho mohla využívať,
                        potrebuje sa ho naučiť používať.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>KRÁTKY ÚVOD:</strong>
            </div>
            <br/>
            Signál je komunikačný prostriedok, ktorý generuje systém UNIX/Linux ako odpoveď
            na výskyt konkrétnej udalosti. Po jeho prijatí môže proces na tento signál reagovať.
            Signály sú buď generované operačným systémom, alebo používateľským procesom.
            Signály môžu byť generované a odchytávané alebo ignorované. Názvy signálov sú
            definované v hlavičkovom súbore <code>signal.h</code>. <br/> <br/>
            <strong>KROK1 – oboznámiť sa so signálmi v UNIX/Linuxe: </strong> <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie zadá Sofia príkaz <strong><code>man 7
                signal</code></strong>.
            </div>
            <br/> <br/>
            <strong>Doplňte</strong> (podľa <code>man 7 signal</code>):
            <table>
                <thead>
                <tr>
                    <th>Názov</th>
                    <th>č.</th>
                    <th>Akcia</th>
                    <th>Popis</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>SIGINT</td>
                    <td>2</td>
                    <td>Term</td>
                    <td>Prerušenie terminálu (ekvivalentné s Ctrl+C z klávesnice)</td>
                </tr>
                <tr>
                    <td>SIGQUIT</td>
                    <td>3</td>
                    <td>Core</td>
                    <td></td>
                </tr>
                <tr>
                    <td>SIGKILL</td>
                    <td>9</td>
                    <td>Term</td>
                    <td>Ukončenie procesu (tento signál nie je možné odchytiť ani ignorovať)</td>
                </tr>
                <tr>
                    <td>SIGTERM</td>
                    <td>15</td>
                    <td>Term</td>
                    <td></td>
                </tr>
                <tr>
                    <td>SIGCHLD</td>
                    <td>17</td>
                    <td>Ign</td>
                    <td>Dcéřsky proces bol ukončený alebo prerušený</td>
                </tr>
                <tr>
                    <td>SIGCONT</td>
                    <td>18</td>
                    <td>Ign</td>
                    <td></td>
                </tr>
                <tr>
                    <td>SIGSTOP</td>
                    <td>19</td>
                    <td>Stop</td>
                    <td></td>
                </tr>
                <tr>
                    <td>SIGWINCH</td>
                    <td>28</td>
                    <td>Ign</td>
                    <td>Signál zmeny veľkosti okna</td>
                </tr>
                </tbody>
            </table>
            <div className={'title-box'}>POSTUP:</div>
            <br/>
            <strong>KROK2 – naučiť sa používať príkaz <code>kill</code>:</strong>
            Príkaz shellu <code>kill</code> slúži na okamžité zaslanie signálu jednému procesu alebo skupine
            procesov. Tento príkaz prijíma voliteľné číslo signálu (príkaz <code>kill</code> má prednastavenú
            hodnotu signálu SIGTERM) a PID procesu (ktoré obvykle zistíme príkazom <code>ps</code>),
            ktorému sa má daný signál poslať. <br/> <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie zadá Sofia príkaz <strong><code>man
                kill</code></strong>.
            </div>
            <strong>Príklady: </strong> <br/>

            <p><span className="command">kill 59</span> odošle signál SIGTERM procesu s PID = 59</p>

            <p>Ak je číslom procesu záporné číslo, signál pošle danej skupine procesov (PGID)</p>

            <p><span className="command">kill -59</span> odošle signál SIGTERM procesom skupiny PGID = 59</p>

            <p>Ak zadá ako PID číslo -1, signál pošle všetkým procesom okrem PID = 1
                (init proces – proces, ktorý riadi spúšťanie iných procesov)</p>

            <p><span className="command">kill -1</span> odošle signál SIGTERM všetkým procesom okrem PID = 1</p>

            <p>Ak chce poslať signál trom individuálnym procesom, oddeľ ich medzerou.</p>

            <p><span className="command">kill 23 24 38</span> odošle signál SIGTERM procesom s PID = 23, 34 a 38</p>

            <p>Najčastejšie však Sofia pravdepodobne použije poslanie signálu SIGKILL parametrom „-9“.</p>

            <p><span className="command">kill -9 2888</span> odošle signál SIGKILL procesu s PID = 2888</p>
            <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default FirstSubtopicEighth;
