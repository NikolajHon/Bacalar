import React from 'react';
import '../../styles/FirstLessons/Tutorial.css';
import diagramImage from '../../images/stderr.png';

const Tutorial = () => {
    return (
        <div className="lesson-overview">
            <div className="header">
                <h2>Podtéma: Standardný chybový výstup</h2>
            </div>
            <table className="info-table">
                <tbody>
                <tr>
                    <th className="section-title">Kľúčové slová</th>
                    <td>únik, presmerovanie, unix</td>
                </tr>
                <tr>
                    <th className="section-title">Zapamätať si</th>
                    <td>význam a funkciu štandardného chybového výstupu</td>
                </tr>
                <tr>
                    <th className="section-title">Ciele</th>
                    <td>
                        <ul>
                            <li>Porozumieť: koncepciu chybového výstupu, syntaxii príkazov a služieb</li>
                            <li>Aplikovať: presmerovanie a spracovanie chybových správ</li>
                            <li>Vyriešiť: ako nájsť a ako na ňu odpovedať</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <th className="section-title">Odhadovaný čas</th>
                    <td>15 min</td>
                </tr>
                <tr>
                    <th className="section-title">Scenár</th>
                    <td>
                        Sofia už ovláda syntax a parametre jednotlivých služieb jadra a napísala si program. Po kompilácii a spustení jej program nefunguje tak, ako predpokladala. Sofia potrebuje zistiť, o akú chybu ide a ako ju má odchytiť.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="section introduction">
                <h3>KRÁTKY ÚVOD:</h3>
                <div className="subsection standard-streams">
                    <h4>Štandardné prúdy</h4>
                    <p>Sofia sa dozvedela, že Systém Linux/Unix obsahuje tzv. štandardné prúdy, ktoré predstavujú vstupné a výstupné kanály medzi počítačovým programom a jeho okolím. Dozvedela sa, že existujú tri vstupno/výstupné kanály:</p>
                    <ul>
                        <li>štandardný vstup stdin</li>
                        <li>štandardný výstup stdout</li>
                        <li>štandardný chybový výstup stderr</li>
                    </ul>
                    <div className="diagram">
                        <img src={diagramImage} alt="Standard Streams Diagram" />
                    </div>
                </div>
                <div className="subsection stdin">
                    <h4>STDIN:</h4>
                    <p>Predstavuje štandardný vstupný kanál, z ktorého programy zvyčajne čítajú dáta z klávesnice. Tento štandardný vstup, podobne ako aj výstup a chyby výstup, môžeme považovať za súbor. Všetky súbory, s ktorými sa pracuje, teda vstupné prúdy predpísuje špeciálne malé celé nezáporné číslo - <strong>deskriptor</strong>. Hodnota deskriptora pre štandardný vstup je "0".</p>
                </div>
                <div className="subsection stdout">
                    <h4>STDOUT:</h4>
                    <p>Do štandardného výstupného kanála program posielajú (zapisujú) potrebné dáta. Tie sa implicitne zobrazia na štandardnom výstupnom zariadení (monitore). Jeho deskriptor má vždy hodnotu "1".</p>
                </div>
                <div className="subsection stderr">
                    <h4>STDERR:</h4>
                    <p>Prostredníctvom štandardného chybového výstupu programy vypisujú na výstupné zariadenie chybové správy. Jeho deskriptor má hodnotu "2".</p>
                    <h5>Zlyhanie volania systémovej služby</h5>
                    <p>Každá služba jadra vracia návratovú hodnotu, ktorá určuje, či služba bola vykonaná korektne, alebo pri spracovaní služby sa vyskytla chyba. Výskyt chyby sa signalizuje špeciálnou návratovou hodnotou služby (spravidla hodnota -1). Bližšiu špecifikáciu typu chyby môžeme nájsť v globálnej premennej <strong>errno</strong>.</p>
                    <h5>Premenná <em>errno</em>:</h5>
                    <ul>
                        <li>využíva hlavičkový súbor <em>errno.h</em></li>
                        <li><em>errno</em> je typu int a je to globálna premenná nastavená na hodnotu 0</li>
                        <li>ak volaná služba jadra sa vykoná korektne tak hodnota premennej <em>errno</em> je 0</li>
                        <li>ak volaná služba jadra sa nevykoná korektne tak nastaví hodnotu typu chyby; ak sa vyskytla chyba, nemôže mať hodnotu 0</li>
                        <li>podrobný zoznam chýb je v <em>man 3 errno</em></li>
                    </ul>
                    <p>Chybové hodnoty sú celé čísla, ktoré sú definované v hlavičkovom súbore <em>errno.h</em>. Tieto hodnoty sú štandardne pomenované symbolickými konštantami tvorenými veľkými písmenami, vždy začínajúcimi písmenom "E", napríklad EACCES, EINVAL.</p>
                </div>
                <div className="postup">
                    <h3>POSTUP:</h3>
                    <ul>
                        <li>Prečítať <em>man 3 errno</em>.</li>
                        <li>Príklad využitia premennej <em>errno</em> (program musí obsahovať hlavičkový súbor <em>errno.h</em>):</li>
                    </ul>
                    <pre>
{`if (systemcall() == -1) {
  int errsv = errno;
  printf("Chyba pri volani systemcall()\\n");
  if (errsv == ...) { ...; }
}`}
                    </pre>
                </div>
                <div className="subsection perror">
                    <h4>Funkcia perror():</h4>
                    <p><strong>Syntax:</strong></p>
                    <pre>
{`#include <stdio.h>
void perror(const char *s);`}
                    </pre>
                    <p>Funkcia <code>perror()</code> na základe hodnoty <code>errno</code> generuje opis chyby posledného systémového volania priamo na štandardný chybový výstup (stderr). Argumentom funkcie <code>perror()</code> je reťazec, ktorý sa zobrazí pred samotným opisom chyby. V praxi sa ako parameter používa názov systémovej služby doplnený o nejaký jednoznačný reťazec, aby mal programátor prehľad, kde chyba vznikla.</p>
                    <p>Podrobnejšie v <em>man 3 perror</em>.</p>
                    <p><strong>Príklad využitia funkcie <code>perror()</code>:</strong></p>
                    <pre>
{`if (sluzba() == -1) {
    perror("sluzba()");
}`}
                    </pre>
                </div>
                <div className="subsection strerror">
                    <h4>Funkcia strerror():</h4>
                    <p><strong>Syntax:</strong></p>
                    <pre>
{`#include <string.h>
char *strerror(int errnum);`}
                    </pre>
                    <p>Funkcia <code>strerror()</code> vracia reťazec opisujúci číslo chyby, ktoré je jej argumentom.
                        Hlavičkový súbor <code>string.h</code> je potrebný pri použití funkcie <code>strerror()</code>.
                    </p>
                    <p><strong>Príklad</strong> otvorenia súboru a vypísania chybového hlásenia v prípade vyskytnutia sa
                        chyby. V príklade sme použili službu <code>open()</code>, s ktorou sa Sofia detailnejšie zoznámi
                        na niektorom z ďalších cvičení. Pre tento príklad jej stačí vedieť, že toto službu otvára súbor.
                    </p>
                    <pre>
{`#include <fcntl.h>
#include <string.h>
#include <errno.h>
#include <stdio.h>

int main() {
    int fd;                          //premenna pre ulozenie navratovej hodnoty
    fd = open("subor0", O_RDONLY);   //otvorenie suboru
    if(fd == -1) {                   //odchyt chyby pri neotvoreni suboru
        printf("Vyskytla sa chyba: %d\\n", errno);
        printf("Opis chyby: %s\\n", strerror(errno));
        return 1;
    }
    //Vysp funkcie perror pre funkcny kod programu
    perror("Vypis funkcie perror pre funkcny kod programu: ");
    return 0;
}`}
                    </pre>
                    <footer className="footer">
                        <p>&copy; 2023 Уроки UNIX/Linux. Все права защищены.</p>
                        <nav>
                            <a href="https://github.com/NikolajHon">Политика конфиденциальности</a>
                            <a href="https://github.com/NikolajHon">Условия использования</a>
                            <a href="https://github.com/NikolajHon">Контакты</a>
                        </nav>
                    </footer>
                </div>
                <div className="version">
                    <p>Sofia verzia 2016</p>
                </div>
            </div>
        </div>
    );
};

export default Tutorial;
