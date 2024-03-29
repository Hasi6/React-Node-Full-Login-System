import uuidv4 from "uuid/v4";
import FindUser from "../../database/user/findUsers";
import { Router, Request, Response } from "express";
import VerifyAccount from "../../services/email/verifyUserAccount";
import SaveUserDB from "../../database/user/saveUserToDB";

const router = Router();
const findUser = new FindUser();
const saveUserDB = new SaveUserDB();

router.post("/api/register", async (req, res) => {
  const { username, email, password, image } = req.body;
  console.log(req.body);

  const verifyAccount = new VerifyAccount();

  try {
    const user = await findUser.findUserByEmail(email);

    if (user) {
      return res.json({ msg: "registered" });
    }

    const token = `${email}-${uuidv4()}`;

    const newUser = {
      username,
      email,
      password,
      image,
      token
    };

    await saveUserDB.saveUser(newUser);

    // SEND EMAIL
    const output = `<ul>
                      <li>User Token = Welcome ${username}</li>
                      <p><a href='http://localhost:3000/verify/${token}'>click here</a> for verify your account  </p>
                  </ul>`;
    await verifyAccount.verifyAccountSendEmail(email, output);
    return res.json({ msg: "user registered successfully" });
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
