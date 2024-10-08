import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const FirstSubtopicTenth = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="first-subtopic" id="section-1">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: SSlužby jadra - semget()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td>semget()</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td> syntax služby - prečítať si manuálové stránky
                                v Unixe/Linuxe, Linux dokumentačný projekt,
                                zdroje na internete
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <li>argumentom služby </li>
                                <li>návratovým hodnotám </li>
                                <li>chybovým hláseniam</li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>službu <code>semget()</code> pri vytváraní synchronizačného
                                nástroja semafor
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
                    <td>Aby Sofia mohla využívať semafor pri riešení svojej úlohy na
                        synchronizáciu procesov v medziprocesovej komunikácií, musí si
                        ho najprv vytvoriť. Z manuálu vyčítala, že na vytvorenie
                        semaforu sa používa služba <code>semget()</code> a preto potrebuje sa ju
                        naučiť používať.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <strong>KROK1 - naučiť sa syntax a sémantiku služby jadra <code>semget()</code>: </strong> <br/>
            Služba <code>semget()</code> vytvorí novú sadu semaforov a vráti ich identifikátor (ten používajú
            ďalšie služby pre prácu so semaformi). <br/>
            Najprv si objasníme ako sú semafory vnímané v OS UNIX/Linux. Semaforová sada
            (tzv. set alebo pool) je určitý počet semaforov, ktorý je identifikovaný unikátnym
            identifikátorom. V takejto sade môžeme mať viacero semaforov a identifikujete ich
            poradím (začínajúc od nuly). Operácie sa vykonávajú atomicky nad celou sadou (buď sa
            vykonajú všetky požadované, alebo sa nevykonajú vôbec). <br/> <br/>
            <p style={{textDecoration:'underline'}}>Syntax: </p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/types.h> 
#include <sys/ipc.h> 
#include <sys/sem.h> 
int semget (key_t key, int num_sems, int sem_flags);     
                        `
                    }
                </code>
            </pre>
            <p style={{textDecoration: 'underline'}}>Sémantika: </p>
            <li>Služba <code>semget()</code> vracia identifikátor sady semaforov (nezáporné celé číslo), alebo –1 pri chybe. </li>
            <br/>
            <strong>KROK2 - pochopiť parametre služby: </strong> <br/>
            Prvý parameter <code>key</code> je celočíselná hodnota, ktorá umožňuje nezávislým procesom
            pristupovať k rovnakej sade semaforov. Podľa kľúča OS vytvorí sadu semaforov alebo
            použije existujúcu s rovnakým kľúčom. Existuje špeciálna hodnota kľúča semaforu
            <code>IPC_PRIVATE</code>, ktorá vytvorí sadu semaforov, ku ktorej môže pristupovať iba proces,
            ktorý ju vytvoril. Tento identifikátor musí tento proces doručiť priamo procesom ktoré
            ho potrebujú, väčšinou ide o ním vytvorené dcérske procesy (proces potomok).
            Parameter <code>num_sems</code> reprezentuje počet semaforov v sade. Parameter <code>sem_flags</code> je
            množina príznakov, ktoré sú podobné príznakom služby <code>open()</code>. Špecifikuje prístupové
            práva k sade semaforov, ktoré fungujú ako prístupové práva k súboru. Navyše, môžu
            byť bitovo spočítané s hodnotou <code>IPC_CREAT</code>, ktorá zaistí vytvorenie novej sady
            semaforov. Nie je chybou nechať príznak <code>IPC_CREAT</code> nastavený a odovzdať službe kľúč
            existujúcej sady semaforov. Keď nie je potreba, ostáva príznak <code>IPC_CREAT</code> ignorovaný.
            Pomocou príznakov <code>IPC_CREAT</code> a <code>IPC_EXCL</code> je možné získať novú jedinečnú sadu
            semaforov. Ak už taká sada semaforov existuje, služba <code>semget()</code> vráti chybu.
            <br/> <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie zadaj príkaz <code>man 2 semget</code>.</div>
            <br/>
            <strong>KROK3 – aplikovanie služby v programe:</strong> <br/>
            Sofia má za úlohu urobiť program, ktorý má vytvoriť tri sady semaforov s týmito
            nastavenými príznakmi <code>IPC_CREAT|IPC_EXCL, IPC_PRIVATE</code> a prístupovými pravami
            nastavenými  na hodnotu <code>0666</code>. K získaniu kľúča pre službu <code>semget()</code> sa použije služba
            <code>ftok()</code>a príznak <code>IPC_CREAT</code>.
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <stdio.h>
#include <sys/sem.h>

int main(void)
{
    int sem1, sem2, sem3;
    key_t ipc_key;

    ipc_key = ftok(".", 'S');        // ziskanie kluca pre sluzbu semget()
    if (( sem1 = semget(ipc_key, 3, IPC_CREAT | 0666)) == -1)
    {
        perror("semget: IPC_CREAT | 0666");
    }
    // vytvori sadu semaforov s pristupovymi pravami
    printf("sem1 identifikator: %d\\n", sem1);

    if ((sem2 = semget(ipc_key, 3, IPC_CREAT | IPC_EXCL | 0666)) == -1)
    {
        perror("semget: IPC_CREAT | IPC_EXCL | 0666");
    }
    // vytvori sadu semaforov ak uz existuje tak sluzba semget() vrati chybu
    printf("sem2 identifikator: %d\\n", sem2);

    if ((sem3 = semget(IPC_PRIVATE, 3, 0666)) == -1)
    {
        perror("semget: IPC_PRIVATE");
    }
    // vytvori jedinecnu sadu semaforov pre proces ktory ju vytvoril
    printf("sem3 identifikator: %d\\n", sem3);

    return 0;
}
                        `
                    }
                </code>
            </pre>
            Spustením predchádzajúceho programu Sofia získala dva identifikátory na sadu
            semaforov, ktoré sa vypíšu na štandardný výstup. Po ukončení programu vytvorené
            sady semaforov ostanú v systéme. Môže použiť príkaz <i>ipcs –s</i>, ten jej ukáže aktuálny
            stav vytvorených semaforov. Ak Sofia potrebuje odstrániť semafor zo systému, môže
            použiť príkaz <strong>ipcrm -s sem_id</strong>, kde <i>sem_id</i> je identifikátor sady semaforov.
        </div>
    );
};

export default FirstSubtopicTenth;
