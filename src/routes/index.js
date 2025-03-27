import { Router } from "express";
import customerRouter from "./customer.routes.js";
import roomRouter from "./room.routes.js";

const router = Router()

router
    .use("/customers", customerRouter)
    .use("/rooms",roomRouter)

export default router;    