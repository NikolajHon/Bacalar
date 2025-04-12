import { dividerClasses } from '@mui/material';
import React from 'react';
import '../../../styles/Lessons/SecondLesson.css'

const FifthSubtopic = ({ onComplete, completed }) => {
    return (
        <div className='fifth-subtopic' id="section-5">
            <table className={'info-table'}>
                <thead>
                    <tr>
                        <th colSpan="2">Podtéma: <strong>Služby jadra – stat(), fstat(), lstat()</strong></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="section-title">Kľúčové slová</td>
                        <td><i>stat(), fstat(), lstat()</i>, i-uzol</td>
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
                                    <a href="https://linux.about.com/library/cmd/blcmdl2_stat.ht " target="_blank"
                                        rel="noopener noreferrer">:
                                        https://linux.about.com/library/cmd/blcmdl2_stat.ht
                                    </a>

                                </td>


                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>
                                    <ul>
                                        <li>štruktúre i-uzla</li>
                                        <li>funkciám jednotlivých parametrov </li>
                                        <li>významu súvisiacich služieb
                                            ( <i>create(), dup(), open()</i> ) </li>
                                        <li>chybovým hláseniam </li>

                                    </ul>

                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>služby <i>stat(), fstat(), lstat()</i> pre získanie
                                    informácií o stave súboru</td>
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
                        <td>15 minút</td>
                    </tr>
                    <tr>
                        <td className="section-title"> Scenár</td>
                        <td>Sofia potrebuje získať informácie o súbore, ktorý je uložený v jej
                            adresári. Zistila, že na to jej poslúžia služby jadra <i>stat(), lstat()</i>
                            alebo <i>fstat()</i>. Teraz Sofia potrebuje rozpoznať účel použitia
                            týchto služieb.
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2>POSTUP:</h2>
            <p>
                <h4>KROK1 - naučiť sa syntax a sémantiku služieb jadra <i>stat(), fstat(), lstat()</i>:</h4>
                Tieto služby jadra využívame na získanie informácií o súbore a adresári.
                <br />
                <p style={{ textDecoration: 'underline' }}>Syntax:</p>
                <pre>
                    {`
#include <sys/types.h>
#include <sys/stat.h>
int stat (const char *pathname, struct stat *buf);
int fstat (int filedes, struct stat *buf);
int lstat (const char *pathname, struct stat *buf); 

`}
                </pre>
                <p><p style={{ textDecoration: 'underline' }}>Semantika:</p>
                    <ul>
                        <li>Všetky tri služby vracajú: 0 keď OK alebo -1, pri chybe</li>
                    </ul>
                </p>
                <h4>KROK2 – pochopiť parametre služieb:</h4>
                Prvý argument <i>pathname</i> alebo <i>filedes</i> špecifikuje súbor. Druhý argument je
                ukazovateľ na dátovú štruktúru, ktorú služba vyplní. Služba jadra <i>stat()</i> získa
                informácie o súbore podľa špecifikovaného mena súboru, <i>fstat()</i> získa informácie o
                už otvoreným súboru, <i>lstat()</i> je podobná <i>stat()</i>, ale keď ide o symbolický link4,
                získa informácie o tomto linku, a nie o súbore, na ktorý link ukazuje.
                <br />
                Pre podrobnejšie informácie zadaj príkaz <strong>man 2 stat</strong>.
                <h4>KROK3 – pochopiť štruktúru stat: </h4>
                Všetky tieto služby jadra, pri ich úspešnom volaní, vyplnia štruktúru <i>stat</i>, ktorej obsah
                je nasledujúci:
                <pre>
                    {
                        `
struct stat{
    mode_t st_mode; /* typ súboru & prístupové práva */
    ino_t st_ino; /* číslo i-nodu */
    dev_t st_dev; /* číslo zariadenia (file system) */
    dev_t st_rdev; /* číslo zariadenia pre špec. súbory */
    nlink_t st_nlink; /* počet odkazov (linkù) */
    uid_t st_uid; /* user ID */
    gid_t st_gid; /* group ID */
    off_t st_size; /* veľkosť v bajtoch */
    time_t st_atime; /* čas posledného prístupu */
    time_t st_mtime; /* čas poslednej modifikácie */
    time_t st_ctime; /* čas poslednej zmeny súboru */
    long st_blksize; /* najlepšia veľkosť I/O bloku */
    long st_blocks; /* počet alokovaných 512B blokov */
 };                             
                            `
                    }
                </pre>
                <h4>KROK4 – aplikovanie služieb v programe: </h4>
                Uvedený príklad zobrazí informácie o type súborov zadaných z príkazového riadku.
                <pre>
                    {
                        `
#include <sys/types.h>
#include <stdio.h>
#include <sys/stat.h>
int main(int argc, char *argv[])
{
    int i;
    struct stat buf;
    char *ptr;
    for (i = 1; i < argc; i++) {
    printf("%s: ", argv[i]); //vypis
    if (lstat(argv[i], &buf) < 0) {perror("lstat()");continue;}
    //urcenie typu suboru
    if (S_ISREG(buf.st_mode)) ptr = "regular";
    else if (S_ISDIR(buf.st_mode)) ptr = "directory";
    else if (S_ISCHR(buf.st_mode)) ptr = "character special";
    else if (S_ISBLK(buf.st_mode)) ptr = "block special";
    else if (S_ISFIFO(buf.st_mode)) ptr = "fifo";
    else if (S_ISLNK(buf.st_mode)) ptr = "symbolic link";
    else if (S_ISSOCK(buf.st_mode)) ptr = "socket";
    else ptr = "** unknown mode **";
    printf("%s\n", ptr);
    }
    return(0);
} 
                            `
                    }
                </pre>
                <br />
                V položke st_mode sú uložené informácie o type súboru. Tieto informácie sú tu
                ložené ako bitový súčet (OR, čiže operátor | ) rôznych príznakov.
            </p>
            <table>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '1px solid black', textAlign: 'left', paddingBottom: '10px' }}>Typ súboru</th>
                        <th style={{ borderBottom: '1px solid black', textAlign: 'left', paddingBottom: '10px' }}>makro</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ paddingTop: '5px' }}>regulárny súbor</td>
                        <td style={{ paddingTop: '5px' }}>S_ISREG</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>adresár</td>
                        <td>S_ISDIR</td>
                    </tr>
                    <tr>
                        <td style={{ fontStyle: 'italic' }}>Obycajny subor</td>
                        <td>S_IFREG</td>
                    </tr>
                    <tr>
                        <td>znakový špeciálny súbor</td>
                        <td>S_ISCHR</td>
                    </tr>
                    <tr>
                        <td>blokový špeciálny súbor</td>
                        <td>S_ISBLK</td>
                    </tr>
                    <tr>
                        <td>FIFO</td>
                        <td>S_ISFIFO</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>symbolický link</td>
                        <td>S_ISLNK</td>
                    </tr>
                    <tr>
                        <td>soket</td>
                        <td>S_ISSOCK</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default FifthSubtopic;
