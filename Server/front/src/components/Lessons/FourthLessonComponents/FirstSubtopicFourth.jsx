import React from 'react';
const FirstSubtopicFourth = ({onComplete, completed}) => {
    return (
        <div className="first-subtopic" id="section-1">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služba jadra – umask()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><i>umask()</i>, prístupové práva, príkaz <i>umask</i></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                <ul>
                                    syntax služby - prečítať si manuálové stránky
                                    v Unixe/Linuxe, Linux dokumentačný projekt,
                                    zdroje na internete
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <ul>
                                    <li>prístupovým právam súborov</li>
                                    <li>maske práv</li>
                                    <li>službe <i>umask()</i></li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>službu <i>umask()</i> na nastavenie masky práv
                                a s ňou súvisiacou službou <i>create()</i> pre
                                vytvorenie súboru
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
                    <td>10 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Sofia, ako študentka, má svoje prístupové práva. Chce však
                        nastaviť masku práv (prístupových práv) pre vytváranie jej súborov
                        a tým si zaručiť, že so súborom sa bude pracovať len tak, ako si to
                        ona nastaví, použije službu umask().
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <br/>
            Pri vytváraní súborov službami <code>open()</code> alebo <code>creat()</code> špecifikujeme prístupové práva
            novovytvoreného súboru v zdrojovom kóde programu pomocou parametra <i>mode</i>. Takto
            je program skompilovaný a už nám neumožňuje tieto práva meniť. Avšak počas behu
            programu môžeme ešte ovplyvniť práva vytváraného súboru pomocou tzv. masky práv.
            Maska špecifikuje, ktoré práva budú z hodnoty parametra <i>mode</i> odobrané.
            Maska práv je väčšinou nastavovaná raz – pri prihlásení – konfiguračným súborom
            shell-u a zvyčajne už nie je menená. Spravidla je nastavená na hodnotu 022 (odobratie
            práva zápisu do súboru pre skupinu a ostatných). Ak chceme nastaviť špecifickú masku
            práv, môžeme tak urobiť pred spustením programu príkazom <i>umask</i> alebo v programe
            službou <i>umask()</i>.
            <br/>
            <br/>
            <strong>KROK 1 - naučiť sa syntax a sémantiku služby jadra<code> umask()</code>: </strong>
            <p style={{textDecoration: 'underline'}}>Syntax:</p>
            <pre>
                {`
            #include <sys/stat.h> 
            #include <sys/types.h> 
            mode_t umask(mode_t cmask);        

`}
            </pre>
            <p style={{textDecoration: 'underline'}}>Semantika:</p>
            Návratová hodnota: predošlá maska
            <br/><br/>
            <strong>KROK2 – pochopiť parameter služby:</strong> <br/>
            Maska práv je používaná vždy pri vytváraní každého nového súboru alebo adresára.
            Argument <code>cmask</code> môže byť niektorý z prvkov uvedených v nasledujúcej tabuľke:
            <table border="1" cellpadding="10" cellspacing="0">
                <thead>
                <tr>
                    <th>st mode</th>
                    <th>význam</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>S_IRUSR</td>
                    <td>Čítanie – používateľ</td>
                </tr>
                <tr>
                    <td>S_IWUSR</td>
                    <td>Zápis – používateľ</td>
                </tr>
                <tr>
                    <td>S_IXUSR</td>
                    <td>Vykonávanie – používateľ</td>
                </tr>
                <tr>
                    <td>S_IRGRP</td>
                    <td>Čítanie – skupina</td>
                </tr>
                <tr>
                    <td>S_IWGRP</td>
                    <td>Zápis – skupina</td>
                </tr>
                <tr>
                    <td>S_IXGRP</td>
                    <td>Vykonávanie – skupina</td>
                </tr>
                <tr>
                    <td>S_IROTH</td>
                    <td>Čítanie – ostatní</td>
                </tr>
                <tr>
                    <td>S_IWOTH</td>
                    <td>Zápis – ostatní</td>
                </tr>
                <tr>
                    <td>S_IXOTH</td>
                    <td>Vykonávanie – ostatní</td>
                </tr>
                </tbody>
            </table>
            <br/>
            <div className='annotations'>
                Pre podrobnejšie informácie zadaj príkaz <code>man 2 umask</code>.
            </div>
            <br/>
            <strong>KROK3 – aplikovanie služby v programe: </strong><br/>
            Nasledujúci program vytvorí dva súbory, jeden s použitím masky 0 (žiadne práva
            nebudú odobraté) a druhý s maskou, ktorá odoberá práva čítania a zápisu pre skupinu
            a ostatných.
            <pre>{
                `
        #include <sys/types.h>
        #include <sys/stat.h>
        #include <fcntl.h>
        #include <stdlib.h>

        #define RWRWRW (S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP | S_IROTH | S_IWOTH)

        int main(void)
        {
            umask(0);
            if (creat("foo", RWRWRW) < 0)        //nastavenie masky 0 
                perror("creat(foo)");
            umask(S_IRGRP | S_IWGRP | S_IROTH | S_IWOTH);        //obmedzenia masky 

            if (creat("bar", RWRWRW) < 0)           //citanie a zapis 
                perror("creat(bar)");               //pre skupinu a ostatnych 

            exit(0);
        }
    `
            }</pre>
            Po spustení programu môžeme pozorovať, ako bola nastavená maska práv:
            <pre>
                {
                    `
        $ umask                 zistenie aktuálnej hodnoty masky práv 
        022 
        $ ./a.out 
        $ ls -l foo bar -rw------- 1 sar            0 Sep 20 21:20 bar -rw-rw-rw- 1 sar            0 Sep 20 21:20 foo 
        $ umask                 kontrola, či sa hodnota masky práv zmenila 
        022 
                    `
                }
            </pre>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default FirstSubtopicFourth;
