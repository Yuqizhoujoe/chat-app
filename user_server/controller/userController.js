import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import upload from "../middleware/multer.js";

// models
import User, { mapUserLoginData, mapUserSignUpData } from "../models/User.js";

// constant
const USER_CONTROLLER = "USER_CONTROLLER";

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Token is required!");

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
  } catch (error) {
    return res.status(403).send("Invalid Token!");
  }
  next();
};

const signUp = async (req, res) => {
  try {
    const userData = await mapUserSignUpData(req);
    const user = await User.create({
      ...userData,
    });
    console.log(`USER_CONTROLLER_SIGN_UP_USER: `, user);
    res.status(200).json(user);
  } catch (error) {
    console.log(`${USER_CONTROLLER}_SIGN_UP_ERROR: `, error);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const userData = mapUserLoginData(req);

    // find user by email
    const existedUser = await User.findOne({
      where: { email: userData.email },
    });
    if (!existedUser) {
      return res.status(401).json({ error: "User not found!" });
    }

    // check password is valid
    const isPasswordValid = bcrypt.compare(
      userData.password,
      existedUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Password is invalid!" });
    }

    // sign the token
    const token = jwt.sign(
      { id: existedUser.id, email: existedUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      user: {
        userId: existedUser.id,
        username: existedUser.username,
        avatar: existedUser.avatar,
      },
    });
  } catch (error) {
    console.error(`${USER_CONTROLLER}_LOGIN_ERROR: `, error);
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(`${USER_CONTROLLER}_GET_USER_ERROR: `, error);
    res.status(500).json({ error: error.message });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("USER_CONTROLLER_GET_USERNAME_ERROR: ", error);
    res.status(500).json({ error: error.message });
  }
};

// router.get("/:userId", getUserById);
router.get("/:username", getUserByUsername);
router.post("/signup", upload.single("avatar"), signUp);
router.post("/login", login);

export default router;
