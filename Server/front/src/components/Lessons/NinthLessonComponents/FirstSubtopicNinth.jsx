import React, {useEffect} from 'react';
import Prism from "prismjs";

const FirstSubtopicNinth = ({onComplete, completed}) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <div className="first-subtopic" id="section-1">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služby jadra - shmat(),shmget(),shmdt(),shmctl()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>shmat(), shmget(), shmdt(), shmctl()</code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                <ul>syntax služieb - prečítať si manuálové stránky
                                    v Unixe/Linuxe, Linux dokumentačný projekt,
                                    zdroje na internete
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <li>argumentom služieb</li>
                                <li>návratovým kódom</li>
                                <li>chybovým hláseniam</li>

                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>služby <code>shmat(), shmget(), shmdt(), shmctl()</code>
                                pre prácu so zdieľanou pamäťou
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
                    <td>60 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Sofia pracuje na zadaní, kde potrebuje vytvoriť segment zdieľanej
                        pamäti na komunikáciu medzi procesmi. Aby mohla využívať
                        zdieľanú pamäť ako medziprocesovú komunikáciu, musí sa
                        oboznámiť so základnými službami, ktoré jej umožnia pracovať so
                        zdieľanou pamäťou.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <br/>
            <strong>KROK1 - naučiť sa syntax a sémantiku služby jadra <code>shmget()</code>:</strong>
            Sofia začne so službou jadra shmget(), ktorá jej pomôže získať identifikátor a vytvorí
            zdieľanú pamäť. <br/>
            <p style={{textDecoration: 'underline'}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/ipc.h> 
#include <sys/shm.h> 
int shmget(key_t key, size_t size, int shmflg);    
                        `
                    }
                </code>
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika: </p>
            <li>služba <code>shmget</code>() vracia nezápornú celočíselnú hodnotu, čo je identifikátor
                zdieľanej pamäte, alebo pri chybe služba vráti hodnotu -1.
            </li>
            <br/>
            <strong>KROK2 - pochopiť parametre služby:</strong>
            Parameter key predstavuje kľúč (číslo) pomocou ktorého chceme globálne identifikovať
            blok zdieľanej pamäte v operačnom systéme. V prípade, že takto identifikovaný blok už
            existuje, a použité príznaky (flagy) a prístupové práva to dovoľujú, je vrátený
            identifikátor na tento blok zdieľanej pamäte. V prípade, že žiadna zdieľaná pamäť s
            týmto identifikátorom neexistuje, je vytvorený nový segment zdieľanej pamäte.
            Ak chceme zabezpečiť, aby nevznikali konflikty, resp. dať súboru programov, ktoré
            predpokladáme inštalovať na viacero systémov, prostriedok pre jednoznačné priradenie
            kľúča pre segment zdieľanej pamäte, je možné použiť službu <code>ftok()</code>. Táto služba vráti
            jednoznačný identifikátor segmentu zdieľanej pamäte na základe špecifikovaného
            súboru. <br/>
            Existuje špeciálna hodnota kľúča menom <code>IPC_PRIVATE</code>, ktorá vytvorí zdieľanú pamäť
            prístupnú len danému procesu (nezohľadní sa kľúč). Druhý parameter <code>size</code> špecifikuje
            119
            počet bajtov požadovanej pamäte. Tretí parameter <code>shmflg</code> je tvorený príznakmi.
            Rozoberieme si dva základne príznaky: <br/> <br/>
            <li><strong>IPC_CREAT</strong> - tento príznak znamená, že chceme vytvoriť zdieľanú pamäť. Ak je
                IPC_CREAT použité samostatne, <code>shmget()</code> vracia buď identifikátor
                pre novovytvorený segment, alebo identifikátor segmentu, ktorý už
                existuje a ma rovnakú hodnotu kľúča (key).
            </li>
            <li><strong>IPC_EXCL</strong> - je príznak, ktorý zabezpečí, že pokiaľ je na daný kľúč už
                zaregistrovaná zdieľaná pamäť, volanie zlyhá. Používa sa spoločne
                s príznakom IPC_CREAT.
            </li>
            Parameter <code>shmflg</code> obsahuje okrem príznakov aj prístupové práva., ktoré sú používané
            podobným spôsobom, ako pri vytváraní súborov. Pravdaže, tie sa aplikujú len pri
            vytváraní, ak k nemu dôjde. <br/> <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie zadaj príkaz <strong><code>man 2
                shmget</code></strong>.
            </div>
            <br/>
            <strong>KROK3 - naučiť sa syntax a sémantiku služby jadra <code>shmat()</code>:</strong> <br/>
            Keď operačný systém pamäť vytvorí, nebude prístupná žiadnemu procesu. Sofia ju
            sprístupní tak, že ju pripojí do adresného priestoru relevantného procesu. Toto dosiahne
            pomocou služby <code>shmat()</code>. <br/> <br/>
            <p style={{textDecoration: 'underline'}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/types.h> 
#include <sys/shm.h> 
void *shmat(int shm_id, const void *shm_addr, int shmflg); 
                        `
                    }
                </code>
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika: </p>
            <li>Ak je volanie služby <code>shmat()</code> úspešné, vráti ukazovateľ (smerník) na prvý bajt
                zdieľanej pamäte, alebo pri chybe vráti hodnotu -1.
            </li>
            <br/>
            <strong>KROK4 - pochopiť parametre služby:</strong> <br/>
            Prvý parameter <code>shm_id</code> je identifikátor zdieľanej pamäte, ktorý vrátila
            služba <code>shmget</code>().
            Druhý parameter <code>shm_addr</code> je adresa, na ktorú by sme chceli aby bola zdieľaná pamäť
            pripojená v LAP. Ak je táto hodnota NULL, operačný systém sám rozhodne, kam
            zdieľanú pamäť pripojí. Parameter <code>shmflg</code> určuje, ako chceme zdieľanú pamäť pripojiť.
            Možnosti, ktoré sú pre nás zaujímavé sú SHM_RDONLY a SHM_RDN. V prípade
            SHM_RDONLY je zdieľaná pamäť sprístupnená len pre čítanie. <br/> <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie zadaj príkaz man 2 shmat.</div>
            <br/>
            <strong>KROK5 - naučiť sa syntax a sémantiku služby jadra <code>shmdt</code>():</strong> <br/>
            Služba <code>shmdt</code>()odpojí zdieľanú pamäť od LAP aktuálneho procesu. Ako parameter
            použije ukazovateľ (smerník) na adresu, ktorý vrátila služba <code>shmat</code>(). Odpojením
            zdieľanej pamäte pamäť nie je systémom uvoľnená, ale iba zneprístupnená aktuálnemu
            procesu.
            <br/> <br/>
            <p style={{textDecoration: 'underline'}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/types.h> 
#include <sys/shm.h> 
int shmdt(const void *shmaddr); 
                        `
                    }
                </code>
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika: </p>
            <li>služba <code>shmdt</code>() po úspešnom vykonaní vráti nulovú hodnotu, alebo pri chybe
                hodnotu -1.
            </li>
            <div className={'annotations'}>Pre podrobnejšie informácie zadaj príkaz <strong><code>man 2
                shmdt</code></strong>.
            </div>
            <br/>
            K<strong>ROK6 - naučiť sa syntax a sémantiku služby jadra <code>shmctl</code>():</strong> <br/>
            Poslednou dôležitou službou, ktorú Sofia potrebuje pri tvorbe programov, je služba
            <code>shmctl</code>(). Táto služba slúži na ovládanie zaregistrovaných zdieľaných pamätí.
            <p style={{textDecoration: 'underline'}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/types.h> 
#include <sys/shm.h> 
int shmctl(int shm_id, int cmd, struct shmid_ds *buf); 
                        `
                    }
                </code>
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika: </p>
            <li>služba <code>shmctl</code>() po úspešnom vykonaní vráti hodnotu 0 alebo -1, ak nastala chyba
            </li>
            <br/>
            <strong>KROK7 - pochopiť parametre služby:</strong> <br/>
            Prvý parameter služby <code>shmctl() shm_id</code> je lokálny identifikátor zdieľanej pamäte
            vrátený službou <code>shmget()</code>. Druhý parameter <code>cmd</code> je akcia, ktorá sa má vykonať s
            danou
            zdieľanou pamäťou. Tento parameter môže nadobúdať jednu z troch nasledujúcich
            hodnôt:
            <table>
                <thead>
                <tr>
                    <th>Názov</th>
                    <th>Popis</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><code>IPC_STAT</code></td>
                    <td>Skopíruje dáta z jadra OS pre segment zdieľanej pamäte shm_id do
                        štruktúry shmid_ds
                    </td>
                </tr>
                <tr>
                    <td><code>IPC_SET </code></td>
                    <td>Nastaví hodnoty asociavané so zdieľanou pamäťou podľa údajov
                        obsiahnutých v štruktúre shmid_ds, pokiaľ na to má daný proces
                        oprávnenie.
                    </td>
                </tr>
                <tr>
                    <td><code>IPC_RMID </code></td>
                    <td>Zmaže segment zdieľanej pamäte.
                    </td>
                </tr>

                </tbody>
            </table>
            <br/>
            Tretí parameter <code>buf</code> je smerník na štruktúru, ktorá obsahuje režimy prístupu
            (<code>struct shmid_ds</code>) a prístupové práva (<code>struct ipc_perm</code>) k zdieľanej pamäti. <br/>
            <br/>

            Štruktúra <code>shmid_ds</code> obsahuje tieto prvky: <br/>
            <pre>
                <code className={'language-c'}>
                    {
                        `
struct shmid_ds { 
    struct ipc_perm shm_perm;    /* Ownership and permissions */ 
    size_t          shm_segsz;   /* Size of segment (bytes) */ 
    time_t          shm_atime;   /* Last attach time */
    time_t          shm_dtime;   /* Last detach time */        
    time_t          shm_ctime;   /* Last change time */
    pid_t           shm_cpid;    /* PID of creator */
    pid_t           shm_lpid;    /* PID of last shmat()/shmdt() */
    shmatt_t        shm_nattch;  /* No. of current attaches */
    ... 
}; 
                        `
                    }
                </code>
            </pre>
            <br/>
            <div className={'annotations'}> Pre podrobnejšie informácie zadaj príkaz <strong><code>man 2
                shmctl</code></strong>.
            </div>
            <br/>
            <strong>KROK8 – aplikovanie služieb v programe:</strong> <br/>

            Keď sú služby pre prácu so zdieľanou pamäťou Sofii už známe, môže ich využiť pri
            tvorbe programov. Sofia vytvorí dvojicu programov <i>shm1.c</i> a <i>shm2.c</i>. Program 2
            (konzument), vytvorí segment zdieľanej pamäte a potom zobrazí dáta, ktoré do nej
            zapíše Program 3 (producent) tento segment pripojí a umožní doňho zapisovať dáta. <br/> <br/>

            Najprv si vytvoríme hlavičkový súbor s názvom shm_com.h.
            <pre>
                <code className={'language-c'}>
                    {
                        `
#define TEXT_SZ 2048 
struct shared_use_st { 
    int written_by_you; 
    char some_text[TEXT_SZ]; 
};             
                        `
                    }
                </code>
            </pre>
            Tento súbor definuje štruktúru, ktorú budeme využívať v obidvoch programoch. To, že
            boli do štruktúry zapísané dáta, povieme konzumentovi pomocou celočíselného
            príznaku <code>written_by_you</code> nastaveného na hodnotu 1 producentom. Ak sú dáta
            prečítané konzumentom, tak sa príznak <code>written_by_you</code> nastaví na hodnotu 0. <br/> <br/>
            Program 2 (konzument) vytvorí segment zdieľanej pamäte a potom ho pripojí k svojmu
            adresnému priestoru. Akonáhle sú k dispozícii nejaké dáta, príznak <code>written_by_you</code> je
            nastavený na hodnotu 1 producentom. Program 2 prečíta ľubovolný text uložený
            v premennej <code>shared_stuff</code> a zobrazí ho. Nakoniec konzument nastaví príznak
            <code>written_by_you</code> na hodnotu 0, aby naznačil, že dáta prečítal a čaká na ďalšie dáta.
            Na ukončenie cyklu konzumenta sa použije reťazec „end“. Program 2 potom zdieľanú
            pamäť odpojí a odstráni ju zo systému. <br/> <br/>
            Po pridaní potrebných hlavičkových súborov pre prácu so segmentom zdieľanej pamäte
            si zavoláme službu <code>shmget</code>(), v ktorej špecifikujeme príznak <code>IPC_CREAT</code> <br/>
            <strong>Program 2 </strong>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <unistd.h> 
