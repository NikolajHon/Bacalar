import React from 'react';

const FourthSubtopic = ({ onComplete, completed }) => {
    return (
        <div className='fourth-subtopic' id="section-4">
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Podtéma: <strong>Funkcie pre prácu s adresármi , unix </strong> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="section-title">Kľúčové slová</td>
                        <td><i>
                            opendir(), closedir(),readdir(), telldir(), seekdir(),
                            rewindir(),dirent
                        </i>, unix</td>
                    </tr>
                    <tr>
                        <td className="section-title">Ciele</td>
                        <td>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>
                                    funkcie pre prácu s adresármi:
                                    <ul>
                                        <li>prečítať si manuálové stránky v Unixe
                                            /Linuxe, Linux dokumentačný projekt</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>
                                    parametrom funkcií
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>funkcie <i>
                                    opendir(), closedir(),  readdir(),
                                    telldir(), seekdir(), rewindir()
                                </i> pri práci
                                    s adresármi </td>
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
                        <td>Sofia potrebuje vypísať obsah svojho adresára, preto použije príkaz
                            ls. Pri použití príkazu nastane chyba. Sofia vie, že obsah adresára
                            sa dá zistiť aj bez použitia príkazu ls a to použitím funkcií pre
                            čítanie a prácu s adresármi.
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>

            Pre získanie základných informácii o súboroch musíme vedieť, aké súbory sa v
            adresároch nachádzajú. Na to nám slúžia nižšie uvedené funkcie, ktoré sú deklarované
            v hlavičkovom súbore <i>dirent.h</i>. Poznamenajme, že v tomto prípade nejde priamo
            o služby jadra, ale o nadstavbové funkcie, ktoré služby jadra využívajú vo svojom tele.
            <br /><br />
            <strong>KROK1 – oboznámiť sa s adresárovými štruktúrami: </strong>
            Adresárové funkcie sú deklarovane v hlavičkovom súbore <i>dirent.h</i>. Ako základ pre
            manipuláciu s adresárom využívajú štruktúru <i>DIR</i>. Ukazovateľ na túto štruktúru sa
            nazýva adresárový prúd, funguje podobným spôsobom ako súborový prúd (<i>FILE *</i>)
            Sofia verzia 2016
            v prípade manipulácie s bežnými súbormi. Vlastné adresárové záznamy sú vrátené
            v štruktúre <i>dirent</i>, ktoré sú taktiež deklarované v súbore <i>dirent.h</i>.  <br /><br />
            Štruktúra <i>dirent</i>, špecifikujúca adresárové záznamy, obsahuje nasledujúce položky:
            <pre>{`
        struct dirent{ 
            int_t  d_ino;             /* číslo i-uzla      */ 
            off_t  d_off;             /* offset na nasledujúci dirent      */ 
            unsigned short d_reclen;  /* veľkosť súboru    */ 
            unsigned char d_type;     /* typ súboru        */ 
            char   d_name[];          /* názov súboru      */
        }; 
                    `}
            </pre>
            <br />
            <strong>KROK2 – naučiť sa syntax a sémantiku funkcií pre prácu s adresármi:</strong>
            <p style={{ textDecoration: 'underline' }}>Syntax:</p>
            <pre>{`
    #include <sys/types.h> 
    #include <dirent.h> 

    DIR *opendir (const char *pathname); 
                    `}
            </pre>
            <ul>
                <li>
                    Vráti: ukazovateľ na adresárový prúd <code>DIR</code> keď OK, alebo inak <code>NULL</code> pri chybe
                    <pre>
                        <code>
                            struct dirent *readdir(DIR *dp);
                        </code>
                    </pre>
                </li>
                <li>
                    Vráti: ukazovateľ na štruktúru <code>dirent</code> keď OK, inak <code>NULL</code> pri chybe alebo pri konci súboru
                    <pre>
                        <code>
                            void rewinddir(DIR *dp);
                        </code>
                    </pre>
                    <p>Nevracia žiadnu hodnotu</p>
                    <pre>
                        <code>
                            int closedir(DIR *dp);
                        </code>
                    </pre>
                </li>
                <li>
                    Vráti: 0 keď OK alebo -1 pri chybe
                </li>
            </ul>
            <br />
            <strong>KROK3 – pochopiť parametre funkcií </strong> <br />
            Funkcia <i>opendir()</i> nám otvorí adresár uvedený v parametri <i>pathname</i>. Pomocou
            funkcie <i>readdir()</i> prečítame obsah adresára, ktorý je prístupný cez adresárový prúd
            DIR *dp (dp – deskriptor adresára), pričom nám funkcia readdir() vracia ukazovateľ
            na štruktúru <i>dirent</i>. Pri prehliadaní adresára funkciou <i>readdir()</i> nie je zaručené, že
            budú vypísané všetky súbory (a podadresáre) v danom adresári, pokiaľ súčasne
            v rovnakom adresári iné procesy vytvárajú alebo mažú súbory.
            Funkcia <i>rewinddir()</i> nám resetne pozíciu v adresárovom prúde <i>DIR *dp</i> na začiatok
            a <i>closedir()</i> zavrie adresárový prúd a uvoľní s ním združené zdroje.
            <br />
            <br />
            <strong>KROK4 – oboznámiť sa s ďalšími funkciami <i>telldir() a seekdir()</i>:</strong>
            <p style={{ textDecoration: 'underline' }}>Syntax:</p>
            <pre>{`
        #include <sys/types.h> 
        #include <dirent.h> 
        long int telldir(DIR *dirp); 
                    `}
            </pre>
            <p style={{ textDecoration: 'underline' }}>Sémantika: :</p>
            Funkcia <i>telldir()</i> vracia hodnotu, ktorá udáva aktuálnu pozíciu v adresárovom prúde.
            Môže ju potom využiť na nastavenie prehľadávania adresára od aktuálnej pozície.
            <p style={{ textDecoration: 'underline' }}>Syntax:</p>
            <pre>{`
        #include <sys/types.h> 
        #include <dirent.h> 
        void seekdir (DIR *dirp, long int loc); 
                    `}
            </pre>
            <p style={{ textDecoration: 'underline' }}>Sémantika: :</p>
            Táto funkcia nastavuje smerník na adresárovú položku adresárového prúdu <i>dirp</i>.
            Hodnota <i>loc</i>, ktorá definuje príslušnú pozíciu, by mohla byť získaná z volania funkcie
            <i>telldir()</i>. Nemá žiadnu návratovú hodnotu.
            <br /><br />
            <strong>KROK5 – aplikovanie služieb v programe: </strong> <br />
            <strong>1. program</strong> -Tento program nám vypíše obsah aktuálneho adresára.
            <pre>{`
        #include <stdio.h> 
        #include <sys/types.h> 
        #include <dirent.h> 

        int main(int argc, char **argv) 
        {  
            DIR *adresar; 
            struct dirent *subor; 
            adresar=opendir(".");                    //Otvorime si adresar 
            while ((subor=readdir(adresar))!=NULL){  //Citame kym je co citat 
                printf("%s\\n",subor->d_name);      //A vypiseme nazov suboru 
            }   
            closedir(adresar);      //A nakoniec adresar zatvorime              
        } 
                    `}
            </pre>
            <br />
            Funkcia <i>opendir()</i> otvorí adresár, ktorého názov je zadaný v programe (pripadne aj
            s cestou). V tomto prípade je to aktuálny adresár. Funkcia vráti ukazovateľ na adresárový
            prúd <i>DIR *adresar</i>, ktorý obsahuje informácie o adresári a pomocou ktorého sa
            k adresáru bude ďalej pristupovať. <br />
            Položky zapísané v adresári prečítame pomocou funkcie <i>readdir()</i>. Táto funkcia
            postupne číta položky adresára, pri každom volaní vráti nasledujúcu položku. Ak
            v adresári žiadna ďalšia položka nie je, vráti <i>NULL</i>. Položka adresára je vrátená ako
            ukazovateľ na štruktúru <i>dirent</i>. Štruktúra <i>dirent</i> obsahuje informácie o súbore, ktoré
            sú uložené v adresári. Pre nás bude zaujímavá iba položka <i>d_name</i>, čo je reťazec
            obsahujúci názov súboru, ku ktorému položka patri. <br /> <br />
            <strong>2. program</strong> - Tento program prehľadá adresár zadaný z príkazového riadku a pomocou
            funkcii <i>seekdir()</i> a <i>telldir()</i> sa následne vrátime na položku  adresára zadanú ako
            argument programu.
            <pre>{`
        #include <stdio.h>
        #include <stdlib.h>
        #include <dirent.h>
        #include <string.h>
        #include <unistd.h>

        int main(int argc, char **argv) 
        {  
            off_t offset; 
            DIR *pDir; 
            struct dirent *pDirent; 
            int of = 0, i = 1; 

            if (argc == 3) { // Kontrola argumentov
                of = atoi(argv[2]); 
                printf("Otvarany Adresar: %s\\n", argv[1]); 

                if ((pDir = opendir(argv[1])) == NULL) { // Otvorenie adresara
                    perror("opendir()");  
                    exit(0); 
                } 

                while ((pDirent = readdir(pDir)) != NULL) { // Citanie poloziek adresara
                    if (strcmp(".", pDirent->d_name) == 0 || strcmp("..", pDirent->d_name) == 0)
                        continue; // Ignoruje . a .. (aktualny a domovský adresar)
                        
                    printf("%d. polozka: %s/\\n", i, pDirent->d_name); 
                    i++; 

                    if (i == of) { 
                        offset = telldir(pDir); // Nastavenie offsetu na polozku
                        printf("Offset(telldir) pre %d-tu polozku je %ld,\\n", i, offset);
                    } 
                } 

                printf("Pouzitim seekdir sa vrati na %d. polozku\\n", of); 
                seekdir(pDir, offset); // Vratenie na polozku offsetom
                pDirent = readdir(pDir); // Nacitanie polozky
                printf("%d. polozka je: %s\\n", of, pDirent->d_name); 
            } 
            else {
                printf("Chyba argument programu!\\n");
            }

            return 0; 
        }

                    `}
            </pre>
            <br />
            Príklad spustenia predchádzajúceho programu:  
            <pre>{
                ` 
        $  
        ./adres2 . 3 
        $  
                `
            }</pre>
            <p style={{ textDecoration: 'underline' }}>Takže zhrnutie postupu ako prečítať všetky položky adresára: </p>
            <ol>
                <li>Otvoriť adresár pomocou <i>opendir()</i>. </li>
                <li>Čítať položky adresára pomocou <i>readdir()</i> až kým nevráti NULL. </li>
                <li> Zatvoriť adresár pomocou <i>closedir()</i>. </li>
            </ol>
            <div className="title-box">
                <strong>ÚLOHY NA SAMOSTATNÚ PRÁCU:</strong>
            </div>
            <ul>
                <li>Vyskúšajte si prácu s adresárom  pomocou  služieb jadra <i>
                    stat(), opendir(),
                    readdir(), closedir()
                </i> a pod. </li>
                <li>Vytvorte program, ktorý výpiše celú adresárovú štruktúru aktuálne nastaveného  
                adresára. </li>
            </ul>
        </div>
    );
};

export default FourthSubtopic;
