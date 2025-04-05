import { Router } from "express";
import customerController from "../controllers/customer.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { loginSchema, registerSchema } from "../schemas/customer.schema.js";
import { Protected } from "../middleware/protected.middleware.js";

const customerRouter = Router()

customerRouter
    .get("/:id", Protected(true), customerController.getProfile)
    .post("/register", Protected(false), ValidationMiddleware(registerSchema), customerController.register)
    .post("/login", Protected(false), ValidationMiddleware(loginSchema), customerController.login)
    .put("/:id", Protected(false), customerController.updateProfile)

export default customerRouter;    