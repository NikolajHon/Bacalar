import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import data from '../data/TopicListData';
const TopicList = () => {
    // const [topics, setTopics] = useState([]);

    // useEffect(() => {
    //     const fetchTopics = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:8080/api/topics');
    //             setTopics(response.data);
    //         } catch (error) {
    //             console.error('Error fetching topics', error);
    //         }
    //     };

    //     fetchTopics();
    // }, []);



    return (
        <div className="topic-list fade-in">
            <h2>Темы курса по операционным системам</h2>

            {data.map((element) => {
                return <div className='topic-item'>
                    <h3>{element.h3}</h3>
                    <p>{element.p}</p>
                    <Link to={`/lessons/${element.Link}`} className="lesson-link">
                        Перейти к уроку
                    </Link>
                </div>
            })}
        </div>


    );
};

export default TopicList;
