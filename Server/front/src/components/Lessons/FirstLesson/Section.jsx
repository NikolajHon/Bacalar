import React from 'react';

const Section = () => {
    return (
        <div className="section-container">
            <table className="section-table">
                <thead>
                <tr>
                    <th>Časť</th>
                    <th>Popis</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>spustiteľné programy a prikazy shellu</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>služby jadra operačného systému</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>služby knižnice operačného systému</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>špeciálne súbory (obyčajne v adresári /dev/ )</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>formáty súborov, protokolov a štruktúry jazyka C</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>Hry</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>rôzne (dohody, protokoly, znakové normy, rozvrhnutie súborového systému,...)</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>administrácia systému</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>rutiny jadra operačného systému (nie je to štandardná časť man pages)</td>
                </tr>
                </tbody>
            </table>

            <p>Pre podrobnejšie informácie zadá prikaz <code className="terminal-command">man 1 man</code>.</p>
            <p>O tom, ktorá časť čo zahŕňa, sa Sofia môže dozvedieť z úvodu (intra) každej z nich.</p>
            <p>Prečítať <code className="terminal-command">man 1 intro, man 2 intro, man 3 intro, ...</code></p>
            <p>
                Čo má však Sofia robiť v tom prípade, ak nevie, v ktorej časti man pages sa potrebná služba nachádza?
                V tom jej môže pomôcť prikaz:
            </p>
            <p><code className="terminal-command">man -f &lt;názov služby&gt;</code></p>
            <p>
                Teda ak Sofia nevie, v ktorej časti man pages sa nachádzajú informácie o službe <code className="terminal-command">open()</code>,
                zadá:
            </p>
            <p><code className="terminal-command">man -f open</code></p>
            <p>
                Po zistení čísla časti (pri službe open() je to „2“) už len stačí, ak zadá:
            </p>
            <p><code className="terminal-command">man 2 open</code> - alebo len - <code className="terminal-command">man -s 2 open</code></p>
            <p>
                Druhá možnosť je v prípade neznámych služieb trochu riskantná, pretože operačný systém môže poskytovať
                niekoľko manuálových stránok pre zadanú službu a teda zadaním <code className="terminal-command">služby</code> jej môže vrátiť zlý výsledok.
            </p>
            <p>
                V prípade, ak Sofia nevie, ktorú vlastne hľadá, resp. všetky služby by mala použiť,
                zadá <code className="terminal-command">man -k &lt;služba&gt;</code>, ktorý vypíše všetky služby, ktoré obsahujú
                <code className="terminal-command">služba</code> v stručný popisom. Napríklad by Sofia chcela vedieť, ktoré služby sa týkajú práv vlastníka súborov:
            </p>
            <p><code className="terminal-command">man -k owner</code></p>
            <p>
                Ak si Sofia našla a prečítala manuálovú stránku, tak potom potrebuje opustiť man pages.
                Dozvedela sa, že k tomu jej stačí iba stlačenie klávesy <code className="terminal-command">q</code>.
            </p>

            <h2>Linux - dokumentačný projekt, knihy a iné zdroje</h2>
            <p>
                Jedným z mnohých zdrojov informácií môže byť pre Sofiu aj „Linux - dokumentačný projekt“
                (voľne dostupný na internete - <a href="http://www.tldp.org/">http://www.tldp.org/</a>).
                Obsahuje vcelku detailný popis činností OS Linux. Zahŕňa však skôr praktické použitie služieb jadra,
                než vysvetlenie ich syntaxe. O nej sa Sofia môže dozvedieť okrem z vyššie spomínaných zdrojov aj zo špecializovaných publikácií.
            </p>

            <h2>Hlavičkové súbory</h2>
            <p>
                Sofia môže získať vedomosti o potrebných službách aj z hlavičkových súborov,
                o ktorých sa dozvedela, že ich je potrebné pripojiť k programu pre správnu funkčnosť
                služby jadra. Hlavičkové súbory jazyka C sa nachádzajú v adresári Linuxu -
                „/usr/include/“, prípadne „/usr/include/sys/“. Takže, ak sa Sofia bude chcieť niečo
                dozvedieť o službe open(), najprv si zistí (napr. pomocou manuálu), aké hlavičkové
                súbory potrebuje táto služba a potom si v adresári „/usr/include/“ otvorí potrebný
                hlavičkový súbor pomocou príkazu „<code className="terminal-command">cat &lt;meno_hlavičkového_súboru&gt;</code>“, ktorý zobrazí jeho obsah. Alebo, ešte lepšie, použije svoj obľúbený textový editor na otvorenie tohto hlavičkového súboru.
            </p>

            <h2>Zdrojové kódy</h2>
            <p>
                OS Linux je Open source, čo znamená, že zdrojové kódy jednotlivých systémových volaní sú voľne prístupné (prezerateľné).
                To vytvára ďalšiu možnosť pre Sofiu, ako sa oboznámiť s funkčnosťou jednotlivých služieb.
                Zdrojový kód jadra Linuxu je umiestnený v „/usr/src/linux/“, teda ak by Sofia cítila potrebu hĺbšieho pochopenia
                činností pamätí, procesov alebo zariadení, zdrojové kódy sú jej plne k dispozícii.
            </p>
        </div>
    );
};

export default Section;
