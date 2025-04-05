import { Router } from "express";
import bookingController from "../controllers/booking.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createBookingSchema, updateBookingSchema } from "../schemas/booking.schema.js";
import { Protected } from "../middleware/protected.middleware.js";

const bookingRouter = Router()

bookingRouter
    .get("/:id", Protected(true), bookingController.getBookingById)
    .get(":id", Protected(true), bookingController.getUserBookings)
    .post("/", Protected(true), ValidationMiddleware(createBookingSchema), bookingController.bookingRoom)
    .put("/", Protected(true), ValidationMiddleware(updateBookingSchema), bookingController.updateBooking)
    .delete("/:id", Protected(true), bookingController.deleteBooking)

export default bookingRouter;    