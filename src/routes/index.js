import { Router } from "express";
import customerRouter from "./customer.routes.js";
import bookingRouter from "./booking.routes.js";

const router = Router()

router
    .use("/customers", customerRouter)
    .use("/booking", bookingRouter)

export default router;    