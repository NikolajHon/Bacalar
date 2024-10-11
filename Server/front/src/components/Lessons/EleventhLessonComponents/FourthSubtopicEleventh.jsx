import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const FourthSubtopicEleventh = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="fourth-subtopic" id="section-4">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služba jadra - accept() </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>accept(), man accept()</code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>syntax služby <code>accept()</code>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <li>prijatiu – vyžiadaniu - ukončeniu spojenia </li>
                                <li>chybovým hláseniam </li>
                                <li>parametrom služby <code>accept()</code></li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>službu <code>accept()</code> pri práci so socketmi
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
                    <td>10 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Sofia pokračuje vo vytváraní procesu server, v ktorom už vytvorila
                        socket zviazaný s IP adresou a portov. Už má front pre zapamätanie
                        nevybavených požiadaviek. Teraz sa potrebuje naučiť, ako vybrať
                        z frontu požiadavku na spojenie. Zistila, že k tomu jej poslúži služba
                        <code>accept()</code>
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <strong>KROK1 – naučiť sa syntax a sémantiku služby jadra <code>accept()</code>:</strong> <br/>
            Sofii prišla na jej telefón požiadavka o hovor. Ak chce vytvoriť telefonické spojenie
            a nadviazať komunikáciu, musí ju najprv potvrdiť. Podobne je to so službou accept(),
            ktorá sa využíva v procese server pre vyber požiadavky z frontu čakajúcich požiadaviek
            o spojenie a potvrdí ju. Pre každé prijaté spojenie sa vytvorí nový socket. Potom cez
            tento nový socket prebieha komunikácia. Tento sám o sebe nemôže prijať ďalšie
            spojenia, ale pôvodný (ktorý prijal požiadavku) socket je otvorený a ten môže prijať
            ďalšie spojenia. Ak je front prázdny, bez ďalších požiadaviek na spojenie, služba
            accept() blokuje proces server (uspí proces), až pokiaľ nie je prítomná požiadavka na
            spojenie.
            <p style={{textDecoration: 'underline'}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/socket.h> 
int accept (int socket, struct sockaddr *restrict addr, 
socklen_t *restrict len);                        
                        `
                    }
                </code>
            </pre>
            <p style={{textDecoration:'underline'}}>Sémantika:</p>
            <li><code>accept()</code> vracia  - nezáporný (socket) descriptor pri úspešnom vykonaní alebo -1,
                ak nastane chyba</li> <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie - <strong><code>man 2 accept</code></strong>. </div>
 <br/>
            <strong>KROK2 - pochopiť parametre služby:</strong> <br/>
            Prvým parametrom je <code>socket</code>. Určuje socket, ktorý bol vytvorený službou <code>socket()</code>,
            bol zviazaný s adresou a má vytvorený backlog službou listen(). Druhým
            parametrom je <code>address</code>. Ukazuje na <code>sockaddr</code> štruktúru, ktorá bude obsahovať
            IP adresu a port klientskeho procesu (vzdialeného stroja), ktorý sa pripojil k procesu
            server. Jej formát je určený doménou alebo požadovaným správaním socketu. Môžeme
            nastaviť na NULL, čím určíme, že adresa nie je potrebná (v rámci jedného stroja).
            Tretím parametrom je <code>address_len</code>. Určuje dĺžku štruktúry <code>sockaddr</code>, určenú
            parametrom <code>address.</code> Ak je parameter address nastavený na NULL, potom je tento
            parameter ignorovaný.
        </div>
    );
};

export default FourthSubtopicEleventh;
