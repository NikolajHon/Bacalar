import React from 'react';
import Obr1 from '../../../images/NinthPageImg/Obr1.png'

const LessonOverview = ({onComplete, completed}) => {
    return (
        <div className="lesson-overview" id="section-0">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Téma: Medziprocesová komunikácia – zdieľaná pamäť</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td>medziprocesová komunikácia, procesy, zdieľaná pamäť</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                základné princípy komunikácie medzi procesmi
                                prostredníctvom zdieľanej pamäte
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <li>pojmom stránka pamäte, adresný priestor</li>
                                <li>pojmom vyhradenie (alokácia), pripojenie,
                                    odpojenie, zrušenie (dealokácia) a riadenie
                                </li>
                                <li>
                                    syntax a význam parametrov jednotlivých
                                    služieb
                                </li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>služby jadra spojené s komunikáciou cez
                                zdieľanú pamäť
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vedieť:</td>
                            <td>
                                <li>
                                    uvedomiť si výhody a nevýhody použitia
                                    zdieľanej pamäte (napr. oproti iným
                                    prostriedkom IPC)
                                </li>
                                <li>
                                    využiť získané skúsenosti pri tvorbe
                                    programov
                                </li>
                            </td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>60 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Sofia sa v nasledujúcom cvičení zameria na medziprocesovú
                        komunikáciu prostredníctvom zdieľanej pamäte. Sofia bude
                        vytvárať programy, v ktorých bude potrebné zabezpečiť, aby do
                        pamäte pristupovalo viacero procesov, ktoré začnú využívať
                        zdieľanú pamäť na prenos dát medzi sebou.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            Táto kapitola sa zameriava na:
            <ul>
                <strong>Systémové volania: </strong>
                <li className="custom-item"><code>shmat() </code></li>
                <li className="custom-item"><code>shmget() </code></li>
                <li className="custom-item"><code>shmdt() </code></li>
                <li className="custom-item"><code>shmctl() </code></li>
            </ul>
            <div className="title-box">
                <strong>KRÁTKY ÚVOD :</strong>
            </div>
            <strong>KROK 1 – oboznámiť sa s pojmom zdieľaná pamäť:</strong> <br/>
            Zdieľaná pamäť je jedným z nástrojov IPC (Inter Process Communication). Je to
            veľmi efektívny spôsob odovzdávania dát medzi dvoma nezávislými procesmi. Budeme
            rozlišovať operačnú pamäť fyzicky prítomnú v počítači - <strong><i>fyzický adresný priestor</i></strong>
            (FAP) a pamäť ako abstrakciu, na ktorú sa jednotlivé programy (a tým aj procesy)
            odvolávajú pri adresácii - <strong><i>logický adresný priestor</i></strong> procesu (LAP). <br/> <br/>
            Zdieľaná pamäť je pamäťový segment (špeciálna skupina rámcov vo FAP alebo
            odswapovaná na disku). Tento segment je mapovaný do adresných priestorov dvoch
            alebo viacerých procesov. Proces mapovania pamäťového segmentu do adresného
            priestoru procesu je nasledovný. Jeden proces vytvorí segment zdieľanej pamäte vo
            FAP. Procesy si potom môžu tento segment zdieľanej pamäti vo FAP „pripojiť“ ku
            svojmu vlastnému LAP. To znamená, že rovnaký segment operačnej pamäte počítača sa
            objaví v LAP niekoľkých procesov (pozri Obr. 1). <br/> <br/>
            Ak do zdieľanej pamäte zapíše jeden proces, tieto zmeny budú ihneď viditeľné
            všetkým ostatným procesom, ktoré pristupujú k rovnakej zdieľanej pamäti. Pri
            súbežnom prístupe k zdieľaným dátam je potrebné zaistiť synchronizáciu prístupu,
            pretože zdieľaná pamäť neposkytuje žiadny spôsob synchronizácie. V tomto prípade
            zodpovednosť za komunikáciu padá na programátora, operačný systém poskytuje len
            prostriedky pre jej uskutočňovanie. Problémy spojené so synchronizáciou prístupu budú
            podrobnejšie vysvetlené v téme Synchronizácia procesov.
            <pre className={'image-container'}>
                <img src={Obr1} alt="Obr1"/>
            </pre>
            <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default LessonOverview;
