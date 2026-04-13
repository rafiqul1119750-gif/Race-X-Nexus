import { Router, type IRouter } from "express";
import healthRouter from "./health";
import usersRouter from "./users";
import studioRouter from "./studio"; // 👈 Make sure studio.ts exists in same folder
import socialRouter from "./social";
import chatRouter from "./chat";
import musicRouter from "./music";

const router: IRouter = Router();

// Ye saare routes ab "/api/..." ke peeche honge
router.use(healthRouter);
router.use(usersRouter);
router.use(socialRouter);
router.use(chatRouter);
router.use(musicRouter);

// 🔥 Studio routes ko register karna
router.use(studioRouter); 

export default router;
