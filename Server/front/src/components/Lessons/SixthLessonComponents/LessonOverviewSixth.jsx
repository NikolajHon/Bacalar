import React from 'react';

const LessonOverview = ({onComplete, completed}) => {
    return (
        <div className="lesson-overview" id="section-0">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Téma: Procesy</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td>proces, rodič, potomok, program</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                <ul>
                                    <li> syntax základných služieb jadra pre
                                        prácu s procesmi
                                    </li>
                                    <li> hodnoty niektorých parametrov</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                <ul>
                                    <li>princípu činnosti procesov</li>
                                    <li> vytváraniu a prideľovaniu činností
                                        podriadeným potomkom
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>Služby jadra pre:vytvorenie procesu, získanie ID procesu a jeho rodiča, priradenie
                                činnosti procesu, pozastavenie vykonávania procesu

                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vedieť:</td>
                            <td>
                                špecifické problémy týkajúce sa práce s procesmi
                            </td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>50 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Sofia doteraz pracovala s programami, ktoré vykonávajú jednu
                        cielenú úlohu od začiatku až do konca. A preto ju trápi otázka –
                        ako prinútiť program, aby vykonával viacero úloh, ktoré by
                        poprípade mohli byť na sebe závislé.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            Táto kapitola sa zameriava na:
            <br/>
            <ul>
                <li><strong>Systémové volania:</strong>
                    <ul>
                        <li className='terminal-command'>getpid()</li>
                        <li className='terminal-command'>fork(),getppid()</li>
                        <li className='terminal-command'>execve()</li>
                        <li className='terminal-command'>wait(), wiatpid()</li>
                        <li className='terminal-command'>exit()</li>
                    </ul>
                </li>
            </ul>
            <div className="title-box">
                <strong>KRÁTKY ÚVOD :</strong>
            </div>
            Čo je to proces? – je to prostredie, v ktorom sa realizujú programy (ako vesmír,
            v ktorom sa nachádza planéta, čiže náš „program“). Toto prostredie má napr. svoj
            adresný priestor, sú mu pridelené systémové zdroje. Proces ma pri svojom vzniku
            pridelené PID, ktoré je v systéme unikátne. Pre získanie PID aktívnych procesov slúži
            príkaz ps (jeho parametre si Sofia samostatne naštuduje). Každý proces môže vytvoriť
            ďalší proces. Medzi procesmi takto vzniká vzťah „rodič – potomok“. Bližšie informácie
            o procesoch – študijná literatúra (viď prednáška).
            <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default LessonOverview;
