import { Router } from "express";
import { forgotPassword} from "../controllers/customer.controller.js";  // kerakli controllerni import qiling

const pageRouter = Router();

// GET requestlar
pageRouter.get("/", (req, res) => {
  res.render("index", { error: null });
});

pageRouter.get("/customers/login", (req, res) => {
  res.render("login", { error: null });
});

pageRouter.get("/customers/register", (req, res) => {
  res.render("register", { error: null });
});

pageRouter.get("/customers/forgot-password", (req, res) => {
  res.render("forgot-password", { error: null, message: null });
});

pageRouter.get("/customers/reset-password", (req, res) => {
  const { token } = req.query;
  res.render("reset-password", { error: null, message: null, token });
});

// POST request - forgot password form uchun
pageRouter.post("/customers/forgot-password", forgotPassword);  // forgotPassword controllerini chaqiramiz

export default pageRouter;
