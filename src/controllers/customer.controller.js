import jwtConfig from "../config/jwt.config.js";
import jwt from "jsonwebtoken";
import customerModel from "../models/customer.model.js";
import { comparePassword, hashPassword } from "../utils/bcrypt-hash.js";
import { generateTokens } from "../utils/tokens.js";
import { BaseException } from "../exception/base.exception.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const foundedUser = await customerModel.findOne({ email });

    if (foundedUser) {
      throw new BaseException(
       "User already exists, try another email or password",
        409
      )

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
  } catch (error) {
    next(error)
  }
};

const login = async (req, res, next) => {
 try {
  const { email, password } = req.body;

  const user = await customerModel.findOne({ email });

  if (!user) {
    throw new BaseException("User not found", 404);
  }

  const isMatch = await comparePassword(password, user.password)

  if (!isMatch) {
    throw new BaseException("Invalid password", 401);
  }

  const tokens = await generateTokens(user._id);

  res.send({ 
    message: "success",
    data: user,
    tokens
  });
 } catch (error) {
    next(error)
 }
};

const refreshToken = (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) return res.status(401).send({ message: "Unauthorized" });
  
    jwt.verify(token, jwtConfig.REFRESH_TOKEN, (err, decoded) => {
      if (err) return res.status(403).send({ message: "Invalid refresh token" });
      const newTokens = generateTokens(decoded.id);
      res.send({ message: "success", tokens: newTokens });
    });
  } catch (error) {
    next(error)
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, jwtConfig.ACCESS_TOKEN, (err, decoded) => {
    if (err) return next(BaseException('Invalid Token',403))
    
    req.userId = decoded.id;
  });
};

const getProfile = async (req, res, next) => {
   try {
    const { id } = req.params
    const user = await customerModel.findById(id)
    .populate("booking");
    
    if (!user) return next(new BaseException('user not found',404)) 
    res.send({ 
    message: "success", 

    data: user 
    });
   } catch (error) {
      next(error)
   }
};

const updateProfile = async (req, res, next) => {
  try {
      const { id } = req.params

    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10)
    const user = await customerModel.findByIdAndUpdate(id, { name, email, hashedPassword})

    if (!user) return next(BaseException('User Not Found',400))
    

    res.send({ message: "Profile updated successfully", data: user });
 
  } catch (error) {
      next(BaseException('Internal Server Error', 500))
  }
}

export default { register, login, refreshToken, getProfile, updateProfile, verifyToken };
