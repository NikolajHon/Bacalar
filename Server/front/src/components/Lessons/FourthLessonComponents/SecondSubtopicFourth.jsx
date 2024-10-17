import React from 'react';
const SecondSubtopicFourth = ({onComplete, completed}) => {
    return (
        <div className="second-subtopic" id="section-2">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služba jadra – chmod()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>chmod(), fchmod()</code>, príkaz <code>chmod </code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                <ul>
                                    syntax služieb <code>chmod()</code> a <code>fchmod()</code>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <ul>
                                    <li>pojmu maska</li>
                                    <li>pojmom user, group, other</li>
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
                    <td>Sofia si vytvorila súbor, ktorý môže prezerať a upravovať iba ona.
                        Potrebuje ho sprístupniť svojim spolužiakom na prezeranie. Pre
                        zmenu práv súborov Sofia chcela použiť príkaz <code>chmod</code>, ale jej OS
                        UNIX/Linux tento príkaz nepodporuje (možno ho niekto zmazal)
                        a tak sa musí pokúsi použiť službu jadra <code>chmod()</code>.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <strong>KROK 1 – naučiť sa syntax a sémantiku služby jadra chmod(): </strong> <br/>
            Pomocou tejto služby môžeme meniť prístupové práva k súboru. Z bezpečnostných
            dôvodov len užívateľ root alebo vlastník súborov môže meniť práva súboru.
            <p style={{textDecoration: 'underline'}}>Syntax:</p>
            <pre>
                {`
            #include <sys/types.h> 
            #include <sys/stat.h> 
            int chmod (const char *pathname, mode_t mode);        
            `}
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika: </p>
            Návratová hodnota: 0 ak OK alebo -1, ak sa vyskytla chyba
            <br/><br/>
            <strong>KROK2 – pochopiť parametre služby: </strong>
            Prvý argument <code>pathname</code> obsahuje názov súbor, ktorému chceme zmeniť prístupové
            práva argumentom <code>mode</code>. Môžeme použiť číselné, alebo symbolické hodnoty uvedené
            v nasledujúcej tabuľke:
            <table border="1" cellpadding="10" cellspacing="0">
                <thead>
                <tr>
                    <th>mode</th>
                    <th>význam</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>S_ISUID</td>
                    <td>Vykonávanie pre používateľa (vlastníka)</td>
                </tr>
                <tr>
                    <td>S_ISGID</td>
                    <td>Vykonávanie pre skupinu</td>
                </tr>
                <tr>
                    <td>S_ISVTX</td>
                    <td>
                        saved-text (sticky bit)
                        <strong>POZOR!</strong> Pri nastavovaní <code>S_SVTX</code> (sticky bitu) musíte mať privilégiá
                        super-používateľa
                    </td>
                </tr>
                <tr>
                    <td>S_IRWXU <br/>
                        S_IRUSR <br/>
                        S_IWUSR <br/>
                        S_IXUSR
                    </td>
                    <td>Čítanie, zápis a vykonávanie pre používateľa (vlastníka) <br/>
                        Čítanie pre používateľa (vlastníka) <br/>
                        Zápis pre používateľa (vlastníka) <br/>
                        Vykonávanie pre používateľa (vlastníka)
                    </td>
                </tr>

                <tr>
                    <td>S_IRWXG <br/>
                        S_IRGRP <br/>
                        S_IWGRP <br/>
                        S_IXGRP
                    </td>
                    <td>Čítanie, zápis a vykonávanie pre skupinu <br/>
                        Čítanie pre skupinu <br/>
                        Zápis pre skupinu <br/>
                        Vykonávanie pre skupinu
                    </td>
                </tr>
                <tr>
                    <td>S_IRWXO <br/>
                        S_IROTH <br/>
                        S_IWOTH <br/>
                        S_IXOTH
                    </td>
                    <td>Čítanie, zápis a vykonávanie pre ostatných <br/>
                        Čítanie pre ostatných <br/>
                        Zápis pre ostatných <br/>
                        Vykonávanie pre ostatných
                    </td>
                </tr>
                </tbody>
            </table>
            <strong>KROK 3 – aplikovanie služby v programe: </strong> <br/>
            Nasledujúci program nastaví práva súboru <i>bar</i> na uvedenú hodnotu bez ohľadu na
            aktuálnu hodnotu tzv. prístupových bitov. Pre súbor <i>foo</i> sme nastavili práva na základe
            jeho aktuálnych práv a to tak, že sme zavolali službu <code>stat()</code> na získanie aktuálnych
            práv a potom sme ich upravili. Explicitne sme zapli set-group-ID bit a práva na
            vykonávanie pre skupinu. Použili sme súbory z predchádzajúceho programu, ktorý ich
            vytvoril.
            <pre>
                {
                    `
        #include <sys/types.h>
        #include <sys/stat.h>
        #include <stdlib.h>

        int main(void)
        {
            struct stat statbuf;
            /* zapneme pristupový bit skupiny a vypneme jej práva pre vykonávanie */
            if (stat("foo", &statbuf) < 0)
                perror("stat()");
            if (chmod("foo", (statbuf.st_mode | S_IXGRP) | S_ISGID) < 0)
                perror("chmod()");
            /* nastavíme práva na "rw-r--r--" */
            if (chmod("bar", S_IRUSR | S_IWUSR | S_IRGRP | S_IROTH) < 0)
                perror("chmod()");
            exit(0);
        }

                    `
                }
            </pre>
            Po spustení programu môžeme pozorovať zmenu prístupových práv súborov:
            <br/>
            <pre>
                {
                    `
                    $ ls -l foo bar
                     -rw-r--r-- 1 sar           0 Dec 7 21:20 bar
                     -rw-rwSrw- 1 sar           0 Dec 7 21:20 foo
                    `
                }
            </pre>
            <div className='annotations'>
                Pre podrobnejšie informácie zadaj príkaz <code>man 2 chmod</code>.
            </div>
            <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default SecondSubtopicFourth;
