import { Router, Request, Response } from "express";
import FindUser from "../../database/user/findUsers";
import VerifyAccount from "../../services/email/verifyUserAccount";

const router = Router();
const findUser = new FindUser();
const verifyAccount = new VerifyAccount();

router.post("/api/sendToken", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await findUser.findUserByEmail(email);

    if (!user) {
      return res.json({ msg: false });
    }

    if (user?.verifyAccount) {
      return res.json({ msg: "Already Verified" });
    }
    const output = `<ul>
                      <li>User Token = Welcome ${user.username}</li>
                      <p><a href='http://localhost:3000/verify/${user.token}'>click here</a> for verify your account  </p>
                  </ul>`;

    await verifyAccount.verifyAccountSendEmail(email, output);

    return res.json({ msg: true });
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
