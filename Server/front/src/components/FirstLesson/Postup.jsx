import React from 'react';
import '../../styles/FirstLessons/Postup.css';

const Postup = () => {
    return (
        <div className="postup-container">
            <h2>POSTUP:</h2>
            <div className="postup-section">
                <h3>Internet</h3>
                <p>
                    Prvým zdrojom informácií pre Sofiu o OS UNIX/Linux (v dnešnej dobe skoro pri všetkom) je internet. Otvorí si teda svoj obľúbený internetový prehliadač. Keďže potrebuje nejaké informácie o OS UNIX/Linux, do príslušnej kolónky prehliadača vypíše „unix manual“, alebo „Linux manual“. Z veľkého množstva výsledkov vyhľadávania si postupne vyberie tie, ktoré jej vyhovujú. Postupne, ako sa bude dozvedať o jednotlivých službách v OS UNIX/Linux, môže na internete vyhľadávať informácie týkajúce sa konkrétnej služby tak, že do vyhľadávacia vpíše názov tejto služby spolu so slovom unix resp. Linux – napr.: „open“ unix, alebo „open“ Linux“.
                </p>
            </div>
            <div className="postup-section">
                <h3>Man pages</h3>
                <p>
                    Ďalším zdrojom informácií môžu byť pre Sofiu manuálové stránky (man pages), ktoré sú súčasťou každej distribúcie OS Linux/Unix. Sofia postupne zistí, že väčšina zdrojov na internete o nejakých službách OS UNIX/Linux je kópiou man pages.
                    <br />
                    Man pages sa rozdeľujú na niekoľko častí. V každej časti sú príkazy/služby, ktoré spolu logicky súvisia. Rozdelenie je nasledovné:
                </p>
            </div>
        </div>
    );
}

export default Postup;
