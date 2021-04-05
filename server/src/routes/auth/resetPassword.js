import { Router, Response, Request } from "express";
import FindUser from "../../database/user/findUsers";

const router = Router();
const findUser = new FindUser();

router.post("/api/resetPassword", async (req, res) => {
  let { token, password } = req.body;
  try {
    const response = await findUser.findUserByTokenAndResetPassword(
      token,
      password
    );

    return res.json(response);
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
