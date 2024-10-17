import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const SecondSubtopicEleventh = ({onComplete, completed}) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="second-subtopic" id="section-2">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služby jadra - bind()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>bind(), man bind</code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>syntax služby <code>bind()</code>:</td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>
                                    <li>
                                        dôvodu zviazania socketu s IP adresou a
                                        portom
                                    </li>
                                    <li>chybovým hláseniam</li>
                                    <li>parametrom služby <code>bind()</code></li>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>službu <code>bind()</code> pri práci so socketmi</td>
                            </tr>
                            <tr>
                                <td className="section-title">Vedieť:</td>
                                <td>využiť získané skúsenosti pri tvorbe
                                    programov
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>20 minút</td>
                </tr>
                <tr>
                    <td className="section-title">Scenár</td>
                    <td>Sofia si v prvej časti riešenie úlohy vytvorila socket pomocou služby
                        jadra <code>socket()</code>. Aby mohol byť socket využívaný procesom v rámci
                        skupiny počítačov, musí ho zviazať s IP adresou a portom. Nato sa
                        využije službu jadra <code>bind()</code>.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <strong>KROK1 – naučiť sa syntax a sémantiku služby jadra <code>bind()</code>:</strong> <br/>
            Sofia navštívila pobočku vybraného mobilného operátora, aby si mohla kúpiť SIM
            kartu, ktorá jej priradí jedinečné telefóne číslo (IP adresa) a tiež jej poskytne služby
            v rámci jej telefónneho programu SMS, MMS, internet, hovory, atď. (port). Po vložení
            SIM karty do telefónu Sofia už môže využívať telefón na komunikáciu. Podobne ako
            SIM karta, tak aj služba <code>bind()</code> zviaže, resp. priradí socketu IP adresu a port. Po
            zviazaní službou <code>bind()</code> socket môžeme využívať na komunikáciu medzi procesmi
            v rámci počítačovej siete. <br/> <br/>
            <p style={{textDecoration: 'underline'}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/socket.h> 
int bind (int socket, struct sockaddr *address, int address_len);                         
                        `
                    }
                </code>
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika: </p>
            <li><code>bind()</code> vracia - 0 pri úspešnom vykonaní alebo -1, ak nastala chyba</li>
            <div className={'annotations'}>
                Pre podrobnejšie informácie - <strong><code>man 2 bind.</code></strong>
            </div>
            <br/>
            <strong>KROK2 - pochopiť parametre služby:</strong> <br/>
            Prvým parametrom je <code>socket</code>. Parameter špecifikuje socket (prostredníctvom jeho
            deskriptora), ktorý má byť “zviazaný” s adresou. (deskriptor sme získali pomocou
            služby <code>socket()</code>.) <br/>
            Druhým parametrom je <code>address</code>. Ukazuje na <code>sockaddr</code> štruktúru, formát ktorej je
            určený doménou alebo požadovaným správaním socketu. <code>Sockaddr</code> štruktúra zahrňuje
            štruktúry <code>sockaddr_in</code> a <code>sockaddr_un</code>, to závisí od toho, ktorá z podporovaných
            address family (rodiny adries) je práve využívaná. <br/>
            Tretím parametrom je <code>address_len</code>. Určuje dĺžku štruktúry <code>sockaddr</code>, určenú
            parametrom <code>address</code>. <br/> <br/>
            <strong>KROK3 - oboznámiť sa so štruktúrou <code>sockaddr</code> a jej položkami:</strong> <br/>
            Proces potrebuje na nadviazanie spojenia socket, IP adresu stroja a portu ktorý je na nej
            určený pre pripájanie. Adresa je súčasťou štruktúry:
            <pre>
                <code className={'language-c'}>
                    {
                        `
struct sockaddr {         
    unsigned short sa_family;   // typ komunikačného socketu AF nie PF 
    char sa_data[14];        // 14 bytov protokolovej adresy   
};  
                        `
                    }
                </code>
            </pre>
            Položka štruktúry <code>sa_data[14]</code> obsahuje cieľovú adresu a číslo portu pre daný socket.
            Pre IPv4 budeme používať odvodenú štruktúru <code>sockaddr_in</code>, ktorá je definovaná
            v hlavičkovom súbore <code>&lt;netinet/in.h&gt;</code> v tvare:
            <pre>
                <code className={'language-c'}>
                    {
                        `
struct sockaddr_in {         
    short int      sin_family;   //typ komunikačného socketu AF nie PF 
    unsigned short int sin_port;    // 2 byty cislo portu         
    struct in_addr sin_addr;        // 4 byty actual IP address        
    unsigned char  sin_zero[8];     // zvysnych 8 bytov nulujeme     
};                       
                        `
                    }
                </code>
            </pre>
            <strong>KROK4 – aplikovanie služby v programe:</strong> <br/>
            Sofia si vytvorí program, v ktorom si vyskúša zviazať socket s IP adresou a portom
            pomocou služby <code>bind()</code>.
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <stdio.h> 
#include <stdlib.h> 
#include <string.h> 
#include <netinet/in.h> 
#include <sys/socket.h> 
 
#define MYPORT 3490    //port, na ktory sa budu uzivatelia pripajat 
 
int main() 
{ 
    int s;   
    struct sockaddr_in my_addr;    /* struktura obasahujuca informacie o 
                                    mojej adrese*/ 
    int sin_size; 
 
    if ((s = socket(PF_INET, SOCK_STREAM, 0)) == -1) { 
        perror("socket");          //vytvorenie socketu 
        exit(1); 
        }  
    my_addr.sin_family = AF_INET; //naplnenie struktury sockaddr_in      
    my_addr.sin_port = htons(MYPORT);      
    my_addr.sin_addr.s_addr = INADDR_ANY;  
    bzero(&(my_addr.sin_zero), 8);         
 
    //zviazanie socketu sluzbou bind() 
    if(bind(s,(struct sockaddr *)&my_addr, sizeof(struct sockaddr))==-1){ 
        perror("bind"); 
        exit(1); 
    } 
}                       
                        `
                    }
                </code>
            </pre>
            <strong>Opis predchádzajúceho programu:</strong> <br/>
            Najprv si Sofia vytvorí socket pre spojovanú komunikáciu s defaultne nastaveným
            protokolom pomocou služby <code>socket()</code>. Aby mohla zviazať IP adresu a port so
            socketom službou <code>bind()</code>, musí najprv naplniť štruktúru <code>sockaddr_in</code>. Všetky príkazy
            začínajúce <code>my_addr</code> slúžia na napĺňanie štruktúry <code>sockaddr_in</code>. V závislosti od
            architektúry procesora, počítače uchovávajú čísla v pamäti rôznym spôsobom
            (endianita). Funkcia <code>htons()</code> zabezpečí transformáciu endianity počítača na endianitu
            siete. Funkcia <code>bzero()</code> nám doplní reťazec <code>my_addr.sin_zero</code> o 8 núl. <br/>
            Sofia sa musí rozhodnúť, akú IP adresu priradí socketu. Ak by za adresu počítača
            dosadila adresu 127.0.0.1 (localhost), v tom prípade by sa mohla na proces server
            pripojiť iba z lokálneho počítača. Ak chce očakávať spojenie z akéhokoľvek rozhrania,
            vloží do atribútu symbolickú konštantu <code>INADDR_ANY</code>. <br/> <br/>
            Základnou podmienkou komunikácie je získanie adresy komunikujúcich strán. To môže
            byť vykonané v nasledujúcich krokoch: <br/> <br/>
            <strong>Rozlíšenie adresy</strong> <br/>
            V prípade, že máme meno uzla (host), ktorý sa má podieľať na komunikácii, jeho IP
            adresu zistíme pomocou funkcie <code>gethostbyname(char *hostname)</code>, ktorá vracia
            smerník na štruktúru <code>hostent</code>, ktorej definícia je:
            <pre>
                <code className={'language-c'}>
                    {
                        `
struct hostent { 
    char*   h_name;      //oficialne meno hostu     
    char**  h_aliases;   //smernik na zoznam aliasov (iných mien)    
    int     h_addrtype;  //typ adresy     
    int     h_length;    //dlzka adresy     
    char**  h_addr_list; //smernik na zoznam adries ak ich ma viac   
};                         
                        `
                    }
                </code>
            </pre>
            <strong>Postupnosť bajtov</strong> <br/>
            Na to, aby sme sformovali adresy do potrebného tvaru pre komunikáciu, použijeme
            sieťovú postupnosť bajtov. Našťastie, väčšina sieťových funkcií akceptuje adresy
            v hostovej postupnosti bajtov a vracajú výsledok v sieťovej postupnosti. Preto je
            zvyčajne potrebné zmeniť na sieťovú postupnosť bajtov jedine čísla portov, keďže pre
            zadávanie IP adresy vo zvyčajnom tvare sú systémom poskytované špeciálne funkcie
            (<code>inet_addr()</code> je funkcia, ktorá zmení reťazec znakov IP adresy do 4 bajtovej sieťovej
            postupnosti). Ak chceme získať IP adresu v čitateľnom tvare, použijeme funkciu
            <code>inet_ntoa()</code>. Preklad čísel do sieťovej postupnosti vykonávajú nasledujúce funkcie:
            <li><code>htons()</code> – krátke celé čísla z hostovej postupnosti do sieťovej (pre porty).</li>
            <li><code>ntohs()</code> – krátke celé čísla zo sieťovej do hostovej postupnosti (pre porty).</li>
            <li><code>htonl()</code> – dlhé celé čísla z hostovej do sieťovej postupnosti (pre IP adresy).</li>
            <li><code>ntohl()</code> – dlhé celé čísla zo sieťovej do hostovej postupnosti (pre IP adresy).</li>
            <br/>
            <strong>Sformovanie adresy</strong> <br/>
            Formovanie adresy pre internetové protokoly sa uskutočňuje pomocou štruktúry
            <code>sockaddr_in.</code>
            <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>

    );
};

export default SecondSubtopicEleventh;