#include <stdlib.h> 
#include <stdio.h> 
#include <string.h> 
#include <sys/types.h> 
#include <sys/ipc.h> 
#include <sys/shm.h> 
#include "shm_com.h" 
int main() 
{ 
    int running = 1; 
    void *shared_memory = (void *)0; 
    struct shared_use_st *shared_stuff; 
    int shmid; 
    srand((unsigned int)getpid());     
    shmid = shmget(1234,sizeof(struct shared_use_st),0666 | IPC_CREAT); 
                         //ziskanie identifikator shm 
    if (shmid == -1) { 
        fprintf(stderr, "shmget failed\\n"); 
        exit(EXIT_FAILURE); 
    } 
    
    Teraz sprístupníme zdieľanú pamäť programu: 
    
    shared_memory = shmat(shmid, (void *)0, 0);     //pripojenie shm 
    if (shared_memory == (void *)-1) { 
        fprintf(stderr, "shmat failed\\n"); 
        exit(EXIT_FAILURE); 
    } 
    
    printf("Memory attached at %X\\n", (int)shared_memory); 
    
    
    V ďalšej časti programu priradíme segment shared_memory do premennej
    shared_stuff a zobrazíme ľubovolný text uložený v premennej shared_stuff . Cyklus 
    bude pokračovať, kým nebude premenná shared_stuff obsahovať reťazec end. 
    Volanie služby sleep() zdrží konzumenta v kritickej sekcii, čo prinúti producenta 
    počkať. 
    
    shared_stuff = (struct shared_use_st *)shared_memory; 
    shared_stuff->written_by_you = 0;    //povolime zapis producentovi 
    while(running) { 
        if (shared_stuff->written_by_you) {           //ak mame co citat 
            printf("You wrote: %s", shared_stuff->some_text); 
            sleep( rand() % 4 );          //nechame producenta cakat 
            shared_stuff->written_by_you = 0;  
            //povolime zapis producentovi 
            if (strncmp(shared_stuff->some_text, "end", 3) == 0) { 
                running = 0;     //ukoncenie cyklu konzumenta retazcom end 
            }                      
        } 
    } 
    
    Nakoniec zdieľanú pamäť odpojíme a zrušíme: 
    
    if (shmdt(shared_memory) == -1) {                   //odpojenie shm 
        fprintf(stderr, "shmdt failed\\n"); 
        exit(EXIT_FAILURE); 
    } 
    
    if (shmctl(shmid, IPC_RMID, 0) == -1) {             //zrusenie shm 
        fprintf(stderr, "shmctl(IPC_RMID) failed\\n"); 
        exit(EXIT_FAILURE); 
    } 
    exit(EXIT_SUCCESS); 
} 
                        `
                    }
                </code>
            </pre>
            <br/>

            <strong>Program 3</strong> (producent) získa a pripojí rovnaký segment zdieľanej pamäte, pretože
            použije rovnaký kľúč. Potom požiada používateľa, aby zadal nejaký text. Ak príznak
            <code>written_by_you</code> je nastavený na hodnotu 1, producent vie, že konzument ešte dáta
            neprečítal a čaká. Až potom, keď konzument príznak <code>written_by_you</code> nastaví na
            hodnotu 0, môže Program 3 zapísať do zdieľanej pamäte nové dáta a príznak
            <code>written_by_you</code> znovu nastaví na hodnotu 1. Po vložení reťazca „end“ producent
            skončí a odpojí segment zdieľanej pamäte. <br/> br
            <br/>
            <strong>Program 3</strong>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <unistd.h> 
#include <stdlib.h> 
#include <stdio.h> 
#include <string.h> 
 
#include <sys/types.h> 
#include <sys/ipc.h> 
#include <sys/shm.h> 
 
#include "shm_com.h" 
 
int main() 
{ 
    int running = 1; 
    void *shared_memory = (void *)0; 
    struct shared_use_st *shared_stuff; 
    char buffer[BUFSIZ]; 
    int shmid; 
    
    shmid = shmget(1234,sizeof(struct shared_use_st),0666 | IPC_CREAT); 
                                     //ziskanie identifikatora shm 
    
    if (shmid == -1) { 
        fprintf(stderr, "shmget failed\\n"); 
        exit(EXIT_FAILURE); 
    } 
    
    shared_memory = shmat(shmid, (void *)0, 0);        //pripojenie shm 
    if (shared_memory == (void *)-1) { 
        fprintf(stderr, "shmat failed\\n"); 
        exit(EXIT_FAILURE); 
    } 
    
    printf("Memory attached at %X\\n", (int)shared_memory); 
    shared_stuff = (struct shared_use_st *)shared_memory; 
    while(running) { 
        while(shared_stuff->written_by_you == 1) { 
            sleep(1);                //cakanie na precitanie dat konzumentom 
            printf("waiting for client...\\n"); 
        } 
        printf("Enter some text: "); 
        fgets(buffer, BUFSIZ, stdin);                  //zadanie retazca 
         
        strncpy(shared_stuff->some_text, buffer, TEXT_SZ); 
        shared_stuff->written_by_you = 1;//povolime citanie konzumentovi 
        
        if (strncmp(buffer, "end", 3) == 0) { 
            running = 0;        //ukoncenie cyklu producenta retazcom end 
        } 
    } 
    if (shmdt(shared_memory) == -1) {                   //odpojenie shm 
        fprintf(stderr, "shmdt failed\\n"); 
        exit(EXIT_FAILURE); 
    } 
    exit(EXIT_SUCCESS); 
} 
   
                        `
                    }
                </code>
            </pre>
            Keď tieto dva programy spustíme, mali by sme dostať podobný výstup, ktorý sa bude
            líšiť hodnotou „memory attached“ a použitím nami zadávaných reťazcov slov:
            <div className={'terminal-command'}>$ ./shm1 & ./ <br/>
                Memory attached at 50007000<br/>
                Memory attached at 50007000<br/>
                Enter some text: hello<br/>
                You wrote: hello<br/>
                waiting for client…<br/>
                waiting for client…<br/>
                Enter some text: Linux!<br/>
                You wrote: Linux!<br/>
                waiting for client…<br/>
                waiting for client…<br/>
                waiting for client…<br/>
                Enter some text: end<br/>
                You wrote: end<br/>
                $ </div> <br/>
            Nevýhodou navrhnutého riešenia je, že na synchronizáciu používame vlastný príznak
            <code>written_by_you</code>, ktorý vyžaduje nákladné čakanie (testovanie hodnoty príznaku
            v nepretržitom cykle a tým aj zbytočné zaťažovanie procesora). V skutočných
            programoch by sme na synchronizáciu čítania a zapisovania použili mechanizmus
            posielania správ (buď prostredníctvom rúry alebo IPC správu), signálov alebo semafor.
            <div className={'title-box'}>ÚLOHY NA SAMOSTANÚ PRÁCU:</div>
            <li>Vytvorte program, ktorý ilustruje použitie zdieľanej pamäte:
                <li>Alokujte segment zdieľanej pamäte, pripojte sa k segmentu a zapíšte doň
                    reťazec znakov.</li>
                <li>Odpojte segment zdieľanej pamäte.</li>
                <li>Následne znovu pripojte segment zdieľanej pamäte, tentokrát na inej
                    adrese, vypíšte reťazec zo zdieľanej pamäte, odpojte segment a dealokujte
                    ho
                </li>
            </li>
            <li>Vytvorte program, ktorý vytvorí zdieľanú pamäť a nový proces-potomok, ktorý
                zapíše dáta do zdieľanej pamäte zadané z príkazového riadku. Proces rodič
                prečíta tieto dáta a vypíše na štandardný výstup. Synchronizácia medzi procesmi
                rodič a potomok sa realizuje pomocou signálov.
            </li>
            <br/> <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default FirstSubtopicNinth;
