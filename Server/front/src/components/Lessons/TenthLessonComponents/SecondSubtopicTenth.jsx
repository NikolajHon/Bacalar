import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const SecondSubtopicTenth = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="second-subtopic" id="section-2">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služby jadra - semctl()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>semctl()</code></td>
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
                                <li>argumentom služby</li>
                                <li>návratovým hodnotám </li>
                                <li>chybovým hláseniam </li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>službu <code>semctl()</code> pri inicializácií a pri práci so
                                semaforom
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
                    <td>15 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Sofia už si  vie vytvoriť sadu semaforov. Aby ju mohla využívať
                        pre svoje procesy a pre riešenie zadanej úlohy, musí ju najprv
                        inicializovať na hodnoty, ktoré potrebuje pre synchronizáciu
                        procesov. Zistila, že na vyriešenie tohto problému sa používa
                        služba <code>semctl()</code>.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            <br/>
            <strong>KROK1 - naučiť sa syntax a sémantiku služby jadra <code>semctl()</code>:</strong>
            Služba <code>semctl()</code> inicializuje (nastaví), alebo prečíta hodnoty semaforov zo sady
            semaforov alebo prípadne sadu semaforov odstráni zo systému.
            <br/>
            <p style={{textDecoration: 'underline'}}>Syntax:</p>
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <sys/types.h> 
#include <sys/ipc.h> 
#include <sys/sem.h> 
int semctl (int sem_id, int sem_num, int command, …);                         
                        `
                    }
                </code>
            </pre>
            <br/>
            <p style={{textDecoration: "underline"}}>Sémantika:</p>
            <li>
                Služba <code>semctl()</code> vracia rôzne hodnoty v závislosti na parametri <code>command</code>.
                V prípade hodnôt <code>SETVAL</code> a <code>IPC_RMID</code> vracia po úspešnom vykonaní 0, alebo pri
                chybe -1.
            </li> <br/>
            <strong>KROK2 - pochopiť parametre služby:</strong> <br/>
            Prvý parameter <code>sem_id</code> je identifikátor sady semaforov, ktorý získame službou
            <code>semget()</code>. Parameter <code>sem_id</code> určuje, s ktorou sadou semaforov sa má pracovať. S tým
            je spojený druhý parameter <code>sem_num</code>, ktorý naopak určuje, s ktorým semaforom z danej
            sady sa má pracovať (začínajúc od NULY). Parameter <code>command</code> špecifikuje akciu, ktorá
            sa má vykonať. Štvrtý parameter, ak je prítomný, je definovaný ako <code>union semun</code>,
            ktorý musí obsahovať minimálne nasledujúce prvky <br/> <br/>
            <pre>
                <code className={'language-c'}>
                    {
                        `
union semun { 
    int val; 
    /*hodnota SETVAL*/ 
    struct semid_ds *buf; /*vyrovnávacia pamäť pre IPC_STAT 
    a IPC_SET*/ 
    unsigned short *array; /*pole pre GETALL. SETALL*/
}                         
                        `
                    }
                </code>
            </pre>
            Parameter <code>command</code> môže v službe <code>semctl()</code> nadobúdať rôzne hodnoty. My si
            uvedieme dve najpoužívanejšie z nich:
            <li><code>SETVAL</code> – slúži k inicializácii semafora určitou hodnotou. Požadovaná
                hodnota je odovzdaná ako prvok <code>val</code> štruktúry <code>union semun</code>. Semafor
                je potrebné nastaviť ešte pred prvým použitím.</li>
            <li><code>GETVAL</code> – slúži na zistenie nastavenej hodnoty semaforu. </li>
            <li><code>IPC_RMID</code> – slúži na zmazanie sady semaforov, keď už nie je potrebná. </li> <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie zadaj príkaz <strong><code>man 2 semctl</code></strong>.</div>
            <br/>
            <strong>KROK3 – aplikovanie služby v programe: </strong> <br/>
            Sofia dostala za úlohu vytvoriť sadu semaforov s troma semaformi a s prístupovými
            právami <code>0666</code>. Nastaviť ich na tieto hodnoty 3,4,1 a vypísať čas a dátum vytvorenia
            sady semaforov pomocou služby <code>semctl()</code>.
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <stdio.h> 
#include <sys/sem.h> 
#include <stdlib.h> 
#include <time.h>       

int main(void) 
{ 
    int sem_id, sem_value, i; 
    key_t ipc_key; 
    struct semid_ds sem_buf; 
    static ushort sem_array[] = {3,1,4}; 
    ipc_key = ftok(".", 'S');        
    if (( sem_id = semget (ipc_key, 3, IPC_CREAT | 0666))==-1){ 
        perror("semget: IPC_CREAT | 0666"); exit (1); 
    }                                  //vytvorenie sady semaforov 
    printf("Semafor ID: %d\\n", sem_id);       
    if (semctl(sem_id, 0, IPC_STAT, &sem_buf) == -1){ 
        perror("semctl:IPC_STAT"); exit (2); 
    }              //poskytne informacie o vytvorej sade semaforov 
    printf("Vytvoreny %s", ctime(&sem_buf.sem_ctime)); 
           //inicializacia sady semaforov 
    if (semctl(sem_id, 0, SETALL, sem_array) == -1){ 
        perror("semctl: SETALL"); exit (3); 
    } 
    for (i = 0; i < 3; ++i){        //zobrazi hodnoty semaforov 
        if ((sem_value = semctl(sem_id, i, GETVAL)) == -1){ 
            perror("semctl: GETVAL"); exit (4); 
        } 
        printf("Semafor %d ma hodnotu %d\\n", i, sem_value); 
    } 
    if (semctl(sem_id, 0, IPC_RMID) == -1){ 
        perror("semctl: IPC_RMID"); exit (5); 
    }                                    //odstrani sadu semmaforov 
    return 0; 
}                         
                        `
                    }
                </code>
            </pre>
        </div>
    );
};

export default SecondSubtopicTenth;
