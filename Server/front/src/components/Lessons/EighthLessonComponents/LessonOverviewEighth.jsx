import React from 'react';

const LessonOverview = ({onComplete, completed}) => {
    return (
        <div className="lesson-overview" id="section-0">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Téma: Signály</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td>medziprocesová komunikácia, procesy, signály</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                <li>základné princípy komunikácie medzi
                                    procesmi prostredníctvom signálov
                                </li>
                                <li>fakty o odchytávaní a posielaní signálov</li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>
                                komunikácii procesov pomocou signálov
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>
                                <li>
                                    služby posielajúce signály
                                </li>
                                <li>
                                    metódy odchytávania signálov
                                </li>
                                <li>
                                    metódy ignorovania signálov
                                </li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vyriešiť:</td>
                            <td>
                                zložitejšie príklady medziprocesovej
                                komunikácie
                            </td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>36 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Procesy sami o sebe dokážu vykonávať dôležité činnosti, ich sila
                        sa prejavuje až v spojení s inými procesmi, teda ich
                        komunikáciou. Jedným zo spôsobov komunikácie medzi procesmi
                        sa Sofia dozvie v tejto téme.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>POSTUP:</strong>
            </div>
            Táto kapitola sa zameriava na:
            <ul>
                <li><strong>Príkaz:</strong>
                    <ul>
                        <li className='terminal-command'>kill</li>
                    </ul>
                </li>
                <li><strong>Systémové volania:</strong>
                    <ul>
                        <li className='terminal-command'>signal()</li>
                        <li className='terminal-command'>kill()</li>
                        <li className='terminal-command'>alarm()</li>
                        <li className='terminal-command'>sigsuspend()</li>
                    </ul>
                </li>
            </ul>
            Práca navyše:
            <ul>
                <li><strong>Systémové volania:</strong>
                    <ul>
                        <li className='terminal-command'>sigaction()</li>
                        <li className='terminal-command'>sigaddset()</li>
                        <li className='terminal-command'>sigemptyset()</li>
                        <li className='terminal-command'>sigfillset()</li>
                        <li className='terminal-command'>sigdelset()</li>
                        <li className='terminal-command'>sigprocset()</li>
                    </ul>
                </li>
                <li><strong>Systémové volania:</strong>
                    <ul>
                        <li className='terminal-command'>sigaction</li>
                    </ul>
                </li>
            </ul>
            <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default LessonOverview;
