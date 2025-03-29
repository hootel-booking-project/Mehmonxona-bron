import jwtConfig from "../config/jwt.config.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import customerModel from "../models/customer.model.js";

const generateTokens = (id) => {
  const accessToken = jwt.sign({ id }, jwtConfig.ACCESS_TOKEN, { expiresIn: jwtConfig.ACCESS_TOKEN_EXPIRE });
  const refreshToken = jwt.sign({ id }, jwtConfig.REFRESH_TOKEN, { expiresIn: jwtConfig.REFRESH_TOKEN_EXPIRE });
  return { accessToken, refreshToken };
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const foundedUser = await customerModel.findOne({ email });

  if (foundedUser) {
    return res.status(409).send({
      message: "User already exists, try another email",
    });
  }

  const passwordHash = await hash(password, 10);

  const customer = await customerModel.create({
    name,
    email,
    password: passwordHash,
  });

  const tokens = generateTokens(customer._id);

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

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return res.status(401).send({ message: "Invalid password" });
  }

  const tokens = generateTokens(user._id);

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
    const user = await customerModel.findById(req.userId);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send({ message: "success", data: user });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await customerModel.findById(req.userId);

    if (!user) return res.status(404).send({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await hash(password, 10);

    await user.save();

    res.send({ message: "Profile updated successfully", data: user });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

export default { register, login, refreshToken, getProfile, updateProfile, verifyToken };
