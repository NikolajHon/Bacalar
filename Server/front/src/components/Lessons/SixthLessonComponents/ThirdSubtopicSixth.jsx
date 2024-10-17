import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import Obr1 from '../../../images/FifthPageImg/Obr1.png'
import {languages} from "monaco-editor";

const ThirdSubtopicSixth = ({onComplete, completed}) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <div className="third-subtopic" id="section-3">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služba jadra – execve()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>execve() </code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>
                                    syntax služby, syntax štruktúry odovzdávanej ako
                                    argument tejto službe
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>
                                    <ul>
                                        <li> princípu a použitiu tejto služby</li>
                                        <li> jej parametrom, ktoré sa odovzdávajú
                                            spustenému programu
                                        </li>
                                        <li> návratovým hodnotám</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>
                                    <ul>
                                        <li> službu na nahradenie zdedenej činnosti
                                            v podriadenom procese inou činnosťou
                                        </li>
                                        <li> službu na spustenie programu
                                            s príslušnými parametrami
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Vyriešiť:</td>
                                <td>proces rozhodovania sa, ktorú službu skupiny
                                    exec použiť
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
                    <td>
                        Teraz sa Sofia potrebuje naučiť, ako v procese spustiť iný program,
                        než ten, ktorý proces-potomok zdedil pri vytvorení od svojho
                        rodiča. Procesu-potomkovi je potrebné „povedať“, aby vykonával
                        nejaký iný program. A práve na to môže Sofia využiť službu jadra
                        <code>execve()</code>.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>

            Vytváranie nových procesov nemá pre Sofiu veľký význam, pokiaľ nové procesy
            vykonávajú ten istý program, ktorý zdedili od svojho rodiča. Novovytvorenému procesu
            (ale nielen jemu) môže priradiť nový program použitím služby jadra <code>execve():</code>
            <br/>
            <br/>

            <strong>KROK1 – naučiť sa syntax a sémantiku služby jadra <code>execve()</code>:</strong> <br/>
            <p style={{textDecoration: 'underline'}}>Syntax:</p>
            <pre className={'terminal-command'}>
                {
                    `
    #include <unistd.h> 
    int execve(const char *path, char *const argv[], char *const envp[]); 
                    `
                }
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika:</p>
            <li>služba <code>execve()</code> pri úspešnom vykonaní nevracia návratovú hodnotu, -1 pri chybe</li>
            <br/>
            <strong>
                KROK2 – pochopiť parametre služby:</strong> <br/>
            Teraz si bližšie vysvetlíme parametre služby <code>execve()</code> v našom prípade – jej prvým
            parametrom je názov spustiteľného programu, ktorý má proces vykonávať. Ďalším
            parametrom má byť pole argumentov, ktoré chceme danému spúšťanému programu
            odovzdať. Posledný parameter určuje vlastnosti prostredia (environment) spúšťaného
            programu. <br/>
            <div className={'annotations'}>
                Podrobnejšie informácie o službe <code>execve()</code> si môžete pozrieť v <strong><code>man 2
                execve</code></strong>.
            </div>
            <br/>

            <strong>KROK3 - aplikovanie služby v programe:</strong> <br/>
            Sofia si vytvorí nový proces, pričom mu hneď priradí vykonávanie programu <code>child.
            Child</code> je jednoduchý program, ktorý vypíše ID svojho procesu. Následne pozastaví
            svoju činnosť na jednu sekundu a vypíše opäť svoje ID.
            <pre>
                <code className={'language-c'}>
                    {
                        `
//Program child 
#include <stdio.h> 
int main (void) 
{ 
    printf("Process[%d]: potomok v case vykonavania ...\\n", getpid()); 
    sleep(1); 
    printf("Process[%d]: potomok pri ukonceni ...\\n", getpid()); 
}                     
                        `
                    }
                </code>
            </pre>
            <br/>
            V tomto príklade bola použitá funkcia <code>sleep()</code>, ktorá pozastaví vykonávanie na určitý
            počet sekúnd, definovaný parametrom tejto služby. Bližšie informácie – <strong><code>man 3
            sleep</code></strong>.
            <br/>
            <pre>
                <code className={'language-c'}>
                    {
                        `
                         
//Program pre vytvorenie noveho procesu 
#include <sys/wait.h> 
#include <stdio.h> 
#include <stdlib.h> 
#include <unistd.h> 
 
int main (void) 
{ 
    if (fork() == 0) {               //toto je potomok  
        execve("child", NULL, NULL); 
        exit(0);                      //tu sa nikdy nedostane, ak execve 
    }                             // nezlyha 
     
    Proces (potomok) po zavolaní služby execve() zostáva ten istý. Zmení sa iba kód, 
    ktorý proces vykonáva. Pôvodný kód procesu (teda náš program) sa nahradí kódom 
    programu child. Takisto sa nahradia aj údaje pôvodného programu (premenne, 
    konštanty a alokovaná pamäť). 
     
    Teraz bude ďalej pokračovať nadradený proces. Vypíše ID procesu, pozastaví svoju 
    činnosť na dve sekundy a následne vypíše svoje ID pri zaznamenaní toho, že proces sa 
    ukončuje: 
                                     //toto je uz rodic  
    printf("Process[%d]: Rodic v case vykonavania ...\\n", getpid()); 
    sleep(2); 
    if(wait(NULL) > 0)               // potomok konci  
        printf("Process[%d]: rodic zaznamenal ukoncenie potomka \\n", 
        getpid()); 
    printf("Process[%d]: Rodic konci ...\\n", getpid()); 
}
                        `
                    }
                </code>
            </pre>
            <br/>
            Stručné vysvetlenie „<code>if(wait(NULL) > 0)</code>“ : služba <code>wait()</code> pozastaví vykonávanie
            volajúceho procesu po dobu, kým sa neukončí jeho proces - potomok. Jej parametrom je
            <strong> smerník</strong> na stavový buffer (celočíselná hodnota) alebo NULL. Ak sa použije ako
            parameter celočíselná hodnota, služba uloží stavovú informáciu do stavového buffra, na
            ktorý ukazuje táto hodnota (je to smerník). V našom prípade sme použili ako parameter
            NULL, pretože nepotrebujeme uložiť do buffra žiadnu stavovú informáciu pre neskoršie
            použitie. Služba <code>wait()</code>v prípade úspešného volania vráti ID ukončeného procesu,
            preto sme použili „<code>wait(NULL) > 0</code>“.
            <br/> <br/>
            <strong>KROK4 - oboznámiť sa s príbuznými službami k službe jadra <code>execve()</code>: </strong>
            Vyššie bola spomenutá služba jadra <code>execve()</code>. Okrem nej existujú aj knižničné funkcie
            <code>execl(), execlp(), execle(), execv(), execvp()</code>. Všetky tieto varianty sa líšia
            typom a počtom parametrov, preto v rámci bližšieho si osvojenia odovzdávania
            parametrov potomkom si prečítajte manuálové stránky aj k týmto službám.
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <unistd.h> 
extern char **environ; 
int execl(const char *path, const char *arg0, ..., (char *)0); 
int execlp(const char *file, const char *arg0, ..., (char *)0); 
int execle(const char *path, const char *arg0, ..., (char *)0, char 
*const envp[]); 
int execv(const char *path, char *const argv[]); 
int execvp(const char *file, char *const argv[]);                      
                        `
                    }
                </code>
            </pre> <br/>
            Funkcie s menom, v ktorom sa nachádza písmeno p, využívajú premennú prostredia
            PATH na vyhľadanie spustiteľného programu. Ak sa spustiteľný program nenachádza
            v žiadnom adresári uvedenom v premennej prostredia PATH, je nutné použiť ako
            argument meno programu s absolútnou, resp. relatívnou cestou k danému programu.
            <br/> <br/>
            <strong>KROK5 - aplikovanie služieb v programe: </strong>
            V tomto programe Sofia spustí nový program v hlavnom procese pomocou služby
            <code>execlp()</code> bez toho, aby tento nový program spúšťala v novovytvorenom procese.
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <unistd.h> 
#include <stdio.h> 
#include <stdlib.h> 
int main() 
{ 
    printf("Spustenie ps pomocou execlp\\n"); 
    execlp("ps", "ps", "-ax", (char *)0); 
    printf("Koniec.\\n"); 
    exit(0); 
}           
                        `
                    }
                </code>
            </pre> <br/>
            Výstup z programu:
            <div className={'terminal-command'}>
                Výstup z programu: <br/>
                $ ./pexec <br/>
                Spustenie ps pomocou execlp<br/>
                PID TTY STAT TIME COMMAND<br/>
                ...<br/>
                1262 pts/1 S 0:00 /bin/bash<br/>
                1465 pts/1 S 0:01 emacs Makefile<br/>
                1514 pts/1 R 0:00 ps –ax<br/>
                $
            </div>
            <br/>
            Po spustení programu <code>pexec</code> si Sofia všimla jednu podstatnú vec – vo výpise chýba
            správa „Koniec“. Čo sa stalo? Program vypísal prvú správu a potom zavolal <code>execlp()</code>.
            Táto služba spustila vykonávanie nového kódu z nového vykonateľného súboru
            špecifikovaného vo volaní <code>execlp()</code> služby (čiže program <code>ps</code>). Po skončení programu
            <code>ps</code> sa ukázal nový shell prompt. Nevykonal sa návrat do programu <code>pexec</code>, takže sa
            nevypísala posledná správa „Koniec“.
            <strong>KROK6 - oboznámiť sa s ďalšou možnosťou priradenia programu:</strong> <br/>
            Sofia sa dozvedela, že novovytvorenému procesu môže zdanlivo priradiť nový program
            nielen pomocou služby jadra <code>execve()</code> a funkcií skupiny <code>exec</code>, ale tiež pomocou
            funkcie <code>system()</code>. Služba <code>system()</code> využíva pri svojej činnosti
            služby <code>fork()</code>,
            <code>execve()</code> a <code>waitpid()</code> – spustí nový proces, v ňon shell a ten vykoná príkaz zadaný
            ako parameter tejto funkcie.. <br/> <br/>
            <p style={{textDecoration: 'underline'}}>Syntax:</p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <stdlib.h> 
int system (const char *string)            
                        `
                    }
                </code>
            </pre>
            <br/>
            Táto služba vykoná program, ktorý je jej odovzdaný ako parameter vo forme reťazca
            a čaká na jeho ukončenie. Pre názornosť malý príklad:
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <stdlib.h> 
#include <stdio.h> 
int main() 
{ 
    printf("Spustenie ps s parametrami cez sluzbu system\\n"); 
    system("ps –ax"); 
    printf("Done\\n"); 
    exit(0); 
} 
                        `
                    }
                </code>
            </pre> <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie zadaj príkaz <strong>man system</strong>.</div>
            <br/>
            Program zavolá službu <code>system()</code> s parametrom <code>ps –ax</code>.
            Služba <code>system()</code> spúšťa
            program v shelli.
            <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default ThirdSubtopicSixth;
