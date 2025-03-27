import { Router } from "express";
import bookingController from "../controllers/booking.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createBookingSchema, updateBookingSchema } from "../schemas/booking.schema.js";

const bookingRouter = Router()

bookingRouter
    .get("/:id", bookingController.getBookingById)
    .get(":id", bookingController.getUserBookings)
    .post("/", ValidationMiddleware(createBookingSchema), bookingController.bookingRoom)
    .put("/", ValidationMiddleware(updateBookingSchema), bookingController.updateBooking)
    .delete("/:id", bookingController.deleteBooking)

export default bookingRouter;    