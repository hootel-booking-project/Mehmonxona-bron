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
    Roles(ROLES.ALL),
    roomController.getAllRooms
    )

  .post(
    "/",
    Protected(true),
    Roles(ROLES.ALL),
    ValidationMiddleware(roomSchema),
    roomController.createRoom
    )

  .get(
    "/:id",
    Protected(false),
    Roles(ROLES.ALL),
    roomController.getRoomById
    )

  .put(
    "/:id",
    Protected(true),
    Roles(ROLES.ALL),
    ValidationMiddleware(roomSchema),
    roomController.updateRoom
    )

  .delete(
    "/:id",
    Protected(true),
    Roles(ROLES.ALL),
    roomController.deleteRoom
    )

export default roomRouter;
