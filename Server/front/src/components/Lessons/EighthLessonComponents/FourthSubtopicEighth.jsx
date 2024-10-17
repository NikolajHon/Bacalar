import React, {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const FourthSubtopicEighth = ({onComplete, completed}) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="fourth-subtopic" id="section-4">
            <table>
                <thead>
                <tr>
                    <th colSpan="2">Podtéma: Služba jadra - alarm(), sigsuspend()</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="section-title">Kľúčové slová</td>
                    <td>raise signal, <code>alarm()</code> unix</td>
                </tr>
                <tr>
                    <td className="section-title">Ciele</td>
                    <td>
                        <tr>
                            <td className="section-title">Zapamätať si:</td>
                            <td>základnú syntax
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Porozumieť:</td>
                            <td>využitiu tejto služby, jej rozdielu od služieb
                                pozastavujúcich činnosť programu
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Aplikovať:</td>
                            <td>službu pri vykonaní nejakej činnosti programu po
                                vykonaní istej doby
                            </td>
                        </tr>
                        <tr>
                            <td className="section-title">Vyriešiť:</td>
                            <td>situácie spojené s plynutím času v programe
                            </td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td className="section-title">Odhadovaný čas</td>
                    <td>10 minút</td>
                </tr>
                <tr>
                    <td className="section-title"> Scenár</td>
                    <td>Tieto služby nemajú také uplatnenie, ako predošlé služby, avšak
                        Sofia sa môže stretnúť so situáciami, v ktorých sa jej tieto služby
                        môžu hodiť. V príklade tejto podtémy sa dozvie o takejto situácii.
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="title-box">
                <strong>KRÁTKY ÚVOD:</strong>
            </div>
            <strong>KROK1 – naučiť sa syntax a sémantiku služieb:</strong> <br/>
            Služba <code>sigsuspend()</code> umožní Sofii pozastaviť činnosť programu dovtedy, pokiaľ nie je
            programu poslaný nejaký signál. Aby si precvičila túto službu, môže s ňou
            experimentovať v spojení so službou <code>alarm()</code>. Služba <code>alarm()</code> umožňuje vytváranie
            časovačov a plánovačov. Služba zaistí, že volajúcemu procesu bude po <code>sec</code> sekundách
            zaslaný signál SIGALRM. <br/> <br/>
            <div className={'annotations'}>Pre podrobnejšie informácie - <strong><code>man sigsuspend a man alarm</code></strong>.
            </div>
            <br/><br/>
            <strong>KROK2 – aplikovanie služieb v programe:</strong> <br/>
            Nasledujúci príklad pozastaví vykonávanie programu do príchodu signálu SIGALRM,
            ktorý sám sebe pošle po uplynutí 5 sekúnd službou <code>alarm()</code>.
            <pre>
                <code className={'language-c'}>
                    {
                        `
#include <signal.h> 
#include <stdio.h> 
 
void ding(int sig){ 
    printf("Odchytenie signalu %d\\n",sig); 
} 
V hlavnej časti programu sa zavolá službu alarm(), ktorá po 5 sekundách zašle signál 
SIGALRM: 

int main() 
{ 
    sigset_t mask; 
    printf("aplikacia bezi..\\n"); 
    alarm(5); 
    
    Proces pokračuje vo vykonávaní až po službu sigsuspend(). Táto služba pozastaví 
    vykonávanie programu do príchodu nejakého signálu: 
    printf("cakanie na signal..\\n"); 
    signal(SIGALRM, ding); 
    sigsuspend(&mask); 
    printf("koniec\\n"); 
    return(0); 
}                    
                        `
                    }
                </code>
            </pre>
            <br/>
            <strong>KROK3:</strong> <br/>
            Aké bolo číslo odchyteného signálu vo výpise vášho programu?: <br/> <br/>
            Výstup z programu:
            <div className={'terminal-command'}>
                $ <br/>
                aplikacia bezi..<br/>
                cakanie na signal..<br/>
                Odchytenie signalu _______ <br/>
                koniec<br/>
                $
            </div>
            <br/>
            <button onClick={onComplete} disabled={completed}>
                {completed ? "Completed" : "Mark as Complete"}
            </button>
        </div>
    );
};

export default FourthSubtopicEighth;
