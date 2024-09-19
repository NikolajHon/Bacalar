import React from 'react';

const FirstSubtopic = ({ onComplete, completed }) => {
    return (
        <div className='first-subtopic' id="section-1">
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Podtéma: <strong>Príkaz – ls (list)</strong> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="section-title">Kľúčové slová</td>
                        <td><i>ls</i> (list), man ls, unix </td>
                    </tr>
                    <tr>
                        <td className="section-title">Ciele</td>
                        <td>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>
                                    príkaz <i>ls</i>:
                                    <ul>
                                        <li>prečítať si manuálové stránky v Unixe
                                            /Linuxe, Linux dokumentačný projekt</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>
                                    štruktúre i-uzlov
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>príkaz <i>ls</i> výpis obsahu adresára:
                                    <ul>
                                        <li>z výpisu určiť či sa jedná o súbor alebo
                                            adresár</li>
                                        <li>rozpoznať koreňový adresár </li>
                                        <li>strom adresárov</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Vedieť:</td>
                                <td>vypísať obsah adresára a rozlíšiť jednotlivé položky
                                    vo výpise. </td>
                            </tr>
                        </td>
                    </tr>
                    <tr>
                        <td className="section-title">Odhadovaný čas</td>
                        <td>20 minút</td>
                    </tr>
                    <tr>
                        <td className="section-title"> Scenár</td>
                        <td>Sofia sa prihlásila do systému. Nevie v ktorom adresári sa práve
                            nachádza resp. potrebuje zistiť čo v danom adresári má uložené. Preto
                            musí prehľadať jednotlivé adresáre. Zistila, že na zorientovanie sa
                            v adresárovej štruktúre a k vypísaniu obsahu adresára jej poslúži
                            príkaz ls, ktorý jej vypíše obsah aktuálneho adresára.
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP</strong>
            </div>
            <strong>KROK1- naučiť sa používať príkaz <i>ls</i>:</strong> <br /><br />
            Na zorientovanie sa v adresárovej hierarchii a k vypísaniu obsahu adresára jej poslúži 
            príkaz <i>ls (list)</i> (v skutočnosti sa jedná o rozpis obsahu i-uzlov). Príkaz <i>ls</i> zobrazí na 
            štandardnom výstupe jednostĺpcový výpis pracovného adresára.  
            <p style={{ textDecoration: 'underline' }}>Syntax:</p>
            <pre>{`
                    ls [-volba..] [meno_suboru...]
                    `}

            </pre>
            <div className='annotations'>

                Pre podrobnejšie informácie zadáj príkaz  man ls. 
            </div>
        </div>
    );
};

export default FirstSubtopic;
