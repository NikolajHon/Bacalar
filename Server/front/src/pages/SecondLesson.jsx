import React from 'react';
import '../styles/SecondLesson.css';

const SecondLesson = () => {
    return (
        <div className="second-lessons-page">
            <div className="lesson-overview">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Téma: Práca so súbormi v OS UNIX/Linux</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="section-title">Kľúčové slová</td>
                            <td>Súborový systém OS UNIX/Linux, súbory, práca so súbormi, iuzol</td>
                        </tr>
                        <tr>
                            <td className="section-title">Ciele</td>
                            <td>
                                <tr>
                                    <td className="section-title">Porozumieť:</td>
                                    <td>základné služby jadra pre prácu so súbormi
                                        Porozumieť: parametrom služieb a súvislostiam medzi
                                        službami
                                    </td>
                                </tr>
                                <tr>
                                    <td className="section-title">Aplikovať:</td>
                                    <td>služby jadra pre :
                                        <ul>
                                            <li>otvorenie, zápis, čítanie zo súboru</li>
                                            <li>získanie informácií o súbore</li>
                                            <li>nastavenie prístupových práv</li>
                                            <li>vymazanie súboru</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="section-title">Vedieť:</td>
                                    <td>využiť získané skúsenosti pri tvorbe programov</td>
                                </tr>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Odhadovaný čas</td>
                            <td>105 minút</td>
                        </tr>
                        <tr>
                            <td className="section-title"> Scenár</td>
                            <td>Sofia už vie pracovať s manuálovými stránkami a vie už odchytiť
                                chybové návratové hodnoty služieb jadra svojho programu. Sofia
                                potrebuje pre základnú prácu v OS UNIX/Linux a pre tvorbu
                                programov základné poznatky o službách jadra pre prácu so
                                súbormi.
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='postup'>
                    <h2>POSTUP:</h2>
                    Táto kapitola sa zameriava na:
                    <ul>
                        <li className='terminal-command'>read(), write()</li>
                        <li className='terminal-command'>open(), close()</li>
                        <li className='terminal-command'>lseek()</li>
                        <li className='terminal-command'>dup(), dup2()</li>
                        <li className='terminal-command'>stat(), fstat(), lstat()</li>
                        <li className='terminal-command'> link(), unlink(), remove()</li>
                        <li className='terminal-command'>truncate()</li>
                    </ul>
                </div>
            </div>
            <div className='first-subtopic'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Podtéma: Služby jadra – read() a write()</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="section-title">Kľúčové slová</td>
                            <td>read(), write(), deskriptor</td>
                        </tr>
                        <tr>
                            <td className="section-title">Ciele</td>
                            <td>
                                <tr>
                                    <td className="section-title">Zapamätať si:</td>
                                    <td>
                                        syntax služieb - prečítať si manuálové stránky v Unixe/Linuxe, Linux dokumentačný
                                        projekt, zdroje na internete:
                                        <br />
                                        <a href="http://unixhelp.ed.ac.uk/" target="_blank"
                                            rel="noopener noreferrer">http://unixhelp.ed.ac.uk/</a>
                                        <br />
                                        <a href="http://linux.about.com/od/commands/l/blcmdl2_read.htm" target="_blank"
                                            rel="noopener noreferrer">http://linux.about.com/od/commands/l/blcmdl2_read.htm</a>
                                        <br />
                                        <a href="http://linux.about.com/library/cmd/blcmdl2_write.htm" target="_blank"
                                            rel="noopener noreferrer">http://linux.about.com/library/cmd/blcmdl2_write.htm</a>

                                    </td>


                                </tr>
                                <tr>
                                    <td className="section-title">Porozumieť:</td>
                                    <td>
                                        <ul>
                                            <li>argumentom služieb</li>
                                            <li>návratovým hodnotám</li>
                                            <li>pojmu kanál</li>
                                            <li>významu súvisiacich služieb (open(),
                                                create(), dup(), lseek())
                                            </li>
                                            <li>chybovým hláseniam</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="section-title">Aplikovať:</td>
                                    <td>služby read() a write() pri práci so súbormi</td>
                                </tr>
                                <tr>
                                    <td className="section-title">Vedieť:</td>
                                    <td>využiť získané skúsenosti pri tvorbe programov</td>
                                </tr>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Odhadovaný čas</td>
                            <td>15 minút</td>
                        </tr>
                        <tr>
                            <td className="section-title"> Scenár</td>
                            <td>Sofia má za úlohu načítať a upraviť súbor v jej adresári. Zistila, že
                                pre vyriešenie tejto úlohy jej pomôžu služby read()a write().
                                Aby však ich mohla využiť, potrebuje sa ich naučiť používať. .
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h2>POSTUP:</h2>
                <h4>KROK1 - naučiť sa syntax a sémantiku služby jadra pre vstup/výstup:</h4>
                <p>Všetky vstupy a výstupy sa realizujú prostredníctvom funkcií: read()a write():</p>
                <p style={{ textDecoration: 'underline' }}>Syntax:</p>
                <pre>{`
                    #include <unistd.h>
                    read(int fd, char *buf, size_t count);
                    write(int fd, const char *buf, size_t count);
                    `}

                </pre>
                <p><p style={{ textDecoration: 'underline' }}>Semantika:</p>
                    <ul>
                        <li><strong>read()</strong> načíta <strong>count</strong> bajtov z kanálu fd do vyrovnávacej
                            pamäte buf a vráti počet
                            načítaných bajtov; vráti 0, keď už predtým dosiahla koniec súboru alebo -1 pri
                            chybe
                        </li>
                        <li><strong>write()</strong>zapíše <strong>count</strong> bajtov do kanálu fd z vyrovnávacej
                            pamäte buf a vráti počet
                            zapísaných bajtov, alebo -1 pri chybe
                        </li>
                    </ul>
                </p>
                <h4>KROK2 - pochopiť parametre služieb: </h4>
                <p>Pre obidve služby je prvým argumentom deskriptor súboru
                    . Druhý argument je buffer
                    ,
                    do ktorého budú dáta zapisované, alebo budú z neho čítané. Tretí argument udáva počet
                    slabík, ktoré budú prenesené.
                </p>
                <h4>KROK3 – aplikovanie služieb v programe:</h4>
                <p><strong>1. program </strong>- Nasledujúci program otvorí súbor s názvom subor1, načíta z neho 20
                    znakov, vypíše ich na štandardný výstup a súbor zatvorí. </p>
                <pre>
                    {
                        `
#include <fcntl.h>

int main(int argc, char **argv)
{
    int des; //deskriptor otvoreneho suboru
    int i;
    char buf; //buffer, do ktoreho nacitavame
    des=open("subor1",O_RDONLY); //otvorime subor
    for(i=0;i<20;i++)
    {
        read(des,&buf,1); //nacitame z neho 20 znakov
        write(1,&buf,1); //a vypiseme na standardny vystup
    }
    close(des); //subor znova zatvorime
    return 0;
}
                        `
                    }
                </pre>
                <p>Príklad skompilujeme <i>gcc</i> <b>sub1.c</b> a spustime <b>./a.out</b>
                    <br />
                    <br />
                    Každé volanie služby <i>read()</i> vráti počet bytov, ktoré boli skutočne systémom
                    prenesené. Ak je počet prenesených bajtov nižší, ako je zadaná (požadovaná) hodnota
                    uvedená vo volaní služby, <u>je to príznakom konca súboru</u>. Pri zápise službou <i>write()</i> je
                    vrátená hodnota rovná počtu skutočne zapísaných bajtov. Ak je hodnota rôzna od
                    zadanej hodnoty uvedenej vo volaní služby, je to znamenie chyby (zvyčajne
                    presiahnutie určitých nastavených limitov).
                    <br />
                    <br />
                    <b>2. program</b> - Napíšeme jednoduchý program, ktorý kopíruje dáta zo štandardného
                    vstupu na štandardný výstup. Program sa ukončí stlačením kombinácie kláves Ctrl+C.
                    <pre>
                        {
                            `
main () /*kopíruje vstup na výstup*/
{
    char buf;
    int n;
    while ((n = read(0,&buf,1)) > 0) //citanie zo standardneho vstupu
    write(1,&buf,1); //zapisanie na standardny vystup
    return 0;
} 

                            `
                        }
                    </pre>
                    Príklad kompilácie gcc -o <b>sub2 sub2.c</b> a spustenie programu <b>./sub2</b>
                    <br />
                    Podrobnejšie informácie o službách write() a read() si môžete pozrieť
                    v <b>man 2 read</b> a <b>man 2 write.</b>
                </p>


            </div>
            <div className='second-subtopic'>
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
                                <tr>
                                    <td className="section-title">Zapamätať si:</td>
                                    <td>
                                        syntax služieb - prečítať si manuálové stránky
                                        v Unixe/Linuxe, Linux dokumentačný projekt,
                                        zdroje na internete:
                                        <br />
                                        <a href="http://unixhelp.ed.ac.uk/" target="_blank"
                                            rel="noopener noreferrer">http://unixhelp.ed.ac.uk/</a>
                                        <br />
                                        <a href="http://www.ee.surrey.ac.uk/Teaching/Unix/" target="_blank"
                                            rel="noopener noreferrer">http://www.ee.surrey.ac.uk/Teaching/Unix/</a>
                                        <br />
                                        <a href="http://linux.about.com/od/commands/l/blcmdl2_open.htm" target="_blank"
                                            rel="noopener noreferrer">http://linux.about.com/od/commands/l/blcmdl2_ope
                                            n.htm</a>
                                        <br />
                                        <a href="http://linux.about.com/library/cmd/blcmdl2_close.htm" target="_blank"
                                            rel="noopener noreferrer">http://linux.about.com/library/cmd/blcmdl2_close.htm</a>

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
                                    <td>služby <i>open()</i> a <i>close()</i>  pri práci so súbormi</td>
                                </tr>
                                <tr>
                                    <td className="section-title">Vedieť:</td>
                                    <td>využiť získané skúsenosti pri tvorbe programov</td>
                                </tr>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Odhadovaný čas</td>
                            <td>20 minút</td>
                        </tr>
                        <tr>
                            <td className="section-title"> Scenár</td>
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
                <p>Pomocou služba jadra <i>open()</i> získame deskriptor súboru pre čítanie alebo zápis, resp.
                    môžeme vytvoriť nový súbor. </p>
                <p style={{ textDecoration: 'underline' }}>Syntax:</p>
                <pre>{`
                    #include <sys/types.h>
                    #include <sys/stat.h>
                    #include <fcntl.h>
                    int open(char *pathname, int flags, mode_t mode) 
                    `}

                </pre>
                <p><p style={{ textDecoration: 'underline' }}>Semantika:</p>
                    <ul>
                        <li><i>open() </i> vracia - deskriptor súboru alebo -1, pri chybe
                        </li>
                    </ul>
                    <h4>KROK2 - pochopiť parametre služby:</h4>
                    Služba <i>open()</i> otvorí súbor uvedený v parametri <i>pathname</i> pre čítanie alebo zápis,
                    podľa toho, ako je to špecifikované argumentom <i>flags</i> a akú návratovú hodnotu vráti
                    deskriptor pre otvorený súbor.
                </p>
            </div>

        </div>

    );
};

export default SecondLesson;