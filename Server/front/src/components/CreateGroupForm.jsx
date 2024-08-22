import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CreateGroupForm.css'

const CreateGroupForm = ({ onGroupCreated }) => {
    const [name, setName] = useState(''); // Стейт для имени группы
    const [teacherId, setTeacherId] = useState(''); // Стейт для ID выбранного учителя
    const [searchTerm, setSearchTerm] = useState(''); // Стейт для строки поиска
    const [teachers, setTeachers] = useState([]); // Стейт для списка всех учителей
    const [filteredTeachers, setFilteredTeachers] = useState([]); // Стейт для отфильтрованных учителей
    const [showDropdown, setShowDropdown] = useState(false); // Стейт для управления отображением выпадающего списка

    useEffect(() => {
        // Загружаем всех учителей при первом рендере компонента
        axios.get('http://localhost:8080/api/users/teachers')
            .then(response => {
                setTeachers(response.data);
                setFilteredTeachers(response.data); // По умолчанию показываем всех учителей
            })
            .catch(error => console.error('Ошибка при получении учителей:', error));
    }, []);

    const handleSearchTermChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            // Фильтруем учителей по введенному термину
            const filtered = teachers.filter(teacher =>
                teacher.username && teacher.username.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredTeachers(filtered);
            setShowDropdown(true); // Показываем выпадающий список
        } else {
            setShowDropdown(false); // Скрываем выпадающий список, если строка поиска пуста
        }
    };

    const handleTeacherSelect = (teacher) => {
        setSearchTerm(teacher.username); // Устанавливаем имя выбранного учителя в строку поиска
        setTeacherId(teacher.id); // Сохраняем ID выбранного учителя
        setShowDropdown(false); // Закрываем выпадающий список после выбора учителя
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Отправляем запрос на создание новой группы
        axios.post('http://localhost:8080/api/groups', { name, teacher: { id: teacherId } })
            .then(response => {
                onGroupCreated(response.data); // Вызываем callback для обновления списка групп
            })
            .catch(error => {
                console.error('Ошибка при создании группы:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Название группы:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    maxLength={1}
                />
            </div>
            <div>
                <label>Учитель:</label>
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={handleSearchTermChange} 
                    placeholder="Введите имя учителя для поиска"
                />
                {/* Выпадающий список появляется, когда showDropdown === true */}
                {showDropdown && (
                    <ul className="dropdown">
                        {filteredTeachers.map(teacher => (
                            <li key={teacher.id} onClick={() => handleTeacherSelect(teacher)}>
                                {teacher.username}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button type="submit">Создать группу</button>
        </form>
    );
};

export default CreateGroupForm;
