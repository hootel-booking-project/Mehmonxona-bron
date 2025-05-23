import { Router } from "express";
import customerRouter from "./customer.routes.js";
import roomRouter from "./room.routes.js";
import bookingRouter from "./booking.routes.js";

const router = Router()

router
    .use("/customers", customerRouter)
    .use("/rooms",roomRouter)
    .use("/booking", bookingRouter)

export default router;    