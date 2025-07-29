import React from 'react';
import './Loading.css';

const Loading = ({ size = 'medium', message = 'Carregando...' }) => {
  return (
    <div className={`loading-container loading-${size}`}>
      <div className="spinner"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default Loading;
