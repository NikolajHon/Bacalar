import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import data from '../data/TopicListData';
const TopicList = () => {



    return (
        <div className="topic-list fade-in">
            <h2>Темы курса по операционным системам</h2>

            {data.map((element, index) => {
                return <div className='topic-item'>
                    <h3>{element.h3}</h3>
                    <p>{element.p}</p>
                    <div style={{ textAlign: 'center' }}>
                        <Link to={`/lessons/${element.Link}`} className="lesson-link">
                            Перейти к уроку
                        </Link>
                        <Link to={`/lessons/test/${index}`} className="test-link">
                            Check your knowledge
                        </Link>
                    </div>


                </div>
            })}
        </div>


    );
};

export default TopicList;
