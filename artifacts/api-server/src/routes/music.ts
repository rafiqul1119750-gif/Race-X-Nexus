import { Router, type IRouter } from "express";

const router: IRouter = Router();

const TRACKS = [
  { id: "track-001", title: "Neon Circuit", artist: "RX AI Composer", duration: 187, genre: "Electronic", isAiGenerated: true, coverUrl: "", plays: 45820 },
  { id: "track-002", title: "Velocity Dreams", artist: "Neon Phoenix", duration: 234, genre: "Synthwave", isAiGenerated: false, coverUrl: "", plays: 32100 },
  { id: "track-003", title: "Digital Horizon", artist: "RX AI Composer", duration: 198, genre: "Ambient", isAiGenerated: true, coverUrl: "", plays: 28450 },
  { id: "track-004", title: "Hyperdrive", artist: "Velocity King ft. AI", duration: 312, genre: "Drum & Bass", isAiGenerated: false, coverUrl: "", plays: 67890 },
  { id: "track-005", title: "Crystal Pulse", artist: "RX AI Composer", duration: 156, genre: "Lo-Fi", isAiGenerated: true, coverUrl: "", plays: 19230 },
  { id: "track-006", title: "Shadow Protocol", artist: "Lunar Byte", duration: 267, genre: "Dark Techno", isAiGenerated: false, coverUrl: "", plays: 41560 },
  { id: "track-007", title: "Quantum Drift", artist: "RX AI Composer", duration: 220, genre: "Future Bass", isAiGenerated: true, coverUrl: "", plays: 33780 },
  { id: "track-008", title: "Aurora Cascade", artist: "Cosmic Drift", duration: 289, genre: "Ambient", isAiGenerated: false, coverUrl: "", plays: 25100 },
];

let currentlyPlaying = "";

router.get("/music/tracks", (_req, res) => {
  res.json({ tracks: TRACKS, currentlyPlaying });
});

export default router;
