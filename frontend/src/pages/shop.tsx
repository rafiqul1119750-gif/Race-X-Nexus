import React from 'react';

const Shop = () => {
  const handleRedeem = (diamondCost: number, company: string) => {
    const confirm = window.confirm(`Kya aap ${diamondCost} Diamonds kharch karke ${company} Gift Code lena chahte hain?`);
    
    if (confirm) {
      // Biometric Check Trigger (Using Web Auth API or Mock)
      console.log("Biometric Verified...");
      // Backend call to: 
      // 1. Deduct diamonds (1 Diamond = 1 Paisa)
      // 2. Trigger automatic email to user's registered ID
      alert(`Success! ${company} code aapke email par bhej diya gaya hai.`);
    }
  };

  return (
    <div className="shop-page">
      <h2 className="neon-text">Race-X Shop</h2>
      {/* Product List */}
      <div className="product-card">
        <img src="amazon-voucher.png" alt="Amazon" />
        <p>Rate: ₹500 (50,000 Diamonds)</p>
        <button onClick={() => handleRedeem(50000, 'Amazon')}>Redeem Now</button>
      </div>
    </div>
  );
};

export default Shop;
