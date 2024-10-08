import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const FifthSubtopicEighth = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="fifth" id="section-5">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: <strong>Služba jadra - sigaction()</strong> ( sigemptyset(), sigfillset(),
                        sigaddset(), sigdellset(), sigprocmask())
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>sigaction()</code>, signal set, reliable signals</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                <li>
                                    základné fakty o využití týchto služieb
                                </li>
                                <li>
                                    ich základnú syntax
                                </li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <li>argumentu služby <code>sigaction()</code>, ktorý
                                    nastavuje príznak správania sa služby
                                </li>
                                <li> sadám signálov</li>
                                <li> princípu pridávania signálov do sady</li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>
                                <li>všetky členy štruktúry sigaction pri
                                    nastavovaní správania sa procesu po
                                    prijatí signálu
                                </li>
                                <li>
                                    služby pracujúce so sadami signálov
                                </li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vyriešiť:</td>
                            <td>problémy súvisiace s prijatím signálu
                                v okamihu, keď proces ešte nedokončil činnosť
                                spojenú s obsluhou predošlého signálu
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
                    <td>Sofia sa dočítala, že pre lepšiu spoľahlivosť a hlavne bezpečnosť
                        programov sa majú používať definované sady signálov.
                        Prostredníctvom týchto sád môže napríklad definovať, vzhľadom
                        na ktoré signály má byť program imúnny, čo sa má stať po prijatí
                        nejakého signálu. Využiť tieto sady môže práve prostredníctvom
                        služieb, s ktorými sa naučí pracovať práve v tejto podtéme.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>KRÁTKY ÚVOD:</strong>
            </div>

            <strong>KROK1 – naučiť sa syntax a sémantiku služby <code>sigaction()</code>:</strong>
            Služba <code>sigaction()</code> poskytuje možnosť presnejšie špecifikovať správanie obslužných
            rutín signálov.
            <br/>
            <p style={{textDecoration: 'underline'}}>Syntax</p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <signal.h> 
int sigaction(int signum, const struct sigaction *act, struct 
sigaction *oldact);     
                        `
                    }
                </code>
            </pre>
            Služba jadra <code>sigaction()</code> využíva štruktúru <code>sigaction</code>, ktorej obsah je nasledovný:
            <pre>
                <code className={'language-c'}>
                    {
                        `
