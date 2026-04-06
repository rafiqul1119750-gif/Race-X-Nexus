import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Social from './pages/social';
import Studio from './pages/studio';
import Shop from './pages/shop';
import Chat from './pages/chat';
import Profile from './pages/profile';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Splash logic handle here */}
        <Routes>
          <Route path="/" element={<Social />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        
        {/* Global Navigation Bar with Neon Icons */}
        <nav className="neon-nav">
          {/* Icons: 🎬, ⚡, 🤖, 🎧, 💎 */}
        </nav>
      </div>
    </Router>
  );
}

export default App;
