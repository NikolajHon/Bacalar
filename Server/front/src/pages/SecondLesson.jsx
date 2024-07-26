import React from 'react';
import '../styles/SecondLesson.css';

const FirstLessons = () => {
    return (
        <div className="second-lessons-page">
            <div className="lesson-overview">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Podtéma: Služby jadra – read() a write()</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="section-title">Kľúčové slová </td>
                            <td>read(), write(), deskriptor </td>
                        </tr>
                        <tr>
                            <td className="section-title">Ciele </td>
                            <td>
                                <tr>
                                    <td className="section-title">Zapamätať si:</td>
                                    <td>
                                        syntax služieb - prečítať si manuálové stránky v Unixe/Linuxe, Linux dokumentačný projekt, zdroje na internete:
                                        <br />
                                            <a href="http://unixhelp.ed.ac.uk/" target="_blank" rel="noopener noreferrer">http://unixhelp.ed.ac.uk/</a>
                                            <br />
                                            <a href="http://linux.about.com/od/commands/l/blcmdl2_read.htm" target="_blank" rel="noopener noreferrer">http://linux.about.com/od/commands/l/blcmdl2_read.htm</a>
                                            <br />
                                            <a href="http://linux.about.com/library/cmd/blcmdl2_write.htm" target="_blank" rel="noopener noreferrer">http://linux.about.com/library/cmd/blcmdl2_write.htm</a>
                                            
                                    </td>


                                </tr>
                                <tr>
                                    <td className="section-title">Porozumieť: </td>
                                    <td>
                                        <ul>
                                            <li>argumentom služieb </li>
                                            <li>návratovým hodnotám </li>
                                            <li>pojmu kanál</li>
                                            <li>významu súvisiacich služieb (open(),
                                                create(), dup(), lseek()) </li>
                                            <li>chybovým hláseniam </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="section-title">Aplikovať:</td>
                                    <td>služby read() a write() pri práci so súbormi </td>
                                </tr>
                                <tr>
                                    <td className="section-title">Vedieť: </td>
                                    <td>využiť získané skúsenosti pri tvorbe programov </td>
                                </tr>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Odhadovaný čas </td>
                            <td>15 minút</td>
                        </tr>
                        <tr>
                            <td className="section-title"> Scenár</td>
                            <td>Sofia má za úlohu načítať a upraviť súbor v jej adresári. Zistila, že
                                pre vyriešenie tejto úlohy jej pomôžu služby read()a write().
                                Aby však ich mohla využiť, potrebuje sa ich naučiť používať. .</td>
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
                        <li className='terminal-command'>  link(), unlink(), remove()</li>
                        <li className='terminal-command'>truncate()</li>
                    </ul>
                </div>
            </div>
            <div className='first-subtopic'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Téma: Práca so súbormi v OS UNIX/Linux</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="section-title">Kľúčové slová </td>
                            <td>Súborový systém OS UNIX/Linux, súbory, práca so súbormi, iuzol</td>
                        </tr>
                        <tr>
                            <td className="section-title">Ciele </td>
                            <td>
                                <tr>
                                    <td className="section-title">Porozumieť: </td>
                                    <td >základné služby jadra pre prácu so súbormi
                                        Porozumieť: parametrom služieb a súvislostiam medzi
                                        službami</td>
                                </tr>
                                <tr>
                                    <td className="section-title">Aplikovať:</td>
                                    <td>služby jadra pre :
                                        <ul>
                                            <li>otvorenie, zápis, čítanie zo súboru </li>
                                            <li>získanie informácií o súbore </li>
                                            <li>nastavenie prístupových práv </li>
                                            <li>vymazanie súboru</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="section-title">Vedieť: </td>
                                    <td>využiť získané skúsenosti pri tvorbe programov </td>
                                </tr>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Odhadovaný čas </td>
                            <td>105 minút</td>
                        </tr>
                        <tr>
                            <td className="section-title"> Scenár</td>
                            <td>Sofia už vie pracovať s manuálovými stránkami a vie už odchytiť
                                chybové návratové hodnoty služieb jadra svojho programu. Sofia
                                potrebuje pre základnú prácu v OS UNIX/Linux a pre tvorbu
                                programov základné poznatky o službách jadra pre prácu so
                                súbormi.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    );
};

export default FirstLessons;