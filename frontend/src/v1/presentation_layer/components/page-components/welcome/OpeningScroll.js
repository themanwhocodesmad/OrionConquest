import React from 'react';
import './openingScroll.css';

const OpeningScrollerComponent = ({ onStartClick }) => {
    return (
        <div className="scroller-container">
            <div className="scroller-content">
                <h2>Welcome to the Galaxy</h2>
                <p>Explore the vastness of space, build your planets, and engage in epic battles for resources...</p>
                <button onClick={onStartClick} className="start-button">Start the Adventure</button>
            </div>
        </div>
    );
};

export default OpeningScrollerComponent;
