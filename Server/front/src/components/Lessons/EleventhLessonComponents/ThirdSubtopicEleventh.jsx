import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const ThirdSubtopicEleventh = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="third-subtopic" id="section-3">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služba jadra - listen()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>listen(), man listen()</code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>syntax služby <code>listen()</code>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>
                                    <li>parametrom služby <code>listen()</code></li>
                                    <li>socketovému frontu</li>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>službu <code>listen()</code> pri práci so socketmi</td>
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
                    <td>10 minút</td>
                </tr>
                <tr>
                    <td className="section-title">Scenár</td>
                    <td>Pri príjme požiadaviek na socket, musí Sofia pomocou serverového
                        procesu vytvoriť front, kam sa ukladajú zatiaľ nevybavené
                        simultánne požiadavky. Využije na to službu <code>listen()</code>.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <strong>KROK1 – naučiť sa syntax a sémantiku služby jadra <code>listen()</code>:</strong> <br/>
            Môžeme to prirovnať k situácii (podržanie hovoru), keď Sofia pravé využíva telefón na
            hovor a na jej telefón príde požiadavka o ďalší hovor, ktorý je pre ňu dôležitý. Preto je
            nutné zaistiť, aby sa ďalšie prichádzajúce požiadavky od ďalších klientov nestratili
            zatiaľ čo prvá je obsluhovaná procesom serverom. Preto používame službu listen()
            na strane procesu server, ktorá vytvorí vyrovnávaciu pamäť pre uchovávanie
            požiadaviek na pripojenie. Ak je front plný a nejaký klient sa pokúsi pripojiť, bude
            spojenie odmietnuté. <br/> <br/>
            <p style={{textDecoration: 'underline'}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/socket.h> 
int listen (int socket, int backlog);                        
                        `
                    }
                </code>
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika:</p>
            <li><code>listen()</code> vracia - 0 pri úspešnom vykonaní alebo -1, ak nastane chyba</li> <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie - <strong><code>man 2 listen</code></strong>.
            </div>
            <br/>
            <strong>KROK2 - pochopiť parametre služby:</strong> <br/>

            Prvým parametrom je <code>socket</code>. Argument určuje jedinečný identifikátor socketu
            vytvorený službou <code>socket()</code> s adresou priradenou službou <code>bind()</code>. Druhým
            parametrom je <code>backlog</code>. Argument backlog určuje maximálne množstvo simultánnych
            požiadaviek na spojenie. Horný limit je špecifikovaný symbolickou konštantou
            <code>SOMAXCONN</code> v hlavičkovom súbore &lt;<code>sys/socket.h</code>&gt;. Hodnota parametra <code>backlog</code> je
            nastavená štandardne na hodnotu 5.
        </div>

    );
};

export default ThirdSubtopicEleventh;
