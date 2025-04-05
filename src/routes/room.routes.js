import { Router } from "express";
import roomController from "../controllers/room.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { roomSchema } from "../schemas/room.schema.js";
import { Protected } from "../middleware/protected.middleware.js";
import { Roles } from "../middleware/roles.middlweare.js";
import { ROLES } from "../constants/role.constants.js";
const roomRouter = Router();

roomRouter
  .get("/",
    Protected(false),
    Roles(ROLES.HOTEL_OWNER, ROLES.SUPER_ADMIN),
    roomController.getAllRooms
    )

  .post(
    "/",
    Protected(true),
    Roles(ROLES.HOTEL_OWNER, ROLES.SUPER_ADMIN),
    ValidationMiddleware(roomSchema),
    roomController.createRoom
    )

  .get(
    "/:id",
    Protected(false),
    Roles(ROLES.HOTEL_OWNER, ROLES.SUPER_ADMIN),
    roomController.getRoomById
    )

  .put(
    "/:id",
    Protected(true),
    Roles(ROLES.HOTEL_OWNER, ROLES.SUPER_ADMIN),
    ValidationMiddleware(roomSchema),
    roomController.updateRoom
    )

  .delete(
    "/:id",
    Protected(true),
    Roles(ROLES.HOTEL_OWNER, ROLES.SUPER_ADMIN),
    roomController.deleteRoom
    )

export default roomRouter;
