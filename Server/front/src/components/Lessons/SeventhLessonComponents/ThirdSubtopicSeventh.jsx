import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import Obr1 from '../../../images/FifthPageImg/Obr1.png'
import {languages} from "monaco-editor";

const ThirdSubtopicSeventh = ({onComplete, completed}) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <div className="third-subtopic" id="section-3">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Rúra FIFO</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>fifo , man fifo </code></td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>syntax služby <code>mkfifo(), mknod()</code>: prečítať si manuálové stránky
                                    v Unixe/Linuxe
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>
                                    <li>pojmu pomenovaná rúra</li>
                                    <li>rozdielu medzi pomenovanou a
                                        nepomenovanou rúrou
                                    </li>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>služby <code>mkfifo()</code> resp. <code>mknod()</code> na vytvorenie
                                    pomenovanej rúry
                                </td>
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
                    <td>20 minút</td>
                </tr>
                <tr>
                    <td className="section-title">Scenár</td>
                    <td>
                        Doposiaľ sa Sofia naučili ako môže prenášať údaje medzi dvoma
                        procesmi, ktoré boli príbuzné. To však pre využívanie rúr nie je
                        príliš praktické, najmä ak Sofia potrebuje prenášať jednotlivé údaje
                        medzi nezávislými procesmi. To dosiahne pomocou pomenovaných
                        rúr, ktorým sa hovorí aj rúry FIFO.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>

            <strong>KROK1 – pochopiť vlastnosti pomenovanej rúry:</strong> <br/>
            Ako bolo spomenuté, nepomenované rúry neumožňujú komunikovať s procesom, ktorý
            nie je potomkom procesu. Dôvodom je to, že deskriptory je možné odovzdať iba
            potomkom. Tento nedostatok odstraňujú pomenované rúry (FIFO) <br/> <br/>

            <strong>Pomenovaná rúra (FIFO)</strong> je špeciálny typ súboru, ktorý existuje ako záznam
            v súborovom systéme, ale správa sa ako nepomenovaná rúra. Tento „súbor“ slúži len
            ako položka – referenčný bod, ktorým procesy môžu pristupovať k rúre na základe
            mena tohto súboru. <br/> <br/>

            Rozdiel medzi pomenovanou a nepomenovanou rúrou je v tom, že pomenovaná rúra je
            súčasťou súborového systému. Môže byť otvorená viacerými procesmi ako na čítanie,
            tak aj na zápis. Tieto procesy môžu byť navzájom nezávislé. <br/> <br/>

            Jadro podporuje jeden objekt pre každý FIFO súbor, ktorý je otvorený aspoň jedným
            procesom. FIFO musí byť otvorené na oboch koncoch (zápis aj čítanie), predtým než
            môže odovzdávať dáta. Štandardne je používanie FIFO súboru blokované, pokiaľ nie je
            otvorený aj druhý koniec (ak nie je otvorené na čítanie, nedá sa zapisovať a opačne). <br/> <br/>
            <strong>KROK2 – naučiť sa syntax a sémantiku funkcie <code>mkfifo()</code>:</strong> <br/>
            Ak chce Sofia vytvoriť FIFO súbor, použije službu <code>mkfifo()</code> alebo
            príkaz <code>mkfifo</code>. <br/> <br/>
            <p style={{textDecoration: "underline"}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/type.h> 
#include <sys/stat.h> 
int mkfifo(const char *pathname, mode_t mode);                     
                        `
                    }
                </code>
            </pre>
            <p style={{textDecoration: "underline"}}>Sémantika: </p>
            <li><code>mkfifo()</code> vracia 0 ak sa proces uskutočnil bez chýb alebo -1, ak nastala chyba.</li>
            <br/>
            Jednotlivé parametre sú:
            <li><code>pathname</code> – názov daného súboru</li>
            <li><code>mode</code> - prístupové práva</li>
            <div className={'annotations'}>Pre podrobnejšie informácie zadaj príkaz <strong><code>man 3 mkfifo alebo man
                1
                mkfifo</code></strong>.
            </div>
            <br/>
            <strong>KROK3 – aplikovanie služby v programe:</strong> <br/>
            Sofia potrebuje vytvoriť pomenovanú rúru. Správu o jej úspešnom vytvorení rúry chce
            vypísať na štandardný výstup a následne program ukončiť. <br/> <br/>
            1. Najprv do programu pridá potrebne hlavičkové súbory. Na vytvorenie
            pomenovanej rúru využije spomínanú funkciu <code>mkfifo()</code>.
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/types.h> 
#include <sys/stat.h> 
int main() 
{ 
    int des_fifo; 
    des_fifo=mkfifo("/tmp/my_fifo",0777); 
    printf("des_fifo je %d",des_fifo); 
    if(des_fifo==0) printf("uspesne sa podarilo vytvorit FIFO"); 
    else perror("chyba:"); 
    return 0; 
}             
                        `
                    }
                </code>
            </pre>
            2. Záznam o rúre si Sofia skontroluje pomocou príkazu:
            <div className={'terminal-command'}>
                ls -lF /tmp/my_fifo
            </div>
            3. Uveďte, aký bol váš výpis použitím predchádzajúceho príkazu: <br/>

            <div style={{borderTop: '2px solid black', borderBottom: '2px solid black', padding: '10px'}}>
                Prvý znak výpisu je p, čo znamená, že sa jedná o rúru. Symbol | pridala na koniec
                riadku voľba -F príkazu ls a tiež označuje rúru.
            </div>
            <div className={'title-box'}>
                Odstránenie pomenovanej rúry:
            </div>
            Rúru FIFO môžeme odstrániť pomocou príkazu rm alebo pomocou služby jadra
            <code>unlink().</code>
            <div className={'title-box'}>
                Prístup k rúre FIFO:
            </div>
            <br/>
            Pretože pomenované rúry sú súčasťou súborového systému, majú jednu veľmi užitočnú
            vlastnosť - môžeme ich používať v príkazoch na mieste, kde môžeme normálne použiť
            názov súboru. Teraz si opíšeme správanie pomenovanej rúry v spojitosti s normálnymi
            príkazmi pre prácu so súbormi. <br/> <br/>
            Do príkazového riadku skúste zadať nasledujúce príkazy: (obmena príkladov, čo sme si
            ukázali na začiatku) <br/> <br/>
            1. Najprv sa pokúsime čítať z prázdnej rúry FIFO:
            <pre>
                <code>
                    {
                        `
$ cat < /tmp/my_fifo                        
                        `
                    }
                </code>
            </pre>
            2. Teraz skúsime do rúry zapísať:
            <pre>
                <code>
                    {
                        `
$ echo "sdsdasdf" > /tmp/my_fifo                     
                        `
                    }
                </code>
            </pre>
            3. Ak spustíme obidva príkazy súčasne, môžeme dáta odovzdať
            prostredníctvom rúry:
            <pre>
                <code>
                    {
                        `
$ cat < /tmp/my_fifo & echo "Ja som rura" > /tmp/my_fifo 
[1] 1316 
Ja som rura 
[1]+ Done       cat < /tmp/my_fifo
$                    
                        `
                    }
                </code>
            </pre>
            <div className={'annotations'}>Ako to funguje:</div>
            <br/>
            <strong>Prípad 1-2:</strong> <br/> <br/>
            V rúre neboli žiadne dáta preto príkazy <code>cat</code> a echo čakali kým do rúry nejaké dáta
            dorazia, resp. až ich začne nejaký iný proces čítať. <br/> <br/>
            <strong>Prípad 3:</strong>
            Proces <code>cat</code> je najprv zablokovaný na pozadí. Akonáhle dá príkaz echo k dispozícii
            nejaké dáta, príkaz <code>cat</code> ich prečíta a vytlačí na štandardný výstup. <br/> <br/>
            Na rozdiel od rúry vytvorenej volaním <code>pipe()</code>, existuje rúra FIFO v podobe
            pomenovaného súboru, nie ako otvorený deskriptor súboru, a pred tým, ako sa do/z nej
            môžu zapisovať/čítať dáta, musíme ju otvoriť. Rúra FIFO sa otvára/zatvára rovnakými
            funkciami <code>open()/close()</code>, ktoré sme používali pre otváranie/zatváranie súborov.
            <br/> <br/> <br/> <br/>
            <div className={'title-box'}>ÚLOHY NA SAMOSTATNÚ PRÁCU:</div>
            <li>Vytvorte program, ktorý pozostáva z 2 procesov a komunikácia medzi týmito
                procesmi prebieha pomocou rúr. (rodičovský proces teda načítava čísla
                z terminálu a proces - potomok ich vypisuje).
            </li>
            <li>Vytvorte rodiča aj potomka. Nech medzi sebou komunikujú pomocou dvoch rúr.
                Do jednej zapisuje rodič a do druhej syn. Nech obidvaja vypisujú to, čo prečítali
                z rúry.
            </li>
            <li>Zamyslite sa, ako by ste realizovali komunikáciu medzi dvoma procesmi
                v oboch smeroch pomocou jedinej rúry.
            </li>
            <li>Vytvorte dva nezávislé programy, ktoré medzi sebou komunikujú pomocou
                pomenovanej rúry. Prvý program vytvorí pomenovanú rúru a zapíše do nej
                reťazec. Druhý program prečíta reťazec. Nech obidva programy vypíšu reťazec,
                ktorý bol zapísaný do rúry a prečítaný z rúry.
            </li>
            <br/> <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default ThirdSubtopicSeventh;
