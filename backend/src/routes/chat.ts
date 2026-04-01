import { Router, type IRouter } from "express";
import { randomUUID } from "crypto";

const router: IRouter = Router();

const messages = [
  { id: randomUUID(), senderId: "ai-system", senderName: "RX AI Assistant", senderAvatar: "", content: "Welcome to RX Magic Chat! 🚀 I'm your AI assistant. What do you want to create today?", timestamp: new Date(Date.now() - 3600000).toISOString(), type: "ai" as const },
  { id: randomUUID(), senderId: "user-002", senderName: "Neon Phoenix", senderAvatar: "", content: "Hey! Anyone joining the Neon Velocity Championship? Let's form a team! 🔥", timestamp: new Date(Date.now() - 1800000).toISOString(), type: "text" as const },
  { id: randomUUID(), senderId: "system", senderName: "RX System", senderAvatar: "", content: "🏆 LIVE EVENT ALERT: Neon Velocity Championship Round 3 starts in 10 minutes!", timestamp: new Date(Date.now() - 600000).toISOString(), type: "system" as const },
  { id: randomUUID(), senderId: "user-legendary-1", senderName: "Velocity King", senderAvatar: "", content: "Who wants a 1v1 content battle? I'm at rank #1 and looking for challengers 😈", timestamp: new Date(Date.now() - 300000).toISOString(), type: "text" as const },
];

router.get("/chat/messages", (_req, res) => {
  res.json({
    messages,
    aiSuggestions: [
      "Tell me about the latest events",
      "How do I earn more Diamonds?",
      "Show me trending content",
      "Challenge someone to a PvP battle",
    ],
  });
});

router.post("/chat/messages", (req, res) => {
  const { content, roomId } = req.body;
  const message = {
    id: randomUUID(),
    senderId: "user-001",
    senderName: "RX Creator",
    senderAvatar: "",
    content,
    timestamp: new Date().toISOString(),
    type: "text" as const,
  };
  messages.push(message);

  const aiReplies = [
    "Great message! Keep the energy high! 🔥",
    "The RX community loves your engagement! 💎",
    "You earned 10 Gems for being active! 💠",
    "Level up! Your reputation is growing! ⚡",
  ];
  const aiReply = {
    id: randomUUID(),
    senderId: "ai-system",
    senderName: "RX AI",
    senderAvatar: "",
    content: aiReplies[Math.floor(Math.random() * aiReplies.length)],
    timestamp: new Date().toISOString(),
    type: "ai" as const,
  };
  messages.push(aiReply);

  res.status(201).json(message);
});

export default router;
