import React, { useState } from 'react';
const UploadPhotoModal = ({ onClose, onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            onUpload(selectedFile); // Передаём файл в обработчик загрузки
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Загрузить фото</h2>
                <input type="file" onChange={handleFileChange} />
                <div className="modal-buttons">
                    <button onClick={onClose}>Отмена</button>
                    <button onClick={handleUpload} disabled={!selectedFile}>Загрузить</button>
                </div>
            </div>
        </div>
    );
};

export default UploadPhotoModal;
