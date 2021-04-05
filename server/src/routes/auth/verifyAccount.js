import { Router, Request, Response } from "express";
import FindUser from "../../database/user/findUsers";

const findUser = new FindUser();

const router = Router();
router.get("/api/verifyAccount/:token", async (req, res) => {
  const token = req.params.token;

  try {
    const response = await findUser.findUserByTokenAndVerifyAccount(token);
    return res.json(response);
  } catch (err) {
    console.error(err.message);
  }
});
export default router;
