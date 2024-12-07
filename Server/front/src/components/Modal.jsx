import React from 'react';

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