struct sigaction{ 
    void (*sa_handler)(int); 
    void (*sa_sigaction)(int, siginfo_t *,void*);      
    sigset_t sa_mask;  
    int sa_flags; 
    void (*sa_restorer)(void);    
}  
                        `
                    }
                </code>
            </pre>
            <li>
                Prvou položkou zoznamu štruktúry je obslužná funkcia <code>sa_handler</code>, s rovnakým
                významom ako pri službe <code>signal()</code>. Sofia namiesto druhej položky zoznamu
                štruktúry môže použiť príznaky SIG_IGN a SIG_DFL.
            </li>
            <li>
                Tretou položkou <code>sa_mask</code> zoznamu štruktúry definuje sadu signálov ešte predtým,
                než sa zavolá obslužná funkcia. Patria sem signály, ktoré majú byť ignorované pri
                vykonávaní obslužnej funkcie. Tým sa problému, ktorý často nastáva vtedy, keď je
                procesu poslaný nejaký signal v momente vykonávania obslužnej funkcie.
            </li>
            <li>
                Posledná položka <code>sa_flags</code> modifikuje správanie sa obslužnej funkcie signálu.
                Jeho hodnotami môžu byť:
            </li>
            <table>
                <thead>
                <tr>
                    <th>Názov</th>
                    <th>Popis</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>SA_NOCLDSTOP</td>
                    <td>Negeneruje sa signál SIGCHILD, keď sa potomkovia končia</td>
                </tr>
                <tr>
                    <td>SA_RESETHAND</td>
                    <td>Nastavuje pôvodnú akciu na daný signál (význam ako SIG_DFL)</td>
                </tr>
                <tr>
                    <td>SA_RESTART</td>
                    <td>Reštartuje služby, ktoré môžu byť prerušené príchodom nejakého
                        signálu
                    </td>
                </tr>
                <tr>
                    <td>SA_NODEFER</td>
                    <td>Keď beží obslužná funkcia a proces zachytí nejaký signál, tento
                        signál sa nepridá do sady signálov
                    </td>
                </tr>

                </tbody>
            </table>
            <br/>
            <strong>KROK2 – oboznámiť sa so funkciami <code>sigemptyset(), sigaddset(),
                sigdellset(), sigprocmask()</code>:
            </strong>
            Všetky tieto služby prijímajú sadu signálov ako svoj argument. Táto sada je typu
            <code>sigset_t</code>. Najdôležitejšími sú služby <code>sigemptyset()</code> a <code>sigfillset()</code>,
            ktoré by mala
            Sofia volať vždy pred ostatnými službami.
            <li>služba <code>sigemptyset()</code> inicializuje sadu signálov</li>
            <li>služba <code>sigfillset()</code> naplní sadu signálov všetkými možnými signálmi</li>
            <li>služba <code>sigaddset()</code> pridá do sady nejaký signál</li>
            <li>služba <code>sigdelset()</code> odstráni jeden alebo niekoľko signálov zo sady. Táto
                služba je obvykle volaná po službe <code>sigfillset()</code></li>
            <li>služba <code>sigprocmask()</code> blokuje prijatie niektorého signálu počas doby
                vykonávania obslužnej funkcie
            </li>
            Najzaujímavejšou z týchto služieb je služba <code>sigprocmask()</code> slúžiaca na chránenie
            kritických sekcií programu, teda sekcií, ktorých vykonanie nesmie byť prerušené
            (napríklad príchodom nejakého signálu). Táto služba modifikuje aktuálnu signálovú
            masku. Prvý argument tejto služby určuje, ako má byť modifikovaná aktuálna signálová
            maska. Argument môže nadobúdať tieto hodnoty:
            <table>
                <thead>
                <tr>
                    <th>Názov</th>
                    <th>Popis</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>SIG_BLOCK</td>
                    <td>Signály v dodanej sade sú pridané k blokovaným signálom
                        aktuálnej sady
                    </td>
                </tr>
                <tr>
                    <td>SIG_UNBLOCK</td>
                    <td>Signály v dodanej sade sú odstránené zo sady blokovaných signálov</td>
                </tr>
                <tr>
                    <td>SIG_SETMASK</td>
                    <td>Kompletne nahrádza signálovú masku. Špecifikovaná sada
                        nahradí aktuálnu sadu, v ktorej sa nachádzajú blokované signály
                    </td>
                </tr>

                </tbody>
            </table> <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie si Sofia prečíta manuál k týmto službám!</div>
            <br/>

            <strong>KROK3 – aplikovanie služieb v programe:</strong>
            1.program - Nasledujúci príklad je veľmi jednoduchý, aplikuje len služby
            <code>sigaction()</code> a <code>sigemptyset()</code>.
            <pre>
                <code className={'language-c'}>
                    {
                        `
Sofia po pripojení potrebných hlavičkových súborov definuje obslužnú funkciu, ktoré 
bude len vypisovať jeden reťazec: 

#include <signal.h> 
#include <stdio.h> 
#include <unistd.h> 

void ouch(int sig){ 
    printf("Dostal som signal %d\\n", sig); 
} 

V hlavnej funkcii Sofia najprv deklaruje štruktúru sigaction, nastaví obslužnú 
funkciu tejto štruktúry na funkciu ouch(), vyprázdni sadu signálov a príznak štruktúry 
inicializuje hodnotou „0“, pretože nepotrebuje nastaviť špeciálne správanie sa 
obslužnej funkcie. Následne Sofia zavolá službu sigaction(), ktorej na mieste prvého 
argumentu predá SIGINT, teda program bude odchytávať signál prerušenia. Nakoniec 
bude v slučke vypisovať reťazec „Hello World“ v sekundových intervaloch.  

