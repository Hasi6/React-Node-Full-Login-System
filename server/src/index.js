import express from "express";
import connectDB from "./config/db";
import cookieSession from "cookie-session";

// Models
import "./models/Users";

// Routes
import LoginRoute from "./routes/auth/LoginRoute";
import RegisterRoute from "./routes/auth/RegisterRoute";
import CheckAuthState from "./routes/auth/AuthRoutes";
import ForgetPassword from "./routes/auth/forgetPassword";
import ResetPassword from "./routes/auth/resetPassword";
import SendVerifyToken from "./routes/auth/sendVerifyToken";
import VerifyAccount from "./routes/auth/verifyAccount";

import cors from "cors";

import databaseData from "./config/default";
import passport from "passport";

import passportService from "./services/passport/passport";

const app = express();
const { cookieSecret } = databaseData;

// Init Middleware Body Parser
app.use(express.json());

// start Session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieSecret]
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Passport
passportService(passport);

// Database Connection
connectDB();

app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App Started at port ${PORT}`);
});

// Routes

// GET
app.use(CheckAuthState);
app.use(SendVerifyToken);
app.use(VerifyAccount);

// POST
app.use(LoginRoute);
app.use(RegisterRoute);
app.use(ForgetPassword);
app.use(ResetPassword);

// PUT

// DELETE
