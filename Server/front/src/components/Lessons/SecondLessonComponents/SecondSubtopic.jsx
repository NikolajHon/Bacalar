import React from 'react';

const SecondSubtopic =  ({ onComplete, completed }) => {
    return (
        <div className="second-subtopic" id="section-2">
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Podtéma: Služby jadra – open() a close()</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="section-title">Kľúčové slová</td>
                        <td><i>open(), close(),</i> flags, <i>inode.h</i></td>
                    </tr>
                    <tr>
                        <td className="section-title">Ciele</td>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="section-title">Zapamätať si:</td>
                                        <td>
                                            syntax služieb - prečítať si manuálové stránky
                                            v Unixe/Linuxe, Linux dokumentačný projekt,
                                            zdroje na internete:
                                            <br />
                                            <a href="http://unixhelp.ed.ac.uk/" target="_blank" rel="noopener noreferrer">http://unixhelp.ed.ac.uk/</a>
                                            <br />
                                            <a href="http://www.ee.surrey.ac.uk/Teaching/Unix/" target="_blank" rel="noopener noreferrer">http://www.ee.surrey.ac.uk/Teaching/Unix/</a>
                                            <br />
                                            <a href="http://linux.about.com/od/commands/l/blcmdl2_open.htm" target="_blank" rel="noopener noreferrer">http://linux.about.com/od/commands/l/blcmdl2_open.htm</a>
                                            <br />
                                            <a href="http://linux.about.com/library/cmd/blcmdl2_close.htm" target="_blank" rel="noopener noreferrer">http://linux.about.com/library/cmd/blcmdl2_close.htm</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="section-title">Porozumieť:</td>
                                        <td>
                                            <ul>
                                                <li>parametrom <i>flags</i> a <i>mode</i></li>
                                                <li>významu súvisiacich služieb
                                                    ( <i>create()</i>, <i>lseek()</i>, <i>read()</i>,
                                                    <i>umask()</i> ) </li>
                                                <li>chybovým hláseniam</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="section-title">Aplikovať:</td>
                                        <td>služby <i>open()</i> a <i>close()</i> pri práci so súbormi</td>
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
                        <td>20 minút</td>
                    </tr>
                    <tr>
                        <td className="section-title">Scenár</td>
                        <td>Sofia pri riešení svojej úlohy zistila, že pred prácou so súborom
                            potrebuje daný súbor otvoriť. Použije na to službu <i>open()</i>, ale pre
                            efektívnu prácu so súborom potrebuje sa naučiť pracovať s tzv.
                            flagmi. Keď ukončí prácu so súborom, tak ho zatvorí pomocou
                            služby <i>close()</i>.
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2>POSTUP:</h2>
            <h4>KROK1 - naučiť sa syntax a sémantiku služby jadra open():</h4>
            <p>Pomocou služby jadra <i>open()</i> získame deskriptor súboru pre čítanie alebo zápis, resp.
                môžeme vytvoriť nový súbor. </p>
            <p style={{ textDecoration: 'underline' }}>Syntax:</p>
            <pre>
{`
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
int open(char *pathname, int flags, mode_t mode) 
`}
            </pre>
            <p><p style={{ textDecoration: 'underline' }}>Semantika:</p>
                <ul>
                    <li><i>open()</i> vracia - deskriptor súboru alebo -1, pri chybe
                    </li>
                </ul>
                <h4>KROK2 - pochopiť parametre služby:</h4>
                <p>Služba <i>open()</i> otvorí súbor uvedený v parametri <i>pathname</i> pre čítanie alebo zápis,
                    podľa toho, ako je to špecifikované argumentom <i>flags</i> a akú návratovú hodnotu vráti
                    deskriptor pre otvorený súbor.
                </p>
                <h4>KROK3 - pochopiť účel parametrov <i>flags</i> a <i>mode</i>:</h4>
                <p>Parameter <i>flags</i> môže byť (окrem iného) špecifikovaný jednou alebo kombináciou
                    viacerých z nasledujúcich položiek:
                </p>
                <table className="command-table">
                    <tbody>
                        <tr>
                            <td>O_RDONLY </td>
                            <td>Otvoriť súbor len pre čítanie </td>
                        </tr>
                        <tr>
                            <td>O_WRONLY</td>
                            <td>Otvoriť súbor len pre zápis </td>
                        </tr>
                        <tr>
                            <td>O_RDWR</td>
                            <td>Otvoriť súbor pre zápis aj čítanie</td>
                        </tr>
                        <tr>
                            <td>O_APPEND</td>
                            <td>Doplnenie pre každý zápis</td>
                        </tr>
                        <tr>
                            <td>O_CREAT</td>
                            <td>Vytvoriť súbor ak neexistuje</td>
                        </tr>
                        <tr>
                            <td>O_TRUNC</td>
                            <td>Skrátiť veľkosť súboru na 0</td>
                        </tr>
                        <tr>
                            <td>O_EXCL</td>
                            <td>Chyba, ak súbor už existuje</td>
                        </tr>
                    </tbody>
                </table>
                <p>Ak otváraný súbor ešte neexistuje, je možné jeho prístupové práva (tejto problematike
                    sa budeme venovať neskôr) nastaviť parametrom <i>mode</i>. Parameter <i>mode</i> je tvorený
                    jednou alebo kombináciou viacerých z nasledujúcich položiek, definovaných v
                    <i>sys/inode.h</i>:
                </p>
                <table className="table-rules" id="rules">
                    <tbody>
                        <tr>
                            <td>IREAD</td>
                            <td>00400</td>
                            <td>čítanie pre majiteľa</td>
                        </tr>
                        <tr>
                            <td>IWRITE</td>
                            <td>00200</td>
                            <td>zápis pre majiteľa </td>
                        </tr>
                        <tr>
                            <td>IEXEC</td>
                            <td>00100</td>
                            <td>vykonávanie pre majiteľa</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>00070</td>
                            <td>čítanie, zápis a vykonávanie pre skupinu</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>00007</td>
                            <td>čítanie, zápis a vykonávanie pre ostatných </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <h4>KROK4 - naučiť sa syntax a sémantiku služby jadra <i>close()</i>:</h4>
                <p>Táto funkcia ukončí prácu s otvoreným súborom.</p>
                <p style={{ textDecoration: 'underline' }}>Syntax:</p>
                <pre>
{`
#include <unistd.h>
int close (int filedes); 
`}
                </pre>
                <p><p style={{ textDecoration: 'underline' }}>Semantika:</p>
                    <ul>
                        <li><strong>close</strong> vracia: 0 keď OK alebo -1, pri chybe</li>
                    </ul>
                </p>
                <h4>KROK5 – pochopiť parametre služby: </h4>
                <p>Argument <i>filedes</i> je deskriptor otvoreného súboru. Uzatvorenie súboru spôsobí
                    vyprázdnenie vyrovnávacích pamätí a taktiež odomknutie všetkých zámkov naložených
                    na súbor. 
                    <br /><br />
                    Podrobnejšie informácie o službách <i>open() a close()</i> si môžete pozrieť
                    v <strong>man 2 open</strong> a <strong>man 2 close</strong>. 
                </p>
                <h4>KROK6 – aplikovanie služieb v programe:</h4>
                <p><strong>1. program</strong> -Vytvoríme program, ktorý otvorí súbor len na čítanie. Názov súboru je
                    zadaný z príkazového riadku. 
                </p>
                <pre>
{`
#include <fcntl.h>
#include <stdio.h>
int main (int argc, char* argv[])
{
    const char* const filename=argv[1];
    //meno suboru z prikazoveho riadku
    int fd = open (filename, O_RDONLY); //otvorenie suboru
    printf("file descriptor %d meno suboru %s\n",fd ,filename);
    close(fd); //zatvorenie suboru
    return 0;
}
`}
                </pre>
                <p><strong>Úloha – modifikácia programu </strong>
                    Vytvorte súbor s názvom <i>subor1</i> a zapíšte do neho ľubovoľný text. Ak súbor existuje,
                    otvorte ho na zápis a zapisovaný text pridajte na koniec súboru. Vytvorený súbor bude
                    mať povolený zápis a čítanie jeho majiteľom
                </p>
                <p><strong>2. program</strong> – Riešenie zadanej úlohy.</p>
                <pre>
{`
#include <fcntl.h>
#include <sys/stat.h>
#include <stdio.h>
int main(int argc, char **argv)
{
    int des; // premenna na ulozenie deskriptora
    des = open("subor1",O_CREAT|O_APPEND|O_WRONLY,S_IRUSR|S_IWUSR);
    // vytvoríme / otvoríme súbor
    printf("file descriptor %d suboru \n",des);
    write(des, "Dvadsatznakovy text\n",20); // Zapíšeme do súboru
    close(des); // zatvoríme súbor
    return 0;
} 
`}
                </pre>
                <p>A čo ak sa súbor nepodarí otvoriť? V takom prípade volanie <i>open()</i> vráti „-1“ a
                    v globálnej premennej <i>errno</i> sa nastaví číslo chyby. Takže otvorenie súboru spolu
                    s ošetrením chyby môže vyzerať takto: 
                </p>
                <pre>
{`
if((des=open("subor1",O_RDONLY))== -1){ //otvoríme súbor
    perror("Otovrenie suboru SUBOR1");
} 
`}
                </pre>
            </p>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default SecondSubtopic;
