import React from 'react';

const FirstSubtopic = () => {
    return (
        <div className='first-subtopic' id="section-1">
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
    );
};

export default FirstSubtopic;
