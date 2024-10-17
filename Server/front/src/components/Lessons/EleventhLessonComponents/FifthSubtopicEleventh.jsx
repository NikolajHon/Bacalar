import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const FifthSubtopicEleventh = ({onComplete, completed}) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="fifth" id="section-5">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služba jadra - connect ()
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>connect(), man connect()</code>, model klient/server</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td> syntax služby <code>connect()</code>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <li>prijatie – vyžiadanie - ukončenie spojenia</li>
                                <li>chybovým hláseniam</li>
                                <li>parametrom služby <code>connect()</code></li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>službu <code>connect()</code> pri práci so socketmi
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vedieť:</td>
                            <td>využiť získané vedomosti pri tvorbe
                                programov
                            </td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>20 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Sofia sa už naučila vytvárať servrovské procesy. Teraz je čas, aby
                        vytvorila klientsky proces. Dozvedela sa, že tak ako pre serverovský
                        proces, aj pre klientsky proces musí vytvoriť socket pomocou
                        služby <code>socket()</code>. To sa jej podarilo. Teraz chce nadviazať spojenie
                        so vzdialeným počítačom (serverom). Potrebuje svoj klientsky
                        proces pripojiť na serverovský proces a vytvoriť spojenie medzi
                        socketmi týchto procesov. K tomu jej pomôže služba <code>connect()</code>.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <strong>KROK1 – naučiť sa syntax a sémantiku služby jadra <code>connect()</code>:</strong> <br/>
            Sofia potrebuje zavolať svojej kamarátke pomocou jej telefónu. Najprv musí zadať jej
            telefóne číslo (IP adresa), aby mohla uskutočniť telefonické spojenie. Podobne je to aj
            so službou <code>connect()</code>, ktorá vytvára spojenie medzi dvoma procesmi (využíva sa na
            strane klienta). Jadro nastaví komunikačné linky medzi socketmi, pričom oba sockety
            musia používať ten istý adresný formát a protokol. Táto služba vykonáva rôzne činnosti
            pre každý z nasledujúcich typov socketov: <br/> <br/>
            <li>Ak socket je SOCK_DGRAM, služba <code>connect()</code> vytvorí peer adresu. Peer adresa
                identifikuje socket ktorému sú zaslané všetky dáta následnou službou <code>send()</code>.
                Taktiež identifikuje socket, z ktorého môžu byť dáta prijímané. Ale nie je žiadna
                záruka, že dáta budú doručené. Jedná sa o prenos bez vytvorenia spojenia medzi
                socketmi (nespojovaná služba).
            </li>
            <br/>
            <li>Ak socket je SOCK_STREAM, služba <code>connect()</code> sa pokúša nadviazať spojenie so
                socketom špecifikovaným parametrom <code>serv_addr</code> (spojovaná služba). Formát
                parametra <code>serv_addr</code> je určený doménou a požadovaným správaním socketu.
            </li>
            <p style={{textDecoration: 'underline'}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/socket.h> 
int connect(int sockfd, const struct sockaddr *serv_addr, 
socklen_t addrlen);                         
                        `
                    }
                </code>
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika: </p>
            <li><code>connect()</code> vracia - 0 pri úspešnom vykonaní alebo -1, ak nastane chyba.</li>
            <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie - <strong><code>man 2 connect.</code></strong>
            </div>
            <br/>
            <strong>KROK2 - pochopiť parametre služby:</strong> <br/>
            Prvým parametrom je <code>sockfd</code>, ktorý špecifikuje deskriptor socketu. Druhým
            parametrom je <code>address</code>. Ukazuje na <code>sockaddr</code> štruktúru, ktorá obsahuje IP adresu
            a port procesu (vzdialeného stroja - servera), na ktorý sa chceme pripojiť. Jej formát je
            určený doménou alebo požadovaným správaním socketu. Tretím parametrom je
            <code>address_len</code>. Určuje dĺžku štruktúry <code>sockaddr</code>, určenú
            parametrom <code>address</code>.
            <br/> <br/>
            <strong>KROK3 – odosielanie a príjem dát:</strong> <br/>
            Odosielanie dát: Na odosielanie dát slúži služba <code>send()</code>
            <p style={{textDecoration: 'underline'}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
int send(int s, const void *msg, size_t len, int flags); 
                        `
                    }
                </code>
            </pre>
            Príjem dát: Na príjem dát slúži služba <code>recv()</code>.
            <p style={{textDecoration: 'underline'}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
int recv(int s, void *buf, size_t len, int flags);
                        `
                    }
                </code>
            </pre>
            <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie - <strong><code>man 2 send a man 2
                recv</code></strong>.
            </div>
            <br/>
            Ukončenie spojenia: Socket uzavrieme rovnako ako súbor službou <code>close()</code> <br/> <br/>
            <strong>Uzavretie socketu:</strong> <br/>
            Socketové prepojenie môžeme ukončiť na serveri alebo u klienta pomocou služby
            <code>close()</code>. Socket sa musí vždy zatvárať na obidvoch stranách. Na serveri sa zatvára,
            keď <code>recv()</code> vráti nulu, ale <code>close()</code> sa môže zablokovať, pokiaľ ma socket ešte
            neodoslané dáta.
            <div className={'title-box'}><strong>Príklad</strong></div>
            <strong>KROK1 – aplikovanie služieb v programe:</strong> <br/>
            Nasledujúce programy prezentujú jednoduchý serverovský a klientský proces.
            Používajú na komunikáciu sockety a spojovanú transportnú službu v Internetovej
            doméne IPv4. Predtým, než si opíšeme samotný kód, skompilujte obidva programy
            a spusťte ich, aby ste mali možnosť vidieť, čo robia. Klienta skopírujte do súboru <i>klient.c</i> a server
            do súboru <i>server.c</i>. Ideálne by bolo, aby ste server a klient spustili na
            dvoch rôznych počítačoch. Najprv spustite server, potrebujete mu odovzdať číslo portu
            ako argument. Môžete si vybrať akékoľvek číslo medzi 1024 a 65535. Ak je ten
            náhodný port už používaný, server vám to oznámi a program skončí. Potom si zvoľte
            iné číslo a skúste znova. <br/> <br/>
            Spustiť server môžete napríklad takto: .<code>/server 51717</code> <br/>
            Na to, aby ste spustili klienta, potrebujete mu odovzdať dva argumenty:
            <li> adresu počítača, na ktorom beží proces server</li>
            <li> číslo portu, na ktorom server čaká na pripojenie</li>
            <br/>
            Pripojenie k serveru môžeme uskutočniť takto: <code>./client alfa.intrak.sk 51717</code> <br/>
            Klient vás požiada, aby ste zadali správu. Ak všetko ide tak ako má, server zobrazí
            Vašu správu na štandardnom výstupe, pošle potvrdenie správy klientovi a skončí. Klient
            zobrazí potvrdzujúcu správu od servera a skončí. <br/> <br/>
            Ak spúšťate tieto dva programy na jednom PC, otvorte si jedno okno na server a jedno
            na klienta. Potom ako prvý argument pre klienta uvediete localhost. <br/> <br/>
            Výstup z programu server:
            <div className={'terminal-command'}>$ <br/>
                ./server 51717 <br/>
                Here is the message: posielam pozdrav serveru <br/>
                $ </div>
            <br/>
            Výstup z programu klient:
            <div className={'terminal-command'}>
                $ <br/>
                ./klient localhost 51717 <br/>
                Please enter the message: posielam pozdrav serveru <br/>
                I got your message <br/>
                $
            </div>
            <br/> <br/>
            <h4>Server</h4>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <stdio.h> 
#include <stdlib.h> 
#include <string.h> 
#include <sys/socket.h> 
#include <netinet/in.h> 
 
void error(char *msg)  
{                //tato funkcia sa vyuziva ked systemove volanie zlyha 
    perror(msg); //vypise spravu o chybe a ukonci program server 
    exit(1); 
} 
 
int main(int argc, char *argv[]) 
{ 
     int sockfd, newsockfd, portno, clilen, n; //pomocne premenne 
     char buffer[256];         //buffer pre ulozenie znakov zo socketu 
     struct sockaddr_in serv_addr; //obsahuje adresu servera 
     struct sockaddr_in cli_addr;  //obsahuje adresu klienta 
 
     if (argc < 2) {                //kontrola poctu argumentov 
         fprintf(stderr,"ERROR, no port provided\\n"); 
         exit(1); 
     } 
                                    //vytvorenie socketu 
     sockfd = socket(PF_INET, SOCK_STREAM, 0); 
     if (sockfd < 0) error("ERROR opening socket"); 
                                    //naplnenie struktury sockaddr_in  
     bzero((char *) &serv_addr, sizeof(serv_addr)); 
     portno = atoi(argv[1]); 
     serv_addr.sin_family = AF_INET; 
     serv_addr.sin_addr.s_addr = INADDR_ANY; 
     serv_addr.sin_port = htons(portno); 
                                    //zviazanie socketu sluzbou bind() 
     if (bind(sockfd, (struct sockaddr *) &serv_addr,    
              sizeof(serv_addr)) < 0)  
              error("ERROR on binding"); 
                                    
     listen(sockfd,5);              //vytvorime si front poziadaviek 
     clilen = sizeof(cli_addr);     //velkost struktury adresy klienta 
                                    //akceptovanie spojenia 
     newsockfd = accept(sockfd,(struct sockaddr *) &cli_addr,&clilen); 
     if (newsockfd < 0) error("ERROR on accept"); 
                                   
     bzero(buffer,256);             //spracovanie dat od klientov 
     n = read(newsockfd,buffer,255); 
     if (n < 0) error("ERROR reading from socket"); 
 
     printf("Here is the message: %s\\n",buffer); 
 
     n = write(newsockfd,"I got your message",18); 
     if (n < 0) error("ERROR writing to socket"); 
 
     return 0;  
}                        
                        `
                    }
                </code>
            </pre>
            <br/> <br/>
            <h4>Klient</h4>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <stdio.h> 
