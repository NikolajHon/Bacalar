import React, { useState, useEffect } from 'react';

const LessonContent = ({ subtopics }) => {
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            let currentSection = null;
            subtopics.forEach((item, index) => {
                const element = document.getElementById(`section-${index}`);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        currentSection = index;
                    }
                }
            });
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [subtopics]);

    return (
        <div className="lesson-content">
            <h3>Lesson contents</h3>
            <ul className="content-list">
                {subtopics.map((item, index) => (
                    <li
                        key={index}
                        className={`content-item ${activeSection === index ? 'active' : ''}`}
                        onClick={() => {
                            const targetElement = document.getElementById(`section-${index}`);
                            if (targetElement) {
                                targetElement.scrollIntoView({ behavior: 'smooth' });
                                setActiveSection(index);
                            }
                        }}
                    >
                        {item.p}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LessonContent;
