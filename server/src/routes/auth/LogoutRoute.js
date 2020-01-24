import { Router, Request, Response } from "express";

const router = Router();

router.get("/api/logout", (req, res) => {
  req.logout();
  return res.json({ msg: "User Logged Out" });
});

export default router;
