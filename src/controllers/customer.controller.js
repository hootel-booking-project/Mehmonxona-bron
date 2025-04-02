import jwtConfig from "../config/jwt.config.js";
import jwt from "jsonwebtoken";
import customerModel from "../models/customer.model.js";
import { comparePassword, hashPassword } from "../utils/bcrypt-hash.js";
import { generateTokens } from "../utils/tokens.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const foundedUser = await customerModel.findOne({ email });

  if (foundedUser) {
    return res.status(409).send({
      message: "User already exists, try another email",
    });
  }

  const passwordHash = await hashPassword(password)

  const customer = await customerModel.create({
    name,
    email,
    password: passwordHash,
  });

  const tokens = await generateTokens(customer._id);
 
  res.status(201).send({
    message: "success",
    data: customer,
    tokens,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await customerModel.findOne({ email });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const isMatch = await comparePassword(password, user.password)

  if (!isMatch) {
    return res.status(401).send({ message: "Invalid password" });
  }

  const tokens = await generateTokens(user._id);

  res.send({ message: "success", data: user, tokens });
};

const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, jwtConfig.REFRESH_TOKEN, (err, decoded) => {
    if (err) return res.status(403).send({ message: "Invalid refresh token" });
    const newTokens = generateTokens(decoded.id);
    res.send({ message: "success", tokens: newTokens });
  });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, jwtConfig.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.params
    const user = await customerModel.findById(id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send({ message: "success", data: user });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params

    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10)
    const user = await customerModel.findByIdAndUpdate(id, { name, email, hashedPassword})

    if (!user) return res.status(404).send({ message: "User not found" });

    res.send({ message: "Profile updated successfully", data: user });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

export default { register, login, refreshToken, getProfile, updateProfile, verifyToken };
