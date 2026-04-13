import { Router, type IRouter } from "express";
import healthRouter from "./health";
import usersRouter from "./users";
import modulesRouter from "./modules";
import rewardsRouter from "./rewards";
import eventsRouter from "./events";
import leaderboardRouter from "./leaderboard";
import adminRouter from "./admin";
import enforcementRouter from "./enforcement";
import socialRouter from "./social";
import chatRouter from "./chat";
import musicRouter from "./music";
import shopRouter from "./shop";

// 🔥 Naya Studio Router Import (AI Generation ke liye)
import studioRouter from "./studio"; 

const router: IRouter = Router();

// --- Core System Routes ---
router.use(healthRouter);
router.use(usersRouter);

// --- AI & Content Routes ---
// 👉 Ye line aapke Studio ke saare buttons (Image, Video, Music) ko active kar degi
router.use("/studio", studioRouter); 

router.use(modulesRouter);
router.use(rewardsRouter);
router.use(eventsRouter);
router.use(leaderboardRouter);
router.use(adminRouter);
router.use(enforcementRouter);
router.use(socialRouter);
router.use(chatRouter);
router.use(musicRouter);
router.use(shopRouter);

export default router;
