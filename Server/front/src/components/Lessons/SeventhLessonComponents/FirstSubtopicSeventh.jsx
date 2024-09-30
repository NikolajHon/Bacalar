import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import Obr1 from "../../../images/SeventhPageImg/Obr1.png"

const FirstSubtopicSeventh = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="first-subtopic" id="section-1">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služba jadra – pipe()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>who, pipe() </code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                <li>syntax služby pre vytvorenie
                                    nepomenovanej rúry
                                </li>
                                <li>príkaz pre zistenie prihlásených
                                    používateľov
                                </li>
                                <li>zdroje na internete:</li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <li>medziprocesovej komunikácii
                                    založenej na princípe rúr (pipe-ov)
                                </li>
                                <li>argumentom služby <code>pipe()</code></li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>službu <code>pipe()</code> na vytvorenie nepomenovanej rúry</td>
                        </tr>
                        <tr>
                            <td className="section-title">Vedieť:</td>
                            <td>
                                <li>rozdiel medzi pomenovanou
                                    a nepomenovanou rúrou
                                </li>
                                <li>využiť získané skúsenosti pri
                                    tvorbe programov
                                </li>
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
                    <td>Sofia dostala za úlohu preniesť dáta prostredníctvom rúry. Aby
                        mohla túto úlohu vyriešiť, tak sa potrebuje naučiť vytvoriť rúru
                        pomocou služby <code>pipe()</code> a realizovať prenos dát cez rúru.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            OS UNIX/Linux umožňuje vytvoriť v jadre vyrovnávaciu pamäť, cez ktorú si môžu
            procesy vymieňať dáta. Dáta, ktoré jeden proces do rúry zapíše, druhý môže prečítať,
            ale môže sa tak udiať aj v rámci jedného procesu. Táto vyrovnávacia pamäť sa nazýva
            rúra (angl. pipe).
            <br/><br/>
            Jednoducho povedané, služba jadra <code>pipe()</code> vytvorí vyrovnávaciu pamäť (rúru) a
            sprístupni ju prostredníctvom dvoch deskriptorov súborov. Jeden slúži na zápis dát,
            druhý na ich čítanie. Zápis a čítanie prebieha podobne ako pri súboroch (volania <code>read()</code>
            a <code>write()</code>). <br/>
            Schematický je princíp činnosti rúr, vzhľadom na jeden proces, zobrazený na Obr.1.
            <pre className='image-container'>
                <img src={Obr1} alt="Obr1"/>
            </pre>
            <br/>
            <strong>KROK 1 - naučiť sa syntax a sémantiku služby jadra <code>pipe()</code>:</strong>
            Aby Sofia mohla pracovať s rúrou, potrebuje sa naučiť službu jadra <code>pipe()</code>. Táto služba
            umožňuje vytvoriť nepomenovanú rúru a sprístupniť ju na odovzdávanie.
            <p style={{textDecoration: 'underline'}}>Syntax:</p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
    #include <unistd.h> 
    int pipe(int file[2]);                     
                        `
                    }
                </code>
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika:</p>
            Ako argument sa službe <code>pipe()</code> odovzdáva dvojprvkové celočíselné pole. Toto pole
            služba <code>pipe()</code> vyplní dvoma novými deskriptormi a vráti návratovú hodnotu - nulu. Pri
            zlyhaní vráti hodnotu -1. Po volaní služby <code>pipe()</code> sa v prvom prvku poľa nachádza
            deskriptor pre čítanie z rúry (<code>file[0]</code>) a v druhom prvku deskriptor pre zápis do rúry
            (<code>file[1]</code>).
            <br/><br/>
            Manuálové stránky systému Unix definujú nasledujúce chyby:
            <table>
                <thead>
                <tr>
                    <th>Chyba</th>
                    <th>Popis</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>EMAILE</td>
                    <td>Proces používa príliš veľa deskriptorov súborov</td>
                </tr>
                <tr>
                    <td>ENFILE</td>
                    <td>Systémová tabuľka súborov je plná</td>
                </tr>
                <tr>
                    <td>EFAULT</td>
                    <td>Deskriptor súboru je neplatný</td>
                </tr>
                </tbody>
            </table>
            <br/>
            <div className={'annotations'}>Podrobnejšie informácie o službe <code>pipe()</code> si môžete pozrieť <strong><code>v
                man 2 pipe</code></strong>.</div>
            <br/>
            <strong>KROK2 – aplikovanie služby v programe:</strong> <br/>
            <strong>1. program</strong> - Program vytvorí rúru prostredníctvom volania <code>pipe()</code> a sprístupní ju
            pomocou dvoch deskriptorov v poli <code>file_pipes</code>. Do rúry sa zapíšu dáta pomocou
            deskriptora <code>file_pipes[1]</code>, prostredníctvom deskriptora <code>file_pipes[0]</code> ich môže
            proces  prečítať. Rúra používa vyrovnávaciu pamäť obmedzenej veľkosti (zvyčajne
            4KB), ktorá slúži na uloženie dát medzi volaniami <code>write()</code> a <code>read()</code>. Spravidla sa
            volania <code>read()</code> a <code>write()</code> vyskytujú v rôznych procesoch.
            <br/> <br/>
            <strong>Program 1</strong>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <unistd.h> 
#include <stdlib.h> 
#include <stdio.h> 
#include <string.h> 
#define BUFSIZE 5 
int main() 
{ 
    int data_processed; 
    int file_pipes[2]; 
    const char some_data[] = "123"; 
    char buffer[BUFSIZ + 1]; 
    memset(buffer, '\\0', sizeof(buffer)); 
    if (pipe(file_pipes) == 0) { 
        data_processed = write(file_pipes[1], some_data, 
        strlen(some_data)); 
        // pokracovanie na dalsej strane   
        printf("Zapis %d bytov\\n", data_processed); 
        data_processed = read(file_pipes[0], buffer, BUFSIZ); 
        printf("Citanie %d bytov: %s\\n", data_processed, buffer); 
        exit(EXIT_SUCCESS); 
    } 
    exit(EXIT_FAILURE); 
}                     
                        `
                    }
                </code>
            </pre>
            <br/>
            Výstup z programu: <br/>
            <div className={'terminal-command'}>
                $ <br/>
                Zapis 3 bytov <br/>
                Citanie 3 bytov: 123 <br/>
                $
            </div>
            <br/>
            <strong>ÚLOHA – modifikácia programu</strong> <br/>
            Pre názornosť využitia naučenej služby <code>pipe()</code> a lepšie pochopenie prenosu dát cez
            rúru v rámci jedného procesu rozšírte Program 1 o službu <code>execve()</code>. Služba <code>execve()</code>
            nám spusti vykonávanie programu, ktorý prečíta dáta, ktoré boli zapísané pred volaním
            služby <code>execve().</code>
        </div>
    );
};

export default FirstSubtopicSeventh;
