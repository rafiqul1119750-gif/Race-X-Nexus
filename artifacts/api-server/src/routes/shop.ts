import { Router, type IRouter } from "express";
import { randomUUID } from "crypto";

const router: IRouter = Router();

const ITEMS = [
  { id: "item-001", name: "Neon Wolf Avatar Frame", description: "Premium animated avatar frame for Neon Wolves faction", price: 2500, currency: "diamonds" as const, imageUrl: "", category: "Cosmetics", discount: 0.15, inCart: false },
  { id: "item-002", name: "AI Music Pack Vol.1", description: "50 exclusive AI-generated tracks for your projects", price: 800, currency: "gems" as const, imageUrl: "", category: "Music", discount: 0, inCart: false },
  { id: "item-003", name: "Creator Studio Pro", description: "Unlock advanced studio tools and 500+ premium templates", price: 5000, currency: "diamonds" as const, imageUrl: "", category: "Tools", discount: 0.25, inCart: false },
  { id: "item-004", name: "Legendary Badge Pack", description: "3 exclusive limited-edition achievement badges", price: 1500, currency: "diamonds" as const, imageUrl: "", category: "Badges", discount: 0, inCart: false },
  { id: "item-005", name: "AR Experience Token", description: "Access to 1 premium AR/VR event space for 30 days", price: 3000, currency: "diamonds" as const, imageUrl: "", category: "AR/VR", discount: 0.1, inCart: false },
  { id: "item-006", name: "Faction Boost (7 days)", description: "2x XP and Diamonds multiplier for 7 days", price: 400, currency: "gems" as const, imageUrl: "", category: "Boosts", discount: 0, inCart: false },
  { id: "item-007", name: "NFT Artpack Genesis", description: "5 unique genesis NFT art pieces for your collection", price: 12000, currency: "diamonds" as const, imageUrl: "", category: "NFT", discount: 0.2, inCart: false },
  { id: "item-008", name: "Sound FX Bundle", description: "200+ premium sound effects for RX Studio projects", price: 600, currency: "gems" as const, imageUrl: "", category: "Music", discount: 0, inCart: false },
];

const cartItems = new Set<string>();

router.get("/shop/items", (_req, res) => {
  const items = ITEMS.map(item => ({ ...item, inCart: cartItems.has(item.id) }));
  res.json({
    items,
    cartCount: cartItems.size,
    recommended: ["item-001", "item-003", "item-006"],
  });
});

router.post("/shop/cart", (req, res) => {
  const { itemId } = req.body;
  cartItems.add(itemId);
  const item = ITEMS.find(i => i.id === itemId);
  const discountedPrice = item ? Math.floor(item.price * (1 - item.discount)) : 0;
  let total = 0;
  for (const id of cartItems) {
    const i = ITEMS.find(it => it.id === id);
    if (i) total += Math.floor(i.price * (1 - i.discount));
  }
  res.json({ cartCount: cartItems.size, totalCost: total, currency: "diamonds" });
});

export default router;
