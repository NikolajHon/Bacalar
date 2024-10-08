import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const ThirdSubtopicEighth = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="third-subtopic" id="section-3">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma:  Služba jadra - kill()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>kill() </code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>
                                    <li>syntax tejto služby</li>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>parametrom služby a jej spojeniu so službou <code>signal() </code>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>získané vedomosti pri posielaní signálov iným
                                    procesom v rámci programu aj mimo neho </td>
                            </tr>
                            <tr>
                                <td className="section-title">Vyriešiť:</td>
                                <td>zložitejšie príklady komunikácie medzi
                                    procesmi
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>5 minút</td>
                </tr>
                <tr>
                    <td className="section-title">Scenár</td>
                    <td>Služba <code>signal</code>() umožnila Sofii napísať program, ktorý čaká na
                        príchod nejakého signálu. Opäť však Sofia musela poslať tento
                        signál ručne. Aby sa zbavila tohto zásahu do činnosti programu,
                        môže vytvoriť iný proces, ktorý bude za ňu posielať signál
                        prostredníctvom služby <code>kill</code>().
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <strong>KROK1 – naučiť sa syntax a sémantiku služby jadra <code>kill()</code>:</strong>
            Ak sme schopní signály spracovávať, musíme ich vedieť i zasielať (aktivovať). To nám
            umožňuje služba jadra <code>kill()</code>. Služba <code>kill()</code> umožňuje zaslať signál procesu alebo
            skupine procesov.
            <p style={{textDecoration: 'underline'}}> Syntax:</p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/types.h> 
#include <signal.h> 
int kill(pid_t pid, int sig);                         
                        `
                    }
                </code>
            </pre> <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie zadaj príkaz <strong><code>man 2 kill</code></strong>.</div>
            <br/>
            <strong>Doplňte</strong> návratové hodnoty služby kill():
            <li>služba kill() vracia ___________, pri chybe __________  </li>
            <strong>KROK2 – aplikovanie služby v programe:</strong> <br/>
            V nasledujúcom príklade, po 5 sekundách pošle proces - potomok signál SIGALRM
            procesu – rodič a proces - potomok sa ukončí. Po prijatí signálu sa proces – rodič
            ukončí.
            <pre>
                <code className={'language-c'}>
                    {
                        `
Sofia pripojí potrebné hlavičkové súbory a definuje globálnu premennú na príznak 
odchytenia signálu a obslužnú funkciu: 
 
#include <sys/types.h> 
#include <signal.h> 
#include <stdio.h> 
#include <stdlib.h> 
 
 
 
void ding(int sig){ 
    printf("Odchytenie signalu %d\\n",sig);
} 
V hlavnej časti programu vytvorí jedného potomka procesu. Tento potomok po 
uplynutí 5 sekúnd pošle svojmu procesu (rodičovi) signál SIGALRM: 
 
int main() 
{ 
    pid_t pid; 
    printf("aplikacia bezi..\\n"); 
    pid = fork(); 
    switch(pid) { 
        case -1: perror("fork zlyhal"); 
            exit(1); 
        case 0: sleep(5); 
            kill(getppid(), SIGALRM); 
            exit(0); 
        
        Rodič bude čakať na daný signál, pričom využije službu pause(). Táto služba 
        pozastaví vykonávanie programu do príchodu nejakého signálu: 
        
        default: printf("cakanie na signal..\\n"); 
            signal(SIGALRM, ding);// zaregistruje obslužný 
                                           //       program  
            pause();              // tu čaká na signál 
            printf("koniec\\n"); 
            exit(0); 
    } 
}
                        `
                    }
                </code>
            </pre>
            <strong>KROK3:</strong> <br/>
            Aké bolo číslo odchyteného signálu vo výpise vášho programu?: <br/> <br/>

            Výstup z programu:
            <div className={'terminal-command'}>
                $ <br/>
                aplikacia bezi..<br/>
                cakanie na signal..<br/>
                Odchytenie signalu _______ <br/>
                koniec<br/>
                $
            </div>
        </div>

    );
};

export default ThirdSubtopicEighth;