#include <stdlib.h> 
#include <string.h> 
#include <sys/socket.h> 
#include <netinet/in.h> 
#include <netdb.h>  
 
void error(char *msg) 
{                //tato funkcia sa vyuziva ked systemove volanie zlyha 
    perror(msg); //vypise spravu o chybe a ukonci program server 
    exit(0); 
} 
 
int main(int argc, char *argv[]) 
{ 
    int sockfd, portno, n;        //pomocne premenne 
    struct sockaddr_in serv_addr; //obsahuje adresu servera 
    struct hostent *server;       //informacie o vzdialenom pocitaci 
    char buffer[256];         //buffer pre ulozenie znakov zo socketu 
 
    if (argc < 3) {                   //kontrola poctu argumentov 
       fprintf(stderr,"usage %s hostname port\\n", argv[0]); 
       exit(0); 
    } 
    portno = atoi(argv[2]);           //cislo portu servera 
                                      //vytvorenie socketu 
    sockfd = socket(PF_INET, SOCK_STREAM, 0); 
    if (sockfd < 0) error("ERROR opening socket"); 
                                     //hostname pc server 
    server = gethostbyname(argv[1]); 
    if (server == NULL) { 
        fprintf(stderr,"ERROR, no such host\\n"); 
        exit(0);} 
                                     //naplnenie struktury sockaddr_in 
    bzero((char *) &serv_addr, sizeof(serv_addr)); 
    serv_addr.sin_family = AF_INET; 
    bcopy((char *)server->h_addr,(char *)&serv_addr.sin_addr.s_addr, 
         server->h_length); 
    serv_addr.sin_port = htons(portno); 
                                    //vytvorenie spojenia 
    if (connect(sockfd, (struct sockaddr *) &serv_addr,  
        sizeof(serv_addr)) < 0)  
        error("ERROR connecting"); 
                                    //spracovanie dat  
    printf("Please enter the message: "); 
    bzero(buffer,256); 
    fgets(buffer,255,stdin);        //zadanie znakov z klavesnice 
 
    n = write(sockfd,buffer,strlen(buffer)); 
    if (n < 0)         
         error("ERROR writing to socket"); 
    bzero(buffer,256); 
    n = read(sockfd,buffer,255); 
    if (n < 0)  
         error("ERROR reading from socket"); 
    printf("%s\\n",buffer); 
    return 0; 
}                      
                        `
                    }
                </code>
            </pre>
            <h5>Vysvetlenie programu server:</h5>
            Pre program <code>server.c</code> vytvárame socket, ktorý využíva spojovanú transportnú službu
            v Internetovej doméne IPv4. Aby sme mohli komunikovať v rámci počítačovej siete,
            postačí k zviazaniu socketu službou <code>bind()</code> na strane servera iba port (na ktorom server
            akceptuje spojenia), ktorý získame ako parameter odovzdaný programu server. Potom
            musíme vytvoriť front, do ktorého sa budú ukladať požiadavky na spojenie (službou
            <code>listen()</code>). Požiadavky na spojenie musíme z frontu vyberať postupne (služba
            <code>accept()</code>). Ak vo fronte nie je žiadna požiadavka na spojenie, proces server počká,
            kým nejaká požiadavka nedôjde. Služba <code>accept()</code> nám vráti nový socket, pomocou
            ktorého budeme komunikovať s procesom-klientom. Na príjem a odosielanie dát
            využívame služby <code>read()</code> a <code>write()</code>, ktoré obsahujú počet znakov prečítaných alebo
            zapísaných. Server zobrazí správu od klienta na štandardnom výstupe, pošle potvrdenie
            správy klientovi a skončí. <br/> <br/>
            <h5>Vysvetlenie programu klient:</h5>
            Pre program <code>klient.c</code> vytvárame socket, ktorý využíva spojovanú transportnú službu
            v Internetovej doméne IPv4 (klientské sockety neviažeme službou <code>bind()</code>). Aby sme
            mohli komunikovať v rámci počítačovej siete so serverom, potrebujeme jeho IP adresu
            a port, ktoré získame ako parametre odovzdané programu klient. IP adresu počítača
            môžeme zadať ako hostname (názov počítača). K identifikácii počítača potrebujeme IP
            adresu, ktorú získame funkciu <code>gethostbyname()</code> (vyplní štruktúru <code>hostent *server</code> –
            informácie o vzdialenom počítači). Keď už sme získali IP adresu a port, program
            vyplní štruktúru <code>sockaddr_in serv_addr</code>. Proces-klient sa pripája na proces server
            systémovým volaním <code>connect()</code>,ktoré využíva štruktúru <code>sockaddr_in serv_addr</code>.
            Na príjem a odosielanie dát využívame služby <code>read()</code> a <code>write()</code>, ktoré obsahujú
            počet
            znakov prečítaných alebo zapísaných. Klient vás požiada, aby ste zadali správu a odošle
            ju. Zobrazí potvrdzujúcu správu od servera a skončí.
            <div className={'title-box'}>ÚLOHY NA SAMOSTATNÚ PRÁCU:</div>
            <li>Vytvorte socket, ktorý bude využívať protokol UDP. Overte si činnosť služby
                <code>socket()</code> aj pre ostatné protokoly.
            </li>
            <li>Aký je rozdiel medzi socketmi na strane servera a na strane klienta?</li>
            <li>Modifikujte predchádzajúci program <code>server.c</code> tak, aby na ošetrenie
                prichádzajúceho spojenia využíval nový proces (<code>fork()</code>). Proces rodič
                programu server prijíma požiadavky na spojenie a jeho proces potomok
                vykonáva komunikáciu s klientom (prijíma dáta). Proces rodič pokračuje
                v akceptovaní ďalších požiadaviek o spojenie.
            </li>
            <li>Vytvorte dva nezávislé programy, ktoré používajú na komunikáciu
                sockety nespojovanej služby (protokol UDP) v Internetovej doméne.
            </li>
            <br/> <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default FifthSubtopicEleventh;
