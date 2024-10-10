import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '../../../styles/LessonsStyles/SecondLesson.css'

const FirstSubtopicEleventh = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="first-subtopic" id="section-1">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služba jadra - socket()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>socket(), man socket</code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>syntax služby <code>socket()</code>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <li>využitiu služby <code>socket()</code></li>
                                <li>parametrom služby <code>socket()</code></li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>službu <code>socket()</code> pri vytvorení socketu
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vedieť:</td>
                            <td>využiť získané skúsenosti pri tvorbe
                                programov
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
                    <td>Pri riešenie svojej úlohy Sofia musí použiť komunikačný nástroj
                        socket, ktorý slúži na komunikáciu medzi procesmi. Aby ho mohla
                        využívať vo svojich procesoch, musí sa ho najprv naučiť vytvoriť a to
                        pomocou služby jadra <code>socket()</code>.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>KRÁTKY ÚVOD:</strong>
            </div>
            <strong>KROK1 – naučiť sa syntax a sémantiku služby jadra <code>socket()</code>:</strong> <br/>
            Socket môžeme prirovnať k mobilnému telefónu, ktorý si Sofia kúpila bez SIM karty.
            Sofia má už telefón, ale nemôže ho využívať na telefonovanie. Podobne je to aj so
            socketom, ktorý nám vytvorí služba <code>socket()</code> ako koncový bod pre komunikáciu. Jeho
            návratová hodnota je deskriptor (niečo ako ID vytvoreného socketu – integer), ktorý
            môže byť použitý pre prístup k socketu v rámci procesu.
            <br/>
            <p style={{textDecoration: 'underline'}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/types.h> 
#include <sys/socket.h> 
int socket(int domain, int type, int protocol);                         
                        `
                    }
                </code>
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika: </p>
            <li><code>socket()</code> vracia (socket) deskriptor pri úspešnom vykonaní alebo -1, ak nastane
                chyba
            </li>
            <div className={'annotations'}>Pre podrobnejšie informácie - <strong><code>man 2 socket</code></strong>.
            </div>
            <br/>
            <strong>KROK2 - pochopiť parametre služby:</strong><br/>
            Prvým parametrom je doména. Umožní Sofii určiť spôsob komunikácie, resp. určuje
            spôsob adresácie komunikačných uzlov a súbor dostupných protokolov (spôsobov
            komunikácie). Môžeme to prirovnať k výberu spôsobu komunikácie medzi ľuďmi –
            telefón, list, e-mail, skype a pod. Každý z týchto spôsobov komunikácie má svoj spôsob
            adresácie (tel. číslo, adresa bydliska, e-mailová adresa, skype adresa) a dostupné
            spôsoby komunikácie (napr. telefón – hovor alebo SMS). Ak chceme komunikovať
            prostredníctvom TCP/IPv4 protokolu, ako hodnotu parametra <code>domain</code> je potrebné
            uviesť symbolickú konštantu PF_INET. Každá socketová doména používa vlastný
            adresový formát
            br
            <table>
                <thead>
                <tr>
                    <th>DOMÉNY</th>
                    <th>POPIS</th>
                </tr>
                </thead>
                <tr>
                    <td>PF_UNIX</td>
                    <td>Lokálna komunikácia</td>
                </tr>
                <tr>
                    <td>PF_INET</td>
                    <td>IPv4 internetové protokoly</td>
                </tr>
                <tr>
                    <td>PF_INET6</td>
                    <td>IPv6 internetové protokoly</td>
                </tr>
                <tr>
                    <td>PF_IPX</td>
                    <td>IPX – Nowell protokoly</td>
                </tr>
                <tr>
                    <td>PF_APPLETALK</td>
                    <td>Appletalk DDP</td>
                </tr>
            </table>
            Druhým parametrom je typ socketu, teda spôsob komunikácie – ešte raz - môžeme to
            prirovnať k službám poskytovaným mobilným operátorom (SMS, hovory, internet,
            MMS, atď.), ktorého si Sofia vybrala. Argument <code>type</code> Sofii určí typ socketu, ktorý určí
            charakteristiku komunikácie. Možné hodnoty sú:
            <li><strong>SOCK_STREAM</strong> – jedná sa o spojovanú transportnú službu, v doméne IPv4 ide o
                protokol TCP. Parameter <code>SOCK_STREAM</code> používame v prípade, že chceme
                vytvoriť najprv spojenie medzi socketmi. Odoslané dáta budú potvrdzované a
                budú určenému procesu doručené v poradí, v akom sme ich odoslali (ale
                môžu ostať aj nedoručené – v tom prípade bude detegovaná chyba). </li>
            <li><strong>SOCK_DGRAM</strong> - je nespojovanou službou, v doméne IPv4 ide o protokol UDP.
                Tento socket môžeme používať pri posielaní správ s dopredu definovanou
                maximálnou veľkosťou, pričom nie je žiadna záruka, že správa bude
                doručená. Navyše, odosielateľ nemá možnosť sa dozvedieť, či správa
                doručená bola, alebo nie. Jedná sa o prenos bez vytvorenia spojenia medzi
                socketmi. Každá správa (datagram) musí obsahovať adresu cieľa.
            </li>
            <br/>

            Posledným parametrom je identifikátor protokolu. Pre naše potreby bude tento
            parameter nastavený na nulu. Hodnota nula znamená použitie defaultného protokolu. <br/> <br/>
            Ak chce Sofia používať protokol TCP/IP, zadáme ako posledný parameter hodnotu <strong>IPPROTO_TCP</strong>.
            Takže, ak bude chcieť vytvoriť socket pre spojovo orientovanú
            komunikáciu, použijeme službu <code>socket()</code> s týmito parametrami: <code>socket(AF_INET,
            SOCK_STREAM, IPPROTO_TCP);</code> <br/><br/>
            Typy parametrov <code>domain</code> a <code>type</code>, ktoré môžu byť použité spolu.
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>PF_UNIX</th>
                    <th>PF_INET</th>
                    <th>AF_NS</th>
                </tr>
                </thead>
                <tr>
                    <td><code>SOCK_STREAM</code></td>
                    <td>Áno</td>
                    <td>TCP</td>
                    <td>SPP</td>
                </tr>
                <tr>
                    <td><code>SOCK_DGRAM</code></td>
                    <td>Áno</td>
                    <td>UDP</td>
                    <td>IDP</td>
                </tr>
                <tr>
                    <td><code>SOCK_RAW</code></td>
                    <td></td>
                    <td>IP</td>
                    <td>Áno</td>
                </tr>
                <tr>
                    <td><code>SOCK_SEQPACKET</code></td>
                    <td></td>
                    <td></td>
                    <td>SPP</td>
                </tr>
            </table><br/> <br/>
            <strong>KROK3 – aplikovanie služby v programe:</strong> <br/>
            Sofia už pozná jednotlivé parametre služby <code>socket()</code>, preto môže vytvoriť jednoduchý
            program, v ktorom si vytvorí socket pre spojovanú komunikáciu s defaultne nastaveným
            protokol.
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/socket.h>
#include <stdio.h>

int main() {
    int s;

    s = socket(PF_INET, SOCK_STREAM, 0); //vytvorenie socketu 

    if (s == -1) 
        perror("socket");  //kontrala sluzby socket()
    else 
        printf("Socket vytvoren\\n jeho deskriptor je %d\\n", s);

    return 0;
}
                        `
                    }
                </code>
            </pre>
            <br/>
            <strong>KROK4:</strong><br/>
            Aké bolo číslo deskriptora socketu Vášho programu?: <br/> <br/>
            Výstup z programu:
            <pre className={'terminal-command'}>
$ <br/>
Socket vytvoreny <br/>
jeho deskriptor je __________<br/>
$
            </pre>
        </div>
    );
};

export default FirstSubtopicEleventh;
