import { dividerClasses } from '@mui/material';
import React from 'react';
import '../../../styles/Lessons/SecondLesson.css'

const SixthSubtopic =  ({ onComplete, completed }) => {
    return (
        <div className='sixth-subtopic' id="section-6">
            <table className={'info-table'}>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: <strong>Služby jadra link(),unlink() a remove()</strong></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><i>link(), unlink(), remove()</i></td>
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
                                <br/>
                                <a href="http://linux.about.com/library/cmd/blcmdl2_link.htm" target="_blank"
                                   rel="noopener noreferrer">:
                                    http://linux.about.com/library/cmd/blcmdl2_link.htm
                                </a>
                                <br/>
                                <a href="http://linux.about.com/library/cmd/blcmdl2_unlink.htm" target="_blank"
                                   rel="noopener noreferrer">:
                                    http://linux.about.com/library/cmd/blcmdl2_unlink.htm
                                </a>
                                <br/>
                                <a href="http://linux.about.com/od/commands/l/blcmdl3_remove.htm" target="_blank"
                                   rel="noopener noreferrer">:
                                    http://linux.about.com/od/commands/l/blcmdl3_remove.htm
                                </a>

                            </td>


                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <ul>
                                    <li>pojmu link</li>
                                    <li>funkciám jednotlivých parametrov</li>
                                    <li>chybovým hláseniam</li>
                                </ul>

                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>služby <i>link(),unlink(),remove()</i> pri práci so
                                súbormi a adresármi
                            </td>
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
                    <td>Aby Sofia mohla vytvoriť odkaz na súbor a vymazať súbor. Musí
                        porozumieť pojmu link a naučiť sa používať služby <i>
                            link(),
                            unlink() a remove()
                        </i>.
                    </td>
                </tr>
                </tbody>
            </table>
            <h2>POSTUP:</h2>
            <p>
                <h4>KROK1 – naučiť sa syntax a sémantiku služieb jadra <i>link() a unlink()</i>:</h4>
                Na jeden fyzický súbor (t.j. na rovnaký i-node) môže odkazovať viac adresárových
                položiek. Tieto sa vytvoria pomocou tzv. pevného linku službou jadra <i>link()</i>. Pre
                zrušenie odkazov slúži služba jadra <i>unlink()</i>.
                <p style={{ textDecoration: 'underline' }}>Syntax:</p>
                <pre>
                    {`
#include <unistd.h>
int link (const char *existingpath, const char newpath);
int unlink (const char *pathname); 

`}
                </pre>
                <p><p style={{ textDecoration: 'underline' }}>Semantika:</p>
                    <ul>
                        <li><i>link()</i> a <i>unlink()</i> vracia: 0 keď OK alebo -1, pri chybe</li>
                    </ul>
                </p>
                <h4>KROK2 – pochopiť parametre služieb:</h4>
                Služba jadra <i>link()</i> vytvorí novú položku adresára <i>newpath</i>, ktorá odkazuje na
                existujúcu položku <i>existingpath</i>. Iba superuživateľ môže vykonať link na adresár. Ak
                už <i>newpath</i> existuje, je vrátená chyba. Vytvorí sa len posledná časť <i>newpath</i>, zbytok
                cesty už musí existovať.
                Služba jadra <i>unlink()</i> odstráni položku adresára a dekrementuje linku podľa <i>pathname</i>.
                Ak existujú na súbor aj iný link, dáta v súbore ostanú prístupné cez ostatné linky. Ak sa
                vyskytne pri volaní chyba, súbor sa nezmení. K odstráneniu súboru však musíme mať
                práva zápisu a vykonávania v adresári, kde sa daný súbor nachádza.
                <br /><br />
                Pre podrobnejšie informácie zadaj príkaz <strong>man 2 link a man 2 unlink</strong>.
                <h4>KROK3 – aplikovanie služieb v programe:</h4>
                <strong>1. program</strong> – Nasledujúci program využíva služby jadra <i>link() a unlink()</i> pre
                premenovanie súboru. Program najprv vytvorí synonymum medzi pôvodným a novým
                súborom a potom pôvodný súbor zruší prostredníctvom služby jadra <i>unlink().</i>
                <pre>
                    {
                        `
#include <stdio.h>
main(int argc, char **argv)
{
    printf("staremeno:%s novemeno:%s",argv[1],argv[2]);
    if (argc > 3 || argc < 3){ //kontrola poctu argumentov
        printf("Chybny pocet argumentov!");
    }
    else if (link(argv[1],argv[2]) == -1){ //vytvorenie linku
        perror("link()");
    } //existujúci subor
    else if (unlink(argv[1]) == -1){ //odstranenie suboru
        perror("unlink()");
    }
    printf("done");
    return(0);
}                            
                            `
                    }
                </pre>
                <strong>2. program</strong> - Nasledujúci príklad otvorí súbor a potom ho „odpojí“. Program pred
                ukončením počká 15 sekúnd.
                <pre>
                    {
                        `
#include <stdio.h>
#include <fcntl.h>
int des;
int main(void)
{ //otvorime subor
    if((des=open("tempfile", O_RDWR | O_CREAT)) < 0){
        perror("open()");
    }
    if(unlink("tempfile") < 0){ //unlinkneme ho
        perror("unlink()");
    }
    printf("file unlinked");
    sleep(15); //pockame 15 sec
    close(des);
    printf("done");
    return(0); //koniec programu
}
                            `
                    }
                </pre>
                <h4>KROK4 – využitie služby <i>unlink()</i>:</h4>
                Služba <i>unlink()</i> je často využívaná programami na to, aby sa uistili, že dočasný súbor
                (temporary file) nebude ponechaný v pamäti po tom, ako program skončí. Program
                otvorí/vytvorí súbor volaniami <i>open()/create()</i> a hneď volá službu <i>unlink()</i>. Súbor
                nie je vymazaný pretože je otvorený. Až po tom, ako proces zatvorí súbor, je súbor
                vymazaný.
                <br /><br />
                Ak je <i>pathname</i> symbolický link, <i>unlink()</i> odstráni symbolický link, nie súbor, na
                ktorý link odkazuje. Neexistuje služba na odstránenie súboru odkazovaného
                symbolickým linkom odovzdaním mena linku.
                <h4>KROK5 – naučiť sa syntax a sémantiku služby <i>remove():</i> </h4>
                Odstrániť súbor alebo adresár tiež môžeme funkciou <i>remove(3)</i>. Pre súbory je volanie
                <i>remove()</i> identické <i>unlink()</i>, pre adresáre je <i>remove()</i> identické <i>rmdir()</i>.
                <p style={{ textDecoration: 'underline' }}>Syntax:</p>
                <pre>
                    {`
#include <stdio.h>
int remove(const char *pathname); 

`}
                </pre>
                <p><p style={{ textDecoration: 'underline' }}>Semantika:</p>
                    <ul>
                        <li>Návratové hodnoty: 0 ak OK alebo -1, ak nastala chyba. </li>
                    </ul>
                </p>
                Služba jadra <i>remove()</i> odstráni súbor, ktorý je špecifikovaný parametrom <i>pathname</i>
                <br /><br />
                Pre podrobnejšie informácie zadaj príkaz <strong>man 3 remove</strong>.
            </p>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default SixthSubtopic;
