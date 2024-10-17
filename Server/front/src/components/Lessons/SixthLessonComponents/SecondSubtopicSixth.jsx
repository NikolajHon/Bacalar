import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const SecondSubtopicSixth = ({onComplete, completed}) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="second-subtopic" id="section-2">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služba jadra – fork(), getppid()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>fork(), man fork(), getppid()</code>, return value,</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>rozdiel medzi návratovými hodnotami služby
                                <code>fork() </code></td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <ul>
                                    <li> hlavne návratovým kódom</li>
                                    <li>tvorbe podriadeného procesu
                                        (zdedenie vlastností rodiča )
                                    </li>
                                    <li>vykonávaniu programu po vytvorení
                                        nového procesu
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>
                                <ul>
                                    <li> tieto služby pri tvorbe nových
                                        procesov
                                    </li>
                                    <li> návratové hodnoty služieb</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vyriešiť:</td>
                            <td>tvorbu dvoch a viacerých procesov</td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>15 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Aby mohla Sofia naplno využiť možnosti, ktoré jej ponúka práca
                        s procesmi, musí sa naučiť vytvárať nové procesy. V tejto kapitole
                        sa naučí používať aj službu na získanie ID procesu rodiča, ktorý
                        potomka vytvoril. K čomu jej to bude? Hlavne jej to pomôže
                        zorientovať sa vo vzťahu rodič - potomok.

                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <strong>KROK1 - naučiť sa syntax a sémantiku služby jadra <code>fork()</code>:</strong>
            Pri vytváraní procesov služba <code>fork()</code> vytvorí (takmer) identický proces – klon (to,
            ktoré vlastnosti zdedí potomok od rodiča, si Sofia pozrie v študijnej literatúre.). Keďže
            v oboch procesoch spracovanie pokračuje za volaním <code>fork()</code> , je veľmi dôležité
            rozumieť návratovým hodnotám služby v jednotlivých procesoch: <br/>
            <li><strong>Návratovou hodnotou služby <code>fork()</code> v rodičovskom procese je ID jeho potomka
                a v potomkovi je návratovou hodnotou „0“</strong>.
            </li>
            <div className={'annotations'}>
                Pre podrobnejšie informácie zadaj príkaz <strong><code>man 2 fork</code></strong>.
            </div>
            <strong>KROK2 – aplikovanie služby v programe:</strong> <br/>
            <strong>1. program</strong> - Sofia si pripraví program, pomocou ktorého si môže vytvoriť nový
            proces. Pripojí potrebné hlavičkové súbory.
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <stdio.h> 
#include <unistd.h>   
 
int main(void)  
{  
 
    Sofia definuje premennú pre uloženie návratovej hodnoty funkcie fork(): 
    int pid; 
 
    Proces - rodič vypíše štandardnú vetu „Hello world“ a vytvorí nový proces pomocou 
    fork():
    printf("Hello World!\\n"); 
    pid = fork(); 
 
    Na základe otestovania návratovej hodnoty služby fork() program vypíše hlásenia, 
    buď „Ja som syn“ alebo „Ja som rodic“.  
 
    if (pid == 0) printf(" Ja som syn.\\n"); 
    else  printf(" Ja som rodic.\\n"); 
} 
                        `
                    }
                </code>
            </pre>
            Keďže po vykonaní služby <code>fork()</code> v systéme sa vykonávajú dva identické procesy,
            v kóde je využitá návratová hodnota služby <code>fork()</code>, aby aj rodič a aj potomok vedeli
            sami seba identifikovať. Po výpise potomok ukončí svoju činnosť. Je potrebné si
            uvedomiť, že rodič <strong>nečaká</strong> na ukončenie potomka. Vykonávanie rodiča prebieha ďalej,
            paralelne s vykonávaním potomka (fungujú ako dva nezávislé procesy). Samozrejme,
            existujú prostriedky, ako zabezpečiť, aby rodič počkal, kým sa jeho potomok neukončí,
            ale o tom si povieme neskôr. <br/> <br/>

            <strong>2. program</strong> - Sofia chce vytvoriť program, ktorý bude testovať na základe návratovej
            hodnoty, či vytvorenie procesu potomok prebehlo v poriadku.

            <pre>
                <code className={'language-c'}>
                    {
                        ` 
#include <stdio.h> 
int main(void) 
{   
    printf("Ja som rodic, kto je viac?\\n"); 
    switch(fork())                                                       
 
    Na základe návratovej hodnoty služby fork() pridelí hlásenie o tom, čo je vykonávané 
    potomkom, rodičom alebo hlásenie o prípadnej chybe vytvorenia potomka. 
 
    {  
    case 0:  //toto vykonava potomok                                    
        printf("Potomok sa hlasi\\n");  
        break;     
    case -1: //toto vykonáva rodic, ak sa nepodarilo vytvorit potomka   
        printf("Nastala chyba\\n");  
        break;     
    default: //navratova hodnota je PID potomka                          
        //toto vykonáva rodič ak je všetko v poriadku   
        printf("Rodic sa hlasi\\n");  
   } 
}
                        `
                    }
                </code>
            </pre>
            <br/>
            <strong>ÚLOHA – modifikácia programu</strong> <br/>
            Pre názornosť využitia naučenej služby <code>getpid()</code> a lepšie pochopenie služby <code>fork()</code>
            rozšírte výpisy o identifikáciu ID procesu. Všimnite si výsledok po skompilovaní
            a spustení programu
            <br/> <br/>
            <strong>KROK3:</strong> <br/>
            Aké boli čísla procesov rodič a potomok , v ktorom bol spustený váš program?:
            <br/> <br/>
            Výstup z programu:
            <div className={'terminal-command'}>
                $ <br/>
                Ja som rodic, kto je viac? ID procesu je ......... <br/>
                Potomok sa hlasi ID procesu je ........ <br/>
                Rodic sa hlasi ID procesu je .......... <br/>
                $
            </div>
            <br/>
            <strong>KROK4 - využitie služby <code>getppid()</code>: </strong>
            Služba jadra <code>getppid()</code> ma rovnakú syntax, ako služba <code>getpid()</code>, len s tým
            rozdielom,
            že jej návratová hodnota je ID rodiča volajúceho procesu!
            <div className={'annotations'}>Pre podrobnejšie informácie zadaj príkaz <strong><code>man 2
                getppid</code></strong>.</div>
            Sofia pripojí potrebné hlavičkové súbory a vypíše na štandardný výstup ID procesov
            pomocou služieb <code>getppid()</code> a <code>getpid()</code>.
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <stdio.h>  
#include <sys/types.h>  
#include <unistd.h>  
int main()  
{    
    //vypise ID procesov 
    printf("ID procesu je %d\\n", getpid()); 
    printf("ID jeho rodica je %d\\n", getppid());  
} 
                        `
                    }
                </code>
            </pre> <br/>
            <strong>ÚLOHA – modifikácia programu</strong> <br/>
            Službu <code>getppid()</code> skúste použiť v prípade, keď si sami vytvoríte potomka (jedného,
            dvoch) nejakého procesu. Kombinujte ju so službou <code>getpid()</code> a sledujte návratové
            hodnoty.
            <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default SecondSubtopicSixth;
