import React from 'react';
import './loading-component.css'

const LoadingComponent = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingComponent;
