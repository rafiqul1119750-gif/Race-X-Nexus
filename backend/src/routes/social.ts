import { Router, type IRouter } from "express";
import { getAllPosts, createPost, addComment } from "../lib/appwrite";

const router: IRouter = Router();

// 1. ASLI FEED: Appwrite se posts laane ke liye
router.get("/social/feed", async (_req, res) => {
  try {
    const response = await getAllPosts();
    
    // Appwrite ke documents ko format kar rahe hain taaki frontend ko samajh aaye
    const posts = response.documents.map((doc: any) => ({
      id: doc.$id,
      authorId: doc.user_id,
      authorName: doc.user_name || "Race-X User",
      content: doc.content,
      imageUrl: doc.image_url || "",
      likes: doc.likes || 0,
      comments: doc.comments_count || 0,
      timestamp: doc.$createdAt,
    }));

    res.json({
      posts,
      trending: ["#neonbeats", "#RaceX", "#AI_Creator", "#MizoramTech"],
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 2. NAYA POST: Appwrite mein post save karne ke liye
router.post("/social/post", async (req, res) => {
  try {
    const { content, user_id, user_name, image_url } = req.body;
    const newPost = await createPost({
      content,
      user_id,
      user_name,
      image_url,
      likes: 0,
      comments_count: 0
    });
    res.status(201).json(newPost);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. COMMENT: Appwrite mein comment save karne ke liye
router.post("/social/comment", async (req, res) => {
  try {
    const { text, post_id, user_id, user_name } = req.body;
    const newComment = await addComment({
      text,
      post_id,
      user_id,
      user_name
    });
    res.status(201).json(newComment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
