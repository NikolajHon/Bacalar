import { dividerClasses } from '@mui/material';
import React from 'react';

const FourthSubtopic =  ({ onComplete, completed }) => {
    return (
        <div className='fourth-subtopic' id="section-4">
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Podtéma: <strong>Služby jadra – dup(), dup2()</strong></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="section-title">Kľúčové slová</td>
                        <td><i>dup(), dup2()</i>, deskriptor </td>
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
                                    <a href="https://linux.about.com/library/cmd/blcmdl2_dup.ht " target="_blank"
                                        rel="noopener noreferrer">:
                                        https://linux.about.com/library/cmd/blcmdl2_dup.ht
                                    </a>

                                </td>


                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>
                                    <ul>
                                        <li>účelu jednotlivých parametrov </li>
                                        <li>chybovým hláseniam </li>
                                    </ul>

                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>služby <i>dup()</i> a <i>dup2()</i> pri práci s deskriptormi </td>
                            </tr>
                            <tr>
                                <td className="section-title">Vedieť:</td>
                                <td>využiť získané skúsenosti pri tvorbe programov
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
                        <td>Sofia sa chce naučiť použiť obyčajný súbor ako štandardný vstup
                            alebo výstup. Zistila, že pre riešenie tohto problému jej pomôžu
                            služby jadra <i>dup()</i> a <i>dup2()</i>. Tieto služby slúžia na duplikáciu
                            deskriptora otvoreného súboru.
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2>POSTUP: </h2>
            <h4>KROK1 – naučiť sa syntax a sémantiku služieb dup() a dup2(): </h4>
            <p>
                Ako štandardný vstup alebo výstup môže slúžiť aj obyčajný súbor. Na tento účel
                môžeme využiť službu jadra dup(). Základný princíp činnosti je v tom, že dup()
                zduplikuje deskriptor, ktorý dostane ako argument a duplikát uloží na prvú voľnú
                pozíciu v tabuľke deskriptorov.
                <br />
                <p style={{ textDecoration: 'underline' }}>Syntax:</p>
                <pre>
                    {`
#include <unistd.h>
int dup (int oldfd);
int dup2 (int oldfd, int newfd); 
`}
                </pre>
                <p><p style={{ textDecoration: 'underline' }}>Semantika:</p>
                    <ul>
                        <li>Vracia: nový deskriptor alebo -1, pri chybe</li>
                    </ul>
                </p>
                <h4>KROK2 – pochopiť parametre služieb:</h4>
                Argument <i>oldfd</i> je deskriptor otvoreného súboru pre službu<i> dup()</i>aj pre službu
                <i>dup2()</i>. Argumentom <i>newfd</i> služba <i>dup2()</i> špecifikuje hodnotu nového deskriptora. Ak
                je <i>newfd</i> momentálne otvorený, je najprv zatvorený. Ak sa <i>oldfd</i> rovná <i>newfd</i>, potom
                <i>dup2()</i> vráti <i>newfd</i> bez jeho zatvorenia. Potom je nový deskriptor vrátený ako hodnota
                služieb zdieľajúcich rovnaké miesto v tabuľke súborov, ako argument <i>oldfd</i>.
                <br /><br />
                Pre podrobnejšie informácie zadaj príkaz <strong>man 2 dup a man 2 dup2</strong>.
                <h4>KROK 3 – aplikovanie služieb v programe:</h4>
                Zduplikovanie deskriptoru neznamená, že sa znova otvorí ten istý súbor. Súbor ostane
                otvorený iba raz. Asi najdôležitejším dôsledkom je, že zostane iba jediný ukazovateľ na
                aktuálnu pozíciu v súbore. Nasledujúce dva príklady by to mohli trochu objasniť:
                <pre>
                    {
                        `
#include <fcntl.h>
#include <sys/stat.h>
int main(int argc, char **argv)
{
    int des1;
    int des2;
    //vytvorime / otvorime subor
    des1=open("subor1" , O_CREAT | O_WRONLY , S_IRUSR | S_IWUSR);

    des2=open("subor1" , O_WRONLY); //druhykrat ho netreba vytvorit
    //staci otvorit
    write(des1,"Toto v subore nebude vobec\n",27); //zapiseme do neho
    write(des2,"Toto bude v subore len raz\n",27); //a este raz
    close(des1); //zatvorime subor
    close(des2); //a znova zatvorime
    return 0;
} 
                            `
                    }
                </pre>
                <br />
                Výsledok bude, že v súbore bude zapísaný iba druhý text. Keďže pri každom z
                otvorených súboroch mame nezávislé ukazovatele na pozíciu v súbore a oba po otvorení
                súboru ukazovali na začiatok súboru, prepísal sa prvý text druhým. Keďže bol súbor
                dvakrát otvorený, treba ho aj dvakrát zatvoriť. V prípade zduplikovania deskriptora:
                <pre>
                    {
                        `
#include <fcntl.h>
#include <sys/stat.h>
int main(int argc, char **argv)
{
    int des1;
    int des2;
    des1=open("subor1" , O_CREAT | O_WRONLY , S_IRUSR | S_IWUSR);
    //vytvorime / otvorime subor
    des2=dup(des1); //zduplikujeme deskriptor
    write(des1,"Toto bude v subore\n",19); //zapiseme do neho
    write(des2,"Toto tam bude tiez\n",19); //a este raz
    close(des1); //zatvorime prvy deskriptor
    close(des2); //a aj druhy deskriptor
    return 0;
} 
                            `
                    }
                </pre>
                V súbore budú zapísané obidva texty, keďže ukazovateľ na aktuálnu pozíciu v súbore je
                len jeden a ten sa po prvom zápise posunie. Súbor sa zatvorí, ak sa zatvorí posledný
                deskriptor na neho
                <h4>KROK4 – naučiť sa ďalší spôsob duplikácie:</h4>
                Ďalším spôsobom duplikovania deskriptora súboru je služba <i>fcntl()</i>.
                V skutočnosti :
                <pre>{`           dup(int filedes);`}</pre>
                je ekvivalentný s
                <pre>{`           fcntl(int filedes, F_DUPFD, 0);`}</pre>
                Podobne:
                <pre>{`           dup2(int filedes, int filedes2);`}</pre>
                je ekvivalentný s
                <pre>{`   
            close(int filedes2);
            fcntl(int filedes, F_DUPFD, int filedes2); 
                    `}</pre>

            </p>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default FourthSubtopic;
