import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import AdBanner from './AdBanner';

const App = () => {
  return (
    <div>
      <AdBanner />
      <Home />
    </div>
  );
};

export default App;
