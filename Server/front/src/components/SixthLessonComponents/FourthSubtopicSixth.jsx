import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const FourthSubtopicSixth = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="fouth-subtopic" id="section-4">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služba jadra – wait(), waitpid()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>wait(),waitpid()</code>, return value</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                <li> syntax oboch služieb</li>
                                <li> typ argumentu slúžiaceho na uloženie
                                    návratového kódu podriadeného procesu
                                </li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <li> synchronizácii činnosti medzi procesmi</li>
                                <li> parametrom služby</li>
                                <li>návratovým kódom</li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>
                                <li>služby na pozastavenie vykonávania
                                    procesu na dobu, kým sa neukončí
                                    potomok procesu
                                </li>
                                <li> návratové hodnoty služieb pre ďalšie
                                    potreby
                                </li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vyriešiť:</td>
                            <td>problémy jednoduchej synchronizácie medzi
                                procesmi
                            </td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>10 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Pri riešení zadanej úlohy Sofia narazila na problém – nevedela, ako
                        prinútiť rodiča, aby počkal na ukončenie činnosti vytvoreného
                        potomka. Riešením tohto problému je použitie služieb jadra
                        <code>wait() a waitpid()</code>.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            Niekedy je užitočné zistiť, čí potomok procesu už skončil a s akým návratovým kódom.
            Na toto slúži služba jadra <code>wait()</code>. <br/> <br/>
            <strong>KROK1 – naučiť sa syntax a sémantiku služieb jadra <code>wait()</code> a <code>waitpid()</code>:
            </strong>
            <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie zadaj príkaz <strong><code>man 2
                wait</code></strong> .
            </div>
            <br/> <br/>
            Argument <code>pid </code>služby <code>waitpid()</code> môže nadobúdať tieto hodnoty: <br/> <br/>
            <li>„-1“ čaká na ukončenie ľubovoľného potomka. V tomto stavu je ekvivalentné k
                službe <code>wait()</code></li>
            <li>„>0“ čaká na ukončenie potomka presne daným PID</li>
            <li>„== 0“ čaká na ukončenie ľubovoľného potomka, ktorého skupinové ID je
                rovnaké s ID skupiny volajúceho procesu.
            </li>
            <li>"&lt;-1" čaká na ukončenie potomka, ktorého skupinové ID je rovnaké s absolútnou
                hodnotou <code>pid</code>.
            </li>
            <br/>
            <strong>KROK2 – aplikovanie služieb v programe: </strong> <br/>
            <strong>1. program</strong> - Po pripojení potrebných hlavičkových súborov Sofia definuje celočíselnú
            premennú <code>status</code>, ktorá poslúži na uloženie stavovej informácie potomka pri ukončení
            jeho činnosti a ďalšiu celočíselnú premennú, pre uloženie návratovej hodnoty funkcie
            <code>fork()</code>:
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <stdio.h> 
#include <sys/wait.h> 
#include <stdlib.h> 
 
