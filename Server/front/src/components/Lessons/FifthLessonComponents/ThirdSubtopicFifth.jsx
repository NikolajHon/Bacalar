import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import Obr1 from '../../../images/FifthPageImg/Obr1.png'
import {languages} from "monaco-editor";

const ThirdSubtopicFifth = ({onComplete, completed}) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <div className="third-subtopic" id="section-3">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: <code>termios</code>, funkcie <code>tcgetattr(), tcsetattr()</code></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>ioctl(), man ioctl() </code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>
                                    štruktúru <code>termios</code> <br/>
                                    syntax funkcií <code>tcgetattr()</code>
                                    a <code>tcsetattr()</code> <br/>
                                    prečítať si manuálové stránky
                                    v Unixe/Linuxe, Linux dokumentačný
                                    projekt
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>parametrom funkcií</td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>tieto funkcie pri nastavovaní zariadení</td>
                            </tr>
                            <tr>
                                <td className="section-title">Vedieť:</td>
                                <td>využiť získané skúsenosti pri tvorbe programov</td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>15 minút</td>
                </tr>
                <tr>
                    <td className="section-title">Scenár</td>
                    <td>
                        Sofia chce vytvoriť program, ktorý si na začiatku od používateľa
                        vypýta zadanie hesla. Potrebuje zabrániť tomu, aby sa pri zadaní
                        hesla vypisovali zadávané znaky na obrazovku. Potrebuje vypnúť
                        echo pomocou štruktúry <code>termios</code>.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <strong>KROK1 – pochopiť štruktúru <code>termios</code>:</strong>
            Zmenu parametrov terminálu je možné dosiahnuť zmenou príznakov, načítaných do
            štruktúry <code>termios</code> . Jej štruktúra je definovaná v hlavičkovom súbore v <code>termios.h</code>
            alebo <code>termbits.h</code> (pre Linux). <br/><br/>
            Hodnoty, pomocou ktorých môžeme riadiť terminál, sú v štruktúre termios zoskupené
            do niekoľkých skupín: <strong>Vstup, Výstup, Riadiaci, Lokálny, Špeciálne riadiace znaky</strong>
            <br/>
            <br/>
            Štruktúra <code>termios</code> je deklarovaná nasledovne:
            <br/>
            <pre>
                <code className={'language-c'}>
                    {
                        ` 
            #include <termios.h> 
             
    struct termios { 
        tcflag_t c_iflag;  //vstupný režim 
        tcflag_t c_oflag;  //výstupný režim 
        tcflag_t c_cflag;  //riadiaci režim 
        tcflag_t c_lflag;  //lokálny režim 
        cc_t c_cc[NCCS];  //špeciálne riadiace znaky 
    } 
                        `
                    }
                </code>
            </pre>
            Pre bežné použitie sú zaujímavé iba príznaky pre posledné dva režimy.
            <ul>
                <li>
                    <code>tcflag_t c_lflag</code> je často definovaný ako <code>unsigned int</code> alebo <code>unsigned
                    long</code>
                </li>
                <li>
                    <code>cc_t</code> typ je nastavený na <code>unsigned char</code>.
                </li>
            </ul>
            <br/>
            Okrem toho ešte existuje štruktúra <code>termio</code> , ktorá predchádzala <code>termios</code>. Je
            definovaná
            v <code>termios.h</code>. Jej obsah je takmer totožný s <code>termios</code>, ukladá však iba 8 špeciálnych
            znakov. V operačnom systéme zostala z dôvodu kompatibility. V systéme sú definované
            funkcie, ktoré priradia údaje z <code>termio</code> do <code>termios</code> a naopak.
            Pozri <code>termios.h</code>. <br/>
            <br/>
            <strong>KROK2 – naučiť sa syntax a sémantiku funkcií na ovládanie terminálu:</strong> <br/>
            Štruktúru <code>termios</code> môžeme pre terminál inicializovať prostredníctvom funkcie
            <code>tcgetattr()</code>. Parametre terminálu nastavíme prostredníctvom funkcie <code>tcsetattr()</code>.
            Môžeme otestovať a modifikovať rôzne flagy a špeciálne znaky pre zvolenú pracú
            terminálu.
            <p style={{textDecoration: 'underline'}}>Syntax:</p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
    #include <termios.h> 
    int tcgetattr(int fd, struct termios *termptr); 
    int tcsetattr(int fd, int act, const struct termios *termptr);                     
                        `
                    }
                </code>
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika:</p>
            <ul>
                <li>Obe vrátia: 0 keď OK alebo -1, pri chybe</li>
            </ul>
            <br/>
            <strong>KROK3 – pochopiť parametre funkcií:</strong>
            Funkcia <code>tcgetattr()</code> zapíše aktuálne parametre terminálu do štruktúry, na ktorú
            odkazuje smerník <code>termptr</code>. Ak nastavíme terminál na iné hodnoty a chceme ich vrátiť
            späť do pôvodného stavu, stačí použiť znova<code> termptr</code>, do ktorého sme uložili pôvodné
            nastavenia
            Pole <code>act</code> , ktoré využíva funkcie <code>tcsetattr()</code>, riadi spôsob aplikovania zmien. Môže
            mať nasledujúce tri hodnoty:
            <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                <tr>
                    <th>Parameter <i>act</i></th>
                    <th>Význam</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>TCSANOW</td>
                    <td>Zmení hodnoty ihneď.</td>
                </tr>
                <tr>
                    <td>TCSDRAIN</td>
                    <td>Zmení hodnoty po dokončení aktuálneho vstupu.</td>
                </tr>
                <tr>
                    <td>TCSAFLUSH</td>
                    <td>Zmení hodnoty po dokončení aktuálneho vstupu, ale zruší celý vstup, ktorý je aktuálne k
                        dispozícii a nebol ešte vrátený funkciou read.
                    </td>
                </tr>
                </tbody>
            </table> <br/>
            <div className={'annotations'}>
                Podrobnejšie v man 3 termios.
            </div>
            <br/>
            <strong>Lokálne režimy</strong> <br/>
            Lokálne režimy sa nastavujú pomocou prepínačov ukladaných do poľa <code>c_lflag</code>
            štruktúry <code>termios</code>. Najdôležitejšie sú:
            <ul>
                <li><strong>ECHO</strong> - povolí lokálne vypisovanie znakov</li>
                <li><strong>ECHOE</strong> - po zachytení znaku Erase ho premení na sekvenciu Backspace –
                    medzera – Backspace
                </li>
                <li><strong>ICANON</strong> - povolí spracovanie kanonického vstupu</li>
            </ul>
            <br/>
            <strong>Príklad</strong> na potlačenie (vypnutie) vypisovania echa:
            <pre>
                <code className={'language-c'}>
                    {
                        `
    ... 
    struct termios nastavenia; 
    tcgetattr(fileno(stdin), &nastavenia); 
    nastavenia.c_lflag &= ~ECHO; 
    ... 
                        `
                    }
                </code>
            </pre>
            <strong>Príklad</strong> povolenie (zapnutie) vypisovania echa (explicitne): :
            <pre>
                <code className={'language-c'}>
                    {
                        `
    ... 
    struct termios nastavenia; 
    tcgetattr(fileno(stdin), &nastavenia); 
    nastavenia.c_lflag |= ECHO; 
    ... 
                        `
                    }
                </code>
            </pre>
            <br/>
            Povolenie vypisovania echa môžeme dosiahnuť aj použitím implicitných hodnôt
            nastavenia terminálu tým, že nastavíme terminál na hodnoty, aké mal pred potlačením
            vypisovania echa. Je dôležité, aby program obnovil pôvodné nastavenie terminálu na
            hodnoty, ktoré boli nastavené pred jeho spustením. Povinnosťou programu je vždy
            najprv tieto hodnoty uložiť a po skončení ich zasa obnoviť!
            <br/>
            <br/>
            <strong>KROK4 – oboznámiť sa s módmi terminálu: <br/>
                Terminal I/O má dva módy:</strong>
            <ul>
                <li>1. Kanonický mód – v tomto móde terminálový vstup je spracovávaný ako text.
                    Terminal vracia najviac jeden riadok pre čítanie.
                </li>
                <li>2. Nekanonický mód – vstupné znaky nie sú rozdelené do riadkov.</li>
            </ul>
            Kanonický mód je defaultne nastavený. Napr., ak shell presmeruje štandardný vstup na
            terminál a použijeme <code>read()</code> a <code>write()</code> na kopírovanie štandardného vstupu na
            štandardný výstup, terminál je v kanonickom móde, a každý <code>read()</code> vracia najviac
            jeden riadok. <br/>
            Programy ako napr. editor vi používajú nekanonický mód. Príkazy môžu byť jednotlivé
            znaky a nie sú ukončené znakom nového riadku. Taktiež, tento editor nepotrebuje
            systémové spracovanie špeciálnych znakov, ktoré môžu presahovať príkazy editora. <br/> <br/>
            Pole zo štruktúry <code>termios c_cc</code> slúži dvom odlišným účelom podľa toho, či je
            nastavený kanonický alebo nekanonický lokálny režim terminálu. <br/>
            <p><i style={{textDecoration: "underline"}}>Pre kanonický režim</i> sa nastavujú hodnoty poľa s
                indexmi ako VERASE, VKILL, VQUIT, atď.
            </p>
            <p>
                <code>struktura.c_cc[VERASE]</code> = ascii hodnota znaku, ktorý bude použitý pre operáciu erase <br/>
                <code>struktura.c_cc[VKILL]</code> = ascii hodnota znaku pre signál kill
            </p>

            <p><i style={{textDecoration: "underline"}}>Pre kanonický režim</i> sú najzaujímavejšie indexy
                VMIN a
                VTIME, ktoré riadia čítanie vstupu.
            </p>
            <p>
                <code>struktura.c_cc[VMIN]</code> = MIN <br/>
                <code>struktura.c_cc[VTIME]</code> = TIME
            </p>
            <p>Môžu nastať štyri prípady:</p>
            <ul>
                <li><strong>MIN = 0, TIME = 0</strong> - služba <code>read()</code> ihneď končí. Ak sú dostupné nejaké
                    znaky, budú vrátené.
                </li>
                <li><strong>MIN = 0, TIME > 0</strong> - služba <code>read()</code> skončí až bude k dispozícii nejaký
                    znak alebo uplynie TIME. Funkcia vráti počet načítaných znakov.
                </li>
                <li><strong>MIN > 0, TIME = 0</strong> - služba <code>read()</code> čaká, kým nenačíta aspoň MIN znakov
                    a potom vráti počet načítaných znakov.
                </li>
                <li><strong>MIN > 0, TIME > 0</strong> - služba <code>read()</code> najprv čaká na prvý znak. Služba
                    končí po načítaní aspoň MIN znakov alebo ak doba medzi načítaním dvoch znakov prekročí TIME.
                </li>
            </ul>
            <pre className='image-container'>
                <img src={Obr1} alt="Obr1"/>
            </pre>
            <br/> <br/>
            POZNAMKA: V UNIXe/Linuxe na čítanie znakov z klávesnice, na rozdiel od
            prostredia niektorých iných OS, sa používa iba služba <code>read()</code>. Preto ak chceme čítať
            znaky z klávesnice bez čakania (= testovať, či bol stlačený nejaký kláves, alebo nie)
            musíme zmeniť terminálovú (linkovú) disciplínu tak, ako je to uvedené vyššie.
            <br/> <br/>
            <strong>KROK5 – aplikácia funkcií v programoch:</strong> <br/>
            Program vypne echo a vyžiada zadanie hesla. Po zdaní hesla je echo znovu zapnuté
            a zadávané znaky vypísané na obrazovku. Zmena parametrov terminálu je vykonaná
            pomocou funkcií <code>tcgetattr()</code> a <code>tcsetattr()</code>.

            <pre>
                <code className={'language-c'}>
                    {
                        `
    #include <termios.h> 
    #include <stdio.h> 
    #include <stdlib.h> 
    
    #define PASSWORD_LEN 8 
    
    int main() 
    { 
        struct termios initialrsettings, newrsettings; 
        char password[PASSWORD_LEN + 1]; 
    
        tcgetattr(fileno(stdin), &initialrsettings);   
        // ziskame nastavenia standardneho vstupu 
        newrsettings = initialrsettings;       // kopia povodneho nastavenia 
        newrsettings.c_lflag &= ~ECHO;         // vypneme priznak ECHO 
        printf("Enter password: ");            // zadanie hesla
    
        if (tcsetattr(fileno(stdin), TCSAFLUSH, &newrsettings) != 0) { 
            // zabranime vypisovanie znakov na obrazovku 
            fprintf(stderr, "Could not set attributes \\n"); 
        }  
        else { 
            fgets(password, PASSWORD_LEN, stdin);        // nacitame heslo 
            tcsetattr(fileno(stdin), TCSANOW, &initialrsettings);   
            // nastavime povodne nastavenia terminalu 
            fprintf(stdout, "\\nYou entered %s \\n", password);   
            // zobrazime heslo
        } 
    
        exit(0); 
    } 
                        `
                    }
                </code>
            </pre>
            <div className="title-box">
                <strong>ÚLOHY NA SAMOSTATNÚ PRÁCU: </strong>
            </div>
            <ul>
                <li style={{border: '1px solid black', padding: '5px'}}>Vyskúšajte si ďalšie funkcie, ktoré poskytujú
                    príkazy <code>stty</code> a <code>tty</code>.
                </li> <br/>
                <li style={{border: '1px solid black', padding: '5px'}}>Vyskúšajte si ďalšie funkcie, ktoré poskytuje
                    služba jadra <code>ioctl()</code>.
                </li> <br/>
                <li style={{border: '1px solid black', padding: '5px'}}>Do už existujúceho programu s určitou funkciou
                    implementujte zadávanie hesla
                    na začiatku behu programu. Rozhranie pre zadávanie hesla navrhnite tak, aby sa
                    heslo nezobrazovalo a aby každé heslo malo konštantnú dĺžku 5 znakov. Pri
                    zadaní piateho znaku hesla sa overovanie správnosti vykoná automaticky (t.j.
                    bez použitia klávesu Enter).
                </li> <br/>
                <li style={{border: '1px solid black', padding: '5px'}}>Vytvorte program, ktorý načíta vstup z
                    klávesnice a vypíšte ho na štandardný
                    výstup. Po vypísaní vstupu opäť program načíta vstup z klávesnice, ale pred
                    vstupom z klávesnice potlačí vypisovanie echo pomocou štruktúry <code>termios</code>.
                    (Nastavenie terminálu na konci programu vráťte do pôvodného stavu!).
                </li> <br/>
                <li style={{border: '1px solid black', padding: '5px'}}>Vytvorte program, ktorý pred vstupom z
                    klávesnice potlačí vypisovanie echa
                    pomocou štruktúry <code>termios</code> s využitím nekanonického režimu (Nastavenie
                    terminálu vráťte do pôvodného stavu!). Nastavte nekanonický režim a hodnoty
                    MIN a TIME:
                    <ul>
                        <li>1. MIN = 2, TIME = 0</li>
                        <li>2. MIN = 0, TIME = 5000</li>
                        <li>3. MIN = 5, TIME = 2000</li>
                    </ul>
                </li>
            </ul>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default ThirdSubtopicFifth;
