import jwtConfig from "../config/jwt.config.js";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import customerModel from "../models/customer.model.js";
import { comparePassword, hashPassword } from "../utils/bcrypt-hash.js";
import { generateTokens } from "../utils/tokens.js";
import { BaseException } from "../exception/base.exception.js";
import sendMail from "../utils/mail.utils.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const foundedUser = await customerModel.findOne({ email });

    if (foundedUser) {
      return res.render("register", {
        error: "User already exists",
      });
    }

    const passwordHash = await hashPassword(password);

    const customer = await customerModel.create({
      name,
      email,
      password: passwordHash,
    });

    await sendMail({
      to: email,
      subject: "Welcome",
      text: `Assalomu Alaykum ${name}, Siz Bizning Mehmonxona Saytimizdan muvaffaqiyatli royxatdan otdingiz.`,
    });

    return res.redirect("/customers/login");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await customerModel.findOne({ email });

    if (!user){
      return res.render("login", {
        error: "User not found",
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.render("login", { error: "Invalid password" });
    }

    const tokens = await generateTokens(user._id);

    res.cookie("accessToken", tokens.accessToken, {
      maxAge: 60 * 10000,
      httpOnly: true,
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 10 * 60 * 10000,
      httpOnly: true,
    });

    res.cookie("user", JSON.stringify(user));

    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await customerModel.findOne({ email });
    console.log("foundUser", user);

    if (!user) {
      return res.render("forgot-password", {
        error: "User not found",
        message: "null",
      });
    }

    const server_base_url = "http://localhost:3000";
    const token = crypto.randomBytes(50).toString("hex");
    console.log("token=>", token);

    user.token = token;

    await user.save();

    const resetLink = `http://localhost:3000/customers/reset-password?token=${token}`;

    // Send email with reset link
    await sendMail({
      to: email,
      subject: "Reset Password",
      html: `
        <h2>Salom ${user.name},</h2>
        <p>Parolingizni yangilash uchun quyidagi havolani bosing:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Agar bu siz bolmasangiz, bu xabarni e'tiborsiz qoldiring.</p>
      `,
    });

    res.render("forgot-password", {
      message: "Emailga link yuborildi, tekshiring!",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { token } = req.query;

    if (!token) {
      return res.render("login", {
        error: "Token is missing",
        message: null,
      });
    }

    const user = await customerModel.findOne({ token });

    if (!user) {
      return res.render("forgot-password", {
        error: "User topilmadi",
        message: null,
      });
    }

    const passwordHash = await hashPassword(password);

    user.password = passwordHash;
    await user.save();
    res.render("login", {
      message: "Parolingiz yangilandi",
      error: null
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await customerModel.find();

    res.send({
      message: "success",
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) return res.status(401).send({ message: "Unauthorized" });

    jwt.verify(token, jwtConfig.REFRESH_TOKEN, (err, decoded) => {
      if (err)
        return res.status(403).send({ message: "Invalid refresh token" });

      const newTokens = generateTokens(decoded.id);
      res.send({ message: "success", tokens: newTokens });
    });
  } catch (error) {
    next(error);
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, jwtConfig.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.status(403).send({ message: "Invalid Token" });

    req.userId = decoded.id;
    next();
  });
};

const getProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await customerModel.findById(id);

    if (!user) return next(new BaseException("User not found", 404));

    res.send({
      message: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await customerModel.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });

    if (!user) return next(new BaseException("User Not Found", 400));

    res.send({ message: "Profile updated successfully", data: user });
  } catch (error) {
    next(new BaseException("Internal Server Error", 500));
  }
};

export default {
  register,
  login,
  getAllUsers,
  refreshToken,
  getProfile,
  updateProfile,
  verifyToken,
  forgotPassword,
  resetPassword,
};
