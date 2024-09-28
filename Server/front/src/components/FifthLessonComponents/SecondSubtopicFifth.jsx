import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Подключение стиля подсветки

const SecondSubtopicFifth = () => {
    // Используем эффект, чтобы подсветка синтаксиса сработала после рендеринга
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="first-subtopic" id="section-1">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: ioctl(), man ioctl()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>ioctl(), man ioctl() </code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>
                                    syntax služby ioctl(): <br />
                                    prečítať si manuálové stránky
                                    v Unixe/Linuxe, Linux dokumentačný
                                    projekt
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>parametrom služby</td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>službu <code>ioctl()</code> pri nastavovaní zariadení</td>
                            </tr>
                            <tr>
                                <td className="section-title">Vedieť:</td>
                                <td>využiť získané skúsenosti pri tvorbe programov</td>
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
                    <td>
                        Systémové volanie <code>ioctl()</code> je viacúčelové rozhranie na riadenie
                        technických zariadení. Sofia ho potrebuje poznať pre skvalitnenie
                        svojej práce s terminálmi a zariadeniami.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <strong>KROK 1 – naučiť sa syntax a sémantiku služby jadra <code>ioctl()</code>:</strong> <br />
            Služba jadra <code>ioctl()</code> poskytuje rozhranie pre riadenie technických zariadení
            (terminály, disky, pásky...). Je to volanie jadra, ktoré zabezpečuje kontrolu zariadení.
            <p style={{ textDecoration: 'underline' }}>Syntax:</p>
            <pre>
                <code className="language-c">
                    {`
#include <unistd.h> 
int ioctl(int fildes, int cmd, ...); 
                    `}
                </code>
            </pre>
            <p style={{ textDecoration: 'underline' }}>Sémantika: </p>
            V prípade úspešného vykonania funkcia vracia hodnotu inú ako –1, ktorá závisí od
            kontrolnej funkcie zariadenia. Ak nastane chyba, návratová hodnota je <code>–1</code> a <code>ERRNO</code> je
            nastavené na indikáciu chyby
            <br /> <br />
            <strong>KROK 2 - pochopiť parametre služby:</strong> <br />
            Volanie <code>ioctl()</code> vykonáva činnosť určenú parametrom <code>cmd</code> nad objektom, ktorý
            popisuje deskriptor <code>fildes</code>. V závislosti na funkciách podporovaných konkrétnym
            zariadením sa môže použiť tretí parameter. <br />
            Toto volanie jadra realizuje mnohé funkcie s terminálmi, zariadeniami, schránkami a
            prúdmi. Parametre <code>fildes</code> a <code>cmd</code> sú posielané prislúchajúcemu súboru ktorý je
            špecifikovaný deskriptorom a sú implementované ovládačom zariadenia. Táto kontrola
            je občas používaná na non-stream zariadeniach so základnými vstupno-výstupnými
            službami vykonávanými systémovými volaniami <code>read()</code> a <code>write()</code>.
            <br /> <br />
            <div className="annotations">
                Pre podrobnejšie informácie pozrieť man 2 ioctl alebo kompletný zoznam
                <code>ioctl()</code> príkazov v man 2 ioctl_list.
            </div>
            <br />
            <strong>KROK 3 – aplikovanie služby v programe:</strong> <br />
            Vytvoríme program, ktorý si po spustení vyžiada od používateľa prihlasovacie meno
            a heslo. Pred zadaním hesla program potlačí vypisovanie znakov na terminál pomocou
            služby <code>ioctl()</code>. Echo je znovu zapnuté po zadaní hesla a heslo sa spätne vypíše na
            obrazovku.
            <pre>
                <code className="language-c">
                    {`
#include <termio.h>
#include <stdio.h>
#include <stdlib.h>
#define SIZE 120

main()
{
    struct termio d_str, d_nov;
    char meno[SIZE];
    char heslo[SIZE];

    printf("\\nZadaj svoj prihlasovacie meno:");
    scanf("%s", meno);              // nacitanie z klavesnice
    ioctl(0, TCGETA, &d_str);        // nacitanie struktury terminalu
    d_nov = d_str;                   // zalohovanie nastavenia terminalu
    d_nov.c_lflag &= ~ECHO;          // vypnutie echa
    ioctl(0, TCSETA, &d_nov);
    printf("Zadaj heslo:");
    scanf("%s", heslo);              // nacitanie hesla z klavesnice
    ioctl(0, TCSETA, &d_str);        // zapnutie echa
    printf("\\nEcho bolo znovu zapnute");
    printf("\\nTvoje heslo je: %s\\n", heslo);
    return 0;
}
                    `}
                </code>
            </pre>
        </div>
    );
};

export default SecondSubtopicFifth;
