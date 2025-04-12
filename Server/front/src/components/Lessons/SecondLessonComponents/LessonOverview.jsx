import React from 'react';

const LessonOverview = () => {
    return (
        <div className="lesson-overview" id="section-0">
            <table className="info-table">
                <thead>
                <tr>
                    <th colSpan="2">Téma: Práca so súbormi v OS UNIX/Linux</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td>Súborový systém OS UNIX/Linux, súbory, práca so súbormi, iuzol</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <table className="nested-table">
                            <tbody>
                            <tr>
                                <td className="section-title">Porozumieť:</td>
                                <td>základné služby jadra pre prácu so súbormi, porozumieť parametrom služieb a súvislostiam medzi službami</td>
                            </tr>
                            <tr>
                                <td className="section-title">Aplikovať:</td>
                                <td>
                                    služby jadra pre:
                                    <ul>
                                        <li>otvorenie, zápis, čítanie zo súboru</li>
                                        <li>získanie informácií o súbore</li>
                                        <li>nastavenie prístupových práv</li>
                                        <li>vymazanie súboru</li>
                                    </ul>
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
                    <td>105 minút</td>
                </tr>
                <tr>
                    <td className="section-title">Scenár</td>
                    <td>
                        Sofia už vie pracovať s manuálovými stránkami a vie už odchytiť chybové návratové hodnoty služieb jadra svojho programu. Sofia potrebuje pre základnú prácu v OS UNIX/Linux a pre tvorbu programov
                        základné poznatky o službách jadra pre prácu so súbormi.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className='postup'>
                <h2>POSTUP:</h2>
                Táto kapitola sa zameriava na:
                <ul>
                    <li className='terminal-command'>read(), write()</li>
                    <li className='terminal-command'>open(), close()</li>
                    <li className='terminal-command'>lseek()</li>
                    <li className='terminal-command'>dup(), dup2()</li>
                    <li className='terminal-command'>stat(), fstat(), lstat()</li>
                    <li className='terminal-command'> link(), unlink(), remove()</li>
                    <li className='terminal-command'>truncate()</li>
                </ul>
            </div>

        </div>
    );
};

export default LessonOverview;
