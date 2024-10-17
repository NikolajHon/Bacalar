import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import Obr2 from "../../../images/SeventhPageImg/Obr2.png"
import Obr1 from "../../../images/SeventhPageImg/Obr1.png";

const SecondSubtopicSeventh = ({onComplete, completed}) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="second-subtopic" id="section-2">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Rodičovské a dcérske procesy</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td>medziprocesová komunikácia</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>služby pre komunikáciu medzi
                                    procesmi prostredníctvom rúr
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>komunikácii medzi rodičovským procesom
                                    a potomkom pomocou rúry
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>služby na komunikáciu medzi procesmi
                                    prostredníctvom rúr
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Vedieť:</td>
                                <td>využiť získané skúsenosti pri tvorbe programov</td>
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
                        V predchádzajúcom príklade sa Sofia naučila vytvoriť rúru. Rúra je
                        v prvom rade prostriedkom pre medziprocesovú komunikáciu.
                        Pochopenie tejto problematiky jej sprostredkuje táto podkapitola.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <strong>KROK1 – pochopiť komunikáciu medzi procesmi pomocou rúry: </strong> <br/>
            Sofii vysvetlíme komunikáciu medzi rodičom a potomkom pomocou rúry na Obr.2.
            <pre className='image-container'>
                <img src={Obr2} alt="Obr2"/>
            </pre>
            Na začiatku rodičovský proces vytvorí dva deskriptory súborov ako pole deskriptorov o
            dvoch prvkoch, napr. <code>int file_pipes[2]</code>. Deskriptor <code>file_pipes</code> [0] sa zvyčajne
            používa na čítanie z rúry a <code>file_pipes</code> [1] na zápis do rúry. Volaním
            služby <code>pipe()</code> sa
            otvoria deskriptory rúry a sú prístupné na čítanie a zápis. Jadro nám teda poskytuje
            pamäť, pomocou ktorej môžu tieto procesy komunikovať. <br/> <br/>
            <strong>KROK2 – aplikovanie služby v programe:</strong> <br/>
            <strong>2. program</strong> – Aby sme zrealizovali architektúru zobrazenú na obr. 2, proces rodič
            najprv vytvorí rúru pomocou služby <code>pipe()</code>, potom pomocou služby jadra <code>fork()</code> sa
            vytvorí nový proces. Pokiaľ je volanie <code>fork()</code> úspešné, rodičovský proces môže do rúry
            zapísať dáta, ktoré potom prečíta proces potomok. Obidva procesy potom ukončia svoju
            činnosť po volaní služieb <code>write() </code>alebo <code>read()</code>.
            <br/> <br/>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <stdlib.h> 
#include <stdio.h> 
#include <string.h> 
 
int main() 
{ 
    int data_processed; 
    int file_pipes[2]; 
    const char some_data[] = "123"; 
    char buffer[BUFSIZ + 1]; 
    pid_t fork_result; 
    memset(buffer, '\\0', sizeof(buffer)); 
    
    if (pipe(file_pipes) == 0) { 
        fork_result = fork(); 
        if (fork_result == -1) { 
            fprintf(stderr, "Fork failure"); 
            exit(EXIT_FAILURE); 
        } 
        
        if (fork_result == 0) { // vetva potomok 
            data_processed = read(file_pipes[0], buffer, BUFSIZ); 
            printf("Read %d bytes: %s\\n", data_processed, buffer); 
            exit(EXIT_SUCCESS); 
        } 
        
        else {// vetva rodič 
            data_processed = write(file_pipes[1], some_data, 
            strlen(some_data)); 
            printf("Write %d bytes\\n", data_processed); 
        } 
    } 
    exit(EXIT_SUCCESS); 
}
                        `
                    }
                </code>
            </pre>
            <br/>

            Výstup z programu:
            <div className={'terminal-command'}>
                $ <br/>
                Read 3 bytes<br/>
                Write 3 bytes: 123<br/>
                $
            </div>

            Deskriptory súboru získané procesom, ktorý rúru vytvára, sú prístupné iba procesom -
            potomkom. Pri volaní služby <code>fork()</code>, deskriptory súboru sa dedia procesom potomkom.
            Odtiaľ vyplýva, že rúry môžu spojovať iba príbuzné procesy. V Program 2 služba
            <code>fork()</code> vytvorí potomka. Ten zdedí deskriptor súboru pre rúru. Rodičovský proces
            zapíše do rúry dáta, ktoré potom proces – potomok prečíta.
            <br/> <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default SecondSubtopicSeventh;
