import React from 'react';
const ThirdSubtopicFourth = ({onComplete, completed}) => {
    return (
        <div className="third-subtopic" id="section-3">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služba jadra – chown()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>chown() , fchown(), lchown()</code>, príkaz <code>chown</code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                syntax služieb - prečítať si manuálové stránky
                                v Unixe/Linuxe, Linux dokumentačný projekt,
                                zdroje na internete
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <ul>
                                    <li>príkazu chown</li>
                                    <li>službám <code>chown() , fchown(), lchown()</code></li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>služby jadra spojené s riadením prístupových práv</td>
                        </tr>
                        <tr>
                            <td className="section-title">Vedieť:</td>
                            <td>využiť získané skúsenosti pri tvorbe programov</td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>10 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Sofia má kamaráta, ktorý potrebuje zmeniť vlastníka súboru. Sofia
                        mu poradila, aby použil príkaz <code>chown</code> alebo službu jadra <code>chown()</code>.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            Pokiaľ vlastníte nejaký súbor, môžete zmeniť jeho vlastníka alebo skupinu (len takú
            skupinu, ktorej sme členmi.). Akonáhle niekomu pridelíte vlastnícke práva, stratíte
            s tým spojené privilégiá ako schopnosť zmeniť oprávnenie prístupu a zmeniť vlastníka
            alebo skupinu. Administrátor smie zmeniť vlastníctvo aj skupinu ktoréhokoľvek súboru.
            <br/> <br/>
            <strong>KROK 1 – naučiť sa syntax a sémantiku služby jadra <code>chown()</code>: </strong>
            <br/>
            <p style={{textDecoration: 'underline'}}>Syntax:</p>
            <pre>
                {`
            #include <unistd.h> 
            int chown(const char *path, uid_t owner, gid_t group);      
            `}
            </pre>
            <p style={{textDecoration: 'underline'}}>Semantika:</p>
            Návratová hodnota: 0 ak OK alebo -1, ak sa vyskytla chyba <br/><br/>
            <code><strong>KROK 2 – pochopiť parametre služby: </strong><br/></code>
            ID vlastníka a ID skupiny súboru, pomenovaného parametrom<code> path</code>, sa mení
            špecifikáciou argumentov <code>owner</code> a <code>group</code>. Vlastník súboru môže zmeniť skupinu na
            skupinu, v ktorej je jej členom, avšak táto možnosť povolená len pre superpoužívateľa. <br/><br/>
            Služba jadra <code>chown()</code> vymaže set-user-id a set-group-id bity súboru ako prevenciu pred
            neúmyselným alebo zlým vytvorením programov nastavujúcich tieto bity, ak nie sú
            vykonávané s právami superpoužívateľa. <br/><br/>
            <div className='annotation'>
                Pre podrobnejšie informácie zadaj príkaz man 2 chown.
            </div>
            <br/>
            <strong>KROK3 – aplikovanie služby v programoch</strong> <br/>
            Vytvoríme program, ktorý zmení skupinu súboru na základe id alebo názvu existujúcej
            skupiny. ID alebo názov skupiny a meno súboru sú programu odovzdané ako
            argumenty.
            <pre>
                {
                    `
        #include <stdio.h> 
        #include <sys/types.h> 
        #include <sys/stat.h> 
        #include <grp.h> 
        #include <stdlib.h> 

        struct group *gr, *getgrnam(); 
        struct stat stbuf; 
        int gid; 
        int status; 

        int main(int argc, char *argv[]) 
        { 
            register c; 
            if (argc < 3) { // kontrola poctu argumentov
                printf("pouzitie: chgrp gid subor ...\\n"); 
                exit(4); 
            } 
            if (isnumber(argv[1])) { // kontrola ci id skupiny je cislo
                gid = atoi(argv[1]); // zmena retazca na cislo
            } else { // kontrola skupiny ci sme jej clenmi
                if ((gr = getgrnam(argv[1])) == NULL) { 
                    printf("neznama skupina: %s\\n", argv[1]); 
                    exit(4); 
                } 
                gid = gr->gr_gid; 
            } 
            for (c = 2; c < argc; c++) { 
                stat(argv[c], &stbuf); // zistenie vlastnika pre zadane subory
                if (chown(argv[c], stbuf.st_uid, gid) < 0) { 
                    perror(argv[c]); // zmena skupiny pre zadane subory
                    status = 1; 
                } 
            } 
            exit(status); 
        } 

        int isnumber(char *s) // pomocna funkcia na kontrolu ci argument je cislo
        { 
            register c; 
            while (c = *s++) { 
                if (!isdigit(c)) return 0; 
            } 
            return 1; 
        }

        `
                }
            </pre>
            <br/><br/>

            Po spustení programu môžeme pozorovať zmenu skupiny súboru:
            <br/><br/>
            <pre>
                {
                    `
         
$ls –l file
-rw-r-----  1  root  root     58  May   12  13:02  file 
$./pristp3 users file 
$ls –l file 
-rw-r-----  1  root  marko    58  May   12  13:03  file 

        `
                }
            </pre>
            <div className='annotation'>
                ÚLOHY NA SAMOSTATNÚ PRÁCU:
            </div>
            <ul>
                <li>Vyskúšajte si zistenie aktuálnej hodnoty masky práv. Nastavenie masky práv
                    tak, aby každý mal prístup k vytvorenému súboru.
                </li>
                <li>Vyskúšajte si zmeniť práva súboru vo vašom adresári pomocou príkazu <code>chmod</code>
                    aj službou jadra <code>chmod()</code>. Zistite rozdiel medzi použitím služby <code>chmod()</code>
                    a <code>fchmod()</code>.
                </li>
                <li>Vyskúšajte si zmeniť vlastníka súboru vo vašom adresári pomocou príkazu
                    chown aj službou <code>chown()</code>. Zistite rozdiel medzi použitím služieb <code>chown()</code> ,
                    <code>fchown()</code>, <code>lchown()</code>.
                </li>
            </ul>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>

    );
};

export default ThirdSubtopicFourth;
