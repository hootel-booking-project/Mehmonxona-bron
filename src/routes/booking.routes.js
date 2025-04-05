import { Router } from "express";
import bookingController from "../controllers/booking.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import {
  createBookingSchema,
  updateBookingSchema,
} from "../schemas/booking.schema.js";
import { Protected } from "../middleware/protected.middleware.js";
import { Roles } from "../middleware/roles.middlweare.js";
import { ROLES } from "../constants/role.constants.js";

const bookingRouter = Router();

bookingRouter
  .get(
    "/:id",
    Protected(true),
    Roles(ROLES.HOTEL_OWNER, ROLES.SUPER_ADMIN),
    bookingController.getBookingById    
    )

  .get(":id",
    Protected(true),
    Roles(ROLES.HOTEL_OWNER, ROLES.SUPER_ADMIN),
    bookingController.getUserBookings
    )

  .post(
    "/",
    Protected(true),
    Roles(ROLES.HOTEL_OWNER, ROLES.SUPER_ADMIN),
    ValidationMiddleware(createBookingSchema),
    bookingController.bookingRoom
    )

  .put(
    "/",
    Protected(true),
    ValidationMiddleware(updateBookingSchema),
    Roles(ROLES.HOTEL_OWNER, ROLES.SUPER_ADMIN),
    bookingController.updateBooking
    )

  .delete(
    "/:id",
    Protected(true),
    Roles(ROLES.ALL),
    bookingController.deleteBooking
    )

export default bookingRouter;
