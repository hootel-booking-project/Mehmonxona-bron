import { compare, hash } from "bcrypt";
import customerModel from "../models/customer.model.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const foundedUser = await customerModel.findOne({
    $or: [{ email }],
  });

  if (foundedUser) {
    return res.status(409).send({
      message: "User already exists, try another email or phone number",
    });
  }

  const passwordHash = await hash(password, 10);

  const customer = await customerModel.create({
    name,
    email,
    password: passwordHash,
  });

  res.status(201).send({
    message: "success",
    data: customer,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await customerModel.findOne({ email });

  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return res.status(401).send({
      message: "Invalid password",
    });
  }

  res.send({
    message: "success",
    data: user,
  });
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.params
    
    const user = await customerModel.findById(id)
    
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ message: "success", data: user });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params

    const { name, email, password } = req.body;

    const user = await customerModel.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await hash(password, 10);

    await user.save();

    res.send({ message: "Profile updated successfully", data: user });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

export default { register, login, getProfile, updateProfile };
