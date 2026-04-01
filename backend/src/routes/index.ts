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

const router: IRouter = Router();

router.use(healthRouter);
router.use(usersRouter);
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
