import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Tailwind & Global Styles Node

/**
 * 🚀 RACE-X ENTRY NODE
 * Yahan se aapka "Quantum Nexus" render hona shuru hota hai.
 * Hum StrictMode use kar rahe hain taaki development mein 
 * bugs pehle hi pakde jayein.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
