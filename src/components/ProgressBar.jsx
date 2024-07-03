import React, { useState, useEffect } from 'react';

const ProgressBar = ({ loading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => (prev < 90 ? prev + 10 : prev)); // Incrementa hasta 90% para simular progreso
      }, 500);
    } else {
      setProgress(100); // Completa la barra al recibir la respuesta
    }

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div style={{ width: '100%', backgroundColor: '#6B7280', height: '10px' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#1F2937',
          transition: 'width 0.5s ease-in-out',
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;