int main() 
{ 
    struct sigaction act; 
    act.sa_handler = ouch; 
    sigemptyset(&act.sa_mask); 
    act.sa_flags = 0; 
    sigaction(SIGINT, &act, 0); 
    while(1){ 
        printf("Hello World!\\n"); 
        sleep(1); 
    } 
}             
                        `
                    }
                </code>
            </pre>
            <br/>
            Výstup z programu:
            <div className={'terminal-command'}>$
                Hello World! <br/>
                Hello World!<br/>
                Hello World!<br/>
                ^C<br/>
                Dostal som signal 2<br/>
                Hello World!<br/>
                Hello World!<br/>
                ^C<br/>
                Dostal som signal 2<br/>
                Hello World!<br/>
                Hello World!<br/>
                ^\<br/>
                Quit </div>
            <br/>

            Program bude po každom stlačení klávesovej skratky CTRL+C vypisovať reťazec
            „Hello World“, pretože štruktúra <code>sigaction</code> je nastavená na opakované odchytenie
            tohto signálu SIGINT. Pre ukončenie programu môže Sofia stlačiť klávesovú skratku
            CTRL+\, prípadne procesu tohto programu pošle signál kill -9. Sofia môže skúsiť
            priradiť členovi sa_flags štruktúry act hodnotu SA_RESETHAND.
            <br/> <br/>
            <div className={'title-box'}>POSTUP 2:</div>
            V tejto časti sa Sofia naučí používať aj ďalšie služby pracujúce so sadou signálov. <br/> <br/>
            <strong>Krátke príklady: <br/>
                1. Blokovanie všetkých signálov okrem SIGUSR1 a SIGUSR2:</strong>
            <pre>
                <code className={'language-c'}>
                    {
                        `
sigset_t  sig_set;     // deklarácia sady signálov 
sigfillset(&sig_set);       // naplnenie sady všetkými signálmi 
sigdelset(&sig_set, SIGUSR1); // odstránenie signálu SIGUSR1 zo sady 
sigdelset(&sig_set, SIGUSR2); // odstránenie signálu SIGUSR2 zo sady 
sigprocmask(SIG_SETMASK, &sig_set,NULL);//zaevidovanie upravenej masky                         
                        `
                    }
                </code>
            </pre>
            <br/>
            <strong>2. Odblokovanie/odstránenie SIGINT, SIGQUIT: </strong>
            <pre>
                <code className={'language-c'}>
                    {
                        `
sigset_t  onesig, old_mask; 
sigemptyset(&onesig); // inicializácia sady (jej vyčistenie) 
sigaddset(&onesig,SIGINT); 
sigaddset(&onesig, SIGQUIT);          /* pridanie signálov do sady*/  
sigprocmask(SIG_UNBLOCK, &onesig, &old_mask);  /* ich odblokovanie,  
uchovaniestarej sady v old_mask */                         
                        `
                    }
                </code>
            </pre>
            <br/>
            <strong>2. program</strong> - Teraz Sofia vytvorí komplexnejší program, v ktorom najprv povolí
            a potom zablokuje prijatie signálu SIGUSR1.
            <pre>
                <code className={'language-c'}>
                    {
                        `
Najprv pripojí potrebné hlavičkové súbory a definuje obslužnú funkciu: 
 
#include <stdio.h> 
#include <unistd.h> 
#include <signal.h> 

void catcher( int sig ){ 
    printf("som v obsluznej funkcii\\n"); 
} 

Deklaruje štruktúru sigaction, sadu signálov a nastaví štruktúru sigaction na 
obsluhu signálu SIGUSR1. Následne program sám sebe pošle tento signál: 

int main()  
{ 
    struct sigaction sigact; 
    sigset_t sigset; 
    
    sigemptyset( &sigact.sa_mask ); 
    sigact.sa_flags = 0; 
    sigact.sa_handler = catcher; 
    sigaction( SIGUSR1, &sigact, NULL ); 
    printf("pred prvym poslanim signalu\\n"); 
    kill( getpid(), SIGUSR1 ); 

Teraz Sofia vyčistí štruktúru sigaction a pridá do nej len signál SIGUSR1. Nastaví 
masku signálu na danú sadu. Následne najprv oznámi a potom vykoná opätovné 
poslanie signálu: 

    sigemptyset( &sigset ); 
    sigaddset( &sigset, SIGUSR1 ); 
    sigprocmask( SIG_SETMASK, &sigset, NULL ); 
    printf("pred druhym poslanim signalu\\n");       
    kill( getpid(), SIGUSR1 ); 
    printf("po druhom poslani signalu\\n"); 
    return (0); 
}      
                        `
                    }
                </code>
            </pre> <br/>
            Výstup z programu:
            <div className={'terminal-command'}>
                $ <br/>
                pred prvym poslanim signalu<br/>
                som v obsluznej funkcii<br/>
                pred druhym poslanim signalu<br/>
                po druhom poslani signalu<br/>
                $
            </div> <br/>

            <strong>3. program</strong> - Tento program je modifikáciou predošlého príkladu. Sofia v ňom použije
            služby sigfillset() a sigdelset().
            <br/> <br/>
            <pre>
                <code className="language-c">
                    {
                        `
