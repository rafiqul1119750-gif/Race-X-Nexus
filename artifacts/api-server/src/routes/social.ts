import { Router, type IRouter } from "express";
import { randomUUID } from "crypto";

const router: IRouter = Router();

const likedPosts = new Set<string>();
const savedPosts = new Set<string>();

const MOCK_POSTS = [
  { id: "post-001", authorId: "user-002", authorName: "Neon Phoenix", authorAvatar: "", content: "Just dropped my latest AI-generated music track! 🔥 The beats are insane — pure neon energy. Check it out in RX Music!", imageUrl: "", likes: 2847, comments: 342, timestamp: new Date(Date.now() - 3600000).toISOString(), tags: ["music", "ai", "neon"] },
  { id: "post-002", authorId: "user-legendary-1", authorName: "Velocity King", authorAvatar: "", content: "Season 7 tournament is LIVE! 🏆 I'm currently ranked #1 — who's coming for my crown? Drop your game in the comments!", imageUrl: "", likes: 15420, comments: 1892, timestamp: new Date(Date.now() - 7200000).toISOString(), tags: ["tournament", "pvp", "challenge"] },
  { id: "post-003", authorId: "user-legendary-5", authorName: "Cosmic Drift", authorAvatar: "", content: "Working on my new RX Studio project — sci-fi themed short film with AI visual effects. Here's a sneak peek of the storyboard! 🎬", imageUrl: "", likes: 4230, comments: 567, timestamp: new Date(Date.now() - 14400000).toISOString(), tags: ["studio", "scifi", "film"] },
  { id: "post-004", authorId: "user-legendary-6", authorName: "Pixel Racer", authorAvatar: "", content: "Just unlocked the Legendary Creator badge after 500 posts! 💎 This community is everything. Thank you RX fam! 🙏", imageUrl: "", likes: 8910, comments: 1240, timestamp: new Date(Date.now() - 21600000).toISOString(), tags: ["milestone", "achievement", "community"] },
  { id: "post-005", authorId: "user-legendary-7", authorName: "Lunar Byte", authorAvatar: "", content: "AI Music Generator just got an update — it now produces full 3-minute tracks with vocal synthesis! 🎵 Testing it out now...", imageUrl: "", likes: 3150, comments: 428, timestamp: new Date(Date.now() - 43200000).toISOString(), tags: ["music", "ai", "update"] },
];

const postLikes = new Map(MOCK_POSTS.map(p => [p.id, p.likes]));

router.get("/social/feed", (_req, res) => {
  const posts = MOCK_POSTS.map(p => ({
    ...p,
    likes: postLikes.get(p.id) || p.likes,
    isLiked: likedPosts.has(p.id),
    saved: savedPosts.has(p.id),
  }));
  res.json({
    posts,
    trending: ["#neonbeats", "#pvpchallenge", "#airacing", "#creators2026", "#seasonfinale", "#rxstudio"],
  });
});

router.post("/social/posts/:postId/like", (req, res) => {
  const { postId } = req.params;
  const currentLikes = postLikes.get(postId) || 0;
  const isLiked = likedPosts.has(postId);
  if (isLiked) {
    likedPosts.delete(postId);
    postLikes.set(postId, Math.max(0, currentLikes - 1));
  } else {
    likedPosts.add(postId);
    postLikes.set(postId, currentLikes + 1);
  }
  res.json({ liked: !isLiked, count: postLikes.get(postId) });
});

export default router;
