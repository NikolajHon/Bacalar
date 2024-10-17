import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const SecondSubtopicEighth = ({onComplete, completed}) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="second-subtopic" id="section-2">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služba jadra - signal()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>signal(), man signal</code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>
                                    <li>jej syntax a syntax obslužnej funkcie</li>
                                    <li>argumenty tejto služby</li>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>princípu čakania a odchytávania signálu
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>
                                    službu pri odchytávaní, resp. ignorovaní
                                    nejakého signálu
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Vyriešiť:</td>
                                <td>efektívnu komunikáciu medzi dvoma
                                    alebo viacerými signálmi
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>10 minút</td>
                </tr>
                <tr>
                    <td className="section-title">Scenár</td>
                    <td>Sofia chce vytvoriť program, ktorý odchytí príchod špecifického
                        signálu. Zistila, že pre vyriešenie tejto úlohy jej pomôže služba
                        <code>signal()</code>
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <strong>KROK1 – naučiť sa syntax a sémantiku služby jadra <code>signal()</code>:</strong> <br/>
            Hlavnou úlohou tejto služby je nastavenie obslužného programu (<i>signal handler</i>) pre
            konkrétny signál, ktorý sa aktivuje po vzniku udalosti spojenej s týmto signálom. Proces
            môže vykonať špecifickú činnosť prostredníctvom daného obslužného progamu, alebo
            ignorovať prijatý signál (SIG_IGN), alebo nastaviť implicitnú reakciu na daný signál
            (SIG_DFL).
            <p style={{textDecoration: 'underline'}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <signal.h> 
typedef void(*sighandler_t)(int); 
sighandler_t signal(int signum, sighandler_t handler);                    
                        `
                    }
                </code>
            </pre>
            <div className={'annotations'}>
                Pre podrobnejšie informácie zadaj príkaz <code><strong>man signal</strong></code>.
            </div>
            <br/>
            <strong>Doplňte</strong> návratové hodnoty služby <code>signal()</code>: <br/>
            <li>
                služba signal() vracia _________________________________, pri chybe _______________________
            </li>
            <br/>
            <strong>KROK2 – aplikovanie služby v programe:</strong> <br/>
            Sofia si vytvorí program, ktorý vypisuje reťazec „Hello world“ v sekundových
            intervaloch, pokiaľ nedostane signál SIGINT, ktorý pri normálnom nastavení terminálu
            reprezentuje kombinácia kláves Ctrl+C. Pri prvom stlačení Ctrl+C program vypíše, že
            signál bol odchytený a zároveň nastaví pôvodné správanie na signál SIGINT. Po
            ďalšom stlačení kombinácie kláves už program končí. <br/> <br/>
            Najprv Sofia pripojí potrebné hlavičkové súbory: <br/>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <signal.h> 
#include <stdio.h> 
Následne definuje obslužnú funkciu signálu, teda reakciu, čo sa stane, keď procesu 
(programu) bude poslaný signál: 

void odchytenie(int sig){ 
    printf("Odchytenie signalu %d\\n",sig); 
    signal(SIGINT, SIG_DFL); 
} 
    V hlavnej funkcii použije službu jadra signal() a v nekonečnom cykle bude po 
    uplynutí jednej sekundy vypisovať reťazec „Hello world“ : 
int main(){ 
    (void) signal(SIGINT,odchytenie); 
    while(1){  
        printf("Hello world\\n"); 
        sleep(1); 
    } 
    return(0); 
} 
                        `
                    }
                </code>
            </pre>
            <br/>
            Tento program bude čakať na signál SIGINT (poslaný Sofiou pri stlačení CTRL+C).
            Počas doby čakania bude vypisovať „Hello world“. Po prijatí signálu sa aktivuje
            obslužná funkcia <code>odchytenie</code>(), v ktorej sa vypíše číslo prijatého signálu a pomocou
            argumentu SIG_DFL sa nastaví pôvodná reakcia na signál SIGINT, teda ukončenie
            programu. Ak by v obslužnej funkcii nebolo nastavenie pôvodnej reakcie, program by
            po každom stlačení CTRL+C zavolal obslužnú funkciu a neukončil by sa. Sofia by
            musela použiť príkaz <code>kill -9</code> s číslom tohto procesu, aby sa tento proces ukončil. <br/> <br/>
            <strong>KROK3:</strong> <br/>
            Aké bolo číslo odchyteného signálu vo výpise Vášho programu?: <br/> <br/>
            Výstup z programu:
            <div className={'terminal-command'}>
                $ <br/>
                Hello World<br/>
                Hello World<br/>
                Hello World<br/>
                Hello World<br/>
                ^C<br/>
                Odchytenie signalu<br/>
                Hello World<br/>
                Hello World<br/>
                Hello World<br/>
                Hello World<br/>
                ^C<br/>
                $<br/>
            </div>
            <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>

    );
};

export default SecondSubtopicEighth;
