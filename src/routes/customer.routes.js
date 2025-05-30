import { Router } from "express";
import customerController from "../controllers/customer.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { loginSchema, registerSchema } from "../schemas/customer.schema.js";
import { Roles } from "../middleware/roles.middlweare.js";
import { ROLES } from "../constants/role.constants.js";
import { Protected } from "../middleware/protected.middleware.js";

const customerRouter = Router();

customerRouter
.get(
  "/",
  Roles(ROLES.ALL),
  Protected(true),
  customerController.getAllUsers
)

.post(
  "/forgot-password",
  Protected(false),
  Roles(ROLES.ALL),
  customerController.forgotPassword
)

.post(
  "/reset-password",
  Protected(true),
  Roles(ROLES.ALL),
  customerController.resetPassword
)

.post(
  "/register",
  Protected(false),
  Roles(ROLES.ALL),
  ValidationMiddleware(registerSchema),
  customerController.register
)

.post(
  "/login",
  Protected(false),
  Roles(ROLES.ALL),
  ValidationMiddleware(loginSchema),
  customerController.login
)

.get(
  "/:id",
  Roles(ROLES.ALL),
  Protected(true),
  customerController.getProfile
)

.put(
  "/:id",
  Protected(false),
  Roles(ROLES.ALL),
  customerController.updateProfile
)
  

export default customerRouter;
