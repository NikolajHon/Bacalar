import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const FirstSubtopicSixth = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="first-subtopic" id="section-1">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služby jadra – getpid()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>getpid()</code>, pid process</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                <ul>
                                    návratové hodnoty služby
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>jej použitiu pri získavaní identifikačných čísel
                                procesov
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>
                                <ul>
                                    <li> túto službu pre získanie identifikačných
                                        čísiel procesov
                                    </li>
                                    <li> jej návratové hodnoty</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vyriešiť:</td>
                            <td>problémy pri orientovaní sa v hierarchii procesov</td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>5 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Aby Sofia pri práci s väčším počtom procesov nestratila orientáciu,
                        bude využívať ID procesu pre jeho identifikáciu. Kvôli tomu sa
                        najprv oboznámi so službou jadra <code>getpid()</code>.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            Na programové zistenie ID procesu Sofia použije službu <code>getpid()</code>. <br/> <br/>
            <strong>KROK1 – naučiť sa syntax a sémantiku služby jadra <code>getpid()</code>:</strong>
            <div className={'annotations'}>
                Pre podrobnejšie informácie zadaj príkaz man 2 getpid.
            </div>
            <br/>
            <strong>KROK2 – aplikovanie služby v programe:</strong> <br/>
            <strong>KROK2 – aplikovanie služby v programe:</strong> <br/>
            Použitie tejto služby je veľmi jednoduché, ale jej samostatné použitie v programe nemá
            veľký význam. Iná situácia nastáva, keď aktuálny proces vytvorí svojho potomka a je
            potrebné sa medzi nimi zorientovať. Napriek tomu si aj tak ukážeme typické použitie
            spomínanej služby. <br/> <br/>
            Sofia zostaví jednoduchý program, prostredníctvom ktorého vypíše ID procesu. Ako
            v každom programe, Sofia najprv pripojí potrebné hlavičkové súbory a následne
            zrealizuje výpis čísla procesu.
            <pre>
                <code className={'language-c'}>
                    {
                        `
    #include <stdio.h>  
    #include <sys/types.h>  
    #include <unistd.h>  
    int main()  
    {   
        printf("ID procesu je %d\\n", getpid()); 
        return 0; 
    } 
                        `
                    }
                </code>
            </pre>
            <strong>KROK3:</strong> <br/>
            Aké bolo číslo procesu, v ktorom bol spustený Váš program?: <br/><br/>
            Výstup z programu:
            <div className='terminal-command'>
                $ <br/>
                ID procesu je  ............... <br/>
                $
            </div>
        </div>
    );
};

export default FirstSubtopicSixth;
