export const ECONOMY_RULES = {
  // --- 💎 CURRENCY CONFIG ---
  CURRENCY_NAME: "Nexus Diamonds",
  SUB_CURRENCY: "Nexus Gems",
  CONVERSION_MODE: "DIGITAL_ONLY",
  CASH_ALLOWED: false, // 🚫 Strict block on physical cash (Legal Safety)
  
  CONVERSION_RATE: {
    GEMS_TO_DIAMOND: 1000, // 1000 Gems = 1 Diamond
  },

  // --- 🎁 REWARD NODES ---
  REWARD_NODES: {
    WATCH_AD: 1,           // 1 Diamond per video ad
    DAILY_CHECKIN: 5,      // 5 Diamonds daily
    REFERRAL: 50,          // Purely digital bonus for growth
    LIKE_COMMENT_GEM: 10,  // 10 Gems per interaction
  },

  // --- 💳 GATEWAYS (Digital Tracking Only) ---
  GATEWAYS: ["Stripe", "Razorpay", "Google Pay"],

  // --- 🛡️ NEXUS PROTOCOL (Legal & Security) ---
  LIMITS: {
    REEL_MAX_SEC: 30,
    VIDEO_MAX_SEC: 60,
    COPYRIGHT_STRIKES_FREEZE: 3, // 3 tries to post 18+/Copyright = FREEZE
  },

  INACTIVITY_TIMERS: {
    INACTIVE_LIST: 30, // 30 Days: Mark Inactive
    FREEZE_ACCOUNT: 45, // 45 Days: Account Freeze
    AUTO_DELETE: 90,   // 90 Days: Permanent Data Purge
  },

  // --- 📺 AD-SYNC PROTOCOL ---
  AD_FREQUENCY: {
    FEED_POSTS: 5,        // Every 5 contents
    VIDEO_MID_ROLL: [30, 50], // Ad at 30sec and 50sec
    MUSIC_INTERVAL: 4,    // Every 4 songs = 1 Voice Ad
  }
};
