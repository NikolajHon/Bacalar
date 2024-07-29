import { dividerClasses } from '@mui/material';
import React from 'react';

const ThirdSubtopic = () => {
    return (
        <div className='third-subtopic'>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Podtéma: <strong>Služba jadra – lseek()</strong></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="section-title">Kľúčové slová</td>
                        <td><i>lseek()</i>, <strong>SEEK_SET, SEEK_END, SEEK_CUR</strong> </td>
                    </tr>
                    <tr>
                        <td className="section-title">Ciele</td>
                        <td>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>
                                    syntax služby - prečítať si manuálové stránky
                                    v Unixe/Linuxe, Linux dokumentačný projekt,
                                    zdroje na internete:
                                    <br />
                                    <a href="http://linux.about.com/library/cmd/blcmdl2_lseek.htm " target="_blank"
                                        rel="noopener noreferrer">:
                                        http://linux.about.com/library/cmd/blcmdl2_lseek.htm
                                    </a>

                                </td>


                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>
                                    <ul>
                                        <li>pojmom:
                                            <ul style={{ listStyleType: 'none' }}>
                                                <li>- priamy prístup</li>
                                                <li>- ukazovateľ súboru</li>
                                            </ul>
                                        </li>
                                        <li>funkciám jednotlivých parametrov</li>
                                        <li>chybovým hláseniam</li>
                                    </ul>

                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>službu lseek() pri práci so súbormi</td>
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
                        <td>Sofia napreduje v riešení svojej úlohy a chce sa naučiť efektívnejšie
                            pracovať so súbormi v OS UNIX/LINUX. Zistila, že k tomu by jej
                            mohla pomôcť služba jadra <i>lseek()</i>, ktorou môže prechádzať súbor
                            a nastavovať pozíciu v súbore, preto sa ju chce naučiť používať.
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>
                <h2>POSTUP: </h2>
                <i>Ukazovateľ aktuálnej pozície v súbore</i> je miesto v súbore (konkrétny bajt), na ktorom sa
                bude vykonávať nasledujúca operácia <i>read()</i> alebo <i>write()</i>
                <br />
                <br />
                <strong>KROK1 – naučiť sa syntax a sémantiku služby jadra <i>lseek()</i>:</strong>
                Bežný spôsob práce so súborom je sekvenčný (ukazovateľ aktuálnej pozície v súbore sa
                priebežne zvyšuje). V prípade potreby je možné súbory čítať alebo do nich zapisovať na
                ľubovoľnej pozícii. Služba jadra <i>lseek()</i> umožňuje posunúť sa na ľubovoľné miesto v
                súbore bez toho, aby bolo nutné súbor čítať, alebo do neho zapisovať.
                <br />
                <p style={{ textDecoration: 'underline' }}>Syntax:</p>
                <pre>
                    {`
#include <sys/types.h>
#include <unistd.h>
long lseek (int fd,long offset,int origin); 
`}
                </pre>
                <p><p style={{ textDecoration: 'underline' }}>Semantika:</p>
                    <ul>
                        <li><i>lseek()</i> vracia: nový offset keď je všetko OK alebo -1, pri chybe</li>
                    </ul>
                </p>
                <h4>KROK2 - pochopiť parametre služby:</h4>
                Služba <i>lseek()</i> nastaví pozíciu v súbore (určeného deskriptorom súboru <i>fd</i>), na miesto
                určené posunutím <i>offset</i>, vzhľadom na pozíciu určenú argumentom <i>origin</i> môžeme
                špecifikovať nasledujúce pozície:
                <table className="command-table">
                    <tbody>
                        <tr>
                            <td>SEEK_SET  </td>
                            <td>pozícia kurzoru s hodnotou začiatku súboru</td>
                        </tr>
                        <tr>
                            <td>SEEK_CUR</td>
                            <td>aktuálna pozícia kurzoru v súbore</td>
                        </tr>
                        <tr>
                            <td>SEEK_END</td>
                            <td>pozícia kurzoru v súbore s hodnotou konca súboru </td>
                        </tr>

                    </tbody>
                </table>
                <br />
                <br />
                Nasledujúce čítanie alebo zápis do súboru sa uskutoční na tejto pozícii. Argument
                <i>offset</i> je typu long, argumenty <i>fd</i> a <i>origin</i> sú typu int. Argument <i>origin</i> môže mať
                hodnoty 0, 1 a 2, ktoré určujú, že posunutie je merané od počiatku, od práve aktuálnej
                pozície v súbore alebo od konca súboru.
                Pozícia je typu long a preto je nevyhnutné v prípade uvedenia konštanty ju špecifikovať
                ako konštantu typu long (L za hodnotou konštanty) alebo pretypovať.
                <br /><br />
                Pre podrobnejšie informácie zadaj príkaz <strong>man 2 lseek</strong>
                <br />
                Napr. nastavenie na koniec súboru (append) sa uskutoční nasledovne :
                <i>lseek(fd,0L,SEEK_END);</i>
                Nastavenie na začiatok súboru (rewind):
                <i>lseek(fd,0L,SEEK_SET);</i>
                Poznamenajme, že argument 0L je možné písať v tvare (long)0.
                <br /><br />
                <h4>KROK3 – aplikovanie služby v programe: </h4>
                Nasledujúce príklady ukazujú použitie služby jadra <i>lseek()</i>.
                <strong>1. program</strong> – Zisti dĺžku súboru, ktorého meno je zadané z klávesnice a vypíše ju na
                štandardný výstup
                <pre>
                    {
                        `
#include <stdio.h>
#include <fcntl.h>
int main(void)
{
    int handle;
    char meno[80];
    long l;
    printf("zadaj meno suboru :");
    scanf("%s", meno); //nacitanie nazvu subora z klavesnice
    //otvorenie suboru iba na citanie
    if ((handle = open(meno, O_RDONLY)) == -1){
        perror("open()");
        return(handle);
    } //nastavenie pozicie na koniec suboru
    if ((l = lseek(handle, 0L, SEEK_END)) == -1){
        perror("lseek()");
        close(handle); //chyba pri nastavovani pozicie
    } //uzatvorenie suboru
    else {
        printf("Subor <%s> je dlhy %ld bajtov.", meno, l);
    } //vypisanie dlzky suboru
    close(handle); //uzatvorenie suboru
    return(0);
} 
                            `
                    }
                </pre>
                <br />
                <br />
                <strong>2. program</strong> - Nasledujúci príklad vypíše znak nachádzajúci sa na zadanej pozícii
                v súbore. Názov súboru a pozícia v súbore sú zadané z príkazového riadku.
                <pre>
                    {
                        `
#include <stdio.h>
#include <fcntl.h>
main(int argc, char *argv[])
{
    int fd;
    off_t offset;
    char *name,
    buf[5];
    long poz;
    if (argc != 3){
        printf("Chybny pocet argumentov");
    } //kontrola argumentov
    else{
        name = argv[1]; //nacitanie argumentov
        offset = atoi(argv[2]); //pretypovanie argumentu
        if ((fd=open(name, O_RDONLY)) == -1){ //otvorenie suboru
            perror("open()");
        }
        if((poz=lseek(fd,0L,SEEK_END))<offset){
            printf("Subor neobsahuje tolko znakov");
        } //kontrola konca suboru
        if(lseek(fd, offset, SEEK_SET)==-1){
            perror("lseek()");
        } //nastavenie pozicie v subore
        else {
            read(fd, buf, 1); //nacitanie znaku
            printf("Vypis znaku zo suboru:%c", buf[0]);
        }
    }
    return (0);
} 
                            `
                    }
                </pre>
            </p>
        </div>
    );
};

export default ThirdSubtopic;
