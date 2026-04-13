import { Router, type IRouter } from "express";
import healthRouter from "./health";
import usersRouter from "./users";
import studioRouter from "./studio"; // 👈 Confirm this file exists in routes/
import socialRouter from "./social";
import chatRouter from "./chat";
import musicRouter from "./music";

const router: IRouter = Router();

// Ye saare routes register ho rahe hain
router.use(healthRouter);
router.use(usersRouter);
router.use(socialRouter);
router.use(chatRouter);
router.use(musicRouter);

// 🔥 Studio ke endpoints ko bina kisi prefix ke add kar rahe hain 
// taki ye /api/create-image ban jaye
router.use(studioRouter); 

export default router;
