import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import Obr1 from "../../../images/SeventhPageImg/Obr1.png"

const FirstSubtopicEleventh = () => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="first-subtopic" id="section-1">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Príkaz - kill</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td><code>kill</code>, send signal</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>
                                <li> najdôležitejšie parametre tohto príkazu
                                </li>
                                <li> jeho syntax
                                </li>
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>funkcii a využitiu príkazu
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>pre potrebu ukončenia alebo signalizácie
                                procesu
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vedieť:</td>
                            <td>špecifické situácie súvisiace s uviaznutím
                                procesu
                            </td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>3 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Pokiaľ chce Sofia poslať signál inému procesu prostredníctvom
                        príkazového riadku, použije príkaz <code>kill</code>. Aby ho mohla využívať,
                        potrebuje sa ho naučiť používať.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>KRÁTKY ÚVOD:</strong>
            </div>
        </div>
    );
};

export default FirstSubtopicEleventh;
