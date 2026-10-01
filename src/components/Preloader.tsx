import React, { useEffect, useState } from 'react';

export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (onComplete) {
            setTimeout(onComplete, 200);
          }
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="loader">
      <div className="icon">
        <img
          src="/static/media/roundLoadingLogo.d6a6e1c6cb6ca095ec12c6bdee9b2e8e.svg"
          alt="Loading animation"
          className="loading-circle"
        />
        <img
          src="/static/media/ranchLogo.1eb0c0349fd7f8618d6e6e26e7a8a161.svg"
          alt="UTU Ranch Logo"
          className="loading-logo"
        />
      </div>
      <div className="loading-progress">
        <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f56100', marginTop: '1rem', fontFamily: 'Montserrat, sans-serif' }}>
          {progress}%
        </p>
      </div>
    </div>
  );
};

export default Preloader;
