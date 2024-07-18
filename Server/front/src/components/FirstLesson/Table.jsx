import React from 'react';
import '../../styles/FirstLessons/Table.css';

const Table = () => {
    return (
        <div className="lesson-overview">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Téma: ÚVOD – Man pages, chybový výstup</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td>UNIX/Linux manual, &lt;názov služby&gt; UNIX/Linux example, Linux documentation project</td>
                </tr>
                <tr>
                    <td className="section-title">Zapamätať si:</td>
                    <td>úloť a funkciu man pages (manuálových stránok) v UNIX/Linux</td>
                </tr>
                <tr>
                    <td className="section-title">Porozumieť:</td>
                    <td>parametrom príkazu man, premenné errno, funkcie perror a strerror</td>
                </tr>
                <tr>
                    <td className="section-title">Aplikovať:</td>
                    <td>
                        <ul>
                            <li>služby na spracovanie chýb</li>
                            <li>problémy spojené s analýzou chýb pri kompilácii</li>
                            <li>problémy súvisiace štandardného výstupu chybových správ a ich vyhodnotenie</li>
                            <li>problémy týkajúce sa nájdenia informácií o obsahu jednotlivých služieb jadra</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>35 min</td>
                </tr>
                <tr>
                    <td className="section-title">Scenár</td>
                    <td>
                        Sofia sa prvý raz stretla s OS UNIX/Linux. Nemá žiadnu predstavu o tom, ako tento system pracuje, kde má nájsť o ňom potrebné informácie a ako sa zorientovať v možnostiach a službách, ktoré jej ponúka. Zároveň by potrebovala získať skúsenosti v práci so štandardným výstupom chybových správ, pretože pomocou neho bude schopná odhaliť nielen množstvo problémov, s ktorými sa stretne pri tvorbe svojich programov.
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
