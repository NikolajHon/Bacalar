
import React from 'react';
import './ErrorMessage.css'; 

const ErrorMessage = ({ message, type }) => {
    return (
        <div className={`error-message ${type}`}>
            {message}
        </div>
    );
};

export default ErrorMessage;
