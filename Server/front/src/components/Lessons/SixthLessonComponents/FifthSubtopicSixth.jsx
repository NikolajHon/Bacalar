import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const FifthSubtopicSixth = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="fifth-subtopic" id="section-5">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Funkcia – exit()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>exit()</code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                účel tejto služby
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <li>súvislosti tejto služby so službou wait()</li>
                                <li>návratovým kódom</li>
                                <li>stavovým makrám</li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>službu na ukončenie a odovzdanie návratového
                                kódu (potomka) svojmu rodičovskému procesu
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vyriešiť:</td>
                            <td>tvorbu efektívnych programov
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
                    <td>Sofia potrebuje ukončiť proces – potomok, aby proces – rodič
                        mohol pokračovať. Riešením tohto problému je použitie služby
                        <code>exit().</code>

                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            Na okamžite ukončenie vykonávaného procesu a odovzdanie statusu rodičovskému
            procesu nám poslúži služba <code>exit()</code>.
            <br/> <br/>
            <strong>KROK1 – naučiť sa syntax a sémantiku služby jadra <code>exit()</code>:</strong>
            <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie použite príkaz - <strong><code>man
                exit</code></strong></div>
            <br/>
            <strong>KROK2 – aplikovanie služby v programe:</strong> <br/>
            Sofia pripojí potrebné hlavičkové súbory. V hlavnej funkcii definuje premennú na
            uloženie stavovej hodnoty a vytvorí nový proces, pričom na základe návratovej hodnoty
            služby <code>fork()</code> definuje činnosť potomka alebo rodiča.
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <stdio.h> 
#include <sys/wait.h> 
#include <stdlib.h> 
int main() 
{  
    int status; 
    if (fork() == 0){   
        /* toto vykona potomok, pozastavi svoje vykonavanie na 6 s */ 
        printf("pid potomka je: %d\\n", getpid()); 
        printf("pid rodica je: %d\\n", getppid()); 
        sleep(6);  
        exit(51);  
        /* hodnotu pre argument sluzby exit() sme zvolili nahodne  */ 
        } 
    Ináč program vykoná inštrukcie rodiča. Ten počká na ukončenie potomka, pričom ak 
    bol potomok ukončený normálne (kontrola použitím makra WIFEXITED na stavovú 
    hodnotu získanú službou wait()), vypíše túto stavovú hodnotu pomocou makra 
    WEXITSTATUS.
    else {  
        if(pid == -1){ 
            perror("nepodarilo sa vytvorit potomka"); 
            exit(1); 
        } 
        else { 
            printf("pid = %d\\n", wait(&status)); 
            printf("status = %x\\n", status); 
            if (WIFEXITED(status))  
            printf("Status (cez makro):%d\\n", WEXITSTATUS(status)); 
            exit(0); 
        } 
    }
}
                        `
                    }
                </code>
            </pre>
            <div className={'annotations'}>Význam použitých makier je vysvetlený v manuálových stránkach k
                službe <code>wait()</code>.
            </div>
            <br/>
            <strong>KROK3: </strong> <br/>
            Aký bol výpis programu uvedeného v KROKU2?: <br/> <br/>

            Výstup z programu:
            <div className={'terminal-command'}>
                $ <br/>
                pid potomka je: .........<br/>
                pid rodica je: .........<br/>
                pid = .........<br/>
                status = ........<br/>
                Status (cez makro): ..........<br/>
                $
            </div>
            <div className={'title-box'}> ÚLOHY NA SAMOSTATNÚ PRÁCU:</div>
            <li>Vyskúšajte si ďalšie služby skupiny <code>exec</code> a zistite rozdiel použitia medzi
                jednotlivými službami <code>exec</code>. </li>
            <li>Vytvorte program, v ktorom hlavný proces vytvorí jedného potomka. Proces
                potomok spustí vykonávanie programu "ls -al". Nepoužívajte službu <code>system()</code>.
                Proces rodič počká na ukončenie svojho potomka a vypíše jeho návratovú
                hodnotu a pid obidvoch procesoch. </li>
            <li>Vytvorte program, ktorý bude prijímať dve číslice ako argumenty. Nech hlavný
                proces vytvorí proces potomok, ktorý spočíta tieto číslice. Súčet týchto číslic
                potomok bude vraciať ako svoj návratový kód. Hlavný proces tento výsledok
                nakoniec vypíše.</li>


        </div>

    );
};

export default FifthSubtopicSixth;
