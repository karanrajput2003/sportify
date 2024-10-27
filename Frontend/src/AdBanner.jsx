import React, { useEffect, useState } from 'react';
import adsData from './adsData';

const AdBanner = () => {
  const [currentAd, setCurrentAd] = useState(null);
  const [adVisible, setAdVisible] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomAd = adsData[Math.floor(Math.random() * adsData.length)];
      setCurrentAd(randomAd);
      setAdVisible(true);
    }, 15000); // Change ad every 15 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const handleCancel = () => {
    setAdVisible(false);
  };

  if (!adVisible || !currentAd) return null; // Don't render if ad is not visible

  return (
    <div style={styles.floatingContainer}>
      <div style={styles.banner}>
        <a href={currentAd.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
          <img src={currentAd.imageUrl} alt={currentAd.title} style={styles.image} />
          <h2 style={styles.title}>{currentAd.title}</h2>
          <p style={styles.description}>{currentAd.description}</p>
        </a>
        <button onClick={handleCancel} style={styles.cancelButton}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  floatingContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
  },
  banner: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#fff',
    animation: 'fade-in 0.5s',
    position: 'relative',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  title: {
    fontSize: '1.2em',
    color: '#333',
    margin: '10px 0',
  },
  description: {
    color: '#555',
    padding: '0 10px',
  },
  cancelButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: '#FF5733',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    padding: '5px 8px',
    fontSize: '0.9em',
  },
};

export default AdBanner;
