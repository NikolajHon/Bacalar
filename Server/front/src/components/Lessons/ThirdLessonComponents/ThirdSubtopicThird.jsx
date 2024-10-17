import React from 'react';

const ThirdSubtopicThird = ({onComplete, completed}) => {
    return (
        <div className='third-subtopic' id="section-3">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: <strong> Služby jadra – mkdir() a rmdir () </strong></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><i>mkdir(), rmdir(), mkdir, rmdir,</i> unix</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                príkazy mkdir, rmdir a služby <i>mkdir(), rmdir()</i>:
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
                                parametrom služieb
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>
                                <ul>
                                    <li>službu na vytvorenie nového adresára</li>
                                    <li>službu na zmazanie adresára</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vedieť:</td>
                            <td>využiť získané skúsenosti pri tvorbe programov</td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>7 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Ak Sofia potrebuje vo svojom domovskom adresári vytvoriť nový
                        adresár, použije na to príkaz <i>mkdir</i>. Ak by ho potrebovala vymazať,
                        urobí to príkazom <i>rmdir</i>. Pri použití príkazu nastane chyba. Sofia
                        zistila, že je aj iná možnosť ako vytvoriť adresár a to pomocou
                        služieb jadra <i>mkdir()</i> a <i>rmdir()</i>.
                    </td>
                </tr>
                </tbody>
            </table>
            <br/>
            <strong>KROK1 – naučiť sa syntax a sémantiku služieb jadra <i>mkdir() a rmdir()</i>: </strong> <br/>
            Funkcia <i>mkdir()</i>vytvorí prázdny adresár a funkcia <i>rmdir()</i>zruší prázdny adresár.
            <br/><br/>
            <p style={{textDecoration: 'underline'}}>Syntax <i>mkdir()</i>:</p>
            <pre>{`
        #include <sys/types.h> 
        #include <sys/stat.h> 
        int mkdir (const char *pathname, mode_t *mode); 
                    `}
            </pre>
            <p style={{textDecoration: 'underline'}}>Syntax <i>rmdir()</i>: </p>
            <pre>{`
        #include <unistd.h> 
        int rmdir (const char *pathname); 
                    `}
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika: </p>
            <ul>
                <li>mkdir() a rmdir() vracia: 0 keď OK alebo -1, pri chybe.</li>
            </ul>
            <div className='annotations'>
                Pre podrobnejšie informácie zadáj príkaz man 2 mkdir, man 2 mrdir.
            </div>
            <br/>
            <strong>KROK2 – pochopiť parametre služby: </strong> <br/>
            Systémové volanie <i>mkdir()</i> slúži na vytváranie adresárov a je ekvivalentné príkazu
            <i>mkdir. Vytvorí nový adresár a pomenuje ho podľa parametru pathname. Prístupové </i>
            práva k adresáru sú špecifikované v parametri <i>mode</i> a rovnako, ako u voľby <i>O_CREAT</i>
            <br/>systémového volania <i>open()</i>, sú podmienené nastavením premennej <i>umask</i>.
            Systémové volanie <i>rmdir()</i> odstraňuje adresáre, ale iba v prípade, že sú prázdne.
            Príkaz <i>rmdir</i> využíva práve túto službu. <br/><br/>
            <strong>KROK3 – naučiť sa používať príkaz <i>mkdir:</i> </strong> <br/>
            Sofia použije príkaz <i>mkdir</i> (make directory) na vytvorenie adresára.
            <pre>{`
        $ mkdir adr1    // vytvorenie adresára "adr1"
        $ ls -l         // výpis obsahu adresára      
        total 2  

        drwxr-xr-x 2 sofia group 32 May 13 11:27 adr1  

        $ cd adr1       //nastavenie na adresár "adr1"  
        $ mkdir adr2    //vytvorenie podadresára "adr2" 
        $ cd            //nastavenie na domovský adresár
                    `}
            </pre>
            <strong>KROK4 – naučiť sa používať príkaz <i>rmdir:</i></strong> <br/>
            Pre jeho dodatočné zrušenie (vymazanie) jej poslúži príkaz rmdir (remove directory): <br/><br/>
            <pre>{`
        $ rmdir adr1 
        rmdir: testy: Directory not empty  
                    `}
            </pre>
            <br/>
            Sofia si však nevšimla, že jej adresár nie je prázdny. Adresár totiž môžeme zrušiť, len
            ak je prázdny, takže píšeme:
            <pre>{`
        $ rmdir adr1/adr2 
        $ rmdir adr1  
        $
                    `}
            </pre>
            <p style={{textDecoration: 'underline'}}>Pre odstránenie adresára príkazom <code>rmdir</code> musia byť
                splnené nasledujúce podmienky:</p>
            <ol>
                <li class="custom-list">Adresár musí byť prázdny</li>
                <li class="custom-list">Používateľská identifikácia musí mať oprávnenie pre zápis a pre spustenie v
                    rodičovskom adresári
                </li>
                <li class="custom-list">Adresár nesmie byť súčasne pracovným adresárom používateľa</li>
            </ol>
            <div className="title-box">
                <strong>ÚLOHY NA SAMOSTATNÚ PRÁCU: </strong>
            </div>
            <ul>
                <li>Vytvorte v domovskom adresári adresár <em>skúška</em>.</li>
                <li>Nastavte adresár <em>skúška</em> ako pracovný adresár.</li>
                <li>Vytvorte súbor <em>prvy.txt</em>, v ktorom budú nasledovné riadky: <br/>
                    toto je prvý riadok <br/>
                    toto je druhý riadok
                </li>
                <li>Vytvorte adresár <em>pomocný</em> (v adresári <em>skúška</em>).</li>
                <li>Skopírujte súbor <em>prvy.txt</em> do adresára <em>pomocný</em> pod menom <em>druhy.txt</em>.</li>
                <li>Premenujte súbor <em>treti.txt</em> na <em>stvrtý.txt</em>.</li>
                <li>Vymažte adresár <em>skúška</em> so všetkým, čo obsahuje.</li>
            </ul>
            <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default ThirdSubtopicThird;
