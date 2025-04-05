import { Router } from "express";
import roomController from "../controllers/room.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { roomSchema } from "../schemas/room.schema.js";
import { Protected } from "../middleware/protected.middleware.js";

const roomRouter = Router();

roomRouter
    .get("/", Protected(false), roomController.getAllRooms)
    .post("/", Protected(true), ValidationMiddleware(roomSchema), roomController.createRoom)
    .get("/:id", Protected(false), roomController.getRoomById)
    .put("/:id", Protected(true), ValidationMiddleware(roomSchema), roomController.updateRoom)
    .delete("/:id", Protected(true), roomController.deleteRoom);

export default roomRouter;
