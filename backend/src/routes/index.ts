import { Router, type IRouter } from "express";
import healthRouter from "./health";
import usersRouter from "./users";
import studioRouter from "./studio"; // 👈 Confirm this import
import socialRouter from "./social";
import chatRouter from "./chat";
import musicRouter from "./music";

const router: IRouter = Router();

// Sabhi routes register ho rahe hain
router.use(healthRouter);
router.use(usersRouter);
router.use(socialRouter);
router.use(chatRouter);
router.use(musicRouter);

// 🔥 Studio routes ko register karna taki /api/create-image kaam kare
router.use(studioRouter); 

export default router;
