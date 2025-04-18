import React from 'react';
import Slider from 'react-slick';

const GroupsCarousel = ({ groups, onCardClick }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,  // Показывать 3 карточки одновременно
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="groups-carousel">
            <h1>List of Groups</h1>
            <Slider {...settings}>
                {groups.map(group => (
                    <div 
                        key={group.id} 
                        className="group-card"
                        onClick={() => onCardClick(group.id)}
                    >
                        <div className="group-title">{group.name}</div>
                        <div className="group-meta">
                            <span>Number of Students: {group.studentsCount}</span>
                            <span>Group ID: {group.id}</span>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default GroupsCarousel;
