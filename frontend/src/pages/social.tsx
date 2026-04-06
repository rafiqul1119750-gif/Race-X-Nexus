import React, { useState, useEffect, useRef } from 'react';
import AdOverlay from '../components/AdOverlay'; // Hum Ad component yahan import karenge

const Social = () => {
  const [reels, setReels] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [adCount, setAdCount] = useState(0);

  // Har 5 Reels ke baad Ad dikhane ka logic
  useEffect(() => {
    if (currentIdx > 0 && currentIdx % 5 === 0) {
      setShowAd(true);
      setAdCount(prev => prev + 1);
    }
  }, [currentIdx]);

  const handleSkipAd = () => {
    setShowAd(false);
    // Logic: Skip kiya toh Gems nahi milenge
    console.log("Ad Skipped: No Gems Rewarded");
  };

  return (
    <div className="social-container">
      {/* 🎬 Vertical Reel Scroll */}
      <div className="snap-container">
        {reels.map((reel, index) => (
          <div key={index} className="reel-card">
            <video src={reel.url} loop autoPlay muted />
            
            {/* Neon Sidebar Icons */}
            <div className="neon-sidebar">
              <div className="icon-glow">❤️ {reel.likes}</div>
              <div className="icon-glow">💬 {reel.comments}</div>
              <div className="icon-glow">💎 Send Gem</div>
            </div>

            {/* Content Info */}
            <div className="reel-info">
              <h3>@{reel.username}</h3>
              <p>{reel.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 📺 The Direct Ad Overlay (Skippable) */}
      {showAd && (
        <AdOverlay 
          onSkip={handleSkipAd} 
          isSkippable={true}
          rewardText="Watch full to earn 1 Gem 💎"
        />
      )}
    </div>
  );
};

export default Social;
