import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import Obr1 from '../../../images/TenthPageImg/Obr1.png'
import {languages} from "monaco-editor";

const ThirdSubtopicTenth = ({onComplete, completed}) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <div className="third-subtopic" id="section-3">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služby jadra - semop()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>semop() </code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td> syntax služby - prečítať si manuálové stránky
                                    v Unixe/Linuxe, Linux dokumentačný projekt,
                                    zdroje na internete
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>
                                    <li>argumentom služby</li>
                                    <li>návratovým hodnotám
                                    </li>
                                    <li>chybovým hláseniam</li>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>službu <code>semop()</code> pri operáciach vykonávaných nad
                                    semaformi
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Vyriešiť:</td>
                                <td>využiť získané skúsenosti pri tvorbe programov
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>60 minút</td>
                </tr>
                <tr>
                    <td className="section-title">Scenár</td>
                    <td>Sofia pokračuje v riešení svojej úlohy. Potrebuje vykonať
                        operáciu nad ňou vytvorenou a inicializovanou sadou semaforov.
                        Aby zabezpečila synchronizovaný prístup do kritickej sekcie
                        každého svojho procesu, musí sa naučiť efektívne používať
                        službu jadra <code>semop()</code>.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <br/>
            <strong>KROK1 - naučiť sa syntax a sémantiku služby jadra <code>semop()</code>: </strong>
            Služba <code>semop()</code> je používaná na vykonávanie operácií P a V nad sadou semaforov
            definovaných v parametri <code>sem_id</code>. <br/>
            Prv si povieme ako <code>semop()</code> narába s množinou operácií. V prípade, že nie je príznakmi
            v operácii povedané inak, všetky operácie sa vykonajú atomicky a vykonajú sa len
            vtedy, ak je možné ich všetky vykonať. V prípade, že to možné nie je, <code>semop()</code> uspí
            volajúci proces.
            <p style={{textDecoration: 'underline'}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/types.h> 
#include <sys/ipc.h> 
#include <sys/sem.h> 
int semop (int sem_id, struct sembuf *sem_ops, size_t num_sem_ops);                        
                        `
                    }
                </code>
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika: </p>
            Doplňte návratové hodnoty služby <code>semop()</code>: <br/>
            <li>služba <code>semop()</code> vracia __________ , pri chybe ______</li>
            <strong>KROK2 - pochopiť parametre služby: </strong> <br/>
            Prvý parameter <code>sem_id</code> je identifikátor sady semaforov, ktorý vráti služba <code>semget()</code>.
            Druhý parameter <code>sem_ops</code> je ukazovateľ na pole štruktúry, ktorá obsahuje aspoň tieto
            prvky:
            <pre>
                <code className={'language-c'}>
                    {
                        `
struct sembuf { 
    short sem_num; 
    short sem_op; 
    short sem_flg; 
}                        
                        `
                    }
                </code>
            </pre>
            Prvý člen záznamu (štruktúry) <code>sem_num</code> je číslo semaforu, nad ktorým sa má zo sady
            semaforov urobiť daná operácia. Druhý člen záznamu <code>sem_op</code> je hodnota alebo číslo
            (určujúce typ operácie), na ktorú má byť semafor zmenený. Hodnotu semaforu môže
            meniť o viac než 1. Často sa však používajú iba dve hodnoty:
            <li>-1 zníženie hodnoty semaforu – P operácia </li>
            <li>+1 zvýšenie hodnoty semafory – V operácia</li>

            <h2>Operácie P a V</h2>
            <p>Vyjadrujeme pomocou číselnej hodnoty druhého člena
                záznamu <code>sem_op</code> štruktúry <code>sembuf</code>:</p>

            <div className="operation-item">
                <p className="operation-title">Ak <code>sem_op &gt; 0</code>:</p>
                <p className="description">Jadro použije túto hodnotu na zvýšenie hodnoty semafora a odblokuje
                    procesy, ktoré čakajú na zvýšenie hodnoty semafora (operácia V).</p>
            </div>
            <br/>
            <div className="operation-item">
                <p className="operation-title">Ak <code>sem_op = 0</code>:</p>
                <p className="description">Jadro kontroluje hodnotu semafora, pokiaľ nie je nulová, zvýši počet
                    procesov čakajúcich na nulovú hodnotu semafora a proces zablokuje.</p>
            </div>
            <br/>
            <div className="operation-item">
                <p className="operation-title">Ak <code>sem_op &lt; 0</code>:</p>
                <p className="description">Absolútna hodnota je rovná hodnote semafora alebo je menšia. Jadro
                    pripočíta túto hodnotu (hodnota semafora je znížená – operácia P). Ak sa potom hodnota semafora
                    rovná 0, jadro aktivuje všetky zablokované procesy, čakajúce na nulovú hodnotu semafora.</p>
                <p className="description">Absolútna hodnota je väčšia alebo rovná hodnote semafora, jadro proces
                    zablokuje.</p>
            </div>
            <br/>
            <div className="operation-item">
                <p className="operation-title">Ak <code>sem_op &lt; 0</code>:</p>
                <p className="description">Absolútna hodnota je väčšia alebo rovná hodnote semafora, jadro proces
                    zablokuje.</p>
            </div>
            <br/>
            Posledný člen záznamu štruktúry <code>sem_flg</code> obsahuje jeden z dvoch príznakov
            SEM_UNDO alebo IPC_NOWAIT.
            <br/>
            <li>SEM_UNDO – operácie, ktoré sú vykonané s týmto príznakom sú navrátené po
                ukončení procesu. Táto operácia má zabezpečiť prípadné uchovanie
                konzistencie semaforu v prípade, že proces sa ukončí počas vykonávania
                kritickej sekcie; umožní operačnému systému tento semafor automaticky
                uvoľniť.
            </li>
            <li>IPC_NOWAIT – v prípade, že sa medzi operáciami narazí na operáciu, ktorá by
                vyžadovala uspatie procesu (nemôže byť totiž vykonaná) a zároveň má daná
                operácia príznak IPC_NOWAIT, tak funkcia neuspí volajúci proces, ale len vráti
                chybovú hodnotu -1.
            </li>
            <br/>
            Posledný parameter <code>num_sem_ops</code> je počet prvkov štruktúry <code>sembuf</code> (semaforov v
            poole), nad ktorými sa vykonávaju operácie P a V.
            <br/> <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie zadaj príkaz <strong><code>man 2
                semop</code></strong>.
            </div>
            <br/>
            <div className={'title-box'}>Príklad</div>
            <strong>KROK1 – aplikovanie služieb v programe: </strong> <br/>
            Pre experimentovanie so semaformi použijeme nasledujúce programy <i>sem1.c</i> a <i>sem2.c</i>.
            Program <i>sem1.c</i> vytvorí, inicializuje a odstráni sadu semaforov. Pre riešenie nášho
            problému využijeme iba jednosemaforovú sadu (jednosemaforový pool). Program
            <i>sem2.c</i> využije sadu semaforov vytvorenú programom <i>sem1.c</i>. K indikácii vstupu
            a výstupu z kritickej sekcii programu použijeme dva rôzne znaky. Program <i>sem1.c</i>
            zobrazí pri vstupe i opustení kritickej sekcii programu znak X a program <i>sem2.c</i> zobrazí
            pri vstupe a opustení kritickej sekcii programu znak O. Pretože by mal do kritickej
            sekcii programu mať prístup vždy iba jeden proces, mali by sa všetky znaky X a O na
            výstupe objaviť v pároch. Pre striedanie prístupu do kritickej sekcie programu <i>sem1.c</i>
            a <i>sem2.c</i> využívaju službu sleep(), ktorá pozastaví vykonávanie programu. <br/>
            <br/>
            <h5>Program sem1.c</h5>
            <pre>
                <code className={'language-c'}>
                    {
                        `

#include <stdlib.h>                // potrebne hlavičkové súbory 
#include <stdio.h> 
#include <sys/ipc.h> 
#include <sys/sem.h> 
 
union semun                    
{   
    int val, arg1, arg2;        /* hodnota pre SETVAL */ 
    struct semid_ds *buf;       /* buffer pre IPC_STAT, IPC_SET */ 
    unsigned short int *array;  /* pole pre GETALL, SETALL */ 
    struct seminfo *__buf;      /* buffer pre IPC_INFO */ 
}; 

static int set_semvalue(void); //prototypy funkcii 
static void del_semvalue(void); 
static int semaphore_p(void); 
static int semaphore_v(void); 
static int sem_id;          // globálna premenná.  
 
int main(int argc, char *argv[]) 
{ 
    int i; 
    int pause_time; 
    char op_char = 'X'; 
    srand((unsigned int)getpid()); //Nastavit generátor nahodných cisel 
    arg1 = atoi(argv[1]);    //ziskame argumenty odovzdane programu 
    arg2 = atoi(argv[2]);    //konvertujem string na integer 
    
    sem_id = semget((key_t)1234, 1, 0666 | IPC_CREAT); 
    if(sem_id==-1){ 
        perror("semget()"); 
        exit(EXIT_FAILURE); 
    } 
    printf("Program sem1.c ID semaforu: %d\\n",sem_id); 
    if (!set_semvalue()) {                  //inicializacia semafora 
        fprintf(stderr, "Failed to initialize semaphore\\n"); 
        exit(EXIT_FAILURE); 
    } 
    sleep(2); 
Cyklus 10 krát vkročí do kritickej sekcie programu a náhodne počká. Funkcia 
semaphore_p() nastaví semafor na čakanie.    




    for(i = 0; i < 10; i++) {         
        if (!semaphore_p()) exit(EXIT_FAILURE); 
        printf("%c", op_char);fflush(stdout); 
        pause_time = rand() % arg1; 
        sleep(pause_time); 
        printf("%c", op_char);fflush(stdout); 
        
        Po skončení kritickej sekcie voláme funkciu semaphore_v(), ktorá semafor nastaví na 
        voľno, potom sa náhodne čaká a pokračuje ďalšou iteráciou cyklu. Nakoniec voláme 
        del_semvalue na odstránenie ID semafora. 
        
        if (!semaphore_v()) exit(EXIT_FAILURE); 
        pause_time = rand() % arg2; 
        sleep(pause_time); 
    }     
    sleep(6); 
    printf("\\n%d - finished\\n", getpid()); 
    del_semvalue(); 
    exit(EXIT_SUCCESS); 
} 

Funkcia set_semvalue inicializuje semafor pomocou príkazu SETVAL, ktorý je 
odovzdaný ako parameter command služby semctl(). Je to nutné pred prvým použitím 
semaforu. 

static int set_semvalue(void){ 
    union semun sem_union; 
    sem_union.val = 1; 
    if (semctl(sem_id, 0, SETVAL, sem_union) == -1) return(0); 
    return(1); 
} 

Funkcia del_semvalue má skoro rovnaký tvar, ale služba semctl() používa príkaz 
IPC_RMID, ktorý odstráni ID semaforu: 

static void del_semvalue(void){ 
    if (semctl(sem_id, 0, IPC_RMID) == -1) 
        fprintf(stderr, "Failed to delete semaphore\\n"); 
} 

Funkcia semaphore_p zmení hodnotu semaforu na -1 (čakanie): 

static int semaphore_p(void) 
{ 
    struct sembuf sem_b; 
    sem_b.sem_num = 0; 
    sem_b.sem_op = -1;         
    sem_b.sem_flg = SEM_UNDO; 
    if (semop(sem_id, &sem_b, 1) == -1) { 
        fprintf(stderr, "semaphore_p failed\\n"); 
        return(0); 
    } 
    return(1); 
}                

Funkcia semaphore_v nastavuje sem_op na 1, takže semafor sa stane opätovne 
prístupným.  
 
static int semaphore_v(void) 
{ 
    struct sembuf sem_b;  
    sem_b.sem_num = 0; 
    sem_b.sem_op = 1;          
    sem_b.sem_flg = SEM_UNDO; 
    if (semop(sem_id, &sem_b, 1) == -1) { 
        fprintf(stderr, "semaphore_v failed\\n"); 
        return(0); 
    } 
    return(1); 
} 
                        `
                    }
                </code>
            </pre>
            <br/> <br/>
            <h5>Program sem2.c </h5>
            <pre>
                <code className={'language-c'}>
                    {
                        `
 
#include <stdlib.h>                // potrebne hlavickove subory 
#include <stdio.h> 
#include <sys/ipc.h> 
#include <sys/sem.h> 
 
static int semaphore_p(void); 
static int semaphore_v(void); 
static int sem_id;          // globalna premenna.  
 
int main(int argc, char *argv[]) 
{ 
    int i, arg1, arg2;  
    int pause_time; 
    char op_char = 'O'; 
    srand((unsigned int)getpid()); //Nastavit generator náhodných čísel 
    arg1 = atoi(argv[1]);    //ziskame argumenty odovzdane programu 
    arg2 = atoi(argv[2]);    //konvertujem string na integer 
    
    sem_id = semget((key_t)1234, 1, 0666 | IPC_CREAT); 
    if(sem_id==-1){ 
        perror("semget()"); 
        exit(EXIT_FAILURE); 
    } 
    printf("Program sem2.c ID semaforu: %d\\n",sem_id); 
    sleep(1); 
    
    for(i = 0; i < 10; i++) {         
        if (!semaphore_p()) exit(EXIT_FAILURE); 
        printf("%c", op_char);fflush(stdout); 
        pause_time = rand() % arg1;  
        sleep(pause_time); 
        printf("%c", op_char);fflush(stdout); 
        if (!semaphore_v()) exit(EXIT_FAILURE); 
        pause_time = rand() % arg2; 
        sleep(pause_time); 
    }     
    sleep(6); 
    printf("\\n%d - finished\\n", getpid());  
    exit(EXIT_SUCCESS); 
}                        


Funkcia semaphore_p zmení hodnotu semaforu na -1 (čakanie): 
 
static int semaphore_p(void) 
{ 
    struct sembuf sem_b;     
    sem_b.sem_num = 0; 
    sem_b.sem_op = -1;         
    sem_b.sem_flg = SEM_UNDO; 
    if (semop(sem_id, &sem_b, 1) == -1) { 
        fprintf(stderr, "semaphore_p failed\\n"); 
        return(0); 
    } 
    return(1); 
} 

Funkcia semaphore_v nastavuje sem_op na 1, takže semafor sa stane opätovne 
prístupným.  

static int semaphore_v(void) 
{ 
    struct sembuf sem_b; 
    sem_b.sem_num = 0; 
    sem_b.sem_op = 1;          
    sem_b.sem_flg = SEM_UNDO; 
    if (semop(sem_id, &sem_b, 1) == -1) { 
        fprintf(stderr, "semaphore_v failed\\n"); 
        return(0); 
    } 
    return(1); 
} 
                        `
                    }
                </code>
            </pre>
            <br/> <br/>
            Toto je príklad výstupu, ktorý získame, keď spustíme program sem1.c a sem2.c súčasne
            v jednom termináli s parametrami 3 a 2 pre službu <code>sleep()</code>:
            <div className={'terminal-command'}>

                $ ./sem1 3 2 & ./sem2 3 2 <br/>
                <br/>
                Program sem2.c ID semaforu: 229377<br/>
                Program sem2.c ID semaforu: 229377<br/>
                <br/>
                OOXXOOXXOOXXOOXXOOXXOOXXOOXXOOXXOOXXOOXX<br/>
                <br/>
                1083 – finished<br/>
                1082 – finished<br/>
                $
            </div>
            <br/> Je vidieť, že znaky X a O sú spárované a striedajú sa, čo znamená, že kritické sekcie
            programov boli spracované správne.10 Ak by sa sparované znaky X a O (dvojice)
            nestriedali pravidelne, môže to byť spôsobené vyťažením systému v danom momente
            spustenia programov v systéme. Striedanie spárovaných znakov X a O, čiže prístup do
            kritickej sekcii programov, môžeme ovplyvňovať pomocou parametrov odovzdaných
            programu <i>sem1.c a sem2.c</i>. <br/> <br/>
            <strong>KROK2 - ako to funguje: </strong><br/>
            Program sem1.c a sem2.c najprv získajú identifikátor semaforu službou <code>semget()</code>. Kľúč
            pre túto službu bol zvolený programátorom a príznak <code>IP_CREAT</code> zaistí vytvorenie
            semaforu, ak to bude nutné. Program sem1.c je zodpovedný za inicializáciu semafora,
            čo vykoná pomocou funkcie <code>set_semvalue()</code>, ktorá poskytuje zjednodušené rozhranie
            všeobecnejšej služby <code>semctl()</code>. Program sem1.c počká s odstránením semaforu, kým
            neskončí program sem2.c. Pokiaľ by semafor nebol zmazaný, existoval by v systéme,
            i keď by ho žiadne iné programy nepoužívali. <br/> <br/>
            Program sem1.c a sem2.c potom vykoná desať iterácii cyklu, pričom v kritických
            a nekritických sekciách počká náhodne dlho. Kritická sekcia je strážená funkciami
            <code>semaphore_p()</code> a <code>semaphore_v()</code>, ktoré tvoria zjednodušenie všeobecnejšej služby
            <code>semop()</code>. Služba <code>sleep()</code> slúži tiež k tomu, aby bolo možné spustiť program sem2.c
            skôr, ako sem1.c vykoná väčšie množstvo cyklov. Pomocou funkcie <code>rand()</code> je
            v programe získavané pseudonáhodné číslo. Generátor je inicializovaný funkciou
            <code>srand()</code>.
            <div className={'title-box'}>ÚLOHY NA SAMOSTANÚ PRÁCU: </div>
            <h4>Príklad č.1: </h4>
            Majme dva programy, program A a program B, ich telá tvorí nasledujúci kód:
            <pre>
                <code className={'language-c'}>
                    {
                        `
                    static int i; // zdielana premenna 
//proces A                                     //proces B
i = 0;                                         i = 0;
while(i < 100){                                while(i > -100){
    i++;                                            i++;
}                                               }
printf("vyhral to A");                          printf("vyhral to B")
                        `
                    }
                </code>
            </pre>
            Zodpovedzte nasledujúce otázky:
            <li>Ktorý proces vyhrá? </li>
            <li>Skončí sa niekedy táto „súťaž“?</li>
            <li>Ak jeden skončí, skončí zároveň aj druhý?</li>
            <li>Pomôže, ak program A spustíme ako prvý?</li>
            <br/> <br/>
            <h4>Príklad č.2: </h4>
            <img src={Obr1} alt=""/>
            Majme nasledujúcu schému. Vytvorte dva
            programy, ktoré budú čítať a zapisovať do
            zdieľanej pamäte. Nech program p1, zapisuje do
            zdieľanej pamäte slová zo vstupu a program p2
            ich číta a vypisuje na výstup. Na vzájomnú
            synchronizáciu použite semafory. <br/> <br/>
            <h4>Príklad č.3: </h4>
            V tejto úlohe máme spolupracujúce procesy, ktoré komunikujú cez vyrovnávajúcu
            pamäť obmedzenej veľkosti. Jedna skupina procesov produkuje informácie a vkladá ju
            do vyrovnávacej pamäte, odkiaľ ju druhá skupina procesov vyberá. Aby mohli obidve
            skupiny procesov prebiehať paralelne, ich vykonávanie sa musí zosynchronizovať, t. j.
            producent musí mať vždy voľné miesto vo vyrovnávacej pamäti pre uloženie dát
            a konzument musí mať vždy pripravené dáta na výber. Ak tomu tak nie je, proces, ktorý
            nemôže pokračovať v činnosti, musí počkať - producent na uvoľnenie miesta vo
            vyrovnávacej pamäti, konzument na uloženie dát.
            <br/> <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default ThirdSubtopicTenth;