int main() { 
    int pid; 
    int status; 
    //Vytvorí potomka 
    pid = fork(); 
    //Otestuje, ci vytvorenie potomka prebehlo bez problémov 
    if (pid == -1) {         
       perror("zly fork"); 
       exit(1); 
    } 
    Testuje. Ak riadenie programu prevzal potomok, program to dokáže hlásením. 
    V opačnom prípade pozastaví svoje vykonávanie na dobu, kým sa neukončí potomok 
    a až potom vypíše hlásenie o tom, že riadenie programu má opäť on: 
    else  
        if(pid == 0) {  
            printf("riadenie ma na starosti potomok\\n"); 
            printf("jeho pid je: %d\\n", getpid()); 
            exit(51);  /*nahodne zvoleny parameter */ 
        } 
        else { 
            printf("pid ziskane cez wait je: %d\\n",wait(&status)); 
            printf("status = %d\\n", status); 
            printf("Rodic pokračuje vo vykonávaní programu.\\n"); 
        } 
    return 0; 
}                    
                        `
                    }
                </code>
            </pre>
            <br/>
            Služba <code>waitpid()</code> vykonáva podobnú funkciu ako služba <code>wait()</code>, avšak s tým
            rozdielom, že čaká na ukončenie konkrétneho procesu identifikovaného pomocou jeho
            ID, ktoré sa odovzdá ako argument tejto službe. <br/> <br/>
            <strong>KROK3 – oboznámiť sa s pojmom zombie procesy:</strong> <br/>
            Proces môže vrátiť svojmu rodičovi tzv. návratovú hodnotu prostredníctvom služby
            <code>exit().</code> V systémovej tabuľke ostane záznam o názvratovej hodnote procesu potomka,
            ktorý už dávno skončil. Záznam pretrváva dovtedy, pokiaľ rodič, resp. nejaký iný
            program nepreberie návratovú hodnotu, t.j. nezavolá službu jadra <code>wait()</code> alebo
            <code>waitpid()</code>.Hoci samotný proces nie je aktívny, naďalej zostáva v systéme ako tzv.
            proces - mátoha („zombie“ proces).
            <br/> <br/>
            <strong>
                2. program</strong>- Ako názorný príklad „zombie“ procesu si Sofia vytvorila program,
            v ktorom rodič aj potomok vypíšu určitý počet správ – konkrétne potomok 2 správy
            a rodič 10 správ. Keďže potomok vypíše menej správ než rodič, ukončí sa skôr ako
            rodič a ostane v systéme ako zombie proces, pokiaľ sa o jeho odstránenie nepostará
            proces <code>init</code>.
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/types.h> 
#include <unistd.h> 
#include <stdio.h> 
#include <stdlib.h> 
int main() 
{ 
    pid_t pid; 
    char *message; 
    int n; 
    printf("spustenie fork programu\\n"); 
    pid = fork(); 
    switch(pid) 
    { 
        case -1: 
            perror("nepodarilo sa vytvorit potomka"); 
            exit(1); 
        case 0: 
            message = "Toto je potomok"; 
            n = 2; 
            break; 
        default: 
            message = "Toto je rodic"; 
            n = 10; 
            break; 
    } 
    for(; n > 0; n--) { 
        puts(message); 
        sleep(1); 
    } 
    exit(0); 
}    
                        `
                    }
                </code>
            </pre>
            Keď Sofia po skompilovaní spustí tento program príkazom .<code>/forkz</code>. Po skončení
            potomka a pred ukončením rodiča zadá príkaz ps –al do novo otvoreného okna,
            uvidí podobný výpis:
            <div className={'terminal-command'}>
                $ ps -al <br/>
                F S UID PID PPID C PRI NI ADDR SZ WCHAN TTY TIME CMD<br/>
                004 S 0 1273 1259 0 75 0 - 589 wait4 pts/2 00:00:00 su<br/>
                000 S 0 1274 1273 0 75 0 - 731 schedu pts/2 00:00:00 bash<br/>
                000 S 500 1463 1262 0 75 0 - 788 schedu pts/1 00:00:00 oclock<br/>
                000 S 500 1465 1262 0 75 0 - 2569 schedu pts/1 00:00:01 emacs<br/>
                000 S 500 1463 1262 0 75 0 - 313 schedu pts/1 00:00:00 fork<br/>
                003 Z 500 1604 1603 0 75 0 - 0 do_exit pts/1 00:00:00 fork &lt;defunct&gt;<br/>
                000 R 500 1605 1262 0 81 0 - 781 - pts/1 00:00:00 ps<br/>
            </div> <br/>
            Keď potomok ukončí svoju činnosť, musí odovzdať svoju návratovú hodnotu  svojmu
            rodičovi. Ak však rodič tuto hodnotu neprevezme pomocou služby jadra <code>wait()</code>,
            potomok nemôže ukončiť svoju činnosť. Je potrebné si uvedomiť, že rodič nečaká na
            ukončenie potomka. Vykonávanie rodiča prebieha paralelne s vykonávaním potomka
            (fungujú ako dva nezávislé procesy). Ak proces rodič ukončí svoju činnosť skôr ako
            proces potomok, potom proces potomok sa stáva zombie procesom, ktorý zostane
            v tabuľke procesov dovtedy, pokým sa o jeho odstránenie nepostará proces <code>init</code> s PID 1.
            Čím väčšia je tabuľka procesov, tým je systém pomalší, preto by sa používatelia mali
            vyvarovať zombie procesov, nakoľko vyčerpávajú systémové zdroje.

        </div>

    );
};

export default FourthSubtopicSixth;
