import { Router } from "express";
import customerController from "../controllers/customer.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { loginSchema, registerSchema } from "../schemas/customer.schema.js";

const customerRouter = Router()

customerRouter
    .get("/:id", customerController.getProfile)
    .post("/register", ValidationMiddleware(registerSchema), customerController.register)
    .post("/login", ValidationMiddleware(loginSchema), customerController.login)
    .put("/:id", customerController.updateProfile)

export default customerRouter;    