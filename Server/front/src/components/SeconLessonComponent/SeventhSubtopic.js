import { dividerClasses } from '@mui/material';
import React from 'react';

const SeventhSubtopic = () => {
    return (
        <div className='seventh-subtopic'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Podtéma: <strong>Služba jadra – truncate()</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="section-title">Kľúčové slová</td>
                            <td><i>turncate() </i></td>
                        </tr>
                        <tr>
                            <td className="section-title">Ciele</td>
                            <td>
                                <tr>
                                    <td className="section-title">Zapamätať si:</td>
                                    <td>
                                        syntax služieb - prečítať si manuálové stránky
                                        v Unixe/Linuxe, Linux dokumentačný projekt,
                                        zdroje na internete:
                                        <br />
                                        <a href="http://unixhelp.ed.ac.uk/CGI/man-cgi?truncate+2" target="_blank"
                                            rel="noopener noreferrer">:
                                            http://unixhelp.ed.ac.uk/CGI/man-cgi?truncate+2
                                        </a>
                                        <br />
                                        <a href="http://www.scit.wlv.ac.uk/cgibin/mansec?3C+truncate" target="_blank"
                                            rel="noopener noreferrer">:
                                            http://www.scit.wlv.ac.uk/cgibin/mansec?3C+truncate
                                        </a>

                                    </td>


                                </tr>
                                <tr>
                                    <td className="section-title">Porozumieť:</td>
                                    <td>
                                        <ul>
                                            <li>parametrom služby <i>truncate()</i></li>
                                            <li>chybovým hláseniam</li>
                                        </ul>

                                    </td>
                                </tr>
                                <tr>
                                    <td className="section-title">Aplikovať:</td>
                                    <td>službu <i>truncate()</i> pri práci so súbormi </td>
                                </tr>
                                <tr>
                                    <td className="section-title">Vedieť:</td>
                                    <td>využiť získané skúsenosti pri tvorbe programov
                                    </td>
                                </tr>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Odhadovaný čas</td>
                            <td>5 minút</td>
                        </tr>
                        <tr>
                            <td className="section-title"> Scenár</td>
                            <td>Sofia má súbor, ktorému potrebuje zmeniť veľkosť. Potrebuje zistiť,
                                akými spôsobmi by to mohla urobiť.
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h2>POSTUP:</h2>
                <p>
                Niekedy sa môže vyskytnúť situácia, keď potrebujeme skrátiť súbor „odrezaním“ dát
                z konca súboru, alebo naopak, súbor predĺžiť. Skrátenie obsahu súboru na nulu môžeme
                vykonať aj flagom <i>O_TRUNC</i> služby jadra <i>open()</i>, nielen službou <i>truncate()</i>. Naopak,
                služba <i>truncate()</i> je ďaleko flexibilnejšia, keďže umožňuje presne definovať novú
                veľkosť súboru.
                <br />
                <h4>KROK1 – naučiť sa syntax a sémantiku služby jadra <i>truncate()</i>:</h4>
                <p style={{ textDecoration: 'underline' }}>Syntax:</p>
                <pre>
                    {`
#include <unistd.h>
int truncate(const char *pathname, off_t length); 

`}
                </pre>
                <p><p style={{ textDecoration: 'underline' }}>Semantika:</p>
                    <ul>
                        <li><i>truncate()</i> vracia: 0 ak sa proces uskutočnil bez chýb alebo -1, ak nastala chyba. </li>
                    </ul>
                </p>
                <h4>KROK2 – pochopiť parametre služby: </h4>
                <pre>
                    {
                        `
                const char *pathname - názov súboru, ktorému chcem zmeniť veľkosť
                
                int off_t lenght - nová dĺžka v bytoch 
                        `
                    }
                </pre>
                
                <br />
                Ak predchádzajúca veľkosť súboru bola väčšia než <i>length</i>, dáta za <i>length</i> nebudú
                prístupné. Ak volanie „predĺži“ súbor, dáta medzi starým a novým koncom súboru budú
                načítané ako 0. 
                </p>
            </div>
    );
};

export default SeventhSubtopic;
