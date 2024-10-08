import React from 'react';
import '../styles/Modal.css'

const Modal = ({ onClose, children }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
                {children}
        </div>
    );
};

export default Modal;
