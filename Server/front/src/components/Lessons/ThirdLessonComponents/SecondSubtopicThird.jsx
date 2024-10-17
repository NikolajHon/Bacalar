import React from 'react';

const SecondSubtopic = ({ onComplete, completed }) => {
    return (
        <div className='second-subtopic' id="section-2">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: <strong>Príkaz – cd (change directory) </strong></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><i>cd</i> (change directory), man cd, unix</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                príkaz <i>cd</i>:
                                <ul>
                                    <li>prečítať si manuálové stránky v Unixe
                                        /Linuxe, Linux dokumentačný projekt
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                stromovej adresárovej štruktúre
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>príkaz <i>cd</i> na zmenu pracovného adresára</td>
                        </tr>
                        <tr>
                            <td className="section-title">Vedieť:</td>
                            <td>zmeniť svoj pracovný adresár</td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>5 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Sofia nenašla hľadaný súbor vo svojom adresári. Potrebuje sa dostať
                        o úroveň vyššie alebo nižšie. Pre zmenu pracovného adresára jej
                        poslúži príkaz <i>cd</i>. O úspešnom prevedení príkazu sa dá presvedčiť
                        príkazom <i>pwd</i> (print working directory)
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <p style={{textDecoration: 'underline'}}>Syntax:</p>
            <pre>{`
    $ cd [meno_adresara] 
                    `}

            </pre>
            <br/><br/>
            Ak sa nezadá žiadne meno adresára, nastaví sa ako pracovný adresár domovský adresár
            užívateľa. To isté sa udeje, ak sa zadá ako meno adresára znak '~'. <br/>
            V prípade, že sa ako meno adresára zadá znak '-' tak sa nastaví predchádzajúci pracovný
            adresár. Ako meno adresára je možné zadať i dve bodky (..), tieto označujú návrat
            v stromovej štruktúre o jednu úroveň nahor. Cestu môžeme zadať absolútne od začiatku
            stromu (od koreňa) vtedy začína znakom / (lomka) (pozor zmena oproti MS-DOS kde
            sa používa znak \ (spätná lomka)). Cestu môžeme zadať aj relatívne voči aktuálnemu
            adresáru, vtedy začneme písať rovno bez lomítka.
            <br/><br/>
            Pri zmene pracovného adresára využívame príkaz cd (change directory):
            <br/>
            <pre>{`
    $ cd /usr  
    $ pwd  
    /usr  
    $   
                    `}
            </pre>
            <br/>
            Ak Sofia použije príkaz <i>cd</i> bez argumentu, nastavuje si tak domovský adresár.
            <br/><br/>
            <pre>{`
    $ cd  
    $ pwd  
    /usr/peter  
    $  
                    `}
            </pre>
            <br/>
            Zmena pracovného adresára podlieha samozrejme kontrole oprávnení vstupu do
            adresára podľa prístupových práv je dovolený príznakom "x" vo výpise atribútov
            adresára.

            <br/><br/>
            <table>
                <tbody>
                <tr>
                    <td>cd /var/log</td>
                    <td>nastaví pracovný adresár /var/log</td>
                </tr>
                <tr>
                    <td>cd ../run</td>
                    <td>nastaví pracovný adresár /var/run</td>
                </tr>
                <tr>
                    <td>cd -</td>
                    <td>naspäť sa nastaví /var/log ako pracovný adresár</td>
                </tr>
                <tr>
                    <td>cd</td>
                    <td>a teraz sa nastaví domovský adresár užívateľa</td>
                </tr>
                <tr>
                    <td>cd ~</td>
                    <td>toto urobí to isté</td>
                </tr>
                <tr>
                    <td>cd ..</td>
                    <td>nastaví pracovný adresár o jednu úroveň vyššie</td>
                </tr>
                </tbody>
            </table>
            <br/>
            <div className='annotations'>
                Pre podrobnejšie informácie zadáj príkaz man cd.
            </div>
            <br/>
            <div className="title-box">
                <strong>ÚLOHY NA SAMOSTATNÚ PRÁCU: </strong>
            </div>
            <ul>
                <li>Nastav svojho domovský adresár. Aký príkaz je nutné použiť?</li>
                <li>Chod o úroveň vyššie. Vypíš obsah ľubovolne zvoleného adresára.</li>
                <li>Vráť sa do domovského adresára.</li>
                <li>Použi príkaz pwd na overenie aktuálneho adresára. Aká bude odpoveď?</li>
            </ul> <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default SecondSubtopic;
