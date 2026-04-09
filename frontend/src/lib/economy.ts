export const ECONOMY_RULES = {
  CURRENCY_NAME: "Nexus Diamonds",
  CONVERSION_MODE: "DIGITAL_ONLY",
  CASH_ALLOWED: false, // Strict block on physical cash
  REWARD_NODES: {
    WATCH_AD: 1, // 1 Diamond per ad
    REFERRAL: 50, // Purely digital bonus
    DAILY_CHECKIN: 5 
  },
  GATEWAYS: ["Stripe", "Razorpay", "Google Pay"] // Only digital tracking
};
