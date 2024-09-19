import React from 'react';
import Obr1 from '../../images/ThirdPageImages/Obr1.png';
import Obr2 from '../../images/ThirdPageImages/Obr2.png';
const LessonOverview = () => {
    return (
        <div className="lesson-overview" id="section-0">
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Téma: Práca s adresármi v OS UNIX/Linux </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="section-title">Kľúčové slová</td>
                        <td>adresáre, directories, i-uzol, <i>dirent, ls, cd, mkdir, rmdir</i></td>
                    </tr>
                    <tr>
                        <td className="section-title">Ciele</td>
                        <td>
                            <tr>
                                <td className="section-title">Zapamätať si:</td>
                                <td>
                                    <ul>
                                        <li>typy adresárov</li>
                                        <li>služby jadra pre prácu s adresármi </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>
                                    <ul>
                                        <li>parametre služieb </li>
                                        <li>štruktúre i-uzlov</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>štruktúry a služby na:
                                    <ul>
                                        <li>otvorenie, zápis, čítanie z adresára </li>
                                        <li>získanie informácií o adresári</li>
                                        <li>nastavenie prístupových práv </li>
                                        <li>vymazanie adresára</li>
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
                        <td>20 minút</td>
                    </tr>
                    <tr>
                        <td className="section-title"> Scenár</td>
                        <td>Sofia už vie o  systéme súborov5 OS UNIX/Linux, ktorý má tvar
                            stromu. Je preto vhodná doba, aby si vytvorila vlastný adresár.
                            V tejto kapitole sa Sofia naučí všetky príkazy, ktoré potrebuje na
                            vytvorenie, premenovanie, odstránenie, presun a kopírovanie
                            vlastných adresárov a súborov.
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='postup'>

                <div className="title-box">
                    <strong>POSTUP</strong>
                </div>
                Táto kapitola sa zameriava na:
                <ul>
                    <li><strong>Príkazy:</strong>
                        <ul>
                            <li className='terminal-command'>ls</li>
                            <li className='terminal-command'>cd</li>
                            <li className='terminal-command'>mkdir</li>
                            <li className='terminal-command'>rmdir</li>
                        </ul>
                    </li>
                    <li><strong>Systémové volania:</strong>
                        <ul>
                            <li className='terminal-command'>mkdir()</li>
                            <li className='terminal-command'>rmdir()</li>
                            <li className='terminal-command'>opendir()</li>
                            <li className='terminal-command'>closedir()</li>
                            <li className='terminal-command'>readdir()</li>
                            <li className='terminal-command'>telldir()</li>
                            <li className='terminal-command'>rewindir()</li>
                        </ul>
                    </li>
                    <li><strong>Štruktúra:</strong>
                        <ul>
                            <li className='terminal-command'>dirent</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="title-box">
                <strong>KRÁTKY ÚVOD</strong>
            </div>
            <strong>KROK1 – pochopiť pojmom adresár a i-uzol: </strong><br />
            <i>Adresár</i> je zvláštny súbor, ktorý obsahuje zoznam s menami súborov a čísel ich uzlov.
            Jednoznačne tak každému súboru priraďuje <i>i-uzol</i> (cez i-number).
            <br /><br />
            Jednotlivé i-uzly sú v systéme rozlíšené číslom. Číslo i-uzlu je jednoznačné v rámci
            jedného zväzku, preto nestačí k jednoznačnej identifikácii súboru. K nej je treba okrem
            čísla i-uzlu aj zväzok, na ktorom súbor leží. Pri vytváraní súboru určí OS doposiaľ
            voľný i-uzol, ktorý bude daný súbor reprezentovať. Jeho veľkosť je 64 bytov.
            <br /><br />
            Súbor je určený z hľadiska jadra UNIXu číslom i-uzlu a z hľadiska používateľa cestou
            od koreňového adresára k súboru a menom súboru.
            <br />
            <div className='image-container'>
                <img src={Obr1} alt="Obr1" />
            </div>
            <br />
            <strong>KROK2 – pochopiť štruktúru</strong> super_blok:
            <br />
            Štruktúra <i>super_blok</i> obsahuje informácie o súborovom systému uloženom na médiu.
            Jeho formát môžeme opísať nasledujúcou štruktúrou:
            <pre>
                {
                    `
struct  super_block { 
   inode_nr s_ninodes;           /* počet i-node */ 
   zone_nr s_nzones;             /* počet zón na zväzku */ 
   unshort s_imap_blocks;        /* počet blokov bit mapy  i-nodes */  
   unshort s_zmap_blocks;        /* počet blokov bit mapy zón */ 
   zone_nr firstdatazone;        /* číslo prvej dátovej zóny */  
   short int s_log_zone_size;    /* počet blokov v zóne (log2 pomeru  
                                  blok/zonu, */ 
                               /* =>ľahký prepočet bitovým posuvom) */ 
   file_pos s_max_size;          /* maximálna dĺžka súboru */ 
   int s_magic;            /* číslo identifikujúce platný super blok*/ 
}; 

                            `
                }
            </pre>
            <strong>KROK3 – oboznámiť sa s adresárovou štruktúrou v OS UNIX/Linux: </strong><br /><br />

            Úplné meno súboru je zoznam všetkých adresárov, ktorými vedie cesta od koreňového
            adresára k súboru s pripojeným menom súboru. Adresáre sa oddeľujú (okrem
            konečného) znakom „ / “. <br /><br />
            Domovský adresár  (zvyčajne <i>/home/meno_uzivatela</i>) - každý užívateľ ma od
            administrátora pridelený adresár, do ktorého vstupuje po prihlásení do systému. <br /><br />
            Adresár <i>/home</i> je sám podadresárom koreňového adresára (/), ktorý je vrcholom celej
            hierarchie a v jeho podadresároch sú uložené všetky systémové súbory. Koreňový
            adresár obsahuje aj adresár <i>/bin</i>, kam sa ukladajú systémové programy (binárne
            súbory), adresár <i>/etc</i> je určený pre ukladanie systémových konfiguračných súborov
            a v adresári <i>/lib</i> sú uložené systémové knižnice.
            Súbory, ktoré reprezentujú fyzické zariadenia a ktoré poskytujú rozhranie pre tieto
            zariadenia sa zväčša nachádzajú v adresári <i>/dev</i>. <br /> <br />
            <div className='image-container'>
                <img src={Obr2} alt="Obr2" />
            </div> <br /><br />
            <strong>Operačný systém UNIX/LINUX</strong> pracuje so všetkými vstupnými zariadeniami ako so 
            súbormi (pozri obr.2). Z uvedeného vyplýva, že prvým krokom je otvorenie súboru. Pod 
            týmto rozumieme špecifikáciu <i>mena_suboru</i> a vytvorenie <i>kanálu</i>, cez ktorý budeme 
            k súboru pristupovať. Ďalším krokom je samotná práca so súborom, môže zahŕňať 
            ľubovoľnú kombináciu činností nad súborom. Posledným krokom pri práci so súborom 
            je jeho uzavretie.
        </div>
    );
};

export default LessonOverview;