Úvod príkladu je totožný: 
#include <stdio.h> 
#include <unistd.h> 
#include <signal.h> 
 
void catcher( int sig ){ 
    printf("som v obsluznej funkcii\\n"); 
} 

int main()  
{ 
    struct sigaction sigact; 
    sigset_t sigset; 
    sigemptyset( &sigact.sa_mask ); 
    sigact.sa_flags = 0; 
    sigact.sa_handler = catcher; 
    sigaction( SIGUSR1, &sigact, NULL ); 

Sofia inicializuje sadu sigset, do ktorej pridá aj signál SIGUSR1, teda aj tento signál 
bude blokovaný. Nastaví signálovú masku upravenou maskou:  

    sigfillset( &sigset ); 
    sigaddset( &sigset, SIGUSR1 ); 
    sigprocmask( SIG_SETMASK, &sigset, NULL ); 

Následne pošle signál SIGUSR1: 

    printf("pred poslanim signalu SIGUSR1\\n"); 
    kill( getpid(), SIGUSR1 ); 

Teraz odstráni signál SIGUSR1 zo sady, takže program už bude zachytávať tento 
signál: 

    printf("pred odblokovanim signalu SIGUSR1\\n"); 
    sigdelset( &sigset, SIGUSR1 ); 
    sigprocmask( SIG_SETMASK, &sigset, NULL ); 
    printf("po odblokovani signalu SIGUSR1\\n"); 
    return (0); 
}             
                        `
                    }
                </code>
            </pre>
            V tomto príklade, ako aj v predošlom, si Sofia musí všimnúť jednu dôležitú skutočnosť.
            Keď sa programu pošle signál, ktorého odchytenie je v programe blokované, tento
            signál sa nestratí, ale bude čakať, pokiaľ sa mu nepovolí odchytenie. Konkrétne,
            v tomto príklade po odblokovaní signálu SIGUSR1 bol tento signál automaticky
            programom odchytený, takže sa hneď zavolala obslužná funkcia. <br/> <br/>
            Výstup z programu:
            <br/>
            <div className={'terminal-command'}>
                $ <br/>
                pred poslanim signalu SIGUSR1<br/>
                pred odblokovanim signalu SIGUSR1<br/>
                som v obsluznej funkcii<br/>
                po odblokovani signalu SIGUSR1<br/>
                $
            </div>
            <br/> <br/>
            <div className={'title-box'}> ÚLOHY NA SAMOSTATNÚ PRÁCU:</div>
            <li>
                Vytvorte program, ktorý bude generovať a zachytávať dva signály SIGUSR1 a
                SIGUSR2. Program bude posielať tieto signály podľa hodnoty počítadla
                nastavenej od 0 do 25. Program pošle signál SIGUSR1, ak bude hodnota
                počítadla deliteľná číslom 5. Program pošle signál SIGUSR2, ak bude hodnota
                počítadla deliteľná číslom 3. Výskyt týchto signálov sa má zachytiť a vypísať na
                štandardný výstup programu.
            </li>
            <li>
                Vytvorte program, ktorý vytvorí nový proces potomok (simulujúci budík). Nech
                rodičovský proces žiada potomka (budík), aby ho ráno zobudil. Pošle procesu
                potomok signál. Potomok potvrdí, že ho zobudí. Pomocou funkcie <code>sleep()</code> sa
                odsimuluje noc. Potom nech potomok pošle rodičovskému procesu signál, že je
                čas vstávať. Rodičovský proces odpovie, že vstáva.
            </li>
            <li>
                Vytvorte program, ktorý vytvorí dva nové procesy, ktoré budú komunikovať cez
                nepomenovanú rúru. Jeden potomok zapíše do rúry dáta zadané z klávesnice
                a druhý túto správu prečíta z rúry. Tento cyklus sa opakuje päť krát. Na
                synchronizáciu zápisu do rúry a čítania z rúry použite signály. Proces rodič
                počká na ukončenie svojich potomkov.
            </li>
        </div>
    );
};

export default FifthSubtopicEighth;
