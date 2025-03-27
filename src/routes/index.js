import { Router } from "express";
import customerRouter from "./customer.routes.js";

const router = Router()

router
    .use("/customers", customerRouter)

export default router;    