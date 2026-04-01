import { Request, Response, NextFunction } from "express";

export function safetyMiddleware(req: Request, res: Response, next: NextFunction) {
  const content = req.body.content || req.body.text || "";
  const is18Plus = /18\+|adult|nude|nsfw/i.test(content);
  const hasCopyright = /copyright|infringe/i.test(content);

  if (is18Plus) {
    return res.status(403).json({ error: "Content flagged as 18+ and blocked." });
  }

  if (hasCopyright) {
    return res.status(403).json({ error: "Content may violate copyright and is blocked." });
  }

  next();
}